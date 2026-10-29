export default function LandingGastos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            20 Gastos Deducibles para Autónomos 2025
          </h1>
          <p className="text-2xl mb-4 opacity-90">
            Revisa gastos habituales, criterios prudentes y documentación que conviene conservar
          </p>
          <p className="text-xl mb-8 opacity-80">
            Guía gratuita con ejemplos, límites habituales y avisos para revisar con tu gestoría
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/blog"
              className="inline-block bg-white text-purple-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              📚 LEER GUÍA GRATIS
            </a>
            <a
              href="https://lipastudios.gumroad.com/l/jkowwe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl px-10 py-5 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
            >
              🎁 PDF PREMIUM 19€
            </a>
          </div>
        </div>
      </div>

      {/* Los 20 Gastos */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Los 20 Gastos Que TODO Autónomo Puede Deducir
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {emoji: "🏠", nombre: "Alquiler oficina", ahorro: "300-600€/mes"},
              {emoji: "💻", nombre: "Ordenadores y tablets", ahorro: "30% del precio"},
              {emoji: "📱", nombre: "Móvil e internet", ahorro: "50-100€/mes"},
              {emoji: "🚗", nombre: "Vehículo profesional", ahorro: "200-400€/mes"},
              {emoji: "☕", nombre: "Comidas con clientes", ahorro: "100-200€/mes"},
              {emoji: "✈️", nombre: "Viajes de trabajo", ahorro: "Variable"},
              {emoji: "📚", nombre: "Formación y cursos", ahorro: "100% deducible"},
              {emoji: "💼", nombre: "Gestoría", ahorro: "50-80€/mes"},
              {emoji: "🔒", nombre: "Seguros profesionales", ahorro: "30-60€/mes"},
              {emoji: "📦", nombre: "Material de oficina", ahorro: "20-50€/mes"},
              {emoji: "💡", nombre: "Suministros casa", ahorro: "30% si trabajas en casa"},
              {emoji: "🛠️", nombre: "Herramientas", ahorro: "100% deducible"},
              {emoji: "🎨", nombre: "Software y apps", ahorro: "50-150€/mes"},
              {emoji: "📢", nombre: "Marketing y publicidad", ahorro: "100% deducible"},
              {emoji: "🏦", nombre: "Gastos bancarios", ahorro: "10-30€/mes"},
              {emoji: "⚖️", nombre: "Abogados", ahorro: "100% deducible"},
              {emoji: "🎓", nombre: "Libros técnicos", ahorro: "100% deducible"},
              {emoji: "🖨️", nombre: "Impresora y consumibles", ahorro: "30% del precio"},
              {emoji: "📞", nombre: "Línea telefónica", ahorro: "100% si es exclusiva"},
              {emoji: "🌐", nombre: "Hosting y dominio web", ahorro: "5-20€/mes"}
            ].map((gasto, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-100">
                <div className="text-4xl mb-3">{gasto.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{gasto.nombre}</h3>
                <p className="text-sm text-green-600 font-semibold">Ahorro: {gasto.ahorro}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculadora */}
      <div className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Calcula Cuánto Puedes Ahorrar
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Usa nuestra calculadora GRATIS y descubre exactamente cuánto ahorras deduciendo estos gastos
          </p>
          <a
            href="/autonomos"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-2xl px-12 py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
          >
            🧮 CALCULAR AHORRO GRATIS
          </a>
        </div>
      </div>

      {/* Guía ampliada */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 text-white text-center shadow-2xl">
          <div className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold mb-4 animate-pulse">
            🔥 OFERTA ESPECIAL
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Guía ampliada: 20 gastos deducibles 2025
          </h2>
          <p className="text-xl mb-6 opacity-90">
            26 páginas con ejemplos detallados, caso práctico real, gráficas y checklist descargable
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="bg-white/20 px-6 py-3 rounded-xl">
              <div className="text-3xl font-bold">19€</div>
              <div className="text-sm opacity-80">Precio lanzamiento</div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-xl">
              <div className="text-3xl font-bold">26</div>
              <div className="text-sm opacity-80">Páginas</div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-xl">
              <div className="text-3xl font-bold">⭐⭐⭐⭐⭐</div>
              <div className="text-sm opacity-80">Guía práctica</div>
            </div>
          </div>
          <a
            href="https://lipastudios.gumroad.com/l/jkowwe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-2xl px-12 py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
          >
            🎁 COMPRAR AHORA (19€)
          </a>
          <p className="mt-6 text-sm opacity-75">
            ✅ Descarga inmediata • ✅ Garantía 30 días • ✅ Actualizado 2025
          </p>
        </div>
      </div>
    </div>
  );
}
