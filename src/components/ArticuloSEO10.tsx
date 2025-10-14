import Breadcrumbs from './Breadcrumbs';
import FAQSchema, { FAQItem } from './FAQSchema';
import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO10Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO10({ onNavegar }: ArticuloSEO10Props) {
  const faqs: FAQItem[] = [
    {
      question: "¿Qué es el régimen de módulos para autónomos?",
      answer: "El régimen de módulos (o estimación objetiva) es un sistema simplificado donde Hacienda calcula tus impuestos en función de parámetros fijos (m² local, kW contratados, empleados, etc.) en lugar de tus ingresos y gastos reales. Solo disponible para ciertas actividades y con facturación menor a 250.000€/año."
    },
    {
      question: "¿Cuándo me conviene más módulos que estimación directa?",
      answer: "Módulos conviene si tus gastos deducibles son bajos (menor al 30% de ingresos) y tu actividad está incluida. Si tienes muchos gastos deducibles (más del 40-50%), estimación directa suele ser mejor porque pagas impuestos sobre beneficio real, no sobre ingresos estimados."
    },
    {
      question: "¿Puedo cambiar de módulos a estimación directa en cualquier momento?",
      answer: "No. El cambio solo puedes hacerlo presentando el modelo 036/037 antes del 31 de diciembre del año anterior. Si estás en módulos en 2025, para cambiar a estimación directa en 2026 debes avisar antes del 31 de diciembre de 2025."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <Breadcrumbs 
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", onClick: () => onNavegar(0) },
            { label: "Módulos vs Estimación Directa" }
          ]} 
        />

        <div className="text-center mb-12">
          <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🔄 DECISIÓN FISCAL CLAVE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Módulos vs Estimación Directa 2025: ¿Cuál Te Conviene Más?
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Guía completa para elegir el régimen fiscal correcto y ahorrar miles de euros en impuestos
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-2xl mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">⚠️ IMPORTANTE:</h3>
            <p className="text-lg text-gray-700">
              Elegir mal entre módulos y estimación directa puede costarte <strong>entre 2.000€ y 5.000€ al año</strong>. 
              Esta decisión solo puedes cambiarla una vez al año, así que es fundamental hacerlo bien.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">🤔 ¿Qué es cada régimen?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Estimación Directa</h3>
              <p className="text-gray-700 mb-4">
                Pagas impuestos sobre tu <strong>beneficio real</strong>: Ingresos - Gastos deducibles.
              </p>
              <p className="text-sm bg-blue-100 p-3 rounded-lg">
                💡 <strong>Ejemplo:</strong> Ingresos 50.000€ - Gastos 20.000€ = Beneficio 30.000€ → Pagas IRPF sobre 30.000€
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📐 Módulos (Estimación Objetiva)</h3>
              <p className="text-gray-700 mb-4">
                Pagas impuestos sobre <strong>rendimiento estimado</strong> según parámetros fijos (m², empleados, kW).
              </p>
              <p className="text-sm bg-green-100 p-3 rounded-lg">
                💡 <strong>Ejemplo:</strong> Bar de 50m² → Hacienda estima beneficio de 12.000€ → Pagas IRPF sobre 12.000€ (aunque ganes más o menos)
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">✅ ¿Quién Puede Estar en Módulos?</h2>
          
          <p className="text-lg text-gray-700 mb-6">
            NO todos los autónomos pueden estar en módulos. Solo si cumples TODOS estos requisitos:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">✅ 1. Tu actividad está incluida</h4>
              <p className="text-gray-700 mb-2">
                Actividades permitidas: comercio menor, hostelería, transporte, construcción, peluquerías, talleres. 
                <strong> NO permitidas:</strong> servicios profesionales (abogados, consultores, diseñadores, programadores).
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">✅ 2. Facturación anual {'<'} 250.000€</h4>
              <p className="text-gray-700">
                Límite total de ingresos del año anterior. Si superas 250.000€, pasas OBLIGATORIAMENTE a estimación directa.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">✅ 3. Compras de bienes {'<'} 250.000€</h4>
              <p className="text-gray-700">
                El volumen total de compras de bienes y servicios no puede superar 250.000€/año.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">✅ 4. NO más del 50% de ingresos de un solo cliente</h4>
              <p className="text-gray-700">
                Si más del 50% de tus ingresos vienen de un solo cliente, NO puedes estar en módulos (se considera que no eres autónomo real).
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">🆚 Comparativa: ¿Cuál Te Conviene?</h2>
          
          <div className="bg-purple-50 rounded-2xl p-6 mb-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-purple-300">
                  <th className="pb-3 text-gray-900">Aspecto</th>
                  <th className="pb-3 text-gray-900">Estimación Directa</th>
                  <th className="pb-3 text-gray-900">Módulos</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-purple-200">
                  <td className="py-3 font-semibold">Contabilidad</td>
                  <td className="py-3">Libros contables obligatorios</td>
                  <td className="py-3 text-green-600">✅ Muy simple</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="py-3 font-semibold">Gastos deducibles</td>
                  <td className="py-3 text-green-600">✅ Todos justificados</td>
                  <td className="py-3 text-red-600">❌ No deduces gastos</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="py-3 font-semibold">IVA</td>
                  <td className="py-3">Trimestral (real)</td>
                  <td className="py-3 text-yellow-600">⚠️ Simplificado</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="py-3 font-semibold">IRPF</td>
                  <td className="py-3">Sobre beneficio real</td>
                  <td className="py-3">Sobre rendimiento estimado</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Gestoría</td>
                  <td className="py-3 text-red-600">❌ Más cara (50-80€/mes)</td>
                  <td className="py-3 text-green-600">✅ Más barata (30-50€/mes)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">💡 ¿Cuál Elegir? Casos Prácticos</h2>
          
          <div className="space-y-6 mb-6">
            <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">✅ ELIGE MÓDULOS SI:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Tienes <strong>pocos gastos</strong> deducibles (menos del 30% de ingresos)</li>
                <li>• Tu actividad es comercio, hostelería o transporte</li>
                <li>• Quieres simplificar al máximo la contabilidad</li>
                <li>• Tus ingresos son estables y predecibles</li>
              </ul>
              <p className="text-sm bg-green-100 p-3 rounded-lg mt-4">
                💰 <strong>Ejemplo:</strong> Bar pequeño con pocos gastos → Módulos ahorra impuestos
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">✅ ELIGE ESTIMACIÓN DIRECTA SI:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Tienes <strong>muchos gastos</strong> deducibles (más del 40% de ingresos)</li>
                <li>• Eres profesional (consultor, diseñador, programador, abogado)</li>
                <li>• Tus ingresos fluctúan mucho mes a mes</li>
                <li>• Facturas más de 250.000€/año</li>
              </ul>
              <p className="text-sm bg-blue-100 p-3 rounded-lg mt-4">
                💰 <strong>Ejemplo:</strong> Diseñador freelance con oficina, ordenadores, software → Estimación directa ahorra impuestos
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">🔄 Cómo Cambiar de Régimen</h2>
          
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Plazos importantes:</h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>De módulos a estimación directa:</strong> Presentar modelo 036/037 antes del 31 de diciembre
              </li>
              <li>
                <strong>De estimación directa a módulos:</strong> Presentar modelo 036/037 en enero del año siguiente
              </li>
              <li>
                <strong>Si superas límites de módulos:</strong> Hacienda te cambia automáticamente (pero es mejor avisar tú)
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <FAQSchema faqs={faqs} showVisual={true} />
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-white text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">🧮 Calcula tus Impuestos como Autónomo</h3>
          <p className="text-lg mb-6">
            Nuestra calculadora te ayuda a estimar IRPF, cuota y gastos deducibles
          </p>
          <a
            href="/autonomos"
            className="inline-block bg-white text-indigo-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            🧮 USAR CALCULADORA GRATIS
          </a>
        </div>

        <ArticulosRelacionados excluir="modulos-estimacion" onNavegar={onNavegar} />

      </div>
    </div>
  );
}

