import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO5Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO5({ onNavegar }: ArticuloSEO5Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            📊 GUÍA COMPLETA 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Modelo 303 IVA Autónomos 2025: Cómo Calcular y Presentar la Declaración Trimestral
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Guía completa del Modelo 303 de IVA para autónomos. Cómo calcularlo, cuándo presentarlo, 
            ejemplos prácticos y cómo recuperar IVA. Todo lo que necesitas saber en 2025.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>📅 Actualizado: Enero 2025</span>
            <span>⏱️ 11 min de lectura</span>
            <span>👥 10.000+ autónomos ayudados</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">📋 ¿Qué es el Modelo 303?</h2>
          <p className="text-lg mb-4">
            El <strong>Modelo 303</strong> es la declaración trimestral del IVA. Si facturas con IVA, 
            debes presentarlo cada 3 meses para liquidar el IVA que has cobrado (repercutido) y el que has pagado (soportado).
          </p>
          <p className="text-lg">
            <strong>Frecuencia:</strong> Cada 3 meses (4 veces al año)<br />
            <strong>Plazo:</strong> Del 1 al 20 del mes siguiente al trimestre<br />
            <strong>Precio:</strong> GRATIS (se presenta online)
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🧮 Cómo Calcular el Modelo 303</h2>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fórmula del Modelo 303:</h3>
            <div className="bg-white rounded-xl p-6">
              <p className="text-2xl font-bold text-center text-gray-900 mb-4">
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

          <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 Ejemplo práctico:</h3>
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-3">
              <strong>Laura, diseñadora gráfica (1er trimestre 2025):</strong>
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Facturas emitidas: 10.000€ + 2.100€ IVA = 12.100€</li>
              <li>• Facturas recibidas: 2.000€ + 420€ IVA = 2.420€</li>
              <li>• <strong>IVA repercutido:</strong> 2.100€</li>
              <li>• <strong>IVA soportado:</strong> 420€</li>
              <li>• <strong>Modelo 303 a pagar:</strong> 2.100€ - 420€ = <strong>1.680€</strong></li>
            </ul>
            <p className="text-lg font-bold text-green-700 mt-4">
              💰 Si el IVA soportado {'>'} IVA repercutido, Hacienda te devuelve la diferencia
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">✅ ¿Quién debe presentar el Modelo 303?</h2>
          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Autónomos que facturan <strong>con IVA</strong> (régimen general)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Autónomos que tienen <strong>actividad empresarial</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Autónomos que <strong>NO están</strong> en régimen simplificado</span>
            </li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Consejo:</h4>
            <p className="text-gray-700">
              <strong>Pide facturas de TODO.</strong> Cada factura con IVA que recibes reduce lo que pagas 
              en el Modelo 303. Es dinero que recuperas.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">🎁 ¿Quieres la guía completa del Modelo 303?</h2>
          <p className="text-lg mb-6">
            Hemos creado una guía completa con ejemplos reales, casos prácticos y todo lo que necesitas 
            para presentar el Modelo 303 sin errores.
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
          <ArticulosRelacionados excluir="cuota-autonomos" onNavegar={onNavegar} />
        </div>

      </div>
    </div>
  );
}

