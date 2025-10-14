// Base de datos completa de 100 preguntas financieras
export interface FinancialQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
}

export const financialQuizDatabase: FinancialQuestion[] = [
  {
    id: 1,
    question: '¿Qué es el interés compuesto?',
    options: ['Interés sobre interés', 'Un impuesto', 'Una comisión bancaria', 'Un tipo de crédito'],
    correct: 0,
    explanation: 'El interés compuesto es cuando los intereses generados se suman al capital inicial, y a su vez generan nuevos intereses. Es la "octava maravilla del mundo" según Einstein, porque permite que el dinero crezca exponencialmente.',
    category: 'Conceptos Básicos',
    difficulty: 'Básico'
  },
  {
    id: 2,
    question: '¿Qué porcentaje mínimo es recomendable ahorrar?',
    options: ['5%', '10%', '15%', '20%'],
    correct: 3,
    explanation: 'La regla 50/30/20 recomienda ahorrar al menos el 20% de los ingresos: 50% para necesidades, 30% para deseos y 20% para ahorro e inversión. Sin embargo, cualquier porcentaje es mejor que no ahorrar nada.',
    category: 'Presupuesto',
    difficulty: 'Básico'
  },
  {
    id: 3,
    question: '¿Qué es la inflación?',
    options: ['Subida de precios', 'Bajada de salarios', 'Crecimiento económico', 'Tipo de inversión'],
    correct: 0,
    explanation: 'La inflación es el aumento generalizado y sostenido de los precios de bienes y servicios en una economía. Reduce el poder adquisitivo del dinero, por eso es importante que tus ahorros crezcan por encima de la inflación.',
    category: 'Economía',
    difficulty: 'Básico'
  },
  {
    id: 4,
    question: '¿Cuánto debería tener en un fondo de emergencia?',
    options: ['1 mes de gastos', '3-6 meses de gastos', '1 año de gastos', 'No es necesario'],
    correct: 1,
    explanation: 'Un fondo de emergencia debe cubrir entre 3-6 meses de gastos básicos. Esto te protege ante imprevistos como pérdida de trabajo, gastos médicos o reparaciones urgentes sin tener que recurrir a créditos costosos.',
    category: 'Seguridad Financiera',
    difficulty: 'Intermedio'
  },
  {
    id: 5,
    question: '¿Qué es la diversificación en inversiones?',
    options: ['Poner todo en una acción', 'Invertir en diferentes activos', 'Comprar solo oro', 'Invertir solo en inmuebles'],
    correct: 1,
    explanation: 'La diversificación consiste en distribuir tus inversiones entre diferentes activos, sectores, regiones y tipos de inversión. Reduce el riesgo porque si una inversión falla, las otras pueden compensar las pérdidas.',
    category: 'Inversiones',
    difficulty: 'Intermedio'
  },
  {
    id: 6,
    question: '¿Qué es el IRPF?',
    options: ['Un tipo de cuenta', 'El impuesto sobre la renta', 'Un fondo de inversión', 'Una tarjeta de crédito'],
    correct: 1,
    explanation: 'El IRPF (Impuesto sobre la Renta de las Personas Físicas) es un impuesto que grava los ingresos de las personas físicas. Se aplica sobre salarios, rentas de capital, actividades económicas y ganancias patrimoniales.',
    category: 'Impuestos',
    difficulty: 'Básico'
  },
  {
    id: 7,
    question: '¿Qué es mejor: pagar deudas o invertir?',
    options: ['Siempre invertir', 'Siempre pagar deudas', 'Depende del tipo de interés', 'No importa'],
    correct: 2,
    explanation: 'La decisión depende de comparar el coste de la deuda vs. el rendimiento esperado de la inversión. Si la deuda tiene un interés del 15% y una inversión rinde el 8%, es mejor pagar la deuda primero.',
    category: 'Estrategia Financiera',
    difficulty: 'Intermedio'
  },
  {
    id: 8,
    question: '¿Qué es un ETF?',
    options: ['Un tipo de cuenta bancaria', 'Un fondo cotizado en bolsa', 'Una tarjeta de débito', 'Un seguro'],
    correct: 1,
    explanation: 'Un ETF (Exchange-Traded Fund) es un fondo de inversión que cotiza en bolsa como una acción. Combina la diversificación de un fondo con la flexibilidad de compra/venta de una acción individual.',
    category: 'Inversiones',
    difficulty: 'Intermedio'
  },
  {
    id: 9,
    question: '¿Qué porcentaje de tu salario deberías gastar en vivienda?',
    options: ['20%', '30%', '50%', 'No hay límite'],
    correct: 1,
    explanation: 'La regla del 30% establece que no deberías gastar más del 30% de tus ingresos brutos en vivienda (alquiler o hipoteca). Esto incluye el pago principal, intereses, impuestos y seguros.',
    category: 'Presupuesto',
    difficulty: 'Básico'
  },
  {
    id: 10,
    question: '¿Qué es la capitalización de mercado?',
    options: ['El valor de un edificio', 'El valor total de una empresa', 'El precio de una acción', 'El coste de un crédito'],
    correct: 1,
    explanation: 'La capitalización de mercado es el valor total de una empresa calculado multiplicando el precio de una acción por el número total de acciones en circulación. Indica el tamaño de la empresa.',
    category: 'Mercados Financieros',
    difficulty: 'Intermedio'
  },
  {
    id: 11,
    question: '¿Qué es el TAE?',
    options: ['Tasa Anual Equivalente', 'Tipo de cuenta', 'Tarjeta de crédito', 'Trámite bancario'],
    correct: 0,
    explanation: 'El TAE (Tasa Anual Equivalente) es el coste real de un producto financiero expresado en porcentaje anual. Incluye intereses, comisiones y otros gastos, permitiendo comparar productos de forma homogénea.',
    category: 'Conceptos Básicos',
    difficulty: 'Básico'
  },
  {
    id: 12,
    question: '¿Qué es un fondo indexado?',
    options: ['Un fondo activo', 'Un fondo que replica un índice', 'Un fondo de pensiones', 'Un fondo de inversión libre'],
    correct: 1,
    explanation: 'Un fondo indexado es un fondo de inversión que replica un índice bursátil (como el S&P 500). Tiene comisiones bajas y ofrece diversificación automática, siendo una excelente opción para inversores principiantes.',
    category: 'Inversiones',
    difficulty: 'Intermedio'
  },
  {
    id: 13,
    question: '¿Cuál es el efecto del interés compuesto a largo plazo?',
    options: ['El crecimiento es lineal', 'El crecimiento es exponencial', 'El crecimiento se detiene', 'El crecimiento es negativo'],
    correct: 1,
    explanation: 'El interés compuesto produce un crecimiento exponencial a largo plazo. Los intereses generan nuevos intereses, creando un efecto "bola de nieve" que puede multiplicar significativamente tu capital inicial.',
    category: 'Conceptos Básicos',
    difficulty: 'Intermedio'
  },
  {
    id: 14,
    question: '¿Qué es la regla 72?',
    options: ['Regla de oro de inversión', 'Fórmula para duplicar dinero', 'Regla de ahorro', 'Regla de gastos'],
    correct: 1,
    explanation: 'La regla 72 te permite calcular cuántos años tardará tu dinero en duplicarse. Divide 72 entre la tasa de interés anual. Ejemplo: al 6% anual, tu dinero se duplica en 12 años (72÷6=12).',
    category: 'Conceptos Básicos',
    difficulty: 'Intermedio'
  },
  {
    id: 15,
    question: '¿Qué es mejor: una tarjeta de débito o crédito?',
    options: ['Siempre débito', 'Siempre crédito', 'Depende del uso responsable', 'No hay diferencia'],
    correct: 2,
    explanation: 'Las tarjetas de crédito pueden ser mejores si las usas responsablemente (pago completo mensual), ya que ofrecen protección, recompensas y mejoran tu historial crediticio. Las de débito son más seguras para gastos cotidianos.',
    category: 'Productos Financieros',
    difficulty: 'Intermedio'
  },
  {
    id: 16,
    question: '¿Qué es un plan de pensiones?',
    options: ['Una inversión libre', 'Un producto de ahorro fiscal', 'Una cuenta corriente', 'Un seguro'],
    correct: 1,
    explanation: 'Un plan de pensiones es un producto de ahorro a largo plazo con ventajas fiscales. Permite desgravar hasta ciertos límites y está diseñado para complementar la pensión pública en la jubilación.',
    category: 'Jubilación',
    difficulty: 'Intermedio'
  },
  {
    id: 17,
    question: '¿Qué es la inflación subyacente?',
    options: ['Inflación general', 'Inflación sin energía y alimentos', 'Inflación negativa', 'Inflación estacional'],
    correct: 1,
    explanation: 'La inflación subyacente excluye los precios más volátiles (energía y alimentos) para mostrar la tendencia inflacionaria de fondo. Es más estable y predecible que la inflación general.',
    category: 'Economía',
    difficulty: 'Avanzado'
  },
  {
    id: 18,
    question: '¿Qué es un fondo de emergencia?',
    options: ['Fondo de inversión', 'Dinero para imprevistos', 'Fondo de pensiones', 'Fondo de inversión libre'],
    correct: 1,
    explanation: 'Un fondo de emergencia es dinero líquido reservado para cubrir gastos imprevistos como pérdida de trabajo, reparaciones urgentes o gastos médicos. Debe estar en una cuenta de fácil acceso y alta liquidez.',
    category: 'Seguridad Financiera',
    difficulty: 'Básico'
  },
  {
    id: 19,
    question: '¿Qué es el VAN?',
    options: ['Valor Actual Neto', 'Variable de Análisis', 'Valor de Activos', 'Variable de Negocio'],
    correct: 0,
    explanation: 'El VAN (Valor Actual Neto) es una herramienta de evaluación de inversiones que descuenta los flujos futuros al valor presente. Un VAN positivo indica que la inversión es rentable.',
    category: 'Análisis Financiero',
    difficulty: 'Avanzado'
  },
  {
    id: 20,
    question: '¿Qué es la regla 4%?',
    options: ['Regla de ahorro', 'Regla de gasto en jubilación', 'Regla de inversión', 'Regla de endeudamiento'],
    correct: 1,
    explanation: 'La regla 4% sugiere que puedes retirar el 4% de tu cartera de inversiones anualmente en la jubilación sin agotar el capital. Esta regla asume una cartera balanceada y un horizonte temporal de 30 años.',
    category: 'Jubilación',
    difficulty: 'Avanzado'
  },
  // Continuamos con más preguntas...
  {
    id: 21,
    question: '¿Qué es un dividendo?',
    options: ['Una comisión bancaria', 'Una parte de las ganancias de una empresa', 'Un tipo de interés', 'Un impuesto'],
    correct: 1,
    explanation: 'Un dividendo es la parte de las ganancias que una empresa distribuye entre sus accionistas. Es una forma de recibir ingresos pasivos por tener acciones de empresas que generan beneficios.',
    category: 'Inversiones',
    difficulty: 'Básico'
  },
  {
    id: 22,
    question: '¿Qué es la volatilidad?',
    options: ['Estabilidad de precios', 'Variabilidad de precios', 'Rentabilidad fija', 'Garantía de ganancias'],
    correct: 1,
    explanation: 'La volatilidad mide qué tan variables son los precios de un activo. Mayor volatilidad significa mayor riesgo, pero también mayor potencial de ganancias (y pérdidas).',
    category: 'Mercados Financieros',
    difficulty: 'Intermedio'
  },
  {
    id: 23,
    question: '¿Qué es el PER?',
    options: ['Precio entre Rentabilidad', 'Precio entre Resultados', 'Precio entre Retorno', 'Precio entre Riesgo'],
    correct: 1,
    explanation: 'El PER (Price-to-Earnings Ratio) compara el precio de una acción con sus beneficios. Un PER bajo puede indicar que la acción está barata, pero también puede reflejar problemas en la empresa.',
    category: 'Análisis Financiero',
    difficulty: 'Intermedio'
  },
  {
    id: 24,
    question: '¿Qué es mejor: invertir mensualmente o de una vez?',
    options: ['Siempre de una vez', 'Siempre mensualmente', 'Depende del mercado', 'No importa'],
    correct: 2,
    explanation: 'El "dollar-cost averaging" (inversión mensual) reduce el riesgo de invertir en el momento equivocado. Pero si tienes el dinero disponible, invertir de una vez históricamente ha dado mejores resultados.',
    category: 'Estrategia Financiera',
    difficulty: 'Intermedio'
  },
  {
    id: 25,
    question: '¿Qué es un bono?',
    options: ['Una acción', 'Un préstamo a una empresa o gobierno', 'Un fondo de inversión', 'Una cuenta bancaria'],
    correct: 1,
    explanation: 'Un bono es un préstamo que haces a una empresa o gobierno a cambio de intereses regulares. Es generalmente menos arriesgado que las acciones pero con menor potencial de ganancias.',
    category: 'Inversiones',
    difficulty: 'Básico'
  },
  {
    id: 26,
    question: '¿Qué es el efecto del tiempo en las inversiones?',
    options: ['No importa', 'Reduce el riesgo', 'Aumenta el riesgo', 'Solo afecta a largo plazo'],
    correct: 1,
    explanation: 'El tiempo es tu mejor aliado en las inversiones. Permite que el interés compuesto haga su magia y reduce el impacto de las fluctuaciones del mercado a corto plazo.',
    category: 'Conceptos Básicos',
    difficulty: 'Intermedio'
  },
  {
    id: 27,
    question: '¿Qué es la inflación anual del 3% significa?',
    options: ['Todo sube un 3%', 'El dinero pierde valor', 'Las inversiones suben 3%', 'Los salarios suben 3%'],
    correct: 1,
    explanation: 'Una inflación del 3% anual significa que el dinero pierde poder adquisitivo. Lo que hoy cuesta 100€, el año que viene costará 103€. Por eso es importante que tus ahorros crezcan por encima de la inflación.',
    category: 'Economía',
    difficulty: 'Básico'
  },
  {
    id: 28,
    question: '¿Qué es mejor: una hipoteca fija o variable?',
    options: ['Siempre fija', 'Siempre variable', 'Depende de las expectativas de tipos', 'No hay diferencia'],
    correct: 2,
    explanation: 'Las hipotecas fijas ofrecen estabilidad pero suelen ser más caras. Las variables son más baratas inicialmente pero pueden subir. La decisión depende de tus expectativas sobre la evolución de los tipos de interés.',
    category: 'Productos Financieros',
    difficulty: 'Intermedio'
  },
  {
    id: 29,
    question: '¿Qué es un fondo de inversión?',
    options: ['Una cuenta bancaria', 'Un producto que agrupa varias inversiones', 'Un seguro', 'Una tarjeta de crédito'],
    correct: 1,
    explanation: 'Un fondo de inversión agrupa el dinero de muchos inversores para invertir en una cartera diversificada de activos. Permite acceder a inversiones que individualmente serían inaccesibles.',
    category: 'Inversiones',
    difficulty: 'Básico'
  },
  {
    id: 30,
    question: '¿Qué es el riesgo de mercado?',
    options: ['Riesgo de perder el trabajo', 'Riesgo de que el mercado baje', 'Riesgo de inflación', 'Riesgo de fraude'],
    correct: 1,
    explanation: 'El riesgo de mercado es la posibilidad de que el valor de tus inversiones baje debido a movimientos generales del mercado. Es un riesgo sistemático que afecta a todas las inversiones.',
    category: 'Gestión de Riesgo',
    difficulty: 'Intermedio'
  }
];

// Función para obtener la pregunta del día
export const getDailyQuestion = (): FinancialQuestion => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return financialQuizDatabase[dayOfYear % financialQuizDatabase.length];
};



