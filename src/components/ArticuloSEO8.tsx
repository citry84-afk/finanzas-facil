import Breadcrumbs from './Breadcrumbs';
import FAQSchema, { FAQItem } from './FAQSchema';
import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO8Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO8({ onNavegar }: ArticuloSEO8Props) {
  const faqs: FAQItem[] = [
    {
      question: "¿Cuándo debo aplicar retención de IRPF en mis facturas?",
      answer: "Debes aplicar retención del 15% (7% el primer año) cuando facturas a empresas, autónomos o administraciones públicas. NO aplicas retención cuando facturas a particulares (personas físicas que no son profesionales)."
    },
    {
      question: "¿Qué retención aplico el primer año como autónomo?",
      answer: "El primer año como autónomo (y los dos siguientes si tu facturación es menor a 15.000€/año), la retención es del 7%. A partir del segundo año con facturación superior a 15.000€, pasa al 15%."
    },
    {
      question: "¿Puedo recuperar las retenciones que me han aplicado?",
      answer: "Sí. Las retenciones que te aplican tus clientes son un 'anticipo' del IRPF que pagarás en la declaración de la renta. Si las retenciones son mayores que el IRPF final, Hacienda te devuelve la diferencia."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <Breadcrumbs 
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", onClick: () => onNavegar(0) },
            { label: "Retenciones IRPF Autónomos" }
          ]} 
        />

        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            💰 GUÍA FISCAL 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Retenciones IRPF Autónomos 2025: Cuándo y Cómo Aplicarlas
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Todo sobre retenciones: cuándo aplicar 7% o 15%, cómo facturar correctamente y cómo recuperar el dinero retenido
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Retenciones de IRPF: Lo Básico</h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            La retención de IRPF es un <strong>anticipo</strong> del impuesto sobre la renta que tu cliente paga directamente 
            a Hacienda en tu nombre. Es decir, <strong>cobras menos en cada factura</strong>, pero luego pagarás menos (o te devolverán) 
            en la declaración de la renta.
          </p>

          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Ejemplo práctico:</h3>
            <p className="text-gray-700 mb-3">
              Facturas 1.000€ a una empresa con retención del 15%:
            </p>
            <ul className="space-y-2 text-gray-700 font-mono bg-white p-4 rounded-lg">
              <li>• Base: 1.000€</li>
              <li>• IVA 21%: +210€</li>
              <li>• IRPF 15%: -150€ (retenido)</li>
              <li className="font-bold text-green-600 pt-2 border-t border-gray-300">= TOTAL A COBRAR: 1.060€</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              💰 Los 150€ retenidos los ha pagado el cliente a Hacienda por ti. Los recuperarás en la declaración de la renta si te corresponde.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">📋 ¿Cuándo Aplicar Retención?</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">✅ SÍ aplicas retención cuando facturas a:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Empresas (SL, SA, etc.)</li>
                <li>• Otros autónomos</li>
                <li>• Administraciones públicas</li>
                <li>• Asociaciones y fundaciones</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">❌ NO aplicas retención cuando facturas a:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Particulares (personas físicas sin actividad profesional)</li>
                <li>• Consumidores finales (B2C)</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">🎯 ¿7% o 15%? ¿Qué Retención Aplicar?</h2>
          
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📌 Regla general:</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-yellow-400">
                  <th className="pb-3 text-gray-900">Situación</th>
                  <th className="pb-3 text-gray-900 text-right">Retención</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-yellow-200">
                  <td className="py-3">Primer año como autónomo</td>
                  <td className="py-3 text-right font-bold text-green-600">7%</td>
                </tr>
                <tr className="border-b border-yellow-200">
                  <td className="py-3">2º y 3º año (si facturas {'<'} 15.000€/año)</td>
                  <td className="py-3 text-right font-bold text-green-600">7%</td>
                </tr>
                <tr className="border-b border-yellow-200">
                  <td className="py-3">A partir del 2º año (si facturas {'>'} 15.000€/año)</td>
                  <td className="py-3 text-right font-bold text-orange-600">15%</td>
                </tr>
                <tr>
                  <td className="py-3">Actividades profesionales especiales (obras, etc.)</td>
                  <td className="py-3 text-right font-bold text-red-600">7% / 15%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">💡 Cómo Recuperar las Retenciones</h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Las retenciones que te han aplicado durante el año son un <strong>adelanto</strong> del IRPF que pagarás 
            en la declaración de la renta. Aquí te explico cómo recuperarlas:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 1: Suma todas las retenciones del año</h4>
              <p className="text-gray-700">
                Revisa todas tus facturas emitidas y suma las retenciones que te han aplicado. Ejemplo: Si emitiste 
                50 facturas con retención de 150€ cada una, total retenido = 7.500€.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 2: Calcula tu IRPF final en la declaración</h4>
              <p className="text-gray-700">
                En la declaración de la renta, Hacienda calcula el IRPF que realmente debes pagar según tus ingresos 
                netos (ingresos - gastos deducibles).
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">PASO 3: Compara retenciones vs IRPF final</h4>
              <p className="text-gray-700">
                Si las retenciones (7.500€) son mayores que el IRPF final (ej: 5.000€), <strong>Hacienda te devuelve</strong> 
                la diferencia (2.500€). Si son menores, pagas la diferencia.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <FAQSchema faqs={faqs} showVisual={true} />
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">🧮 Calcula tu IRPF de Autónomo GRATIS</h3>
          <a
            href="/autonomos"
            className="inline-block bg-white text-green-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            🧮 USAR CALCULADORA
          </a>
        </div>

        <ArticulosRelacionados excluir="retenciones-irpf" onNavegar={onNavegar} />

      </div>
    </div>
  );
}

