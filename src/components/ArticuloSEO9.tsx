import Breadcrumbs from './Breadcrumbs';
import FAQSchema, { FAQItem } from './FAQSchema';
import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO9Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO9({ onNavegar }: ArticuloSEO9Props) {
  const faqs: FAQItem[] = [
    {
      question: "¿Qué es la pluriactividad para autónomos?",
      answer: "La pluriactividad es la situación en la que una persona cotiza simultáneamente en dos regímenes de la Seguridad Social: como trabajador por cuenta ajena (empleado) y como autónomo. Esto da derecho a bonificaciones especiales en la cuota de autónomos."
    },
    {
      question: "¿Cuánto me ahorro con la bonificación por pluriactividad?",
      answer: "Con la bonificación por pluriactividad puedes reducir la cuota de autónomo hasta un 50% durante 18 meses. Si tu cuota normal es 294€/mes, pagarías 147€/mes, ahorrando 2.646€ en 18 meses."
    },
    {
      question: "¿Puedo combinar tarifa plana con pluriactividad?",
      answer: "No puedes combinar ambas bonificaciones simultáneamente. Debes elegir la que más te convenga: tarifa plana (80€/mes el primer año) o pluriactividad (50% descuento durante 18 meses). Normalmente la tarifa plana es mejor el primer año."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <Breadcrumbs 
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", onClick: () => onNavegar(0) },
            { label: "Pluriactividad Autónomos 2025" }
          ]} 
        />

        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            💼 BONIFICACIÓN ESPECIAL
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pluriactividad Autónomos 2025: Bonificaciones y Requisitos
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Cómo ahorrar hasta 2.646€ si trabajas por cuenta ajena y eres autónomo a la vez
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🤝 ¿Qué es la Pluriactividad?</h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Estás en situación de <strong>pluriactividad</strong> cuando cotizas <strong>simultáneamente</strong> en:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">👔 Régimen General</h3>
              <p className="text-gray-700">
                Trabajas por cuenta ajena (empleado) en una empresa con contrato laboral.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">💼 Régimen de Autónomos (RETA)</h3>
              <p className="text-gray-700">
                Trabajas por cuenta propia como autónomo con actividad económica.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-2xl mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💰 Bonificación por Pluriactividad:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ <strong>50% de descuento</strong> en la cuota de autónomo durante 18 meses</li>
              <li>✓ Aplicable SOLO si tu base de cotización como empleado es {'>'} base mínima</li>
              <li>✓ No es compatible con tarifa plana ni otras bonificaciones</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">📋 Requisitos para la Bonificación</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">✅ 1. Estar dado de alta simultáneamente</h4>
              <p className="text-gray-700">
                Debes estar trabajando por cuenta ajena Y como autónomo al mismo tiempo. No vale tener solo uno de los dos.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">✅ 2. No haber disfrutado de la bonificación antes</h4>
              <p className="text-gray-700">
                Si ya disfrutaste de la bonificación por pluriactividad en el pasado, debes esperar 5 años para volver a solicitarla.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">✅ 3. Solicitar la bonificación en el momento del alta</h4>
              <p className="text-gray-700">
                Debes marcar la casilla de pluriactividad cuando te des de alta como autónomo (modelo TA.0521).
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">💡 ¿Cuánto Ahorras con Pluriactividad?</h2>
          
          <div className="bg-purple-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Ejemplo de ahorro:</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-purple-300">
                  <th className="pb-3 text-gray-900">Concepto</th>
                  <th className="pb-3 text-gray-900 text-right">Sin bonificación</th>
                  <th className="pb-3 text-gray-900 text-right">Con pluriactividad</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-purple-200">
                  <td className="py-3">Cuota mensual</td>
                  <td className="py-3 text-right font-bold text-red-600">294€</td>
                  <td className="py-3 text-right font-bold text-green-600">147€</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="py-3">Total 18 meses</td>
                  <td className="py-3 text-right font-bold">5.292€</td>
                  <td className="py-3 text-right font-bold text-green-600">2.646€</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold">AHORRO TOTAL</td>
                  <td className="py-3 text-right"></td>
                  <td className="py-3 text-right font-bold text-green-700 text-2xl">2.646€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">🆚 Tarifa Plana vs Pluriactividad: ¿Cuál elegir?</h2>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-blue-300">
                  <th className="pb-3 text-gray-900">Concepto</th>
                  <th className="pb-3 text-gray-900">Tarifa Plana</th>
                  <th className="pb-3 text-gray-900">Pluriactividad</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-200">
                  <td className="py-3">Cuota mes 1-12</td>
                  <td className="py-3 font-bold text-green-600">80€</td>
                  <td className="py-3 font-bold">147€</td>
                </tr>
                <tr className="border-b border-blue-200">
                  <td className="py-3">Cuota mes 13-18</td>
                  <td className="py-3 font-bold">147€</td>
                  <td className="py-3 font-bold text-green-600">147€</td>
                </tr>
                <tr className="border-b border-blue-200">
                  <td className="py-3">Cuota mes 19-24</td>
                  <td className="py-3 font-bold">206€</td>
                  <td className="py-3 font-bold text-red-600">294€</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold">Ahorro total</td>
                  <td className="py-3 font-bold text-green-700">2.568€ (año 1)</td>
                  <td className="py-3 font-bold">2.646€ (18 meses)</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-600 mt-4">
              💡 <strong>Recomendación:</strong> Si puedes elegir, usa tarifa plana el primer año (ahorro mayor). 
              Si ya no tienes derecho a tarifa plana, la pluriactividad es excelente alternativa.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <FAQSchema faqs={faqs} showVisual={true} />
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 text-white text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">🧮 Calcula tu Cuota de Autónomo 2025</h3>
          <a
            href="/autonomos"
            className="inline-block bg-white text-blue-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            🧮 CALCULAR CUOTA GRATIS
          </a>
        </div>

        <ArticulosRelacionados excluir="pluriactividad" onNavegar={onNavegar} />

      </div>
    </div>
  );
}

