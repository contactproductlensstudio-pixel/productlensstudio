import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadInput = z.object({
  fullName: z.string().trim().min(2).max(80),
  business: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(20),
  service: z.string().min(1).max(80),
  details: z.string().trim().min(10).max(1500),
});

export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadInput.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const escape = (s: string) =>
      s.replace(/[&<>"']/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
      );

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f0f17;color:#fff;border-radius:12px">
        <h2 style="margin:0 0 16px;color:#a78bfa">New Consultation Request</h2>
        <p style="color:#cbd5e1;margin:0 0 20px">A new lead just submitted the form on Product Lens Studio.</p>
        <table style="width:100%;border-collapse:collapse;color:#e2e8f0;font-size:14px">
          <tr><td style="padding:8px 0;color:#94a3b8">Name</td><td style="padding:8px 0"><b>${escape(data.fullName)}</b></td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8">Business</td><td style="padding:8px 0">${escape(data.business)}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0">${escape(data.email)}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8">Phone</td><td style="padding:8px 0">${escape(data.phone)}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8">Service</td><td style="padding:8px 0">${escape(data.service)}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;vertical-align:top">Details</td><td style="padding:8px 0;white-space:pre-wrap">${escape(data.details)}</td></tr>
        </table>
      </div>`;

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Product Lens Studio <onboarding@resend.dev>",
        to: ["contact.productlensstudio@gmail.com"],
        reply_to: data.email,
        subject: `New Lead: ${data.fullName} — ${data.service}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend send failed", res.status, body);
      throw new Error(`Failed to send email (${res.status})`);
    }

    return { ok: true };
  });
