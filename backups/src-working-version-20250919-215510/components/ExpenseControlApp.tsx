import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Star, Trophy, CheckCircle2, Plus, Flame, Target, Zap, Crown, Gift, User, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth, useUserData } from '../hooks/useAuth';
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
    utilities: 120, 
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
    description: 'Te voy a guiar paso a paso para configurar tu perfil financiero. Los valores son aproximados y podrás modificarlos después.',
    icon: '🎯',
    field: null
  },
  {
    title: '¿Cuánto ingresas al mes?',
    description: 'Ingresos netos mensuales (después de impuestos)',
    icon: '💰',
    field: 'monthlyIncome'
  },
  {
    title: '¿Cuánto pagas de vivienda?',
    description: 'Alquiler o hipoteca mensual',
    icon: '🏠',
    field: 'rent'
  },
  {
    title: '¿Cuánto pagas de servicios?',
    description: 'Luz, agua, gas, internet, teléfono...',
    icon: '⚡',
    field: 'utilities'
  },
  {
    title: '¿Cuánto pagas de suscripciones?',
    description: 'Netflix, Spotify, gym, seguros...',
    icon: '📱',
    field: 'subscriptions'
  },
  {
    title: '¿Cuánto gastas en alimentación?',
    description: 'Supermercado, restaurantes, comida...',
    icon: '🛒',
    field: 'food'
  },
  {
    title: '¿Cuánto gastas en transporte?',
    description: 'Gasolina, transporte público, taxi...',
    icon: '🚗',
    field: 'transport'
  },
  {
    title: '¿Cuánto gastas en ocio?',
    description: 'Entretenimiento, salidas, hobbies...',
    icon: '🎬',
    field: 'entertainment'
  },
  {
    title: '¿Cuánto gastas en salud?',
    description: 'Farmacia, médicos, seguros médicos...',
    icon: '🏥',
    field: 'health'
  },
  {
    title: '¿Cuánto gastas en ropa?',
    description: 'Ropa, calzado, accesorios...',
    icon: '👕',
    field: 'clothing'
  },
  {
    title: '¿Cuánto gastas en otros?',
    description: 'Gastos varios, imprevistos...',
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

const incomeSources = [
  'Salario',
  'Freelance',
  'Inversiones',
  'Negocio',
  'Pensión',
  'Ayudas',
  'Otros',
];

// Datos regionales realistas para comparativas (datos INE 2023)
const regionalData = {
  madrid: {
    avgIncome: 1950,
    avgExpenses: {
      rent: 850,
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

const miniQuiz = [
  {
    q: '¿Qué es el interés compuesto?',
    a: ['Interés sobre interés', 'Un impuesto', 'Una comisión bancaria'],
    ok: 0,
  },
  {
    q: '¿Qué porcentaje mínimo es recomendable ahorrar?',
    a: ['5%', '10%', '20%'],
    ok: 2,
  },
];

const STORAGE_KEY_EXPENSES = 'ff_expenses_v1';
const STORAGE_KEY_CATEGORIES = 'ff_categories_v1';
const STORAGE_KEY_STREAK = 'ff_streak_v1';

const ExpenseControlApp = ({ onBack }: ExpenseControlAppProps) => {
  const [step, setStep] = useState<number>(() => {
    // Si el usuario ya tiene datos guardados, saltar onboarding
    const hasUserData = localStorage.getItem('ff_onboarding_v1') || localStorage.getItem('ff_expenses_v1');
    return hasUserData ? onboardingSteps.length : 0;
  });
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem('ff_onboarding_v1');
    return saved ? JSON.parse(saved) : defaultData;
  });
  const [points, setPoints] = useState<number>(0);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizCorrect, setQuizCorrect] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Auth
  const { user, logout } = useAuth();
  const { userData, saveUserData, loading: dataLoading } = useUserData(user);

  // Expenses
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    return saved ? JSON.parse(saved) : baseCategories;
  });
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_EXPENSES);
    return saved ? JSON.parse(saved) : [];
  });
  const [newExpense, setNewExpense] = useState<{ amount: string; category: string; date: string }>({
    amount: '',
    category: baseCategories[0],
    date: new Date().toISOString().slice(0, 10),
  });
  const [newCategory, setNewCategory] = useState<string>('');

  // Income
  const [incomes, setIncomes] = useState<IncomeItem[]>(() => {
    const saved = localStorage.getItem('ff_incomes_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [newIncome, setNewIncome] = useState<{ amount: string; source: string; date: string }>({
    amount: '',
    source: incomeSources[0],
    date: new Date().toISOString().slice(0, 10),
  });

  // Streak
  const [streak, setStreak] = useState<number>(() => Number(localStorage.getItem(STORAGE_KEY_STREAK) || '0'));
  const [lastExpenseDate, setLastExpenseDate] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showIncomeDetails, setShowIncomeDetails] = useState<boolean>(false);
  const [showExpenseDetails, setShowExpenseDetails] = useState<boolean>(false);
  const [editingIncome, setEditingIncome] = useState<boolean>(false);
  const [editingExpenses, setEditingExpenses] = useState<boolean>(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState<string>('');

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

  const monthlyLeft = useMemo(() => {
    return Math.max(0, data.monthlyIncome - fixedTotal);
  }, [data, fixedTotal]);

  // const savingsCapacity = useMemo(() => {
  //   return Math.min(monthlyLeft, data.savingsGoal);
  // }, [monthlyLeft, data.savingsGoal]);

  const progress = useMemo(() => {
    const stepsCount = onboardingSteps.length;
    return Math.round(((step + 1) / stepsCount) * 100);
  }, [step]);

  // const achievements = useMemo(() => {
  //   return [
  //     { id: 'ingresos', label: 'Ingresos definidos', done: data.monthlyIncome > 0 },
  //     { id: 'fijos', label: 'Gastos fijos registrados', done: fixedTotal > 0 },
  //     { id: 'ahorro', label: 'Objetivo de ahorro fijado', done: data.savingsGoal > 0 },
  //     { id: 'capacidad', label: 'Capacidad de ahorro positiva', done: savingsCapacity > 0 },
  //   ];
  // }, [data, fixedTotal, savingsCapacity]);

  const handleBack = () => (step === 0 ? onBack() : setStep((s) => Math.max(0, s - 1)));

  const handleQuizAnswer = (idx: number) => {
    const current = miniQuiz[quizIndex];
    if (idx === current.ok) {
      setQuizCorrect((c) => c + 1);
      setPoints((p) => p + 50);
      // Mostrar mensaje motivador
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    if (quizIndex < miniQuiz.length - 1) {
      setQuizIndex((i) => i + 1);
    } else {
      setCompleted(true);
      setPoints((p) => p + 200); // Bonus mayor por completar
    }
  };

  const addExpense = () => {
    const amount = Number(newExpense.amount);
    if (!amount || amount <= 0) return;
    const item: ExpenseItem = {
      id: `${Date.now()}`,
      amount,
      category: newExpense.category,
      date: newExpense.date,
    };
    setExpenses((prev) => [item, ...prev]);
    
    // Animación de confeti y puntos
    setShowConfetti(true);
    setPoints((p) => p + 10);
    setTimeout(() => setShowConfetti(false), 2000);

    // Streak update (daily logging streak)
    const today = new Date(newExpense.date).toDateString();
    const oldStreak = streak;
    if (!lastExpenseDate) {
      setStreak(1);
      setLastExpenseDate(today);
    } else {
      const last = new Date(lastExpenseDate);
      const curr = new Date(today);
      const diff = Math.round((+curr - +last) / (1000 * 60 * 60 * 24));
      if (diff === 1) setStreak((s) => s + 1);
      else if (diff > 1) setStreak(1);
      setLastExpenseDate(today);
    }

    // Logros especiales
    if (streak === 0 && oldStreak === 0) {
      setAchievementUnlocked('¡Primer gasto registrado! +10 puntos');
      setTimeout(() => setAchievementUnlocked(''), 3000);
    } else if (streak === 7) {
      setAchievementUnlocked('🔥 ¡Racha de 7 días! +50 puntos');
      setTimeout(() => setAchievementUnlocked(''), 3000);
    } else if (streak === 30) {
      setAchievementUnlocked('👑 ¡Racha de 30 días! +200 puntos');
      setTimeout(() => setAchievementUnlocked(''), 3000);
    }

    setNewExpense({ amount: '', category: newExpense.category, date: newExpense.date });
  };

  const addCategory = () => {
    const name = newCategory.trim();
    if (!name) return;
    if (!categories.includes(name)) setCategories((c) => [...c, name]);
    setNewCategory('');
  };

  const addIncome = () => {
    const amount = Number(newIncome.amount);
    if (!amount || amount <= 0) return;
    const item: IncomeItem = {
      id: `${Date.now()}`,
      amount,
      source: newIncome.source,
      date: newIncome.date,
    };
    setIncomes((prev) => [item, ...prev]);
    setPoints((p) => p + 15);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    setNewIncome({ amount: '', source: newIncome.source, date: newIncome.date });
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
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

      {/* Achievement notification */}
      {achievementUnlocked && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-2xl shadow-2xl animate-bounce">
          {achievementUnlocked}
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative">
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={handleBack}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>
        </div>
        
        <div className="absolute top-4 right-4 z-10">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-500/30 text-white hover:bg-red-500/30 transition-all duration-300 shadow-lg hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>Salir</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-105"
            >
              <User className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </button>
          )}
        </div>

        <div className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Control de Gastos
          </h1>
          <p className="text-white/90 text-lg">🎯 Onboarding gamificado para dominar tus finanzas</p>
          {user && (
            <div className="mt-4 text-sm text-white/80">
              🔄 Datos sincronizados en la nube
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-xl mx-auto p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20">
          <div
            className="h-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center text-sm text-white/80 mt-3 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <Target className="w-4 h-4 text-yellow-400"/> Progreso: {progress}%
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400"/> {points} pts
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500"/> {streak} días
          </span>
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className="max-w-xl mx-auto p-4 space-y-6">
        {step < onboardingSteps.length && (
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
              💡 <strong>Tip:</strong> Puedes modificar estos valores en cualquier momento desde el dashboard
            </div>
          </div>
        )}
      </div>

      {/* Dashboard ampliado */}
      {step >= onboardingSteps.length && (
        <div className="max-w-5xl mx-auto p-4 space-y-6">
          {/* Resumen financiero */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div 
              onClick={() => setShowIncomeDetails(!showIncomeDetails)}
              className="bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-green-400/30 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl">
                  <Target className="w-6 h-6 text-white"/>
                </div>
                <span className="font-black text-xl text-white">Ingresos</span>
                <span className="text-white/60 text-sm">👆</span>
              </div>
              <div className="text-4xl font-black text-green-400 mb-2">{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(data.monthlyIncome)}</div>
              <div className="text-sm text-white/80">
                <span className="font-semibold">Mensuales</span>
              </div>
            </div>

            <div 
              onClick={() => setShowExpenseDetails(!showExpenseDetails)}
              className="bg-gradient-to-br from-red-400/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-red-400/30 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl">
                  <Zap className="w-6 h-6 text-white"/>
                </div>
                <span className="font-black text-xl text-white">Gastos</span>
                <span className="text-white/60 text-sm">👆</span>
              </div>
              <div className="text-4xl font-black text-red-400 mb-2">{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(fixedTotal)}</div>
              <div className="text-sm text-white/80">
                <span className="font-semibold">Mensuales</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-400/20 to-cyan-500/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-blue-400/30 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl">
                  <Star className="w-6 h-6 text-white"/>
                </div>
                <span className="font-black text-xl text-white">Disponible</span>
              </div>
              <div className="text-4xl font-black text-blue-400 mb-2">{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(monthlyLeft)}</div>
              <div className="text-sm text-white/80">
                <span className="font-semibold">Para ahorrar</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-400/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-400/30 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl">
                  <Crown className="w-6 h-6 text-white"/>
                </div>
                <span className="font-black text-xl text-white">Puntos</span>
              </div>
              <div className="text-4xl font-black text-purple-400 mb-2">{points}</div>
              <div className="flex items-center gap-2 text-white/80">
                <Flame className="w-4 h-4 text-orange-500 animate-pulse"/>
                <span className="font-semibold text-sm">Racha: {streak} días</span>
              </div>
            </div>
          </div>

          {/* Menú desplegable de ingresos */}
          {showIncomeDetails && (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-green-400/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl">
                    <Target className="w-6 h-6 text-white"/>
                  </div>
                  <div className="font-black text-2xl text-white">💰 Detalle de Ingresos</div>
                </div>
                <button
                  onClick={() => setShowIncomeDetails(false)}
                  className="text-white/60 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ingreso base del perfil */}
                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">💰</div>
                    <button
                      onClick={() => setEditingIncome(!editingIncome)}
                      className="text-white/60 hover:text-white text-sm"
                    >
                      {editingIncome ? '✅ Guardar' : '✏️ Editar'}
                    </button>
                  </div>
                  
                  {editingIncome ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-sm font-semibold mb-2">Ingreso Mensual</label>
                        <input
                          type="number"
                          value={data.monthlyIncome}
                          onChange={(e) => setData(d => ({ ...d, monthlyIncome: Number(e.target.value) }))}
                          className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
                          placeholder="1500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="font-bold text-white text-lg">Ingreso Base</div>
                      <div className="text-3xl font-black text-green-400 mt-2">
                        {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(data.monthlyIncome)}
                      </div>
                      <div className="text-white/70 text-sm mt-1">Mensual</div>
                    </div>
                  )}
                </div>

                {/* Ingresos adicionales registrados */}
                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="text-center mb-4">
                    <div className="text-2xl mb-2">📈</div>
                    <div className="font-bold text-white text-lg">Ingresos Extra</div>
                    <div className="text-3xl font-black text-green-400 mt-2">
                      {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(
                        incomes.reduce((sum, income) => sum + income.amount, 0)
                      )}
                    </div>
                    <div className="text-white/70 text-sm mt-1">Total registrado</div>
                  </div>
                  
                  {incomes.length > 0 && (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {incomes.slice(0, 5).map((income) => (
                        <div key={income.id} className="flex justify-between items-center bg-white/5 rounded-lg p-2">
                          <div className="text-white text-sm">
                            <div className="font-semibold">{income.source}</div>
                            <div className="text-white/60 text-xs">{new Date(income.date).toLocaleDateString('es-ES')}</div>
                          </div>
                          <div className="text-green-400 font-bold">
                            +{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(income.amount)}
                          </div>
                        </div>
                      ))}
                      {incomes.length > 5 && (
                        <div className="text-white/60 text-xs text-center">
                          ... y {incomes.length - 5} más
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Menú desplegable de gastos */}
          {showExpenseDetails && (
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-red-400/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl">
                    <Zap className="w-6 h-6 text-white"/>
                  </div>
                  <div className="font-black text-2xl text-white">💸 Detalle de Gastos</div>
                </div>
                <button
                  onClick={() => setShowExpenseDetails(false)}
                  className="text-white/60 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gastos fijos del perfil */}
                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">🏠</div>
                    <button
                      onClick={() => setEditingExpenses(!editingExpenses)}
                      className="text-white/60 hover:text-white text-sm"
                    >
                      {editingExpenses ? '✅ Guardar' : '✏️ Editar'}
                    </button>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="font-bold text-white text-lg">Gastos Fijos</div>
                    <div className="text-3xl font-black text-red-400 mt-2">
                      {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(fixedTotal)}
                    </div>
                    <div className="text-white/70 text-sm mt-1">Mensual</div>
                  </div>
                  
                  <div className="space-y-2">
                    {Object.entries(data.fixedExpenses).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center bg-white/5 rounded-lg p-2">
                        <div className="text-white text-sm font-semibold capitalize">
                          {key === 'rent' ? 'Vivienda' :
                           key === 'utilities' ? 'Servicios' :
                           key === 'transport' ? 'Transporte' :
                           key === 'subscriptions' ? 'Suscripciones' :
                           key === 'food' ? 'Alimentación' :
                           key === 'entertainment' ? 'Ocio' :
                           key === 'health' ? 'Salud' :
                           key === 'clothing' ? 'Ropa' : 'Otros'}
                        </div>
                        {editingExpenses ? (
                          <input
                            type="number"
                            value={value}
                            onChange={(e) => setData(d => ({
                              ...d,
                              fixedExpenses: { ...d.fixedExpenses, [key]: Number(e.target.value) }
                            }))}
                            className="w-20 bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
                          />
                        ) : (
                          <div className="text-red-400 font-bold">
                            {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gastos adicionales registrados */}
                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="text-center mb-4">
                    <div className="text-2xl mb-2">📝</div>
                    <div className="font-bold text-white text-lg">Gastos Extra</div>
                    <div className="text-3xl font-black text-red-400 mt-2">
                      {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(
                        expenses.reduce((sum, expense) => sum + expense.amount, 0)
                      )}
                    </div>
                    <div className="text-white/70 text-sm mt-1">Total registrado</div>
                  </div>
                  
                  {expenses.length > 0 && (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {expenses.slice(0, 5).map((expense) => (
                        <div key={expense.id} className="flex justify-between items-center bg-white/5 rounded-lg p-2">
                          <div className="text-white text-sm">
                            <div className="font-semibold">{expense.category}</div>
                            <div className="text-white/60 text-xs">{new Date(expense.date).toLocaleDateString('es-ES')}</div>
                          </div>
                          <div className="text-red-400 font-bold">
                            -{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(expense.amount)}
                          </div>
                        </div>
                      ))}
                      {expenses.length > 5 && (
                        <div className="text-white/60 text-xs text-center">
                          ... y {expenses.length - 5} más
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Añadir gastos e ingresos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Añadir gasto */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl">
                  <Plus className="w-6 h-6 text-white"/>
                </div>
                <div className="font-black text-2xl text-white">💸 Añadir gasto</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">💰 Importe</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense((v) => ({ ...v, amount: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">📂 Categoría</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense((v) => ({ ...v, category: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-gray-800">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">📅 Fecha</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense((v) => ({ ...v, date: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={addExpense}
                  className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-2xl flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5"/>
                  ¡Añadir gasto!
                </button>
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    placeholder="Nueva categoría..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-1 bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                  <button
                    onClick={addCategory}
                    className="bg-white/20 border border-white/30 text-white px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                  >
                    <Gift className="w-4 h-4"/>
                    Crear
                  </button>
                </div>
              </div>
            </div>

            {/* Añadir ingreso */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl">
                  <Plus className="w-6 h-6 text-white"/>
                </div>
                <div className="font-black text-2xl text-white">💰 Añadir ingreso</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">💰 Importe</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newIncome.amount}
                    onChange={(e) => setNewIncome((v) => ({ ...v, amount: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">📂 Fuente</label>
                  <select
                    value={newIncome.source}
                    onChange={(e) => setNewIncome((v) => ({ ...v, source: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    {incomeSources.map((s) => (
                      <option key={s} value={s} className="bg-gray-800">{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">📅 Fecha</label>
                  <input
                    type="date"
                    value={newIncome.date}
                    onChange={(e) => setNewIncome((v) => ({ ...v, date: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={addIncome}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-2xl flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5"/>
                ¡Añadir ingreso!
              </button>
            </div>
          </div>

          {/* Gráfica de donut interactiva desglosada */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl">
                <Target className="w-6 h-6 text-white"/>
              </div>
              <div className="font-black text-2xl text-white">📊 Resumen Financiero Desglosado</div>
            </div>
            
            {/* Selector de vista */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 rounded-2xl p-2 flex gap-2">
                <button
                  onClick={() => setShowIncomeDetails(true)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    showIncomeDetails 
                      ? 'bg-green-400 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  💰 Ingresos
                </button>
                <button
                  onClick={() => setShowExpenseDetails(true)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    showExpenseDetails 
                      ? 'bg-red-400 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  💸 Gastos
                </button>
              </div>
            </div>

            <div className="h-80">
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

          {/* Test de preguntas */}
          {!completed && (
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-yellow-400/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl">
                  <Trophy className="w-6 h-6 text-white"/>
                </div>
                <div className="font-black text-2xl text-white">🧠 Test de Finanzas</div>
              </div>
              
              {/* Mensaje motivador fijo */}
              <div className="bg-white/10 rounded-2xl p-4 mb-6">
                <div className="text-center text-white/90 text-lg font-semibold">
                  ¡Cada pregunta te acerca más a la libertad financiera! 🚀
                </div>
              </div>
              
              <div className="font-semibold text-white mb-4 text-lg">{miniQuiz[quizIndex].q}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {miniQuiz[quizIndex].a.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(i)}
                    className="bg-white/20 border border-white/30 text-white py-3 px-4 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="text-white/80 text-sm text-center">
                <div className="mb-2">Pregunta {quizIndex + 1} de {miniQuiz.length} • +50 puntos por acierto</div>
                <div className="text-yellow-400 font-bold">🎯 ¡Completa el test diario para mantener tu racha de aprendizaje!</div>
              </div>
            </div>
          )}

          {completed && (
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-green-400/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6 text-white"/>
                </div>
                <div className="font-black text-2xl text-white">🎉 ¡Test completado!</div>
              </div>
              <div className="text-white/90 text-lg mb-4">
                Aciertos: {quizCorrect}/{miniQuiz.length} • +{quizCorrect * 50 + 200} puntos ganados
              </div>
              
              {/* Mensaje de celebración */}
              <div className="bg-white/10 rounded-2xl p-4 mb-4">
                <div className="text-center text-white/90 text-lg font-semibold">
                  {quizCorrect === miniQuiz.length 
                    ? "¡PERFECTO! 🏆 Tu conocimiento financiero es excepcional"
                    : quizCorrect >= miniQuiz.length * 0.8
                    ? "¡Excelente! 🌟 Dominas muy bien las finanzas personales"
                    : "¡Bien hecho! 💪 Cada día aprendes más sobre dinero"
                  }
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => {
                    setCompleted(false);
                    setQuizIndex(0);
                    setQuizCorrect(0);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-6 py-3 rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
                >
                  🔄 Repetir Test
                </button>
                <div className="text-white/70 text-sm mt-2">
                  ¡Vuelve mañana para mantener tu racha de aprendizaje!
                </div>
              </div>
            </div>
          )}

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
                  <div className="text-3xl font-black text-green-400">{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(data.monthlyIncome)}</div>
                  <div className="text-sm text-white/80">vs {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(regionalComparison.income.regional)} regional</div>
                </div>
                <div className={`text-center text-lg font-bold ${regionalComparison.income.difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {regionalComparison.income.difference >= 0 ? '↑' : '↓'} {Math.abs(regionalComparison.income.percentage).toFixed(1)}%
                </div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-black text-white mb-2">💸 Gastos</div>
                  <div className="text-3xl font-black text-red-400">{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(fixedTotal)}</div>
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
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={(user) => {
          if (user) {
            setShowAuthModal(false);
          }
        }}
      />
    </div>
  );
};

export default ExpenseControlApp;