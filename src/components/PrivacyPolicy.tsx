import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Política de Privacidad
          </h1>
          
          <div className="text-white/90 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Información que recopilamos</h2>
              <p className="leading-relaxed">
                En FinanzasFácil recopilamos información que nos proporcionas directamente, como:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Datos de registro (email, nombre)</li>
                <li>Información financiera que introduces (ingresos, gastos)</li>
                <li>Datos de uso de la aplicación</li>
                <li>Información de navegación y cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Cómo utilizamos tu información</h2>
              <p className="leading-relaxed">
                Utilizamos tu información para:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Personalizar tu experiencia</li>
                <li>Enviar notificaciones importantes</li>
                <li>Análisis estadísticos (datos anónimos)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Compartir información</h2>
              <p className="leading-relaxed">
                No vendemos ni compartimos tu información personal con terceros, excepto:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Con tu consentimiento explícito</li>
                <li>Para cumplir con obligaciones legales</li>
                <li>Con proveedores de servicios que nos ayudan a operar</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Seguridad</h2>
              <p className="leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información 
                contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Tus derechos</h2>
              <p className="leading-relaxed">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Acceder a tu información personal</li>
                <li>Rectificar datos inexactos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Limitar el procesamiento</li>
                <li>Portabilidad de datos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies</h2>
              <p className="leading-relaxed">
                Utilizamos cookies para mejorar tu experiencia, recordar tus preferencias y analizar 
                el uso del sitio. Puedes configurar tu navegador para rechazar cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Cambios en esta política</h2>
              <p className="leading-relaxed">
                Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios 
                significativos a través de la aplicación o por email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contacto</h2>
              <p className="leading-relaxed">
                Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través 
                de la aplicación o en nuestro sitio web.
              </p>
            </section>

            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-sm text-white/70">
                <strong>Última actualización:</strong> 19 de enero de 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;



