
function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-6">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contacto y Soporte</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Cómo podemos ayudarte?</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              En FinanzasFácil valoramos tu opinión y estamos aquí para ayudarte. Si tienes preguntas, 
              sugerencias, has encontrado algún error en nuestros cálculos o necesitas soporte técnico, 
              no dudes en contactarnos.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">📧 Contacto General</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-blue-800">Email principal:</p>
                  <a 
                    href="mailto:lipastudios4@gmail.com" 
                    className="text-blue-600 hover:text-blue-800 underline break-all"
                  >
                    lipastudios4@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-blue-800">Tiempo de respuesta:</p>
                  <p className="text-blue-700">24-48 horas laborables</p>
                </div>
                <div>
                  <p className="font-medium text-blue-800">Horario de atención:</p>
                  <p className="text-blue-700">Lunes a Viernes, 9:00-18:00 (CET)</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4">🐛 Reportar Errores</h3>
              <div className="space-y-3">
                <p className="text-green-700">
                  Si has encontrado un error en alguna de nuestras calculadoras, por favor incluye:
                </p>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Calculadora utilizada</li>
                  <li>• Valores introducidos</li>
                  <li>• Resultado esperado vs obtenido</li>
                  <li>• Captura de pantalla (opcional)</li>
                </ul>
                <a 
                  href="mailto:lipastudios4@gmail.com" 
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Reportar Error
                </a>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tipos de consultas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Sugerencias</h3>
                <p className="text-purple-700 text-sm">
                  ¿Tienes ideas para mejorar nuestras herramientas? Nos encanta escuchar propuestas.
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="text-3xl mb-3">❓</div>
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Dudas Técnicas</h3>
                <p className="text-orange-700 text-sm">
                  Preguntas sobre cómo usar las calculadoras o interpretar los resultados.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-6">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">Problemas Técnicos</h3>
                <p className="text-red-700 text-sm">
                  Errores de funcionamiento, problemas de carga o incompatibilidades.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Soporte para Empresas</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                ¿Eres una empresa interesada en integrar nuestras calculadoras o necesitas 
                una solución personalizada? Ofrecemos servicios de consultoría y desarrollo 
                de herramientas financieras.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-800">Email empresarial:</p>
                  <a 
                    href="mailto:lipastudios4@gmail.com" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    lipastudios4@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Servicios:</p>
                  <p className="text-gray-700 text-sm">
                    Integración API, desarrollo personalizado, consultoría financiera
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Otras formas de contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">💖 Donaciones</h3>
                <p className="text-yellow-800 mb-3">
                  ¿Te gustan nuestras herramientas? Ayúdanos a mantener el servicio gratuito.
                </p>
                <p className="text-yellow-700 text-sm">
                  Utiliza el botón "💖 Donar" en la página principal para donar vía PayPal.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-3">📱 Feedback Directo</h3>
                <p className="text-indigo-800 mb-3">
                  ¿Prefieres enviar feedback directamente desde la app?
                </p>
                <p className="text-indigo-700 text-sm">
                  Busca el botón 💬 en el menú de la aplicación.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">¿Cuánto tardan en responder?</h4>
                <p className="text-gray-600 text-sm">
                  Normalmente respondemos en 24-48 horas laborables. Para errores críticos, 
                  priorizamos la respuesta en menos de 24 horas.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">¿Ofrecen soporte en otros idiomas?</h4>
                <p className="text-gray-600 text-sm">
                  Actualmente ofrecemos soporte en español. Para consultas en inglés, 
                  también podemos ayudarte, pero la respuesta puede tardar un poco más.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">¿Puedo solicitar nuevas calculadoras?</h4>
                <p className="text-gray-600 text-sm">
                  ¡Por supuesto! Valoramos las sugerencias de nuestros usuarios. 
                  Si es técnicamente viable y útil para la comunidad, la consideraremos.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Gracias por confiar en FinanzasFácil. Tu feedback nos ayuda a mejorar cada día.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;


