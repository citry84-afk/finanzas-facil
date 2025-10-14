import Breadcrumbs from './Breadcrumbs';
import FAQSchema, { FAQItem } from './FAQSchema';
import ArticulosRelacionados from './ArticulosRelacionados';

interface ArticuloSEO6Props {
  onNavegar: (articulo: number) => void;
}

export default function ArticuloSEO6({ onNavegar }: ArticuloSEO6Props) {
  const faqs: FAQItem[] = [
    {
      question: "¿Cuánto tiempo dura la tarifa plana de autónomos en 2025?",
      answer: "La tarifa plana dura 12 meses para nuevos autónomos, con cuota de 80€/mes durante el primer año. Después hay reducciones progresivas: 50% descuento meses 13-18, 30% meses 19-24. Si eres menor de 30 años o mujer menor de 35, puedes tener hasta 24 meses adicionales de bonificación."
    },
    {
      question: "¿Puedo acceder a la tarifa plana si ya fui autónomo antes?",
      answer: "Solo puedes acceder si han pasado al menos 2 años (24 meses) desde que te diste de baja como autónomo. Si han pasado 3 años o más, podrás acceder sin problemas. Si fueron menos de 2 años, no tendrás derecho a la tarifa plana."
    },
    {
      question: "¿Qué pasa si supero ciertos ingresos con la tarifa plana?",
      answer: "Con la tarifa plana de 80€/mes NO hay límite de ingresos en 2025. Puedes facturar lo que quieras y seguirás pagando 80€/mes durante los 12 meses. Esto cambió respecto a años anteriores donde había límites."
    },
    {
      question: "¿La tarifa plana incluye solo la cuota de autónomos o también el IRPF?",
      answer: "La tarifa plana solo afecta a la cuota de la Seguridad Social (80€/mes). El IRPF se paga aparte y depende de tus ingresos netos. Deberás presentar el Modelo 130 trimestralmente y pagar el IRPF correspondiente según tus beneficios."
    },
    {
      question: "¿Puedo cambiar de base de cotización durante la tarifa plana?",
      answer: "Sí, puedes cambiar tu base de cotización hasta 4 veces al año (1 enero, 1 abril, 1 julio, 1 octubre). Sin embargo, con la tarifa plana pagarás siempre 80€/mes independientemente de la base que elijas. Elegir una base alta te dará mejor pensión futura."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", onClick: () => onNavegar(0) },
            { label: "Tarifa Plana Autónomos 2025" }
          ]} 
        />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🎉 AHORRO MÁXIMO 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tarifa Plana Autónomos 2025: Guía Completa para Nuevos Autónomos
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Todo lo que necesitas saber sobre la tarifa plana de 80€/mes: requisitos, duración, bonificaciones y cómo aprovecharlaal máximo
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>📅 Actualizado: Octubre 2025</span>
            <span>⏱️ Lectura: 12 min</span>
            <span>✍️ Por FinanzasFácil</span>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Si estás pensando en hacerte autónomo en 2025, <strong>la tarifa plana es tu mejor aliada</strong>. 
            Te permite pagar solo <strong>80€/mes durante el primer año</strong>, en lugar de los 300-400€ que pagarías 
            normalmente. Esto significa un <strong>ahorro de más de 2.400€ el primer año</strong>.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Pero hay trampas, requisitos y estrategias que debes conocer para aprovecharla al máximo. En esta guía 
            te explico <strong>TODO lo que necesitas saber</strong> para no perder ni un euro.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💰 Ahorro con Tarifa Plana (primer año):</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ <strong>Cuota normal:</strong> 294€/mes × 12 = 3.528€/año</li>
              <li>✓ <strong>Cuota con tarifa plana:</strong> 80€/mes × 12 = 960€/año</li>
              <li>✓ <strong>AHORRO TOTAL:</strong> <span className="text-green-700 font-bold text-2xl">2.568€</span></li>
            </ul>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📋 ¿Qué es la Tarifa Plana de Autónomos?</h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            La tarifa plana es una <strong>bonificación en la cuota de autónomos</strong> que te permite pagar solo 
            <strong> 80€/mes durante los primeros 12 meses</strong> como autónomo. Es una medida del Gobierno para 
            fomentar el emprendimiento y facilitar el inicio de actividad.
          </p>

          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Evolución de la cuota con tarifa plana:</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-blue-200">
                  <th className="pb-3 text-gray-900">Periodo</th>
                  <th className="pb-3 text-gray-900 text-right">Cuota mensual</th>
                  <th className="pb-3 text-gray-900 text-right">Bonificación</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-100">
                  <td className="py-3">Meses 1-12</td>
                  <td className="py-3 text-right font-bold text-green-600">80€</td>
                  <td className="py-3 text-right">80%</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-3">Meses 13-18</td>
                  <td className="py-3 text-right font-bold">147€</td>
                  <td className="py-3 text-right">50%</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-3">Meses 19-24</td>
                  <td className="py-3 text-right font-bold">206€</td>
                  <td className="py-3 text-right">30%</td>
                </tr>
                <tr>
                  <td className="py-3">Mes 25 en adelante</td>
                  <td className="py-3 text-right font-bold text-red-600">294€</td>
                  <td className="py-3 text-right">0%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">✅ Requisitos para acceder a la Tarifa Plana 2025</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">1️⃣ Ser NUEVO autónomo</h4>
              <p className="text-gray-700">
                No haber estado dado de alta como autónomo en los <strong>últimos 2 años</strong> (24 meses). 
                Si te diste de baja hace 3 años, puedes acceder sin problema.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">2️⃣ No tener deudas con Hacienda o Seguridad Social</h4>
              <p className="text-gray-700">
                Debes estar al corriente de pago con la Agencia Tributaria y la Tesorería de la Seguridad Social.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">3️⃣ Solicitar la bonificación al darte de alta</h4>
              <p className="text-gray-700">
                Debes marcar la casilla de tarifa plana en el modelo TA.0521 cuando te des de alta en Hacienda y Seguridad Social.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">4️⃣ No ser autónomo colaborador</h4>
              <p className="text-gray-700">
                Los autónomos colaboradores (familiares) NO pueden acceder a la tarifa plana estándar, pero tienen 
                su propia bonificación del 50% durante 18 meses.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">🎁 Bonificaciones EXTRA para Jóvenes y Mujeres</h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Si eres menor de 30 años (hombres) o menor de 35 años (mujeres que reanudan actividad tras maternidad), 
            puedes disfrutar de <strong>bonificaciones adicionales de hasta 24 meses más</strong>:
          </p>

          <div className="bg-purple-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">👶 Bonificación para menores de 30/35 años:</h3>
            <table className="w-full text-left mb-4">
              <thead>
                <tr className="border-b-2 border-purple-200">
                  <th className="pb-3 text-gray-900">Periodo</th>
                  <th className="pb-3 text-gray-900 text-right">Bonificación</th>
                  <th className="pb-3 text-gray-900 text-right">Cuota aprox.</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-purple-100">
                  <td className="py-3">Meses 25-36</td>
                  <td className="py-3 text-right font-bold">30%</td>
                  <td className="py-3 text-right">206€</td>
                </tr>
                <tr>
                  <td className="py-3">Meses 37-48</td>
                  <td className="py-3 text-right font-bold">30%</td>
                  <td className="py-3 text-right">206€</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-600">
              💡 <strong>Total:</strong> Hasta 4 años con bonificaciones (48 meses)
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">💡 Estrategias para Maximizar el Ahorro</h2>
          
          <div className="space-y-6 mb-6">
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">🔥 ESTRATEGIA 1: Elige Base de Cotización Alta</h4>
              <p className="text-gray-700 mb-3">
                Durante la tarifa plana pagas <strong>siempre 80€/mes</strong>, independientemente de tu base de cotización. 
                Aprovecha para elegir una base alta (ej: 2.000€) y así cotizar más para tu pensión futura 
                <strong> sin pagar más</strong>.
              </p>
              <p className="text-sm bg-yellow-100 p-3 rounded-lg">
                💰 <strong>Ejemplo:</strong> Base mínima (950€) → Pensión baja. Base alta (2.000€) → Pensión alta. 
                Ambas cuestan 80€/mes durante el primer año.
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">🔥 ESTRATEGIA 2: Date de Alta a Principio de Mes</h4>
              <p className="text-gray-700 mb-3">
                Si te das de alta el día 15, pagarás 80€ completos ese mes. Si te das de alta el día 1, también pagarás 80€. 
                <strong> Mejor empezar el día 1 para aprovechar todo el mes</strong>.
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">🔥 ESTRATEGIA 3: Factura sin Límite</h4>
              <p className="text-gray-700 mb-3">
                A diferencia de años anteriores, <strong>en 2025 NO hay límite de facturación</strong> para mantener 
                la tarifa plana. Puedes facturar 50.000€ o 100.000€ y seguir pagando 80€/mes.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">⚠️ Errores Comunes que Debes Evitar</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">❌ ERROR 1: No solicitar la bonificación al darte de alta</h4>
              <p className="text-gray-700 mb-2">
                <strong>Problema:</strong> Si no marcas la casilla al darte de alta, perderás el derecho a la tarifa plana.
              </p>
              <p className="text-sm text-green-700">
                ✅ <strong>Solución:</strong> Asegúrate de marcar la bonificación en el modelo TA.0521 desde el principio.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">❌ ERROR 2: Darse de baja antes de 12 meses</h4>
              <p className="text-gray-700 mb-2">
                <strong>Problema:</strong> Si te das de baja antes de completar 12 meses, Seguridad Social puede reclamarte 
                la diferencia de cuota que te bonificaron.
              </p>
              <p className="text-sm text-green-700">
                ✅ <strong>Solución:</strong> Aguanta al menos 12 meses aunque no factures mucho. El ahorro vale la pena.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">❌ ERROR 3: Elegir base mínima</h4>
              <p className="text-gray-700 mb-2">
                <strong>Problema:</strong> Muchos eligen base mínima pensando que ahorran, pero con tarifa plana el coste 
                es el mismo (80€) para cualquier base.
              </p>
              <p className="text-sm text-green-700">
                ✅ <strong>Solución:</strong> Elige base alta (1.500-2.000€) para cotizar más sin pagar más.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Schema */}
        <div className="mb-12">
          <FAQSchema faqs={faqs} showVisual={true} />
        </div>

        {/* CTA Product */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">🎁 ¿Quieres maximizar tu ahorro fiscal?</h3>
          <p className="text-lg mb-6">
            Descarga nuestra guía completa con 20 gastos deducibles y ahorra miles de euros al año
          </p>
          <a
            href="https://lipastudios.gumroad.com/l/jkowwe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-gray-900 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl"
          >
            📚 Ver Guía Completa (19€)
          </a>
        </div>

        {/* Artículos Relacionados */}
        <ArticulosRelacionados excluir="tarifa-plana" onNavegar={onNavegar} />

      </div>
    </div>
  );
}

