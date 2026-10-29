import { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowLeft, Star, Trophy, CheckCircle2, Flame, Target, Zap, Crown, Gift, Brain, Download, FileText, ShieldCheck, AlertTriangle, CalendarCheck, PlusCircle, BarChart3, Flag, Upload, Trash2 } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
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
  financialBreathing: 'negative' | 'tight' | 'positive';
  priorityConcern: 'balance' | 'debt' | 'emergency' | 'investing' | 'autonomo' | 'housing' | 'optimize';
  weeklyClarity: 'unknown' | 'approx' | 'clear';
}

interface ExpenseItem {
  id: string;
  amount: number;
  category: string;
  date: string; // ISO YYYY-MM-DD
  note?: string;
  recurrent?: boolean;
  tag?: string;
}

interface IncomeItem {
  id: string;
  amount: number;
  source: string;
  date: string; // ISO YYYY-MM-DD
}

interface GoalItem {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  icon: string;
  createdAt: string;
}

const defaultData: OnboardingData = {
  monthlyIncome: 1500,
  fixedExpenses: { 
    rent: 500, 
    utilities: 0, 
    internet: 0,
    transport: 60,
    subscriptions: 0,
    food: 300,
    entertainment: 0,
    health: 0,
    clothing: 0,
    other: 0
  },
  savingsGoal: 200,
  age: 30,
  location: 'madrid',
  financialBreathing: 'tight',
  priorityConcern: 'balance',
  weeklyClarity: 'unknown',
};

type OnboardingField =
  | 'monthlyIncome'
  | 'rent'
  | 'food'
  | 'transport'
  | 'savingsGoal'
  | 'age'
  | 'location'
  | 'financialBreathing'
  | 'priorityConcern'
  | 'weeklyClarity';

type FinancialPriorityKey = 'balance' | 'expensiveDebt' | 'emergency' | 'investing' | 'taxes' | 'housing' | 'optimize';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  field: OnboardingField | null;
  bullets?: string[];
  choices?: {
    value: string;
    label: string;
    description: string;
  }[];
}

const priorityConfig: Record<FinancialPriorityKey, {
  label: string;
  title: string;
  detail: string;
  action: string;
  challengeId: string;
  challengeTitle: string;
  tone: string;
}> = {
  balance: {
    label: 'Equilibrar el mes',
    title: 'Primero: que el mes respire',
    detail: 'Antes de ahorrar más o invertir, necesitas ver por dónde se escapa el margen. Empieza registrando gastos reales unos días.',
    action: 'Añadir gasto',
    challengeId: 'gasto-consciente-7d',
    challengeTitle: 'Reto 7 días: gastos hormiga',
    tone: 'from-orange-500/25 via-amber-500/15 to-red-500/20 border-orange-200/30',
  },
  expensiveDebt: {
    label: 'Bajar deuda cara',
    title: 'Prioridad: deuda y cuotas',
    detail: 'Si hay tarjeta, préstamo o compras aplazadas, conviene ver cuánto pesan antes de abrir nuevos objetivos.',
    action: 'Registrar cuota',
    challengeId: 'sin-compras-impulsivas',
    challengeTitle: 'Semana sin compras impulsivas',
    tone: 'from-rose-500/25 via-orange-500/15 to-red-500/20 border-rose-200/30',
  },
  emergency: {
    label: 'Crear colchón',
    title: 'Construye un colchón pequeño',
    detail: 'Un fondo de emergencia reduce sustos. No tiene que ser perfecto: empieza con una cifra alcanzable.',
    action: 'Crear fondo',
    challengeId: 'revision-suscripciones',
    challengeTitle: 'Revisión de suscripciones',
    tone: 'from-emerald-500/25 via-cyan-500/15 to-blue-500/20 border-emerald-200/30',
  },
  investing: {
    label: 'Empezar a invertir',
    title: 'Ahorro estable, siguiente paso',
    detail: 'Si ya tienes margen y colchón, el siguiente hábito suele ser automatizar una aportación sencilla y constante.',
    action: 'Crear objetivo',
    challengeId: 'revision-suscripciones',
    challengeTitle: 'Revisión de suscripciones',
    tone: 'from-cyan-500/25 via-blue-500/15 to-indigo-500/20 border-cyan-200/30',
  },
  taxes: {
    label: 'Reservar impuestos',
    title: 'Separa impuestos al cobrar',
    detail: 'Si eres autónomo, tu dinero tranquilo debe calcularse después de apartar IVA, IRPF y cuota. Evita sorpresas trimestrales.',
    action: 'Añadir gasto fijo',
    challengeId: 'gasto-consciente-7d',
    challengeTitle: 'Reto 7 días: gastos hormiga',
    tone: 'from-yellow-500/25 via-orange-500/15 to-amber-500/20 border-yellow-200/30',
  },
  housing: {
    label: 'Preparar vivienda',
    title: 'Vivienda sin sustos',
    detail: 'Si estás pensando en alquiler, compra o hipoteca, lo primero es saber tu margen mensual antes de comprometerte.',
    action: 'Ver mi mes',
    challengeId: 'revision-suscripciones',
    challengeTitle: 'Revisión de suscripciones',
    tone: 'from-blue-500/25 via-cyan-500/15 to-emerald-500/20 border-blue-200/30',
  },
  optimize: {
    label: 'Optimizar hábitos',
    title: 'Mantén el hábito semanal',
    detail: 'Tienes una base bastante ordenada. Ahora mejora con revisiones pequeñas, no con cambios enormes.',
    action: 'Ver mi mes',
    challengeId: 'revision-suscripciones',
    challengeTitle: 'Revisión de suscripciones',
    tone: 'from-violet-500/25 via-blue-500/15 to-cyan-500/20 border-violet-200/30',
  },
};

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Te guío paso a paso',
    description: 'No necesitas saber de finanzas. Primero haremos una foto aproximada de tu mes y luego la podrás ajustar con calma.',
    icon: 'GUIA',
    field: null,
    bullets: [
      'Ingresos: el dinero que entra cada mes.',
      'Gastos: el dinero que sale.',
      'Dinero tranquilo: lo que puedes usar sin romper tu plan.'
    ]
  },
  {
    title: 'Primero tu prioridad',
    description: 'La app no va de rellenar casillas. Va de saber qué toca resolver primero para que el mes sea más llevadero.',
    icon: 'FOCO',
    field: 'financialBreathing',
    choices: [
      { value: 'negative', label: 'Llego justo o en negativo', description: 'Necesito recuperar margen antes de pensar en más cosas.' },
      { value: 'tight', label: 'Llego, pero sin calma', description: 'No sé muy bien cuánto puedo gastar sin pasarme.' },
      { value: 'positive', label: 'Tengo algo de margen', description: 'Quiero ordenar y mejorar mis siguientes pasos.' },
    ],
  },
  {
    title: '¿Cuánto ingresas al mes?',
    description: 'Pon tu ingreso neto aproximado, lo que realmente te llega después de impuestos. Si cambia cada mes, usa una media prudente.',
    icon: 'EUR',
    field: 'monthlyIncome',
    bullets: [
      'Ejemplo: nómina, facturación neta, pensión o ingresos habituales.',
      'No hace falta que sea exacto al euro.'
    ]
  },
  {
    title: 'Ahora los gastos fijos',
    description: 'Los gastos fijos son los que suelen repetirse cada mes. Empezamos por los grandes para no hacerte rellenar veinte cosas.',
    icon: 'FIJOS',
    field: null,
    bullets: [
      'Vivienda, supermercado y transporte suelen explicar gran parte del mes.',
      'Después podrás añadir luz, móvil, suscripciones, ocio y cualquier categoría.'
    ]
  },
  {
    title: '¿Cuánto pagas de vivienda?',
    description: 'Alquiler o hipoteca mensual aproximada. Si compartes gastos, pon solo tu parte.',
    icon: 'CASA',
    field: 'rent'
  },
  {
    title: '¿Cuánto gastas en supermercado?',
    description: 'Compra mensual aproximada de alimentación y básicos. Si no lo sabes, usa una estimación normal.',
    icon: 'COMPRA',
    field: 'food'
  },
  {
    title: '¿Cuánto gastas en transporte?',
    description: 'Gasolina, transporte público, taxi o desplazamientos habituales.',
    icon: 'TRANS',
    field: 'transport'
  },
  {
    title: '¿Cuánto quieres ahorrar?',
    description: 'Elige un objetivo mensual realista. Sirve para separar ahorro de gasto disponible y calcular tu Dinero tranquilo.',
    icon: 'META',
    field: 'savingsGoal',
    bullets: [
      'Si ahora no puedes ahorrar mucho, empieza bajo.',
      'La constancia pesa más que una cifra perfecta.'
    ]
  },
  {
    title: '¿Qué te preocupa más?',
    description: 'Elige una sola cosa. Así el dashboard te dará un primer paso claro y no una lista infinita.',
    icon: 'MAPA',
    field: 'priorityConcern',
    choices: [
      { value: 'balance', label: 'Llegar mejor a fin de mes', description: 'Quiero controlar gastos y recuperar margen.' },
      { value: 'debt', label: 'Deudas o cuotas', description: 'Tarjeta, préstamo, compra aplazada o cuotas.' },
      { value: 'emergency', label: 'Colchón de emergencia', description: 'Quiero tener algo separado para imprevistos.' },
      { value: 'investing', label: 'Empezar a invertir', description: 'Tengo base, pero no sé cómo crear hábito.' },
      { value: 'autonomo', label: 'Soy autónomo', description: 'Necesito reservar impuestos y no mezclarlo todo.' },
      { value: 'housing', label: 'Vivienda o hipoteca', description: 'Quiero saber si puedo asumir alquiler o cuota.' },
    ],
  },
  {
    title: '¿Dónde vives?',
    description: 'Lo usamos solo para mostrar referencias regionales aproximadas. Tus datos siguen guardados en tu dispositivo.',
    icon: 'ZONA',
    field: 'location'
  },
  {
    title: '¿Sabes tu margen semanal?',
    description: 'Esta respuesta ayuda a convertir el mes en una cifra sencilla: cuánto puedes gastar sin cargarte el plan.',
    icon: 'SEM',
    field: 'weeklyClarity',
    choices: [
      { value: 'unknown', label: 'No lo sé', description: 'Veo la cuenta, pero no sé si voy bien o mal.' },
      { value: 'approx', label: 'Más o menos', description: 'Tengo una idea, aunque no siempre la sigo.' },
      { value: 'clear', label: 'Lo tengo claro', description: 'Sé cuánto puedo gastar y reviso el mes.' },
    ],
  },
  {
    title: 'Cómo leer tu dashboard',
    description: 'Al entrar verás pocas decisiones importantes. Añade gastos cuando ocurran y revisa el resumen cuando quieras entender el mes.',
    icon: 'MES',
    field: null,
    bullets: [
      'Dinero tranquilo: tu margen después de gastos y ahorro.',
      'Mi mes: evolución y diagnóstico simple.',
      'Datos y copia de seguridad: exportar, importar o borrar, al final.'
    ]
  }
];

const baseCategories = [
  'Casa',
  'Supermercado',
  'Bares/restaurantes',
  'Transporte',
  'Gasolina',
  'Niños/colegio',
  'Salud/farmacia',
  'Ocio',
  'Suscripciones',
  'Compras online',
  'Bizum',
  'Imprevistos',
];

const categoryIcons: Record<string, string> = {
  Casa: 'CA',
  'Luz y agua': 'LU',
  'Internet y móvil': 'IN',
  Supermercado: 'SU',
  'Bares/restaurantes': 'BA',
  Transporte: 'TR',
  Gasolina: 'GA',
  'Niños/colegio': 'NI',
  'Salud/farmacia': 'SA',
  Ocio: 'OC',
  Ropa: 'RO',
  Suscripciones: 'SS',
  'Compras online': 'CO',
  Bizum: 'BZ',
  Imprevistos: 'IM',
  Otros: 'OT',
};

const fixedExpenseLabels: Record<keyof OnboardingData['fixedExpenses'], string> = {
  rent: 'Casa',
  utilities: 'Luz y agua',
  internet: 'Internet y móvil',
  transport: 'Transporte',
  subscriptions: 'Suscripciones',
  food: 'Supermercado',
  entertainment: 'Ocio',
  health: 'Salud/farmacia',
  clothing: 'Ropa',
  other: 'Otros',
};

const getCategoryIcon = (category: string) => categoryIcons[category] || 'OT';

const goalTemplates = [
  { title: 'Fondo de emergencia', targetAmount: 3000, icon: 'FE' },
  { title: 'Vacaciones', targetAmount: 1200, icon: 'VA' },
  { title: 'Quitar deuda', targetAmount: 2000, icon: 'DE' },
  { title: 'Compra importante', targetAmount: 800, icon: 'CI' },
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
import { AdMobBanner } from './AdMobBanner';

const STORAGE_KEY_EXPENSES = 'ff_expenses_v1';
const STORAGE_KEY_INCOMES = 'ff_incomes_v1';
const STORAGE_KEY_CATEGORIES = 'ff_categories_v1';
const STORAGE_KEY_STREAK = 'ff_streak_v1';
const STORAGE_KEY_POINTS = 'ff_points_v1';
const STORAGE_KEY_ONBOARDING = 'ff_onboarding_v1';
const STORAGE_KEY_ONBOARDING_DONE = 'ff_onboarding_completed_v1';
const STORAGE_KEY_CHALLENGES = 'ff_challenges_v1';
const STORAGE_KEY_GOALS = 'ff_goals_v1';

type ChallengeStatus = 'available' | 'active' | 'completed';

type ChallengeProgress = Record<string, {
  status: ChallengeStatus;
  startedAt?: string;
  completedAt?: string;
}>;

const ExpenseControlApp = ({ onBack }: ExpenseControlAppProps) => {
  const isNativeApp = Capacitor.getPlatform() !== 'web';
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<number>(() => {
    const hasCompleted = localStorage.getItem(STORAGE_KEY_ONBOARDING_DONE) === 'true';
    const hasTransactions =
      localStorage.getItem(STORAGE_KEY_EXPENSES) ||
      localStorage.getItem(STORAGE_KEY_INCOMES);
    return hasCompleted || hasTransactions ? onboardingSteps.length : 0;
  });

  // Configurar navegación por swipe
  const swipeRef = useSwipe({
    threshold: 120,
    velocity: 0.2,
    safeZone: { top: 160, bottom: 100, left: 50, right: 50 },
    onSwipeRight: () => {
      if (!isNativeApp) {
        onBack();
      }
    },
    onSwipeUp: () => {
      // Swipe arriba = siguiente paso durante onboarding
      if (step < onboardingSteps.length) {
        if (step < onboardingSteps.length - 1) {
          setStep(step + 1);
        } else {
          localStorage.setItem(STORAGE_KEY_ONBOARDING_DONE, 'true');
          setStep(onboardingSteps.length);
        }
      }
    },
    onSwipeDown: () => {
      // Swipe abajo = paso anterior durante onboarding
      if (step < onboardingSteps.length && step > 0) {
        setStep(step - 1);
      }
    }
  });
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ONBOARDING);
    if (!saved) return defaultData;

    try {
      const parsed = JSON.parse(saved);
      return {
        ...defaultData,
        ...parsed,
        fixedExpenses: {
          ...defaultData.fixedExpenses,
          ...(parsed.fixedExpenses || {}),
        },
      };
    } catch {
      return defaultData;
    }
  });
  const [points, setPoints] = useState<number>(() => Number(localStorage.getItem(STORAGE_KEY_POINTS) || '0'));
  // Estados del quiz diario
  const [dailyQuestion] = useState<FinancialQuestion>(getDailyQuestion());
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizStreak, setQuizStreak] = useState(0);
  const [showQuizExplanation, setShowQuizExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizNotification, setShowQuizNotification] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
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
    const saved = localStorage.getItem(STORAGE_KEY_INCOMES);
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<GoalItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_GOALS);
    return saved ? JSON.parse(saved) : [];
  });

  // Streak
  const [streak] = useState<number>(() => Number(localStorage.getItem(STORAGE_KEY_STREAK) || '0'));
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showIncomeDetails, setShowIncomeDetails] = useState<boolean>(false);
  const [showExpenseDetails, setShowExpenseDetails] = useState<boolean>(false);
  const [showWeeklyReview, setShowWeeklyReview] = useState<boolean>(false);
  const [showMonthPanel, setShowMonthPanel] = useState<boolean>(true);
  const [showCalmPlanPanel, setShowCalmPlanPanel] = useState<boolean>(true);
  const [showWeekPanel, setShowWeekPanel] = useState<boolean>(true);
  const [showGoalsPanel, setShowGoalsPanel] = useState<boolean>(false);
  const [showBreakdownPanel, setShowBreakdownPanel] = useState<boolean>(false);
  const [showLeaksPanel, setShowLeaksPanel] = useState<boolean>(false);
  const [showChallengesPanel, setShowChallengesPanel] = useState<boolean>(false);
  const [showRegionalPanel, setShowRegionalPanel] = useState<boolean>(false);
  const [showLearnPanel, setShowLearnPanel] = useState<boolean>(false);
  const [showExpenseAdvanced, setShowExpenseAdvanced] = useState<boolean>(false);
  
  // Estados para modales de edición
  const [editingIncomeItem, setEditingIncomeItem] = useState<string | null>(null);
  const [editingExpenseItem, setEditingExpenseItem] = useState<string | null>(null);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState<boolean>(false);
  
  // Estados para formularios
  const [newIncomeForm, setNewIncomeForm] = useState({
    source: '',
    amount: '',
    isNewCategory: false
  });
  const [newExpenseForm, setNewExpenseForm] = useState({
    category: '',
    amount: '',
    note: '',
    tag: '',
    recurrent: false,
    isNewCategory: false
  });
  const [newGoalForm, setNewGoalForm] = useState({
    title: 'Fondo de emergencia',
    targetAmount: '3000',
    savedAmount: '0',
    icon: 'FE',
  });
  const [challengeProgress, setChallengeProgress] = useState<ChallengeProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CHALLENGES);
    return saved ? JSON.parse(saved) : {};
  });
  const shouldShowNativeBanner =
    isNativeApp &&
    step >= onboardingSteps.length &&
    !showAddIncomeModal &&
    !showAddExpenseModal &&
    !showAddGoalModal &&
    !showDonation;

  // Persistencia local-first: la app funciona completa sin cuenta.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ONBOARDING, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INCOMES, JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STREAK, String(streak));
  }, [streak]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_POINTS, String(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CHALLENGES, JSON.stringify(challengeProgress));
  }, [challengeProgress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(goals));
  }, [goals]);

  const fixedTotal = useMemo(() => {
    const f = data.fixedExpenses;
    return f.rent + f.utilities + f.internet + f.transport + f.subscriptions + f.food + f.entertainment + f.health + f.clothing + f.other;
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

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);

  const currentMonthKey = useMemo(() => new Date().toISOString().slice(0, 7), []);
  const previousMonthKey = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().slice(0, 7);
  }, []);

  const currentMonthExpenses = useMemo(
    () => expenses.filter((expense) => expense.date.startsWith(currentMonthKey)),
    [expenses, currentMonthKey]
  );

  const previousMonthExpenses = useMemo(
    () => expenses.filter((expense) => expense.date.startsWith(previousMonthKey)),
    [expenses, previousMonthKey]
  );

  const currentMonthIncomes = useMemo(
    () => incomes.filter((income) => income.date.startsWith(currentMonthKey)),
    [incomes, currentMonthKey]
  );

  const previousMonthIncomes = useMemo(
    () => incomes.filter((income) => income.date.startsWith(previousMonthKey)),
    [incomes, previousMonthKey]
  );

  const calmMoney = useMemo(
    () => Math.max(0, totalIncome - fixedTotal - data.savingsGoal - variableExpensesTotal),
    [totalIncome, fixedTotal, data.savingsGoal, variableExpensesTotal]
  );

  const weekRange = useMemo(() => {
    const today = new Date();
    const day = today.getDay() === 0 ? 7 : today.getDay();
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);
    start.setDate(today.getDate() - day + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return {
      start,
      end,
      startKey: start.toISOString().slice(0, 10),
      endKey: end.toISOString().slice(0, 10),
      dayIndex: day,
    };
  }, []);

  const currentWeekExpenses = useMemo(
    () => expenses.filter((expense) => expense.date >= weekRange.startKey && expense.date <= weekRange.endKey),
    [expenses, weekRange.endKey, weekRange.startKey]
  );

  const currentWeekVariableTotal = useMemo(
    () => currentWeekExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [currentWeekExpenses]
  );

  const weeklyFixedEstimate = useMemo(() => fixedTotal / 4.345, [fixedTotal]);
  const weeklySavingsTarget = useMemo(() => data.savingsGoal / 4.345, [data.savingsGoal]);
  const weeklyIncomeEstimate = useMemo(() => totalIncome / 4.345, [totalIncome]);
  const weeklyCalmBudget = useMemo(
    () => Math.max(0, weeklyIncomeEstimate - weeklyFixedEstimate - weeklySavingsTarget),
    [weeklyFixedEstimate, weeklyIncomeEstimate, weeklySavingsTarget]
  );
  const weeklyRemaining = useMemo(
    () => weeklyCalmBudget - currentWeekVariableTotal,
    [currentWeekVariableTotal, weeklyCalmBudget]
  );
  const weekProgress = useMemo(
    () => weeklyCalmBudget > 0 ? Math.min(100, Math.round((currentWeekVariableTotal / weeklyCalmBudget) * 100)) : 0,
    [currentWeekVariableTotal, weeklyCalmBudget]
  );
  const daysLeftInWeek = Math.max(0, 7 - weekRange.dayIndex);
  const dailySafeSpend = useMemo(
    () => Math.max(0, weeklyRemaining) / Math.max(1, daysLeftInWeek + 1),
    [daysLeftInWeek, weeklyRemaining]
  );

  const weeklyInsight = useMemo(() => {
    if (currentWeekExpenses.length === 0) {
      return 'Apunta 2 o 3 gastos de esta semana para ver si el ritmo va cómodo.';
    }
    if (weeklyRemaining < 0) {
      return 'Esta semana ya pasó el margen estimado. No pasa nada: revisa una categoría y evita financiar gasto diario.';
    }
    if (weekProgress >= 80) {
      return 'Vas cerca del límite semanal. Para el resto de la semana, decide antes de gastar.';
    }
    return `Te quedan unos ${formatCurrency(dailySafeSpend)} al día hasta domingo sin romper el plan semanal.`;
  }, [currentWeekExpenses.length, dailySafeSpend, formatCurrency, weekProgress, weeklyRemaining]);

  const currentMonthVariableTotal = useMemo(
    () => currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [currentMonthExpenses]
  );

  const previousMonthVariableTotal = useMemo(
    () => previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [previousMonthExpenses]
  );

  const currentMonthIncomeTotal = useMemo(
    () => data.monthlyIncome + currentMonthIncomes.reduce((sum, income) => sum + income.amount, 0),
    [currentMonthIncomes, data.monthlyIncome]
  );

  const previousMonthIncomeTotal = useMemo(
    () => data.monthlyIncome + previousMonthIncomes.reduce((sum, income) => sum + income.amount, 0),
    [previousMonthIncomes, data.monthlyIncome]
  );

  const currentMonthTotalExpenses = fixedTotal + currentMonthVariableTotal;
  const previousMonthTotalExpenses = fixedTotal + previousMonthVariableTotal;
  const monthExpenseDifference = currentMonthTotalExpenses - previousMonthTotalExpenses;
  const monthExpensePercentage =
    previousMonthTotalExpenses > 0 ? (monthExpenseDifference / previousMonthTotalExpenses) * 100 : 0;

  const monthSavingsEstimate = currentMonthIncomeTotal - currentMonthTotalExpenses;

  const goalsTotalTarget = useMemo(
    () => goals.reduce((sum, goal) => sum + goal.targetAmount, 0),
    [goals]
  );

  const goalsTotalSaved = useMemo(
    () => goals.reduce((sum, goal) => sum + goal.savedAmount, 0),
    [goals]
  );

  const nextGoal = useMemo(
    () => goals.find((goal) => goal.savedAmount < goal.targetAmount) || goals[0],
    [goals]
  );

  const dailyExpenseEvolution = useMemo(() => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, index) => ({
      day: index + 1,
      amount: 0,
    }));

    currentMonthExpenses.forEach((expense) => {
      const day = Number(expense.date.slice(8, 10));
      if (day >= 1 && day <= daysInMonth) {
        days[day - 1].amount += expense.amount;
      }
    });

    return days;
  }, [currentMonthExpenses]);

  const maxDailyExpense = Math.max(1, ...dailyExpenseEvolution.map((day) => day.amount));

  const monthlyInsight = useMemo(() => {
    if (currentMonthExpenses.length === 0) {
      return 'Empieza registrando 2 o 3 gastos reales. Con pocos datos ya podré darte una lectura más útil del mes.';
    }

    if (previousMonthExpenses.length === 0) {
      return `Este mes llevas ${formatCurrency(currentMonthVariableTotal)} en gastos variables. Cuando tengas datos del mes anterior, verás la comparación automática.`;
    }

    if (monthExpenseDifference > 0) {
      return `Este mes gastas ${formatCurrency(monthExpenseDifference)} más que el mes anterior. Revisa la categoría principal antes de tocar todo a la vez.`;
    }

    if (monthExpenseDifference < 0) {
      return `Vas ${formatCurrency(Math.abs(monthExpenseDifference))} por debajo del mes anterior. Mantén el hábito y protege esa diferencia para ahorro.`;
    }

    return 'Tu gasto va prácticamente igual que el mes anterior. Busca una mejora pequeña: una suscripción, compras online o bares.';
  }, [
    currentMonthExpenses.length,
    currentMonthVariableTotal,
    formatCurrency,
    monthExpenseDifference,
    previousMonthExpenses.length,
  ]);

  const categoryTotals = useMemo(() => {
    const totals = new Map<string, number>();
    Object.entries(data.fixedExpenses).forEach(([category, amount]) => {
      const label = fixedExpenseLabels[category as keyof OnboardingData['fixedExpenses']] || category;
      totals.set(label, (totals.get(label) || 0) + amount);
    });
    currentMonthExpenses.forEach((expense) => {
      totals.set(expense.category, (totals.get(expense.category) || 0) + expense.amount);
    });
    return Array.from(totals.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [currentMonthExpenses, data.fixedExpenses]);

  const topCategory = categoryTotals[0];

  const leakageInsights = useMemo(() => {
    const lower = (text: string) => text.toLowerCase();
    const sumByMatcher = (matcher: (expense: ExpenseItem) => boolean) =>
      currentMonthExpenses.filter(matcher).reduce((sum, expense) => sum + expense.amount, 0);
    const countByMatcher = (matcher: (expense: ExpenseItem) => boolean) =>
      currentMonthExpenses.filter(matcher).length;

    const bars = sumByMatcher((expense) => /bar|restaurante|delivery|cafe|café/.test(lower(expense.category + ' ' + (expense.note || ''))));
    const online = sumByMatcher((expense) => /online|amazon|compras/.test(lower(expense.category + ' ' + (expense.note || ''))));
    const bizum = sumByMatcher((expense) => /bizum/.test(lower(expense.category + ' ' + (expense.note || ''))));
    const smallCount = countByMatcher((expense) => expense.amount > 0 && expense.amount <= 10);
    const smallTotal = sumByMatcher((expense) => expense.amount > 0 && expense.amount <= 10);
    const recurringTotal = currentMonthExpenses
      .filter((expense) => expense.recurrent || lower(expense.category).includes('suscripciones'))
      .reduce((sum, expense) => sum + expense.amount, data.fixedExpenses.subscriptions);
    const duplicateKeys = new Set<string>();
    const duplicates = currentMonthExpenses.filter((expense) => {
      const key = `${expense.date}-${expense.category}-${expense.amount}`;
      if (duplicateKeys.has(key)) return true;
      duplicateKeys.add(key);
      return false;
    });

    return [
      recurringTotal > 0 && {
        title: `Revisa ${formatCurrency(recurringTotal)} en suscripciones y pagos recurrentes`,
        detail: 'Cancela lo que no uses antes de que vuelva a pasar el cargo.',
        severity: recurringTotal > totalIncome * 0.08 ? 'alta' : 'media',
      },
      bars > 0 && {
        title: `${formatCurrency(bars)} en bares, restaurantes o delivery`,
        detail: 'Un límite suave semanal suele funcionar mejor que prohibirse todo.',
        severity: bars > totalIncome * 0.12 ? 'alta' : 'media',
      },
      online > 0 && {
        title: `${formatCurrency(online)} en compras online`,
        detail: 'Prueba una regla de espera de 24 horas para compras no urgentes.',
        severity: online > totalIncome * 0.1 ? 'alta' : 'media',
      },
      bizum > 0 && {
        title: `${formatCurrency(bizum)} enviados por Bizum`,
        detail: 'Los pagos pequeños se entienden mejor si los agrupas por motivo.',
        severity: 'media',
      },
      smallCount >= 3 && {
        title: `${smallCount} gastos pequeños suman ${formatCurrency(smallTotal)}`,
        detail: 'Son gastos hormiga: no son malos, pero conviene verlos juntos.',
        severity: smallTotal > 60 ? 'alta' : 'baja',
      },
      duplicates.length > 0 && {
        title: `${duplicates.length} posibles duplicados manuales`,
        detail: 'Misma fecha, categoría e importe. Revisa si apuntaste algo dos veces.',
        severity: 'baja',
      },
    ].filter(Boolean) as { title: string; detail: string; severity: string }[];
  }, [currentMonthExpenses, data.fixedExpenses.subscriptions, formatCurrency, totalIncome]);

  const monthlyDiagnosis = useMemo(() => {
    if (totalIncome <= 0) return 'Añade tus ingresos para calcular tu dinero tranquilo y recibir una recomendación mensual.';
    if (calmMoney <= 0) {
      return 'Este mes vas justo después de gastos fijos y objetivo de ahorro. Elige una fuga pequeña y reduce solo una categoría durante 7 días.';
    }
    if (topCategory) {
      return `Tu mayor bloque de gasto es ${topCategory.category}. Te quedan ${formatCurrency(calmMoney)} de dinero tranquilo después de gastos fijos, variables y ahorro objetivo.`;
    }
    return `Te quedan ${formatCurrency(calmMoney)} de dinero tranquilo. Buen momento para automatizar parte del ahorro.`;
  }, [calmMoney, topCategory, totalIncome, formatCurrency]);

  const emergencyTarget = useMemo(() => Math.max(300, fixedTotal * 3), [fixedTotal]);

  const emergencyGoal = useMemo(() => {
    return goals.find((goal) => {
      const title = goal.title.toLowerCase();
      return title.includes('fondo') || title.includes('emergencia') || title.includes('colchon') || title.includes('colchón');
    });
  }, [goals]);

  const emergencySaved = emergencyGoal?.savedAmount || 0;
  const emergencyProgress = emergencyTarget > 0 ? Math.min(100, Math.round((emergencySaved / emergencyTarget) * 100)) : 0;

  const currentDebtExpenses = useMemo(() => {
    const debtWords = /deuda|prestamo|préstamo|tarjeta|credito|crédito|aplazad|financiaci|cuota/;
    return currentMonthExpenses.filter((expense) =>
      debtWords.test(`${expense.category} ${expense.note || ''} ${expense.tag || ''}`.toLowerCase())
    );
  }, [currentMonthExpenses]);

  const currentDebtTotal = useMemo(
    () => currentDebtExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [currentDebtExpenses]
  );

  const debtPressure = totalIncome > 0 ? (currentDebtTotal / totalIncome) * 100 : 0;

  const calmPlan = useMemo(() => {
    if (currentMonthExpenses.length === 0) {
      return {
        title: 'Empieza con 3 gastos reales',
        detail: 'No hace falta completar todo. Apunta tres gastos de esta semana y la app empezará a darte una lectura útil.',
        action: 'Añadir gasto',
        tone: 'orange',
      };
    }

    if (calmMoney <= 0) {
      return {
        title: 'Esta semana toca recuperar margen',
        detail: 'Tu dinero tranquilo sale justo. Elige una sola fuga pequeña y obsérvala durante 7 días.',
        action: 'Ver gasto hormiga',
        tone: 'amber',
      };
    }

    if (debtPressure >= 10) {
      return {
        title: 'Revisa deuda y cuotas',
        detail: 'Has registrado pagos que parecen deuda o cuotas. Antes de añadir más gastos, mira si pesan demasiado.',
        action: 'Registrar cuota',
        tone: 'rose',
      };
    }

    if (emergencyProgress < 100) {
      return {
        title: 'Construye colchón poco a poco',
        detail: 'Ya hay margen. El siguiente paso amable es separar una cantidad pequeña para imprevistos.',
        action: 'Crear objetivo',
        tone: 'emerald',
      };
    }

    return {
      title: 'Mantén el hábito semanal',
      detail: 'Tienes margen y objetivo de colchón en marcha. Revisa una categoría por semana, no todo a la vez.',
      action: 'Ver mi mes',
      tone: 'cyan',
    };
  }, [calmMoney, currentMonthExpenses.length, debtPressure, emergencyProgress]);

  const financialPriority = useMemo<FinancialPriorityKey>(() => {
    if (data.financialBreathing === 'negative' || monthlyLeft < 0) return 'balance';
    if (data.priorityConcern === 'debt') return 'expensiveDebt';
    if (data.priorityConcern === 'emergency' || data.savingsGoal <= 0) return 'emergency';
    if (data.priorityConcern === 'investing') return 'investing';
    if (data.priorityConcern === 'autonomo') return 'taxes';
    if (data.priorityConcern === 'housing') return 'housing';
    if (data.weeklyClarity === 'unknown' || data.financialBreathing === 'tight') return 'balance';
    return 'optimize';
  }, [data.financialBreathing, data.priorityConcern, data.savingsGoal, data.weeklyClarity, monthlyLeft]);

  const priorityInfo = priorityConfig[financialPriority];

  const learningLessons = useMemo(() => {
    const lessons = [
      {
        title: 'Dinero tranquilo',
        detail: calmMoney >= 0
          ? 'Es tu margen después de gastos y ahorro. Si baja, no significa que lo estés haciendo mal: significa que toca decidir antes de gastar.'
          : 'Ahora mismo tu margen sale negativo. Empieza revisando una sola categoría, no todo tu mes a la vez.',
        action: calmMoney >= 0 ? 'Reserva una parte al cobrar' : 'Reduce una fuga pequeña 7 días',
      },
      {
        title: 'Gasto hormiga',
        detail: 'Son importes pequeños que parecen invisibles por separado, pero juntos explican muchos finales de mes ajustados.',
        action: 'Agrupa cafes, Bizum y compras pequeñas',
      },
      {
        title: 'Regla 50/30/20',
        detail: 'No es una ley, es una referencia: necesidades, ocio y ahorro. Sirve para detectar si una zona se está comiendo a las demás.',
        action: 'Compárala con tu mes, sin obsesionarte',
      },
    ];

    if (topCategory) {
      lessons.unshift({
        title: `Tu foco: ${topCategory.category}`,
        detail: `Es la categoría que más pesa ahora mismo. Para mejorar, suele funcionar mejor poner un límite suave que prohibirse gastar.`,
        action: `Marca un tope para ${topCategory.category}`,
      });
    }

    return lessons.slice(0, 3);
  }, [calmMoney, topCategory]);

  const activeChallenges = useMemo(() => [
    {
      id: 'gasto-consciente-7d',
      title: 'Reto 7 días: gastos hormiga',
      description: 'Apunta los gastos pequeños de la semana. No busques perfección, solo verlos juntos.',
      reward: 250,
      duration: '7 días',
    },
    {
      id: 'revision-suscripciones',
      title: 'Revisión de suscripciones',
      description: 'Marca como recurrentes tus pagos mensuales y cancela uno que no uses.',
      reward: 150,
      duration: '15 min',
    },
    {
      id: 'sin-compras-impulsivas',
      title: 'Semana sin compras impulsivas',
      description: 'Espera 24 horas antes de cualquier compra online no urgente.',
      reward: 200,
      duration: '7 días',
    },
  ], []);

  const weeklySmallExpenses = useMemo(() => {
    return currentMonthExpenses
      .filter((expense) => expense.amount > 0 && expense.amount <= 10)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [currentMonthExpenses]);

  const weeklySmallExpensesTotal = useMemo(() => {
    return weeklySmallExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [weeklySmallExpenses]);

  const weeklyReviewStatus = challengeProgress['gasto-consciente-7d']?.status || 'available';
  const weeklyFocusCategory = topCategory?.category || weeklySmallExpenses[0]?.category || 'gastos pequeños';

  const recentCategories = useMemo(() => {
    const scores = new Map<string, number>();

    expenses.slice(-40).forEach((expense, index) => {
      scores.set(expense.category, (scores.get(expense.category) || 0) + 40 + index);
    });

    return Array.from(new Set([
      ...Array.from(scores.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([category]) => category),
      'Supermercado',
      'Bares/restaurantes',
      'Transporte',
      'Bizum',
      'Compras online',
      'Imprevistos',
    ]))
      .filter((category) => categories.includes(category))
      .slice(0, 6);
  }, [categories, expenses]);

  const quickExpenseTemplates = useMemo(() => {
    const smallExpense = weeklySmallExpenses[0];
    const templates = [
      smallExpense && {
        label: `Repetir ${smallExpense.category}`,
        amount: String(smallExpense.amount),
        category: smallExpense.category,
        note: smallExpense.note || '',
      },
      { label: 'Café', amount: '2.50', category: 'Bares/restaurantes', note: 'Café' },
      { label: 'Compra', amount: '25', category: 'Supermercado', note: 'Compra rápida' },
      { label: 'Bizum', amount: '10', category: 'Bizum', note: 'Bizum' },
      { label: 'Gasolina', amount: '40', category: 'Gasolina', note: 'Gasolina' },
    ].filter(Boolean) as { label: string; amount: string; category: string; note: string }[];

    return templates.filter((template, index, all) =>
      all.findIndex((item) => item.label === template.label && item.category === template.category) === index
    ).slice(0, 4);
  }, [weeklySmallExpenses]);

  // const savingsCapacity = useMemo(() => {
  //   return Math.min(monthlyLeft, data.savingsGoal);
  // }, [monthlyLeft, data.savingsGoal]);

  const progress = useMemo(() => {
    const stepsCount = onboardingSteps.length;
    return Math.min(100, Math.round(((step + 1) / stepsCount) * 100));
  }, [step]);

  // Frases motivadoras diarias
  const motivationalQuotes = [
    "Cada euro ahorrado te acerca a la libertad financiera",
    "La disciplina financiera es la base del éxito",
    "Tu futuro financiero se construye hoy",
    "Cada decisión financiera cuenta para tu futuro",
    "La inversión en ti mismo es la mejor inversión",
    "La constancia en el ahorro es la clave del éxito",
    "Tu mentalidad de abundancia atrae oportunidades",
    "El conocimiento financiero es tu mejor activo",
    "Cada meta financiera alcanzada es una victoria",
    "La independencia financiera te da libertad total",
    "Tu actitud hacia el dinero determina tu futuro",
    "Los hábitos financieros saludables cambian vidas",
    "Cada día es una oportunidad para mejorar tus finanzas",
    "La diversificación reduce el riesgo financiero",
    "El interés compuesto premia la paciencia",
    "La paciencia es la virtud del inversor exitoso",
    "La creatividad financiera genera nuevas opciones",
    "La educación financiera es la mejor herencia",
    "Tu historia financiera se escribe con cada decisión",
    "La abundancia financiera empieza con claridad",
    "La planificación financiera es práctica y calma",
    "La mentalidad de escasez limita tus posibilidades",
    "Cada gasto es una decisión sobre tu futuro",
    "La libertad financiera es un hábito diario",
    "Los pequeños hábitos financieros cambian vidas",
    "La inversión en activos te hace más libre",
    "La gratitud financiera atrae más abundancia",
    "Tu red de valor financiero determina tu patrimonio",
    "La consistencia en el ahorro supera la inteligencia",
    "La educación financiera es la mejor inversión de tu vida"
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

  const getChoiceValue = (field: OnboardingField) => {
    if (field === 'financialBreathing') return data.financialBreathing;
    if (field === 'priorityConcern') return data.priorityConcern;
    if (field === 'weeklyClarity') return data.weeklyClarity;
    return '';
  };

  const setChoiceValue = (field: OnboardingField, value: string) => {
    if (field === 'financialBreathing') {
      setData((d) => ({ ...d, financialBreathing: value as OnboardingData['financialBreathing'] }));
    } else if (field === 'priorityConcern') {
      setData((d) => ({ ...d, priorityConcern: value as OnboardingData['priorityConcern'] }));
    } else if (field === 'weeklyClarity') {
      setData((d) => ({ ...d, weeklyClarity: value as OnboardingData['weeklyClarity'] }));
    }
  };

  const startChallenge = (challengeId: string) => {
    setChallengeProgress((prev) => ({
      ...prev,
      [challengeId]: {
        status: 'active',
        startedAt: prev[challengeId]?.startedAt || new Date().toISOString(),
        completedAt: undefined,
      },
    }));
  };

  const completeChallenge = (challengeId: string, reward: number) => {
    if (challengeProgress[challengeId]?.status === 'completed') return;

    setChallengeProgress((prev) => ({
      ...prev,
      [challengeId]: {
        ...prev[challengeId],
        status: 'completed',
        startedAt: prev[challengeId]?.startedAt || new Date().toISOString(),
        completedAt: new Date().toISOString(),
      },
    }));
    setPoints((p) => p + reward);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
  };

  const addNewGoal = () => {
    const targetAmount = parseFloat(newGoalForm.targetAmount);
    const savedAmount = parseFloat(newGoalForm.savedAmount || '0');

    if (!newGoalForm.title.trim() || !targetAmount || targetAmount <= 0) return;

    const goal: GoalItem = {
      id: `${Date.now()}`,
      title: newGoalForm.title.trim(),
      targetAmount,
      savedAmount: Math.max(0, Math.min(savedAmount || 0, targetAmount)),
      icon: newGoalForm.icon || 'FE',
      createdAt: new Date().toISOString(),
    };

    setGoals((prev) => [...prev, goal]);
    setNewGoalForm({ title: 'Fondo de emergencia', targetAmount: '3000', savedAmount: '0', icon: 'FE' });
    setShowAddGoalModal(false);
    setPoints((p) => p + 50);
  };

  const openEmergencyGoalModal = () => {
    setNewGoalForm({
      title: 'Fondo de emergencia',
      targetAmount: String(Math.round(emergencyTarget)),
      savedAmount: String(Math.round(emergencySaved)),
      icon: 'FE',
    });
    setShowAddGoalModal(true);
  };

  const openDebtExpenseModal = () => {
    setNewExpenseForm({
      category: 'Deuda/cuotas',
      amount: '',
      note: 'Cuota mensual',
      tag: 'deuda',
      recurrent: true,
      isNewCategory: !categories.includes('Deuda/cuotas'),
    });
    setShowExpenseAdvanced(true);
    setShowAddExpenseModal(true);
  };

  const openExpenseModal = (category = '') => {
    setNewExpenseForm({
      category,
      amount: '',
      note: '',
      tag: '',
      recurrent: false,
      isNewCategory: false,
    });
    setShowExpenseAdvanced(false);
    setShowAddExpenseModal(true);
  };

  const handlePriorityAction = () => {
    if (financialPriority === 'expensiveDebt') {
      openDebtExpenseModal();
      return;
    }

    if (financialPriority === 'emergency') {
      openEmergencyGoalModal();
      return;
    }

    if (financialPriority === 'investing') {
      setNewGoalForm({ title: 'Aportación mensual', targetAmount: '1000', savedAmount: '0', icon: 'INV' });
      setShowAddGoalModal(true);
      return;
    }

    if (financialPriority === 'taxes') {
      openExpenseModal('Impuestos');
      setNewExpenseForm((form) => ({
        ...form,
        category: 'Impuestos',
        note: 'Reserva mensual para IVA/IRPF/cuota',
        tag: 'autonomo',
        recurrent: true,
        isNewCategory: !categories.includes('Impuestos'),
      }));
      setShowExpenseAdvanced(true);
      return;
    }

    if (financialPriority === 'housing' || financialPriority === 'optimize') {
      document.querySelector('[data-month-section]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    openExpenseModal();
  };

  const applyExpensePreset = (preset: { amount: string; category: string; note?: string }) => {
    setNewExpenseForm({
      category: preset.category,
      amount: preset.amount,
      note: preset.note || '',
      tag: '',
      recurrent: false,
      isNewCategory: !categories.includes(preset.category),
    });
    setShowExpenseAdvanced(false);
  };

  const updateGoalSaved = (goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;
        const savedAmount = Math.max(0, Math.min(amount, goal.targetAmount));
        return { ...goal, savedAmount };
      })
    );
  };

  const addToGoal = (goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;
        const nextSaved = Math.min(goal.targetAmount, goal.savedAmount + amount);
        return { ...goal, savedAmount: nextSaved };
      })
    );
  };

  const deleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  };

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
      if (newExpenseForm.isNewCategory && !categories.includes(newExpenseForm.category)) {
        setCategories(prev => [...prev, newExpenseForm.category]);
      }

	      const newExpense: ExpenseItem = {
	        id: `${Date.now()}`,
	        category: newExpenseForm.category,
        amount: parseFloat(newExpenseForm.amount),
        date: new Date().toISOString().split('T')[0],
        note: newExpenseForm.note.trim() || undefined,
        tag: newExpenseForm.tag.trim() || undefined,
        recurrent: newExpenseForm.recurrent
	      };
	      setExpenses(prev => [...prev, newExpense]);
	      setNewExpenseForm({ category: '', amount: '', note: '', tag: '', recurrent: false, isNewCategory: false });
	      setShowExpenseAdvanced(false);
	      setShowAddExpenseModal(false);
	    }
	  };

  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const exportJson = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      app: 'FinanzasFacil Control de Gastos',
      onboardingData: data,
      incomes,
      expenses,
      categories,
      goals,
      challengeProgress,
      points,
      streak,
    };

    downloadFile(
      `finanzasfacil-control-gastos-${new Date().toISOString().split('T')[0]}.json`,
      JSON.stringify(exportData, null, 2),
      'application/json;charset=utf-8'
    );
  };

  const importJsonFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '{}'));

        if (parsed.app !== 'FinanzasFacil Control de Gastos') {
          throw new Error('Formato no reconocido');
        }

        const importedOnboarding = parsed.onboardingData || defaultData;
        setData({
          ...defaultData,
          ...importedOnboarding,
          fixedExpenses: {
            ...defaultData.fixedExpenses,
            ...(importedOnboarding.fixedExpenses || {}),
          },
        });
        setIncomes(Array.isArray(parsed.incomes) ? parsed.incomes : []);
        setExpenses(Array.isArray(parsed.expenses) ? parsed.expenses : []);
        setCategories(Array.isArray(parsed.categories) && parsed.categories.length > 0 ? parsed.categories : baseCategories);
        setGoals(Array.isArray(parsed.goals) ? parsed.goals : []);
        setChallengeProgress(parsed.challengeProgress && typeof parsed.challengeProgress === 'object' ? parsed.challengeProgress : {});
        setPoints(Number(parsed.points || 0));
        localStorage.setItem(STORAGE_KEY_ONBOARDING_DONE, 'true');
        setStep(onboardingSteps.length);
        alert('Copia importada correctamente.');
      } catch (error) {
        console.error('Error importando copia JSON:', error);
        alert('No he podido importar este archivo. Usa un JSON exportado desde FinanzasFácil.');
      } finally {
        if (importInputRef.current) {
          importInputRef.current.value = '';
        }
      }
    };

    reader.readAsText(file);
  };

  const clearDeviceData = () => {
    const confirmed = window.confirm(
      'Esto borrará los datos de control de gastos guardados en este dispositivo. Antes de continuar, exporta un JSON si quieres conservar una copia. ¿Borrar ahora?'
    );

    if (!confirmed) return;

    [
      STORAGE_KEY_EXPENSES,
      STORAGE_KEY_INCOMES,
      STORAGE_KEY_CATEGORIES,
      STORAGE_KEY_STREAK,
      STORAGE_KEY_POINTS,
      STORAGE_KEY_ONBOARDING,
      STORAGE_KEY_ONBOARDING_DONE,
      STORAGE_KEY_CHALLENGES,
      STORAGE_KEY_GOALS,
    ].forEach((key) => localStorage.removeItem(key));

    setData(defaultData);
    setExpenses([]);
    setIncomes([]);
    setCategories(baseCategories);
    setGoals([]);
    setChallengeProgress({});
    setPoints(0);
    setStep(0);
    alert('Datos borrados de este dispositivo.');
  };

  const escapeCsv = (value: string | number) => {
    const text = String(value ?? '');
    return `"${text.replace(/"/g, '""')}"`;
  };

  const exportCsv = () => {
    const rows = [
      ['fecha', 'tipo', 'categoria_o_fuente', 'importe', 'nota', 'recurrente', 'etiqueta'],
      ['perfil', 'ingreso_base', 'Salario base', data.monthlyIncome, '', '', ''],
      ...Object.entries(data.fixedExpenses).map(([category, amount]) => [
        'perfil',
        'gasto_fijo',
        category,
        amount,
        '',
        'si',
        '',
      ]),
      ...incomes.map((income) => [
        income.date,
        'ingreso',
        income.source,
        income.amount,
        '',
        '',
        '',
      ]),
      ...expenses.map((expense) => [
        expense.date,
        'gasto',
        expense.category,
        expense.amount,
        expense.note || '',
        expense.recurrent ? 'si' : 'no',
        expense.tag || '',
      ]),
      ...goals.map((goal) => [
        goal.createdAt.split('T')[0],
        'objetivo',
        goal.title,
        goal.targetAmount,
        `ahorrado: ${goal.savedAmount}`,
        '',
        goal.icon,
      ]),
    ];

    const csv = rows.map((row) => row.map(escapeCsv).join(',')).join('\n');
    downloadFile(
      `finanzasfacil-transacciones-${new Date().toISOString().split('T')[0]}.csv`,
      csv,
      'text/csv;charset=utf-8'
    );
  };

  const exportMonthlyPdf = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString('es-ES');
    const topLeak = leakageInsights[0]?.title || 'Sin fugas claras este mes';

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Informe mensual - FinanzasFacil', 14, 18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Generado el ${today}. Datos guardados localmente en tu dispositivo.`, 14, 26);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen', 14, 40);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Ingresos del mes: ${formatCurrency(totalIncome)}`, 14, 50);
    doc.text(`Gastos del mes: ${formatCurrency(totalExpenses)}`, 14, 58);
    doc.text(`Dinero tranquilo: ${formatCurrency(calmMoney)}`, 14, 66);
    doc.text(`Ahorro objetivo: ${formatCurrency(data.savingsGoal)}`, 14, 74);
    doc.text(`Objetivos: ${formatCurrency(goalsTotalSaved)} de ${formatCurrency(goalsTotalTarget)}`, 14, 82);

    doc.setFont('helvetica', 'bold');
    doc.text('Diagnóstico en lenguaje humano', 14, 96);
    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(monthlyDiagnosis, 180), 14, 106);

    doc.setFont('helvetica', 'bold');
    doc.text('Principal fuga detectada', 14, 124);
    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(topLeak, 180), 14, 134);

    doc.setFont('helvetica', 'bold');
    doc.text('Reto sugerido', 14, 154);
    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(activeChallenges[0].title + ': ' + activeChallenges[0].description, 180), 14, 164);

    doc.save(`finanzasfacil-informe-mensual-${new Date().toISOString().split('T')[0]}.pdf`);
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
    if (!hasAnsweredToday()) {
      const hasSeenNotification = localStorage.getItem('ff_quiz_notification_seen_' + new Date().toDateString());
      if (!hasSeenNotification) {
        setTimeout(() => {
          setShowQuizNotification(true);
        }, 3000); // Mostrar después de 3 segundos
      }
    }
  }, []);

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
      className={`min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden ${
        shouldShowNativeBanner ? 'pb-24' : ''
      }`}
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-full bg-yellow-300 px-6 py-4 text-3xl font-black text-slate-950 shadow-2xl animate-bounce">OK</div>
            <div className="absolute -top-4 -right-4 h-5 w-5 rounded-full bg-cyan-300 animate-ping" />
            <div className="absolute -bottom-4 -left-4 h-5 w-5 rounded-full bg-pink-300 animate-ping" />
          </div>
        </div>
      )}


      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative">
        {!isNativeApp && (
          <div className="absolute left-2 z-10" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)' }}>
            <button
              onClick={handleBack}
              className="cursor-pointer flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-105"
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="text-sm">Volver</span>
            </button>
          </div>
        )}
        
        {!isNativeApp && <div className="absolute right-4 z-10" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}>
          <button
            onClick={() => setShowDonation(true)}
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30 text-white hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 shadow-lg hover:scale-105"
            aria-label="Donar a través de PayPal"
          >
            <span className="text-xs font-black">€</span>
          </button>
        </div>}

        <div className="text-center py-4" style={{ paddingTop: isNativeApp ? 'calc(env(safe-area-inset-top, 0px) + 2rem)' : '3rem' }}>
          <h1 className="text-2xl md:text-3xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Control de Gastos
          </h1>
          <p className="text-white/90 text-sm font-medium animate-pulse">{currentMotivationalQuote}</p>
          <div className="mt-1 text-xs text-white/80">
            Guardado en este dispositivo
          </div>
        </div>
      </div>

      {/* Stats Cards - Reemplaza la barra de progreso */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        {step < onboardingSteps.length ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="text-sm font-bold text-white">Paso {step + 1} de {onboardingSteps.length}</div>
              <div className="text-sm font-black text-yellow-300">{progress}%</div>
            </div>
            <div className="h-3 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-green-300 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
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
        )}
      </div>

      {/* Onboarding Steps */}
      <div className="max-w-xl mx-auto p-4 space-y-6">
        {step < onboardingSteps.length && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/20">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white/80 border border-white/15 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Atrás
              </button>
              <div className="text-xs font-semibold text-white/55">Puedes cambiarlo después</div>
            </div>

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-200/35 bg-cyan-400/15 text-center text-sm font-black text-cyan-100 shadow-xl">
              {onboardingSteps[step].icon}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center leading-tight">
              {onboardingSteps[step].title}
            </h2>
            
            <p className="text-base md:text-xl text-white/90 mb-6 leading-relaxed text-center">
              {onboardingSteps[step].description}
            </p>

            {onboardingSteps[step].bullets && (
              <div className="mb-6 space-y-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-left">
                {onboardingSteps[step].bullets.map((bullet) => (
                  <div key={bullet} className="flex gap-3 text-sm md:text-base text-white/85 leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-300" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            )}

            {onboardingSteps[step].choices && onboardingSteps[step].field && (
              <div className="mb-8 grid grid-cols-1 gap-3">
                {onboardingSteps[step].choices.map((choice) => {
                  const selected = getChoiceValue(onboardingSteps[step].field!) === choice.value;

                  return (
                    <button
                      key={choice.value}
                      type="button"
                      onClick={() => setChoiceValue(onboardingSteps[step].field!, choice.value)}
                      className={`rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                        selected
                          ? 'border-yellow-300 bg-yellow-300/20 text-white shadow-xl'
                          : 'border-white/20 bg-white/10 text-white hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${selected ? 'text-yellow-300' : 'text-white/45'}`} />
                        <span>
                          <span className="block text-base font-black">{choice.label}</span>
                          <span className="mt-1 block text-sm text-white/70">{choice.description}</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

        {/* Slider para campos numéricos */}
        {onboardingSteps[step].field && 
         onboardingSteps[step].field !== 'location' && 
         !onboardingSteps[step].choices &&
         onboardingSteps[step].field !== null && (
          <div className="mb-8">
            <input
              type="range"
              min={onboardingSteps[step].field === 'age' ? 18 : 0}
              max={
                onboardingSteps[step].field === 'age'
                  ? 80
                  : onboardingSteps[step].field === 'monthlyIncome'
                  ? 6000
                  : onboardingSteps[step].field === 'savingsGoal'
                  ? 2000
                  : 1500
              }
              step={onboardingSteps[step].field === 'age' ? 1 : 10}
              value={
                onboardingSteps[step].field === 'monthlyIncome' 
                  ? data.monthlyIncome 
                  : onboardingSteps[step].field === 'savingsGoal'
                  ? data.savingsGoal
                  : onboardingSteps[step].field === 'age'
                  ? data.age
                  : (data.fixedExpenses as any)[onboardingSteps[step].field!]
              }
              onChange={(e) => {
                const value = Number(e.target.value);
                if (onboardingSteps[step].field === 'monthlyIncome') {
                  setData((d) => ({ ...d, monthlyIncome: value }));
                } else if (onboardingSteps[step].field === 'savingsGoal') {
                  setData((d) => ({ ...d, savingsGoal: value }));
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
                      : onboardingSteps[step].field === 'savingsGoal'
                      ? data.savingsGoal
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
                { key: 'madrid', label: 'Madrid', icon: 'MD' },
                { key: 'barcelona', label: 'Barcelona', icon: 'BC' },
                { key: 'valencia', label: 'Valencia', icon: 'VA' },
                { key: 'sevilla', label: 'Sevilla', icon: 'SV' },
                { key: 'bilbao', label: 'Bilbao', icon: 'BI' },
                { key: 'other', label: 'Otras regiones', icon: 'OR' }
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
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-black">{region.icon}</div>
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
                  <div className="text-2xl font-black text-white mb-2">Resumen de tu perfil</div>
                  <div className="text-white/80">Ingresos: {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(data.monthlyIncome)}</div>
                  <div className="text-white/80">Gastos totales: {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(fixedTotal)}</div>
                  <div className="text-green-400 font-bold text-xl">Te quedan: {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(monthlyLeft)}</div>
                  <div className="mt-4 rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-4 text-left">
                    <div className="text-xs font-black uppercase tracking-wide text-yellow-200">Tu prioridad nº1</div>
                    <div className="mt-1 text-xl font-black text-white">{priorityInfo.label}</div>
                    <p className="mt-2 text-sm text-white/75">{priorityInfo.detail}</p>
                  </div>
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
                    localStorage.setItem(STORAGE_KEY_ONBOARDING_DONE, 'true');
                    setStep(onboardingSteps.length);
                  }
                }}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold text-lg sm:text-xl px-8 py-4 rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
              >
                {step < onboardingSteps.length - 1 ? 'Siguiente' : 'Ir al dashboard'}
              </button>
              
              <button
                onClick={() => {
                  localStorage.setItem(STORAGE_KEY_ONBOARDING_DONE, 'true');
                  setStep(onboardingSteps.length);
                }}
                className="text-white/80 hover:text-white w-full text-sm underline transition-colors"
              >
                Saltar configuración
              </button>
            </div>

            <div className="text-white/60 text-sm max-w-2xl mx-auto mt-6 text-center">
              <strong>Tip:</strong> Estos valores son aproximados y puedes modificarlos en cualquier momento desde el dashboard
            </div>
          </div>
        )}
      </div>

      {/* Dashboard ampliado */}
      {step >= onboardingSteps.length && (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
              <div>
                <div className="font-bold text-white">Privado por defecto</div>
                <div className="text-sm text-white/75">
                  Tus datos se guardan en este dispositivo. Exportar, importar y borrar están al final en Datos y copia de seguridad.
                </div>
              </div>
            </div>
          </div>

          <section className={`bg-gradient-to-r ${priorityInfo.tone} backdrop-blur-lg rounded-3xl p-5 shadow-2xl border`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="rounded-2xl bg-white/15 p-3 border border-white/20">
                  <Target className="h-6 w-6 text-yellow-200" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-yellow-100">Tu prioridad nº1</div>
                  <div className="text-2xl font-black text-white leading-tight">{priorityInfo.title}</div>
                  <p className="mt-2 text-sm text-white/75">{priorityInfo.detail}</p>
                </div>
              </div>
              <div className="shrink-0 rounded-2xl bg-white/10 px-4 py-3 text-left border border-white/20 sm:text-right">
                <div className="text-xs font-black uppercase tracking-wide text-white/55">Reto recomendado</div>
                <div className="text-sm font-black text-white">{priorityInfo.challengeTitle}</div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handlePriorityAction}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-base font-black text-slate-900 shadow-xl transition-all duration-300 hover:scale-[1.01]"
              >
                <Zap className="h-5 w-5 text-orange-500" />
                {priorityInfo.action}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (challengeProgress[priorityInfo.challengeId]?.status === 'available' || !challengeProgress[priorityInfo.challengeId]) {
                    startChallenge(priorityInfo.challengeId);
                  }
                  setShowChallengesPanel(true);
                  document.querySelector('[data-challenges-section]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-4 text-base font-black text-white border border-white/20 transition-colors hover:bg-white/20"
              >
                <Trophy className="h-5 w-5 text-yellow-200" />
                Activar reto
              </button>
            </div>
          </section>

          <div className="bg-gradient-to-r from-slate-900/70 to-blue-900/60 backdrop-blur-lg rounded-3xl p-5 shadow-2xl border border-white/20">
            <div className="mb-4">
              <div className="text-sm font-bold text-cyan-200">Primeros pasos</div>
              <div className="text-2xl font-black text-white">Qué hacer ahora</div>
              <p className="mt-1 text-sm text-white/70">
                Usa la app como una libreta simple: registra gastos, mira tu margen y revisa el mes sin tocar ajustes avanzados.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => openExpenseModal()}
                className="flex items-center gap-3 rounded-2xl bg-orange-500/25 px-4 py-4 text-left text-white border border-orange-300/30 hover:bg-orange-500/35 transition-colors"
              >
                <PlusCircle className="h-6 w-6 shrink-0 text-orange-200" />
                <span>
                  <span className="block font-black">Añadir gasto</span>
                  <span className="block text-xs text-white/70">Importe, categoría y listo.</span>
                </span>
              </button>
              <button
                onClick={() => document.querySelector('[data-month-section]')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="flex items-center gap-3 rounded-2xl bg-blue-500/20 px-4 py-4 text-left text-white border border-blue-300/30 hover:bg-blue-500/30 transition-colors"
              >
                <BarChart3 className="h-6 w-6 shrink-0 text-blue-200" />
                <span>
                  <span className="block font-black">Ver mi mes</span>
                  <span className="block text-xs text-white/70">Diagnóstico y evolución.</span>
                </span>
              </button>
              <button
                onClick={() => setShowAddGoalModal(true)}
                className="flex items-center gap-3 rounded-2xl bg-cyan-500/20 px-4 py-4 text-left text-white border border-cyan-300/30 hover:bg-cyan-500/30 transition-colors"
              >
                <Flag className="h-6 w-6 shrink-0 text-cyan-200" />
                <span>
                  <span className="block font-black">Crear objetivo</span>
                  <span className="block text-xs text-white/70">Pon nombre al ahorro.</span>
                </span>
              </button>
              <button
                onClick={() => document.querySelector('[data-backup-section]')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-4 text-left text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                <Download className="h-6 w-6 shrink-0 text-white/80" />
                <span>
                  <span className="block font-black">Exportar datos</span>
                  <span className="block text-xs text-white/70">Al final de la pantalla.</span>
                </span>
              </button>
            </div>
          </div>

          <section className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-blue-500/20 backdrop-blur-lg rounded-3xl p-5 shadow-2xl border border-emerald-200/25">
            <button
              type="button"
              onClick={() => setShowCalmPlanPanel(!showCalmPlanPanel)}
              className="w-full text-left"
              aria-expanded={showCalmPlanPanel}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-2xl bg-emerald-300/20 p-3 border border-emerald-200/30">
                    <ShieldCheck className="h-6 w-6 text-emerald-200" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-emerald-100">Plan de calma</div>
                    <div className="text-xl font-black text-white leading-tight">{calmPlan.title}</div>
                    <p className="mt-1 text-sm text-white/70">{calmPlan.detail}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white border border-white/20">
                  {showCalmPlanPanel ? 'Ocultar' : 'Ver'}
                </span>
              </div>
            </button>

            {showCalmPlanPanel && (
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
                    <div className="text-xs font-black uppercase tracking-wide text-emerald-100">1. Margen</div>
                    <div className="mt-2 text-2xl font-black text-white">{formatCurrency(calmMoney)}</div>
                    <p className="mt-1 text-sm text-white/70">
                      Dinero tranquilo después de gastos registrados y objetivo de ahorro.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
                    <div className="text-xs font-black uppercase tracking-wide text-emerald-100">2. Colchón</div>
                    <div className="mt-2 text-2xl font-black text-white">{emergencyProgress}%</div>
                    <div className="mt-3 h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                        style={{ width: `${emergencyProgress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-white/70">
                      {formatCurrency(emergencySaved)} de {formatCurrency(emergencyTarget)} aproximados.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
                    <div className="text-xs font-black uppercase tracking-wide text-emerald-100">3. Deuda</div>
                    <div className="mt-2 text-2xl font-black text-white">
                      {currentDebtTotal > 0 ? formatCurrency(currentDebtTotal) : 'Sin cuotas'}
                    </div>
                    <p className="mt-1 text-sm text-white/70">
                      {currentDebtTotal > 0
                        ? `${debtPressure.toFixed(0)}% de tus ingresos registrados este mes.`
                        : 'Si pagas tarjeta, préstamo o compra aplazada, puedes registrarlo como cuota.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => openExpenseModal()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-4 text-base font-black text-white shadow-xl transition-all duration-300 hover:scale-[1.01]"
                  >
                    <PlusCircle className="h-5 w-5" />
                    Añadir gasto
                  </button>
                  <button
                    type="button"
                    onClick={openEmergencyGoalModal}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-4 text-base font-black text-white border border-white/20 transition-colors hover:bg-white/20"
                  >
                    <Flag className="h-5 w-5" />
                    Fondo emergencia
                  </button>
                  <button
                    type="button"
                    onClick={openDebtExpenseModal}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-4 text-base font-black text-white border border-white/20 transition-colors hover:bg-white/20"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    Registrar cuota
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-indigo-500/20 backdrop-blur-lg rounded-3xl p-5 shadow-2xl border border-cyan-200/25">
            <button
              type="button"
              onClick={() => setShowWeekPanel(!showWeekPanel)}
              className="w-full text-left"
              aria-expanded={showWeekPanel}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-2xl bg-cyan-300/20 p-3 border border-cyan-200/30">
                    <CalendarCheck className="h-6 w-6 text-cyan-200" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-cyan-100">Esta semana</div>
                    <div className="text-xl font-black text-white leading-tight">
                      {weeklyRemaining >= 0 ? `Quedan ${formatCurrency(weeklyRemaining)}` : `${formatCurrency(Math.abs(weeklyRemaining))} por encima`}
                    </div>
                    <p className="mt-1 text-sm text-white/70">{weeklyInsight}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white border border-white/20">
                  {showWeekPanel ? 'Ocultar' : 'Ver'}
                </span>
              </div>
            </button>

            {showWeekPanel && (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="text-xs font-black uppercase tracking-wide text-cyan-100">Ritmo semanal</div>
                      <div className="text-sm text-white/60">
                        De lunes a domingo
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">{weekProgress}%</div>
                      <div className="text-xs text-white/60">usado</div>
                    </div>
                  </div>
                  <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${weeklyRemaining >= 0 ? 'bg-gradient-to-r from-cyan-300 to-emerald-300' : 'bg-gradient-to-r from-orange-400 to-red-500'}`}
                      style={{ width: `${Math.min(100, weekProgress)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
                    <div className="text-xs font-black uppercase tracking-wide text-cyan-100">Presupuesto</div>
                    <div className="mt-2 text-2xl font-black text-white">{formatCurrency(weeklyCalmBudget)}</div>
                    <p className="mt-1 text-sm text-white/70">Estimado tras fijos y ahorro.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
                    <div className="text-xs font-black uppercase tracking-wide text-cyan-100">Gastado</div>
                    <div className="mt-2 text-2xl font-black text-white">{formatCurrency(currentWeekVariableTotal)}</div>
                    <p className="mt-1 text-sm text-white/70">{currentWeekExpenses.length} apunte{currentWeekExpenses.length === 1 ? '' : 's'} esta semana.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
                    <div className="text-xs font-black uppercase tracking-wide text-cyan-100">Al día</div>
                    <div className="mt-2 text-2xl font-black text-white">{formatCurrency(dailySafeSpend)}</div>
                    <p className="mt-1 text-sm text-white/70">Referencia hasta domingo.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => openExpenseModal()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-4 text-base font-black text-white shadow-xl transition-all duration-300 hover:scale-[1.01]"
                  >
                    <PlusCircle className="h-5 w-5" />
                    Añadir gasto de hoy
                  </button>
                  <button
                    type="button"
                    onClick={() => document.querySelector('[data-month-section]')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-4 text-base font-black text-white border border-white/20 transition-colors hover:bg-white/20"
                  >
                    <BarChart3 className="h-5 w-5" />
                    Ver mes completo
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Inicio / Hoy inspirado en el informe: una métrica estrella y diagnóstico inmediato */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div data-calm-money-section className="md:col-span-2 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-emerald-300/30">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="text-sm text-white/70 font-semibold">Métrica estrella</div>
                  <div className="text-2xl font-black text-white">Dinero tranquilo</div>
                </div>
                <ShieldCheck className="w-8 h-8 text-emerald-300" />
              </div>
              <div className="text-4xl font-black text-emerald-300 mb-2">{formatCurrency(calmMoney)}</div>
              <p className="text-sm text-white/80 leading-relaxed">
                Lo que queda tras gastos fijos, gastos variables registrados y tu objetivo de ahorro. Es tu margen para gastar sin liarte.
              </p>
              <button
                onClick={() => openExpenseModal()}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-4 text-base font-black text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:from-orange-600 hover:to-red-700 md:w-auto"
              >
                <PlusCircle className="h-5 w-5" />
                Añadir gasto
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-yellow-300" />
                <div className="font-bold text-white">Mayor fuga</div>
              </div>
              <div className="text-sm text-white/80 leading-relaxed">
                {leakageInsights[0]?.title || 'Aún no hay suficientes gastos variables para detectar fugas.'}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <CalendarCheck className="w-5 h-5 text-blue-300" />
                <div className="font-bold text-white">Este mes</div>
              </div>
              <div className="text-sm text-white/80 leading-relaxed">{monthlyDiagnosis}</div>
            </div>
	          </div>

	          <section className="bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-cyan-500/20 backdrop-blur-lg rounded-3xl p-5 shadow-2xl border border-amber-200/25">
	            <button
	              type="button"
	              onClick={() => setShowWeeklyReview(!showWeeklyReview)}
	              className="w-full text-left"
	              aria-expanded={showWeeklyReview}
	            >
	              <div className="flex items-center justify-between gap-3">
	                <div className="flex min-w-0 items-center gap-3">
	                  <div className="rounded-2xl bg-amber-300/20 p-3 border border-amber-200/30">
	                    <CalendarCheck className="h-6 w-6 text-amber-200" />
	                  </div>
	                  <div className="min-w-0">
	                    <div className="text-sm font-bold text-amber-100">Revisión semanal</div>
	                    <div className="text-2xl font-black text-white leading-tight">Reto gastos hormiga</div>
	                    <p className="mt-1 text-sm text-white/70">
	                      Un paso esta semana, sin revisar toda tu vida financiera.
	                    </p>
	                  </div>
	                </div>
	                <span className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white border border-white/20">
	                  {showWeeklyReview ? 'Ocultar' : 'Ver'}
	                </span>
	              </div>
	            </button>

	            {showWeeklyReview && (
	              <div className="mt-5 space-y-4">
	                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
	                  <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
	                    <div className="text-xs font-black uppercase tracking-wide text-amber-100">1. Mira</div>
	                    <div className="mt-2 text-lg font-black text-white">
	                      {weeklySmallExpenses.length > 0
	                        ? `${weeklySmallExpenses.length} gastos pequeños`
	                        : 'Sin gastos pequeños aún'}
	                    </div>
	                    <p className="mt-1 text-sm text-white/70">
	                      {weeklySmallExpenses.length > 0
	                        ? `Suman ${formatCurrency(weeklySmallExpensesTotal)} en los apuntes recientes.`
	                        : 'Cuando añadas cafés, Bizum o compras pequeñas aparecerán aquí.'}
	                    </p>
	                  </div>

	                  <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
	                    <div className="text-xs font-black uppercase tracking-wide text-amber-100">2. Elige</div>
	                    <div className="mt-2 text-lg font-black text-white">{weeklyFocusCategory}</div>
	                    <p className="mt-1 text-sm text-white/70">
	                      Quédate con una sola categoría. Mejor una mejora pequeña que un plan imposible.
	                    </p>
	                  </div>

	                  <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
	                    <div className="text-xs font-black uppercase tracking-wide text-amber-100">3. Decide</div>
	                    <div className="mt-2 text-lg font-black text-white">
	                      {weeklyReviewStatus === 'completed'
	                        ? 'Revisión completada'
	                        : weeklyReviewStatus === 'active'
	                          ? 'Reto en marcha'
	                          : 'Empieza 7 días'}
	                    </div>
	                    <p className="mt-1 text-sm text-white/70">
	                      Solo observa y apunta. La app te ayuda a ver patrones sin juzgarte.
	                    </p>
	                  </div>
	                </div>

	                {weeklySmallExpenses.length > 0 && (
	                  <div className="space-y-2 rounded-2xl bg-slate-950/20 p-4 border border-white/10">
	                    <div className="text-sm font-black text-white">Últimos gastos pequeños detectados</div>
	                    {weeklySmallExpenses.map((expense) => (
	                      <div key={expense.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3 py-2">
	                        <div className="min-w-0">
	                          <div className="truncate text-sm font-bold text-white">{expense.category}</div>
	                          <div className="truncate text-xs text-white/60">{expense.note || expense.date}</div>
	                        </div>
	                        <div className="shrink-0 text-sm font-black text-amber-100">{formatCurrency(expense.amount)}</div>
	                      </div>
	                    ))}
	                  </div>
	                )}

	                <div className="flex flex-col sm:flex-row gap-3">
	                  <button
	                    type="button"
	                    onClick={() => {
	                      if (weeklyReviewStatus === 'available') {
	                        startChallenge('gasto-consciente-7d');
	                      } else if (weeklyReviewStatus === 'active') {
	                        completeChallenge('gasto-consciente-7d', 250);
	                      }
	                    }}
	                    disabled={weeklyReviewStatus === 'completed'}
	                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-4 text-base font-black text-slate-950 shadow-xl transition-all duration-300 hover:scale-[1.01] disabled:cursor-default disabled:opacity-70 disabled:hover:scale-100"
	                  >
	                    <CheckCircle2 className="h-5 w-5" />
	                    {weeklyReviewStatus === 'completed'
	                      ? 'Reto completado'
	                      : weeklyReviewStatus === 'active'
	                        ? 'Marcar revisión hecha'
	                        : 'Empezar reto 7 días'}
	                  </button>
	                  <button
	                    type="button"
	                    onClick={() => {
	                      setNewExpenseForm({
	                        category: 'Bares/restaurantes',
	                        amount: '',
	                        note: 'Gasto hormiga',
	                        tag: 'gasto-hormiga',
	                        recurrent: false,
	                        isNewCategory: false,
	                      });
	                      setShowExpenseAdvanced(true);
	                      setShowAddExpenseModal(true);
	                    }}
	                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-4 text-base font-black text-white border border-white/20 transition-colors hover:bg-white/20"
	                  >
	                    <PlusCircle className="h-5 w-5" />
	                    Añadir gasto pequeño
	                  </button>
	                </div>
	              </div>
	            )}
	          </section>

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
                    {showIncomeDetails ? 'Ocultar' : 'Ver'}
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
                        <span className="rounded-md bg-green-400/20 px-2 py-1 text-xs font-black text-green-200">IN</span>
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
                    <div className="text-xs text-white/60 mt-1">Pulsa para editar</div>
                  </div>

                  {/* Lista de ingresos adicionales */}
                  {incomes.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs text-white/60 font-semibold">Ingresos adicionales:</div>
                      {incomes.map((income) => (
                        <div key={income.id} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-green-400/20 px-2 py-1 text-xs font-black text-green-200">EX</span>
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
                              x
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
                    Añadir nuevo ingreso
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
                    {showExpenseDetails ? 'Ocultar' : 'Ver'}
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
                      <div key={key} className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{getCategoryIcon(fixedExpenseLabels[key as keyof OnboardingData['fixedExpenses']] || 'Otros')}</span>
                            <span className="text-sm text-white">{fixedExpenseLabels[key as keyof OnboardingData['fixedExpenses']] || key}</span>
                          </div>
                          <div 
                            onClick={() => {
                              const label = fixedExpenseLabels[key as keyof OnboardingData['fixedExpenses']] || key;
                              const newAmount = parseFloat(prompt(`Nuevo valor para ${label}:`, value.toString()) || '0');
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
                        <div className="text-xs text-white/60 mt-1">Toca el importe para editar</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Lista de gastos variables */}
                  {expenses.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs text-white/60 font-semibold">Gastos variables:</div>
                      {expenses.map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-red-400/20 px-2 py-1 text-xs font-black text-red-100">{getCategoryIcon(expense.category)}</span>
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
                              x
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Botón para añadir nuevo gasto */}
                  <button
                    onClick={() => openExpenseModal()}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs py-2 px-3 rounded-lg transition-colors border border-red-400/30"
                  >
                    Añadir gasto rápido
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


	          {/* Mi mes */}
	          <div data-month-section className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-blue-300/30">
	            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
	              <button
	                type="button"
	                onClick={() => setShowMonthPanel(!showMonthPanel)}
	                className="flex flex-1 items-center gap-3 text-left"
	                aria-expanded={showMonthPanel}
	              >
	                <div className="p-3 bg-gradient-to-r from-blue-400 to-emerald-500 rounded-2xl">
	                  <BarChart3 className="w-5 h-5 text-white" />
	                </div>
	                <div>
	                  <div className="font-black text-2xl text-white">Mi mes</div>
	                  <div className="text-white/70 text-sm">Comparativa, evolución diaria y una lectura clara de tus gastos.</div>
	                </div>
	              </button>
	              <button
	                type="button"
	                onClick={() => setShowMonthPanel(!showMonthPanel)}
	                className={`rounded-2xl px-4 py-3 text-sm font-bold text-left ${
	                  monthExpenseDifference <= 0
	                    ? 'bg-green-500/20 text-green-100 border border-green-300/30'
	                    : 'bg-yellow-500/20 text-yellow-100 border border-yellow-300/30'
	                }`}
	              >
	                <span className="block">
	                  {previousMonthExpenses.length > 0
	                    ? monthExpenseDifference <= 0
	                      ? `${formatCurrency(Math.abs(monthExpenseDifference))} menos que el mes anterior`
	                      : `${formatCurrency(monthExpenseDifference)} más que el mes anterior`
	                    : 'Primera comparativa en marcha'}
	                </span>
	                <span className="block text-xs text-white/60">{showMonthPanel ? 'Ocultar detalle' : 'Ver detalle'}</span>
	              </button>
	            </div>

	            {showMonthPanel && (
	            <>
	            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <div className="text-xs text-white/60 font-semibold mb-1">Gasto del mes</div>
                <div className="text-2xl font-black text-red-300">{formatCurrency(currentMonthTotalExpenses)}</div>
                <div className="text-xs text-white/55 mt-1">Fijos + variables registrados</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <div className="text-xs text-white/60 font-semibold mb-1">Mes anterior</div>
                <div className="text-2xl font-black text-white">{formatCurrency(previousMonthTotalExpenses)}</div>
                <div className="text-xs text-white/55 mt-1">Misma base de gastos fijos</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <div className="text-xs text-white/60 font-semibold mb-1">Ahorro estimado</div>
                <div className={`text-2xl font-black ${monthSavingsEstimate >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {formatCurrency(monthSavingsEstimate)}
                </div>
                <div className="text-xs text-white/55 mt-1">Ingresos - gastos del mes</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <div className="text-xs text-white/60 font-semibold mb-1">Variación</div>
                <div className={`text-2xl font-black ${monthExpenseDifference <= 0 ? 'text-green-300' : 'text-yellow-300'}`}>
                  {previousMonthTotalExpenses > 0 ? `${Math.abs(monthExpensePercentage).toFixed(0)}%` : '—'}
                </div>
                <div className="text-xs text-white/55 mt-1">
                  {monthExpenseDifference <= 0 ? 'Mejor o igual' : 'Más gasto'}
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-white">Evolución diaria</div>
                <div className="text-xs text-white/60">{currentMonthKey}</div>
              </div>
              <div className="flex h-28 items-end gap-1 overflow-hidden">
                {dailyExpenseEvolution.map((day) => (
                  <div key={day.day} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1">
                    <div
                      className={`w-full rounded-t-md ${day.amount > 0 ? 'bg-gradient-to-t from-red-500 to-yellow-300' : 'bg-white/10'}`}
                      style={{ height: `${Math.max(day.amount > 0 ? 8 : 3, (day.amount / maxDailyExpense) * 100)}%` }}
                      title={`Día ${day.day}: ${formatCurrency(day.amount)}`}
                    />
                    {(day.day === 1 || day.day % 5 === 0) && (
                      <span className="text-[10px] text-white/40">{day.day}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

	            <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
	              <div className="font-bold text-white mb-2">Diagnóstico</div>
	              <p className="text-sm text-white/80 leading-relaxed">{monthlyInsight}</p>
	              <div className="mt-3 text-xs text-white/55">
	                Ingresos del mes: {formatCurrency(currentMonthIncomeTotal)} · Mes anterior: {formatCurrency(previousMonthIncomeTotal)}
	              </div>
	            </div>
	            </>
	            )}
	          </div>



	          {/* Gráfica de donut interactiva desglosada */}
	          <div data-goals-section className="bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-cyan-300/30">
	            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
	              <button
	                type="button"
	                onClick={() => setShowGoalsPanel(!showGoalsPanel)}
	                className="flex flex-1 items-center gap-3 text-left"
	                aria-expanded={showGoalsPanel}
	              >
	                <div className="p-3 bg-gradient-to-r from-indigo-400 to-cyan-500 rounded-2xl">
	                  <Flag className="w-5 h-5 text-white" />
	                </div>
	                <div>
	                  <div className="font-black text-2xl text-white">Objetivos</div>
	                  <div className="text-white/70 text-sm">
	                    {goals.length > 0
	                      ? `${goals.length} objetivo${goals.length > 1 ? 's' : ''} · ${formatCurrency(goalsTotalSaved)} ahorrados`
	                      : 'Pon nombre al ahorro cuando quieras.'}
	                  </div>
	                </div>
	              </button>
	              <div className="flex flex-col sm:flex-row gap-2">
	                <button
	                  type="button"
	                  onClick={() => setShowGoalsPanel(!showGoalsPanel)}
	                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white border border-white/15 transition-colors hover:bg-white/20"
	                >
	                  {showGoalsPanel ? 'Ocultar' : 'Ver'}
	                </button>
	                <button
	                  onClick={() => setShowAddGoalModal(true)}
	                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/20 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/30"
	                >
	                  <PlusCircle className="w-4 h-4" />
	                  Nuevo objetivo
	                </button>
	              </div>
	            </div>

	            {showGoalsPanel && (
	            <>
	            {goals.length > 0 ? (
	              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                    <div className="text-xs text-white/60 font-semibold mb-1">Ahorrado</div>
                    <div className="text-2xl font-black text-green-300">{formatCurrency(goalsTotalSaved)}</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                    <div className="text-xs text-white/60 font-semibold mb-1">Meta total</div>
                    <div className="text-2xl font-black text-white">{formatCurrency(goalsTotalTarget)}</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                    <div className="text-xs text-white/60 font-semibold mb-1">Próximo foco</div>
                    <div className="text-lg font-black text-cyan-200">{nextGoal?.title || 'Sin objetivo'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {goals.map((goal) => {
                    const progress = goal.targetAmount > 0 ? Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100)) : 0;
                    const remaining = Math.max(0, goal.targetAmount - goal.savedAmount);

                    return (
                      <div key={goal.id} className="bg-white/10 rounded-2xl p-4 border border-white/20">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15 text-sm font-black text-cyan-100">{goal.icon}</div>
                            <div>
                              <div className="font-bold text-white">{goal.title}</div>
                              <div className="text-xs text-white/55">Faltan {formatCurrency(remaining)}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="text-xs text-white/40 hover:text-red-200"
                            aria-label={`Eliminar objetivo ${goal.title}`}
                          >
                            x
                          </button>
                        </div>
                        <div className="h-3 rounded-full bg-white/10 overflow-hidden mb-2">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-white/65 mb-3">
                          <span>{formatCurrency(goal.savedAmount)} de {formatCurrency(goal.targetAmount)}</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="flex gap-2">
                          {[25, 50, 100].map((amount) => (
                            <button
                              key={amount}
                              onClick={() => addToGoal(goal.id, amount)}
                              className="flex-1 rounded-xl bg-white/15 px-2 py-2 text-xs font-bold text-white hover:bg-white/25"
                            >
                              +{amount}€
                            </button>
                          ))}
                          <button
                            onClick={() => {
                              const amount = parseFloat(prompt('Importe ahorrado total:', goal.savedAmount.toString()) || '');
                              if (!isNaN(amount)) updateGoalSaved(goal.id, amount);
                            }}
                            className="flex-1 rounded-xl bg-cyan-500/30 px-2 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-500/40"
                          >
                            Editar
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
                <Flag className="mx-auto mb-3 h-12 w-12 text-cyan-200" />
                <div className="font-bold text-white mb-2">Crea tu primer objetivo</div>
                <div className="text-sm text-white/70 mb-4">Controlar gastos motiva más cuando sabes para qué estás ahorrando.</div>
                <button
                  onClick={() => setShowAddGoalModal(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-600"
                >
                  <PlusCircle className="w-4 h-4" />
                  Crear objetivo
	                </button>
	              </div>
	            )}
	            </>
	            )}
	          </div>

	          {/* Gráfica de donut interactiva desglosada */}
	          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20">
	            <button
	              type="button"
	              onClick={() => setShowBreakdownPanel(!showBreakdownPanel)}
	              className="flex w-full items-center justify-between gap-3 text-left"
	              aria-expanded={showBreakdownPanel}
	            >
	              <div className="flex items-center gap-2">
	                <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl">
	                  <Target className="w-4 h-4 text-white"/>
	                </div>
	                <div>
	                  <div className="font-bold text-lg text-white">Resumen desglosado</div>
	                  <div className="text-xs text-white/60">Ingresos y gastos por categoría</div>
	                </div>
	              </div>
	              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white border border-white/15">
	                {showBreakdownPanel ? 'Ocultar' : 'Ver'}
	              </span>
	            </button>
	            
	            {showBreakdownPanel && (
	            <>
	            {/* Selector de vista */}
	            <div className="flex justify-center my-4">
	              <div className="bg-white/10 rounded-xl p-1 flex gap-1">
                <button
                  onClick={() => setShowIncomeDetails(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    showIncomeDetails 
                      ? 'bg-green-400 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Ingresos
                </button>
                <button
                  onClick={() => setShowExpenseDetails(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    showExpenseDetails 
                      ? 'bg-red-400 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Gastos
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
                        <BarChart3 className="mx-auto mb-2 h-10 w-10 text-white/45" />
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
	              Haz clic en cualquier sección para ver detalles específicos
	            </div>
	            </>
	            )}
	          </div>

	          {/* Fugas de dinero */}
	          <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-amber-300/30">
	            <button
	              type="button"
	              onClick={() => setShowLeaksPanel(!showLeaksPanel)}
	              className="flex w-full items-center justify-between gap-3 text-left"
	              aria-expanded={showLeaksPanel}
	            >
	              <div className="flex items-center gap-3">
	                <div className="p-3 bg-gradient-to-r from-amber-400 to-red-500 rounded-2xl">
	                  <AlertTriangle className="w-5 h-5 text-white" />
	                </div>
	                <div>
	                  <div className="font-black text-2xl text-white">Fugas de dinero</div>
	                  <div className="text-white/70 text-sm">
	                    {leakageInsights[0]?.title || 'Pequeñas pistas para decidir qué revisar este mes.'}
	                  </div>
	                </div>
	              </div>
	              <span className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white border border-white/15">
	                {showLeaksPanel ? 'Ocultar' : 'Ver'}
	              </span>
	            </button>
	            {showLeaksPanel && (
	            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
	              {leakageInsights.length > 0 ? leakageInsights.slice(0, 4).map((insight) => (
                <div key={insight.title} className="bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="font-bold text-white">{insight.title}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      insight.severity === 'alta'
                        ? 'bg-red-500/30 text-red-100'
                        : insight.severity === 'media'
                        ? 'bg-yellow-500/30 text-yellow-100'
                        : 'bg-blue-500/30 text-blue-100'
                    }`}>
                      {insight.severity}
                    </span>
                  </div>
                  <div className="text-sm text-white/75">{insight.detail}</div>
                </div>
              )) : (
                <div className="md:col-span-2 text-center text-white/75 bg-white/10 rounded-2xl p-6">
                  Añade algunos gastos variables para que la app detecte suscripciones, gastos hormiga, compras online o posibles duplicados.
	                </div>
	              )}
	            </div>
	            )}
	          </div>

	          {/* Retos de ahorro */}
	          <div data-challenges-section className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-green-300/30">
	            <button
	              type="button"
	              onClick={() => setShowChallengesPanel(!showChallengesPanel)}
	              className="flex w-full items-center justify-between gap-3 text-left"
	              aria-expanded={showChallengesPanel}
	            >
	              <div className="flex items-center gap-3">
	                <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl">
	                  <Trophy className="w-5 h-5 text-white" />
	                </div>
	                <div>
	                  <div className="font-black text-2xl text-white">Retos amables</div>
	                  <div className="text-white/70 text-sm">Hábitos pequeños para revisar gastos sin castigarte.</div>
	                </div>
	              </div>
	              <span className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white border border-white/15">
	                {showChallengesPanel ? 'Ocultar' : 'Ver'}
	              </span>
	            </button>
	            {showChallengesPanel && (
	            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
	              {activeChallenges.map((challenge) => {
                const progressState = challengeProgress[challenge.id]?.status || 'available';
                const startedAt = challengeProgress[challenge.id]?.startedAt;

                return (
                <div
                  key={challenge.id}
                  className={`bg-white/10 rounded-2xl p-4 border transition-all ${
                    progressState === 'completed'
                      ? 'border-green-300/50 bg-green-500/15'
                      : progressState === 'active'
                      ? 'border-blue-300/50 bg-blue-500/10'
                      : 'border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-white">{challenge.title}</div>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
                      progressState === 'completed'
                        ? 'bg-green-500/30 text-green-100'
                        : progressState === 'active'
                        ? 'bg-blue-500/30 text-blue-100'
                        : 'bg-white/10 text-white/70'
                    }`}>
                      {progressState === 'completed' ? 'Completado' : progressState === 'active' ? 'En marcha' : challenge.duration}
                    </span>
                  </div>
                  <div className="text-sm text-white/75 mb-3">{challenge.description}</div>
                  {startedAt && progressState !== 'completed' && (
                    <div className="text-xs text-white/50 mb-3">
                      Empezado: {new Date(startedAt).toLocaleDateString('es-ES')}
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-green-200 font-bold">+{challenge.reward} puntos</div>
                    {progressState === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-300" />
                    ) : progressState === 'active' ? (
                      <button
                        onClick={() => completeChallenge(challenge.id, challenge.reward)}
                        className="rounded-xl bg-green-500 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-green-600"
                      >
                        Completar
                      </button>
                    ) : (
                      <button
                        onClick={() => startChallenge(challenge.id)}
                        className="rounded-xl bg-white/20 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-white/30"
                      >
                        Empezar
                      </button>
                    )}
                  </div>
                </div>
	              )})}
	            </div>
	            )}
	          </div>

          {/* Quiz Diario */}
          <div data-quiz-section>
          {!hasAnsweredToday() && (
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-purple-400/30">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl">
                  <Brain className="w-4 h-4 text-white"/>
                </div>
                <div className="font-bold text-lg text-white">Pregunta del Día</div>
              </div>
              
              {/* Info de la pregunta */}
              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded-full">{dailyQuestion.category}</span>
                <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded-full">{dailyQuestion.difficulty}</span>
              </div>
              
              {/* Mensaje motivador */}
              <div className="bg-white/10 rounded-xl p-3 mb-4">
                <div className="text-center text-white/90 text-sm font-semibold">
                  Aprende algo nuevo cada día
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
                      {i === dailyQuestion.correct && <CheckCircle2 className="ml-2 inline h-4 w-4 text-green-200" />}
                      {i === selectedAnswer && i !== dailyQuestion.correct && <span className="ml-2 font-black text-red-200">X</span>}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="text-white/80 text-xs text-center">
                <div className="mb-1">+100 puntos por acierto • Racha actual: {quizStreak} días</div>
                <div className="text-yellow-400 font-bold text-sm">Mantén tu racha de aprendizaje</div>
              </div>
              
              {/* Explicación educativa */}
              {showQuizExplanation && (
                <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-blue-300"/>
                    <span className="font-semibold text-blue-200">Explicación</span>
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
                <div className="font-bold text-lg text-white">Ya respondiste hoy</div>
              </div>
              <div className="text-white/90 text-sm mb-3">
                Has completado la pregunta del día. ¡Vuelve mañana para aprender algo nuevo!
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-sm mb-2">Racha actual: {quizStreak} días</div>
                <div className="text-white/70 text-xs">
                  Próxima pregunta: mañana a las 00:00
                </div>
              </div>
            </div>
          )}
          </div>


	          {/* Comparativas regionales */}
	          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-indigo-400/30">
	            <button
	              type="button"
	              onClick={() => setShowRegionalPanel(!showRegionalPanel)}
	              className="flex w-full items-center justify-between gap-3 text-left"
	              aria-expanded={showRegionalPanel}
	            >
	              <div className="flex items-center gap-3">
	                <div className="p-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl">
	                  <Target className="w-6 h-6 text-white"/>
	                </div>
	                <div>
	                  <div className="font-black text-2xl text-white">Comparativa regional</div>
	                  <div className="text-white/70 text-sm">
	                    Referencia orientativa para {data.location === 'madrid' ? 'Madrid' : data.location === 'barcelona' ? 'Barcelona' : data.location === 'valencia' ? 'Valencia' : data.location === 'sevilla' ? 'Sevilla' : data.location === 'bilbao' ? 'Bilbao' : 'tu región'}.
	                  </div>
	                </div>
	              </div>
	              <span className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white border border-white/15">
	                {showRegionalPanel ? 'Ocultar' : 'Ver'}
	              </span>
	            </button>
	            
	            {showRegionalPanel && (
	            <>
	            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
	              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-black text-white mb-2">Ingresos</div>
                  <div className="text-3xl font-black text-green-400">{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(totalIncome)}</div>
                  <div className="text-sm text-white/80">vs {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(regionalComparison.income.regional)} regional</div>
                </div>
                <div className={`text-center text-lg font-bold ${regionalComparison.income.difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {regionalComparison.income.difference >= 0 ? '↑' : '↓'} {Math.abs(regionalComparison.income.percentage).toFixed(1)}%
                </div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-black text-white mb-2">Gastos</div>
                  <div className="text-3xl font-black text-red-400">{new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(totalExpenses)}</div>
                  <div className="text-sm text-white/80">vs {new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(regionalComparison.expenses.regional)} regional</div>
                </div>
                <div className={`text-center text-lg font-bold ${regionalComparison.expenses.difference <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {regionalComparison.expenses.difference <= 0 ? '↓' : '↑'} {Math.abs(regionalComparison.expenses.percentage).toFixed(1)}%
                </div>
              </div>
            </div>

	            <div className="text-center text-white/80 text-sm">
	              Comparación con {data.location === 'madrid' ? 'Madrid' : data.location === 'barcelona' ? 'Barcelona' : data.location === 'valencia' ? 'Valencia' : data.location === 'sevilla' ? 'Sevilla' : data.location === 'bilbao' ? 'Bilbao' : 'tu región'}
	            </div>
	            </>
	            )}
	          </div>

          {/* Píldora */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-400/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl">
                <Gift className="w-6 h-6 text-white"/>
              </div>
              <div className="font-black text-2xl text-white">Píldora de aprendizaje</div>
            </div>
            <div className="text-white/90 text-lg leading-relaxed">{currentTip}</div>
          </div>

	          {/* Aprende */}
	          <div data-learn-section className="bg-gradient-to-r from-sky-500/20 to-violet-500/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-sky-300/30">
	            <button
	              type="button"
	              onClick={() => setShowLearnPanel(!showLearnPanel)}
	              className="flex w-full items-center justify-between gap-3 text-left"
	              aria-expanded={showLearnPanel}
	            >
	              <div className="flex items-center gap-3">
	                <div className="p-3 bg-gradient-to-r from-sky-400 to-violet-500 rounded-2xl">
	                  <Brain className="w-5 h-5 text-white" />
	                </div>
	                <div>
	                  <div className="font-black text-2xl text-white">Aprende en 2 minutos</div>
	                  <div className="text-white/70 text-sm">{learningLessons[0]?.title || 'Una explicación corta para decidir el siguiente paso.'}</div>
	                </div>
	              </div>
	              <span className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white border border-white/15">
	                {showLearnPanel ? 'Ocultar' : 'Ver'}
	              </span>
	            </button>
	            {showLearnPanel && (
	            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
	              {learningLessons.map((lesson) => (
                <div key={lesson.title} className="bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="font-black text-white mb-2">{lesson.title}</div>
                  <p className="text-sm text-white/75 leading-relaxed mb-3">{lesson.detail}</p>
                  <div className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-cyan-100 border border-white/15">
                    {lesson.action}
                  </div>
	                </div>
	              ))}
	            </div>
	            )}
	          </div>

          {/* Lista de transacciones */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl">
                <Trophy className="w-6 h-6 text-white"/>
              </div>
              <div className="font-black text-2xl text-white">Últimas transacciones</div>
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
                        {item.type === 'income' ? 'IN' : 'GA'}
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">
                          {item.type === 'income' ? (item as IncomeItem).source : (item as ExpenseItem).category}
                        </div>
                        <div className="text-sm text-white/70">
                          {new Date(item.date).toLocaleDateString('es-ES')}
                          {item.type === 'expense' && (item as ExpenseItem).recurrent ? ' · recurrente' : ''}
                          {item.type === 'expense' && (item as ExpenseItem).tag ? ` · ${(item as ExpenseItem).tag}` : ''}
                        </div>
                        {item.type === 'expense' && (item as ExpenseItem).note && (
                          <div className="text-xs text-white/50 mt-1">{(item as ExpenseItem).note}</div>
                        )}
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
                  <FileText className="mx-auto mb-4 h-12 w-12 text-white/35" />
                  <div className="text-white/70 text-lg">Aún no has añadido transacciones.</div>
                  <div className="text-white/50 text-sm mt-2">¡Añade tu primer gasto o ingreso para empezar a ganar puntos!</div>
                </div>
              )}
            </div>
          </div>

          <div data-backup-section className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 shadow-2xl border border-white/20">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="font-black text-2xl text-white">Datos y copia de seguridad</div>
                <div className="text-sm text-white/70">
                  Herramientas de mantenimiento. Normalmente no las necesitas en el día a día.
                </div>
              </div>
            </div>

            <input
              ref={importInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) importJsonFile(file);
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <button
                onClick={exportMonthlyPdf}
                className="flex items-center gap-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-4 border border-white/25 transition-colors text-left"
              >
                <FileText className="w-5 h-5 shrink-0" />
                <span>
                  <span className="block">Exportar PDF</span>
                  <span className="block text-xs text-white/60">Informe mensual</span>
                </span>
              </button>
              <button
                onClick={exportCsv}
                className="flex items-center gap-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-4 border border-white/25 transition-colors text-left"
              >
                <Download className="w-5 h-5 shrink-0" />
                <span>
                  <span className="block">Exportar CSV</span>
                  <span className="block text-xs text-white/60">Para hoja de cálculo</span>
                </span>
              </button>
              <button
                onClick={exportJson}
                className="flex items-center gap-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-4 border border-white/25 transition-colors text-left"
              >
                <Download className="w-5 h-5 shrink-0" />
                <span>
                  <span className="block">Exportar JSON</span>
                  <span className="block text-xs text-white/60">Copia completa</span>
                </span>
              </button>
              <button
                onClick={() => importInputRef.current?.click()}
                className="flex items-center gap-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-4 border border-white/25 transition-colors text-left"
              >
                <Upload className="w-5 h-5 shrink-0" />
                <span>
                  <span className="block">Importar JSON</span>
                  <span className="block text-xs text-white/60">Restaurar copia</span>
                </span>
              </button>
              <button
                onClick={clearDeviceData}
                className="flex items-center gap-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-100 font-semibold px-4 py-4 border border-red-300/30 transition-colors text-left"
              >
                <Trash2 className="w-5 h-5 shrink-0" />
                <span>
                  <span className="block">Borrar datos</span>
                  <span className="block text-xs text-red-100/70">Solo este dispositivo</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir nuevo ingreso */}
      {showAddIncomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Añadir nuevo ingreso</h3>
              <button
                onClick={() => setShowAddIncomeModal(false)}
                className="text-white/60 hover:text-white text-xl"
              >
                x
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

      {/* Modal para añadir objetivo */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-slate-950/95 backdrop-blur-lg rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Nuevo objetivo</h3>
                <p className="text-xs text-white/60">Elige una meta y empieza con un importe realista.</p>
              </div>
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="text-white/60 hover:text-white text-xl"
              >
                x
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {goalTemplates.map((template) => (
                <button
                  key={template.title}
                  type="button"
                  onClick={() => setNewGoalForm({
                    title: template.title,
                    targetAmount: String(template.targetAmount),
                    savedAmount: newGoalForm.savedAmount,
                    icon: template.icon,
                  })}
                  className={`rounded-2xl border px-3 py-3 text-left transition-all ${
                    newGoalForm.title === template.title
                      ? 'bg-cyan-500/25 border-cyan-300 text-white'
                      : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                  }`}
                >
                  <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-black">{template.icon}</div>
                  <div className="text-xs font-bold leading-tight">{template.title}</div>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  value={newGoalForm.title}
                  onChange={(e) => setNewGoalForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Ej: fondo de emergencia"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">Meta (€)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={newGoalForm.targetAmount}
                    onChange={(e) => setNewGoalForm(prev => ({ ...prev, targetAmount: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="3000"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">Ya tengo (€)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={newGoalForm.savedAmount}
                    onChange={(e) => setNewGoalForm(prev => ({ ...prev, savedAmount: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={addNewGoal}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-xl font-bold transition-colors"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir nuevo gasto */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-slate-950/95 backdrop-blur-lg rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 max-w-lg w-full max-h-[92vh] overflow-y-auto">
	            <div className="flex items-center justify-between mb-4">
	              <div>
	                <h3 className="text-xl font-bold text-white">Añadir gasto rápido</h3>
	                <p className="text-xs text-white/60">Importe, categoría y listo.</p>
	              </div>
	              <button
	                onClick={() => {
	                  setShowExpenseAdvanced(false);
	                  setShowAddExpenseModal(false);
	                }}
	                className="text-white/60 hover:text-white text-xl"
	              >
	                x
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 border border-white/15 p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-black text-white">Gastos frecuentes</div>
                    <div className="text-xs text-white/55">Toca una sugerencia y confirma.</div>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-100">
                    Hoy
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickExpenseTemplates.map((preset) => (
                    <button
                      key={`${preset.label}-${preset.category}-${preset.amount}`}
                      type="button"
                      onClick={() => applyExpensePreset(preset)}
                      className={`rounded-2xl border px-3 py-3 text-left transition-all ${
                        newExpenseForm.category === preset.category && newExpenseForm.amount === preset.amount
                          ? 'bg-emerald-400/20 border-emerald-200 text-white'
                          : 'bg-white/10 border-white/15 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      <span className="block text-sm font-black leading-tight">{preset.label}</span>
                      <span className="mt-1 block text-xs text-white/55">{preset.amount}€ · {preset.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">Importe</label>
                <div className="relative">
	                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-white/50">€</span>
	                <input
	                  type="number"
                    inputMode="decimal"
                  value={newExpenseForm.amount}
                  onChange={(e) => setNewExpenseForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full bg-white/15 border border-white/30 rounded-2xl pl-10 pr-4 py-4 text-4xl font-black text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="0.00"
                    autoFocus
	                />
	                </div>
	                <div className="mt-3 grid grid-cols-4 gap-2">
	                  {[2, 5, 10, 20].map((amount) => (
	                    <button
	                      key={amount}
	                      type="button"
	                      onClick={() => setNewExpenseForm(prev => ({ ...prev, amount: String(amount) }))}
	                      className="rounded-xl bg-white/10 px-3 py-2 text-sm font-black text-white border border-white/15 hover:bg-white/20"
	                    >
	                      {amount}€
	                    </button>
	                  ))}
	                </div>
	              </div>

              {recentCategories.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-semibold text-white/80">Categorías recientes</div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {recentCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setNewExpenseForm(prev => ({ ...prev, category, isNewCategory: false }))}
                        className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black transition-colors ${
                          newExpenseForm.category === category
                            ? 'bg-red-500/30 border-red-300 text-white'
                            : 'bg-white/10 border-white/15 text-white/75 hover:bg-white/20'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <label className="block text-white/80 text-sm font-semibold">Categoría</label>
                  <button
                    type="button"
                    onClick={() => setNewExpenseForm(prev => ({ ...prev, isNewCategory: !prev.isNewCategory, category: prev.isNewCategory ? '' : prev.category }))}
                    className="text-xs font-semibold text-blue-200 hover:text-white"
                  >
                    {newExpenseForm.isNewCategory ? 'Usar existentes' : 'Crear categoría'}
                  </button>
                </div>

                {!newExpenseForm.isNewCategory ? (
                  <div className="grid grid-cols-3 gap-2">
                    {categories.slice(0, 12).map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setNewExpenseForm(prev => ({ ...prev, category, isNewCategory: false }))}
                        className={`min-h-[74px] rounded-2xl border px-2 py-3 text-center transition-all ${
                          newExpenseForm.category === category
                            ? 'bg-red-500/30 border-red-300 text-white shadow-lg'
                            : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-black">{getCategoryIcon(category)}</div>
                        <div className="text-[11px] font-bold leading-tight">{category}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={newExpenseForm.category}
                    onChange={(e) => setNewExpenseForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Ej: mascotas, regalos, viaje..."
                  />
                )}
              </div>

	              <div className="rounded-2xl bg-white/10 border border-white/15">
	                <button
	                  type="button"
	                  onClick={() => setShowExpenseAdvanced(!showExpenseAdvanced)}
	                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
	                  aria-expanded={showExpenseAdvanced}
	                >
	                  <span>
	                    <span className="block text-sm font-black text-white">Opciones avanzadas</span>
	                    <span className="block text-xs text-white/55">Nota, etiqueta o gasto recurrente</span>
	                  </span>
	                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
	                    {showExpenseAdvanced ? 'Ocultar' : 'Ver'}
	                  </span>
	                </button>

	                {showExpenseAdvanced && (
	                  <div className="space-y-4 border-t border-white/10 p-4">
	                    <div>
	                      <label className="block text-white/80 text-sm font-semibold mb-2">Nota opcional</label>
	                      <input
	                        type="text"
	                        value={newExpenseForm.note}
	                        onChange={(e) => setNewExpenseForm(prev => ({ ...prev, note: e.target.value }))}
	                        className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400"
	                        placeholder="Ej: cafe, compra semanal, regalo..."
	                      />
	                    </div>

	                    <div>
	                      <label className="block text-white/80 text-sm font-semibold mb-2">Etiqueta opcional</label>
	                      <select
	                        value={newExpenseForm.tag}
	                        onChange={(e) => setNewExpenseForm(prev => ({ ...prev, tag: e.target.value }))}
	                        className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
	                      >
	                        <option value="" className="bg-gray-800">Sin etiqueta</option>
	                        <option value="mio" className="bg-gray-800">Mío</option>
	                        <option value="pareja" className="bg-gray-800">Pareja</option>
	                        <option value="ninos" className="bg-gray-800">Niños</option>
	                        <option value="casa" className="bg-gray-800">Casa</option>
	                      </select>
	                    </div>

	                    <label className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/85">
	                      <input
	                        type="checkbox"
	                        checked={newExpenseForm.recurrent}
	                        onChange={(e) => setNewExpenseForm(prev => ({ ...prev, recurrent: e.target.checked }))}
	                        className="h-4 w-4 accent-red-500"
	                      />
	                      Es un gasto recurrente
	                    </label>
	                  </div>
	                )}
	              </div>
	            </div>
	            
	            <div className="flex gap-3 mt-6">
	              <button
	                onClick={() => {
	                  setShowExpenseAdvanced(false);
	                  setShowAddExpenseModal(false);
	                }}
	                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-colors"
	              >
                Cancelar
              </button>
              <button
                onClick={addNewExpense}
                disabled={!newExpenseForm.category || !newExpenseForm.amount}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-white/10 disabled:text-white/40 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-bold transition-colors"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}

      {shouldShowNativeBanner && <AdMobBanner position="bottom" size="adaptive" enabled />}

      {step >= onboardingSteps.length && !showAddExpenseModal && (
        <button
          onClick={() => openExpenseModal()}
          className={`fixed right-5 z-40 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-2xl ring-4 ring-white/20 transition-all duration-300 hover:scale-105 ${
            shouldShowNativeBanner ? 'bottom-24' : 'bottom-5'
          }`}
          aria-label="Añadir gasto rápido"
        >
          <PlusCircle className="h-8 w-8" />
        </button>
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
