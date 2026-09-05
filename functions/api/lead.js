const text = (value, max = 4000) => {
  if (value === null || value === undefined) return "";
  return String(value).trim().slice(0, max);
};

const allowedLeadTypes = new Set(["buyer", "seller", "property", "general"]);

function temporaryUnavailable(origin) {
  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Contact Riley</title>
<style>
body{margin:0;background:#efe9de;color:#1d2521;font-family:system-ui,-apple-system,sans-serif}
main{max-width:760px;margin:0 auto;padding:80px 28px}
h1{font-size:clamp(2.5rem,8vw,5rem);line-height:1;margin:0 0 24px}
p{font-size:1.15rem;line-height:1.6}
a{display:inline-block;margin:10px 10px 0 0;padding:13px 19px;border:1px solid #1d2521;border-radius:999px;color:inherit;text-decoration:none;font-weight:700}
</style>
</head>
<body><main>
<p>CONTACT</p>
<h1>The form is temporarily finishing setup.</h1>
<p>Your message was not submitted. Please call or text me directly and I'll take it from here.</p>
<a href="sms:+15414181787">Text Riley</a>
<a href="tel:+15414181787">Call (541) 418-1787</a>
<a href="${origin}/contact.html">Back to contact</a>
</main></body></html>`;
  return new Response(body, {
    status: 503,
    headers: {"content-type": "text/html; charset=UTF-8", "cache-control": "no-store"}
  });
}

export async function onRequestGet({ request }) {
  return Response.redirect(new URL("/contact.html", request.url).toString(), 302);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const form = await request.formData();

  // Honeypot: quietly accept obvious bot submissions without storing them.
  if (text(form.get("website"), 200)) {
    return Response.redirect(new URL("/thanks.html", request.url).toString(), 303);
  }

  const leadTypeRaw = text(form.get("lead_type"), 40).toLowerCase();
  const leadType = allowedLeadTypes.has(leadTypeRaw) ? leadTypeRaw : "general";
  const fullName = text(form.get("full_name"), 200);
  const email = text(form.get("email"), 320);
  const phone = text(form.get("phone"), 80);
  const consent = text(form.get("contact_consent"), 20);

  if (!fullName || (!email && !phone) || consent !== "yes") {
    return new Response("Please provide your name, either a phone number or email, and contact permission.", {
      status: 400,
      headers: {"content-type": "text/plain; charset=UTF-8"}
    });
  }

  if (!env.LEADS_DB) {
    return temporaryUnavailable(url.origin);
  }

  const id = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const sourcePage = text(request.headers.get("referer") || form.get("source_page"), 1000);

  try {
    await env.LEADS_DB.prepare(`
      INSERT INTO leads (
        id, submitted_at, lead_type, full_name, email, phone,
        preferred_contact, message, property, property_address,
        property_state, areas, price_range, purchase_type, timing,
        source_page, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `).bind(
      id,
      submittedAt,
      leadType,
      fullName,
      email,
      phone,
      text(form.get("preferred_contact"), 50),
      text(form.get("message"), 6000),
      text(form.get("property"), 500),
      text(form.get("property_address"), 500),
      text(form.get("property_state"), 100),
      text(form.get("areas"), 1000),
      text(form.get("price_range"), 100),
      text(form.get("purchase_type"), 100),
      text(form.get("timing"), 100),
      sourcePage
    ).run();
  } catch (error) {
    console.error("Lead insert failed", error);
    return temporaryUnavailable(url.origin);
  }

  return Response.redirect(new URL("/thanks.html", request.url).toString(), 303);
}
