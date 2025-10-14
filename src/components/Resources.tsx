function Resources() {
  const tools = [
    {
      category: "Plantillas Gratuitas",
      items: [
        {
          title: "Plantilla de Presupuesto Mensual",
          description: "Excel descargable para crear y seguir tu presupuesto personal",
          type: "Excel",
          size: "45 KB",
          downloads: "2,847",
          features: ["Categorías predefinidas", "Gráficos automáticos", "Comparativas mensuales"]
        },
        {
          title: "Seguimiento de Gastos Diarios",
          description: "Plantilla para registrar todos tus gastos día a día",
          type: "PDF",
          size: "12 KB", 
          downloads: "1,923",
          features: ["Registro por categorías", "Resumen semanal", "Análisis de patrones"]
        },
        {
          title: "Planificador de Objetivos Financieros",
          description: "Herramienta para establecer y seguir tus metas de ahorro",
          type: "Excel",
          size: "38 KB",
          downloads: "1,456",
          features: ["Múltiples objetivos", "Progreso visual", "Recordatorios"]
        },
        {
          title: "Calculadora de Deudas",
          description: "Plantilla para gestionar y planificar el pago de deudas",
          type: "Excel", 
          size: "52 KB",
          downloads: "987",
          features: ["Método bola de nieve", "Método avalancha", "Comparativas"]
        }
      ]
    },
    {
      category: "Guías en PDF",
      items: [
        {
          title: "Guía Completa de Finanzas Personales",
          description: "Manual completo de 50 páginas sobre gestión financiera",
          type: "PDF",
          size: "2.3 MB",
          downloads: "3,421",
          features: ["Conceptos básicos", "Estrategias avanzadas", "Casos prácticos"]
        },
        {
          title: "Manual para Autónomos 2025",
          description: "Todo lo que necesitas saber sobre fiscalidad autónoma",
          type: "PDF",
          size: "1.8 MB", 
          downloads: "2,156",
          features: ["IRPF actualizado", "Gastos deducibles", "Calendario fiscal"]
        },
        {
          title: "Guía de Inversión para Principiantes",
          description: "Introducción completa al mundo de las inversiones",
          type: "PDF",
          size: "1.5 MB",
          downloads: "1,789",
          features: ["Conceptos básicos", "Tipos de activos", "Estrategias"]
        },
        {
          title: "Planificación de Jubilación",
          description: "Cómo preparar tu futuro económico desde joven",
          type: "PDF",
          size: "1.2 MB",
          downloads: "1,234",
          features: ["Cálculos necesarios", "Productos financieros", "Optimización fiscal"]
        }
      ]
    },
    {
      category: "Calculadoras Avanzadas",
      items: [
        {
          title: "Calculadora de Interés Compuesto",
          description: "Simula el crecimiento de tus ahorros a largo plazo",
          type: "Web",
          size: "Online",
          downloads: "5,234",
          features: ["Múltiples escenarios", "Gráficos interactivos", "Comparativas"]
        },
        {
          title: "Simulador de Hipoteca",
          description: "Calcula cuotas, intereses y amortizaciones",
          type: "Web",
          size: "Online",
          downloads: "4,567",
          features: ["Diferentes tipos de interés", "Amortizaciones anticipadas", "Comparativas bancos"]
        },
        {
          title: "Calculadora de Coste de Vida",
          description: "Compara el coste de vida entre ciudades",
          type: "Web",
          size: "Online", 
          downloads: "2,345",
          features: ["Más de 100 ciudades", "Múltiples categorías", "Ajustes por salario"]
        },
        {
          title: "Simulador de Pensiones",
          description: "Estima tu pensión futura según diferentes escenarios",
          type: "Web",
          size: "Online",
          downloads: "3,123",
          features: ["Escenarios variables", "Optimización de aportaciones", "Comparativas productos"]
        }
      ]
    }
  ];

  const books = [
    {
      title: "Padre Rico, Padre Pobre",
      author: "Robert Kiyosaki",
      rating: 4.2,
      category: "Educación Financiera",
      description: "Fundamentos de la mentalidad financiera y la diferencia entre activos y pasivos."
    },
    {
      title: "El Inversor Inteligente",
      author: "Benjamin Graham",
      rating: 4.5,
      category: "Inversión",
      description: "La biblia de la inversión en valor, escrito por el mentor de Warren Buffett."
    },
    {
      title: "Los Secretos de la Mente Millonaria",
      author: "T. Harv Eker",
      rating: 4.1,
      category: "Mentalidad",
      description: "Cómo reprogramar tu mente para el éxito financiero."
    },
    {
      title: "Un Paseo Aleatorio por Wall Street",
      author: "Burton Malkiel",
      rating: 4.3,
      category: "Inversión",
      description: "Introducción a la inversión pasiva y los fondos indexados."
    },
    {
      title: "Dinero: Domina el Juego",
      author: "Tony Robbins",
      rating: 4.0,
      category: "Estrategia Financiera",
      description: "7 pasos simples para la libertad financiera."
    },
    {
      title: "El Hombre Más Rico de Babilonia",
      author: "George S. Clason",
      rating: 4.4,
      category: "Principios Básicos",
      description: "Lecciones atemporales sobre el ahorro y la inversión."
    }
  ];

  const courses = [
    {
      title: "Finanzas Personales desde Cero",
      provider: "Coursera",
      duration: "4 semanas",
      level: "Principiante",
      price: "Gratis",
      rating: 4.6,
      description: "Curso completo de la Universidad de Michigan sobre gestión financiera personal."
    },
    {
      title: "Inversión en Bolsa para Principiantes",
      provider: "Udemy",
      duration: "8 horas",
      level: "Principiante",
      price: "€29.99",
      rating: 4.4,
      description: "Aprende los fundamentos de la inversión en mercados financieros."
    },
    {
      title: "Fiscalidad para Autónomos",
      provider: "Domestika",
      duration: "3 horas",
      level: "Intermedio",
      price: "€19.99",
      rating: 4.5,
      description: "Todo sobre impuestos, deducciones y optimización fiscal para autónomos."
    },
    {
      title: "Planificación de Jubilación",
      provider: "edX",
      duration: "6 semanas",
      level: "Intermedio",
      price: "Gratis",
      rating: 4.3,
      description: "Estrategias avanzadas para asegurar tu futuro financiero."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recursos y Herramientas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plantillas gratuitas, guías descargables, calculadoras avanzadas y recursos educativos para dominar tus finanzas.
          </p>
        </div>

        {/* Herramientas y Plantillas */}
        <div className="space-y-16">
          {tools.map((toolCategory, categoryIndex) => (
            <div key={categoryIndex} className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {toolCategory.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toolCategory.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.type === 'Excel' ? 'bg-green-100 text-green-800' :
                        item.type === 'PDF' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Tamaño: {item.size}</span>
                      <span className="text-sm text-gray-500">{item.downloads} descargas</span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {item.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                      {item.type === 'Web' ? 'Usar Calculadora' : 'Descargar Gratis'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Libros Recomendados */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Libros Recomendados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                    {book.title.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{book.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm text-gray-600">{book.rating}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">
                        {book.category}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{book.description}</p>
                <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition-colors font-semibold">
                  Ver en Amazon
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cursos Recomendados */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Cursos Online Recomendados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-3">{course.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.price === 'Gratis' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {course.price}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{course.provider}</span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>
                
                <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold">
                  Ver Curso
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Recursos Exclusivos</h3>
          <p className="text-xl mb-6 opacity-90">
            Suscríbete a nuestro newsletter y recibe recursos exclusivos, plantillas nuevas y consejos financieros directamente en tu email.
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
          <p className="text-sm mt-4 opacity-75">
            Sin spam. Cancela cuando quieras. Recibe contenido de valor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resources;

