
function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-6">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Sobre FinanzasFácil</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Quiénes somos?</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              FinanzasFácil es una plataforma web de LIPA Studios especializada en educación financiera
              y herramientas de cálculo gratuitas para mejorar la gestión personal del dinero. El proyecto
              combina desarrollo web, revisión de fuentes públicas y contenido práctico adaptado a España.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Creemos que la educación financiera debe ser accesible para todos, independientemente 
              de su nivel de conocimientos o situación económica. Por eso, ofrecemos calculadoras 
              gratuitas, guías prácticas y recursos educativos sin necesidad de registro.
            </p>
            <p className="text-gray-700 leading-relaxed">
              En mayo de 2026 publicamos FinanzasFacil en App Store para acercar el control de gastos
              al móvil: una app gratuita para iPhone y iPad, pensada para usarla sin registro obligatorio
              y con exportación de datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nuestra misión</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Hacer más comprensible la información financiera cotidiana, proporcionando herramientas
              orientativas y guías claras que ayuden a preparar mejores preguntas antes de tomar
              decisiones económicas o fiscales importantes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Qué ofrecemos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">📊 Calculadoras Financieras</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• Calculadora de salario neto 2025</li>
                  <li>• Calculadora para autónomos</li>
                  <li>• Simulador de libertad financiera</li>
                  <li>• Herramientas de control de gastos</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-3">🎓 Educación Financiera</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• Guías sobre IRPF y Seguridad Social</li>
                  <li>• Consejos para autónomos</li>
                  <li>• Estrategias de ahorro e inversión</li>
                  <li>• Planificación financiera personal</li>
                </ul>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6 md:col-span-2">
                <h3 className="text-xl font-semibold text-indigo-900 mb-3">📱 App iOS publicada</h3>
                <p className="text-indigo-800 leading-relaxed">
                  FinanzasFacil está disponible en App Store para iPhone y iPad. La app complementa la web
                  con control de gastos local, onboarding guiado y exportación de datos.
                </p>
                <a
                  href="https://apps.apple.com/es/app/finanzasfacil/id6754602748"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-indigo-900 font-semibold underline"
                >
                  Ver app en App Store
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nuestros valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacidad</h3>
                <p className="text-gray-600 text-sm">
                  Tus datos personales están protegidos. No compartimos información sin tu consentimiento.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Accesibilidad</h3>
                <p className="text-gray-600 text-sm">
                  Herramientas optimizadas para móvil y fáciles de usar para cualquier persona.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Precisión</h3>
                <p className="text-gray-600 text-sm">
                  Cálculos actualizados con la normativa fiscal vigente en España.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Transparencia y sostenibilidad</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4 leading-relaxed">
                FinanzasFácil es un proyecto de LIPA Studios. Mantenemos las herramientas gratuitas
                priorizando una experiencia clara, contenido educativo propio y una navegación sin
                registro obligatorio.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>Sin registro obligatorio:</strong> Puedes usar las herramientas básicas sin crear cuenta</li>
                <li>• <strong>Publicidad no intrusiva:</strong> Anuncios relevantes que no interfieren con el uso</li>
                <li>• <strong>Datos bajo tu control:</strong> El control de gastos permite guardar en el dispositivo y exportar</li>
                <li>• <strong>Herramientas actualizadas:</strong> Mantenemos los cálculos al día con la normativa</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacto y soporte</h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                ¿Tienes preguntas, sugerencias o has encontrado algún error en nuestros cálculos? 
                Estamos aquí para ayudarte. Nuestro equipo de especialistas en finanzas y desarrolladores 
                está disponible para resolver tus dudas y mejorar continuamente nuestras herramientas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">📧 Email de soporte</h3>
                  <p className="text-blue-800">lipastudios4@gmail.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">⏰ Tiempo de respuesta</h3>
                  <p className="text-blue-800">24-48 horas laborables</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">¿Cómo podemos ayudarte?</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Dudas sobre cálculos fiscales y salariales</li>
                  <li>• Sugerencias para nuevas funcionalidades</li>
                  <li>• Reporte de errores en las calculadoras</li>
                  <li>• Consultas sobre optimización fiscal</li>
                  <li>• Solicitudes de contenido educativo</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nuestra historia y compromiso</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4 leading-relaxed">
                FinanzasFácil nació en 2024 con la misión de hacer accesible la educación financiera a todos los españoles. 
                Observamos que muchas personas tenían dificultades para entender conceptos básicos como el cálculo del salario neto, 
                la fiscalidad de los autónomos o la planificación del ahorro para la jubilación.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Decidimos crear herramientas gratuitas y fáciles de usar que democratizaran el acceso a la información financiera. 
                Nuestro equipo combina experiencia en el sector financiero español con las últimas tecnologías web para ofrecer 
                calculadoras precisas y actualizadas con la normativa vigente.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Seguimos mejorando el proyecto con nuevas calculadoras, explicaciones más claras y avisos
                prudentes sobre los límites de cada simulación. La meta es que las finanzas personales sean
                más fáciles de entender, sin prometer resultados que dependan de cada caso particular.
              </p>
            </div>
          </section>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Última actualización: Mayo 2026 | FinanzasFácil - Herramientas financieras gratuitas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
