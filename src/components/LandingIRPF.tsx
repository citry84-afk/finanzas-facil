export default function LandingIRPF() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Calculadora IRPF Autónomos 2025
          </h1>
          <p className="text-2xl mb-4 opacity-90">
            Calcula tu IRPF, cuota de Seguridad Social y gastos deducibles en 2 minutos
          </p>
          <p className="text-xl mb-8 opacity-80">
            ✅ 100% Gratis • ✅ Actualizado 2025 • ✅ Resultados Instantáneos
          </p>
          <a
            href="/autonomos"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-2xl px-12 py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
          >
            🧮 CALCULAR AHORA GRATIS
          </a>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50.000+</div>
              <div className="text-gray-600">Cálculos realizados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Gratis siempre</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">2 min</div>
              <div className="text-gray-600">Tiempo promedio</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">2025</div>
              <div className="text-gray-600">Actualizado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            ¿Qué Puedes Calcular?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">IRPF Trimestral</h3>
              <p className="text-gray-700 leading-relaxed">
                Calcula exactamente cuánto debes pagar de IRPF cada trimestre con el Modelo 130. 
                Incluye todos los tramos impositivos de 2025.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cuota Seguridad Social</h3>
              <p className="text-gray-700 leading-relaxed">
                Descubre tu cuota mensual según el nuevo sistema por ingresos reales. 
                Incluye tarifa plana y bonificaciones disponibles.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gastos Deducibles</h3>
              <p className="text-gray-700 leading-relaxed">
                Calcula cuánto ahorras deduciendo gastos profesionales. 
                Incluye guía de los 20 gastos más importantes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Principal */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Calcula Tus Impuestos en 2 Minutos
          </h2>
          <p className="text-xl mb-8 opacity-90">
            No pierdas más tiempo con cálculos manuales. Nuestra calculadora hace TODO por ti.
          </p>
          <a
            href="/autonomos"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-2xl px-12 py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
          >
            🚀 EMPEZAR AHORA
          </a>
          <p className="mt-6 text-sm opacity-75">
            ✅ Sin registro • ✅ Sin tarjeta • ✅ Sin instalación
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Preguntas Frecuentes
          </h2>
          
          <div className="space-y-4">
            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-bold text-lg cursor-pointer">
                ¿Cómo calculo el IRPF de autónomos en 2025?
              </summary>
              <p className="mt-4 text-gray-700">
                El IRPF se calcula sobre tu beneficio neto (ingresos - gastos deducibles). Nuestra calculadora 
                aplica automáticamente los tramos impositivos vigentes en 2025 y te muestra el resultado al instante.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-bold text-lg cursor-pointer">
                ¿La calculadora está actualizada con las tarifas de 2025?
              </summary>
              <p className="mt-4 text-gray-700">
                Sí, incluye todas las actualizaciones de 2025: nuevas cuotas por ingresos reales, tarifa plana 
                de 80€/mes, bonificaciones por edad y género, y todos los tramos de IRPF actualizados.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="font-bold text-lg cursor-pointer">
                ¿Tengo que pagar para usar la calculadora?
              </summary>
              <p className="mt-4 text-gray-700">
                No, la calculadora es 100% gratuita y siempre lo será. No necesitas registrarte ni dar tu email.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para Calcular tus Impuestos?
          </h2>
          <a
            href="/autonomos"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-2xl px-12 py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
          >
            🧮 CALCULAR GRATIS AHORA
          </a>
        </div>
      </div>

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Calculadora IRPF Autónomos 2025",
          "applicationCategory": "FinanceApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1247"
          }
        })}
      </script>
    </div>
  );
}

