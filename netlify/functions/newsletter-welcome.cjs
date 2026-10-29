const TEMPLATE_URL = 'https://finanzasmuyfacil.com/plantilla-dinero-tranquilo.html';
const ANT_EXPENSES_URL = 'https://finanzasmuyfacil.com/gastos-hormiga.html';
const APP_STORE_URL = 'https://apps.apple.com/es/app/finanzasfacil/id6754602748';

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const buildEmailHtml = (name, isMoneyPlan) => `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;line-height:1.6">
    <p>Hola${name ? ` ${escapeHtml(name)}` : ''},</p>
    <h1 style="font-size:28px;line-height:1.1;margin:0 0 16px;color:#1d4ed8">
      ${isMoneyPlan ? 'Tu plan mensual de dinero tranquilo' : 'Bienvenido a Finanzas Muy Fácil'}
    </h1>
    <p>
      ${isMoneyPlan
        ? 'Aquí tienes la plantilla para ordenar ingresos, gastos, ahorro y margen disponible sin complicarte.'
        : 'Gracias por apuntarte. Te enviaremos recursos prácticos de finanzas personales, ahorro y herramientas gratuitas.'}
    </p>
    <p>
      <a href="${TEMPLATE_URL}" style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;font-weight:700;padding:14px 18px;border-radius:10px">
        Abrir plantilla de dinero tranquilo
      </a>
    </p>
    <p>
      Si quieres llevarlo de forma automática en el móvil, la app ya está disponible para iPhone:
      <a href="${APP_STORE_URL}" style="color:#1d4ed8;font-weight:700">descargar FinanzasFacil en App Store</a>.
    </p>
    <p>
      Siguiente paso recomendado:
      <a href="${ANT_EXPENSES_URL}" style="color:#1d4ed8;font-weight:700">detectar gastos hormiga sin obsesionarte</a>.
    </p>
    <hr style="border:0;border-top:1px solid #e2e8f0;margin:28px 0" />
    <p style="font-size:13px;color:#64748b">
      Recibes este email porque te apuntaste en Finanzas Muy Fácil. Si no lo hiciste tú, puedes ignorarlo.
    </p>
  </div>
`;

const buildEmailText = (name, isMoneyPlan) =>
  [
    `Hola${name ? ` ${name}` : ''},`,
    '',
    isMoneyPlan
      ? 'Aquí tienes tu plan mensual de dinero tranquilo.'
      : 'Gracias por apuntarte a Finanzas Muy Fácil.',
    '',
    `Plantilla: ${TEMPLATE_URL}`,
    `Siguiente paso: ${ANT_EXPENSES_URL}`,
    `App iOS: ${APP_STORE_URL}`,
    '',
    'Recibes este email porque te apuntaste en Finanzas Muy Fácil. Si no lo hiciste tú, puedes ignorarlo.',
  ].join('\n');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'method_not_allowed' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { ok: false, error: 'invalid_json' });
  }

  const email = String(payload.email || '').trim().toLowerCase();
  const nombre = String(payload.nombre || '').trim().slice(0, 80);
  const fuente = String(payload.fuente || 'inline');

  if (!isValidEmail(email)) {
    return jsonResponse(400, { ok: false, error: 'invalid_email' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const replyTo = process.env.RESEND_REPLY_TO;

  if (!apiKey || !from) {
    console.log('Newsletter welcome skipped: RESEND_API_KEY or RESEND_FROM_EMAIL missing');
    return jsonResponse(200, { ok: true, emailSent: false, reason: 'email_provider_not_configured' });
  }

  const isMoneyPlan = fuente.startsWith('money_plan');
  const subject = isMoneyPlan
    ? 'Tu plantilla de dinero tranquilo mensual'
    : 'Bienvenido a Finanzas Muy Fácil';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject,
      html: buildEmailHtml(nombre, isMoneyPlan),
      text: buildEmailText(nombre, isMoneyPlan),
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend email failed:', detail);
    return jsonResponse(502, { ok: false, error: 'email_provider_error' });
  }

  return jsonResponse(200, { ok: true, emailSent: true });
};
