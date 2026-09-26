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

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

function sanitizeText(value: string, preserveLineBreaks = false) {
  const normalized = value.normalize("NFKC");

  return Array.from(normalized)
    .filter((character) => {
      const codePoint = character.charCodeAt(0);
      const isControlCharacter = codePoint <= 0x1f || codePoint === 0x7f;
      const isAllowedLineCharacter =
        codePoint === 0x09 || codePoint === 0x0a || codePoint === 0x0d;

      return (
        !isControlCharacter || (preserveLineBreaks && isAllowedLineCharacter)
      );
    })
    .join("")
    .trim();
}

function sanitizeBody(body: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => [
      key,
      typeof value === "string"
        ? sanitizeText(value, key === "message" || key === "goals")
        : value,
    ]),
  );
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
    const parsed = quoteRequestSchema.safeParse(sanitizeBody(body));

    if (!parsed.success) {
      return res.status(400).json({
        error: "Please check the form and try again.",
      });
    }

    if (parsed.data.website) {
      return res.status(200).json({ ok: true });
    }

    const message = parsed.data.message ?? parsed.data.goals ?? "";
    const business = parsed.data.business ?? "Not provided";
    const source = parsed.data.source ?? "Website form";
    const safeName = escapeHtml(parsed.data.name);
    const safeEmail = escapeHtml(parsed.data.email);
    const safeBusiness = escapeHtml(business);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const safeSource = escapeHtml(source);

    const timeoutMs = 15000;
    const result = await Promise.race([
      resend.emails.send({
        from: "Shael Systems <forms@shaelsystems.com>",
        to: ["hello@shaelsystems.com"],
        replyTo: parsed.data.email,
        subject: `New project enquiry: ${parsed.data.name}`,
        text: [
          "New project enquiry",
          "",
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Business: ${business}`,
          `Source: ${source}`,
          "",
          message,
        ].join("\n"),
        html: `
          <div style="margin:0;background:#f4f8ff;padding:32px 16px;font-family:Arial,sans-serif;color:#172033;">
            <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #dbe7f5;border-radius:14px;overflow:hidden;">
              <div style="background:#172554;padding:28px 32px;">
                <p style="margin:0 0 8px;color:#93c5fd;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Shael Systems</p>
                <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.3;">New project enquiry</h1>
              </div>
              <div style="padding:32px;">
                <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">Someone has shared a new project enquiry through your website.</p>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tr><td style="padding:12px 0;border-top:1px solid #e2e8f0;color:#64748b;width:30%;">Name</td><td style="padding:12px 0;border-top:1px solid #e2e8f0;font-weight:bold;">${safeName}</td></tr>
                  <tr><td style="padding:12px 0;border-top:1px solid #e2e8f0;color:#64748b;">Email</td><td style="padding:12px 0;border-top:1px solid #e2e8f0;"><a href="mailto:${encodeURIComponent(parsed.data.email)}" style="color:#2563eb;">${safeEmail}</a></td></tr>
                  <tr><td style="padding:12px 0;border-top:1px solid #e2e8f0;color:#64748b;">Business</td><td style="padding:12px 0;border-top:1px solid #e2e8f0;">${safeBusiness}</td></tr>
                  <tr><td style="padding:12px 0;border-top:1px solid #e2e8f0;color:#64748b;">Source</td><td style="padding:12px 0;border-top:1px solid #e2e8f0;">${safeSource}</td></tr>
                </table>
                <div style="margin-top:24px;padding:20px;background:#f8fafc;border-radius:10px;">
                  <p style="margin:0 0 8px;color:#64748b;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Message</p>
                  <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">${safeMessage}</p>
                </div>
                <a href="mailto:${encodeURIComponent(parsed.data.email)}" style="display:inline-block;margin-top:28px;padding:12px 18px;border-radius:8px;background:#2563eb;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">Reply to ${safeName}</a>
              </div>
            </div>
            <p style="margin:16px auto 0;max-width:620px;color:#64748b;font-size:12px;text-align:center;">Sent from the Shael Systems website.</p>
          </div>
        `,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error("Resend request timed out")),
          timeoutMs,
        );
      }),
    ]);

    if (result.error) {
      const emailError = result.error;
      console.error("Resend rejected the email", emailError);
      return res.status(502).json({ error: "We could not send your message." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Quote form request failed", error);
    return res.status(500).json({ error: "We could not send your message." });
  }
}
