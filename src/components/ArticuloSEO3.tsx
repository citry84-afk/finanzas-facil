import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO3Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO3({ onNavegar }: ArticuloSEO3Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            📋 GUÍA COMPLETA 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Modelo 130 Autónomos 2025: Cómo Calcular y Presentar el Pago Fraccionado de IRPF
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Guía completa del Modelo 130 para autónomos. Cómo calcularlo, cuándo presentarlo, 
            ejemplos prácticos y errores comunes. Todo lo que necesitas saber en 2025.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>📅 Actualizado: Enero 2025</span>
            <span>⏱️ 12 min de lectura</span>
            <span>👥 12.000+ autónomos ayudados</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">📋 ¿Qué es el Modelo 130?</h2>
          <p className="text-lg mb-4">
            El <strong>Modelo 130</strong> es la declaración trimestral que presentas a Hacienda para pagar 
            tu IRPF de forma fraccionada (cada 3 meses). Es <strong>obligatorio</strong> para la mayoría de autónomos 
            que facturan con retención de IRPF.
          </p>
          <p className="text-lg">
            <strong>Frecuencia:</strong> Cada 3 meses (4 veces al año)<br />
            <strong>Plazo:</strong> Del 1 al 20 del mes siguiente al trimestre<br />
            <strong>Precio:</strong> GRATIS (se presenta online)
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📅 Fechas de Presentación 2025</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="border border-purple-700 px-4 py-3 text-left">Trimestre</th>
                  <th className="border border-purple-700 px-4 py-3 text-left">Periodo</th>
                  <th className="border border-purple-700 px-4 py-3 text-left">Fecha límite</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-white">
                  <td className="border border-purple-300 px-4 py-3 font-bold">1er Trimestre</td>
                  <td className="border border-purple-300 px-4 py-3">Enero - Marzo</td>
                  <td className="border border-purple-300 px-4 py-3">1-20 de abril</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-purple-300 px-4 py-3 font-bold">2º Trimestre</td>
                  <td className="border border-purple-300 px-4 py-3">Abril - Junio</td>
                  <td className="border border-purple-300 px-4 py-3">1-20 de julio</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-purple-300 px-4 py-3 font-bold">3er Trimestre</td>
                  <td className="border border-purple-300 px-4 py-3">Julio - Septiembre</td>
                  <td className="border border-purple-300 px-4 py-3">1-20 de octubre</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-purple-300 px-4 py-3 font-bold">4º Trimestre</td>
                  <td className="border border-purple-300 px-4 py-3">Octubre - Diciembre</td>
                  <td className="border border-purple-300 px-4 py-3">1-30 de enero (año siguiente)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">⚠️ Importante:</h4>
            <p className="text-gray-700">
              Si no presentas el Modelo 130 en plazo, Hacienda te multa. La multa puede ser de hasta 1.500€.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🧮 Cómo Calcular el Modelo 130</h2>
          
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fórmula del Modelo 130:</h3>
            <div className="bg-white rounded-xl p-6">
              <p className="text-2xl font-bold text-center text-gray-900 mb-4">
                Modelo 130 = (Ingresos - Gastos) × 20% - Retenciones
              </p>
              <p className="text-gray-600 text-center">
                El 20% es el tipo general, pero puede variar según tu tramo de IRPF
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h3>
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>Carlos, consultor IT (1er trimestre 2025):</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Ingresos del trimestre: 15.000€</li>
              <li>• Gastos deducibles: 3.000€</li>
              <li>• Retenciones recibidas: 2.250€ (15%)</li>
              <li>• <strong>Base imponible:</strong> 15.000€ - 3.000€ = 12.000€</li>
              <li>• <strong>IRPF 20%:</strong> 12.000€ × 20% = 2.400€</li>
              <li>• <strong>Modelo 130 a pagar:</strong> 2.400€ - 2.250€ = <strong>150€</strong></li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ ¿Quién debe presentar el Modelo 130?</h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Autónomos que facturan <strong>con retención de IRPF</strong> (15% o 7%)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Autónomos que tienen <strong>beneficios</strong> en el trimestre</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Autónomos que <strong>NO están</strong> en estimación objetiva (módulos)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">❌ Errores Comunes con el Modelo 130</h2>
          
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 1: Presentar tarde</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> Si presentas después del plazo, Hacienda te multa (hasta 1.500€).
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Pon un recordatorio en tu calendario para el día 15 de cada trimestre.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 2: No incluir todos los gastos</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> Si no incluyes todos los gastos deducibles, pagas de más.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Revisa la lista de 20 gastos deducibles y asegúrate de incluir todos los tuyos.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 3: Usar el tipo incorrecto</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> El 20% es orientativo. Si tu tramo de IRPF es diferente, debes usar ese tipo.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Calcula tu IRPF real según tus tramos y usa ese porcentaje.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">🎁 ¿Quieres la guía completa del Modelo 130?</h2>
          <p className="text-lg mb-6">
            Hemos creado una guía completa con ejemplos reales, casos prácticos y todo lo que necesitas 
            para presentar el Modelo 130 sin errores.
          </p>
          <a
            href="https://lipastudios.gumroad.com/l/jkowwe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            📚 Ver Guía Completa (19€)
          </a>
        </div>

        {/* Artículos Relacionados */}
        <div className="mt-16">
          <ArticulosRelacionados excluir="modelo-130" onNavegar={onNavegar} />
        </div>

      </div>
    </div>
  );
}

