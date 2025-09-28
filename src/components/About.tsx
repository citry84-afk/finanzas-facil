
function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-6">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Sobre FinanzasFácil</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Quiénes somos?</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              FinanzasFácil es una plataforma web especializada en educación financiera y herramientas 
              de cálculo gratuitas para mejorar la gestión personal del dinero. Nuestro equipo está 
              formado por profesionales del sector financiero y desarrolladores especializados en 
              crear herramientas útiles y fáciles de usar.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Creemos que la educación financiera debe ser accesible para todos, independientemente 
              de su nivel de conocimientos o situación económica. Por eso, ofrecemos calculadoras 
              gratuitas, guías prácticas y recursos educativos sin necesidad de registro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nuestra misión</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Democratizar el acceso a la información financiera de calidad, proporcionando 
              herramientas precisas y actualizadas que ayuden a las personas a tomar mejores 
              decisiones económicas y alcanzar sus objetivos financieros.
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
                FinanzasFácil se mantiene gracias a la publicidad responsable mediante Google AdSense. 
                Esta publicidad nos permite ofrecer todas nuestras herramientas de forma completamente 
                gratuita sin comprometer la experiencia del usuario.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>Sin registro obligatorio:</strong> Puedes usar las herramientas básicas sin crear cuenta</li>
                <li>• <strong>Publicidad no intrusiva:</strong> Anuncios relevantes que no interfieren con el uso</li>
                <li>• <strong>Datos seguros:</strong> No vendemos ni compartimos tu información personal</li>
                <li>• <strong>Herramientas actualizadas:</strong> Mantenemos los cálculos al día con la normativa</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacto y soporte</h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                ¿Tienes preguntas, sugerencias o has encontrado algún error en nuestros cálculos? 
                Estamos aquí para ayudarte.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">📧 Email de soporte</h3>
                  <p className="text-blue-800">soporte@finanzasmuyfaciles.netlify.app</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">⏰ Tiempo de respuesta</h3>
                  <p className="text-blue-800">24-48 horas laborables</p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Última actualización: Enero 2025 | FinanzasFácil - Herramientas financieras gratuitas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;


