import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Términos de Servicio</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg">
              <strong>Última actualización:</strong> 19 de enero de 2025
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-green-800">
                <strong>Bienvenido a FinanzasFácil:</strong> Al acceder y utilizar nuestro sitio web, 
                aceptas estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Aceptación de los términos</h2>
            
            <p>
              Al acceder y utilizar <strong>FinanzasFácil</strong> (finanzasmuyfaciles.netlify.app), 
              aceptas cumplir con estos Términos de Servicio y todas las leyes y regulaciones aplicables. 
              Si no estás de acuerdo con alguno de estos términos, está prohibido el uso de este sitio.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Descripción del servicio</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Servicios ofrecidos</h3>
            <p>FinanzasFácil proporciona:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Calculadoras financieras:</strong> Herramientas para calcular salarios netos, impuestos de autónomos, y proyecciones de ahorro</li>
              <li><strong>Control de gastos:</strong> Sistema para registrar y categorizar gastos personales</li>
              <li><strong>Educación financiera:</strong> Artículos, guías y recursos educativos sobre finanzas personales</li>
              <li><strong>Herramientas de planificación:</strong> Calculadoras de objetivos financieros y planificación de jubilación</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Naturaleza de los servicios</h3>
            <p>
              Nuestros servicios son herramientas educativas y de cálculo. Los resultados proporcionados 
              son estimaciones basadas en información general y no constituyen asesoramiento financiero, 
              legal o fiscal profesional.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Uso aceptable</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Uso permitido</h3>
            <p>Puedes utilizar nuestros servicios para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cálculos financieros personales y educativos</li>
              <li>Control y seguimiento de gastos personales</li>
              <li>Educación financiera personal</li>
              <li>Planificación financiera personal</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Uso prohibido</h3>
            <p>Está prohibido utilizar nuestros servicios para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Actividades ilegales o fraudulentas</li>
              <li>Violación de derechos de propiedad intelectual</li>
              <li>Transmisión de virus, malware o código malicioso</li>
              <li>Spam, phishing o actividades de acoso</li>
              <li>Intentos de acceso no autorizado a nuestros sistemas</li>
              <li>Uso comercial no autorizado de nuestros servicios</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Registro y cuentas de usuario</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Creación de cuenta</h3>
            <p>
              Al registrarte en nuestro servicio, debes proporcionar información precisa y completa. 
              Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Responsabilidades del usuario</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mantener la información de tu cuenta actualizada</li>
              <li>Proteger la confidencialidad de tu contraseña</li>
              <li>Notificarnos inmediatamente cualquier uso no autorizado</li>
              <li>Ser responsable de todas las actividades en tu cuenta</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Propiedad intelectual</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Derechos de autor</h3>
            <p>
              Todo el contenido de FinanzasFácil, incluyendo texto, gráficos, logotipos, iconos, 
              imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad 
              de FinanzasFácil o sus proveedores de contenido y está protegido por las leyes de derechos de autor.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 Uso de marca</h3>
            <p>
              El nombre "FinanzasFácil" y todos los nombres, logotipos y marcas relacionadas son 
              marcas comerciales de FinanzasFácil. No puedes utilizar estas marcas sin nuestro 
              consentimiento previo por escrito.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Limitación de responsabilidad</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <p className="text-yellow-800">
                <strong>Importante:</strong> Los servicios de FinanzasFácil se proporcionan "tal como están" 
                sin garantías de ningún tipo.
              </p>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Descargo de responsabilidad</h3>
            <p>
              FinanzasFácil no será responsable de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pérdidas financieras derivadas del uso de nuestras calculadoras</li>
              <li>Decisiones tomadas basándose en los resultados de nuestras herramientas</li>
              <li>Interrupciones del servicio o errores técnicos</li>
              <li>Pérdida de datos o información del usuario</li>
              <li>Daños indirectos, incidentales o consecuenciales</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Precisión de la información</h3>
            <p>
              Aunque nos esforzamos por mantener la información actualizada y precisa, no garantizamos 
              la exactitud, completitud o actualidad de toda la información proporcionada. Los usuarios 
              deben verificar la información antes de tomar decisiones financieras importantes.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Publicidad y contenido de terceros</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Google AdSense</h3>
            <p>
              Nuestro sitio web utiliza Google AdSense para mostrar anuncios. Google puede utilizar 
              cookies para personalizar anuncios según tus intereses. La presencia de anuncios no 
              constituye un respaldo de FinanzasFácil hacia los productos o servicios anunciados.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 Enlaces externos</h3>
            <p>
              Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables 
              del contenido, políticas de privacidad o prácticas de estos sitios externos.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Privacidad y protección de datos</h2>
            
            <p>
              La recopilación y uso de información personal se rige por nuestra 
              <a href="/privacy" className="text-blue-600 hover:underline"> Política de Privacidad</a>, 
              que forma parte integral de estos Términos de Servicio.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Modificaciones del servicio</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.1 Cambios en los términos</h3>
            <p>
              Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. 
              Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.2 Cambios en el servicio</h3>
            <p>
              Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte de 
              nuestros servicios con o sin previo aviso.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Terminación</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.1 Terminación por el usuario</h3>
            <p>
              Puedes terminar tu cuenta en cualquier momento eliminando tu perfil o contactándonos 
              directamente.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.2 Terminación por nuestra parte</h3>
            <p>
              Podemos suspender o terminar tu acceso a nuestros servicios inmediatamente, sin previo 
              aviso, por violación de estos términos o por cualquier otra razón a nuestra discreción.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Ley aplicable y jurisdicción</h2>
            
            <p>
              Estos Términos de Servicio se rigen por las leyes de España. Cualquier disputa que 
              surja de estos términos será resuelta en los tribunales competentes de España.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Disposiciones generales</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.1 Divisibilidad</h3>
            <p>
              Si alguna disposición de estos términos es considerada inválida o inaplicable, 
              las disposiciones restantes permanecerán en pleno vigor y efecto.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.2 Renuncia</h3>
            <p>
              El hecho de que no ejerzamos algún derecho o disposición de estos términos no 
              constituirá una renuncia a tal derecho o disposición.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contacto</h2>
            
            <p>Si tienes preguntas sobre estos Términos de Servicio, puedes contactarnos:</p>
            
            <div className="bg-gray-50 p-6 rounded-xl mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Información de contacto</h3>
              <ul className="space-y-2">
                <li><strong>Email:</strong> <a href="mailto:lipastudios4@gmail.com" className="text-blue-600 hover:underline">lipastudios4@gmail.com</a></li>
                <li><strong>Sitio web:</strong> <a href="https://finanzasmuyfaciles.netlify.app" className="text-blue-600 hover:underline">https://finanzasmuyfaciles.netlify.app</a></li>
                <li><strong>Asunto sugerido:</strong> "Consulta sobre Términos de Servicio"</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
              <p className="text-blue-800">
                <strong>Compromiso de respuesta:</strong> Nos comprometemos a responder a todas 
                las consultas relacionadas con estos términos dentro de 72 horas hábiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;