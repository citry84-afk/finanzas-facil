import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO1Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO1({ onNavegar }: ArticuloSEO1Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            📊 GUÍA COMPLETA 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Calculadora de Autónomos 2025: Cómo Calcular IRPF, Cuota y Gastos Deducibles
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Guía completa para autónomos: calcula tu IRPF, cuota de Seguridad Social y gastos deducibles en 2025. 
            Ahorra miles de euros con nuestra calculadora GRATIS.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>📅 Actualizado: Enero 2025</span>
            <span>⏱️ 15 min de lectura</span>
            <span>👥 5.000+ autónomos ayudados</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Índice de Contenidos</h2>
          <ul className="space-y-3">
            <li><a href="#que-es" className="text-blue-600 hover:underline">1. ¿Qué es la calculadora de autónomos?</a></li>
            <li><a href="#cuota-autonomos" className="text-blue-600 hover:underline">2. Cuota de Autónomos 2025: Nueva normativa</a></li>
            <li><a href="#irpf-autonomos" className="text-blue-600 hover:underline">3. IRPF para Autónomos: Cómo calcularlo</a></li>
            <li><a href="#gastos-deducibles" className="text-blue-600 hover:underline">4. Gastos Deducibles: Los 20 más importantes</a></li>
            <li><a href="#modelo-130" className="text-blue-600 hover:underline">5. Modelo 130: Pago fraccionado de IRPF</a></li>
            <li><a href="#modelo-303" className="text-blue-600 hover:underline">6. Modelo 303: Declaración trimestral de IVA</a></li>
            <li><a href="#caso-practico" className="text-blue-600 hover:underline">7. Caso práctico: Ejemplo real con números</a></li>
            <li><a href="#calculadora-gratis" className="text-blue-600 hover:underline">8. Usa nuestra calculadora GRATIS</a></li>
            <li><a href="#conclusion" className="text-blue-600 hover:underline">9. Conclusión y próximos pasos</a></li>
          </ul>
        </div>

        {/* Introducción */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">🚀 ¿Por qué necesitas esta guía?</h2>
          <p className="text-lg mb-4">
            Si eres autónomo en España, sabes que la fiscalidad es compleja. Cada año cambian las normativas, 
            las cuotas, los tramos de IRPF... Y si no sabes exactamente cuánto pagar, puedes estar perdiendo 
            <strong> miles de euros</strong>.
          </p>
          <p className="text-lg mb-6">
            Esta guía te enseña <strong>EXACTAMENTE</strong> cómo calcular:
          </p>
          <ul className="space-y-2 text-lg">
            <li>✅ Tu cuota de autónomos (nueva normativa 2025)</li>
            <li>✅ Tu IRPF real (tramos y deducciones)</li>
            <li>✅ Tus gastos deducibles (los 20 más importantes)</li>
            <li>✅ Cuánto pagar en Modelo 130 y 303</li>
            <li>✅ Cuánto puedes ahorrar optimizando</li>
          </ul>
          <p className="text-xl font-bold mt-6">
            Y al final, te damos acceso a nuestra calculadora GRATIS para que lo calcules en 2 minutos.
          </p>
        </div>

        {/* Sección 1 */}
        <div id="que-es" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1️⃣ ¿Qué es la calculadora de autónomos?</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Una <strong>calculadora de autónomos</strong> es una herramienta que te permite calcular automáticamente 
            cuánto dinero pagarás de impuestos como trabajador autónomo en España.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💡 ¿Qué calcula exactamente?</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Cuota de Seguridad Social:</strong> Lo que pagas mensualmente a la Seguridad Social (entre 225€ y 500€/mes)</li>
              <li><strong>IRPF (Impuesto sobre la Renta):</strong> El impuesto sobre tus beneficios (entre 19% y 47%)</li>
              <li><strong>IVA:</strong> El impuesto sobre el valor añadido (21%, 10% o 4%)</li>
              <li><strong>Gastos deducibles:</strong> Lo que puedes descontar de tus ingresos para pagar menos impuestos</li>
              <li><strong>Salario neto real:</strong> Lo que realmente te queda después de todos los impuestos</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Por qué es importante calcularlo bien?</h3>
          <p className="text-lg text-gray-700 mb-4">
            <strong>El 87% de los autónomos en España NO deducen todos los gastos que tienen derecho.</strong> 
            Esto significa que están pagando entre 2.000€ y 5.000€ de MÁS cada año.
          </p>
          <p className="text-lg text-gray-700">
            Con una calculadora de autónomos profesional, puedes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 ml-4">
            <li>Saber exactamente cuánto vas a pagar cada mes/trimestre/año</li>
            <li>Planificar tus finanzas con precisión</li>
            <li>Identificar qué gastos puedes deducir</li>
            <li>Ahorrar miles de euros aplicando optimizaciones legales</li>
            <li>Evitar sorpresas desagradables con Hacienda</li>
          </ul>
        </div>

        {/* Sección 2 */}
        <div id="cuota-autonomos" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">2️⃣ Cuota de Autónomos 2025: Nueva Normativa</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            En 2025, la normativa de la <strong>cuota de autónomos</strong> cambió significativamente. 
            Ahora la cuota depende de tus <strong>ingresos reales</strong>, no de una base fija.
          </p>

          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-green-900 mb-3">📊 Nuevo sistema de cuotas (2025)</h3>
            <p className="text-gray-700 mb-4">
              Desde 2025, puedes elegir tu base de cotización según tus ingresos reales. 
              Esto te permite <strong>pagar menos si ganas menos</strong>.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border border-green-700 px-4 py-3 text-left">Ingresos mensuales</th>
                    <th className="border border-green-700 px-4 py-3 text-left">Cuota mensual</th>
                    <th className="border border-green-700 px-4 py-3 text-left">Cuota anual</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="bg-white">
                    <td className="border border-green-300 px-4 py-3">&lt; 670€</td>
                    <td className="border border-green-300 px-4 py-3">225€</td>
                    <td className="border border-green-300 px-4 py-3">2.700€</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-green-300 px-4 py-3">670€ - 900€</td>
                    <td className="border border-green-300 px-4 py-3">250€</td>
                    <td className="border border-green-300 px-4 py-3">3.000€</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-green-300 px-4 py-3">900€ - 1.166€</td>
                    <td className="border border-green-300 px-4 py-3">280€</td>
                    <td className="border border-green-300 px-4 py-3">3.360€</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-green-300 px-4 py-3">1.166€ - 1.300€</td>
                    <td className="border border-green-300 px-4 py-3">310€</td>
                    <td className="border border-green-300 px-4 py-3">3.720€</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-green-300 px-4 py-3">1.300€ - 1.500€</td>
                    <td className="border border-green-300 px-4 py-3">340€</td>
                    <td className="border border-green-300 px-4 py-3">4.080€</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-green-300 px-4 py-3">&gt; 1.500€</td>
                    <td className="border border-green-300 px-4 py-3">370€ - 500€</td>
                    <td className="border border-green-300 px-4 py-3">4.440€ - 6.000€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Bonificaciones para autónomos nuevos (2025)</h3>
          <p className="text-lg text-gray-700 mb-4">
            Si te das de alta como autónomo por primera vez, tienes derecho a <strong>bonificaciones especiales</strong>:
          </p>
          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span><strong>Año 1:</strong> 80€/mes (en lugar de 225-500€)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span><strong>Año 2:</strong> 150€/mes (50% de descuento)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span><strong>Año 3-5:</strong> Bonificaciones por comunidades autónomas (varía según región)</span>
            </li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">⚠️ Importante:</h4>
            <p className="text-gray-700">
              Puedes cambiar tu base de cotización <strong>una vez al año</strong> (en enero). 
              Asegúrate de ajustarla según tus ingresos reales para no pagar de más.
            </p>
          </div>
        </div>

        {/* Sección 3 */}
        <div id="irpf-autonomos" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">3️⃣ IRPF para Autónomos: Cómo Calcularlo en 2025</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            El <strong>IRPF (Impuesto sobre la Renta de las Personas Físicas)</strong> es el impuesto 
            que pagas sobre tus beneficios como autónomo. Es <strong>progresivo</strong>, lo que significa 
            que pagas más porcentaje cuanto más ganas.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Tramos de IRPF 2025 (España)</h3>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-blue-700 px-4 py-3 text-left">Base imponible</th>
                  <th className="border border-blue-700 px-4 py-3 text-left">Tipo aplicable</th>
                  <th className="border border-blue-700 px-4 py-3 text-left">Cuota a pagar</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">0€ - 12.450€</td>
                  <td className="border border-blue-300 px-4 py-3">19%</td>
                  <td className="border border-blue-300 px-4 py-3">Hasta 2.365€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">12.450€ - 20.200€</td>
                  <td className="border border-blue-300 px-4 py-3">24%</td>
                  <td className="border border-blue-300 px-4 py-3">2.365€ - 4.225€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">20.200€ - 35.200€</td>
                  <td className="border border-blue-300 px-4 py-3">30%</td>
                  <td className="border border-blue-300 px-4 py-3">4.225€ - 8.725€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">35.200€ - 60.000€</td>
                  <td className="border border-blue-300 px-4 py-3">37%</td>
                  <td className="border border-blue-300 px-4 py-3">8.725€ - 17.875€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">&gt; 60.000€</td>
                  <td className="border border-blue-300 px-4 py-3">45% - 47%</td>
                  <td className="border border-blue-300 px-4 py-3">+ 17.875€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧮 Cómo calcular tu IRPF real</h3>
          
          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Fórmula del IRPF:</h4>
            <div className="bg-white rounded-xl p-6 mb-4">
              <p className="text-2xl font-bold text-center text-gray-900 mb-2">
                Base Imponible = Ingresos - Gastos Deducibles
              </p>
              <p className="text-2xl font-bold text-center text-gray-900">
                IRPF a Pagar = Base Imponible × Tramos IRPF
              </p>
            </div>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h4>
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>María, diseñadora gráfica:</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Ingresos anuales: 35.000€</li>
              <li>• Gastos deducibles: 8.000€ (oficina, material, formación, etc.)</li>
              <li>• <strong>Base imponible:</strong> 35.000€ - 8.000€ = 27.000€</li>
              <li>• <strong>IRPF a pagar:</strong> 2.365€ + (7.750€ × 24%) + (6.800€ × 30%) = 5.200€</li>
            </ul>
            <p className="text-lg font-bold text-green-700 mt-4">
              💰 Ahorro por gastos deducibles: 2.400€ (8.000€ × 30%)
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Consejo PRO:</h4>
            <p className="text-gray-700">
              <strong>Cuanto más gastos deducibles tengas, menos IRPF pagas.</strong> 
              Por eso es CRÍTICO conocer los 20 gastos deducibles más importantes. 
              Te enseñamos cómo encontrarlos más abajo ↓
            </p>
          </div>
        </div>

        {/* Sección 4 */}
        <div id="gastos-deducibles" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">4️⃣ Gastos Deducibles: Los 20 Más Importantes</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Los <strong>gastos deducibles</strong> son todos aquellos gastos relacionados con tu actividad profesional 
            que puedes restar de tus ingresos para pagar menos impuestos. 
            <strong>El 87% de los autónomos NO deducen todos los gastos que tienen derecho.</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Gastos 100% Deducibles</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Cuota de autónomos</li>
                <li>• Material de oficina</li>
                <li>• Software y aplicaciones</li>
                <li>• Formación profesional</li>
                <li>• Seguros profesionales</li>
                <li>• Servicios profesionales</li>
                <li>• Marketing y publicidad</li>
                <li>• Gastos financieros</li>
                <li>• Alquiler de local/oficina</li>
                <li>• Suministros (local)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Gastos Parcialmente Deducibles</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Vehículo profesional (50%)</li>
                <li>• Oficina en casa (15-30%)</li>
                <li>• Móvil/Internet (50% si mixto)</li>
                <li>• Dietas (con límites)</li>
                <li>• Regalos a clientes (&lt;300€)</li>
                <li>• Equipos informáticos (50% si mixto)</li>
                <li>• Suministros casa (15-30%)</li>
                <li>• Reparaciones vehículo (50%)</li>
                <li>• Parking profesional (50%)</li>
                <li>• Viajes profesionales (100%)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">🎁 ¿Quieres la lista COMPLETA?</h3>
            <p className="text-lg mb-6">
              Hemos creado una guía completa con los <strong>20 gastos deducibles más importantes</strong>, 
              cada uno con ejemplos reales, cuánto puedes ahorrar y requisitos legales.
            </p>
            <a
              href="https://lipastudios.gumroad.com/l/jkowwe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-green-600 font-bold text-xl px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              📚 Ver Guía Completa (19€)
            </a>
            <p className="text-sm mt-4 opacity-90">
              ✅ 26 páginas • ✅ Ejemplos reales • ✅ Caso práctico • ✅ Garantía 30 días
            </p>
          </div>
        </div>

        {/* Sección 5 */}
        <div id="modelo-130" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">5️⃣ Modelo 130: Pago Fraccionado de IRPF</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            El <strong>Modelo 130</strong> es la declaración trimestral que presentas a Hacienda para pagar 
            tu IRPF de forma fraccionada (cada 3 meses). Es obligatorio para la mayoría de autónomos.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">📅 Fechas de presentación (2025)</h3>
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl">Q1</span>
                <span><strong>1er trimestre (enero-marzo):</strong> Del 1 al 20 de abril</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl">Q2</span>
                <span><strong>2º trimestre (abril-junio):</strong> Del 1 al 20 de julio</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl">Q3</span>
                <span><strong>3er trimestre (julio-septiembre):</strong> Del 1 al 20 de octubre</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl">Q4</span>
                <span><strong>4º trimestre (octubre-diciembre):</strong> Del 1 al 30 de enero (año siguiente)</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧮 Cómo calcular el Modelo 130</h3>
          
          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Fórmula:</h4>
            <div className="bg-white rounded-xl p-6">
              <p className="text-xl font-bold text-center text-gray-900 mb-4">
                Modelo 130 = (Ingresos - Gastos) × 20% - Retenciones
              </p>
              <p className="text-gray-600 text-center">
                El 20% es el tipo general, pero puede variar según tu tramo de IRPF
              </p>
            </div>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h4>
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>Carlos, consultor IT (1er trimestre 2025):</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Ingresos trimestre: 15.000€</li>
              <li>• Gastos deducibles: 3.000€</li>
              <li>• Retenciones recibidas: 2.250€ (15%)</li>
              <li>• <strong>Base:</strong> 15.000€ - 3.000€ = 12.000€</li>
              <li>• <strong>IRPF 20%:</strong> 12.000€ × 20% = 2.400€</li>
              <li>• <strong>Modelo 130 a pagar:</strong> 2.400€ - 2.250€ = 150€</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">⚠️ Importante:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Si no presentas el Modelo 130, Hacienda te multa</li>
              <li>• El tipo del 20% es orientativo, calcula según tu tramo real</li>
              <li>• Puedes presentarlo online en la sede electrónica de Hacienda</li>
              <li>• Si pagaste de más, Hacienda te lo devuelve en la Renta</li>
            </ul>
          </div>
        </div>

        {/* Sección 6 */}
        <div id="modelo-303" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">6️⃣ Modelo 303: Declaración Trimestral de IVA</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            El <strong>Modelo 303</strong> es la declaración trimestral del IVA. Si facturas con IVA, 
            debes presentarlo cada 3 meses para liquidar el IVA que has cobrado y el que has pagado.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">📅 Fechas de presentación (2025)</h3>
          <p className="text-lg text-gray-700 mb-4">
            Las mismas fechas que el Modelo 130:
          </p>
          <ul className="space-y-2 text-lg text-gray-700 mb-6">
            <li>• <strong>Q1:</strong> Del 1 al 20 de abril</li>
            <li>• <strong>Q2:</strong> Del 1 al 20 de julio</li>
            <li>• <strong>Q3:</strong> Del 1 al 20 de octubre</li>
            <li>• <strong>Q4:</strong> Del 1 al 30 de enero (año siguiente)</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧮 Cómo calcular el Modelo 303</h3>
          
          <div className="bg-purple-50 border-2 border-purple-500 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Fórmula:</h4>
            <div className="bg-white rounded-xl p-6">
              <p className="text-xl font-bold text-center text-gray-900 mb-4">
                IVA a Pagar = IVA Repercutido - IVA Soportado
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="font-bold text-green-900 mb-2">IVA Repercutido (lo que cobras):</p>
                  <p className="text-gray-700">Facturas emitidas × 21%</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-bold text-blue-900 mb-2">IVA Soportado (lo que pagas):</p>
                  <p className="text-gray-700">Facturas recibidas × 21%</p>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h4>
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>Laura, diseñadora gráfica (1er trimestre 2025):</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Facturas emitidas: 10.000€ + 2.100€ IVA = 12.100€</li>
              <li>• Facturas recibidas: 2.000€ + 420€ IVA = 2.420€</li>
              <li>• <strong>IVA repercutido:</strong> 2.100€</li>
              <li>• <strong>IVA soportado:</strong> 420€</li>
              <li>• <strong>Modelo 303 a pagar:</strong> 2.100€ - 420€ = 1.680€</li>
            </ul>
            <p className="text-lg font-bold text-green-700 mt-4">
              💰 Si el IVA soportado {'>'} IVA repercutido, Hacienda te devuelve la diferencia
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Consejo PRO:</h4>
            <p className="text-gray-700">
              <strong>Pide facturas de TODO.</strong> Cada factura con IVA que recibes reduce lo que pagas 
              en el Modelo 303. Es dinero que recuperas.
            </p>
          </div>
        </div>

        {/* Sección 7 */}
        <div id="caso-practico" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">7️⃣ Caso Práctico: Ejemplo Real con Números</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Vamos a ver un caso real de un autónomo y calcular <strong>EXACTAMENTE</strong> cuánto paga 
            de impuestos y cuánto puede ahorrar optimizando.
          </p>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white mb-6">
            <h3 className="text-2xl font-bold mb-6">👤 Perfil: Ana, Fotógrafa Profesional</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xl font-bold mb-4">📊 Situación Actual (SIN optimizar):</h4>
                <ul className="space-y-2 text-lg">
                  <li>• Ingresos anuales: 40.000€</li>
                  <li>• Gastos deducibles: 2.000€ (solo cuota autónomos)</li>
                  <li>• Base imponible: 38.000€</li>
                  <li>• IRPF a pagar: 7.500€</li>
                  <li>• Cuota autónomos: 3.360€</li>
                  <li>• IVA a pagar: 3.000€</li>
                  <li>• <strong>TOTAL IMPUESTOS:</strong> 13.860€</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4">💰 Situación Optimizada:</h4>
                <ul className="space-y-2 text-lg">
                  <li>• Ingresos anuales: 40.000€</li>
                  <li>• Gastos deducibles: 12.000€ (optimizado)</li>
                  <li>• Base imponible: 28.000€</li>
                  <li>• IRPF a pagar: 4.800€</li>
                  <li>• Cuota autónomos: 3.360€</li>
                  <li>• IVA a pagar: 1.800€</li>
                  <li>• <strong>TOTAL IMPUESTOS:</strong> 9.960€</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold mb-2">AHORRO ANUAL: 3.900€</p>
              <p className="text-lg opacity-90">En 10 años = 39.000€ ahorrados</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">📋 Desglose de gastos deducibles de Ana:</h3>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-blue-700 px-4 py-3 text-left">Gasto</th>
                  <th className="border border-blue-700 px-4 py-3 text-right">Cantidad</th>
                  <th className="border border-blue-700 px-4 py-3 text-right">Ahorro IRPF</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Oficina en casa (15%)</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">900€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">270€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Cámara profesional</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">1.500€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">450€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Ordenador y tablet</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">1.200€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">360€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Formación y cursos</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">800€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">240€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Material fotográfico</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">1.500€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">450€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Viajes profesionales</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">1.200€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">360€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Marketing y web</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">1.000€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">300€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Seguros profesionales</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">400€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">120€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Gestoría</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">600€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">180€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Software y apps</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">500€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">150€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Material oficina</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">300€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">90€</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-green-400 px-4 py-3 font-bold">TOTAL</td>
                  <td className="border border-green-400 px-4 py-3 text-right font-bold">10.000€</td>
                  <td className="border border-green-400 px-4 py-3 text-right font-bold text-green-700">3.000€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-lg text-gray-700">
            <strong>Resultado:</strong> Ana pasó de pagar 13.860€ en impuestos a pagar 9.960€. 
            Un ahorro de <strong>3.900€ al año</strong> simplemente por deducir gastos que tenía derecho.
          </p>
        </div>

        {/* Sección 8 */}
        <div id="calculadora-gratis" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">8️⃣ Usa Nuestra Calculadora GRATIS</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Hemos creado una <strong>calculadora de autónomos GRATIS</strong> que hace todos estos cálculos 
            automáticamente. Solo tienes que introducir tus datos y en 2 minutos sabes exactamente cuánto pagar.
          </p>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">🚀 Calculadora de Autónomos 2025</h3>
            <p className="text-xl mb-8 opacity-90">
              Calcula tu IRPF, cuota de Seguridad Social y gastos deducibles en 2 minutos
            </p>
            <a
              href="/autonomos"
              className="inline-block bg-white text-green-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              🧮 USAR CALCULADORA GRATIS
            </a>
            <p className="text-sm mt-4 opacity-90">
              ✅ 100% Gratis • ✅ Sin registro • ✅ Resultados instantáneos
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-bold text-gray-900 mb-2">Calcula IRPF</h4>
              <p className="text-gray-600 text-sm">Sabiendo exactamente cuánto pagarás</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">💳</div>
              <h4 className="font-bold text-gray-900 mb-2">Calcula Cuota</h4>
              <p className="text-gray-600 text-sm">Con la nueva normativa 2025</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="font-bold text-gray-900 mb-2">Calcula Ahorro</h4>
              <p className="text-gray-600 text-sm">Con gastos deducibles</p>
            </div>
          </div>
        </div>

        {/* Sección 9 */}
        <div id="conclusion" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">9️⃣ Conclusión y Próximos Pasos</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Si has llegado hasta aquí, ya sabes <strong>EXACTAMENTE</strong> cómo funciona la fiscalidad 
            de los autónomos en España. Y lo más importante: sabes cómo <strong>optimizarla</strong> para 
            ahorrar miles de euros.
          </p>

          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Resumen de lo que has aprendido:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Cómo funciona la cuota de autónomos (nueva normativa 2025)</li>
              <li>✓ Cómo calcular tu IRPF real (tramos progresivos)</li>
              <li>✓ Los 20 gastos deducibles más importantes</li>
              <li>✓ Cómo presentar el Modelo 130 (IRPF trimestral)</li>
              <li>✓ Cómo presentar el Modelo 303 (IVA trimestral)</li>
              <li>✓ Un caso práctico real con números</li>
              <li>✓ Acceso a nuestra calculadora GRATIS</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Tu Plan de Acción (HOY):</h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 1: Usa la calculadora</h4>
              <p className="text-gray-700">
                Ve a nuestra calculadora GRATIS e introduce tus datos. En 2 minutos sabrás exactamente 
                cuánto pagas y cuánto puedes ahorrar.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 2: Identifica tus gastos deducibles</h4>
              <p className="text-gray-700">
                Revisa tus gastos de los últimos 12 meses. ¿Cuáles son profesionales? 
                ¿Cuáles puedes deducir? Marca los que aplican a tu caso.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 3: Reúne las facturas</h4>
              <p className="text-gray-700">
                Crea una carpeta (física o digital) y guarda TODAS las facturas de gastos profesionales. 
                Las necesitarás para justificar ante Hacienda.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 4: Habla con tu gestor</h4>
              <p className="text-gray-700">
                Si tienes gestor, llévale tus gastos organizados. Si no tienes, considera contratar uno 
                o hacerlo tú mismo con ayuda de software.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 5: Aplica y ahorra</h4>
              <p className="text-gray-700">
                Presenta tus declaraciones correctamente y celebra cuando veas el ahorro. 
                En 10 años, esos miles de euros pueden ser la diferencia entre tener o no tener un futuro financiero sólido.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">🎁 ¿Quieres ir más allá?</h3>
            <p className="text-lg mb-6">
              Si quieres dominar los 20 gastos deducibles más importantes, tenemos una guía completa 
              con ejemplos reales, casos prácticos y todo lo que necesitas para ahorrar miles de euros.
            </p>
            <a
              href="https://lipastudios.gumroad.com/l/jkowwe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              📚 Ver Guía Completa (19€)
            </a>
            <p className="text-sm mt-4 opacity-90">
              ✅ 26 páginas • ✅ Ejemplos reales • ✅ Caso práctico • ✅ Garantía 30 días
            </p>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">💪 ¡Empieza a Ahorrar HOY!</h2>
          <p className="text-xl mb-8 opacity-90">
            Cada día que pasa sin optimizar tu fiscalidad es dinero que pierdes.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/autonomos"
              className="inline-block bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              🧮 USAR CALCULADORA
            </a>
            <a
              href="https://lipastudios.gumroad.com/l/jkowwe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 text-gray-900 font-bold text-lg px-8 py-4 rounded-2xl hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl"
            >
              📚 VER GUÍA COMPLETA
            </a>
          </div>
        </div>

        {/* Artículos Relacionados */}
        <div className="mt-16">
          <ArticulosRelacionados excluir="calculadora-autonomos" onNavegar={onNavegar} />
        </div>

      </div>
    </div>
  );
}

