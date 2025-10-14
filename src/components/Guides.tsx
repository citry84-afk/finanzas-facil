function Guides() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Guías Completa de Finanzas Personales</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guías paso a paso, tutoriales detallados y recursos educativos para dominar tus finanzas personales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Guía 1: Primer Presupuesto */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu Primer Presupuesto en 30 Días</h2>
            <p className="text-gray-600 mb-6">
              Guía completa para crear tu primer presupuesto personal desde cero, paso a paso.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                Análisis de ingresos y gastos
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                Categorización de gastos
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                Herramientas y apps recomendadas
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                Seguimiento y ajustes
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
              Empezar Guía
            </button>
          </div>

          {/* Guía 2: Inversión para Principiantes */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl mb-4">📈</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Inversión para Principiantes</h2>
            <p className="text-gray-600 mb-6">
              Aprende a invertir tu dinero de forma segura y rentable, desde conceptos básicos hasta estrategias avanzadas.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                Conceptos básicos de inversión
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                Tipos de activos y riesgo
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                Plataformas y brokers
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                Estrategias de diversificación
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold">
              Empezar Guía
            </button>
          </div>

          {/* Guía 3: Emprendimiento Financiero */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl mb-4">💼</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Emprendimiento Financiero</h2>
            <p className="text-gray-600 mb-6">
              Todo lo que necesitas saber para emprender: desde la idea hasta la financiación y gestión.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                Validación de ideas de negocio
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                Plan de negocio y financiero
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                Fuentes de financiación
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                Gestión financiera empresarial
              </div>
            </div>
            <button className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold">
              Empezar Guía
            </button>
          </div>

          {/* Guía 4: Ahorro para Jubilación */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl mb-4">🏖️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Planificación de Jubilación</h2>
            <p className="text-gray-600 mb-6">
              Cómo planificar tu jubilación desde joven para asegurar una vejez cómoda y sin preocupaciones económicas.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                Cálculo de necesidades futuras
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                Planes de pensiones y SIALP
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                Inversión a largo plazo
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                Estrategias de optimización fiscal
              </div>
            </div>
            <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold">
              Empezar Guía
            </button>
          </div>

          {/* Guía 5: Gestión de Deudas */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl mb-4">💳</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión Inteligente de Deudas</h2>
            <p className="text-gray-600 mb-6">
              Estrategias profesionales para gestionar, reducir y eliminar deudas de forma eficiente y sostenible.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                Análisis de situación deudora
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                Negociación con acreedores
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                Consolidación y refinanciación
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                Prevención de nuevas deudas
              </div>
            </div>
            <button className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold">
              Empezar Guía
            </button>
          </div>

          {/* Guía 6: Finanzas Familiares */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Finanzas Familiares</h2>
            <p className="text-gray-600 mb-6">
              Cómo gestionar las finanzas en familia: presupuesto familiar, educación financiera para niños y planificación conjunta.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                Presupuesto familiar conjunto
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                Educación financiera para niños
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                Planificación de gastos familiares
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                Ahorro para educación de hijos
              </div>
            </div>
            <button className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition-colors font-semibold">
              Empezar Guía
            </button>
          </div>
        </div>

        {/* Sección de recursos adicionales */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Recursos Adicionales</h3>
            <p className="text-xl mb-8 opacity-90">
              Accede a plantillas, calculadoras y herramientas exclusivas para aplicar todo lo aprendido.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="text-lg font-semibold mb-2">Plantillas Gratuitas</h4>
                <p className="text-sm opacity-80">Presupuestos, seguimiento de gastos y planificadores financieros.</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl mb-3">🧮</div>
                <h4 className="text-lg font-semibold mb-2">Calculadoras Avanzadas</h4>
                <p className="text-sm opacity-80">Herramientas especializadas para cálculos financieros complejos.</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl mb-3">📚</div>
                <h4 className="text-lg font-semibold mb-2">Biblioteca de Recursos</h4>
                <p className="text-sm opacity-80">Libros recomendados, cursos y materiales de estudio.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guides;

