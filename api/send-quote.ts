import { Resend } from "resend";
import { z } from "zod";

export const config = {
  runtime: "nodejs",
};

const quoteRequestSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.email().trim().max(254),
    business: z.string().trim().max(150).optional(),
    message: z.string().trim().min(10).max(5000).optional(),
    goals: z.string().trim().min(10).max(5000).optional(),
    website: z.string().max(0).optional(),
    source: z.string().trim().max(100).optional(),
  })
  .refine((data) => data.message || data.goals, {
    message: "A project message or goal is required.",
    path: ["message"],
  });

type VercelRequest = {
  method?: string;
  body?: unknown;
  on?: (
    event: "data" | "end" | "error",
    handler: (chunk?: unknown) => void,
  ) => void;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (payload: Record<string, unknown>) => VercelResponse;
};

function parseRequestBody(
  req: VercelRequest,
): Promise<Record<string, unknown>> {
  if (req.body !== undefined) {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    return Promise.resolve(
      typeof body === "object" && body !== null
        ? (body as Record<string, unknown>)
        : {},
    );
  }

  return new Promise((resolve, reject) => {
    const chunks: string[] = [];

    req.on?.("data", (chunk?: unknown) => {
      if (typeof chunk === "string") {
        chunks.push(chunk);
        return;
      }

      if (chunk instanceof Uint8Array) {
        chunks.push(new TextDecoder().decode(chunk));
      }
    });

    req.on?.("end", () => {
      const raw = chunks.join("").trim();
      if (!raw) {
        resolve({});
        return;
      }

      try {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        resolve(parsed);
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on?.("error", (error?: unknown) => {
      reject(error instanceof Error ? error : new Error("Invalid JSON body"));
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const runtimeProcess = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  };
  const apiKey = runtimeProcess.process?.env?.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return res.status(500).json({ error: "Email service is not configured" });
  }

  const resend = new Resend(apiKey);

  try {
    const body = await parseRequestBody(req);
    const parsed = quoteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Please check the form and try again.",
      });
    }

    if (parsed.data.website) {
      return res.status(200).json({ ok: true });
    }

    const message = parsed.data.message ?? parsed.data.goals ?? "";
    const business = parsed.data.business
      ? `\nBusiness: ${parsed.data.business}`
      : "";
    const source = parsed.data.source ? ` (${parsed.data.source})` : "";

    const timeoutMs = 15000;
    const result = await Promise.race([
      resend.emails.send({
        from: "Shael Systems <forms@shaelsystems.com>",
        to: ["hello@shaelsystems.com"],
        replyTo: parsed.data.email,
        subject: `New project enquiry${source}: ${parsed.data.name}`,
        text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}${business}\n\n${message}`,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error("Resend request timed out")),
          timeoutMs,
        );
      }),
    ]);

    if ("error" in (result as { error?: unknown })) {
      const emailError = (result as { error?: unknown }).error;
      console.error("Resend rejected the email", emailError);
      return res.status(502).json({ error: "We could not send your message." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Quote form request failed", error);
    return res.status(500).json({ error: "We could not send your message." });
  }
}
