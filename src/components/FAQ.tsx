function FAQ() {
  const faqs = [
    {
      category: "Calculadoras Financieras",
      questions: [
        {
          question: "¿Cómo funciona la calculadora de salario neto?",
          answer: "Nuestra calculadora de salario neto convierte tu sueldo bruto a neto aplicando todas las deducciones correspondientes: IRPF según tu tramo impositivo, cuotas de Seguridad Social (6.35% para contingencias comunes + 1.55% para desempleo + 0.1% para formación profesional), y otras deducciones como sindicatos o seguros privados. El resultado es el dinero que realmente recibirás en tu cuenta bancaria."
        },
        {
          question: "¿Por qué mi salario neto es menor de lo esperado?",
          answer: "El salario neto puede ser menor debido a varios factores: 1) IRPF progresivo - a mayor salario, mayor porcentaje de retención, 2) Pagas extra - se prorratean mensualmente, 3) Deducciones adicionales como sindicatos, seguros privados o anticipos, 4) Comunidad autónoma - algunas tienen tipos de IRPF diferentes. Nuestra calculadora incluye todos estos factores para darte el resultado más preciso."
        },
        {
          question: "¿Es exacto el cálculo de la calculadora de autónomos?",
          answer: "Sí, nuestra calculadora de autónomos utiliza los datos oficiales más actualizados: cuota de Seguridad Social 2025 (294€/mes base, más 294€ por cada tramo adicional), tramos de IRPF vigentes, bonificaciones por comunidades autónomas para autónomos nuevos, y todas las deducciones aplicables. Sin embargo, recomendamos consultar con un gestor para casos específicos complejos."
        },
        {
          question: "¿Cómo calcula la calculadora cuándo seré millonario?",
          answer: "La calculadora utiliza la fórmula del interés compuesto: Capital Final = Capital Inicial × (1 + tasa)^tiempo. Toma en cuenta tu ahorro mensual, tasa de rentabilidad esperada, capital inicial y ajustes por inflación. Es una estimación basada en promedios históricos del mercado, pero los resultados reales pueden variar según las condiciones del mercado."
        }
      ]
    },
    {
      category: "Control de Gastos",
      questions: [
        {
          question: "¿Cómo puedo empezar a controlar mis gastos?",
          answer: "Para empezar a controlar tus gastos: 1) Registra TODOS tus gastos durante una semana completa, 2) Categoriza cada gasto (alimentación, transporte, ocio, etc.), 3) Usa una app como la nuestra o una hoja de cálculo, 4) Establece presupuestos por categoría, 5) Revisa semanalmente y ajusta. La clave es la constancia y ser honesto contigo mismo."
        },
        {
          question: "¿Qué categorías de gastos debo usar?",
          answer: "Recomendamos estas categorías principales: Necesidades (vivienda, alimentación, transporte, servicios), Deseos (ocio, ropa, entretenimiento), Ahorro e inversión, Deudas. Puedes subcategorizar según tus necesidades: alimentación en casa vs. fuera, transporte público vs. privado, etc. Lo importante es que sea útil para ti y te permita identificar patrones."
        },
        {
          question: "¿Cuánto tiempo necesito para ver patrones en mis gastos?",
          answer: "Para ver patrones claros necesitas al menos 2-3 meses de datos. Sin embargo, en 2-3 semanas ya puedes identificar gastos problemáticos. Los patrones estacionales (vacaciones, navidades) requieren un año completo de datos. Lo importante es empezar ya y ser consistente en el registro."
        },
        {
          question: "¿Cómo puedo reducir mis gastos sin sacrificar calidad de vida?",
          answer: "Estrategias efectivas: 1) Regla 24h - espera un día antes de compras no esenciales, 2) Compara precios y usa cupones, 3) Cancela suscripciones que no uses, 4) Cocina más en casa, 5) Usa transporte público o comparte vehículo, 6) Negocia facturas (seguros, internet, móvil), 7) Compra de segunda mano cuando sea posible. El objetivo es optimizar, no privarse."
        }
      ]
    },
    {
      category: "Ahorro e Inversión",
      questions: [
        {
          question: "¿Cuánto debo ahorrar cada mes?",
          answer: "La regla general es ahorrar entre el 10-20% de tus ingresos netos. Si eres principiante, empieza con el 10% y ve aumentando gradualmente. Prioriza: 1) Fondo de emergencia (3-6 meses de gastos), 2) Objetivos a corto plazo (vacaciones, coche), 3) Jubilación. Si tienes deudas con intereses altos, págales primero antes de ahorrar."
        },
        {
          question: "¿Dónde debo guardar mi dinero ahorrado?",
          answer: "Depende del objetivo: Fondo de emergencia - cuenta remunerada con acceso inmediato, Objetivos 1-3 años - depósitos a plazo o cuentas remuneradas, Objetivos 5+ años - fondos indexados o ETFs, Jubilación - planes de pensiones o SIALP. La clave es diversificar según el plazo y la necesidad de liquidez."
        },
        {
          question: "¿Cuándo debo empezar a invertir?",
          answer: "Puedes empezar a invertir cuando: 1) Tengas un fondo de emergencia de 3-6 meses, 2) No tengas deudas con intereses altos (>5%), 3) Puedas permitirte perder el dinero invertido, 4) Tengas un horizonte de inversión de al menos 5 años. Empieza con pequeñas cantidades para aprender sin riesgo."
        },
        {
          question: "¿Qué es el interés compuesto y por qué es importante?",
          answer: "El interés compuesto es 'el interés sobre el interés'. Tus ganancias se reinvierten y generan más ganancias. Ejemplo: 1.000€ al 7% anual = 1.070€ el primer año, pero 1.145€ el segundo (7% sobre 1.070€). Es la fuerza más poderosa para crear riqueza a largo plazo. Por eso empezar joven, aunque sea con poco, marca una diferencia enorme."
        }
      ]
    },
    {
      category: "Gestión de Deudas",
      questions: [
        {
          question: "¿Qué debo pagar primero: ahorro o deudas?",
          answer: "Prioriza según el tipo de deuda: 1) Deudas con intereses altos (>7%) - págales primero, 2) Fondo de emergencia mínimo (1 mes de gastos) - hazlo simultáneamente, 3) Deudas con intereses bajos (<5%) - puedes ahorrar e invertir mientras pagas. La regla: si el interés de la deuda es mayor que la rentabilidad esperada de inversión, paga la deuda primero."
        },
        {
          question: "¿Cuál es la diferencia entre método bola de nieve y avalancha?",
          answer: "Método bola de nieve: pagas primero la deuda más pequeña para ganar motivación. Método avalancha: pagas primero la deuda con mayor interés para ahorrar dinero. Bola de nieve es mejor para motivación, avalancha para ahorro. Elige según tu personalidad y disciplina."
        },
        {
          question: "¿Puedo negociar mis deudas con los bancos?",
          answer: "Sí, es posible negociar: 1) Refinanciación - cambiar condiciones del préstamo, 2) Consolidación - unir varias deudas en una, 3) Quita - reducción del capital adeudado (solo en casos extremos), 4) Pausa de pagos temporal. La clave es contactar al banco ANTES de entrar en impago y mostrar buena fe en el pago."
        },
        {
          question: "¿Cómo afectan las deudas a mi capacidad de ahorro?",
          answer: "Las deudas reducen tu capacidad de ahorro de dos formas: 1) Dinero que no puedes ahorrar - cada euro de deuda es un euro menos para ahorrar, 2) Coste de oportunidad - el interés que pagas es dinero que no puedes invertir. Pagar deudas es una inversión con rentabilidad garantizada igual al interés que dejas de pagar."
        }
      ]
    },
    {
      category: "Fiscalidad y Autónomos",
      questions: [
        {
          question: "¿Qué gastos puedo deducir como autónomo?",
          answer: "Puedes deducir gastos necesarios para tu actividad: material y suministros, servicios profesionales (contabilidad, abogados), alquiler de local, gastos de vehículo (proporcional al uso profesional), formación relacionada, telecomunicaciones (proporcional), seguros de actividad, amortizaciones de equipos. Mantén todas las facturas y separa gastos personales de profesionales."
        },
        {
          question: "¿Cuándo debo hacer los pagos trimestrales del IRPF?",
          answer: "Los pagos trimestrales se realizan: 1er trimestre (enero-marzo) - hasta 20 de abril, 2º trimestre (abril-junio) - hasta 20 de julio, 3er trimestre (julio-septiembre) - hasta 20 de octubre, 4º trimestre (octubre-diciembre) - hasta 30 de enero. Puedes pagar el 20% de los ingresos o calcular según gastos reales (estimación directa)."
        },
        {
          question: "¿Me conviene ser autónomo o crear una sociedad?",
          answer: "Depende de varios factores: Autónomo es mejor si: ingresos < 60.000€, trabajo individual, pocos gastos deducibles. Sociedad es mejor si: ingresos > 60.000€, varios socios, muchos gastos deducibles, quieres limitar responsabilidad. Consulta con un asesor fiscal para tu caso específico, ya que la decisión tiene implicaciones a largo plazo."
        },
        {
          question: "¿Qué es la cuota cero para autónomos nuevos?",
          answer: "La cuota cero es una bonificación que permite a autónomos nuevos (primeros 12 meses) pagar 0€ de cuota de Seguridad Social. Está disponible en todas las comunidades autónomas, aunque con diferencias en duración y condiciones. Algunas comunidades la extienden hasta 24 meses. Es una excelente oportunidad para empezar con menores costes."
        }
      ]
    },
    {
      category: "Planes y Objetivos",
      questions: [
        {
          question: "¿Cómo establezco objetivos financieros realistas?",
          answer: "Usa el método SMART: Específico (cuánto exactamente), Medible (puedes hacer seguimiento), Alcanzable (realista con tu situación), Relevante (importante para ti), Tiempo definido (fecha límite). Ejemplo: 'Ahorrar 6.000€ para fondo de emergencia en 18 meses' (333€/mes). Empieza con objetivos pequeños para crear hábitos."
        },
        {
          question: "¿Cuánto dinero necesito para la jubilación?",
          answer: "La regla general es necesitar entre el 70-80% de tu salario actual para mantener tu nivel de vida. Si gastas 2.000€/mes, necesitarás 1.400-1.600€/mes en jubilación. Multiplica por 12 y luego por 25 (regla del 4% de retiro). Ejemplo: 1.500€ × 12 × 25 = 450.000€. Usa nuestras calculadoras para tu situación específica."
        },
        {
          question: "¿Cómo priorizo mis objetivos financieros?",
          answer: "Orden de prioridad típico: 1) Fondo de emergencia (3-6 meses de gastos), 2) Eliminar deudas con intereses altos, 3) Ahorro para objetivos a corto plazo (1-3 años), 4) Inversión para jubilación, 5) Otros objetivos (casa, coche, etc.). Ajusta según tu situación personal, pero el fondo de emergencia siempre debe ser prioridad."
        },
        {
          question: "¿Qué hago si no puedo cumplir mis objetivos financieros?",
          answer: "Es normal ajustar objetivos: 1) Revisa si son realistas - quizás necesitas más tiempo, 2) Busca formas de aumentar ingresos - freelance, venta de objetos, 3) Reduce gastos - revisa presupuesto mensualmente, 4) Divide objetivos grandes en sub-objetivos más pequeños, 5) Celebra progresos parciales. Lo importante es mantener la dirección, no la velocidad exacta."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Respuestas a las dudas más comunes sobre finanzas personales, calculadoras y herramientas.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {category.category}
              </h2>
              
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sección de contacto para más preguntas */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">¿No encuentras la respuesta que buscas?</h3>
          <p className="text-lg mb-6 opacity-90">
            Nuestro equipo de expertos está aquí para ayudarte con cualquier duda específica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:lipastudios4@gmail.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              📧 Enviar Email
            </a>
            <a 
              href="/contacto"
              className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
            >
              📞 Más Formas de Contacto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;

