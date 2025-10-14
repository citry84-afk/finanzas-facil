import { useState } from 'react';
import ArticuloSEO1 from './ArticuloSEO1';
import ArticuloSEO2 from './ArticuloSEO2';
import ArticuloSEO3 from './ArticuloSEO3';
import ArticuloSEO4 from './ArticuloSEO4';
import ArticuloSEO5 from './ArticuloSEO5';
import ArticuloSEO6 from './ArticuloSEO6';
import ArticuloSEO7 from './ArticuloSEO7';
import ArticuloSEO8 from './ArticuloSEO8';
import ArticuloSEO9 from './ArticuloSEO9';
import ArticuloSEO10 from './ArticuloSEO10';

function Blog() {
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<number | null>(null);

  // Si hay un artículo seleccionado, mostrarlo
  if (articuloSeleccionado !== null) {
    const componentes = [ArticuloSEO1, ArticuloSEO2, ArticuloSEO3, ArticuloSEO4, ArticuloSEO5, ArticuloSEO6, ArticuloSEO7, ArticuloSEO8, ArticuloSEO9, ArticuloSEO10];
    const ArticuloComponente = componentes[articuloSeleccionado - 1];
    
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-16 left-0 right-0 z-10 bg-white border-b border-gray-200 py-4 px-6">
          <button
            onClick={() => setArticuloSeleccionado(null)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            ← Volver al Blog
          </button>
        </div>
        <ArticuloComponente onNavegar={setArticuloSeleccionado} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog de Finanzas Personales</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Artículos especializados en educación financiera, estrategias de ahorro, inversión y gestión del dinero personal en España.
          </p>
        </div>

        {/* NUEVOS ARTÍCULOS SEO 2025 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">⭐ Artículos Estrella 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <article 
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-2 border-green-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(1)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">🧮</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Calculadora de Autónomos 2025: Guía Completa</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  La guía definitiva para entender y optimizar tus impuestos como autónomo en 2025. Todo sobre IRPF, Seguridad Social, 
                  gastos deducibles y bonificaciones.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Calculadora</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">IRPF</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

            <article 
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(2)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Gastos Deducibles para Autónomos 2025</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  La guía definitiva para ahorrar miles de euros. Descubre los 20 gastos que TODO autónomo puede deducir y cómo 
                  optimizar tu factura fiscal legalmente.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">Deducciones</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">Ahorro</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

            <article 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(3)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Modelo 130 Autónomos 2025: Guía Paso a Paso</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Aprende a presentar tu IRPF trimestral correctamente. Guía completa con ejemplos prácticos, plazos y errores comunes 
                  que debes evitar.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">Modelo 130</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Hacienda</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

            <article 
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl border-2 border-orange-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(4)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">IRPF Autónomos 2025: Todo lo que Necesitas Saber</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Domina el IRPF para autónomos: tramos, deducciones, retenciones y estrategias para optimizar tu declaración anual 
                  y trimestral.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">IRPF</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">Fiscalidad</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

            <article 
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl border-2 border-teal-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(5)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cuota de Autónomos 2025: Novedades y Estrategias</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Todo sobre las nuevas cuotas de autónomos 2025: tarifa plana, bonificaciones, sistema por ingresos reales y cómo 
                  pagar menos legalmente.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Seguridad Social</span>
                  <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-3 py-1 rounded-full">Cuotas</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

          </div>
        </div>

        {/* MÁS ARTÍCULOS SEO 2025 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📚 Más Guías Especializadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <article 
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-2 border-green-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(6)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tarifa Plana Autónomos 2025</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Guía completa para ahorrar 2.568€ el primer año con la tarifa plana de 80€/mes. Requisitos, bonificaciones y estrategias.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">Ahorro</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

            <article 
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(7)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Facturación Electrónica 2025</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Todo sobre la facturación electrónica obligatoria: software, plazos, sanciones y cómo adaptarte sin morir en el intento.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">Obligatorio</span>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">Tecnología</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

            <article 
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl border-2 border-orange-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(8)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">💸</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Retenciones IRPF Autónomos</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Cuándo aplicar 7% o 15%, cómo facturar correctamente y cómo recuperar el dinero retenido en la declaración.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">IRPF</span>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">Retenciones</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

            <article 
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl border-2 border-purple-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(9)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pluriactividad Autónomos 2025</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Bonificación del 50% si trabajas por cuenta ajena y eres autónomo. Ahorra hasta 2.646€ en 18 meses.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">Bonificación</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Pluriactividad</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

            <article 
              className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-3xl border-2 border-indigo-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setArticuloSeleccionado(10)}
            >
              <div className="p-8">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Módulos vs Estimación Directa</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  ¿Cuál te conviene más? Comparativa completa para elegir el régimen fiscal correcto y ahorrar miles de euros.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">Fiscalidad</span>
                  <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-3 py-1 rounded-full">Estrategia</span>
                </div>
                <div className="mt-4 text-blue-600 font-semibold">
                  Leer artículo completo →
                </div>
              </div>
            </article>

          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Artículos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cómo Calcular tu Salario Neto en España 2025</h3>
                <p className="text-gray-600 mb-4">
                  Guía completa para entender cómo se calcula tu salario neto, incluyendo IRPF, Seguridad Social y todas las deducciones aplicables.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  El cálculo del salario neto en España puede resultar complejo debido a los múltiples conceptos que se descuentan del salario bruto. 
                  En este artículo te explicamos paso a paso cómo se calcula, qué es el IRPF, cómo funciona la Seguridad Social y cuáles son 
                  las deducciones que pueden aplicarse a tu nómina. También incluimos ejemplos prácticos y consejos para optimizar tu situación fiscal.
                </p>
                <div className="mt-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Salarios</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">👨‍💼</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Guía Completa para Autónomos: IRPF y Gastos Deducibles</h3>
                <p className="text-gray-600 mb-4">
                  Todo lo que necesitas saber sobre fiscalidad como autónomo, tipos impositivos, gastos deducibles y optimización fiscal.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Ser autónomo en España implica conocer a fondo la fiscalidad aplicable. En esta guía te explicamos los tipos impositivos 
                  del IRPF para autónomos, qué gastos puedes deducir, cómo funcionan los pagos trimestrales y estrategias legales para 
                  optimizar tu carga fiscal. Incluimos ejemplos prácticos y herramientas para calcular tus impuestos correctamente.
                </p>
                <div className="mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cómo Crear tu Primer Fondo de Emergencia</h3>
                <p className="text-gray-600 mb-4">
                  Aprende a calcular, construir y mantener tu fondo de emergencia para protegerte ante situaciones inesperadas.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  El fondo de emergencia es la base de cualquier plan financiero sólido. Te enseñamos cómo calcular cuánto necesitas 
                  ahorrar, dónde guardar tu dinero, cómo acelerar el proceso de construcción y cuándo utilizarlo. Incluimos estrategias 
                  prácticas para diferentes niveles de ingresos y situaciones familiares.
                </p>
                <div className="mt-4">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">Ahorro</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cómo Comprar tu Primera Vivienda en España 2025</h3>
                <p className="text-gray-600 mb-4">
                  Guía completa para comprar tu primera vivienda: desde el ahorro inicial hasta la firma de la escritura.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Comprar una vivienda es una de las decisiones financieras más importantes de tu vida. Te explicamos paso a paso 
                  cómo ahorrar para la entrada, elegir la hipoteca adecuada, negociar con el banco y evitar errores costosos. 
                  Incluimos consejos sobre ayudas públicas, deducciones fiscales y estrategias de negociación.
                </p>
                <div className="mt-4">
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">Vivienda</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cómo Invertir en Fondos Indexados en España</h3>
                <p className="text-gray-600 mb-4">
                  Aprende a invertir de forma segura y rentable con fondos indexados, la estrategia favorita de los expertos.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Los fondos indexados son la forma más sencilla y eficaz de invertir a largo plazo. Te explicamos qué son, 
                  por qué son tan recomendados, cómo elegir los mejores fondos para tu perfil de riesgo y cómo empezar 
                  a invertir con poco dinero. Incluimos comparativas de comisiones y plataformas recomendadas.
                </p>
                <div className="mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Inversión</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cómo Salir de las Deudas de Tarjetas de Crédito</h3>
                <p className="text-gray-600 mb-4">
                  Estrategias probadas para eliminar tus deudas de tarjetas de crédito de forma eficiente y sin estrés.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Las deudas de tarjetas de crédito pueden convertirse en una pesadilla financiera. Te enseñamos el método 
                  bola de nieve, cómo negociar con el banco, cuándo considerar una consolidación de deudas y cómo evitar 
                  caer en la trampa del interés compuesto. Incluimos ejemplos prácticos y cronogramas de pago.
                </p>
                <div className="mt-4">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">Deudas</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Plan de Pensiones vs Plan de Ahorro: ¿Cuál Elegir?</h3>
                <p className="text-gray-600 mb-4">
                  Comparativa completa entre planes de pensiones y planes de ahorro para tu jubilación.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Decidir entre un plan de pensiones y un plan de ahorro puede ser confuso. Te explicamos las diferencias 
                  fiscales, los límites de aportación, la liquidez, las comisiones y cuál conviene más según tu situación 
                  personal. Incluimos ejemplos de rentabilidad y estrategias de diversificación para la jubilación.
                </p>
                <div className="mt-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">Jubilación</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mejores Apps de Finanzas Personales en España 2025</h3>
                <p className="text-gray-600 mb-4">
                  Ranking de las mejores aplicaciones para gestionar tu dinero, controlar gastos y alcanzar tus objetivos.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Las apps de finanzas personales pueden revolucionar tu gestión del dinero. Analizamos las mejores opciones 
                  disponibles en España: desde control de gastos hasta inversión, pasando por ahorro automático. Te ayudamos 
                  a elegir la app perfecta según tus necesidades y te damos consejos para sacarles el máximo partido.
                </p>
                <div className="mt-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">Apps</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Modelo 130: Guía Completa para Autónomos 2025</h3>
                <p className="text-gray-600 mb-4">
                  Todo lo que necesitas saber sobre el Modelo 130, declaración trimestral de IRPF para autónomos en régimen de estimación directa.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  El Modelo 130 es la declaración trimestral de IRPF que deben presentar los autónomos en estimación directa. Te explicamos 
                  paso a paso cómo rellenarlo, qué casillas incluir, cómo calcular los ingresos y gastos deducibles, y qué plazos debes respetar. 
                  Incluimos ejemplos prácticos con cifras reales, errores comunes que debes evitar y consejos para optimizar tus pagos fraccionados. 
                  También detallamos las diferencias con el Modelo 131 y cómo saber cuál te corresponde según tu actividad profesional.
                </p>
                <div className="mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full ml-2">Fiscalidad</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cuota de Autónomos 2025: Todas las Tarifas Planas y Bonificaciones</h3>
                <p className="text-gray-600 mb-4">
                  Guía completa sobre las cuotas de autónomos en 2025, incluyendo tarifa plana, bonificaciones y el nuevo sistema por ingresos reales.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  El sistema de cotización de autónomos ha cambiado radicalmente en 2025 con el nuevo modelo basado en ingresos reales. Te explicamos 
                  cómo funciona el sistema de tramos, qué cuota te corresponde según tus rendimientos netos, cómo aprovechar la tarifa plana de 80€ 
                  durante el primer año, las bonificaciones disponibles para menores de 30 años, mujeres que regresan tras maternidad y pluriactividad. 
                  Incluimos tablas completas de cuotas 2025, calculadora de cuota estimada según ingresos, y estrategias legales para optimizar tu cotización.
                </p>
                <div className="mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full ml-2">Seguridad Social</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Gastos Deducibles Vehículo Autónomos: Guía Completa 2025</h3>
                <p className="text-gray-600 mb-4">
                  Aprende a deducir correctamente los gastos de tu vehículo como autónomo: combustible, mantenimiento, seguros y amortización.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Los gastos de vehículo son una de las deducciones más importantes y complejas para autónomos. Te explicamos qué porcentaje puedes 
                  deducir según el uso profesional (50% para actividades comerciales, proporcional para otros casos), cómo llevar un libro de registro 
                  de kilometraje, qué gastos son deducibles (combustible, seguros, mantenimiento, reparaciones, ITV, parking), cómo calcular la 
                  amortización del vehículo, requisitos para facturación y pago, diferencias entre vehículo propio y renting, y qué documentación 
                  conservar ante una inspección de Hacienda. Incluimos ejemplos reales y plantillas de control de kilometraje.
                </p>
                <div className="mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full ml-2">Deducciones</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">🏡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Deducción de Suministros en Casa para Autónomos 2025</h3>
                <p className="text-gray-600 mb-4">
                  Cómo deducir luz, agua, internet y otros gastos de vivienda cuando trabajas desde casa como autónomo.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Trabajar desde casa permite deducir una parte de los gastos de suministros y vivienda. Te explicamos cómo calcular el porcentaje 
                  deducible según los metros cuadrados destinados a la actividad, qué suministros puedes deducir (electricidad, agua, gas, internet, 
                  teléfono, comunidad, IBI proporcional), diferencias entre ser propietario o inquilino, cómo justificar el espacio de trabajo ante 
                  Hacienda, qué documentación es necesaria, límites y restricciones aplicables, y errores comunes que debes evitar. Incluimos ejemplos 
                  de cálculo con diferentes escenarios: piso de 80m² con despacho de 10m², vivienda compartida, y oficina dedicada al 100%.
                </p>
                <div className="mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full ml-2">Teletrabajo</span>
                </div>
              </div>
            </article>

            <article className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Modelo 303 IVA: Guía Paso a Paso para Autónomos 2025</h3>
                <p className="text-gray-600 mb-4">
                  Todo sobre el Modelo 303 de IVA trimestral: cómo rellenarlo, calcular IVA repercutido y soportado, y optimizar tu declaración.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  El Modelo 303 es la declaración trimestral de IVA que presentan la mayoría de autónomos. Te enseñamos paso a paso cómo rellenar 
                  cada casilla, calcular el IVA repercutido (el que facturas a tus clientes), el IVA soportado deducible (el que pagas en tus compras), 
                  cómo realizar correctamente el prorrateo si tienes actividades exentas, cuándo solicitar devolución de IVA, plazos de presentación 
                  (20 de abril, julio, octubre y enero), régimen especial de criterio de caja, recargo de equivalencia, y diferencias entre el 303 
                  trimestral y el 390 anual. Incluimos ejemplos reales con facturas, errores frecuentes y consejos de optimización fiscal legal.
                </p>
                <div className="mt-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Autónomos</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full ml-2">IVA</span>
                </div>
              </div>
            </article>

          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Categorías de Contenido</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-bold text-gray-900 mb-2">Salarios</h3>
              <p className="text-gray-600 text-sm">Cálculo de salarios, nóminas y derechos laborales</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-bold text-gray-900 mb-2">Autónomos</h3>
              <p className="text-gray-600 text-sm">Fiscalidad, gastos deducibles y gestión empresarial</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold text-gray-900 mb-2">Inversión</h3>
              <p className="text-gray-600 text-sm">Estrategias de inversión y planificación financiera</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold text-gray-900 mb-2">Vivienda</h3>
              <p className="text-gray-600 text-sm">Hipotecas, alquiler y compra de vivienda</p>
            </div>

          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Guías Especializadas</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Finanzas Personales en España: Todo lo que Necesitas Saber</h3>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Las finanzas personales en España han evolucionado significativamente en los últimos años. Con cambios en la normativa fiscal, 
                nuevas oportunidades de inversión y herramientas digitales avanzadas, es más importante que nunca estar bien informado para 
                tomar decisiones financieras inteligentes.
              </p>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">Aspectos Únicos del Sistema Financiero Español</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                España cuenta con un sistema financiero robusto y bien regulado. El Banco de España supervisa las entidades bancarias, 
                mientras que la CNMV regula los mercados de valores. Esta estructura proporciona seguridad y transparencia a los consumidores, 
                pero también requiere conocer las particularidades del mercado español.
              </p>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">Fiscalidad Española: IRPF y Otros Impuestos</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                El IRPF (Impuesto sobre la Renta de las Personas Físicas) es progresivo y varía según la comunidad autónoma. 
                Comprender los tramos impositivos, las deducciones disponibles y las particularidades regionales es fundamental 
                para optimizar tu situación fiscal legalmente.
              </p>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">Oportunidades de Ahorro e Inversión</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                España ofrece diversas opciones para el ahorro y la inversión: desde cuentas remuneradas hasta fondos indexados, 
                pasando por planes de pensiones con beneficios fiscales. La clave está en diversificar y aprovechar las ventajas 
                fiscales disponibles.
              </p>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">Herramientas Digitales para la Gestión Financiera</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                La digitalización bancaria en España ha avanzado rápidamente. Las apps móviles, la banca online y las fintech 
                ofrecen nuevas formas de gestionar el dinero, invertir y ahorrar de forma más eficiente y con menores costes.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Mantente Actualizado</h3>
          <p className="text-lg mb-6 opacity-90">
            Recibe los últimos artículos sobre finanzas personales y consejos para mejorar tu economía directamente en tu email.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input 
              type="email" 
              placeholder="Tu email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Blog;
