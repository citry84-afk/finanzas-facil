import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Star, Trophy, CheckCircle2, Flame, Target, Zap, Crown, Gift, User, LogOut, Brain } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth, useUserData } from '../hooks/useAuth';
import { useSwipe } from '../hooks/useSwipe';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface ExpenseControlAppProps {
  onBack: () => void;
}

interface OnboardingData {
  monthlyIncome: number;
  fixedExpenses: {
    rent: number;
    utilities: number;
    internet: number;
    transport: number;
    subscriptions: number;
    food: number;
    entertainment: number;
    health: number;
    clothing: number;
    other: number;
  };
  savingsGoal: number;
  age: number;
  location: string;
}

interface ExpenseItem {
  id: string;
  amount: number;
  category: string;
  date: string; // ISO YYYY-MM-DD
}

interface IncomeItem {
  id: string;
  amount: number;
  source: string;
  date: string; // ISO YYYY-MM-DD
}

const defaultData: OnboardingData = {
  monthlyIncome: 1500,
  fixedExpenses: { 
    rent: 500, 
    utilities: 80, 
    internet: 40,
    transport: 60, 
    subscriptions: 25,
    food: 300,
    entertainment: 150,
    health: 50,
    clothing: 100,
    other: 100
  },
  savingsGoal: 200,
  age: 30,
  location: 'madrid',
};

const onboardingSteps = [
  {
    title: '¡Bienvenido!',
    description: 'Te voy a guiar paso a paso para configurar tu perfil financiero. IMPORTANTE: Todos los valores son aproximados y podrás modificarlos después desde el dashboard.',
    icon: '🎯',
    field: null
  },
  {
    title: '¿Cuánto ingresas al mes?',
    description: 'Ingresos netos mensuales (después de impuestos) - Valor aproximado',
    icon: '💰',
    field: 'monthlyIncome'
  },
  {
    title: '¿Cuánto pagas de vivienda?',
    description: 'Alquiler o hipoteca mensual - Valor aproximado',
    icon: '🏠',
    field: 'rent'
  },
  {
    title: '¿Cuánto pagas de luz y agua?',
    description: 'Facturas de electricidad y agua (aproximado)',
    icon: '⚡',
    field: 'utilities'
  },
  {
    title: '¿Cuánto pagas de internet y móvil?',
    description: 'Tarifas de internet y teléfono - Valor aproximado',
    icon: '📶',
    field: 'internet'
  },
  {
    title: '¿Cuánto pagas de suscripciones?',
    description: 'Netflix, Spotify, gym, seguros... - Valor aproximado',
    icon: '📱',
    field: 'subscriptions'
  },
  {
    title: '¿Cuánto gastas en alimentación?',
    description: 'Supermercado, restaurantes, comida... - Valor aproximado',
    icon: '🛒',
    field: 'food'
  },
  {
    title: '¿Cuánto gastas en transporte?',
    description: 'Gasolina, transporte público, taxi... - Valor aproximado',
    icon: '🚗',
    field: 'transport'
  },
  {
    title: '¿Cuánto gastas en ocio?',
    description: 'Entretenimiento, salidas, hobbies... - Valor aproximado',
    icon: '🎬',
    field: 'entertainment'
  },
  {
    title: '¿Cuánto gastas en salud?',
    description: 'Farmacia, médicos, seguros médicos... - Valor aproximado',
    icon: '🏥',
    field: 'health'
  },
  {
    title: '¿Cuánto gastas en ropa?',
    description: 'Ropa, calzado, accesorios... - Valor aproximado',
    icon: '👕',
    field: 'clothing'
  },
  {
    title: '¿Cuánto gastas en otros?',
    description: 'Gastos varios, imprevistos... - Valor aproximado',
    icon: '📦',
    field: 'other'
  },
  {
    title: '¿Cuántos años tienes?',
    description: 'Para comparar con personas de tu edad',
    icon: '🎂',
    field: 'age'
  },
  {
    title: '¿Dónde vives?',
    description: 'Para comparar con tu región',
    icon: '📍',
    field: 'location'
  },
  {
    title: '¡Listo!',
    description: 'Ya tienes tu perfil financiero configurado. Puedes modificarlo cuando quieras.',
    icon: '🎉',
    field: null
  }
];

const baseCategories = [
  'Vivienda',
  'Comida',
  'Transporte',
  'Salud',
  'Ocio',
  'Suscripciones',
  'Educación',
  'Impuestos',
  'Otros',
];


// Datos regionales realistas para comparativas (datos INE 2023)
const regionalData = {
  madrid: {
    avgIncome: 1950,
    avgExpenses: {
      rent: 850,
      utilities: 100,
      internet: 50,
      food: 280,
      transport: 120,
      subscriptions: 45,
      entertainment: 120,
      health: 60,
      clothing: 80,
      other: 95
    }
  },
  barcelona: {
    avgIncome: 1850,
    avgExpenses: {
      rent: 750,
      utilities: 95,
      internet: 45,
      food: 260,
      transport: 110,
      subscriptions: 42,
      entertainment: 110,
      health: 55,
      clothing: 75,
      other: 90
    }
  },
  valencia: {
    avgIncome: 1650,
    avgExpenses: {
      rent: 550,
      utilities: 80,
      internet: 40,
      food: 240,
      transport: 90,
      subscriptions: 35,
      entertainment: 90,
      health: 50,
      clothing: 60,
      other: 75
    }
  },
  sevilla: {
    avgIncome: 1550,
    avgExpenses: {
      rent: 450,
      utilities: 70,
      internet: 35,
      food: 220,
      transport: 80,
      subscriptions: 30,
      entertainment: 80,
      health: 45,
      clothing: 55,
      other: 70
    }
  },
  bilbao: {
    avgIncome: 1750,
    avgExpenses: {
      rent: 600,
      utilities: 85,
      internet: 42,
      food: 250,
      transport: 95,
      subscriptions: 38,
      entertainment: 100,
      health: 52,
      clothing: 65,
      other: 85
    }
  },
  other: {
    avgIncome: 1600,
    avgExpenses: {
      rent: 500,
      utilities: 75,
      internet: 38,
      food: 230,
      transport: 85,
      subscriptions: 32,
      entertainment: 85,
      health: 48,
      clothing: 58,
      other: 78
    }
  }
};

const tips: string[] = [
  'Aplica la regla 50/30/20: 50% necesidades, 30% deseos, 20% ahorro',
  'Automatiza tu ahorro el día que cobras',
  'Cancela suscripciones que no uses',
  'Compra con lista y evita compras impulsivas',
  'Compara seguros y tarifas cada año',
  'Diversifica tus ingresos: no dependas de una sola fuente',
  'Invierte en tu educación financiera cada mes',
  'Revisa tus gastos mensualmente y ajusta',
  'Usa apps para comparar precios antes de comprar',
  'Negocia tus facturas: internet, móvil, seguros',
  'Crea un fondo de emergencia de 3-6 meses de gastos',
];

// const motivationalMessages = [
//   '¡Sigue así! Cada día que aprendes sobre finanzas te acerca más a la libertad financiera 🚀',
//   'Tu futuro yo te lo agradecerá. La educación financiera es la mejor inversión 💎',
//   '¡Increíble! Estás construyendo hábitos que cambiarán tu vida para siempre ⭐',
//   'Cada pregunta correcta es un paso más hacia tu independencia financiera 💪',
//   '¡Eres un campeón! La constancia en el aprendizaje es la clave del éxito 🏆',
//   'Tu dedicación a aprender sobre dinero te convertirá en un experto financiero 🎯',
//   '¡Fantástico! Estás desarrollando la mentalidad de los ricos 💰',
//   'Cada día que estudias finanzas, tu patrimonio futuro crece exponencialmente 📈',
//   '¡Sigue aprendiendo! El conocimiento financiero es tu mejor activo 🧠',
//   'Tu disciplina hoy se traducirá en libertad mañana 🌟'
// ];

import { getDailyQuestion, type FinancialQuestion } from '../data/financialQuiz';
import DailyQuizNotification from './DailyQuizNotification';
import DonationModal from './DonationModal';

const STORAGE_KEY_EXPENSES = 'ff_expenses_v1';
const STORAGE_KEY_CATEGORIES = 'ff_categories_v1';
const STORAGE_KEY_STREAK = 'ff_streak_v1';

const ExpenseControlApp = ({ onBack }: ExpenseControlAppProps) => {
  const [step, setStep] = useState<number>(() => {
    // Inicialmente siempre mostrar onboarding hasta que se verifique Firebase
    return 0;
  });

  // Configurar navegación por swipe
  const swipeRef = useSwipe({
    threshold: 120,
    velocity: 0.2,
    safeZone: { top: 160, bottom: 100, left: 50, right: 50 },
    onSwipeRight: () => {
      // Swipe derecha = volver al landing (siempre disponible)
      onBack();
    },
    onSwipeUp: () => {
      // Swipe arriba = siguiente paso SOLO durante onboarding
      if (user && step < onboardingSteps.length) {
        setStep(step + 1);
      }
    },
    onSwipeDown: () => {
      // Swipe abajo = paso anterior SOLO durante onboarding
      if (user && step < onboardingSteps.length && step > 0) {
        setStep(step - 1);
      }
    }
  });
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem('ff_onboarding_v1');
    return saved ? JSON.parse(saved) : defaultData;
  });
  const [points, setPoints] = useState<number>(0);
  // Estados del quiz diario
  const [dailyQuestion] = useState<FinancialQuestion>(getDailyQuestion());
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizStreak, setQuizStreak] = useState(0);
  const [showQuizExplanation, setShowQuizExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizNotification, setShowQuizNotification] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  // Auth
  const { user, logout } = useAuth();
  const { userData, saveUserData, loading: dataLoading } = useUserData(user);
  
  // Mostrar modal de auth automáticamente si no hay usuario - DESACTIVADO para AdSense
  // const [showAuthModal, setShowAuthModal] = useState<boolean>(!user);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false); // Siempre oculto

  // Actualizar estado del modal cuando cambie el usuario - DESACTIVADO
  useEffect(() => {
    // setShowAuthModal(!user); // DESACTIVADO: Todo el contenido debe ser público para AdSense
    
    // Si el usuario se autentica
    if (user) {
      // Verificar si tiene datos en localStorage O en Firebase
      const hasLocalData = localStorage.getItem('ff_onboarding_v1') || localStorage.getItem('ff_expenses_v1');
      const hasFirebaseData = userData && (userData.onboarding || userData.expenses);
      
      // Si NO tiene datos en ningún lado, iniciar onboarding
      if (!hasLocalData && !hasFirebaseData) {
        setStep(0);
      } else {
        // Si tiene datos, ir directo al dashboard
        setStep(onboardingSteps.length);
      }
    }
  }, [user, userData]);

  // Expenses
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    return saved ? JSON.parse(saved) : baseCategories;
  });
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_EXPENSES);
    return saved ? JSON.parse(saved) : [];
  });

  // Income
  const [incomes, setIncomes] = useState<IncomeItem[]>(() => {
    const saved = localStorage.getItem('ff_incomes_v1');
    return saved ? JSON.parse(saved) : [];
  });

  // Streak
  const [streak, setStreak] = useState<number>(() => Number(localStorage.getItem(STORAGE_KEY_STREAK) || '0'));
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showIncomeDetails, setShowIncomeDetails] = useState<boolean>(false);
  const [showExpenseDetails, setShowExpenseDetails] = useState<boolean>(false);
  
  // Estados para modales de edición
  const [editingIncomeItem, setEditingIncomeItem] = useState<string | null>(null);
  const [editingExpenseItem, setEditingExpenseItem] = useState<string | null>(null);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);
  
  // Estados para formularios
  const [newIncomeForm, setNewIncomeForm] = useState({
    source: '',
    amount: '',
    isNewCategory: false
  });
  const [newExpenseForm, setNewExpenseForm] = useState({
    category: '',
    amount: '',
    isNewCategory: false
  });

  // Sincronización con Firebase
  useEffect(() => {
    if (user && userData) {
      // Cargar datos del usuario desde Firebase
      setExpenses(userData.expenses || []);
      setCategories(userData.categories || baseCategories);
      setPoints(userData.points || 0);
      setStreak(userData.streak || 0);
      setData(userData.onboardingData || defaultData);
    } else {
      // Usar localStorage como fallback
      localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
      localStorage.setItem(STORAGE_KEY_STREAK, String(streak));
    }
  }, [user, userData]);

  // Guardar en Firebase cuando cambien los datos
  useEffect(() => {
    if (user && !dataLoading) {
      saveUserData({
        expenses,
        categories,
        points,
        streak,
        onboardingData: data,
        lastUpdated: new Date().toISOString(),
      });
    }
  }, [expenses, categories, points, streak, data, user, saveUserData, dataLoading]);

  const fixedTotal = useMemo(() => {
    const f = data.fixedExpenses;
    return f.rent + f.utilities + f.transport + f.subscriptions + f.food + f.entertainment + f.health + f.clothing + f.other;
  }, [data]);

  // Totales reales considerando ingresos adicionales y gastos variables
  const extraIncomeTotal = useMemo(() => {
    return incomes.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  }, [incomes]);

  const variableExpensesTotal = useMemo(() => {
    return expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  }, [expenses]);

  const totalIncome = useMemo(() => {
    return (Number(data.monthlyIncome) || 0) + extraIncomeTotal;
  }, [data.monthlyIncome, extraIncomeTotal]);

  const totalExpenses = useMemo(() => {
    return fixedTotal + variableExpensesTotal;
  }, [fixedTotal, variableExpensesTotal]);

  const monthlyLeft = useMemo(() => {
    return Math.max(0, totalIncome - totalExpenses);
  }, [totalIncome, totalExpenses]);

  // const savingsCapacity = useMemo(() => {
  //   return Math.min(monthlyLeft, data.savingsGoal);
  // }, [monthlyLeft, data.savingsGoal]);

  const progress = useMemo(() => {
    const stepsCount = onboardingSteps.length;
    return Math.round(((step + 1) / stepsCount) * 100);
  }, [step]);

  // Frases motivadoras diarias
  const motivationalQuotes = [
    "💪 Cada euro ahorrado te acerca a la libertad financiera",
    "🚀 La disciplina financiera es la base del éxito",
    "⭐ Tu futuro financiero se construye hoy",
    "🎯 Cada decisión financiera cuenta para tu futuro",
    "💎 La inversión en ti mismo es la mejor inversión",
    "🔥 La constancia en el ahorro es la clave del éxito",
    "🌟 Tu mentalidad de abundancia atrae oportunidades",
    "💡 El conocimiento financiero es tu mejor activo",
    "🎉 Cada meta financiera alcanzada es una victoria",
    "🌈 La independencia financiera te da libertad total",
    "⚡ Tu actitud hacia el dinero determina tu futuro",
    "🏆 Los ricos piensan diferente sobre el dinero",
    "💫 Cada día es una oportunidad para mejorar tus finanzas",
    "🎪 La diversificación reduce el riesgo financiero",
    "🚁 El interés compuesto es la octava maravilla del mundo",
    "🎭 La paciencia es la virtud del inversor exitoso",
    "🎨 La creatividad financiera genera múltiples fuentes de ingreso",
    "🎸 La educación financiera es la mejor herencia",
    "🎬 Tu historia financiera se escribe con cada decisión",
    "🎪 La abundancia financiera está al alcance de todos",
    "🎨 La planificación financiera es arte y ciencia",
    "🎭 La mentalidad de escasez limita tus posibilidades",
    "🎸 Cada gasto es una decisión sobre tu futuro",
    "🎬 La libertad financiera no es un destino, es un viaje",
    "🎪 Los hábitos financieros saludables cambian vidas",
    "🎨 La inversión en activos te hace más rico cada día",
    "🎭 La gratitud financiera atrae más abundancia",
    "🎸 Tu red de valor financiero determina tu patrimonio",
    "🎬 La consistencia en el ahorro supera la inteligencia",
    "🎪 La educación financiera es la mejor inversión de tu vida"
  ];

  const currentMotivationalQuote = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return motivationalQuotes[dayOfYear % motivationalQuotes.length];
  }, []);

  // const achievements = useMemo(() => {
  //   return [
  //     { id: 'ingresos', label: 'Ingresos definidos', done: data.monthlyIncome > 0 },
  //     { id: 'fijos', label: 'Gastos fijos registrados', done: fixedTotal > 0 },
  //     { id: 'ahorro', label: 'Objetivo de ahorro fijado', done: data.savingsGoal > 0 },
  //     { id: 'capacidad', label: 'Capacidad de ahorro positiva', done: savingsCapacity > 0 },
  //   ];
  // }, [data, fixedTotal, savingsCapacity]);

  const handleBack = () => (step === 0 ? onBack() : setStep((s) => Math.max(0, s - 1)));

  // Funciones para editar ingresos
  const editIncomeItem = (itemId: string) => {
    setEditingIncomeItem(itemId);
  };

  const updateIncomeItem = (itemId: string, newAmount: number) => {
    setIncomes(prev => prev.map(item => 
      item.id === itemId ? { ...item, amount: newAmount } : item
    ));
    setEditingIncomeItem(null);
  };

  const deleteIncomeItem = (itemId: string) => {
    setIncomes(prev => prev.filter(item => item.id !== itemId));
  };

  const addNewIncome = () => {
    if (newIncomeForm.source && newIncomeForm.amount) {
      const newIncome: IncomeItem = {
        id: `${Date.now()}`,
        source: newIncomeForm.source,
        amount: parseFloat(newIncomeForm.amount),
        date: new Date().toISOString().split('T')[0]
      };
      setIncomes(prev => [...prev, newIncome]);
      setNewIncomeForm({ source: '', amount: '', isNewCategory: false });
      setShowAddIncomeModal(false);
    }
  };

  // Funciones para editar gastos
  const editExpenseItem = (itemId: string) => {
    setEditingExpenseItem(itemId);
  };

  const updateExpenseItem = (itemId: string, newAmount: number) => {
    setExpenses(prev => prev.map(item => 
      item.id === itemId ? { ...item, amount: newAmount } : item
    ));
    setEditingExpenseItem(null);
  };

  const deleteExpenseItem = (itemId: string) => {
    setExpenses(prev => prev.filter(item => item.id !== itemId));
  };

  const addNewExpense = () => {
    if (newExpenseForm.category && newExpenseForm.amount) {
      const newExpense: ExpenseItem = {
        id: `${Date.now()}`,
        category: newExpenseForm.category,
        amount: parseFloat(newExpenseForm.amount),
        date: new Date().toISOString().split('T')[0]
      };
      setExpenses(prev => [...prev, newExpense]);
      setNewExpenseForm({ category: '', amount: '', isNewCategory: false });
      setShowAddExpenseModal(false);
    }
  };

  // Manejo del quiz diario
  const handleDailyQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setQuizAnswered(true);
    
    if (answerIndex === dailyQuestion.correct) {
      // Respuesta correcta
      setPoints((p) => p + 100);
      setQuizStreak((s) => s + 1);
      
      // Guardar en localStorage que ya respondió hoy
      const today = new Date().toDateString();
      localStorage.setItem('ff_quiz_completed_' + today, 'true');
      
      // Mostrar confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      // Respuesta incorrecta - resetear racha
      setQuizStreak(0);
    }
    
    // Mostrar explicación después de 1 segundo
    setTimeout(() => {
      setShowQuizExplanation(true);
    }, 1000);
  };

  // Verificar si ya respondió hoy
  const hasAnsweredToday = () => {
    const today = new Date().toDateString();
    return localStorage.getItem('ff_quiz_completed_' + today) === 'true';
  };

  // Mostrar notificación del quiz diario
  useEffect(() => {
    if (user && !hasAnsweredToday()) {
      const hasSeenNotification = localStorage.getItem('ff_quiz_notification_seen_' + new Date().toDateString());
      if (!hasSeenNotification) {
        setTimeout(() => {
          setShowQuizNotification(true);
        }, 3000); // Mostrar después de 3 segundos
      }
    }
  }, [user]);

  const handleQuizNotificationClose = () => {
    setShowQuizNotification(false);
    localStorage.setItem('ff_quiz_notification_seen_' + new Date().toDateString(), 'true');
  };




  // Charts
  // const totalsByCategory = useMemo(() => {
  //   const map = new Map<string, number>();
  //   for (const e of expenses) {
  //     map.set(e.category, (map.get(e.category) || 0) + e.amount);
  //   }
  //   return Array.from(map.entries());
  // }, [expenses]);

  // const totalsByIncomeSource = useMemo(() => {
  //   const map = new Map<string, number>();
  //   for (const i of incomes) {
  //     map.set(i.source, (map.get(i.source) || 0) + i.amount);
  //   }
  //   return Array.from(map.entries());
  // }, [incomes]);

  // const monthlyData = useMemo(() => {
  //   const months = Array(12).fill({ income: 0, expenses: 0 });
    
  //   // Agregar gastos registrados
  //   for (const e of expenses) {
  //     const m = new Date(e.date).getMonth();
  //     months[m] = { ...months[m], expenses: months[m].expenses + e.amount };
  //   }
    
  //   // Agregar ingresos registrados
  //   for (const i of incomes) {
  //     const m = new Date(i.date).getMonth();
  //     months[m] = { ...months[m], income: months[m].income + i.amount };
  //   }
    
  //   // Si no hay datos registrados, mostrar datos del perfil inicial
  //   const hasData = expenses.length > 0 || incomes.length > 0;
  //   if (!hasData) {
  //     // Mostrar datos del perfil para el mes actual
  //     const currentMonth = new Date().getMonth();
  //     months[currentMonth] = { 
  //       income: data.monthlyIncome, 
  //       expenses: fixedTotal 
  //     };
  //   }
    
  //   return months;
  // }, [expenses, incomes, data.monthlyIncome, fixedTotal]);

  // Datos para gráfico desglosado
  const chartData = useMemo(() => {
    // Filtrar solo elementos con valor > 0
    const incomeSources = [
      { label: 'Salario Base', value: data.monthlyIncome, color: '#10b981' }, // Verde esmeralda
      ...incomes.filter(income => income.amount > 0).map((income, index) => ({
        label: income.source,
        value: income.amount,
        color: `hsl(${120 + index * 40}, 60%, 45%)` // Verdes dinámicos para ingresos extra
      }))
    ].filter(item => item.value > 0);

    const expenseCategories = [
      { label: 'Vivienda', value: data.fixedExpenses.rent, color: '#ef4444' }, // Rojo vivo
      { label: 'Servicios', value: data.fixedExpenses.utilities, color: '#f97316' }, // Naranja
      { label: 'Transporte', value: data.fixedExpenses.transport, color: '#eab308' }, // Amarillo
      { label: 'Suscripciones', value: data.fixedExpenses.subscriptions, color: '#22c55e' }, // Verde
      { label: 'Alimentación', value: data.fixedExpenses.food, color: '#3b82f6' }, // Azul
      { label: 'Ocio', value: data.fixedExpenses.entertainment, color: '#8b5cf6' }, // Púrpura
      { label: 'Salud', value: data.fixedExpenses.health, color: '#ec4899' }, // Rosa
      { label: 'Ropa', value: data.fixedExpenses.clothing, color: '#06b6d4' }, // Cian
      { label: 'Otros', value: data.fixedExpenses.other, color: '#84cc16' }, // Lima
      ...expenses.filter(expense => expense.amount > 0).map((expense, index) => ({
        label: expense.category,
        value: expense.amount,
        color: `hsl(${280 + index * 30}, 70%, 50%)` // Colores dinámicos para gastos extra
      }))
    ].filter(item => item.value > 0);

    return { incomeSources, expenseCategories };
  }, [data, incomes, expenses]);

  // Estabilizar mensajes y datos para evitar re-renderizados
  const currentTip = useMemo(() => {
    return tips[Math.floor(points / 10) % tips.length];
  }, [points]);

  const regionalComparison = useMemo(() => {
    const region = regionalData[data.location as keyof typeof regionalData] || regionalData.other;
    const userTotalExpenses = fixedTotal;
    const regionalTotalExpenses = Object.values(region.avgExpenses).reduce((a, b) => a + b, 0);
    
    return {
      income: {
        user: data.monthlyIncome,
        regional: region.avgIncome,
        difference: data.monthlyIncome - region.avgIncome,
        percentage: ((data.monthlyIncome - region.avgIncome) / region.avgIncome) * 100
      },
      expenses: {
        user: userTotalExpenses,
        regional: regionalTotalExpenses,
        difference: userTotalExpenses - regionalTotalExpenses,
        percentage: ((userTotalExpenses - regionalTotalExpenses) / regionalTotalExpenses) * 100
      },
      categoryComparison: Object.entries(region.avgExpenses).map(([key, value]) => ({
        category: key,
        user: (data.fixedExpenses as any)[key] || 0,
        regional: value,
        difference: ((data.fixedExpenses as any)[key] || 0) - value
      }))
    };
  }, [data, fixedTotal]);

  // Mobile-first container
  return (
    <div 
      ref={swipeRef}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-bounce">🎉</div>
            <div className="text-4xl animate-ping absolute -top-4 -right-4">✨</div>
            <div className="text-4xl animate-ping absolute -bottom-4 -left-4">⭐</div>
          </div>
        </div>
      )}


      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative">
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={handleBack}
            className="cursor-pointer flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-105"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="text-sm">Volver</span>
          </button>
        </div>
        
        <div className="absolute top-4 right-4 z-10">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <User className="w-3 h-3" />
                <span className="text-xs">{user.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={() => setShowDonation(true)}
                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30 text-white hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 shadow-lg hover:scale-105"
                aria-label="Donar a través de PayPal"
              >
                <span className="text-xs">💖</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-1 px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-lg border border-red-500/30 text-white hover:bg-red-500/30 transition-all duration-300 shadow-lg hover:scale-105"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDonation(true)}
                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30 text-white hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 shadow-lg hover:scale-105"
                aria-label="Donar a través de PayPal"
              >
                <span className="text-xs">💖</span>
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-105"
              >
                <User className="w-3 h-3" />
                <span className="text-xs">Login</span>
              </button>
            </div>
          )}
        </div>

        <div className="text-center py-4 pt-12">
          <h1 className="text-2xl md:text-3xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Control de Gastos
          </h1>
          <p className="text-white/90 text-sm font-medium animate-pulse">{currentMotivationalQuote}</p>
          {user && (
            <div className="mt-1 text-xs text-white/80">
              🔄 Datos sincronizados en la nube
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards - Reemplaza la barra de progreso */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {/* Progreso */}
          <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-3 text-center border border-yellow-400/30">
            <div className="flex items-center justify-center mb-1">
              <Target className="w-4 h-4 text-yellow-400"/>
            </div>
            <div className="text-lg font-black text-yellow-400">{progress}%</div>
            <div className="text-xs text-white/70">Progreso</div>
          </div>
          
          {/* Puntos */}
          <div className="bg-gradient-to-br from-purple-400/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-3 text-center border border-purple-400/30">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-purple-400"/>
            </div>
            <div className="text-lg font-black text-purple-400">{points}</div>
            <div className="text-xs text-white/70">Puntos</div>
          </div>
          
          {/* Racha */}
          <div className="bg-gradient-to-br from-orange-400/20 to-red-500/20 backdrop-blur-lg rounded-xl p-3 text-center border border-orange-400/30">
            <div className="flex items-center justify-center mb-1">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse"/>
            </div>
            <div className="text-lg font-black text-orange-400">{streak}</div>
            <div className="text-xs text-white/70">Días</div>
          </div>
        </div>
      </div>

      {/* Pantalla de bienvenida para usuarios no autenticados */}
      {!user && (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
            <div className="text-8xl mb-6 animate-pulse">💸</div>
            <h2 className="text-4xl font-black text-white mb-4">
              Control de Gastos
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Regístrate gratis para comenzar a controlar tus finanzas personales
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
              >
                🚀 Comenzar Gratis
              </button>
              <p className="text-white/70 text-sm">
                ✅ 100% Gratuito<br/>
                ✅ Tus datos protegidos<br/>
                ✅ Sin spam
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Steps */}
      <div className="max-w-xl mx-auto p-4 space-y-6">
        {user && step < onboardingSteps.length && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-6xl mb-6 text-center animate-bounce">
              {onboardingSteps[step].icon}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
              {onboardingSteps[step].title}
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed text-center">
              {onboardingSteps[step].description}
            </p>

        {/* Slider para campos numéricos */}
        {onboardingSteps[step].field && 
         onboardingSteps[step].field !== 'location' && 
         onboardingSteps[step].field !== null && (
          <div className="mb-8">
            <input
              type="range"
              min={onboardingSteps[step].field === 'age' ? 18 : onboardingSteps[step].field === 'monthlyIncome' ? 0 : 0}
              max={onboardingSteps[step].field === 'age' ? 80 : onboardingSteps[step].field === 'monthlyIncome' ? 6000 : 1000}
              step={onboardingSteps[step].field === 'age' ? 1 : 10}
              value={
                onboardingSteps[step].field === 'monthlyIncome' 
                  ? data.monthlyIncome 
                  : onboardingSteps[step].field === 'age'
                  ? data.age
                  : (data.fixedExpenses as any)[onboardingSteps[step].field!]
              }
              onChange={(e) => {
                const value = Number(e.target.value);
                if (onboardingSteps[step].field === 'monthlyIncome') {
                  setData((d) => ({ ...d, monthlyIncome: value }));
                } else if (onboardingSteps[step].field === 'age') {
                  setData((d) => ({ ...d, age: value }));
                } else {
                  setData((d) => ({
                    ...d,
                    fixedExpenses: { ...d.fixedExpenses, [onboardingSteps[step].field!]: value }
                  }));
                }
              }}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-4xl font-black text-yellow-400 mt-4 text-center">
              {onboardingSteps[step].field === 'age' 
                ? `${data.age} años`
                : new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(
                    onboardingSteps[step].field === 'monthlyIncome' 
                      ? data.monthlyIncome 
                      : (data.fixedExpenses as any)[onboardingSteps[step].field!]
                  )
              }
            </div>
          </div>
        )}

        {/* Selector de ubicación */}
        {onboardingSteps[step].field === 'location' && (
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'madrid', label: 'Madrid', icon: '🏛️' },
                { key: 'barcelona', label: 'Barcelona', icon: '🏰' },
                { key: 'valencia', label: 'Valencia', icon: '🍊' },
                { key: 'sevilla', label: 'Sevilla', icon: '🌅' },
                { key: 'bilbao', label: 'Bilbao', icon: '🏔️' },
                { key: 'other', label: 'Otras regiones', icon: '🗺️' }
              ].map((region) => (
                <button
                  key={region.key}
                  onClick={() => setData((d) => ({ ...d, location: region.key }))}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    data.location === region.key
                      ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400'
                      : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{region.icon}</div>
                  <div className="font-bold text-sm">{region.label}</div>
                </button>
              ))}
            </div>
            <div className="text-4xl font-black text-yellow-400 mt-4 text-center">
              {data.location === 'madrid' ? 'Madrid' : 
               data.location === 'barcelona' ? 'Barcelona' : 
               data.location === 'valencia' ? 'Valencia' : 
               data.location === 'sevilla' ? 'Sevilla' : 
               data.location === 'bilbao' ? 'Bilbao' : 'Otras regiones'}
            </div>
          </div>
        )}

            {step === onboardingSteps.length - 1 && (
              <div className="bg-white/10 rounded-2xl p-6 mb-8">
                <div className="text-center mb-4">
                  <div className="text-2xl font-black text-white mb-2">📊 Resumen de tu perfil</div>
                  <div className="text-white/80">Ingresos: {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(data.monthlyIncome)}</div>
                  <div className="text-white/80">Gastos totales: {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(fixedTotal)}</div>
                  <div className="text-green-400 font-bold text-xl">Te quedan: {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(monthlyLeft)}</div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={() => {
                  setPoints((p) => p + 20);
                  if (step < onboardingSteps.length - 1) {
                    setStep(step + 1);
                  } else {
                    setStep(onboardingSteps.length);
                  }
                }}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
              >
                {step < onboardingSteps.length - 1 ? 'Siguiente ▶️' : 'Ir al Dashboard 🚀'}
              </button>
              
              <button
                onClick={() => setStep(onboardingSteps.length)}
                className="text-white/80 hover:text-white w-full text-sm underline transition-colors"
              >
                Saltar configuración
              </button>
            </div>

            <div className="text-white/60 text-sm max-w-2xl mx-auto mt-6 text-center">
              💡 <strong>Tip:</strong> Estos valores son aproximados y puedes modificarlos en cualquier momento desde el dashboard
            </div>
          </div>
        )}
      </div>

      {/* Dashboard ampliado */}
      {user && step >= onboardingSteps.length && (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {/* Resumen financiero compacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Ingresos - Expandible */}
            <div className="bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-green-400/30">
              <div 
                onClick={() => setShowIncomeDetails(!showIncomeDetails)}
                className="cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl">
                      <Target className="w-4 h-4 text-white"/>
                    </div>
                    <span className="font-bold text-lg text-white">Ingresos</span>
                  </div>
                  <span className="text-white/60 text-sm">
                    {showIncomeDetails ? '📉' : '📈'}
                  </span>
                </div>
                <div className="text-2xl font-black text-green-400 mb-1">
                  {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(totalIncome)}
                </div>
                <div className="text-xs text-white/80">Mensuales</div>
              </div>
              
              {/* Sección expandible de ingresos */}
              {showIncomeDetails && (
                <div className="mt-4 pt-4 border-t border-green-400/30 space-y-3">
                  {/* Ingreso base - editable al hacer clic */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">💰</span>
                        <span className="text-sm text-white">Ingreso Base</span>
                      </div>
                      <div 
                        onClick={() => {
                          const newAmount = parseFloat(prompt('Nuevo ingreso mensual:', data.monthlyIncome.toString()) || '0');
                          if (newAmount >= 0) {
                            setData(d => ({ ...d, monthlyIncome: newAmount }));
                          }
                        }}
                        className="text-sm font-semibold text-green-400 cursor-pointer hover:text-green-300 transition-colors"
                      >
                        {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(data.monthlyIncome)}
                      </div>
                    </div>
                    <div className="text-xs text-white/60 mt-1">👆 Haz clic para editar</div>
                  </div>

                  {/* Lista de ingresos adicionales */}
                  {incomes.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs text-white/60 font-semibold">Ingresos adicionales:</div>
                      {incomes.map((income) => (
                        <div key={income.id} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">📈</span>
                            <span className="text-sm text-white">{income.source}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {editingIncomeItem === income.id ? (
                              <input
                                type="number"
                                defaultValue={income.amount}
                                onBlur={(e) => {
                                  const newAmount = parseFloat(e.target.value);
                                  if (!isNaN(newAmount) && newAmount > 0) {
                                    updateIncomeItem(income.id, newAmount);
                                  } else {
                                    setEditingIncomeItem(null);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    const newAmount = parseFloat(e.currentTarget.value);
                                    if (!isNaN(newAmount) && newAmount > 0) {
                                      updateIncomeItem(income.id, newAmount);
                                    }
                                  } else if (e.key === 'Escape') {
                                    setEditingIncomeItem(null);
                                  }
                                }}
                                className="w-20 bg-white/20 border border-green-400/50 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                                autoFocus
                              />
                            ) : (
                              <span 
                                onClick={() => editIncomeItem(income.id)}
                                className="text-sm font-semibold text-green-400 cursor-pointer hover:text-green-300 transition-colors"
                              >
                                {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(income.amount)}
                              </span>
                            )}
                            <button 
                              onClick={() => deleteIncomeItem(income.id)}
                              className="text-red-400 hover:text-red-300 text-xs ml-1"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Botón para añadir nuevo ingreso */}
                  <button
                    onClick={() => setShowAddIncomeModal(true)}
                    className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs py-2 px-3 rounded-lg transition-colors border border-green-400/30"
                  >
                    ➕ Añadir nuevo ingreso
                  </button>
                </div>
              )}
            </div>

            {/* Gastos - Expandible */}
            <div className="bg-gradient-to-br from-red-400/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-red-400/30">
              <div 
                onClick={() => setShowExpenseDetails(!showExpenseDetails)}
                className="cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl">
                      <Zap className="w-4 h-4 text-white"/>
                    </div>
                    <span className="font-bold text-lg text-white">Gastos</span>
                  </div>
                  <span className="text-white/60 text-sm">
                    {showExpenseDetails ? '📉' : '📈'}
                  </span>
                </div>
                <div className="text-2xl font-black text-red-400 mb-1">
                  {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(totalExpenses)}
                </div>
                <div className="text-xs text-white/80">Mensuales</div>
              </div>
              
              {/* Sección expandible de gastos */}
              {showExpenseDetails && (
                <div className="mt-4 pt-4 border-t border-red-400/30 space-y-3">
                  {/* Gastos fijos - editables al hacer clic */}
                  <div className="space-y-2">
                    <div className="text-xs text-white/60 font-semibold">Gastos fijos:</div>
                    {Object.entries(data.fixedExpenses).map(([key, value]) => (
                      value > 0 && (
                        <div key={key} className="bg-white/10 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">💸</span>
                              <span className="text-sm text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                            <div 
                              onClick={() => {
                                const newAmount = parseFloat(prompt(`Nuevo valor para ${key}:`, value.toString()) || '0');
                                if (newAmount >= 0) {
                                  setData(d => ({
                                    ...d,
                                    fixedExpenses: { ...d.fixedExpenses, [key]: newAmount }
                                  }));
                                }
                              }}
                              className="text-sm font-semibold text-red-400 cursor-pointer hover:text-red-300 transition-colors"
                            >
                              {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value)}
                            </div>
                          </div>
                          <div className="text-xs text-white/60 mt-1">👆 Haz clic para editar</div>
                        </div>
                      )
                    ))}
                  </div>
                  
                  {/* Lista de gastos variables */}
                  {expenses.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs text-white/60 font-semibold">Gastos variables:</div>
                      {expenses.map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">🛒</span>
                            <span className="text-sm text-white">{expense.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {editingExpenseItem === expense.id ? (
                              <input
                                type="number"
                                defaultValue={expense.amount}
                                onBlur={(e) => {
                                  const newAmount = parseFloat(e.target.value);
                                  if (!isNaN(newAmount) && newAmount > 0) {
                                    updateExpenseItem(expense.id, newAmount);
                                  } else {
                                    setEditingExpenseItem(null);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    const newAmount = parseFloat(e.currentTarget.value);
                                    if (!isNaN(newAmount) && newAmount > 0) {
                                      updateExpenseItem(expense.id, newAmount);
                                    }
                                  } else if (e.key === 'Escape') {
                                    setEditingExpenseItem(null);
                                  }
                                }}
                                className="w-20 bg-white/20 border border-red-400/50 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
                                autoFocus
                              />
                            ) : (
                              <span 
                                onClick={() => editExpenseItem(expense.id)}
                                className="text-sm font-semibold text-red-400 cursor-pointer hover:text-red-300 transition-colors"
                              >
                                {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(expense.amount)}
                              </span>
                            )}
                            <button 
                              onClick={() => deleteExpenseItem(expense.id)}
                              className="text-red-400 hover:text-red-300 text-xs ml-1"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Botón para añadir nuevo gasto */}
                  <button
                    onClick={() => setShowAddExpenseModal(true)}
                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs py-2 px-3 rounded-lg transition-colors border border-red-400/30"
                  >
                    ➕ Añadir nuevo gasto
                  </button>
                </div>
              )}
            </div>
            
            {/* Disponible - Compacto */}
            <div className="bg-gradient-to-br from-blue-400/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-blue-400/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl">
                  <Star className="w-4 h-4 text-white"/>
                </div>
                <span className="font-bold text-lg text-white">Disponible</span>
              </div>
              <div className="text-2xl font-black text-blue-400 mb-1">
                {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(monthlyLeft)}
              </div>
              <div className="text-xs text-white/80">Para ahorrar</div>
            </div>
          </div>

          {/* Segunda fila - Puntos y Racha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-400/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-purple-400/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl">
                  <Crown className="w-4 h-4 text-white"/>
                </div>
                <span className="font-bold text-lg text-white">Puntos</span>
              </div>
              <div className="text-2xl font-black text-purple-400 mb-1">{points}</div>
              <div className="text-xs text-white/80">Total acumulado</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-400/20 to-red-500/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-orange-400/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl">
                  <Flame className="w-4 h-4 text-white animate-pulse"/>
                </div>
                <span className="font-bold text-lg text-white">Racha</span>
              </div>
              <div className="text-2xl font-black text-orange-400 mb-1">{streak}</div>
              <div className="text-xs text-white/80">días consecutivos</div>
            </div>
          </div>




          {/* Gráfica de donut interactiva desglosada */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl">
                <Target className="w-4 h-4 text-white"/>
              </div>
              <div className="font-bold text-lg text-white">📊 Resumen Desglosado</div>
            </div>
            
            {/* Selector de vista */}
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 rounded-xl p-1 flex gap-1">
                <button
                  onClick={() => setShowIncomeDetails(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    showIncomeDetails 
                      ? 'bg-green-400 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  💰 Ingresos
                </button>
                <button
                  onClick={() => setShowExpenseDetails(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    showExpenseDetails 
                      ? 'bg-red-400 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  💸 Gastos
                </button>
              </div>
            </div>

            <div className="h-60">
              {(() => {
                const currentData = showIncomeDetails ? chartData.incomeSources : chartData.expenseCategories;
                
                // Si no hay datos, mostrar mensaje
                if (currentData.length === 0) {
                  return (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white/70">
                        <div className="text-4xl mb-2">📊</div>
                        <div>No hay datos para mostrar</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Doughnut
                    data={{
                      labels: currentData.map(item => item.label),
                      datasets: [{
                        data: currentData.map(item => item.value),
                        backgroundColor: currentData.map(item => item.color),
                        borderWidth: 3,
                        borderColor: 'rgba(255,255,255,0.2)',
                      }],
                    }}
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: 'white',
                            font: { size: 12, weight: 'bold' }
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              const value = context.parsed;
                              const total = context.dataset.data.reduce((a, b) => a + b, 0);
                              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                              return `${context.label}: ${new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value)} (${percentage}%)`;
                            }
                          }
                        }
                      },
                      onClick: (_, elements) => {
                        if (elements.length > 0) {
                          const elementIndex = elements[0].index;
                          const item = currentData[elementIndex];
                          const total = currentData.reduce((sum, item) => sum + item.value, 0);
                          const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
                          
                          alert(`${item.label}: ${new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(item.value)}\nPorcentaje: ${percentage}%`);
                        }
                      }
                    }}
                  />
                );
              })()}
            </div>
            <div className="mt-4 text-center text-white/70 text-sm">
              💡 Haz clic en cualquier sección para ver detalles específicos
            </div>
          </div>

          {/* Quiz Diario */}
          <div data-quiz-section>
          {!hasAnsweredToday() && (
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-purple-400/30">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl">
                  <Brain className="w-4 h-4 text-white"/>
                </div>
                <div className="font-bold text-lg text-white">🧠 Pregunta del Día</div>
              </div>
              
              {/* Info de la pregunta */}
              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded-full">{dailyQuestion.category}</span>
                <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded-full">{dailyQuestion.difficulty}</span>
              </div>
              
              {/* Mensaje motivador */}
              <div className="bg-white/10 rounded-xl p-3 mb-4">
                <div className="text-center text-white/90 text-sm font-semibold">
                  ¡Aprende algo nuevo cada día! 🚀
                </div>
              </div>
              
              <div className="font-semibold text-white mb-3 text-base">
                {dailyQuestion.question}
              </div>
              
              {!quizAnswered ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {dailyQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleDailyQuizAnswer(i)}
                      className="bg-white/20 border border-white/30 text-white py-3 px-4 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 text-sm text-left"
                    >
                      <span className="font-bold text-blue-300">{String.fromCharCode(65 + i)}.</span> {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {dailyQuestion.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`py-3 px-4 rounded-xl text-sm text-left border-2 ${
                        i === dailyQuestion.correct
                          ? 'bg-green-500/30 border-green-400 text-green-100'
                          : i === selectedAnswer && i !== dailyQuestion.correct
                          ? 'bg-red-500/30 border-red-400 text-red-100'
                          : 'bg-white/10 border-white/20 text-white/70'
                      }`}
                    >
                      <span className="font-bold text-blue-300">{String.fromCharCode(65 + i)}.</span> {opt}
                      {i === dailyQuestion.correct && <span className="ml-2">✅</span>}
                      {i === selectedAnswer && i !== dailyQuestion.correct && <span className="ml-2">❌</span>}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="text-white/80 text-xs text-center">
                <div className="mb-1">+100 puntos por acierto • Racha actual: {quizStreak} días</div>
                <div className="text-yellow-400 font-bold text-sm">🎯 ¡Mantén tu racha de aprendizaje!</div>
              </div>
              
              {/* Explicación educativa */}
              {showQuizExplanation && (
                <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-blue-300"/>
                    <span className="font-semibold text-blue-200">💡 Explicación</span>
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {dailyQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {hasAnsweredToday() && (
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-green-400/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-white"/>
                </div>
                <div className="font-bold text-lg text-white">✅ ¡Ya respondiste hoy!</div>
              </div>
              <div className="text-white/90 text-sm mb-3">
                Has completado la pregunta del día. ¡Vuelve mañana para aprender algo nuevo!
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-sm mb-2">🔥 Racha actual: {quizStreak} días</div>
                <div className="text-white/70 text-xs">
                  Próxima pregunta: mañana a las 00:00
                </div>
              </div>
            </div>
          )}
          </div>


          {/* Comparativas regionales */}
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-indigo-400/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl">
                <Target className="w-6 h-6 text-white"/>
              </div>
              <div className="font-black text-2xl text-white">📊 Comparativa Regional</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-black text-white mb-2">💰 Ingresos</div>
                  <div className="text-3xl font-black text-green-400">{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(totalIncome)}</div>
                  <div className="text-sm text-white/80">vs {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(regionalComparison.income.regional)} regional</div>
                </div>
                <div className={`text-center text-lg font-bold ${regionalComparison.income.difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {regionalComparison.income.difference >= 0 ? '↑' : '↓'} {Math.abs(regionalComparison.income.percentage).toFixed(1)}%
                </div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-black text-white mb-2">💸 Gastos</div>
                  <div className="text-3xl font-black text-red-400">{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(totalExpenses)}</div>
                  <div className="text-sm text-white/80">vs {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(regionalComparison.expenses.regional)} regional</div>
                </div>
                <div className={`text-center text-lg font-bold ${regionalComparison.expenses.difference <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {regionalComparison.expenses.difference <= 0 ? '↓' : '↑'} {Math.abs(regionalComparison.expenses.percentage).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="text-center text-white/80 text-sm">
              📍 Comparación con {data.location === 'madrid' ? 'Madrid' : data.location === 'barcelona' ? 'Barcelona' : data.location === 'valencia' ? 'Valencia' : data.location === 'sevilla' ? 'Sevilla' : data.location === 'bilbao' ? 'Bilbao' : 'tu región'}
            </div>
          </div>

          {/* Píldora */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-400/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl">
                <Gift className="w-6 h-6 text-white"/>
              </div>
              <div className="font-black text-2xl text-white">📚 Píldora de aprendizaje</div>
            </div>
            <div className="text-white/90 text-lg leading-relaxed">{currentTip}</div>
          </div>

          {/* Lista de transacciones */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl">
                <Trophy className="w-6 h-6 text-white"/>
              </div>
              <div className="font-black text-2xl text-white">🧾 Últimas transacciones</div>
            </div>
            <div className="space-y-4">
              {[...expenses.map(e => ({...e, type: 'expense' as const})), ...incomes.map(i => ({...i, type: 'income' as const}))]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10)
                .map((item) => (
                <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg ${
                        item.type === 'income' 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                          : 'bg-gradient-to-r from-red-400 to-pink-500'
                      }`}>
                        {item.type === 'income' ? '💰' : '💸'}
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">
                          {item.type === 'income' ? (item as IncomeItem).source : (item as ExpenseItem).category}
                        </div>
                        <div className="text-sm text-white/70">{new Date(item.date).toLocaleDateString('es-ES')}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-black text-2xl ${
                        item.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.type === 'income' ? '+' : '-'}{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(item.amount)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {expenses.length === 0 && incomes.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💸💰</div>
                  <div className="text-white/70 text-lg">Aún no has añadido transacciones.</div>
                  <div className="text-white/50 text-sm mt-2">¡Añade tu primer gasto o ingreso para empezar a ganar puntos!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => user ? setShowAuthModal(false) : null}
        onAuthSuccess={(user) => {
          if (user) {
            setShowAuthModal(false);
          }
        }}
        canClose={!!user}
      />

      {/* Modal para añadir nuevo ingreso */}
      {showAddIncomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">💰 Añadir nuevo ingreso</h3>
              <button
                onClick={() => setShowAddIncomeModal(false)}
                className="text-white/60 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">Fuente del ingreso</label>
                <input
                  type="text"
                  value={newIncomeForm.source}
                  onChange={(e) => setNewIncomeForm(prev => ({ ...prev, source: e.target.value }))}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Ej: Freelance, Ventas, etc."
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">Cantidad (€)</label>
                <input
                  type="number"
                  value={newIncomeForm.amount}
                  onChange={(e) => setNewIncomeForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddIncomeModal(false)}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={addNewIncome}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-colors"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir nuevo gasto */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">💸 Añadir nuevo gasto</h3>
              <button
                onClick={() => setShowAddExpenseModal(false)}
                className="text-white/60 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">Categoría</label>
                <select
                  value={newExpenseForm.category}
                  onChange={(e) => setNewExpenseForm(prev => ({ 
                    ...prev, 
                    category: e.target.value,
                    isNewCategory: e.target.value === 'new'
                  }))}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="" className="bg-gray-800">Selecciona categoría</option>
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-800">{category}</option>
                  ))}
                  <option value="new" className="bg-gray-800">➕ Crear nueva categoría</option>
                </select>
              </div>
              
              {newExpenseForm.isNewCategory && (
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">Nueva categoría</label>
                  <input
                    type="text"
                    value={newExpenseForm.category === 'new' ? '' : newExpenseForm.category}
                    onChange={(e) => setNewExpenseForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Ej: Comida, Transporte, etc."
                  />
                </div>
              )}
              
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">Cantidad (€)</label>
                <input
                  type="number"
                  value={newExpenseForm.amount}
                  onChange={(e) => setNewExpenseForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddExpenseModal(false)}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={addNewExpense}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl transition-colors"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificación del Quiz Diario */}
      {showQuizNotification && (
        <DailyQuizNotification onClose={handleQuizNotificationClose} />
      )}

      {/* Modal Donaciones */}
      {showDonation && (
        <DonationModal isOpen={true} onClose={() => setShowDonation(false)} />
      )}
    </div>
  );
};

export default ExpenseControlApp;