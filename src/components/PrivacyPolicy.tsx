import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg">
              <strong>Última actualización:</strong> 19 de enero de 2025
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Importante:</strong> Esta política describe cómo FinanzasFácil recopila, 
                utiliza y protege tu información personal cuando utilizas nuestro sitio web y servicios.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Información que recopilamos</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1.1 Información personal</h3>
            <p>Recopilamos información que nos proporcionas directamente, incluyendo:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Datos de contacto (nombre, dirección de email)</li>
              <li>Información financiera que introduces en nuestras calculadoras (salarios, gastos, objetivos de ahorro)</li>
              <li>Comentarios, preguntas y comunicaciones que nos envías</li>
              <li>Información de registro si creas una cuenta</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1.2 Información técnica</h3>
            <p>Recopilamos automáticamente cierta información cuando visitas nuestro sitio:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dirección IP y ubicación geográfica aproximada</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Referencias de sitios web que te dirigieron a nosotros</li>
              <li>Datos de cookies y tecnologías similares</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Cómo utilizamos tu información</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Propósitos principales</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Proporcionar servicios:</strong> Ejecutar nuestras calculadoras financieras y herramientas</li>
              <li><strong>Personalización:</strong> Adaptar el contenido y las recomendaciones a tus necesidades</li>
              <li><strong>Comunicación:</strong> Responder a tus consultas y enviar actualizaciones del servicio</li>
              <li><strong>Mejora continua:</strong> Analizar el uso para mejorar nuestros servicios</li>
              <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y regulatorias</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Marketing y publicidad</h3>
            <p>
              Podemos utilizar tu información para enviarte contenido educativo financiero, 
              ofertas especiales y actualizaciones sobre nuevos servicios. Siempre puedes 
              optar por no recibir estas comunicaciones.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Cookies y tecnologías de seguimiento</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Tipos de cookies</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio</li>
              <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo los usuarios interactúan con el sitio</li>
              <li><strong>Cookies de funcionalidad:</strong> Recuerdan tus preferencias y configuraciones</li>
              <li><strong>Cookies de publicidad:</strong> Utilizadas para mostrar anuncios relevantes</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Google AdSense</h3>
            <p>
              Utilizamos Google AdSense para mostrar anuncios. Google puede utilizar cookies 
              para personalizar anuncios según tus intereses. Puedes gestionar tus preferencias 
              de anuncios en <a href="https://adssettings.google.com" className="text-blue-600 hover:underline">Google Ad Settings</a>.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Compartir información con terceros</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Proveedores de servicios</h3>
            <p>Compartimos información con proveedores que nos ayudan a operar nuestro negocio:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics:</strong> Para análisis de tráfico web</li>
              <li><strong>Google AdSense:</strong> Para mostrar anuncios relevantes</li>
              <li><strong>Netlify:</strong> Para hosting y servicios de infraestructura</li>
              <li><strong>Servicios de email:</strong> Para comunicaciones (si te suscribes)</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Requisitos legales</h3>
            <p>
              Podemos divulgar información si es requerido por ley, orden judicial, 
              o para proteger nuestros derechos, propiedad o seguridad.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Seguridad de la información</h2>
            
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cifrado SSL/TLS para todas las transmisiones de datos</li>
              <li>Acceso restringido a la información personal</li>
              <li>Monitoreo regular de sistemas de seguridad</li>
              <li>Capacitación del personal en privacidad y seguridad</li>
            </ul>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <p className="text-yellow-800">
                <strong>Nota importante:</strong> Aunque implementamos medidas de seguridad robustas, 
                ningún método de transmisión por Internet es 100% seguro. No podemos garantizar 
                la seguridad absoluta de tu información.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Retención de datos</h2>
            
            <p>Conservamos tu información personal durante el tiempo necesario para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cumplir con los propósitos para los que fue recopilada</li>
              <li>Satisfacer requisitos legales y regulatorios</li>
              <li>Resolver disputas y hacer cumplir acuerdos</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Tus derechos y opciones</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Derechos de privacidad</h3>
            <p>Dependiendo de tu ubicación, puedes tener los siguientes derechos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> Solicitar una copia de la información que tenemos sobre ti</li>
              <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
              <li><strong>Eliminación:</strong> Solicitar la eliminación de tu información personal</li>
              <li><strong>Limitación:</strong> Restringir el procesamiento de tu información</li>
              <li><strong>Portabilidad:</strong> Recibir tu información en un formato estructurado</li>
              <li><strong>Oposición:</strong> Oponerte al procesamiento de tu información</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 Gestión de cookies</h3>
            <p>
              Puedes controlar las cookies a través de la configuración de tu navegador. 
              Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Transferencias internacionales</h2>
            
            <p>
              Tu información puede ser transferida y procesada en países fuera de tu país de residencia. 
              Nos aseguramos de que dichas transferencias cumplan con las leyes de protección de datos aplicables.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Menores de edad</h2>
            
            <p>
              Nuestros servicios no están dirigidos a menores de 16 años. No recopilamos 
              intencionalmente información personal de menores de 16 años sin el consentimiento 
              verificable de los padres.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Cambios a esta política</h2>
            
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre 
              cambios significativos mediante:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Publicación de la nueva política en esta página</li>
              <li>Notificación por email (si tienes una cuenta)</li>
              <li>Aviso prominente en nuestro sitio web</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contacto</h2>
            
            <p>Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad, puedes contactarnos:</p>
            
            <div className="bg-gray-50 p-6 rounded-xl mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Información de contacto</h3>
              <ul className="space-y-2">
                <li><strong>Email:</strong> <a href="mailto:lipastudios4@gmail.com" className="text-blue-600 hover:underline">lipastudios4@gmail.com</a></li>
                <li><strong>Sitio web:</strong> <a href="https://finanzasmuyfacil.com" className="text-blue-600 hover:underline">https://finanzasmuyfacil.com</a></li>
                <li><strong>Asunto sugerido:</strong> "Consulta sobre Política de Privacidad"</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-6">
              <p className="text-green-800">
                <strong>Compromiso de respuesta:</strong> Nos comprometemos a responder a todas 
                las consultas relacionadas con privacidad dentro de 72 horas hábiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;