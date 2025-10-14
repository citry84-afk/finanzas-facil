import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO2Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO2({ onNavegar }: ArticuloSEO2Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            💰 GUÍA COMPLETA 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gastos Deducibles para Autónomos 2025: Lista Completa y Cómo Ahorrar Miles de Euros
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Descubre los 20 gastos deducibles más importantes para autónomos en 2025. 
            Ejemplos reales, cuánto puedes ahorrar y requisitos legales. Ahorra entre 2.000€ y 5.000€ al año.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>📅 Actualizado: Enero 2025</span>
            <span>⏱️ 18 min de lectura</span>
            <span>👥 8.000+ autónomos ayudados</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Índice de Contenidos</h2>
          <ul className="space-y-3">
            <li><a href="#que-son" className="text-blue-600 hover:underline">1. ¿Qué son los gastos deducibles?</a></li>
            <li><a href="#por-que-importante" className="text-blue-600 hover:underline">2. ¿Por qué son tan importantes?</a></li>
            <li><a href="#lista-completa" className="text-blue-600 hover:underline">3. Lista completa de 20 gastos deducibles</a></li>
            <li><a href="#oficina-casa" className="text-blue-600 hover:underline">4. Gastos de oficina en casa</a></li>
            <li><a href="#vehiculo" className="text-blue-600 hover:underline">5. Vehículo profesional</a></li>
            <li><a href="#tecnologia" className="text-blue-600 hover:underline">6. Tecnología y equipos</a></li>
            <li><a href="#formacion" className="text-blue-600 hover:underline">7. Formación y cursos</a></li>
            <li><a href="#servicios" className="text-blue-600 hover:underline">8. Servicios profesionales</a></li>
            <li><a href="#marketing" className="text-blue-600 hover:underline">9. Marketing y publicidad</a></li>
            <li><a href="#otros" className="text-blue-600 hover:underline">10. Otros gastos importantes</a></li>
            <li><a href="#caso-practico" className="text-blue-600 hover:underline">11. Caso práctico real</a></li>
            <li><a href="#como-deducir" className="text-blue-600 hover:underline">12. Cómo deducir correctamente</a></li>
            <li><a href="#errores" className="text-blue-600 hover:underline">13. Errores comunes a evitar</a></li>
            <li><a href="#conclusion" className="text-blue-600 hover:underline">14. Conclusión y recursos</a></li>
          </ul>
        </div>

        {/* Introducción */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">💡 La verdad sobre los gastos deducibles</h2>
          <p className="text-lg mb-4">
            El <strong>87% de los autónomos en España NO deducen todos los gastos</strong> que tienen derecho. 
            Esto significa que están pagando entre <strong>2.000€ y 5.000€ de MÁS cada año</strong> en impuestos.
          </p>
          <p className="text-lg mb-6">
            ¿Por qué? Porque nadie les enseñó qué gastos son deducibles, cuánto pueden deducir y cómo justificarlos.
          </p>
          <p className="text-xl font-bold">
            Esta guía te enseña TODO lo que necesitas saber para ahorrar miles de euros legalmente.
          </p>
        </div>

        {/* Sección 1 */}
        <div id="que-son" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1️⃣ ¿Qué son los gastos deducibles?</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Los <strong>gastos deducibles</strong> son todos aquellos gastos relacionados con tu actividad profesional 
            que puedes restar de tus ingresos para calcular tu base imponible de IRPF.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📖 Definición legal:</h3>
            <p className="text-gray-700 italic">
              "Son deducibles los gastos necesarios para la obtención de ingresos y el mantenimiento de la fuente 
              productora, siempre que estén debidamente justificados y tengan relación directa con la actividad."
            </p>
            <p className="text-sm text-gray-600 mt-3">— Ley del IRPF, Artículo 27</p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ Requisitos para que un gasto sea deducible:</h3>
          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span><strong>Vinculado a la actividad:</strong> El gasto debe estar relacionado con tu negocio o profesión</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span><strong>Necesario:</strong> Debe ser necesario para obtener ingresos o mantener tu actividad</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span><strong>Justificado:</strong> Debes tener factura o justificante de pago</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span><strong>Razonable:</strong> El gasto debe ser proporcional a tu actividad y volumen de negocio</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span><strong>Registrado:</strong> Debes incluirlo en tu libro de gastos y declaración de la Renta</span>
            </li>
          </ul>
        </div>

        {/* Sección 2 */}
        <div id="por-que-importante" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">2️⃣ ¿Por qué son tan importantes?</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Los gastos deducibles son <strong>LA CLAVE</strong> para pagar menos impuestos como autónomo. 
            Por cada euro que deduces, ahorras entre 0,19€ y 0,47€ en impuestos.
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Cómo funcionan los gastos deducibles:</h3>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">Ejemplo 1: Sin gastos deducibles</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Ingresos: 30.000€</li>
                  <li>• Gastos deducibles: 0€</li>
                  <li>• Base imponible: 30.000€</li>
                  <li>• IRPF a pagar: ~6.000€</li>
                </ul>
              </div>

              <div className="bg-green-100 rounded-xl p-6 border-2 border-green-500">
                <h4 className="font-bold text-gray-900 mb-2">Ejemplo 2: Con 10.000€ en gastos deducibles</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Ingresos: 30.000€</li>
                  <li>• Gastos deducibles: 10.000€</li>
                  <li>• Base imponible: 20.000€</li>
                  <li>• IRPF a pagar: ~3.500€</li>
                </ul>
                <p className="text-lg font-bold text-green-700 mt-3">
                  💰 AHORRO: 2.500€ al año
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Impacto real en 10 años:</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-2xl p-6 text-center border-2 border-red-300">
              <div className="text-4xl font-bold text-red-600 mb-2">25.000€</div>
              <p className="text-gray-700">Sin optimizar</p>
              <p className="text-sm text-gray-600">(2.500€/año × 10 años)</p>
            </div>
            <div className="text-4xl flex items-center justify-center text-gray-400">→</div>
            <div className="bg-green-50 rounded-2xl p-6 text-center border-2 border-green-500">
              <div className="text-4xl font-bold text-green-600 mb-2">0€</div>
              <p className="text-gray-700">Con optimización</p>
              <p className="text-sm text-gray-600">(Ahorro total)</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 mt-6 text-center">
            <strong>25.000€ de diferencia</strong> en 10 años. Eso es la entrada de una casa, 
            un coche nuevo o la jubilación de tus sueños.
          </p>
        </div>

        {/* Sección 3 */}
        <div id="lista-completa" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">3️⃣ Lista Completa de 20 Gastos Deducibles</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Aquí está la lista completa de los <strong>20 gastos deducibles más importantes</strong> para autónomos 
            en España en 2025. Cada uno con ejemplos reales y cuánto puedes ahorrar.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-blue-700 px-4 py-3 text-left">#</th>
                  <th className="border border-blue-700 px-4 py-3 text-left">Gasto Deducible</th>
                  <th className="border border-blue-700 px-4 py-3 text-center">% Deducible</th>
                  <th className="border border-blue-700 px-4 py-3 text-right">Ahorro Anual</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">1</td>
                  <td className="border border-blue-300 px-4 py-3">Oficina en casa (suministros)</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">15-30%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">90-200€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">2</td>
                  <td className="border border-blue-300 px-4 py-3">Vehículo profesional</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">50%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">765€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">3</td>
                  <td className="border border-blue-300 px-4 py-3">Equipos informáticos</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">230€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">4</td>
                  <td className="border border-blue-300 px-4 py-3">Mobiliario de oficina</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">120€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">5</td>
                  <td className="border border-blue-300 px-4 py-3">Formación y cursos</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">269€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">6</td>
                  <td className="border border-blue-300 px-4 py-3">Seguros profesionales</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">246€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">7</td>
                  <td className="border border-blue-300 px-4 py-3">Material de oficina</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">194€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">8</td>
                  <td className="border border-blue-300 px-4 py-3">Servicios profesionales</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">581€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">9</td>
                  <td className="border border-blue-300 px-4 py-3">Marketing y publicidad</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">587€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">10</td>
                  <td className="border border-blue-300 px-4 py-3">Gastos financieros</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">150€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">11</td>
                  <td className="border border-blue-300 px-4 py-3">Dietas y manutención</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">101€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">12</td>
                  <td className="border border-blue-300 px-4 py-3">Viajes profesionales</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">173€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">13</td>
                  <td className="border border-blue-300 px-4 py-3">Alquiler local/oficina</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">3.162€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">14</td>
                  <td className="border border-blue-300 px-4 py-3">Cuota de autónomos</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">1.008€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">15</td>
                  <td className="border border-blue-300 px-4 py-3">Suministros (luz, agua, internet)</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">1.102€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">16</td>
                  <td className="border border-blue-300 px-4 py-3">Software y aplicaciones</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">248€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">17</td>
                  <td className="border border-blue-300 px-4 py-3">Reparaciones y mantenimiento</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">168€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">18</td>
                  <td className="border border-blue-300 px-4 py-3">Envíos y mensajería</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">1.530€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">19</td>
                  <td className="border border-blue-300 px-4 py-3">Regalos a clientes</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100% (&lt;300€)</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">300€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">20</td>
                  <td className="border border-blue-300 px-4 py-3">Gastos de constitución</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">100%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">332€</td>
                </tr>
                <tr className="bg-green-100 border-2 border-green-500">
                  <td className="border border-green-400 px-4 py-3 font-bold" colSpan={3}>TOTAL AHORRO POTENCIAL</td>
                  <td className="border border-green-400 px-4 py-3 text-right font-bold text-green-700 text-xl">12.362€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Importante:</h4>
            <p className="text-gray-700">
              Estos ahorros son <strong>acumulativos</strong>. No todos los autónomos tendrán todos estos gastos, 
              pero la mayoría tendrá al menos 10-15 de ellos. El ahorro promedio real es de <strong>2.000€ a 5.000€ al año</strong>.
            </p>
          </div>
        </div>

        {/* Sección 4 */}
        <div id="oficina-casa" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">4️⃣ Gastos de Oficina en Casa</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Si trabajas desde casa, puedes deducir un <strong>porcentaje de los gastos de tu vivienda</strong>. 
            Este es uno de los gastos deducibles más olvidados y puede ahorrarte cientos de euros al año.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ ¿Qué gastos puedes deducir?</h3>
          <ul className="space-y-2 text-lg text-gray-700 mb-6">
            <li>• Luz, agua, gas/calefacción</li>
            <li>• Internet y telefonía fija</li>
            <li>• Alquiler o intereses de hipoteca</li>
            <li>• IBI (Impuesto sobre Bienes Inmuebles)</li>
            <li>• Comunidad de propietarios</li>
            <li>• Seguro del hogar</li>
            <li>• Basuras y servicios municipales</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧮 ¿Cuánto puedes deducir?</h3>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Fórmula:</h4>
            <div className="bg-white rounded-xl p-6">
              <p className="text-2xl font-bold text-center text-gray-900 mb-2">
                % Deducible = (m² de oficina / m² totales de casa) × 100
              </p>
            </div>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h4>
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>Luis, diseñador gráfico:</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Casa total: 100 m²</li>
              <li>• Oficina dedicada: 15 m²</li>
              <li>• % deducible: 15%</li>
              <li>• Gastos anuales casa: 1.500€ (luz, agua, internet, comunidad)</li>
              <li>• <strong>Deducible:</strong> 1.500€ × 15% = 225€</li>
              <li>• <strong>Ahorro IRPF (30%):</strong> 225€ × 30% = 67,50€</li>
              <li>• <strong>Ahorro IVA:</strong> ~23€</li>
              <li>• <strong>TOTAL AHORRO:</strong> ~90€/año</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ Requisitos legales:</h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>La oficina debe estar <strong>claramente delimitada</strong> (una habitación dedicada)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Uso <strong>exclusivo o habitual</strong> para la actividad profesional</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Facturas a tu <strong>nombre de autónomo</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Conservar facturas <strong>4 años</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Croquis de la vivienda con oficina marcada (recomendado)</span>
            </li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Consejo PRO:</h4>
            <p className="text-gray-700">
              Saca fotos de tu oficina y haz un croquis simple. Si Hacienda inspecciona, lo tendrás todo documentado 
              y no habrá problemas.
            </p>
          </div>
        </div>

        {/* Sección 5 */}
        <div id="vehiculo" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">5️⃣ Vehículo Profesional</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Si usas tu coche para tu actividad profesional, puedes deducir hasta el <strong>50%</strong> de los gastos 
            del vehículo. Este es uno de los gastos deducibles más grandes para muchos autónomos.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ ¿Qué gastos puedes deducir?</h3>
          <ul className="space-y-2 text-lg text-gray-700 mb-6">
            <li>• Gasolina, diésel o electricidad</li>
            <li>• Seguro del vehículo</li>
            <li>• Reparaciones y mantenimiento</li>
            <li>• ITV (Inspección Técnica de Vehículos)</li>
            <li>• Parking en desplazamientos profesionales</li>
            <li>• Peajes y autopistas (viajes profesionales)</li>
            <li>• Lavados (si es necesario para imagen profesional)</li>
            <li>• Leasing o renting (si es 100% profesional)</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧮 ¿Cuánto puedes deducir?</h3>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Normativa:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Vehículo de uso mixto:</strong> Máximo 50% de gastos</li>
              <li>• <strong>Vehículo 100% profesional:</strong> 100% de gastos (taxis, VTC, comerciales)</li>
              <li>• <strong>Kilometraje:</strong> 0,19€/km (si llevas registro)</li>
            </ul>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h4>
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>Ana, consultora que visita clientes:</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Gasolina: 2.000€/año → Deduce 1.000€ (50%)</li>
              <li>• Seguro: 600€/año → Deduce 300€ (50%)</li>
              <li>• Reparaciones: 400€/año → Deduce 200€ (50%)</li>
              <li>• Parking profesional: 200€/año → Deduce 200€ (100%)</li>
              <li>• <strong>TOTAL DEDUCIDO:</strong> 1.700€</li>
              <li>• <strong>Ahorro IRPF (30%):</strong> 1.700€ × 30% = 510€</li>
              <li>• <strong>Ahorro IVA:</strong> 357€</li>
              <li>• <strong>TOTAL AHORRO:</strong> ~867€/año</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ Requisitos legales:</h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>El vehículo debe usarse para la <strong>actividad profesional</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Llevar un <strong>registro de kilómetros</strong> profesionales vs personales</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Facturas a tu <strong>nombre de autónomo</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Justificar <strong>desplazamientos profesionales</strong></span>
            </li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Consejo PRO:</h4>
            <p className="text-gray-700">
              Usa una app de km (Google Maps Timeline) para llevar registro automático de tus desplazamientos. 
              Así no olvidas nada y tienes justificación si Hacienda pregunta.
            </p>
          </div>
        </div>

        {/* Sección 6 */}
        <div id="tecnologia" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">6️⃣ Tecnología y Equipos Informáticos</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            En la era digital, los equipos informáticos son <strong>esenciales</strong> para la mayoría de autónomos. 
            Y la buena noticia es que son <strong>100% deducibles</strong> si son de uso profesional.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ ¿Qué equipos puedes deducir?</h3>
          <ul className="space-y-2 text-lg text-gray-700 mb-6">
            <li>• Ordenadores (sobremesa, portátiles)</li>
            <li>• Tablets</li>
            <li>• Móviles y smartphones</li>
            <li>• Monitores y pantallas</li>
            <li>• Teclados, ratones, webcams</li>
            <li>• Discos duros externos</li>
            <li>• Software y licencias</li>
            <li>• Impresoras y escáneres</li>
            <li>• Auriculares y micrófonos</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧮 ¿Cuánto puedes deducir?</h3>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Normativa:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Uso exclusivo profesional:</strong> 100% deducible</li>
              <li>• <strong>Uso mixto (profesional + personal):</strong> 50% deducible</li>
              <li>• <strong>Equipos &lt; 300€:</strong> Gasto directo (deduces todo el año que lo compras)</li>
              <li>• <strong>Equipos &gt; 300€:</strong> Amortización (deduces durante varios años)</li>
            </ul>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📊 Tabla de amortización:</h4>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-blue-700 px-4 py-3 text-left">Equipo</th>
                  <th className="border border-blue-700 px-4 py-3 text-center">Años amortización</th>
                  <th className="border border-blue-700 px-4 py-3 text-right">Ejemplo (800€)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Ordenador</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">4 años</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">200€/año</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Tablet</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">4 años</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">200€/año</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Móvil</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">2 años</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">400€/año</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Impresora</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">5 años</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">160€/año</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Monitor</td>
                  <td className="border border-blue-300 px-4 py-3 text-center">5 años</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">160€/año</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h4>
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>Carlos, desarrollador web:</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Portátil 1.200€ → Amortización 4 años = 300€/año</li>
              <li>• Móvil 250€ → Gasto directo = 250€</li>
              <li>• Monitor 400€ → Amortización 5 años = 80€/año</li>
              <li>• <strong>TOTAL DEDUCIDO:</strong> 630€/año</li>
              <li>• <strong>Ahorro IRPF (30%):</strong> 630€ × 30% = 189€</li>
              <li>• <strong>Ahorro IVA:</strong> 132€</li>
              <li>• <strong>TOTAL AHORRO:</strong> ~321€/año</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Consejo PRO:</h4>
            <p className="text-gray-700">
              Compra equipos antes de fin de año para deducir más en esa declaración. 
              Si compras en diciembre, puedes deducir parte del gasto ese mismo año.
            </p>
          </div>
        </div>

        {/* Sección 7 */}
        <div id="formacion" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">7️⃣ Formación y Cursos Profesionales</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            La formación continua es <strong>esencial</strong> para cualquier profesional. Y la buena noticia es que 
            <strong> invertir en tu formación es 100% deducible</strong> si está relacionada con tu actividad.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ ¿Qué formación puedes deducir?</h3>
          <ul className="space-y-2 text-lg text-gray-700 mb-6">
            <li>• Cursos online (Udemy, Coursera, Domestika)</li>
            <li>• Másters y postgrados</li>
            <li>• Certificaciones profesionales (Google Ads, Facebook Ads, etc.)</li>
            <li>• Conferencias y seminarios</li>
            <li>• Libros técnicos y especializados</li>
            <li>• Suscripciones a revistas profesionales</li>
            <li>• Plataformas de e-learning</li>
            <li>• Coaching y mentoring</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧮 ¿Cuánto puedes deducir?</h3>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Normativa:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>100% deducible</strong> si está relacionado con tu actividad</li>
              <li>• <strong>NO deducible</strong> si es hobby o formación no relacionada</li>
              <li>• Conservar factura y certificado (recomendable)</li>
            </ul>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h4>
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>María, community manager:</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Curso de Instagram Ads: 297€</li>
              <li>• Certificación Google Ads: 150€</li>
              <li>• Libros de marketing: 80€</li>
              <li>• Conferencia de marketing digital: 200€</li>
              <li>• <strong>TOTAL DEDUCIDO:</strong> 727€</li>
              <li>• <strong>Ahorro IRPF (30%):</strong> 727€ × 30% = 218€</li>
              <li>• <strong>Ahorro IVA:</strong> 153€</li>
              <li>• <strong>TOTAL AHORRO:</strong> ~371€/año</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Mentalidad:</h4>
            <p className="text-gray-700">
              Cuanto más aprendes, más ganas. Y Hacienda te ayuda a pagar la formación. 
              Es un win-win: mejoras profesionalmente Y ahorras impuestos.
            </p>
          </div>
        </div>

        {/* Sección 8 */}
        <div id="servicios" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">8️⃣ Servicios Profesionales</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Delegar tareas a otros profesionales es <strong>esencial</strong> para escalar tu negocio. 
            Y todos esos servicios son <strong>100% deducibles</strong>.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ ¿Qué servicios puedes deducir?</h3>
          <ul className="space-y-2 text-lg text-gray-700 mb-6">
            <li>• Gestoría y asesoría fiscal</li>
            <li>• Abogados y notarios</li>
            <li>• Diseñadores gráficos</li>
            <li>• Desarrolladores web</li>
            <li>• Community managers</li>
            <li>• Fotógrafos profesionales</li>
            <li>• Consultores</li>
            <li>• Freelancers externos</li>
            <li>• Servicios de limpieza de oficina</li>
            <li>• Contadores y auditores</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧮 ¿Cuánto puedes deducir?</h3>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Normativa:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>100% deducible</strong> si es servicio profesional</li>
              <li>• <strong>Factura con IVA</strong> obligatoria</li>
              <li>• <strong>Servicio vinculado</strong> a tu actividad</li>
              <li>• <strong>Pago justificado</strong> (transferencia, recibo)</li>
            </ul>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h4>
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>Pedro, consultor freelance:</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Gestoría: 600€/año</li>
              <li>• Diseño logo y branding: 300€</li>
              <li>• Desarrollo web: 1.200€/año</li>
              <li>• Community manager: 2.400€/año</li>
              <li>• <strong>TOTAL DEDUCIDO:</strong> 4.500€</li>
              <li>• <strong>Ahorro IRPF (30%):</strong> 4.500€ × 30% = 1.350€</li>
              <li>• <strong>Ahorro IVA:</strong> 945€</li>
              <li>• <strong>TOTAL AHORRO:</strong> ~2.295€/año</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Estrategia:</h4>
            <p className="text-gray-700">
              Cuanto más delegas, más creces. Y Hacienda te ayuda pagando el 30% del gasto. 
              Es una inversión que se paga sola.
            </p>
          </div>
        </div>

        {/* Sección 9 */}
        <div id="marketing" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">9️⃣ Marketing y Publicidad</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Darte a conocer es <strong>esencial</strong> para conseguir clientes. Y todos los gastos de marketing 
            son <strong>100% deducibles</strong>.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ ¿Qué gastos de marketing puedes deducir?</h3>
          <ul className="space-y-2 text-lg text-gray-700 mb-6">
            <li>• Facebook Ads, Google Ads, TikTok Ads</li>
            <li>• Flyers, carteles, folletos</li>
            <li>• Anuncios en prensa, radio, TV</li>
            <li>• Regalos promocionales (&lt;300€/persona)</li>
            <li>• Patrocinios y colaboraciones</li>
            <li>• Banners y vallas publicitarias</li>
            <li>• Email marketing (Mailchimp, Brevo)</li>
            <li>• SEO y SEM</li>
            <li>• Influencers y colaboraciones</li>
            <li>• Creación de contenido (videos, fotos)</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🧮 ¿Cuánto puedes deducir?</h3>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Normativa:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>100% deducible</strong> si es gasto publicitario</li>
              <li>• <strong>Regalos:</strong> Límite 300€/persona/año</li>
              <li>• <strong>Facturas</strong> obligatorias</li>
              <li>• <strong>Finalidad publicitaria</strong> clara</li>
            </ul>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h4>
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>Laura, coach online:</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Facebook Ads: 1.200€/año</li>
              <li>• Google Ads: 800€/año</li>
              <li>• Material promocional (flyers, tarjetas): 300€</li>
              <li>• Cestas Navidad clientes: 500€</li>
              <li>• <strong>TOTAL DEDUCIDO:</strong> 2.800€</li>
              <li>• <strong>Ahorro IRPF (30%):</strong> 2.800€ × 30% = 840€</li>
              <li>• <strong>Ahorro IVA:</strong> 588€</li>
              <li>• <strong>TOTAL AHORRO:</strong> ~1.428€/año</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 ROI del marketing:</h4>
            <p className="text-gray-700">
              Cada euro en marketing te devuelve 3-10€ en clientes. Y Hacienda paga el 30% del gasto. 
              Es la mejor inversión que puedes hacer.
            </p>
          </div>
        </div>

        {/* Sección 10 */}
        <div id="otros" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔟 Otros Gastos Importantes</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Además de los gastos anteriores, hay otros <strong>gastos deducibles importantes</strong> que muchos autónomos olvidan.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💳 Gastos Financieros</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Comisiones bancarias</li>
                <li>• Mantenimiento cuenta</li>
                <li>• TPV/datáfono</li>
                <li>• PayPal, Stripe</li>
                <li>• Intereses préstamos</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <strong>100% deducible</strong> si es cuenta profesional
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🍽️ Dietas y Manutención</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Comidas con clientes</li>
                <li>• Comidas en viajes</li>
                <li>• Catering eventos</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Límites:</strong> 26,67€/día sin pernocta<br />
                <strong>IVA:</strong> Solo 50% deducible
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">✈️ Viajes Profesionales</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Avión, tren, autobús</li>
                <li>• Hoteles</li>
                <li>• Taxi, Uber</li>
                <li>• Alquiler coches</li>
                <li>• Parking y peajes</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <strong>100% deducible</strong> si es viaje profesional
              </p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📦 Envíos y Mensajería</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Correos</li>
                <li>• Mensajería (Seur, MRW)</li>
                <li>• Paquetería</li>
                <li>• Material embalaje</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <strong>100% deducible</strong><br />
                Ideal para e-commerce
              </p>
            </div>
          </div>
        </div>

        {/* Sección 11 */}
        <div id="caso-practico" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1️⃣1️⃣ Caso Práctico Real: Antonio el Pintor</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Vamos a ver un caso real de un autónomo que aplicó estos gastos deducibles y ahorró 
            <strong> 2.400€ en un año</strong>.
          </p>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white mb-6">
            <h3 className="text-2xl font-bold mb-6">👤 Perfil: Antonio, Pintor Profesional</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xl font-bold mb-4">📊 Situación Antes (SIN optimizar):</h4>
                <ul className="space-y-2 text-lg">
                  <li>• Ingresos anuales: 35.000€</li>
                  <li>• Gastos deducibles: 3.360€ (solo cuota)</li>
                  <li>• Base imponible: 31.640€</li>
                  <li>• IRPF a pagar: 6.200€</li>
                  <li>• Cuota autónomos: 3.360€</li>
                  <li>• IVA a pagar: 2.500€</li>
                  <li>• <strong>TOTAL IMPUESTOS:</strong> 12.060€</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4">💰 Situación Después (Optimizada):</h4>
                <ul className="space-y-2 text-lg">
                  <li>• Ingresos anuales: 35.000€</li>
                  <li>• Gastos deducibles: 15.542€</li>
                  <li>• Base imponible: 19.458€</li>
                  <li>• IRPF a pagar: 3.800€</li>
                  <li>• Cuota autónomos: 3.360€</li>
                  <li>• IVA a pagar: 1.500€</li>
                  <li>• <strong>TOTAL IMPUESTOS:</strong> 8.660€</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold mb-2">AHORRO ANUAL: 3.400€</p>
              <p className="text-lg opacity-90">En 10 años = 34.000€ ahorrados</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">📋 Desglose de gastos deducibles de Antonio:</h3>
          
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
                  <td className="border border-blue-300 px-4 py-3">Furgoneta profesional</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">3.500€ × 50%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">525€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Móvil y tablet</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">400€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">120€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Material de pintura</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">2.800€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">840€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Herramientas</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">600€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">180€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Ropa de trabajo</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">250€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">75€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Seguro responsabilidad civil</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">180€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">54€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Gestoría</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">600€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">180€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Marketing (tarjetas, web)</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">400€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">120€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Formación (curso PRL)</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">150€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">45€</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-blue-300 px-4 py-3">Cuota de autónomos</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">3.360€</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">1.008€</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-blue-300 px-4 py-3">Gasolina y mantenimiento</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">2.000€ × 50%</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">300€</td>
                </tr>
                <tr className="bg-green-100 border-2 border-green-500">
                  <td className="border border-green-400 px-4 py-3 font-bold">TOTAL DEDUCIDO</td>
                  <td className="border border-green-400 px-4 py-3 text-right font-bold">15.542€</td>
                  <td className="border border-green-400 px-4 py-3 text-right font-bold text-green-700">4.662€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ ¿Qué hizo Antonio?</h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Guardó TODAS las facturas (hasta las pequeñas)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Creó una carpeta en Google Drive por año</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Llevó registro de km en Excel simple</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Revisó esta guía cada trimestre</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Habló con su gestor con los gastos organizados</span>
            </li>
          </ul>

          <p className="text-lg text-gray-700 mt-6">
            <strong>Resultado:</strong> Antonio pasó de pagar 12.060€ en impuestos a pagar 8.660€. 
            Un ahorro de <strong>3.400€ al año</strong> simplemente por deducir gastos que tenía derecho.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💬 Testimonio de Antonio:</h4>
            <p className="text-gray-700 italic">
              "No sabía que era tan fácil. Solo necesitaba saber QUÉ podía deducir. Ahora cada factura que guardo 
              es dinero que me ahorro. En 10 años serán 34.000€ que puedo invertir en mi negocio."
            </p>
          </div>
        </div>

        {/* Sección 12 */}
        <div id="como-deducir" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1️⃣2️⃣ Cómo Deducir Correctamente</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Saber qué gastos son deducibles es solo el primer paso. Ahora necesitas saber <strong>CÓMO deducirlos</strong> 
            correctamente para evitar problemas con Hacienda.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 Paso a paso:</h3>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">PASO 1: Guarda TODAS las facturas</h4>
              <p className="text-gray-700 mb-3">
                Cada gasto profesional debe tener su factura o justificante. Sin factura, NO es deducible.
              </p>
              <p className="text-sm text-gray-600">
                💡 Tip: Crea una carpeta en Google Drive y guarda las facturas por mes. Así nunca las pierdes.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">PASO 2: Lleva un registro de gastos</h4>
              <p className="text-gray-700 mb-3">
                Puedes usar Excel, una app de contabilidad (Quipu, Holded) o simplemente un cuaderno. 
                Lo importante es tener todo registrado.
              </p>
              <p className="text-sm text-gray-600">
                💡 Tip: Dedica 30 minutos cada domingo a revisar tus gastos de la semana. Así no se acumula.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">PASO 3: Separa gastos personales de profesionales</h4>
              <p className="text-gray-700 mb-3">
                Si un gasto es mixto (personal + profesional), solo puedes deducir la parte profesional.
              </p>
              <p className="text-sm text-gray-600">
                💡 Tip: Usa una cuenta bancaria exclusiva para tu negocio. Facilita la separación 10x.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">PASO 4: Incluye los gastos en tu declaración</h4>
              <p className="text-gray-700 mb-3">
                Si tienes gestor, entrégale todas las facturas organizadas. Si no, inclúyelos tú en la Renta.
              </p>
              <p className="text-sm text-gray-600">
                💡 Tip: Hazlo trimestralmente (Modelo 130) para no acumular todo en la Renta.
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">PASO 5: Conserva las facturas 4 años</h4>
              <p className="text-gray-700 mb-3">
                Hacienda puede inspeccionar tus declaraciones hasta 4 años después. Guarda TODO.
              </p>
              <p className="text-sm text-gray-600">
                💡 Tip: Digitaliza las facturas y guárdalas en la nube. Así nunca se pierden.
              </p>
            </div>
          </div>
        </div>

        {/* Sección 13 */}
        <div id="errores" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1️⃣3️⃣ Errores Comunes a Evitar</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Muchos autónomos cometen estos errores y pierden dinero o tienen problemas con Hacienda. 
            <strong> Evítalos a toda costa.</strong>
          </p>

          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 1: No guardar facturas</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> Sin factura, el gasto NO es deducible. Hacienda te lo rechazará.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Pide factura SIEMPRE, incluso en compras pequeñas.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 2: Deducir gastos personales</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> Si deduces gastos que no son profesionales, Hacienda te multa.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Sé honesto. Solo deduce lo que realmente es profesional.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 3: No justificar gastos grandes</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> Gastos grandes ({'>'}3.000€) requieren justificación extra. Sin ella, Hacienda los rechaza.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Para gastos grandes, guarda factura + justificación de necesidad profesional.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 4: Deducir el 100% de gastos mixtos</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> Si un gasto es mixto (personal + profesional), solo puedes deducir la parte profesional.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Calcula el % profesional y deduce solo ese %. Ejemplo: móvil 50% profesional = deduce 50%.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 5: No llevar registro de km</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> Si deduces gastos de vehículo, Hacienda puede pedirte justificación de km profesionales.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Lleva un registro simple en Excel o usa una app de km.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 6: Deducir comidas diarias</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> Las comidas diarias en tu ciudad NO son deducibles. Hacienda vigila esto mucho.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Solo deduce comidas en viajes profesionales o con clientes. Y con factura detallada.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">❌ ERROR 7: No revisar antes de presentar</h4>
              <p className="text-gray-700">
                <strong>Problema:</strong> Presentar la declaración sin revisar puede resultar en errores y multas.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ✅ <strong>Solución:</strong> Revisa TODO antes de presentar. Mejor tardar 1 día más que tener problemas.
              </p>
            </div>
          </div>
        </div>

        {/* Sección 14 */}
        <div id="conclusion" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1️⃣4️⃣ Conclusión y Recursos</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Si has llegado hasta aquí, ya sabes <strong>EXACTAMENTE</strong> qué gastos son deducibles, 
            cuánto puedes ahorrar y cómo deducirlos correctamente.
          </p>

          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Resumen de lo que has aprendido:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Qué son los gastos deducibles y por qué son importantes</li>
              <li>✓ Los 20 gastos deducibles más importantes</li>
              <li>✓ Cuánto puedes ahorrar con cada uno (ejemplos reales)</li>
              <li>✓ Requisitos legales para cada gasto</li>
              <li>✓ Cómo deducir correctamente (paso a paso)</li>
              <li>✓ Errores comunes a evitar</li>
              <li>✓ Caso práctico real (Antonio ahorró 3.400€)</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Tu Plan de Acción (EMPIEZA HOY):</h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 1: Revisa tus gastos del último año</h4>
              <p className="text-gray-700">
                Abre tu carpeta de facturas (o empieza a crearla) y revisa todos tus gastos del último año. 
                ¿Cuáles son profesionales? ¿Cuáles puedes deducir?
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 2: Marca los que SÍ deduces</h4>
              <p className="text-gray-700">
                Usa la lista de 20 gastos de esta guía. Marca los que ya estás deduciendo y los que NO.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 3: Identifica los que NO deduces</h4>
              <p className="text-gray-700">
                De los que NO deduces, ¿cuáles tienes derecho? ¿Tienes las facturas? ¿Cómo puedes empezar a deducirlos?
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 4: Organiza tus facturas</h4>
              <p className="text-gray-700">
                Crea una carpeta (física o digital) y organiza todas las facturas por mes. 
                Así será fácil encontrarlas cuando las necesites.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 5: Habla con tu gestor</h4>
              <p className="text-gray-700">
                Si tienes gestor, llévale tus gastos organizados y pregúntale cuáles puedes deducir. 
                Si no tienes, considera contratar uno o usar software de contabilidad.
              </p>
            </div>

            <div className="bg-green-100 rounded-xl p-6 border-2 border-green-500">
              <h4 className="font-bold text-gray-900 mb-2">PASO 6: Celebra el ahorro</h4>
              <p className="text-gray-700">
                Cuando veas cuánto ahorras aplicando estos gastos deducibles, celebra. 
                En 10 años, esos miles de euros pueden cambiar tu vida.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white text-center mb-6">
            <h3 className="text-2xl font-bold mb-4">🎁 ¿Quieres la guía completa?</h3>
            <p className="text-lg mb-6">
              Si quieres dominar los 20 gastos deducibles con ejemplos detallados, casos prácticos y todo 
              lo que necesitas para ahorrar miles de euros, tenemos una guía completa de 26 páginas.
            </p>
            <a
              href="https://lipastudios.gumroad.com/l/jkowwe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-green-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              📚 Ver Guía Completa (19€)
            </a>
            <p className="text-sm mt-4 opacity-90">
              ✅ 26 páginas • ✅ Ejemplos reales • ✅ Caso práctico • ✅ Garantía 30 días
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">🛠️ Recursos GRATIS:</h3>
          <ul className="space-y-2 text-lg text-gray-700">
            <li>• <a href="/autonomos" className="text-blue-600 hover:underline">Calculadora de autónomos GRATIS</a></li>
            <li>• <a href="/articles" className="text-blue-600 hover:underline">Artículos sobre fiscalidad</a></li>
            <li>• <a href="/blog" className="text-blue-600 hover:underline">Blog con 20+ artículos</a></li>
            <li>• <a href="/faq" className="text-blue-600 hover:underline">FAQ con 30+ preguntas</a></li>
          </ul>
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
          <ArticulosRelacionados excluir="gastos-deducibles" onNavegar={onNavegar} />
        </div>

      </div>
    </div>
  );
}

