import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { ChevronDown, ChevronRight, Download, Home, Moon, Plus, Share2, Sun, Trash2, WalletCards } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { useTheme } from '../../hooks/useTheme';
import {
  ACHIEVEMENTS,
  type AchievementDefinition,
  type CategoryId,
  GASTOS_STORAGE_KEY,
  GASTO_CATEGORIES,
  LEGACY_GASTOS_KEYS,
  type GastoItem,
  type GastosState,
  HORMIGA_EQUIVALENCES,
  categoryTotals,
  createDemoState,
  dateKey,
  dayOfMonth,
  daysInMonth,
  discoveryAvg,
  discoveryDays,
  disponibleHoy,
  gastadoDia,
  gastadoMes,
  gastosMes,
  hormigasMes,
  lastNDays,
  levelName,
  markedDaysCount,
  migrateLegacyGastos,
  monthKey,
  monthTotals,
  normalizeState,
  score,
  streak,
  unlockAchievements,
  variableMes,
  withDailySnapshot,
} from '../../lib/gastos';

type Navigate = (mode: string) => void;
type Screen = 'hoy' | 'lista' | 'insights';

const RING_CIRCLE = 2 * Math.PI * 100;
let confettiSequence = 0;
const CHEERS_OK = [
  'Solo por llevar el control ya estás por encima de la media.',
  'Cada registro es un voto por tu yo del futuro.',
  'Lo estás haciendo genial. En serio.',
  'Constancia antes que perfección.',
  'Tu dinero empieza a tener mapa.',
];
const CHEERS_OVER = [
  'Pasarse un día no es fallar: saberlo es lo que te pone por delante.',
  'Mañana el número se reajusta solo. Sigue registrando.',
  'Un día raro no rompe un buen hábito.',
];
const CHEERS_DISCOVERY = [
  'Registrar sin juzgarte: así empieza esto.',
  'Cada gasto anotado es información útil.',
  'Ya estás haciendo más que la mayoría: mirar de frente tus números.',
];

function formatEuro(value: number, decimals = false) {
  return `${new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  }).format(value)} €`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(Math.round(value));
}

function formatInput(value: number) {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(value)));
}

function parseMoney(value: string) {
  return Math.max(0, parseInt(value.replace(/[^\d]/g, ''), 10) || 0);
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `g-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}

function localStorageAvailable() {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

function isNativePlatform() {
  return Capacitor.getPlatform() !== 'web';
}

function parseJson(value: string | null) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

async function readStoredItem(key: string) {
  if (isNativePlatform()) {
    try {
      const stored = await Preferences.get({ key });
      if (stored.value) return stored.value;
    } catch {
      // LocalStorage remains as a fallback for older WebView data.
    }
  }
  try {
    return localStorageAvailable()?.getItem(key) || null;
  } catch {
    return null;
  }
}

async function writeStoredItem(key: string, value: string) {
  try {
    localStorageAvailable()?.setItem(key, value);
  } catch {
    // Preferences is the durable store in native builds.
  }
  if (isNativePlatform()) {
    await Preferences.set({ key, value });
  }
}

async function saveStoredState(state: GastosState) {
  await writeStoredItem(GASTOS_STORAGE_KEY, JSON.stringify(state));
}

async function loadStoredState() {
  const stored = normalizeState(parseJson(await readStoredItem(GASTOS_STORAGE_KEY)));
  if (stored) return { state: stored, migrated: false };

  const legacy = migrateLegacyGastos({
    expenses: parseJson(await readStoredItem(LEGACY_GASTOS_KEYS.expenses)),
    incomes: parseJson(await readStoredItem(LEGACY_GASTOS_KEYS.incomes)),
    onboarding: parseJson(await readStoredItem(LEGACY_GASTOS_KEYS.onboarding)),
  });

  return { state: legacy, migrated: Boolean(legacy) };
}

function categoryById(id: CategoryId) {
  return GASTO_CATEGORIES.find((category) => category.id === id) || GASTO_CATEGORIES[0];
}

function downloadTextFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function shareOrDownloadFile(filename: string, content: string, type: string, text: string) {
  if (typeof navigator !== 'undefined' && typeof File !== 'undefined' && typeof navigator.share === 'function') {
    try {
      const file = new File([content], filename, { type });
      if (typeof navigator.canShare !== 'function' || navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text });
        return;
      }
    } catch {
      // Some WebViews expose share but reject files; download fallback keeps the action useful.
    }
  }

  downloadTextFile(filename, content, type);
}

function escapeCsv(value: string | number | undefined) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

function dayLabel(day: string) {
  if (day === dateKey()) return 'Hoy';
  const date = new Date(`${day}T12:00:00`);
  return `${date.toLocaleDateString('es-ES', { weekday: 'long' })} ${date.getDate()}`;
}

function equivalentFor(value: number) {
  return HORMIGA_EQUIVALENCES.find(([limit]) => value >= limit)?.[1] || HORMIGA_EQUIVALENCES[HORMIGA_EQUIVALENCES.length - 1][1];
}

function ControlHeader({
  onNavigate,
  onOpenWrapped,
}: {
  onNavigate: Navigate;
  onOpenWrapped: () => void;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="cg2-header">
      <div className="cg2-wrap cg2-nav">
        <button className="cg2-logo" type="button" onClick={() => onNavigate('landing')} aria-label="Volver al inicio">
          <span className="cg2-logo-mark">
            <img src="/logos/finanzas-muy-facil-youtube-logo-192.png" alt="" />
          </span>
          <span>
            Control<span>Gastos</span> 2.0
          </span>
        </button>
        <div className="cg2-header-actions">
          <button className="cg2-pill" type="button" onClick={onOpenWrapped}>
            <Share2 size={15} />
            Mi mes
          </button>
          <button className="cg2-icon-btn" type="button" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function HoyScreen({
  state,
  onNoSpend,
  onGraduate,
  onOpenInsights,
  onEditPlan,
}: {
  state: GastosState;
  onNoSpend: () => void;
  onGraduate: (daily: number) => void;
  onOpenInsights: () => void;
  onEditPlan: () => void;
}) {
  const discovery = Boolean(state.plan.discovery);
  const todaySpent = gastadoDia(state);
  const dailyBudget = disponibleHoy(state);
  const remainingToday = Math.max(0, dailyBudget - todaySpent);
  const currentScore = score(state);
  const currentStreak = streak(state);
  const monthVariable = variableMes(state);
  const antTotal = hormigasMes(state);
  const discoveryDay = Math.min(discoveryDays(state), 7);
  const weekSpent = lastNDays(7).reduce((sum, day) => sum + gastadoDia(state, day), 0);
  const idealWeek = monthVariable > 0 ? (monthVariable / daysInMonth()) * 7 : 0;
  const noSpendDone = state.noSpend.includes(dateKey());
  const hideNoSpend = todaySpent > 0 && !noSpendDone;
  const progress = discovery ? Math.min(1, discoveryDay / 7) : Math.max(0, Math.min(1, dailyBudget > 0 ? remainingToday / dailyBudget : 0));
  const amountTone = todaySpent > dailyBudget && !discovery ? 'bad' : todaySpent > dailyBudget * 0.7 && !discovery ? 'warn' : 'ok';
  const dailyAvg = discoveryAvg(state);
  const graduationReady = discovery && discoveryDays(state) >= 7 && state.gastos.length >= 3;
  const proposedDaily = Number((dailyAvg * 0.9).toFixed(2));
  const cheerPool = discovery ? CHEERS_DISCOVERY : todaySpent > dailyBudget ? CHEERS_OVER : CHEERS_OK;
  const cheer = cheerPool[dayOfMonth() % cheerPool.length];

  return (
    <div className="cg2-screen">
      <div className="cg2-chip-row">
        <span className="cg2-badge fire">🔥 {currentStreak} días</span>
        <span className="cg2-badge score">
          Salud <b>{discovery ? 'Explorando' : `${currentScore.total}/100 · ${levelName(state)}`}</b>
        </span>
      </div>

      <button className="cg2-income-card" type="button" onClick={onEditPlan}>
        <span className="cg2-income-icon" aria-hidden="true">
          <WalletCards size={20} />
        </span>
        <span>
          <small>Ingresos mensuales</small>
          <b>{formatEuro(state.plan.ing || 0)}</b>
          <em>Toca para cambiarlos y ajustar tu plan</em>
        </span>
        <ChevronRight size={20} aria-hidden="true" />
      </button>

      <section className="cg2-hoy-card">
        <div className="cg2-hoy-label">{discovery ? `Semana de descubrimiento · día ${discoveryDay} de 7` : 'Hoy puedes gastar'}</div>
        <div className="cg2-ringbox">
          <svg width="230" height="230" viewBox="0 0 230 230" role="img" aria-label="Dinero disponible hoy">
            <defs>
              <linearGradient id="cg2RingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--brand2)" />
                <stop offset="1" stopColor="var(--green)" />
              </linearGradient>
            </defs>
            <circle className="track" cx="115" cy="115" r="100" />
            <circle className="prog" cx="115" cy="115" r="100" strokeDasharray={`${progress * RING_CIRCLE} ${RING_CIRCLE}`} />
          </svg>
          <div className="cg2-ring-center">
            <div className={`cg2-amount ${amountTone}`}>
              {discovery ? formatEuro(todaySpent, true) : todaySpent > dailyBudget ? `-${formatEuro(todaySpent - dailyBudget, true)}` : formatEuro(remainingToday, true)}
            </div>
            <div className="cg2-ring-sub">
              {discovery ? 'gastado hoy · sin juicios' : todaySpent > dailyBudget ? 'mañana se reajusta' : 'sin romper tu mes'}
            </div>
          </div>
        </div>

        <div className="cg2-hoy-foot">
          <div>
            <b>{formatEuro(todaySpent, true)}</b>
            <span>gastado hoy</span>
          </div>
          <div>
            <b>{discovery ? formatEuro(dailyAvg, true) : formatEuro(Math.max(0, monthVariable - gastadoMes(state)))}</b>
            <span>{discovery ? 'media/día' : 'libre este mes'}</span>
          </div>
          <div>
            <b>{discovery ? state.gastos.length : state.plan.diario ? formatEuro(state.plan.diario, true) : formatEuro(state.plan.aho || 0)}</b>
            <span>{discovery ? 'gastos' : state.plan.diario ? 'base diaria' : 'ahorro'}</span>
          </div>
        </div>

        {!hideNoSpend && (
          <button className={`cg2-nospend ${noSpendDone ? 'done' : ''}`} type="button" onClick={onNoSpend} disabled={noSpendDone}>
            {noSpendDone ? '✓ Día sin gastos registrado' : 'Hoy no he gastado nada'}
          </button>
        )}

        {graduationReady && (
          <div className="cg2-grad-card">
            <span>Ya te conocemos</span>
            <b>{formatEuro(proposedDaily, true)} al día</b>
            <p>
              Tu media real es {formatEuro(dailyAvg, true)}. Te proponemos un 10% menos para ahorrar unos {formatEuro(dailyAvg * 0.1 * 30)} al mes.
            </p>
            <button type="button" onClick={() => onGraduate(proposedDaily)}>
              Activar mi número mágico
            </button>
          </div>
        )}
      </section>

      <p className="cg2-cheer">{cheer}</p>

      <div className="cg2-mini-grid">
        <button className="cg2-mini-card horm" type="button" onClick={onOpenInsights}>
          <span>Gastos hormiga del mes</span>
          <b>{formatEuro(antTotal, true)}</b>
          <small>{antTotal > 0 ? `≈ ${formatEuro(antTotal * 12)} al año` : 'sin hormigas visibles'}</small>
        </button>
        <button className="cg2-mini-card" type="button" onClick={onOpenInsights}>
          <span>Esta semana</span>
          <b>{formatEuro(weekSpent)}</b>
          <small>{discovery ? 'total últimos 7 días' : weekSpent <= idealWeek ? `${formatEuro(idealWeek - weekSpent)} bajo tu ritmo` : `${formatEuro(weekSpent - idealWeek)} sobre tu ritmo`}</small>
        </button>
      </div>
    </div>
  );
}

function MovimientosList({ state, onDelete }: { state: GastosState; onDelete: (id: string) => void }) {
  const groups = useMemo(() => {
    const sorted = [...state.gastos].sort((first, second) => second.ts - first.ts);
    return sorted.reduce<Array<[string, GastoItem[]]>>((acc, gasto) => {
      const last = acc[acc.length - 1];
      if (last?.[0] === gasto.d) {
        last[1].push(gasto);
      } else {
        acc.push([gasto.d, [gasto]]);
      }
      return acc;
    }, []);
  }, [state.gastos]);

  if (!groups.length) {
    return (
      <div className="cg2-empty">
        <span>🧾</span>
        Aún no hay movimientos.
        <br />
        Pulsa el botón central y registra tu primer gasto en 3 segundos.
      </div>
    );
  }

  return (
    <div className="cg2-screen">
      {groups.map(([day, gastos]) => (
        <section className="cg2-day-group" key={day}>
          <h3>
            <span>{dayLabel(day)}</span>
            <b>{formatEuro(gastos.reduce((sum, gasto) => sum + gasto.amt, 0), true)}</b>
          </h3>
          {gastos.map((gasto) => {
            const category = categoryById(gasto.cat);
            return (
              <article className="cg2-movement" key={gasto.id}>
                <span className="cg2-movement-emoji">{category.emoji}</span>
                <div>
                  <b>{category.title}</b>
                  {gasto.note && <small>{gasto.note}</small>}
                </div>
                <strong>-{formatEuro(gasto.amt, true)}</strong>
                <button type="button" onClick={() => onDelete(gasto.id)} aria-label="Eliminar gasto">
                  <Trash2 size={16} />
                </button>
              </article>
            );
          })}
        </section>
      ))}
    </div>
  );
}

function AccordionPanel({
  title,
  subtitle,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className={`cg2-accordion ${open ? 'open' : ''}`}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>
          <b>{title}</b>
          {subtitle && <small>{subtitle}</small>}
        </span>
        <ChevronDown size={18} />
      </button>
      {open && <div className="cg2-accordion-body">{children}</div>}
    </section>
  );
}

function WeekChart({ state }: { state: GastosState }) {
  const days = lastNDays(7);
  const dailyBudget = variableMes(state) / Math.max(1, daysInMonth());
  const values = days.map((day) => gastadoDia(state, day));
  const maxValue = Math.max(dailyBudget * 1.4, ...values, 1);
  const width = 460;
  const height = 170;
  const barWidth = 42;
  const gap = (width - 40) / 7;
  const names = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const budgetY = height - 26 - (height - 42) * (dailyBudget / maxValue);

  return (
    <svg className="cg2-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Gasto de la semana">
      {values.map((value, index) => {
        const day = days[index];
        const barHeight = (height - 42) * (value / maxValue);
        const x = 26 + index * gap;
        const y = height - 26 - Math.max(barHeight, 2);
        const overBudget = dailyBudget > 0 && value > dailyBudget;
        return (
          <g key={day}>
            <rect x={x} y={y} width={barWidth} height={Math.max(barHeight, 2)} rx="6" className={overBudget ? 'warn' : 'ok'} />
            <text x={x + barWidth / 2} y={height - 10} textAnchor="middle">
              {names[new Date(`${day}T12:00:00`).getDay()]}
            </text>
            {value > 0 && (
              <text x={x + barWidth / 2} y={y - 7} textAnchor="middle" className="amount">
                {formatNumber(value)}
              </text>
            )}
          </g>
        );
      })}
      {dailyBudget > 0 && <line x1="20" y1={budgetY} x2={width - 6} y2={budgetY} />}
    </svg>
  );
}

function ScoreChart({ state }: { state: GastosState }) {
  const keys = Object.keys(state.hist || {}).sort().slice(-30);
  const width = 460;
  const height = 130;
  const pad = 8;

  if (keys.length < 2) {
    return (
      <svg className="cg2-score-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Evolución del score">
        <text x={width / 2} y={height / 2} textAnchor="middle">
          Vuelve mañana: tu línea empieza día a día
        </text>
      </svg>
    );
  }

  const x = (index: number) => pad + ((width - 2 * pad) * index) / (keys.length - 1);
  const y = (value: number) => height - 18 - (height - 40) * (value / 100);
  const points = keys.map((key, index) => `${index === 0 ? 'M' : 'L'} ${x(index)} ${y((state.hist || {})[key])}`).join(' ');
  const last = (state.hist || {})[keys[keys.length - 1]];
  const first = (state.hist || {})[keys[0]];

  return (
    <svg className="cg2-score-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Evolución del score">
      <defs>
        <linearGradient id="cg2ScoreGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--brand2)" />
          <stop offset="1" stopColor="var(--green)" />
        </linearGradient>
        <linearGradient id="cg2ScoreArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--green)" stopOpacity=".3" />
          <stop offset="1" stopColor="var(--green)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="area" d={`${points} L ${x(keys.length - 1)} ${height - 18} L ${x(0)} ${height - 18} Z`} />
      <path className="line" d={points} />
      <circle cx={x(keys.length - 1)} cy={y(last)} r="4" />
      <text x={x(keys.length - 1) - 6} y={y(last) - 8} textAnchor="end" className="amount">
        {last}
      </text>
      <text x={pad} y={height - 4}>
        hace {keys.length} días
      </text>
      <text x={width - pad} y={height - 4} textAnchor="end">
        hoy{last > first ? ` · +${last - first} pts` : ''}
      </text>
    </svg>
  );
}

function CategoryRanking({ state }: { state: GastosState }) {
  const rows = categoryTotals(state);
  const total = gastadoMes(state) || 1;

  if (!rows.length) {
    return <div className="cg2-empty compact">Registra gastos para ver tus categorías.</div>;
  }

  return (
    <div className="cg2-cat-list">
      {rows.map(([id, value]) => {
        const category = categoryById(id);
        return (
          <div className="cg2-cat-row" key={id}>
            <span>{category.emoji}</span>
            <div className="track">
              <div className="fill" style={{ width: `${(value / total) * 100}%` }} />
            </div>
            <b>{formatEuro(value)}</b>
          </div>
        );
      })}
    </div>
  );
}

function ScoreBreakdownPanel({ state }: { state: GastosState }) {
  const currentScore = score(state);
  return (
    <div className="cg2-score-rows">
      <div>
        <span>Ritmo de gasto bajo control</span>
        <b>{currentScore.ritmo}/40</b>
      </div>
      <div>
        <span>Racha de registro</span>
        <b>{currentScore.racha}/20</b>
      </div>
      <div>
        <span>Hormigas a raya</span>
        <b>{currentScore.hormigas}/20</b>
      </div>
      <div>
        <span>Constancia este mes</span>
        <b>{currentScore.constancia}/20</b>
      </div>
    </div>
  );
}

function EvolucionPanel({ state }: { state: GastosState }) {
  const totals = monthTotals(state);
  const maxMonth = Math.max(...totals.map(([, value]) => value), 1);
  const bestScore = Math.max(0, ...Object.values(state.hist || {}));

  return (
    <div>
      <ScoreChart state={state} />
      <div className="cg2-month-bars">
        {totals.length ? (
          totals.map(([month, value], index) => {
            const previous = index > 0 ? totals[index - 1][1] : null;
            const current = month === monthKey();
            const projected = current ? (value / dayOfMonth()) * daysInMonth() : value;
            const change = previous ? Math.round(((projected - previous) / previous) * 100) : null;
            const name = new Date(`${month}-15T12:00:00`).toLocaleDateString('es-ES', { month: 'short' });
            return (
              <div className="cg2-month-row" key={month}>
                <span>{name}{current ? ' · ahora' : ''}</span>
                <div className="track">
                  <div className="fill" style={{ width: `${(value / maxMonth) * 100}%` }} />
                </div>
                <b>
                  {formatEuro(value)}
                  {change !== null && <small className={change > 0 ? 'up' : ''}>{change > 0 ? ` ↑${change}%` : ` ↓${Math.abs(change)}%`}</small>}
                </b>
              </div>
            );
          })
        ) : (
          <div className="cg2-empty compact">Tu primer mes está en marcha.</div>
        )}
      </div>
      <div className="cg2-score-rows">
        <div>
          <span>Tu mejor racha</span>
          <b>{state.bestStreak || streak(state)} días</b>
        </div>
        <div>
          <span>Tu mejor score</span>
          <b>{state.plan.discovery && !bestScore ? 'Explorando' : `${bestScore}/100`}</b>
        </div>
        <div>
          <span>Días registrados</span>
          <b>{markedDaysCount(state)}</b>
        </div>
      </div>
    </div>
  );
}

function LogrosPanel({ state }: { state: GastosState }) {
  const unlocked = state.ach || {};
  return (
    <div>
      <p className="cg2-small-note">{Object.keys(unlocked).length} de {ACHIEVEMENTS.length} logros desbloqueados.</p>
      <div className="cg2-ach-grid">
        {ACHIEVEMENTS.map((achievement) => (
          <div className={`cg2-ach ${unlocked[achievement.id] ? 'got' : ''}`} key={achievement.id} title={achievement.description}>
            <span>{achievement.emoji}</span>
            <b>{achievement.title}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsScreen({
  state,
  demoMode,
  onEditPlan,
  onLoadDemo,
  onExportJson,
  onExportCsv,
}: {
  state: GastosState;
  demoMode: boolean;
  onEditPlan: () => void;
  onLoadDemo: () => void;
  onExportJson: () => void;
  onExportCsv: () => void;
}) {
  const ants = hormigasMes(state);
  const annualAnts = ants * 12;

  return (
    <div className="cg2-screen">
      <AccordionPanel title="Detector de gastos hormiga" subtitle="Cafés, caprichos y gastos pequeños" defaultOpen>
        <div className="cg2-hormiga-big">
          <b>{formatEuro(ants, true)}</b>
          <span>este mes en hormigas</span>
        </div>
        <div className="cg2-equivalence">
          {ants > 0 ? (
            <>
              A este ritmo son <b>{formatEuro(annualAnts)}</b> al año, {equivalentFor(annualAnts)}. La pregunta no es prohibirlos: es elegirlos.
            </>
          ) : (
            'Sin hormigas este mes. Impecable.'
          )}
        </div>
      </AccordionPanel>

      <AccordionPanel title="Tu semana" subtitle="Gasto por día frente a tu ritmo" defaultOpen>
        <WeekChart state={state} />
      </AccordionPanel>

      <AccordionPanel title="Categorías del mes" subtitle="Dónde se va tu dinero">
        <CategoryRanking state={state} />
      </AccordionPanel>

      <AccordionPanel title="Score de salud financiera" subtitle={`${state.plan.discovery ? 'Explorando' : `${score(state).total}/100 · ${levelName(state)}`}`}>
        <ScoreBreakdownPanel state={state} />
      </AccordionPanel>

      <AccordionPanel title="Evolución" subtitle="Score, meses y récords">
        <EvolucionPanel state={state} />
      </AccordionPanel>

      <AccordionPanel title="Logros" subtitle="Pequeñas victorias que crean hábito">
        <LogrosPanel state={state} />
      </AccordionPanel>

      <AccordionPanel title="Mi plan" subtitle="Reconfigurar sin perder tus movimientos">
        <div className="cg2-plan-actions">
          <button className="cg2-primary-btn" type="button" onClick={onEditPlan}>
            Editar mi plan
          </button>
          {demoMode && (
            <button className="cg2-secondary-btn" type="button" onClick={onLoadDemo}>
              Cargar datos demo
            </button>
          )}
        </div>
        <div className="cg2-export-box">
          <div>
            <b>Datos y copia</b>
            <span>Todo sigue guardado en este dispositivo. Desde aquí puedes sacar una copia cuando quieras.</span>
          </div>
          <div className="cg2-export-actions">
            <button className="cg2-secondary-btn" type="button" onClick={onExportCsv}>
              <Download size={15} />
              Exportar CSV
            </button>
            <button className="cg2-secondary-btn" type="button" onClick={onExportJson}>
              <Download size={15} />
              Exportar JSON
            </button>
          </div>
        </div>
      </AccordionPanel>
    </div>
  );
}

function AddSheet({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (payload: { amt: number; cat: CategoryId; note: string }) => void;
}) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [note, setNote] = useState('');
  const value = parseFloat((amount || '0').replace(',', '.')) || 0;
  const amountParts = (amount || '0').split(',');
  const integer = parseInt(amountParts[0], 10) || 0;
  const cents = (amountParts[1] || '').padEnd(2, '0').slice(0, 2);

  useEffect(() => {
    if (open) {
      setAmount('');
      setCategory(null);
      setNote('');
    }
  }, [open]);

  const pressKey = (key: string) => {
    setAmount((current) => {
      if (key === '←') return current.slice(0, -1);
      if (key === ',') return current.includes(',') ? current : `${current || '0'},`;
      const decimals = current.split(',')[1];
      if (decimals && decimals.length >= 2) return current;
      if (current.replace(',', '').length >= 6) return current;
      return `${current}${key}`;
    });
  };

  if (!open) return null;

  return (
    <div className="cg2-sheet">
      <button className="cg2-sheet-bg" type="button" onClick={onClose} aria-label="Cerrar" />
      <div className="cg2-sheet-box">
        <div className="cg2-amount-view">
          {formatNumber(integer)}
          <small>,{cents} €</small>
        </div>
        <div className="cg2-cat-buttons">
          {GASTO_CATEGORIES.map((item) => (
            <button className={category === item.id ? 'on' : ''} type="button" key={item.id} onClick={() => setCategory(item.id)}>
              <span>{item.emoji}</span>
              <b>{item.title}</b>
            </button>
          ))}
        </div>
        <input
          className="cg2-note-input"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Nota opcional: café, gasolina..."
          maxLength={40}
        />
        <div className="cg2-keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', '←'].map((key) => (
            <button type="button" key={key} onClick={() => pressKey(key)}>
              {key}
            </button>
          ))}
        </div>
        <button
          className="cg2-save-btn"
          type="button"
          disabled={!(value > 0 && category)}
          onClick={() => category && onSave({ amt: value, cat: category, note: note.trim() })}
        >
          Añadir gasto
        </button>
      </div>
    </div>
  );
}

function OnboardingFlow({
  current,
  onComplete,
  onClose,
}: {
  current: GastosState | null;
  onComplete: (state: GastosState) => void;
  onClose: (() => void) | null;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [income, setIncome] = useState(formatInput(current?.plan.ing || 1600));
  const [fixed, setFixed] = useState(formatInput(current?.plan.fij || 800));
  const [savingPercent, setSavingPercent] = useState(15);
  const ing = parseMoney(income);
  const fij = parseMoney(fixed);
  const saving = Math.round(ing * (savingPercent / 100));
  const free = Math.max(0, ing - fij - saving);
  const baseState = current || { plan: {}, gastos: [], noSpend: [], hist: {}, ach: {}, bestStreak: 0, sawWrap: false };

  const finishPlan = () => {
    onComplete({ ...baseState, plan: { ing, fij, aho: saving } });
  };

  const finishDiscovery = () => {
    onComplete({ ...baseState, plan: { discovery: true, start: Date.now() } });
  };

  return (
    <div className="cg2-full">
      {onClose && (
        <button className="cg2-close" type="button" onClick={onClose} aria-label="Cerrar onboarding">
          ×
        </button>
      )}
      <div className="cg2-onboarding">
        <div className="cg2-dots" aria-hidden="true">
          {[1, 2, 3, 4].map((dot) => (
            <i className={dot <= Math.min(step, 4) ? 'on' : ''} key={dot} />
          ))}
        </div>

        {step === 1 && (
          <div className="cg2-ob-step">
            <h2>
              Vamos a ordenar tu dinero en <em>30 segundos</em>
            </h2>
            <p>Primero dime cuánto ingresas al mes en neto. Si no es exacto, pon una aproximación.</p>
            <div className="cg2-money-input">
              <input value={income} inputMode="numeric" onChange={(event) => setIncome(event.target.value)} onBlur={() => setIncome(formatInput(ing))} />
              <span>€</span>
            </div>
            <button className="cg2-save-btn" type="button" onClick={() => setStep(2)}>
              Siguiente
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="cg2-ob-step">
            <h2>
              ¿Cuánto son tus <em>gastos fijos</em>?
            </h2>
            <p>Alquiler, hipoteca, luz, móvil, suscripciones... lo que sale sí o sí.</p>
            <div className="cg2-money-input">
              <input value={fixed} inputMode="numeric" onChange={(event) => setFixed(event.target.value)} onBlur={() => setFixed(formatInput(fij))} />
              <span>€</span>
            </div>
            <button className="cg2-save-btn" type="button" onClick={() => setStep(3)}>
              Siguiente
            </button>
            <button className="cg2-ghost-btn" type="button" onClick={() => setStep(5)}>
              No lo sé todavía: descubrirlo esta semana
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="cg2-ob-step">
            <h2>
              ¿Cuánto quieres <em>ahorrar</em>?
            </h2>
            <p>Lo apartamos primero. Lo que quede será tu dinero tranquilo para gastar.</p>
            <div className="cg2-ob-chips">
              {[10, 15, 20].map((percent) => (
                <button className={savingPercent === percent ? 'on' : ''} type="button" key={percent} onClick={() => setSavingPercent(percent)}>
                  {percent}%
                </button>
              ))}
            </div>
            <button className="cg2-save-btn" type="button" onClick={() => setStep(4)}>
              Ver mi plan
            </button>
            <button className="cg2-ghost-btn" type="button" onClick={() => { setSavingPercent(10); setStep(4); }}>
              Empezar suave con un 10%
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="cg2-ob-step">
            <h2>
              Tu plan está <em>listo</em>
            </h2>
            <div className="cg2-plan-box">
              <div className="hero">
                <b>{formatEuro(free / daysInMonth(), true)}</b>
                <span>tu número mágico diario</span>
              </div>
              <div><span>Ingresos</span><b>{formatEuro(ing)}</b></div>
              <div><span>Gastos fijos</span><b>-{formatEuro(fij)}</b></div>
              <div><span>Ahorro apartado</span><b>-{formatEuro(saving)}</b></div>
              <div><span>Dinero tranquilo del mes</span><b>{formatEuro(free)}</b></div>
            </div>
            <p>Cada gasto que registres irá restando. Si un día no gastas, tu número de mañana respira.</p>
            <button className="cg2-save-btn" type="button" onClick={finishPlan}>
              Empezar
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="cg2-ob-step">
            <h2>
              Semana de <em>descubrimiento</em>
            </h2>
            <p>Nada de presupuestos todavía. Durante 7 días solo registra lo que gastes. Sin culpa, sin examen.</p>
            <div className="cg2-plan-box">
              <div><span>Tú registras</span><b>cada gasto</b></div>
              <div><span>La app aprende</span><b>tu media real</b></div>
              <div><span>Luego propone</span><b>tu número mágico</b></div>
            </div>
            <button className="cg2-save-btn" type="button" onClick={finishDiscovery}>
              Empezar a descubrir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanEditor({
  state,
  onClose,
  onSave,
}: {
  state: GastosState;
  onClose: () => void;
  onSave: (plan: { ing: number; fij: number; aho: number }) => void;
}) {
  const [income, setIncome] = useState(formatInput(state.plan.ing || 0));
  const [fixed, setFixed] = useState(formatInput(state.plan.fij || 0));
  const [saving, setSaving] = useState(formatInput(state.plan.aho || 0));
  const ing = parseMoney(income);
  const fij = parseMoney(fixed);
  const aho = parseMoney(saving);
  const free = Math.max(0, ing - fij - aho);
  const overPlan = fij + aho > ing;

  return (
    <div className="cg2-full" role="dialog" aria-modal="true" aria-labelledby="cg2-plan-title">
      <button className="cg2-close" type="button" onClick={onClose} aria-label="Cerrar ajustes del plan">
        ×
      </button>
      <div className="cg2-plan-editor">
        <div className="cg2-editor-heading">
          <span className="cg2-income-icon" aria-hidden="true">
            <WalletCards size={21} />
          </span>
          <div>
            <h2 id="cg2-plan-title">Ajusta tu mes</h2>
            <p>Cambia solo lo necesario. Tus movimientos no se borrarán.</p>
          </div>
        </div>

        <div className="cg2-editor-fields">
          <label htmlFor="cg2-income-input">
            <span>Ingresos mensuales</span>
            <small>El dinero neto que entra cada mes</small>
          </label>
          <div className="cg2-editor-input">
            <input
              id="cg2-income-input"
              value={income}
              inputMode="numeric"
              onChange={(event) => setIncome(event.target.value)}
              onBlur={() => setIncome(formatInput(ing))}
              autoFocus
            />
            <span>€</span>
          </div>

          <label htmlFor="cg2-fixed-input">
            <span>Gastos fijos</span>
            <small>Vivienda, recibos, cuotas y suscripciones</small>
          </label>
          <div className="cg2-editor-input">
            <input
              id="cg2-fixed-input"
              value={fixed}
              inputMode="numeric"
              onChange={(event) => setFixed(event.target.value)}
              onBlur={() => setFixed(formatInput(fij))}
            />
            <span>€</span>
          </div>

          <label htmlFor="cg2-saving-input">
            <span>Ahorro mensual</span>
            <small>La cantidad que quieres apartar primero</small>
          </label>
          <div className="cg2-editor-input">
            <input
              id="cg2-saving-input"
              value={saving}
              inputMode="numeric"
              onChange={(event) => setSaving(event.target.value)}
              onBlur={() => setSaving(formatInput(aho))}
            />
            <span>€</span>
          </div>
        </div>

        <div className={`cg2-editor-result ${overPlan ? 'warn' : ''}`}>
          <span>Dinero tranquilo del mes</span>
          <b>{formatEuro(free)}</b>
          <small>
            {overPlan
              ? 'Tus gastos fijos y ahorro superan los ingresos. Ajusta alguna cantidad.'
              : `Aproximadamente ${formatEuro(free / daysInMonth(), true)} al día antes de registrar gastos.`}
          </small>
        </div>

        <button
          className="cg2-save-btn"
          type="button"
          disabled={ing <= 0 || overPlan}
          onClick={() => onSave({ ing, fij, aho })}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}

function WrappedModal({
  state,
  onClose,
  onEditPlan,
}: {
  state: GastosState;
  onClose: () => void;
  onEditPlan: () => void;
}) {
  const spent = gastadoMes(state);
  const free = variableMes(state);
  const currentScore = score(state);
  const ants = hormigasMes(state);
  const top = categoryTotals(state)[0];
  const topCategory = top ? categoryById(top[0]) : null;
  const biggest = [...gastosMes(state)].sort((first, second) => second.amt - first.amt)[0];
  const extra = Math.max(0, free * (dayOfMonth() / daysInMonth()) - spent);
  const month = new Date().toLocaleDateString('es-ES', { month: 'long' });

  const shareCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const context = canvas.getContext('2d');
    if (!context) return;

    const gradient = context.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, '#0b1220');
    gradient.addColorStop(1, '#1e3a8a');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1080, 1080);
    context.textAlign = 'center';
    context.fillStyle = 'rgba(255,255,255,.72)';
    context.font = '600 40px Sora, Inter, sans-serif';
    context.fillText(`Mi ${month} en dinero`, 540, 170);
    const textGradient = context.createLinearGradient(240, 0, 840, 0);
    textGradient.addColorStop(0, '#3b82f6');
    textGradient.addColorStop(1, '#10b981');
    context.fillStyle = textGradient;
    context.font = '800 150px Sora, Inter, sans-serif';
    context.fillText(`${currentScore.total}/100`, 540, 400);
    context.fillStyle = '#fff';
    context.font = '700 42px Sora, Inter, sans-serif';
    context.fillText('salud financiera', 540, 470);
    context.font = '600 44px Inter, sans-serif';
    context.fillStyle = 'rgba(255,255,255,.9)';
    context.fillText(`Racha de ${streak(state)} días registrando`, 540, 610);
    context.fillText(`${formatEuro(spent)} de ${formatEuro(free)} gastados`, 540, 690);
    context.fillText(`${formatEuro(ants)} en gastos hormiga`, 540, 770);
    context.font = '800 42px Sora, Inter, sans-serif';
    context.fillText('FinanzasFácil', 540, 950);
    context.fillStyle = 'rgba(255,255,255,.55)';
    context.font = '500 28px Inter, sans-serif';
    context.fillText('finanzasmuyfacil.com/control-gastos', 540, 1000);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'mi-mes-finanzasfacil.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: 'Mi mes en dinero con FinanzasFácil' });
          return;
        } catch {
          // Fallback to download.
        }
      }
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'mi-mes-finanzasfacil.png';
      link.click();
      URL.revokeObjectURL(link.href);
    }, 'image/png');
  };

  return (
    <div className="cg2-full">
      <button className="cg2-close" type="button" onClick={onClose} aria-label="Cerrar resumen">
        ×
      </button>
      <div className="cg2-wrapped">
        <h2>Tu mes en dinero</h2>
        <button className="cg2-income-card compact" type="button" onClick={onEditPlan}>
          <span className="cg2-income-icon" aria-hidden="true">
            <WalletCards size={19} />
          </span>
          <span>
            <small>Ingresos mensuales</small>
            <b>{formatEuro(state.plan.ing || 0)}</b>
            <em>Toca para cambiarlos</em>
          </span>
          <ChevronRight size={19} aria-hidden="true" />
        </button>
        <div className="cg2-wcard">
          <span>{month} · llevas gastado</span>
          <b>{formatEuro(spent)}</b>
          <p>{state.plan.discovery ? `media de ${formatEuro(discoveryAvg(state), true)} al día` : `de tus ${formatEuro(free)} de dinero tranquilo`}</p>
        </div>
        {topCategory && (
          <div className="cg2-wcard amber">
            <span>Tu categoría estrella</span>
            <b>{topCategory.emoji} {topCategory.title}</b>
            <p>{formatEuro(top[1])} este mes{biggest ? ` · mayor gasto: ${formatEuro(biggest.amt, true)}` : ''}</p>
          </div>
        )}
        <div className={`cg2-wcard ${ants * 12 > 300 ? 'amber' : 'green'}`}>
          <span>Gastos hormiga</span>
          <b>{formatEuro(ants)}</b>
          <p>≈ {formatEuro(ants * 12)} al año si sigues así</p>
        </div>
        <div className="cg2-wcard green">
          <span>Vas por delante de tu ritmo</span>
          <b>{formatEuro(extra)}</b>
          <p>Score {currentScore.total}/100 · racha de {streak(state)} días</p>
        </div>
        <button className="cg2-save-btn" type="button" onClick={shareCanvas}>
          <Download size={18} />
          Descargar o compartir resumen
        </button>
      </div>
    </div>
  );
}

function AchievementModal({
  achievement,
  onClose,
}: {
  achievement: AchievementDefinition | null;
  onClose: () => void;
}) {
  if (!achievement) return null;
  return (
    <div className="cg2-ach-modal">
      <div className="cg2-ach-box">
        <span>{achievement.emoji}</span>
        <small>Logro desbloqueado</small>
        <h3>{achievement.title}</h3>
        <p>{achievement.description}</p>
        <button type="button" onClick={onClose}>
          Seguir
        </button>
      </div>
    </div>
  );
}

function TabBar({
  active,
  onChange,
  onAdd,
  onWrapped,
}: {
  active: Screen;
  onChange: (screen: Screen) => void;
  onAdd: () => void;
  onWrapped: () => void;
}) {
  return (
    <nav className="cg2-tabbar" aria-label="Navegación de control de gastos">
      <div>
        <button className={active === 'hoy' ? 'on' : ''} type="button" onClick={() => onChange('hoy')}>
          <span>☀️</span>Hoy
        </button>
        <button className={active === 'lista' ? 'on' : ''} type="button" onClick={() => onChange('lista')}>
          <span>📋</span>Movim.
        </button>
        <button className="cg2-fab" type="button" onClick={onAdd} aria-label="Añadir gasto">
          <Plus size={30} />
        </button>
        <button className={active === 'insights' ? 'on' : ''} type="button" onClick={() => onChange('insights')}>
          <span>💡</span>Ideas
        </button>
        <button type="button" onClick={onWrapped}>
          <span>✨</span>Mi mes
        </button>
      </div>
    </nav>
  );
}

function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return <div className="cg2-toast">{message}</div>;
}

function ConfettiLayer({ pieces }: { pieces: Array<{ id: number; token: string; dx: number; dy: number }> }) {
  return (
    <>
      {pieces.map((piece) => (
        <span
          className="cg2-confetti"
          key={piece.id}
          style={{ '--dx': `${piece.dx}px`, '--dy': `${piece.dy}px` } as CSSProperties}
        >
          {piece.token}
        </span>
      ))}
    </>
  );
}

export function ControlGastos2Page({ onNavigate }: { onNavigate: Navigate }) {
  const [state, setState] = useState<GastosState | null>(null);
  const [storageReady, setStorageReady] = useState(false);
  const [screen, setScreen] = useState<Screen>('hoy');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [wrappedOpen, setWrappedOpen] = useState(false);
  const [achievementQueue, setAchievementQueue] = useState<AchievementDefinition[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<Array<{ id: number; token: string; dx: number; dy: number }>>([]);
  const demoMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === '1';

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  };

  const persist = (draft: GastosState, feedback?: { toast?: string; confetti?: string }) => {
    const snapshotted = withDailySnapshot(draft);
    const { state: unlockedState, unlocked } = unlockAchievements(snapshotted);
    setState(unlockedState);
    void saveStoredState(unlockedState);

    if (feedback?.toast) {
      showToast(feedback.toast);
    }
    if (feedback?.confetti) {
      burst(feedback.confetti);
    }
    if (unlocked.length) {
      setAchievementQueue((queue) => [...queue, ...unlocked]);
      burst(unlocked[0].emoji);
    }
  };

  const burst = (token: string) => {
    const pieces = Array.from({ length: 10 }, () => ({
      id: ++confettiSequence,
      token,
      dx: Math.random() * 260 - 130,
      dy: Math.random() * -220 - 40,
    }));
    const pieceIds = new Set(pieces.map((piece) => piece.id));
    setConfetti((current) => [...current, ...pieces]);
    window.setTimeout(() => {
      setConfetti((current) => current.filter((piece) => !pieceIds.has(piece.id)));
    }, 1000);
  };

  useEffect(() => {
    let mounted = true;

    loadStoredState()
      .then(async ({ state: storedState, migrated }) => {
        if (!mounted) return;
        if (storedState) {
          const snapshotted = withDailySnapshot(storedState);
          const { state: unlockedState } = unlockAchievements(snapshotted);
          setState(unlockedState);
          setShowOnboarding(false);
          void saveStoredState(unlockedState);
          if (migrated) {
            showToast('Hemos traído tus datos anteriores.');
          }
        } else {
          setShowOnboarding(true);
        }
      })
      .catch(() => {
        if (mounted) setShowOnboarding(true);
      })
      .finally(() => {
        if (mounted) setStorageReady(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const markNoSpend = () => {
    if (!state || state.noSpend.includes(dateKey())) return;
    persist({ ...state, noSpend: [...state.noSpend, dateKey()] }, { confetti: '🙌', toast: 'Día sin gastos registrado' });
  };

  const saveExpense = (payload: { amt: number; cat: CategoryId; note: string }) => {
    if (!state) return;
    const next: GastoItem = {
      id: createId(),
      amt: payload.amt,
      cat: payload.cat,
      note: payload.note,
      d: dateKey(),
      ts: Date.now(),
    };
    const nextState = {
      ...state,
      gastos: [...state.gastos, next],
      noSpend: state.noSpend.filter((day) => day !== dateKey()),
    };
    setSheetOpen(false);
    const newStreak = streak(nextState);
    const planned = !nextState.plan.discovery;
    const withinDay = !planned || gastadoDia(nextState) <= disponibleHoy(nextState);
    persist(nextState, {
      confetti: withinDay ? '✨' : undefined,
      toast: newStreak > 0 && newStreak % 7 === 0 ? `Racha de ${newStreak} días. Imparable.` : withinDay ? 'Registrado.' : 'Registrado. Mañana tu número se reajusta.',
    });
  };

  const deleteExpense = (id: string) => {
    if (!state) return;
    persist({ ...state, gastos: state.gastos.filter((gasto) => gasto.id !== id) }, { toast: 'Movimiento eliminado' });
  };

  const graduate = (daily: number) => {
    if (!state) return;
    persist({ ...state, plan: { diario: daily } }, { confetti: '🎓', toast: 'Plan activado: este es tu número mágico.' });
  };

  const completeOnboarding = (nextState: GastosState) => {
    setShowOnboarding(false);
    persist(nextState, { confetti: nextState.plan.discovery ? '🔍' : '🚀', toast: nextState.plan.discovery ? 'Semana de descubrimiento iniciada.' : 'Plan listo.' });
  };

  const savePlan = (plan: { ing: number; fij: number; aho: number }) => {
    if (!state) return;
    setPlanOpen(false);
    persist(
      {
        ...state,
        plan: {
          ing: plan.ing,
          fij: plan.fij,
          aho: plan.aho,
        },
      },
      { toast: 'Plan actualizado.' },
    );
  };

  const openWrapped = () => {
    if (!state) return;
    persist({ ...state, sawWrap: true });
    setWrappedOpen(true);
  };

  const loadDemo = () => {
    if (!window.confirm('Esto sustituirá tus datos por datos de ejemplo. ¿Seguimos?')) return;
    persist(createDemoState(), { toast: 'Datos demo cargados', confetti: '✨' });
    setScreen('hoy');
  };

  const exportJson = () => {
    if (!state) return;
    const payload = {
      version: 2,
      app: 'FinanzasFacil ControlGastos 2.0',
      exportedAt: new Date().toISOString(),
      plan: state.plan,
      gastos: state.gastos,
      noSpend: state.noSpend,
      achievements: state.ach || {},
      history: state.hist || {},
      bestStreak: state.bestStreak || 0,
    };

    void shareOrDownloadFile(
      `finanzasfacil-control-gastos-${dateKey()}.json`,
      JSON.stringify(payload, null, 2),
      'application/json;charset=utf-8',
      'Copia de seguridad de ControlGastos 2.0',
    );
    showToast('Copia JSON preparada.');
  };

  const exportCsv = () => {
    if (!state) return;
    const rows = [
      ['fecha', 'tipo', 'categoria', 'importe', 'nota'],
      ['perfil', 'ingreso_mensual', 'Ingresos', state.plan.ing || '', ''],
      ['perfil', 'gasto_fijo_mensual', 'Gastos fijos', state.plan.fij || '', ''],
      ['perfil', 'ahorro_objetivo', 'Ahorro', state.plan.aho || '', ''],
      ...state.gastos.map((gasto) => [gasto.d, 'gasto', categoryById(gasto.cat).title, gasto.amt, gasto.note || '']),
      ...state.noSpend.map((day) => [day, 'dia_sin_gastos', '', 0, '']),
    ];
    const csv = rows.map((row) => row.map(escapeCsv).join(',')).join('\n');

    void shareOrDownloadFile(
      `finanzasfacil-movimientos-${dateKey()}.csv`,
      csv,
      'text/csv;charset=utf-8',
      'Movimientos de ControlGastos 2.0',
    );
    showToast('Copia CSV preparada.');
  };

  return (
    <div className="wow cg2-shell">
      <ControlHeader onNavigate={onNavigate} onOpenWrapped={openWrapped} />
      <main className="cg2-wrap cg2-main">
        <button className="cg2-home-link" type="button" onClick={() => onNavigate('landing')}>
          <Home size={16} />
          Inicio
        </button>

        {!storageReady && (
          <div className="cg2-empty cg2-loading">
            <span>⏳</span>
            Preparando tus datos en este dispositivo...
          </div>
        )}
        {storageReady && state && screen === 'hoy' && (
          <HoyScreen
            state={state}
            onNoSpend={markNoSpend}
            onGraduate={graduate}
            onOpenInsights={() => setScreen('insights')}
            onEditPlan={() => setPlanOpen(true)}
          />
        )}
        {storageReady && state && screen === 'lista' && <MovimientosList state={state} onDelete={deleteExpense} />}
        {storageReady && state && screen === 'insights' && (
          <InsightsScreen
            state={state}
            demoMode={demoMode}
            onEditPlan={() => setPlanOpen(true)}
            onLoadDemo={loadDemo}
            onExportJson={exportJson}
            onExportCsv={exportCsv}
          />
        )}

        <details className="cg2-seo">
          <summary>Cómo funciona el método Dinero Tranquilo</summary>
          <p>
            Primero separas ingresos, gastos fijos y ahorro. Con lo que queda, la app calcula un número diario sencillo para decidir sin agobios.
            Tus datos se guardan en este dispositivo y puedes usarlos sin crear cuenta.
          </p>
        </details>
      </main>

      {storageReady && state && <TabBar active={screen} onChange={setScreen} onAdd={() => setSheetOpen(true)} onWrapped={openWrapped} />}
      {storageReady && state && <AddSheet open={sheetOpen} onClose={() => setSheetOpen(false)} onSave={saveExpense} />}
      {storageReady && showOnboarding && <OnboardingFlow current={state} onComplete={completeOnboarding} onClose={state ? () => setShowOnboarding(false) : null} />}
      {state && planOpen && <PlanEditor state={state} onClose={() => setPlanOpen(false)} onSave={savePlan} />}
      {state && wrappedOpen && (
        <WrappedModal
          state={state}
          onClose={() => setWrappedOpen(false)}
          onEditPlan={() => {
            setWrappedOpen(false);
            setPlanOpen(true);
          }}
        />
      )}
      <AchievementModal achievement={achievementQueue[0] || null} onClose={() => setAchievementQueue((queue) => queue.slice(1))} />
      <Toast message={toast} />
      <ConfettiLayer pieces={confetti} />
    </div>
  );
}
