export default function LandingCuota() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Cuota Autónomos 2025: Calcula la Tuya
          </h1>
          <p className="text-2xl mb-4 opacity-90">
            Descubre cuánto pagarás con el nuevo sistema por ingresos reales
          </p>
          <p className="text-xl mb-8 opacity-80">
            ✅ Tarifa Plana 80€ • ✅ Bonificaciones • ✅ Calculadora Gratis
          </p>
          <a
            href="/autonomos"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-2xl px-12 py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
          >
            🧮 CALCULAR MI CUOTA
          </a>
        </div>
      </div>

      {/* Novedades 2025 */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Novedades Cuota Autónomos 2025
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Tarifa Plana 80€</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Paga solo 80€/mes durante el primer año como autónomo. 
                <strong> Ahorra más de 2.500€</strong> el primer año.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ 12 meses a 80€/mes</li>
                <li>✓ Después 50% descuento 6 meses</li>
                <li>✓ Luego 30% descuento 6 meses</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Sistema por Ingresos Reales</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tu cuota se ajusta automáticamente según lo que ganes. 
                <strong> Pagas según tus ingresos netos</strong>.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ 15 tramos de cotización</li>
                <li>✓ Desde 230€ hasta 590€/mes</li>
                <li>✓ Ajuste cada 2 meses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Cuotas */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Tabla de Cuotas 2025
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-blue-300">
                  <th className="pb-4">Ingresos Netos/Mes</th>
                  <th className="pb-4 text-right">Cuota Mensual</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200">
                  <td className="py-3">Menos de 670€</td>
                  <td className="py-3 text-right font-bold text-green-600">230€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">670€ - 900€</td>
                  <td className="py-3 text-right font-bold">260€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">900€ - 1.166€</td>
                  <td className="py-3 text-right font-bold">294€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">1.166€ - 1.300€</td>
                  <td className="py-3 text-right font-bold">320€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">1.300€ - 1.500€</td>
                  <td className="py-3 text-right font-bold">350€</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">1.500€ - 1.700€</td>
                  <td className="py-3 text-right font-bold">380€</td>
                </tr>
                <tr>
                  <td className="py-3">Más de 6.000€</td>
                  <td className="py-3 text-right font-bold text-red-600">590€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Calcula Tu Cuota Exacta en 30 Segundos
          </h2>
          <a
            href="/autonomos"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-2xl px-12 py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
          >
            🚀 CALCULAR AHORA GRATIS
          </a>
        </div>
      </div>
    </div>
  );
}

