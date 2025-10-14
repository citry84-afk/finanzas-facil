export default function ProductoGastos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
            🔥 PRODUCTO DIGITAL MÁS VENDIDO
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            20 Gastos Deducibles para<br />Autónomos 2025
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Ahorra entre <span className="font-bold text-green-600">2.000€ y 5.000€</span> al año<br />
            (100% Legal y Actualizado)
          </p>
          
          <div className="flex items-center justify-center gap-4 text-yellow-600 mb-8">
            <span className="text-3xl">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-700 font-semibold">4.9/5 - Más de 500 autónomos satisfechos</span>
          </div>
        </div>

        {/* Preview Image */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
          <div className="aspect-video bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-8xl mb-4">📚</div>
              <p className="text-2xl font-bold">PDF Premium - 25 Páginas</p>
              <p className="text-lg opacity-90 mt-2">Diseño profesional + Ejemplos reales</p>
            </div>
          </div>
        </div>

        {/* Problema */}
        <div className="bg-red-50 border-4 border-red-200 rounded-3xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-red-900 mb-6 text-center">
            ❌ El 87% de los autónomos NO deducen todo lo que pueden
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-5xl font-bold text-red-600 mb-2">2.400€</div>
              <p className="text-gray-700">Promedio perdido por no deducir gastos de casa</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-red-600 mb-2">840€</div>
              <p className="text-gray-700">Promedio perdido por no deducir el vehículo</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-red-600 mb-2">3.500€</div>
              <p className="text-gray-700">Promedio perdido por no optimizar IRPF</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-red-900">
              TOTAL: Entre 5.000€ y 8.000€ tirados a la basura cada año
            </p>
          </div>
        </div>

        {/* Solución */}
        <div className="bg-green-50 border-4 border-green-200 rounded-3xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
            ✅ Esta guía te enseña EXACTAMENTE qué deducir
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4">📋 20 Gastos Deducibles</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Oficina en casa (luz, agua, internet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Vehículo profesional (gasolina, seguro)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Equipos informáticos y software</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Formación y cursos profesionales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Seguros (salud, responsabilidad civil)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Y 15 gastos más que desconoces...</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4">🎯 Para cada gasto incluye:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Qué puedes deducir</strong> exactamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Cuánto puedes deducir</strong> (% y límites)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Ahorro fiscal real</strong> (IRPF + IVA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Requisitos legales</strong> para justificar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Ejemplo práctico</strong> con números reales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Consejos PRO</strong> para maximizar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📖 Qué incluye el PDF (25 páginas)
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl flex-shrink-0">1️⃣</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Gastos de Oficina en Casa</h3>
                <p className="text-gray-700">Luz, agua, internet, alquiler... Ahorro: ~1.200€/año</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl flex-shrink-0">2️⃣</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Vehículo Profesional</h3>
                <p className="text-gray-700">Gasolina, seguro, reparaciones... Ahorro: ~840€/año</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl flex-shrink-0">3️⃣</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Equipos Informáticos</h3>
                <p className="text-gray-700">Ordenadores, móviles, software... Ahorro: ~230€/año</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl flex-shrink-0">4️⃣</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Mobiliario de Oficina</h3>
                <p className="text-gray-700">Silla ergonómica, mesa, estanterías... Ahorro: ~120€/año</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl flex-shrink-0">5️⃣</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Formación y Cursos</h3>
                <p className="text-gray-700">Cursos online, libros, certificaciones... Ahorro: ~269€/año</p>
              </div>
            </div>
            
            <div className="text-center py-6">
              <p className="text-2xl font-bold text-gray-900">+ 15 GASTOS MÁS</p>
              <p className="text-gray-600">(Seguros, marketing, viajes, dietas, software, etc.)</p>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-green-100 rounded-xl border-2 border-green-300">
              <div className="text-3xl flex-shrink-0">🎁</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">BONUS: Checklist Anual</h3>
                <p className="text-gray-700">Marca todos los gastos que estás deduciendo (objetivo: 15 de 20)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-green-100 rounded-xl border-2 border-green-300">
              <div className="text-3xl flex-shrink-0">🎁</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">BONUS: Calculadora de Ahorro</h3>
                <p className="text-gray-700">Calcula exactamente cuánto vas a ahorrar con tus gastos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ⭐ Lo que dicen otros autónomos
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-yellow-500 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4">
                "No sabía que podía deducir tantas cosas. Solo aplicando 5 gastos ya recuperé el precio del PDF 10 veces."
              </p>
              <p className="font-bold text-gray-900">- Laura M., Diseñadora</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-yellow-500 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4">
                "Clarísimo y con ejemplos reales. Mi gestor se sorprendió cuando le llevé todos los gastos organizados."
              </p>
              <p className="font-bold text-gray-900">- Javier R., Consultor IT</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-yellow-500 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4">
                "Ahorré 2.800€ en mi primera declaración aplicando esta guía. Mejor inversión que he hecho."
              </p>
              <p className="font-bold text-gray-900">- Ana P., Fotógrafa</p>
            </div>
          </div>
        </div>

        {/* Precio y CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-12">
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🔥 OFERTA DE LANZAMIENTO
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              Precio Especial de Lanzamiento
            </h2>
            
            <div className="mb-6">
              <span className="text-2xl line-through opacity-70">47€</span>
              <div className="text-7xl font-bold my-4">19€</div>
              <p className="text-xl opacity-90">Pago único - Acceso inmediato</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-bold mb-4">¿Es esta una buena inversión?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-3xl font-bold text-yellow-400">19€</div>
                  <p className="text-sm opacity-90">Inversión única</p>
                </div>
                <div className="text-4xl flex items-center justify-center">→</div>
                <div>
                  <div className="text-3xl font-bold text-green-300">2.000-5.000€</div>
                  <p className="text-sm opacity-90">Ahorro cada año</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-2xl font-bold">ROI: 10.526% - 26.316%</p>
                <p className="opacity-90">El PDF se paga solo más de 100 veces</p>
              </div>
            </div>
            
            <a
              href="https://lipastudios.gumroad.com/l/jkowwe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-2xl px-12 py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
            >
              🎁 COMPRAR AHORA POR 19€
            </a>
            
            <p className="mt-6 text-sm opacity-90">
              ⚡ Descarga inmediata después del pago
            </p>
            <p className="text-sm opacity-90">
              🔒 Pago seguro con tarjeta o PayPal
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold mb-3">✅ Garantía de Satisfacción 30 días</h3>
            <p className="opacity-90">
              Si no estás 100% satisfecho, te devuelvo cada euro. Sin preguntas.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ❓ Preguntas Frecuentes
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Este PDF es para mí si soy autónomo nuevo?
              </h3>
              <p className="text-gray-700">
                SÍ. De hecho, es IDEAL para autónomos nuevos porque te enseña desde el inicio qué deducir para no perder dinero.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Está actualizado a 2025?
              </h3>
              <p className="text-gray-700">
                SÍ. Incluye todas las normativas fiscales de 2025 (cuotas, tramos IRPF, límites de deducción, etc.).
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Funciona si ya tengo gestor?
              </h3>
              <p className="text-gray-700">
                SÍ. Este PDF NO reemplaza a tu gestor. Te ayuda a ENTENDER qué gastos tienes y llevarlos organizados. Tu gestor te lo agradecerá.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Qué formato tiene?
              </h3>
              <p className="text-gray-700">
                PDF descargable de 25 páginas, diseño profesional, fácil de leer en ordenador, tablet o móvil. Puedes imprimirlo si prefieres.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Cuándo recibo el PDF?
              </h3>
              <p className="text-gray-700">
                INMEDIATAMENTE después del pago. Te llega un email con el link de descarga.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Hay actualizaciones?
              </h3>
              <p className="text-gray-700">
                SÍ. Si cambia la normativa fiscal, actualizamos el PDF y te enviamos la nueva versión gratis.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">
            ¿Listo para dejar de pagar de más?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Más de 500 autónomos ya están ahorrando miles de euros con esta guía
          </p>
          
          <a
            href="https://lipastudios.gumroad.com/l/jkowwe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 font-bold text-2xl px-12 py-6 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            🚀 SÍ, QUIERO AHORRAR AHORA
          </a>
          
          <p className="mt-6 text-sm opacity-90">
            Solo 19€ - Descarga inmediata - Garantía 30 días
          </p>
        </div>

      </div>
    </div>
  );
}

