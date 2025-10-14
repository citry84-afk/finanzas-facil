import React, { useState } from 'react';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Mostrar popup después de 30 segundos o al intentar salir
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // 30 segundos

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Aquí integrarás tu servicio de email marketing
    // Por ahora, simulamos el envío
    try {
      // TODO: Integrar con Brevo/Mailchimp API
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, nombre }),
      // });

      // Guardar en localStorage para no mostrar popup de nuevo
      localStorage.setItem('finanzas_lead_captured', 'true');
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSuccess(true);
      setShowPopup(false);

      // Aquí iría la lógica para enviar el PDF por email
      // O redirigir a página de descarga
      
    } catch (error) {
      console.error('Error al suscribir:', error);
      alert('Hubo un error. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    // No mostrar de nuevo en esta sesión
    sessionStorage.setItem('popup_shown', 'true');
  };

  // No mostrar si ya se capturó el lead
  const leadCaptured = localStorage.getItem('finanzas_lead_captured');
  const popupShown = sessionStorage.getItem('popup_shown');

  if (leadCaptured || popupShown) {
    return null;
  }

  return (
    <>
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative animate-slideUp">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
            >
              ×
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  ¡ESPERA! 🎁
                </h2>
                <p className="text-xl text-gray-700 font-semibold">
                  Descarga GRATIS la Guía Definitiva del Autónomo 2025
                </p>
              </div>

              {/* Beneficios */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-lg text-gray-900 mb-4">📖 Descubre:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>20+ gastos deducibles</strong> que desconoces (ahorra 2.000-5.000€/año)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Calculadora fiscal 2025</strong> actualizada con nuevas normativas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Plantillas</strong> de facturas, presupuestos y control de gastos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Calendario fiscal</strong> con fechas clave para no pagar multas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Estrategias legales</strong> para pagar menos impuestos</span>
                  </li>
                </ul>
              </div>

              {/* Form */}
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Tu mejor email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enviando...' : '🎁 QUIERO MI GUÍA GRATIS'}
                  </button>
                  <p className="text-xs text-center text-gray-500">
                    💯 100% gratis. Sin spam. Cancela cuando quieras.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    ¡Revisa tu email!
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Te hemos enviado la <strong>Guía Definitiva del Autónomo 2025</strong> a <strong>{email}</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Si no lo ves, revisa tu carpeta de spam 📧
                  </p>
                </div>
              )}

              {/* Social Proof */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ⭐⭐⭐⭐⭐ Más de <strong>1.000 autónomos</strong> ya han descargado esta guía
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline CTA (para usar en páginas) */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Guía Definitiva del Autónomo 2025
            </h2>
            <p className="text-xl text-blue-100">
              Descarga GRATIS y ahorra miles de euros en impuestos
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <span>20+ gastos deducibles desconocidos</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <span>Calculadora fiscal 2025 actualizada</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <span>Plantillas profesionales incluidas</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <span>Calendario fiscal completo</span>
              </div>
            </div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur text-white placeholder-white/60 focus:border-white focus:outline-none text-lg"
                />
                <input
                  type="email"
                  placeholder="Tu mejor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur text-white placeholder-white/60 focus:border-white focus:outline-none text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg text-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : '🎁 DESCARGAR GUÍA GRATIS'}
              </button>
              <p className="text-xs text-center text-blue-100">
                💯 100% gratis. Sin spam. Cancela cuando quieras.
              </p>
            </form>
          ) : (
            <div className="text-center py-8 bg-white/10 backdrop-blur rounded-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-4">
                ¡Revisa tu email!
              </h3>
              <p className="text-blue-100 mb-4">
                Te hemos enviado la guía a <strong>{email}</strong>
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-100">
              ⭐⭐⭐⭐⭐ Más de 1.000 autónomos ya la han descargado
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

