import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Términos de Servicio
          </h1>
          
          <div className="text-white/90 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Aceptación de términos</h2>
              <p className="leading-relaxed">
                Al acceder y usar FinanzasFácil, aceptas estar sujeto a estos términos de servicio. 
                Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Descripción del servicio</h2>
              <p className="leading-relaxed">
                FinanzasFácil es una plataforma web que proporciona:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Calculadoras financieras gratuitas</li>
                <li>Herramientas de control de gastos</li>
                <li>Educación financiera básica</li>
                <li>Análisis de datos financieros personales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Uso del servicio</h2>
              <p className="leading-relaxed">
                Te comprometes a:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Usar el servicio de manera legal y ética</li>
                <li>Proporcionar información veraz y actualizada</li>
                <li>No intentar acceder a cuentas de otros usuarios</li>
                <li>No usar el servicio para actividades ilegales</li>
                <li>Respetar los derechos de propiedad intelectual</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Limitación de responsabilidad</h2>
              <p className="leading-relaxed">
                FinanzasFácil se proporciona "tal como está". No garantizamos:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Precisión absoluta de los cálculos</li>
                <li>Disponibilidad continua del servicio</li>
                <li>Ausencia de errores o interrupciones</li>
                <li>Resultados financieros específicos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Información financiera</h2>
              <p className="leading-relaxed">
                <strong>Importante:</strong> La información proporcionada es solo para fines educativos 
                y de planificación. No constituye asesoramiento financiero profesional. Siempre consulta 
                con un profesional financiero certificado antes de tomar decisiones financieras importantes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Privacidad y datos</h2>
              <p className="leading-relaxed">
                Tu privacidad es importante para nosotros. El manejo de tus datos personales se rige 
                por nuestra Política de Privacidad, que forma parte integral de estos términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Modificaciones del servicio</h2>
              <p className="leading-relaxed">
                Nos reservamos el derecho de:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Modificar o discontinuar el servicio</li>
                <li>Actualizar estos términos</li>
                <li>Cambiar las funcionalidades disponibles</li>
                <li>Limitar el acceso por violación de términos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Propiedad intelectual</h2>
              <p className="leading-relaxed">
                Todo el contenido, diseño y funcionalidad de FinanzasFácil está protegido por derechos 
                de autor y otras leyes de propiedad intelectual. No puedes copiar, modificar o distribuir 
                nuestro contenido sin autorización.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Terminación</h2>
              <p className="leading-relaxed">
                Podemos suspender o terminar tu acceso al servicio en cualquier momento por violación 
                de estos términos o por cualquier otra razón a nuestra discreción.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Ley aplicable</h2>
              <p className="leading-relaxed">
                Estos términos se rigen por las leyes de España. Cualquier disputa será resuelta 
                en los tribunales competentes de España.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Contacto</h2>
              <p className="leading-relaxed">
                Si tienes preguntas sobre estos términos de servicio, puedes contactarnos a través 
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

export default TermsOfService;



