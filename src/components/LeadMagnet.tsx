import React, { useState, useEffect, useCallback } from 'react';

const STORAGE_SUBSCRIBED = 'finanzas_newsletter_subscribed';
const STORAGE_POPUP_DISMISSED = 'finanzas_newsletter_popup_dismissed';
/** Compatibilidad con claves antiguas */
const LEGACY_CLOSED = 'finanzas_lead_closed';
const LEGACY_CAPTURED = 'finanzas_lead_captured';

function readStoredBoolean(key: string): boolean {
  try {
    return localStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
}

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /** Hidratar desde localStorage (solo cliente) */
  useEffect(() => {
    const sub =
      readStoredBoolean(STORAGE_SUBSCRIBED) || readStoredBoolean(LEGACY_CAPTURED);
    const dismissed =
      readStoredBoolean(STORAGE_POPUP_DISMISSED) || readStoredBoolean(LEGACY_CLOSED);
    if (sub) setSubscribed(true);
    if (dismissed) setPopupDismissed(true);
  }, []);

  const dismissPopup = useCallback(() => {
    setShowPopup(false);
    setPopupDismissed(true);
    try {
      localStorage.setItem(STORAGE_POPUP_DISMISSED, 'true');
      localStorage.setItem(LEGACY_CLOSED, 'true');
    } catch {
      /* ignore */
    }
  }, []);

  /** Popup retardado + salida del cursor (solo escritorio aprox.) */
  useEffect(() => {
    if (popupDismissed || subscribed) return;

    const timer = window.setTimeout(() => {
      setShowPopup(true);
    }, 60000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.innerWidth >= 768) {
        setShowPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [popupDismissed, subscribed]);

  /** Cerrar con Escape cuando el modal está abierto */
  useEffect(() => {
    if (!showPopup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissPopup();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showPopup, dismissPopup]);

  const submitToNetlify = async (fuente: 'popup' | 'inline') => {
    const params = new URLSearchParams();
    params.append('form-name', 'newsletter');
    params.append('bot-field', '');
    params.append('nombre', nombre.trim());
    params.append('email', email.trim());
    params.append('fuente', fuente);

    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) {
      throw new Error(`Respuesta ${res.status}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent, fuente: 'popup' | 'inline') => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitToNetlify(fuente);

      try {
        localStorage.setItem(STORAGE_SUBSCRIBED, 'true');
        localStorage.setItem(LEGACY_CAPTURED, 'true');
      } catch {
        /* ignore */
      }

      setSubscribed(true);
      setShowPopup(false);
      setNombre('');
      setEmail('');
    } catch (err) {
      console.error('Newsletter:', err);
      setSubmitError(
        'No se pudo enviar ahora. Comprueba la conexión o escríbenos desde Contacto.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const thankYou = (
    <div className="text-center py-6 md:py-8">
      <div className="text-5xl mb-3" aria-hidden="true">
        🎉
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">¡Listo, gracias!</h3>
      <p className="text-blue-100 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
        Gracias. Te hemos apuntado: cuando empecemos a enviar el resumen semanal, lo recibirás en
        tu correo (revisa spam si no ves nada). Mientras tanto, usa las calculadoras y el blog.
      </p>
    </div>
  );

  return (
    <>
      {/* Popup: siempre se puede cerrar (backdrop, Escape, botón) */}
      {showPopup && !popupDismissed && !subscribed && (
        <div
          className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 animate-fadeIn"
          role="presentation"
          onClick={dismissPopup}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-[201]"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex justify-end gap-2 p-3 md:p-4 bg-white/95 backdrop-blur border-b border-gray-100 rounded-t-3xl">
              <button
                type="button"
                onClick={dismissPopup}
                className="min-h-[44px] min-w-[44px] px-4 rounded-xl border-2 border-gray-300 text-gray-800 font-semibold text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cerrar
              </button>
            </div>

            <div className="p-6 md:p-10 pt-2">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3" aria-hidden="true">
                  📬
                </div>
                <h2
                  id="lead-popup-title"
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                >
                  Newsletter semanal + recursos para autónomos
                </h2>
                <p className="text-lg text-gray-700">
                  Un correo a la semana con resúmenes prácticos: autónomos, impuestos, ahorro y
                  novedades fiscales en España. Sin spam, baja en un clic.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 mb-6 text-left">
                <h3 className="font-bold text-gray-900 mb-3">Qué puedes esperar</h3>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Resumen de cambios en cotización, IRPF y calendario fiscal
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Ideas de gastos deducibles y buenas prácticas
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Enlace a calculadoras y artículos del sitio
                  </li>
                </ul>
              </div>

              <form onSubmit={(e) => handleSubmit(e, 'popup')} className="space-y-4">
                <div>
                  <label htmlFor="lead-nombre-popup" className="sr-only">
                    Nombre
                  </label>
                  <input
                    id="lead-nombre-popup"
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    autoComplete="given-name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="lead-email-popup" className="sr-only">
                    Email
                  </label>
                  <input
                    id="lead-email-popup"
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
                {submitError && (
                  <p className="text-sm text-red-600 text-center" role="alert">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg text-lg disabled:opacity-50 min-h-[48px]"
                >
                  {isSubmitting ? 'Enviando…' : 'Suscribirme'}
                </button>
                <p className="text-xs text-center text-gray-500 leading-relaxed">
                  Al enviar, aceptas recibir correos según nuestra{' '}
                  <a href="/privacidad.html" className="underline text-blue-600">
                    política de privacidad
                  </a>
                  . Puedes darte de baja en cualquier momento.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Acceso rápido: ancla fija (no tapa el aviso PWA, va a la izquierda) */}
      {!subscribed && (
        <a
          href="#newsletter-finanzas"
          className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg ring-2 ring-white/30 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white md:text-base"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById('newsletter-finanzas')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <span aria-hidden="true">📬</span>
          Newsletter semanal
        </a>
      )}

      {/* Bloque en página: siempre visible salvo ya suscrito */}
      <div
        id="newsletter-finanzas"
        className="scroll-mt-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
      >
        <div className="max-w-3xl mx-auto">
          {subscribed ? (
            thankYou
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="text-5xl mb-4" aria-hidden="true">
                  📬
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Newsletter semanal FinanzasFácil
                </h2>
                <p className="text-lg text-blue-100 leading-relaxed">
                  Apunta tu email y recibe cada semana un resumen claro: fiscalidad para autónomos,
                  ideas de ahorro y enlaces a las calculadoras del sitio. Sin promesas mágicas: solo
                  contenido útil.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8 text-sm md:text-base text-blue-50">
                <p className="font-semibold text-white mb-3">Qué enviamos (cuando arranque el boletín)</p>
                <ul className="space-y-2 leading-relaxed opacity-95 list-none pl-0">
                  <li>✓ Fechas y cambios que suelen afectar a autónomos</li>
                  <li>✓ Recordatorios útiles (sin saturar)</li>
                  <li>✓ Enlace al contenido nuevo del blog o la web</li>
                </ul>
              </div>

              <form onSubmit={(e) => handleSubmit(e, 'inline')} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <label htmlFor="lead-nombre-inline" className="sr-only">
                    Nombre
                  </label>
                  <input
                    id="lead-nombre-inline"
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    autoComplete="given-name"
                    className="px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur text-white placeholder-white/60 focus:border-white focus:outline-none text-lg"
                  />
                  <label htmlFor="lead-email-inline" className="sr-only">
                    Email
                  </label>
                  <input
                    id="lead-email-inline"
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur text-white placeholder-white/60 focus:border-white focus:outline-none text-lg"
                  />
                </div>
                {submitError && (
                  <p className="text-sm text-amber-200 text-center" role="alert">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-blue-50 transition-all shadow-lg text-lg disabled:opacity-50 min-h-[48px]"
                >
                  {isSubmitting ? 'Enviando…' : 'Apuntarme a la newsletter'}
                </button>
                <p className="text-xs text-center text-blue-100">
                  Sin spam. Baja cuando quieras. Base legal en privacidad y términos del sitio.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
