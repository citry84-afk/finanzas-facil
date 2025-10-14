import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO4Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO4({ onNavegar }: ArticuloSEO4Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            💳 GUÍA COMPLETA 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cuota de Autónomos 2025: Nueva Normativa, Tramos y Cómo Ahorrar Miles de Euros
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Guía completa de la cuota de autónomos 2025. Nueva normativa por tramos de ingresos, 
            bonificaciones, cómo calcularla y cómo ahorrar hasta 1.000€ al año.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>📅 Actualizado: Enero 2025</span>
            <span>⏱️ 10 min de lectura</span>
            <span>👥 15.000+ autónomos ayudados</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-700 rounded-3xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">💰 ¿Qué es la cuota de autónomos?</h2>
          <p className="text-lg mb-4">
            La <strong>cuota de autónomos</strong> es el pago mensual que haces a la Seguridad Social por tu 
            cobertura sanitaria, prestaciones por desempleo, jubilación y otras prestaciones.
          </p>
          <p className="text-lg">
            <strong>Nueva normativa 2025:</strong> Desde 2025, puedes elegir tu base de cotización según tus 
            ingresos reales. Esto te permite <strong>pagar menos si ganas menos</strong>.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Nueva Normativa 2025: Cuotas por Tramos</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="border border-orange-700 px-4 py-3 text-left">Ingresos/mes</th>
                  <th className="border border-orange-700 px-4 py-3 text-right">Cuota/mes</th>
                  <th className="border border-orange-700 px-4 py-3 text-right">Cuota/año</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-white">
                  <td className="border border-orange-300 px-4 py-3">&lt; 670€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">225€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">2.700€</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-orange-300 px-4 py-3">670€ - 900€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">250€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">3.000€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-orange-300 px-4 py-3">900€ - 1.166€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">280€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">3.360€</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-orange-300 px-4 py-3">1.166€ - 1.300€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">310€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">3.720€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-orange-300 px-4 py-3">1.300€ - 1.500€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">340€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">4.080€</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-orange-300 px-4 py-3">&gt; 1.500€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">370€ - 500€</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">4.440€ - 6.000€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Consejo:</h4>
            <p className="text-gray-700">
              Puedes cambiar tu base de cotización <strong>una vez al año</strong> (en enero). 
              Asegúrate de ajustarla según tus ingresos reales para no pagar de más.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎁 Bonificaciones para Autónomos Nuevos 2025</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Si te das de alta como autónomo por primera vez, tienes derecho a <strong>bonificaciones especiales</strong> 
            que pueden ahorrarte miles de euros en los primeros años.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-2xl p-6 text-center border-2 border-green-500">
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Año 1</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">80€/mes</div>
              <p className="text-gray-600">En lugar de 225-500€</p>
              <p className="text-sm text-gray-500 mt-3">Ahorro: 1.740-5.040€/año</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 text-center border-2 border-blue-500">
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Año 2</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">150€/mes</div>
              <p className="text-gray-600">50% de descuento</p>
              <p className="text-sm text-gray-500 mt-3">Ahorro: 900-2.100€/año</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 text-center border-2 border-purple-500">
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Años 3-5</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">Varía</div>
              <p className="text-gray-600">Por comunidad autónoma</p>
              <p className="text-sm text-gray-500 mt-3">Consulta tu región</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">✅ Requisitos para Bonificaciones</h2>
          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>No haber estado de alta como autónomo en los últimos 2 años</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Darse de alta por primera vez</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Solicitar la bonificación en los 3 meses siguientes al alta</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>No haber tenido trabajadores a cargo en los 2 años anteriores</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">🎁 ¿Quieres calcular tu cuota exacta?</h2>
          <p className="text-lg mb-6">
            Usa nuestra calculadora GRATIS para calcular tu cuota de autónomos según tus ingresos reales.
          </p>
          <a
            href="/autonomos"
            className="inline-block bg-white text-green-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            🧮 USAR CALCULADORA GRATIS
          </a>
        </div>

        {/* Artículos Relacionados */}
        <div className="mt-16">
          <ArticulosRelacionados excluir="irpf-autonomos" onNavegar={onNavegar} />
        </div>

      </div>
    </div>
  );
}

