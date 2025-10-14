import Breadcrumbs from './Breadcrumbs';
import FAQSchema, { FAQItem } from './FAQSchema';
import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO7Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO7({ onNavegar }: ArticuloSEO7Props) {
  const faqs: FAQItem[] = [
    {
      question: "¿Desde cuándo es obligatoria la facturación electrónica para autónomos?",
      answer: "Desde el 1 de enero de 2025 es obligatoria para TODOS los autónomos que facturen a empresas o autónomos (B2B). Si solo facturas a particulares (B2C), no es obligatorio todavía, pero se recomienda para estar preparado."
    },
    {
      question: "¿Qué pasa si no emito facturas electrónicas siendo obligatorio?",
      answer: "Puedes recibir sanciones de Hacienda que van desde 150€ hasta 6.000€ por cada factura no electrónica emitida. Además, la factura podría considerarse inválida y el cliente podría no poder deducirla, lo que genera problemas comerciales."
    },
    {
      question: "¿Necesito un software especial para emitir facturas electrónicas?",
      answer: "Sí, necesitas un software de facturación que cumpla con el formato Fact-e (XML) y que esté certificado por Hacienda. Hay muchas opciones gratuitas y de pago: Fact-e de la AEAT (gratis), Holded, Quipu, Factorial, etc."
    },
    {
      question: "¿Las facturas electrónicas reemplazan a las facturas en PDF?",
      answer: "Las facturas electrónicas (formato XML) son las oficiales y las que Hacienda reconoce. Puedes enviar un PDF adicional a tu cliente para su conveniencia, pero el XML es obligatorio. Muchos softwares generan ambos automáticamente."
    },
    {
      question: "¿Tengo que guardar las facturas electrónicas de alguna forma especial?",
      answer: "Sí, debes conservar las facturas electrónicas en formato XML durante al menos 4 años. El software de facturación suele guardarlas automáticamente. También es recomendable hacer backups periódicos para evitar pérdidas."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", onClick: () => onNavegar(0) },
            { label: "Facturación Electrónica 2025" }
          ]} 
        />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            ⚡ OBLIGATORIO 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Facturación Electrónica Obligatoria 2025: Todo lo que Debes Saber
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Guía completa sobre la obligación de facturar electrónicamente: plazos, software recomendado, sanciones y cómo adaptarte sin morir en el intento
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>📅 Actualizado: Octubre 2025</span>
            <span>⏱️ Lectura: 10 min</span>
            <span>✍️ Por FinanzasFácil</span>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🚨 ALERTA IMPORTANTE:</h3>
            <p className="text-lg text-gray-700">
              Desde el <strong>1 de enero de 2025</strong>, TODOS los autónomos que facturen a empresas o a otros autónomos 
              <strong> están obligados a emitir facturas electrónicas</strong>. No hacerlo puede costarte multas de hasta 6.000€ por factura.
            </p>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            La facturación electrónica NO es simplemente enviar un PDF por email. Es un sistema específico que usa el 
            formato <strong>Fact-e (XML)</strong> y que debe cumplir con los requisitos de Hacienda.
          </p>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            En esta guía te explico <strong>paso a paso</strong> cómo adaptarte, qué software usar, cuánto cuesta y cómo evitar sanciones.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📋 ¿Qué es la Facturación Electrónica?</h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            La facturación electrónica es un sistema de emisión y recepción de facturas en <strong>formato digital estructurado (XML)</strong> 
            que permite a Hacienda <strong>recibir automáticamente</strong> una copia de cada factura que emites.
          </p>

          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 Diferencias clave:</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-blue-200">
                  <th className="pb-3 text-gray-900"></th>
                  <th className="pb-3 text-gray-900">Factura tradicional</th>
                  <th className="pb-3 text-gray-900">Factura electrónica</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-100">
                  <td className="py-3 font-semibold">Formato</td>
                  <td className="py-3">PDF, papel</td>
                  <td className="py-3 text-green-600 font-bold">XML (Fact-e)</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-3 font-semibold">Envío a Hacienda</td>
                  <td className="py-3">Manual (declaraciones)</td>
                  <td className="py-3 text-green-600 font-bold">Automático</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-3 font-semibold">Validez legal</td>
                  <td className="py-3">Válida (hasta 2024)</td>
                  <td className="py-3 text-green-600 font-bold">Obligatoria (2025+)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Software necesario</td>
                  <td className="py-3">No</td>
                  <td className="py-3 text-green-600 font-bold">Sí (certificado)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">⏰ Calendario de Obligatoriedad</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">✅ 1 de enero de 2025: Autónomos y empresas (+6M€)</h4>
              <p className="text-gray-700">
                Obligatorio para TODOS los autónomos que facturen a empresas o autónomos (B2B), independientemente de su facturación.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">⏳ 2026 (fecha por confirmar): Empresas menores</h4>
              <p className="text-gray-700">
                Se extenderá a empresas con facturación menor a 6M€ que aún no estén obligadas.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">❓ Futuro: B2C (autónomos a particulares)</h4>
              <p className="text-gray-700">
                Aún no es obligatorio facturar electrónicamente a particulares, pero se espera que lo sea en el futuro.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">💻 Software de Facturación Electrónica Recomendado</h2>
          
          <div className="space-y-6 mb-6">
            <div className="bg-purple-50 border-2 border-purple-400 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🆓</span> FACT-E (AEAT) - GRATIS
              </h4>
              <p className="text-gray-700 mb-3">
                Software oficial de Hacienda, <strong>100% gratuito</strong>. Básico pero funcional. Ideal si facturas poco.
              </p>
              <p className="text-sm bg-purple-100 p-3 rounded-lg">
                ✅ <strong>Pros:</strong> Gratis, oficial, actualizado<br/>
                ❌ <strong>Contras:</strong> Interfaz antigua, sin automatizaciones, sin app móvil
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>💼</span> Holded - 19€/mes
              </h4>
              <p className="text-gray-700 mb-3">
                Software completo de facturación y contabilidad. Genera facturas electrónicas automáticamente.
              </p>
              <p className="text-sm bg-blue-100 p-3 rounded-lg">
                ✅ <strong>Pros:</strong> Muy completo, app móvil, automatizaciones, integración con bancos<br/>
                ❌ <strong>Contras:</strong> Precio mensual, curva de aprendizaje
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>⚡</span> Quipu - 15€/mes
              </h4>
              <p className="text-gray-700 mb-3">
                Muy sencillo de usar, perfecto para autónomos que empiezan. Genera facturas electrónicas en un clic.
              </p>
              <p className="text-sm bg-green-100 p-3 rounded-lg">
                ✅ <strong>Pros:</strong> Interfaz sencilla, app móvil, soporte en español<br/>
                ❌ <strong>Contras:</strong> Menos funciones que Holded
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">⚠️ Sanciones por No Cumplir</h2>
          
          <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">💰 Multas de Hacienda:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">❌</span>
                <div>
                  <strong>No emitir factura electrónica:</strong> Multa de 150€ a 6.000€ por cada factura
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">❌</span>
                <div>
                  <strong>Formato incorrecto:</strong> Multa de 150€ a 1.500€ por factura
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">❌</span>
                <div>
                  <strong>No conservar facturas electrónicas:</strong> Multa de 300€ a 1.500€
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">❌</span>
                <div>
                  <strong>Reincidencia:</strong> Las multas se duplican o triplican
                </div>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">🚀 Cómo Adaptarte en 5 Pasos</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h4 className="font-bold text-gray-900 mb-2">PASO 1: Elige un software de facturación certificado</h4>
              <p className="text-gray-700">
                Usa Fact-e (gratis) o un software de pago como Holded, Quipu o Factorial. Asegúrate de que esté certificado por Hacienda.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
              <h4 className="font-bold text-gray-900 mb-2">PASO 2: Configura tu perfil y datos fiscales</h4>
              <p className="text-gray-700">
                Introduce tus datos de autónomo, CIF, dirección, y configuración de IVA (21%, 10%, 4% según tu actividad).
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-900 mb-2">PASO 3: Emite tu primera factura electrónica de prueba</h4>
              <p className="text-gray-700">
                Haz una factura de prueba y verifica que se genera correctamente en formato XML. Envíala a un email de prueba.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <h4 className="font-bold text-gray-900 mb-2">PASO 4: Informa a tus clientes del cambio</h4>
              <p className="text-gray-700">
                Avisa a tus clientes de que a partir de ahora recibirán facturas electrónicas en formato XML. 
                Puedes seguir enviando PDF adicional para su comodidad.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
              <h4 className="font-bold text-gray-900 mb-2">PASO 5: Guarda TODAS las facturas electrónicas (XML)</h4>
              <p className="text-gray-700">
                Conserva las facturas en formato XML durante al menos 4 años. Haz backups periódicos.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Schema */}
        <div className="mb-12">
          <FAQSchema faqs={faqs} showVisual={true} />
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">🧮 ¿Necesitas calcular tus impuestos como autónomo?</h3>
          <p className="text-lg mb-6">
            Usa nuestra calculadora GRATIS para saber cuánto pagarás de IRPF, cuota y gastos deducibles
          </p>
          <a
            href="/autonomos"
            className="inline-block bg-white text-blue-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            🧮 USAR CALCULADORA GRATIS
          </a>
        </div>

        {/* Artículos Relacionados */}
        <ArticulosRelacionados excluir="facturacion-electronica" onNavegar={onNavegar} />

      </div>
    </div>
  );
}

