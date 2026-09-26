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

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const runtimeProcess = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  };
  const apiKey = runtimeProcess.process?.env?.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return Response.json(
      { error: "Email service is not configured" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const parsed = quoteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Please check the form and try again." },
        { status: 400 },
      );
    }

    if (parsed.data.website) {
      return Response.json({ ok: true });
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
      return Response.json(
        { error: "We could not send your message." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Quote form request failed", error);
    return Response.json(
      { error: "We could not send your message." },
      { status: 500 },
    );
  }
}
