export const GASTOS_STORAGE_KEY = 'cg2';

export const LEGACY_GASTOS_KEYS = {
  expenses: 'ff_expenses_v1',
  incomes: 'ff_incomes_v1',
  onboarding: 'ff_onboarding_v1',
  goals: 'ff_goals_v1',
} as const;

export type CategoryId =
  | 'cafe'
  | 'comida'
  | 'super'
  | 'transporte'
  | 'ocio'
  | 'compras'
  | 'salud'
  | 'hogar';

export interface GastoCategory {
  id: CategoryId;
  emoji: string;
  title: string;
  hormiga?: boolean;
}

export interface GastoItem {
  id: string;
  amt: number;
  cat: CategoryId;
  note?: string;
  d: string;
  ts: number;
}

export interface GastosPlan {
  ing?: number;
  fij?: number;
  aho?: number;
  diario?: number;
  discovery?: boolean;
  start?: number;
}

export interface GastosState {
  plan: GastosPlan;
  gastos: GastoItem[];
  noSpend: string[];
  hist?: Record<string, number>;
  bestStreak?: number;
  ach?: Record<string, string>;
  sawWrap?: boolean;
}

export interface LegacyGastosPayload {
  expenses?: unknown;
  incomes?: unknown;
  onboarding?: unknown;
}

export interface ScoreBreakdown {
  total: number;
  ritmo: number;
  racha: number;
  hormigas: number;
  constancia: number;
}

export interface AchievementDefinition {
  id: string;
  emoji: string;
  title: string;
  description: string;
  isUnlocked: (state: GastosState, date?: Date | string) => boolean;
}

export const GASTO_CATEGORIES: GastoCategory[] = [
  { id: 'cafe', emoji: '☕', title: 'Café', hormiga: true },
  { id: 'comida', emoji: '🍔', title: 'Comer fuera', hormiga: true },
  { id: 'super', emoji: '🛒', title: 'Súper' },
  { id: 'transporte', emoji: '🚗', title: 'Transporte' },
  { id: 'ocio', emoji: '🎉', title: 'Ocio', hormiga: true },
  { id: 'compras', emoji: '🛍️', title: 'Compras' },
  { id: 'salud', emoji: '💊', title: 'Salud' },
  { id: 'hogar', emoji: '🏠', title: 'Hogar' },
];

export const HORMIGA_EQUIVALENCES: Array<[number, string]> = [
  [1200, 'como un finde en Roma para dos'],
  [959, 'como un iPhone nuevo'],
  [600, 'como un vuelo largo'],
  [350, 'como un año de gimnasio'],
  [180, 'como una cena especial para dos'],
  [60, 'como un buen libro cada mes'],
  [0, 'como varios caprichos que no recordabas'],
];

const MS_PER_DAY = 86_400_000;

function toDate(value: Date | string = new Date()) {
  if (typeof value === 'string') {
    return new Date(`${value}T12:00:00`);
  }
  return new Date(value.getTime());
}

function startOfDay(value: Date | string = new Date()) {
  const date = toDate(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function pad2(value: number) {
  return String(value).padStart(2, '0');
}

export function dateKey(value: Date | string = new Date()) {
  const date = toDate(value);
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function monthKey(value: Date | string = new Date()) {
  if (typeof value === 'string') {
    return value.slice(0, 7);
  }
  return `${value.getFullYear()}-${pad2(value.getMonth() + 1)}`;
}

export function daysInMonth(value: Date | string = new Date()) {
  const date = toDate(value);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function dayOfMonth(value: Date | string = new Date()) {
  return toDate(value).getDate();
}

export function gastosMes(state: GastosState, date: Date | string = new Date()) {
  const key = monthKey(date);
  return state.gastos.filter((gasto) => monthKey(gasto.d) === key);
}

export function gastadoMes(state: GastosState, date: Date | string = new Date()) {
  return gastosMes(state, date).reduce((sum, gasto) => sum + gasto.amt, 0);
}

export function gastadoDia(state: GastosState, date: Date | string = new Date()) {
  const key = typeof date === 'string' ? date : dateKey(date);
  return state.gastos.filter((gasto) => gasto.d === key).reduce((sum, gasto) => sum + gasto.amt, 0);
}

export function variableMes(state: GastosState, date: Date | string = new Date()) {
  if (state.plan.diario) {
    return state.plan.diario * daysInMonth(date);
  }
  if (state.plan.discovery) {
    return 0;
  }
  return Math.max(0, (state.plan.ing || 0) - (state.plan.fij || 0) - (state.plan.aho || 0));
}

export function discoveryDays(state: GastosState, date: Date | string = new Date()) {
  if (!state.plan.discovery || !state.plan.start) {
    return 0;
  }
  const current = startOfDay(date).getTime();
  const start = startOfDay(new Date(state.plan.start)).getTime();
  return Math.max(1, Math.floor((current - start) / MS_PER_DAY) + 1);
}

export function discoveryAvg(state: GastosState, date: Date | string = new Date()) {
  const days = Math.max(1, Math.min(discoveryDays(state, date) || 1, 14));
  const total = state.gastos.reduce((sum, gasto) => sum + gasto.amt, 0);
  return total / days;
}

export function disponibleHoy(state: GastosState, date: Date | string = new Date()) {
  const remainingDays = daysInMonth(date) - dayOfMonth(date) + 1;
  const free = variableMes(state, date) - (gastadoMes(state, date) - gastadoDia(state, date));
  return Math.max(0, free / Math.max(1, remainingDays));
}

export function hormigasMes(state: GastosState, date: Date | string = new Date()) {
  return gastosMes(state, date)
    .filter((gasto) => {
      const category = GASTO_CATEGORIES.find((item) => item.id === gasto.cat);
      return Boolean((category?.hormiga && gasto.amt < 8) || gasto.amt < 3);
    })
    .reduce((sum, gasto) => sum + gasto.amt, 0);
}

export function lastNDays(count: number, date: Date | string = new Date()) {
  const cursor = toDate(date);
  const result: string[] = [];
  for (let index = 0; index < count; index += 1) {
    result.unshift(dateKey(cursor));
    cursor.setDate(cursor.getDate() - 1);
  }
  return result;
}

export function streak(state: GastosState, date: Date | string = new Date()) {
  const marks = new Set([...state.gastos.map((gasto) => gasto.d), ...state.noSpend]);
  const cursor = toDate(date);
  const today = dateKey(cursor);
  let count = 0;
  let gapUsed = false;

  if (!marks.has(today)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  for (;;) {
    const key = dateKey(cursor);
    if (marks.has(key)) {
      count += 1;
    } else if (!gapUsed && count > 0) {
      gapUsed = true;
    } else {
      break;
    }

    cursor.setDate(cursor.getDate() - 1);
    if (count > 999) break;
  }

  return count;
}

export function score(state: GastosState, date: Date | string = new Date()): ScoreBreakdown {
  const monthlyVariable = variableMes(state, date);
  const spentMonth = gastadoMes(state, date);
  const idealSpent = monthlyVariable * (dayOfMonth(date) / daysInMonth(date));
  const ritmo = Math.round(
    40 * Math.max(0, Math.min(1, idealSpent > 0 ? 1 - Math.max(0, spentMonth - idealSpent) / idealSpent : 1)),
  );
  const racha = Math.round(20 * Math.min(1, streak(state, date) / 14));
  const hormigaTotal = hormigasMes(state, date);
  const hormigas = Math.round(20 * Math.max(0, Math.min(1, spentMonth > 0 ? 1 - (hormigaTotal / spentMonth) * 2 : 1)));
  const markedDays = new Set([
    ...gastosMes(state, date).map((gasto) => gasto.d),
    ...state.noSpend.filter((day) => monthKey(day) === monthKey(date)),
  ]);
  const constancia = Math.round(20 * Math.min(1, markedDays.size / dayOfMonth(date)));

  return {
    total: ritmo + racha + hormigas + constancia,
    ritmo,
    racha,
    hormigas,
    constancia,
  };
}

export function levelName(state: GastosState, date: Date | string = new Date()) {
  if (state.plan.discovery) return 'Explorador';
  const total = score(state, date).total;
  if (total >= 80) return 'Leyenda';
  if (total >= 60) return 'Pro';
  if (total >= 40) return 'Constante';
  if (total >= 20) return 'Aprendiz';
  return 'Novato';
}

export function categoryTotals(state: GastosState, date: Date | string = new Date()) {
  const totals = new Map<CategoryId, number>();
  gastosMes(state, date).forEach((gasto) => {
    totals.set(gasto.cat, (totals.get(gasto.cat) || 0) + gasto.amt);
  });
  return [...totals.entries()].sort((first, second) => second[1] - first[1]);
}

export function monthTotals(state: GastosState) {
  const totals = new Map<string, number>();
  state.gastos.forEach((gasto) => {
    const key = monthKey(gasto.d);
    totals.set(key, (totals.get(key) || 0) + gasto.amt);
  });
  return [...totals.entries()].sort((first, second) => first[0].localeCompare(second[0])).slice(-6);
}

export function markedDaysCount(state: GastosState) {
  return new Set([...state.gastos.map((gasto) => gasto.d), ...state.noSpend]).size;
}

export function withDailySnapshot(state: GastosState, date: Date | string = new Date()): GastosState {
  const bestStreak = Math.max(state.bestStreak || 0, streak(state, date));
  if (state.plan.discovery) {
    return { ...state, bestStreak };
  }

  const hist = { ...(state.hist || {}), [dateKey(date)]: score(state, date).total };
  return { ...state, hist, bestStreak };
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'start',
    emoji: '🌱',
    title: 'Primer paso',
    description: 'Has creado tu plan. Mucha gente nunca llega hasta aquí: ya vas por delante.',
    isUnlocked: () => true,
  },
  {
    id: 'first',
    emoji: '📝',
    title: 'Primer gasto',
    description: 'Registrar el primero es lo más difícil. Los demás son costumbre.',
    isUnlocked: (state) => state.gastos.length >= 1,
  },
  {
    id: 'nospend',
    emoji: '🙌',
    title: 'Día a cero',
    description: 'Un día entero sin gastar. Tu yo del futuro te lo agradece.',
    isUnlocked: (state) => state.noSpend.length >= 1,
  },
  {
    id: 's3',
    emoji: '🔥',
    title: 'Racha de 3',
    description: 'Tres días con control. Esto empieza a ser un hábito.',
    isUnlocked: (state, date) => streak(state, date) >= 3,
  },
  {
    id: 's7',
    emoji: '🚒',
    title: 'Semana en marcha',
    description: '7 días de racha. La constancia empieza a verse.',
    isUnlocked: (state, date) => streak(state, date) >= 7,
  },
  {
    id: 's14',
    emoji: '💪',
    title: 'Dos semanas',
    description: '14 días registrando. Ya casi lo tienes automatizado.',
    isUnlocked: (state, date) => streak(state, date) >= 14,
  },
  {
    id: 'grad',
    emoji: '🎓',
    title: 'Graduación',
    description: 'Descubriste tu ritmo real y activaste tu número mágico.',
    isUnlocked: (state) => Boolean(state.plan.diario),
  },
  {
    id: 'ants',
    emoji: '🧹',
    title: 'Hormigas a raya',
    description: 'Una semana sin pequeños gastos invisibles.',
    isUnlocked: (state, date) =>
      state.gastos.length >= 5 &&
      lastNDays(7, date).every(
        (day) => !state.gastos.some((gasto) => gasto.d === day && gasto.amt < 8 && ['cafe', 'comida', 'ocio'].includes(gasto.cat)),
      ),
  },
  {
    id: 'green',
    emoji: '🎯',
    title: 'Semana en verde',
    description: '7 días seguidos dentro de tu ritmo ideal.',
    isUnlocked: (state, date) => {
      if (state.plan.discovery || variableMes(state, date) <= 0 || state.gastos.length < 3) return false;
      const daily = variableMes(state, date) / daysInMonth(date);
      return lastNDays(7, date).every((day) => gastadoDia(state, day) <= daily * 1.0001);
    },
  },
  {
    id: 'm20',
    emoji: '🗓️',
    title: '20 días activo',
    description: '20 días marcados este mes. Eso sí es constancia.',
    isUnlocked: (state, date) => {
      const days = new Set([
        ...gastosMes(state, date).map((gasto) => gasto.d),
        ...state.noSpend.filter((day) => monthKey(day) === monthKey(date)),
      ]);
      return days.size >= 20;
    },
  },
  {
    id: 'wrap',
    emoji: '✨',
    title: 'Mirar atrás',
    description: 'Has revisado tu mes. Saber dónde estás es la mitad del camino.',
    isUnlocked: (state) => Boolean(state.sawWrap),
  },
  {
    id: 'score80',
    emoji: '👑',
    title: 'Leyenda',
    description: 'Score de 80 o más. Esto ya no es empezar: es dominar.',
    isUnlocked: (state, date) => !state.plan.discovery && score(state, date).total >= 80,
  },
];

export function unlockAchievements(state: GastosState, date: Date | string = new Date()) {
  const ach = { ...(state.ach || {}) };
  const unlocked: AchievementDefinition[] = [];
  ACHIEVEMENTS.forEach((achievement) => {
    if (!ach[achievement.id] && achievement.isUnlocked(state, date)) {
      ach[achievement.id] = dateKey(date);
      unlocked.push(achievement);
    }
  });

  return {
    state: { ...state, ach },
    unlocked,
  };
}

export function normalizeState(value: unknown): GastosState | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<GastosState>;
  if (!candidate.plan || typeof candidate.plan !== 'object') return null;
  return {
    plan: candidate.plan,
    gastos: Array.isArray(candidate.gastos) ? candidate.gastos.filter((gasto) => gasto && typeof gasto.amt === 'number') : [],
    noSpend: Array.isArray(candidate.noSpend) ? candidate.noSpend.filter((day): day is string => typeof day === 'string') : [],
    hist: candidate.hist || {},
    bestStreak: candidate.bestStreak || 0,
    ach: candidate.ach || {},
    sawWrap: Boolean(candidate.sawWrap),
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

function readNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, value);
  if (typeof value === 'string') {
    const normalized = value.replace(',', '.').replace(/[^\d.]/g, '');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  }
  return 0;
}

function normalizeLegacyText(value: unknown) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function legacyCategoryToCategoryId(value: unknown): CategoryId {
  const text = normalizeLegacyText(value);
  if (text.includes('cafe')) return 'cafe';
  if (text.includes('bar') || text.includes('restaurante') || text.includes('comida')) return 'comida';
  if (text.includes('super') || text.includes('aliment') || text.includes('mercado')) return 'super';
  if (text.includes('transporte') || text.includes('gasolina') || text.includes('coche') || text.includes('combustible')) return 'transporte';
  if (text.includes('salud') || text.includes('farmacia') || text.includes('medic')) return 'salud';
  if (text.includes('casa') || text.includes('hogar') || text.includes('luz') || text.includes('agua') || text.includes('internet') || text.includes('alquiler')) return 'hogar';
  if (text.includes('ocio') || text.includes('suscripcion') || text.includes('cine') || text.includes('netflix')) return 'ocio';
  if (text.includes('ropa') || text.includes('compra') || text.includes('amazon') || text.includes('bizum')) return 'compras';
  return 'hogar';
}

function readLegacyDate(value: unknown, fallback = new Date()) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  return dateKey(fallback);
}

function readLegacyItems(value: unknown) {
  return Array.isArray(value) ? value.map(asRecord).filter((item): item is Record<string, unknown> => Boolean(item)) : [];
}

function sumLegacyFixedExpenses(value: unknown) {
  const fixed = asRecord(value);
  if (!fixed) return 0;
  return Object.values(fixed).reduce<number>((sum, item) => sum + readNumber(item), 0);
}

function currentMonthIncome(value: unknown) {
  return readLegacyItems(value)
    .filter((item) => monthKey(readLegacyDate(item.date)) === monthKey())
    .reduce((sum, item) => sum + readNumber(item.amount), 0);
}

export function migrateLegacyGastos(payload: LegacyGastosPayload): GastosState | null {
  const legacyExpenses = readLegacyItems(payload.expenses);
  const legacyIncomes = readLegacyItems(payload.incomes);
  const onboarding = asRecord(payload.onboarding);
  const hasLegacyData = Boolean(onboarding || legacyExpenses.length || legacyIncomes.length);
  if (!hasLegacyData) return null;

  const gastos = legacyExpenses.reduce<GastoItem[]>((items, item, index) => {
      const amount = readNumber(item.amount);
      if (amount <= 0) return items;
      const d = readLegacyDate(item.date);
      items.push({
        id: typeof item.id === 'string' && item.id ? `legacy-${item.id}` : `legacy-${d}-${index}`,
        amt: amount,
        cat: legacyCategoryToCategoryId(item.category),
        note: typeof item.note === 'string' ? item.note : typeof item.tag === 'string' ? item.tag : '',
        d,
        ts: new Date(`${d}T12:00:00`).getTime() + index,
      });
      return items;
    }, []);

  const fixed = sumLegacyFixedExpenses(onboarding?.fixedExpenses);
  const income = readNumber(onboarding?.monthlyIncome) || currentMonthIncome(payload.incomes);
  const saving = readNumber(onboarding?.savingsGoal);
  const plan: GastosPlan = onboarding
    ? { ing: income || 1500, fij: fixed, aho: saving }
    : { discovery: true, start: gastos[0]?.ts || Date.now() };

  return withDailySnapshot({
    plan,
    gastos,
    noSpend: [],
    hist: {},
    bestStreak: 0,
    ach: {},
    sawWrap: false,
  });
}

export function createDemoState(date: Date | string = new Date()): GastosState {
  let seed = 42;
  const random = () => {
    seed = (seed * 16_807) % 2_147_483_647;
    return (seed - 1) / 2_147_483_646;
  };
  const gastos: GastoItem[] = [];
  const hist: Record<string, number> = {};
  const cats: CategoryId[] = ['cafe', 'comida', 'super', 'transporte', 'ocio', 'compras', 'cafe', 'super'];
  const cursor = toDate(date);

  for (let day = 75; day >= 0; day -= 1) {
    const d = new Date(cursor);
    d.setDate(d.getDate() - day);
    const key = dateKey(d);
    const mejora = 1 - ((75 - day) / 75) * 0.35;
    const movements = random() < 0.88 ? 1 + Math.floor(random() * 2) : 0;
    for (let index = 0; index < movements; index += 1) {
      const cat = cats[Math.floor(random() * cats.length)];
      const base = cat === 'cafe' ? 1.8 + random() * 3 : cat === 'super' ? 15 + random() * 40 : 4 + random() * 24;
      gastos.push({
        id: `demo-${key}-${index}`,
        amt: Number((base * mejora).toFixed(2)),
        cat,
        note: '',
        d: key,
        ts: d.getTime() - index,
      });
    }
    if (day <= 30) {
      hist[key] = Math.min(96, Math.round(45 + (30 - day) * 1.6 + random() * 4));
    }
  }

  return withDailySnapshot({
    plan: { ing: 1600, fij: 800, aho: 240 },
    gastos,
    noSpend: [],
    hist,
    bestStreak: 23,
    ach: {},
    sawWrap: false,
  }, date);
}
