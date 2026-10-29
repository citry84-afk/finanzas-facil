import { useEffect, useMemo, useState } from 'react';
import {
  Building2,
  Briefcase,
  Check,
  ChevronRight,
  Home,
  Moon,
  PiggyBank,
  Scale,
  Share2,
  Smartphone,
  Sun,
  WalletCards,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import {
  AUTONOMOS_TRAMOS,
  AUTONOMOS_CUOTA_REDUCIDA_CON_MEI,
  AUTONOMOS_IMPORTE_MAXIMO,
  calculateAmortizationByYear,
  calculateAutonomos,
  calculateEmployeeCost,
  calculateMortgage,
  calculateSalaryNet,
  calculateSeverance,
  formatEuro,
  formatNumber,
  parseEuro,
  simulateMillionaire,
} from '../../lib/calculos';

type Navigate = (mode: string) => void;

const APP_STORE_URL = 'https://apps.apple.com/es/app/finanzasfacil/id6754602748';
const CURRENT_YEAR = 2026;
const CIRCLE = 2 * Math.PI * 75;

function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.wow-reveal').forEach((node) => node.classList.add('on'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('on')),
      { threshold: 0.12 },
    );
    const nodes = Array.from(document.querySelectorAll('.wow-reveal'));
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

async function shareText(text: string, fallbackButton?: HTMLButtonElement | null) {
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch {
      return;
    }
  }
  await navigator.clipboard.writeText(text);
  if (fallbackButton) {
    const original = fallbackButton.textContent;
    fallbackButton.textContent = 'Copiado';
    window.setTimeout(() => {
      fallbackButton.textContent = original;
    }, 1500);
  }
}

function Shell({ children }: { children: React.ReactNode }) {
  useReveal();
  return <div className="wow">{children}</div>;
}

function Header({ onNavigate }: { onNavigate: Navigate }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="wow-header">
      <div className="wrap wow-nav">
        <button className="wow-logo" type="button" onClick={() => onNavigate('landing')} aria-label="Ir al inicio">
          <span className="wow-logo-mark">
            <img src="/logos/finanzas-muy-facil-youtube-logo-192.png" alt="" />
          </span>
          <span>Finanzas<span>Fácil</span></span>
        </button>
        <nav className="wow-actions" aria-label="Navegación principal">
          <a className="wow-pill hide-sm" href="/blog.html">Blog</a>
          <button className="wow-pill hide-sm" type="button" onClick={() => onNavigate('gastos')}>App de gastos</button>
          <button className="wow-icon-btn" type="button" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="wow-pill brand" href="#calculadoras">Calculadoras</a>
        </nav>
      </div>
    </header>
  );
}

function Footer({ onNavigate }: { onNavigate: Navigate }) {
  return (
    <footer className="wow-footer">
      <div className="wrap">
        <div className="wow-footer-links">
          <button type="button" onClick={() => onNavigate('landing')}>Inicio</button>
          <a href="/blog.html">Blog</a>
          <a href="/metodologia-fuentes.html">Metodología</a>
          <a href="/politica-editorial.html">Política editorial</a>
          <button type="button" onClick={() => onNavigate('about')}>Sobre nosotros</button>
          <button type="button" onClick={() => onNavigate('contact')}>Contacto</button>
          <button type="button" onClick={() => onNavigate('privacy')}>Privacidad</button>
        </div>
        Contenido educativo y orientativo. No sustituye asesoramiento profesional.
        <br />© 2026 FinanzasFácil · LIPA Studios
      </div>
    </footer>
  );
}

function Donut({ netRatio, irpfRatio, ssRatio }: { netRatio: number; irpfRatio: number; ssRatio: number }) {
  return (
    <div className="wow-donut">
      <svg width="210" height="210" viewBox="0 0 210 210" role="img" aria-label="Reparto de importes">
        <circle cx="105" cy="105" r="75" stroke="var(--line)" />
        <circle cx="105" cy="105" r="75" stroke="var(--brand2)" strokeDasharray={`${ssRatio * CIRCLE} ${CIRCLE}`} />
        <circle cx="105" cy="105" r="75" stroke="var(--amber)" strokeDasharray={`${(ssRatio + irpfRatio) * CIRCLE} ${CIRCLE}`} />
        <circle cx="105" cy="105" r="75" stroke="var(--green)" strokeDasharray={`${netRatio * CIRCLE} ${CIRCLE}`} />
        <text x="105" y="102">{Math.round(netRatio * 100)}%</text>
        <text className="sub" x="105" y="121">es para ti</text>
      </svg>
    </div>
  );
}

function BarRow({ label, value, pct, tone }: { label: string; value: string; pct: number; tone: string }) {
  return (
    <div className="wow-bar-row">
      <span className="k">{label}</span>
      <div className="wow-track"><div className={`wow-fill ${tone}`} style={{ width: `${Math.max(1, Math.min(100, pct))}%` }} /></div>
      <span className="v num">{value}</span>
    </div>
  );
}

function MainLayout({ onNavigate, children }: { onNavigate: Navigate; children: React.ReactNode }) {
  return (
    <Shell>
      <Header onNavigate={onNavigate} />
      <main className="wow-main">{children}</main>
      <Footer onNavigate={onNavigate} />
    </Shell>
  );
}

const JOURNEY_STEPS = [
  {
    number: '01',
    label: 'Lo que entra',
    kicker: 'Tu punto de partida',
    title: 'Tu sueldo, en claro',
    text: 'Partimos de una estimación sencilla para saber con qué cuentas cada mes.',
  },
  {
    number: '02',
    label: 'Lo que sale',
    kicker: 'Una foto de tu mes',
    title: 'Gastos sin hojas de cálculo',
    text: 'Anota lo esencial y deja que el resumen ponga orden.',
  },
  {
    number: '03',
    label: 'Lo importante',
    kicker: 'Tu plan primero',
    title: 'Reserva espacio para ti',
    text: 'Separa lo fijo, lo variable y el ahorro que quieres proteger.',
  },
  {
    number: '04',
    label: 'Tu decisión',
    kicker: 'Una conclusión concreta',
    title: 'Mira tu dinero tranquilo',
    text: 'Entiende tu margen antes de decidir en qué gastar.',
  },
];

function JourneyPhone() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => setActiveStep((current) => (current + 1) % JOURNEY_STEPS.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  const step = JOURNEY_STEPS[activeStep];

  return (
    <div className="wow-journey-device" aria-label="Ejemplo del recorrido mensual en FinanzasFácil">
      <div className="wow-phone" aria-live="polite">
        <div className="wow-phone-status"><span>9:41</span><span className="wow-phone-status-icons">••• ◒</span></div>
        <div className="wow-phone-head">
          <img src="/logos/finanzas-muy-facil-youtube-logo-192.png" alt="" />
          <div><strong>FinanzasFácil</strong><span>Mi mes, paso a paso</span></div>
        </div>

        <div className="wow-phone-progress" aria-label={`Paso ${activeStep + 1} de ${JOURNEY_STEPS.length}`}>
          <span>Tu mes</span>
          <div><i style={{ width: `${((activeStep + 1) / JOURNEY_STEPS.length) * 100}%` }} /></div>
          <b>{activeStep + 1}/{JOURNEY_STEPS.length}</b>
        </div>

        <div className="wow-phone-screen" key={step.number}>
          <span className="wow-phone-kicker">{step.kicker}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          {activeStep === 0 && <JourneyIncome />}
          {activeStep === 1 && <JourneyExpenses />}
          {activeStep === 2 && <JourneyPlan />}
          {activeStep === 3 && <JourneyDecision />}
        </div>

        <div className="wow-phone-footer"><span>Ejemplo orientativo</span><span>Datos en tu dispositivo</span></div>
      </div>

      <div className="wow-journey-controls" role="tablist" aria-label="Pasos del recorrido">
        {JOURNEY_STEPS.map((item, index) => (
          <button
            key={item.number}
            className={activeStep === index ? 'on' : ''}
            type="button"
            role="tab"
            aria-selected={activeStep === index}
            onClick={() => setActiveStep(index)}
          >
            <span>{item.number}</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function JourneyIncome() {
  return (
    <div className="wow-phone-card journey-in">
      <div className="journey-income-top"><span>Estimación de neto</span><strong className="num">1.820 €</strong></div>
      <div className="journey-mini-row"><span>Salario bruto</span><b className="num">28.000 €</b></div>
      <div className="journey-mini-row"><span>Pagas</span><b>12 al año</b></div>
      <div className="journey-callout"><Check size={15} /> Ya sabes desde dónde empezar</div>
    </div>
  );
}

function JourneyExpenses() {
  return (
    <div className="wow-phone-card journey-out">
      <div className="journey-total"><span>Gastos anotados</span><strong className="num">1.284 €</strong></div>
      <div className="journey-expense"><i className="home" /><span>Vivienda</span><b className="num">720 €</b></div>
      <div className="journey-expense"><i className="food" /><span>Alimentación</span><b className="num">286 €</b></div>
      <div className="journey-expense"><i className="move" /><span>Transporte</span><b className="num">118 €</b></div>
    </div>
  );
}

function JourneyPlan() {
  return (
    <div className="wow-phone-card journey-plan">
      <div className="journey-goal"><span>Objetivo de este mes</span><strong>Colchón de emergencia</strong><div><i /></div><b className="num">150 € reservados</b></div>
      <div className="journey-rule"><Check size={15} /><span>Primero lo importante, después lo demás</span></div>
    </div>
  );
}

function JourneyDecision() {
  return (
    <div className="wow-phone-card journey-decision">
      <span>Dinero tranquilo</span>
      <strong className="num">386 €</strong>
      <p>Es el margen estimado después de tus gastos y tu objetivo.</p>
      <div className="journey-decision-next"><span>Próximo paso</span><b>Revisar gastos variables</b><ChevronRight size={17} /></div>
    </div>
  );
}

export function WowHome({ onNavigate }: { onNavigate: Navigate }) {
  const [gross, setGross] = useState(28000);
  const [pagas, setPagas] = useState(12);
  const [monthly, setMonthly] = useState(300);
  const salary = useMemo(() => calculateSalaryNet({ gross, pagas }), [gross, pagas]);
  const million = useMemo(() => simulateMillionaire(0, monthly, 7, 1000000), [monthly]);
  const millionYear = million.reached ? Math.round(CURRENT_YEAR + million.months / 12) : '+100 años';
  const ratios = {
    net: gross ? salary.net / gross : 0,
    irpf: gross ? salary.irpf / gross : 0,
    ss: gross ? salary.socialSecurity / gross : 0,
  };

  return (
    <MainLayout onNavigate={onNavigate}>
      <div className="wrap">
        <section className="wow-journey-hero">
          <div className="wow-journey-copy">
            <span className="wow-eyebrow"><span className="wow-dot" /> Empieza por tu mes, no por fórmulas</span>
            <h1>Una foto clara de tu dinero. <em>Un siguiente paso.</em></h1>
            <p>Calcula lo que entra, ordena lo que sale y entiende tu margen para decidir con más calma. FinanzasFácil te acompaña en ese recorrido.</p>
            <div className="wow-journey-cta">
              <button className="wow-btn primary" type="button" onClick={() => onNavigate('gastos')}>Empezar con mi mes <ChevronRight size={17} /></button>
              <button className="wow-btn" type="button" onClick={() => onNavigate('salario')}>Calcular mi salario neto</button>
            </div>
            <div className="wow-journey-notes">
              <span><Check size={16} /> Sin registro para empezar</span>
              <span><Check size={16} /> Control de gastos local</span>
              <span><Check size={16} /> Herramientas para España</span>
            </div>
          </div>
          <JourneyPhone />
        </section>

        <section className="wow-section wow-salary-preview" id="tu-mes">
          <div className="wow-section-head wow-reveal">
            <h2>Empieza por saber qué dinero entra</h2>
            <p>Prueba con tu salario bruto. Después podrás llevar esa cifra al control de gastos para completar la foto de tu mes.</p>
          </div>

          <div className="wow-panel pad wow-reveal">
            <div className="wow-grid two">
              <div>
                <label className="wow-label" htmlFor="homeGross">Tu salario bruto anual</label>
                <div className="wow-input-row">
                  <input id="homeGross" className="num" value={formatNumber(gross)} inputMode="numeric" onChange={(event) => setGross(parseEuro(event.target.value))} />
                  <span className="eur">€</span>
                </div>
                <input className="wow-range" type="range" min={14000} max={90000} step={500} value={gross} onChange={(event) => setGross(Number(event.target.value))} aria-label="Ajustar salario" />
                <div className="wow-chip-row" role="group" aria-label="Número de pagas">
                  {[12, 14].map((value) => (
                    <button key={value} className={`wow-chip ${pagas === value ? 'on' : ''}`} type="button" onClick={() => setPagas(value)}>{value} pagas</button>
                  ))}
                </div>

                <div className="wow-result">
                  <div className="label">Neto al mes aproximado</div>
                  <div className="big num">{formatEuro(salary.perPay)}</div>
                  <div className="wow-bars">
                    <BarRow label="Neto" value={formatEuro(salary.net)} pct={ratios.net * 100} tone="net" />
                    <BarRow label="IRPF" value={formatEuro(salary.irpf)} pct={ratios.irpf * 100} tone="irpf" />
                    <BarRow label="Seg. Social" value={formatEuro(salary.socialSecurity)} pct={ratios.ss * 100} tone="ss" />
                  </div>
                </div>
              </div>
              <Donut netRatio={ratios.net} irpfRatio={ratios.irpf} ssRatio={ratios.ss} />
            </div>
            <div className="wow-cta">
              <button className="wow-btn primary" type="button" onClick={() => onNavigate('salario')}>Cálculo detallado</button>
              <button className="wow-btn" type="button" onClick={(event) => shareText(`Con ${formatEuro(gross)} brutos me quedan ${formatEuro(salary.perPay)} por paga. Calcúlalo tú: https://finanzasmuyfacil.com/calculadora-salario-neto`, event.currentTarget)}>Compartir resultado</button>
            </div>
            <p className="wow-fine">Estimación orientativa. No sustituye a tu nómina ni a un asesor.</p>
          </div>
        </section>

        <section className="wow-section" id="calculadoras">
          <div className="wow-section-head wow-reveal">
            <h2>Elige tu calculadora</h2>
            <p>Cada herramienta está pensada para resolver una duda concreta, con lenguaje claro y números visibles.</p>
          </div>
          <CalculatorCards onNavigate={onNavigate} />
        </section>

        <section className="wow-section">
          <div className="wow-panel pad wow-reveal">
            <div className="wow-grid two">
              <div>
                <h2 className="display" style={{ margin: 0, fontSize: 28 }}>¿Cuándo serás millonario?</h2>
                <div className="wow-gradient-text num" style={{ font: '800 clamp(38px, 7vw, 58px) Sora', marginTop: 8 }}>{millionYear}</div>
                <p className="wow-muted">Invirtiendo {formatEuro(monthly)} al mes al 7% anual compuesto.</p>
                <label className="wow-label" htmlFor="homeMonthly" style={{ marginTop: 18 }}>Aportación mensual</label>
                <input id="homeMonthly" className="wow-range" type="range" min={50} max={2000} step={50} value={monthly} onChange={(event) => setMonthly(Number(event.target.value))} />
                <button className="wow-btn primary" type="button" style={{ marginTop: 18 }} onClick={() => onNavigate('tiktok-millonario')}>Ver mi plan completo</button>
              </div>
              <MillionChart series={million.series} goal={1000000} />
            </div>
          </div>
        </section>

        <section className="wow-section">
          <div className="wow-banner wow-reveal">
            <div>
              <h3>La app ya está disponible en iPhone</h3>
              <p>Control de gastos, dinero tranquilo y exportación de datos. Tus datos se quedan en el dispositivo.</p>
            </div>
            <a className="wow-btn" href={APP_STORE_URL} style={{ background: '#fff', color: '#0f172a' }}>Descargar en App Store</a>
          </div>
        </section>

        <section className="wow-section">
          <div className="wow-section-head wow-reveal">
            <h2>Guías que se entienden</h2>
            <p>Contenido educativo para apoyar las calculadoras y mejorar la confianza del usuario.</p>
          </div>
          <div className="wow-grid articles">
            <a className="wow-article wow-reveal" href="/guia-fiscal-autonomos-espana-2026.html"><small className="wow-gradient-text">Autónomos</small><h3>Guía fiscal para autónomos 2026</h3><p>Cuotas, IRPF y gastos con ejemplos sencillos.</p></a>
            <a className="wow-article wow-reveal" href="/metodologia-fuentes.html"><small className="wow-gradient-text">Transparencia</small><h3>Metodología y fuentes</h3><p>Cómo estimamos los resultados y qué límites tienen.</p></a>
            <a className="wow-article wow-reveal" href="/blog.html"><small className="wow-gradient-text">Ahorro</small><h3>Más artículos del blog</h3><p>Recursos prácticos para llegar desde Google a herramientas útiles.</p></a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

function CalculatorCards({ onNavigate }: { onNavigate: Navigate }) {
  const cards = [
    { mode: 'salario', icon: WalletCards, title: 'Salario neto 2026', text: 'De bruto a neto con IRPF y Seguridad Social.' },
    { mode: 'autonomos', icon: Briefcase, title: 'Autónomos 2026', text: 'Tramo, cuota aproximada y reserva fiscal.' },
    { mode: 'tiktok-millonario', icon: PiggyBank, title: 'Calculadora millonaria', text: 'El año en que llegarás al millón invirtiendo cada mes.' },
    { mode: 'hipoteca', icon: Home, title: 'Hipoteca', text: 'Cuota mensual, intereses y fija frente a variable.' },
    { mode: 'indemnizacion-despido', icon: Scale, title: 'Indemnización por despido', text: 'Improcedente, objetivo o fin de contrato.' },
    { mode: 'coste-empleado', icon: Building2, title: 'Coste de un empleado', text: 'Lo que paga la empresa frente al neto real.' },
    { mode: 'gastos', icon: Smartphone, title: 'Control de gastos', text: 'Dinero tranquilo, objetivos y exportación.' },
  ];
  return (
    <div className="wow-grid cards">
      {cards.map(({ mode, icon: Icon, title, text }) => (
        <button key={mode} className="wow-card wow-reveal" type="button" onClick={() => onNavigate(mode)}>
          <span className="ico"><Icon size={22} /></span>
          <h3>{title}</h3>
          <p>{text}</p>
          <div className="go">Calcular</div>
        </button>
      ))}
    </div>
  );
}

export function WowSalaryPage({ onNavigate }: { onNavigate: Navigate }) {
  const [gross, setGross] = useState(28000);
  const [pagas, setPagas] = useState(12);
  const [ageBand, setAgeBand] = useState<0 | 1 | 2>(0);
  const [kids, setKids] = useState(0);
  const data = useMemo(() => calculateSalaryNet({ gross, pagas, ageBand, kids }), [gross, pagas, ageBand, kids]);
  const ratios = { net: data.net / gross || 0, irpf: data.irpf / gross || 0, ss: data.socialSecurity / gross || 0 };
  return (
    <ToolLayout onNavigate={onNavigate} eyebrow="Salario neto 2026" title="Calcula tu sueldo neto sin pelearte con una nómina" text="Introduce tu bruto anual, pagas y situación familiar básica. Verás una estimación orientativa clara y compartible.">
      <div className="wow-grid two">
        <div>
          <div className="wow-field">
            <label className="wow-label" htmlFor="salaryGross">Bruto anual</label>
            <input id="salaryGross" value={formatNumber(gross)} inputMode="numeric" onChange={(event) => setGross(parseEuro(event.target.value))} />
          </div>
          <input className="wow-range" type="range" min={14000} max={120000} step={500} value={gross} onChange={(event) => setGross(Number(event.target.value))} />
          <div className="wow-chip-row">
            {[12, 14].map((value) => <button key={value} className={`wow-chip ${pagas === value ? 'on' : ''}`} type="button" onClick={() => setPagas(value)}>{value} pagas</button>)}
            {(['<65', '65-74', '75+'] as const).map((label, index) => <button key={label} className={`wow-chip ${ageBand === index ? 'on' : ''}`} type="button" onClick={() => setAgeBand(index as 0 | 1 | 2)}>{label}</button>)}
          </div>
          <div className="wow-chip-row">
            <button className="wow-chip" type="button" onClick={() => setKids(Math.max(0, kids - 1))}>-</button>
            <span className="wow-chip on">{kids} hijos</span>
            <button className="wow-chip" type="button" onClick={() => setKids(Math.min(6, kids + 1))}>+</button>
          </div>
          <div className="wow-result">
            <div className="label">Neto por paga</div>
            <div className="big num">{formatEuro(data.perPay)}</div>
            <div className="wow-bars">
              <BarRow label="Neto" value={formatEuro(data.net)} pct={ratios.net * 100} tone="net" />
              <BarRow label="IRPF" value={formatEuro(data.irpf)} pct={ratios.irpf * 100} tone="irpf" />
              <BarRow label="Seg. Social" value={formatEuro(data.socialSecurity)} pct={ratios.ss * 100} tone="ss" />
            </div>
          </div>
        </div>
        <Donut netRatio={ratios.net} irpfRatio={ratios.irpf} ssRatio={ratios.ss} />
      </div>
      <ToolShare text={`Con ${formatEuro(gross)} brutos me quedan ${formatEuro(data.perPay)} por paga. Calcúlalo: https://finanzasmuyfacil.com/calculadora-salario-neto`} />
    </ToolLayout>
  );
}

export function WowAutonomosPage({ onNavigate }: { onNavigate: Navigate }) {
  const [income, setIncome] = useState(36000);
  const [expenses, setExpenses] = useState(6000);
  const [cuotaReducida, setCuotaReducida] = useState(false);
  const [cuotaReducidaMensual, setCuotaReducidaMensual] = useState(AUTONOMOS_CUOTA_REDUCIDA_CON_MEI);
  const [baseCotizacion, setBaseCotizacion] = useState<number | undefined>(undefined);
  const data = useMemo(
    () => calculateAutonomos({ income, expenses, cuotaReducida, baseCotizacion, cuotaReducidaMensual }),
    [income, expenses, cuotaReducida, baseCotizacion, cuotaReducidaMensual],
  );
  const formatTramoLimit = (value: number) => formatEuro(value, Number.isInteger(value) ? 0 : 2);
  const tramoLabel = data.tramo.maxRendimiento === Infinity
    ? `Más de ${formatTramoLimit(data.tramo.minRendimiento)} al mes`
    : data.tramo.maxInclusive
      ? `${formatTramoLimit(data.tramo.minRendimiento)} a ${formatTramoLimit(data.tramo.maxRendimiento)} al mes`
      : `${formatTramoLimit(data.tramo.minRendimiento)} a menos de ${formatTramoLimit(data.tramo.maxRendimiento)} al mes`;
  return (
    <ToolLayout onNavigate={onNavigate} eyebrow="Autónomos 2026" title="Calculadora de autónomos 2026" text="Actividad individual en estimación directa y de alta todo el año. Importes sin IVA; los gastos no deben incluir tu cuota de autónomos.">
      <div className="wow-form-grid">
        <MoneyField id="autoIncome" label="Ingresos anuales previstos" value={income} onChange={(value) => setIncome(Math.min(value, AUTONOMOS_IMPORTE_MAXIMO))} />
        <MoneyField id="autoExpenses" label="Gastos anuales sin cuota de autónomos" value={expenses} onChange={(value) => setExpenses(Math.min(value, AUTONOMOS_IMPORTE_MAXIMO))} />
      </div>
      <label className="wow-autonomos-check">
        <input type="checkbox" checked={cuotaReducida} onChange={(event) => setCuotaReducida(event.target.checked)} />
        Tengo reconocida la cuota reducida
      </label>
      {cuotaReducida && (
        <div className="wow-field">
          <label className="wow-label" htmlFor="autoReducedFee">Cuota mensual de mi recibo, con MEI (€)</label>
          <input id="autoReducedFee" type="number" min="0" max="2000" step="0.01" value={cuotaReducidaMensual} onChange={(event) => setCuotaReducidaMensual(Math.min(2000, Math.max(0, Number(event.target.value) || 0)))} />
          <p className="wow-fine">Referencia de Importass: 88,64 €. El importe aplicable es el de tu recibo confirmado; este cálculo no verifica el derecho al beneficio.</p>
        </div>
      )}
      <div className="wow-kpis">
        <Kpi label="Cuota mensual estimada" value={formatEuro(data.cuota, 2)} />
        <Kpi label="Reserva fiscal mensual" value={formatEuro(data.reservaFiscalAnual / 12)} />
        <Kpi label="Margen mensual tras reserva" value={formatEuro(data.margenMensual)} />
      </div>
      <p className="wow-fine">Rendimiento computable para cotización, tras el 7 % de gastos genéricos: {formatEuro(data.rendimientoMensual, 2)} al mes. Ese 7 % no se descuenta otra vez para la reserva de IRPF. La reserva usa un 20 % orientativo después de gastos y cuotas; no es tu IRPF final ni confirma si debes presentar el Modelo 130.</p>

      {!cuotaReducida && <details className="wow-disclosure">
        <summary>Ajustar la base dentro de mi tramo</summary>
        <div className="wow-disclosure-body">
          <p>Tu tramo aproximado: <strong>{tramoLabel}</strong>. Puedes elegir una base entre {formatEuro(data.tramo.baseMinima)} y {formatEuro(data.tramo.baseMaxima)} al mes.</p>
          <label className="wow-label" htmlFor="autoBase">Base usada para esta estimación: <strong className="num">{formatEuro(data.baseUsada, 2)}</strong></label>
          <input
            id="autoBase"
            className="wow-range"
            type="range"
            min={data.tramo.baseMinima}
            max={data.tramo.baseMaxima}
            step={0.01}
            value={data.baseUsada}
            onChange={(event) => setBaseCotizacion(Number(event.target.value))}
          />
        </div>
      </details>}

      <details className="wow-disclosure">
        <summary>Ver todos los tramos de bases de 2026</summary>
        <div className="wow-disclosure-body wow-table-scroll">
          <table className="wow-table">
            <thead><tr><th>Rendimientos netos/mes</th><th>Base mínima</th><th>Base máxima</th></tr></thead>
            <tbody>
              {AUTONOMOS_TRAMOS.map((tramo) => {
                const label = tramo.maxRendimiento === Infinity
                  ? `Más de ${formatTramoLimit(tramo.minRendimiento)}`
                  : tramo.maxInclusive
                    ? `${formatTramoLimit(tramo.minRendimiento)} - ${formatTramoLimit(tramo.maxRendimiento)}`
                    : `${formatTramoLimit(tramo.minRendimiento)} - < ${formatTramoLimit(tramo.maxRendimiento)}`;
                return <tr key={`${tramo.minRendimiento}-${tramo.maxRendimiento}`}><td>{label}</td><td className="num">{formatEuro(tramo.baseMinima, 2)}</td><td className="num">{formatEuro(tramo.baseMaxima, 2)}</td></tr>;
              })}
            </tbody>
          </table>
        </div>
      </details>

      <div className="wow-tool-note">
        <strong>Alcance.</strong> La cuota ordinaria usa el 31,5 % sobre la base elegida. No se calculan particularidades de societarios, pluriactividad, altas parciales ni regularizaciones de otros años. Contrasta tus datos y cobertura en Importass.
        <a href="/cuota-autonomos-2026.html"> Ver fuentes y explicación.</a>
      </div>
      <ToolShare text={`Con ${formatEuro(income)} de ingresos previstos, mi cuota aproximada es ${formatEuro(data.cuota)}. Compruébalo: https://finanzasmuyfacil.com/autonomos`} />
    </ToolLayout>
  );
}

export function WowHipotecaPage({ onNavigate }: { onNavigate: Navigate }) {
  const [principal, setPrincipal] = useState(180000);
  const [years, setYears] = useState(30);
  const [fixedRate, setFixedRate] = useState(2.9);
  const [variableRate, setVariableRate] = useState(3.4);
  const fixed = useMemo(() => calculateMortgage(principal, fixedRate, years), [principal, fixedRate, years]);
  const variable = useMemo(() => calculateMortgage(principal, variableRate, years), [principal, variableRate, years]);
  const rows = useMemo(() => calculateAmortizationByYear(principal, fixedRate, years), [principal, fixedRate, years]);
  const fixedWins = fixed.total <= variable.total;
  return (
    <ToolLayout onNavigate={onNavigate} eyebrow="Hipoteca" title="Compara fija y variable antes de firmar" text="Simula la cuota, los intereses totales y cómo se reparte capital e intereses año a año.">
      <div className="wow-form-grid">
        <MoneyField id="mortPrincipal" label="Importe de la hipoteca" value={principal} onChange={setPrincipal} />
        <div className="wow-field"><label className="wow-label" htmlFor="mortYears">Años</label><input id="mortYears" value={years} inputMode="numeric" onChange={(event) => setYears(Math.min(40, Math.max(5, parseEuro(event.target.value))))} /></div>
        <div className="wow-field"><label className="wow-label" htmlFor="fixedRate">Tipo fijo (%)</label><input id="fixedRate" value={fixedRate} inputMode="decimal" onChange={(event) => setFixedRate(Number(event.target.value.replace(',', '.')) || 0)} /></div>
        <div className="wow-field"><label className="wow-label" htmlFor="variableRate">Tipo variable (%)</label><input id="variableRate" value={variableRate} inputMode="decimal" onChange={(event) => setVariableRate(Number(event.target.value.replace(',', '.')) || 0)} /></div>
      </div>
      <input className="wow-range" type="range" min={5} max={40} value={years} onChange={(event) => setYears(Number(event.target.value))} />
      <div className="wow-kpis">
        <Kpi label="Cuota fija" value={formatEuro(fixed.monthlyPayment)} />
        <Kpi label="Cuota variable" value={formatEuro(variable.monthlyPayment)} />
        <Kpi label="Ahorro estimado" value={formatEuro(Math.abs(fixed.total - variable.total))} />
      </div>
      <p className="wow-fine">Con estos datos, la opción {fixedWins ? 'fija' : 'variable'} saldría mejor. La variable puede cambiar con el tiempo.</p>
      <AmortizationChart rows={rows} />
      <ToolShare text={`Hipoteca de ${formatEuro(principal)} a ${years} años: fija ${formatEuro(fixed.monthlyPayment)}/mes vs variable ${formatEuro(variable.monthlyPayment)}/mes. https://finanzasmuyfacil.com/calculadora-hipoteca`} />
    </ToolLayout>
  );
}

export function WowMillionairePage({ onNavigate }: { onNavigate: Navigate }) {
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(300);
  const [rate, setRate] = useState(7);
  const [goal, setGoal] = useState(1000000);
  const data = useMemo(() => simulateMillionaire(initial, monthly, rate, goal), [initial, monthly, rate, goal]);
  const year = data.reached ? Math.round(CURRENT_YEAR + data.months / 12) : '+100 años';
  const aportado = initial + monthly * data.months;
  const interest = Math.max(0, data.final - aportado);
  return (
    <ToolLayout onNavigate={onNavigate} eyebrow="Interés compuesto" title="Descubre cuándo llegarás a tu primer millón" text="No es magia: es tiempo, constancia y una rentabilidad media. Ajusta tus números y comparte tu año.">
      <div className="wow-form-grid">
        <MoneyField id="mInitial" label="Ahorro inicial" value={initial} onChange={setInitial} />
        <MoneyField id="mMonthly" label="Aportación mensual" value={monthly} onChange={setMonthly} />
        <div className="wow-field"><label className="wow-label" htmlFor="mRate">Rentabilidad anual (%)</label><input id="mRate" value={rate} inputMode="decimal" onChange={(event) => setRate(Number(event.target.value.replace(',', '.')) || 0)} /></div>
        <MoneyField id="mGoal" label="Objetivo" value={goal} onChange={setGoal} />
      </div>
      <div className="wow-kpis">
        <Kpi label="Llegarías en" value={String(year)} />
        <Kpi label="Aportado" value={formatEuro(aportado)} />
        <Kpi label="Intereses" value={formatEuro(interest)} />
      </div>
      <MillionChart series={data.series} goal={goal} />
      <div className="wow-milestones">
        {Object.entries(data.milestones).map(([mark, month]) => (
          <div key={mark} className="wow-mile">
            <span className="num">{formatEuro(Number(mark))}</span>
            <span>a los {formatNumber(month / 12, 1)} años</span>
            <span className="num">{Math.round(CURRENT_YEAR + month / 12)}</span>
          </div>
        ))}
      </div>
      <div className="wow-cta">
        <ToolShare text={`Llegaría a ${formatEuro(goal)} en ${year} aportando ${formatEuro(monthly)} al mes. https://finanzasmuyfacil.com/cuando-sere-millonario`} inline />
        <button className="wow-btn" type="button" onClick={() => downloadMillionCard(year, monthly, goal)}>Descargar tarjeta</button>
      </div>
    </ToolLayout>
  );
}

export function WowSeverancePage({ onNavigate }: { onNavigate: Navigate }) {
  const [salary, setSalary] = useState(26000);
  const [startDate, setStartDate] = useState('2018-09-01');
  const [endDate, setEndDate] = useState('2026-07-31');
  const [type, setType] = useState<'impro' | 'obj' | 'temp'>('impro');
  const data = useMemo(() => calculateSeverance({ salary, startDate, endDate, type }), [salary, startDate, endDate, type]);
  return (
    <ToolLayout onNavigate={onNavigate} eyebrow="Laboral" title="Calcula una indemnización por despido en minutos" text="Una estimación clara para entender días, antigüedad, salario diario y topes habituales.">
      <div className="wow-form-grid">
        <MoneyField id="sevSalary" label="Salario bruto anual" value={salary} onChange={setSalary} />
        <div className="wow-field"><label className="wow-label" htmlFor="startDate">Fecha de alta</label><input id="startDate" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></div>
        <div className="wow-field"><label className="wow-label" htmlFor="endDate">Fecha de despido</label><input id="endDate" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} /></div>
        <div className="wow-field">
          <label className="wow-label" htmlFor="sevType">Tipo</label>
          <select id="sevType" value={type} onChange={(event) => setType(event.target.value as 'impro' | 'obj' | 'temp')}>
            <option value="impro">Improcedente</option>
            <option value="obj">Objetivo</option>
            <option value="temp">Fin de contrato temporal</option>
          </select>
        </div>
      </div>
      {data && (
        <>
          <div className="wow-kpis">
            <Kpi label="Indemnización aprox." value={formatEuro(data.total)} />
            <Kpi label="Días" value={`${formatNumber(data.days, 1)}`} />
            <Kpi label="Antigüedad" value={data.tenureText} />
          </div>
          <table className="wow-table">
            <tbody>
              <tr><th>Salario diario</th><td>{formatEuro(data.dailySalary, 2)}</td></tr>
              <tr><th>Tope aplicado</th><td>{data.capText}</td></tr>
              <tr><th>Nota</th><td>{data.capped ? 'Se ha aplicado el tope legal orientativo.' : 'No se ha alcanzado el tope en esta simulación.'}</td></tr>
            </tbody>
          </table>
          <ToolShare text={`Mi indemnización estimada sería ${formatEuro(data.total)} (${data.tenureText}). https://finanzasmuyfacil.com/indemnizacion-despido`} />
        </>
      )}
    </ToolLayout>
  );
}

export function WowEmployeeCostPage({ onNavigate }: { onNavigate: Navigate }) {
  const [gross, setGross] = useState(30000);
  const [contractType, setContractType] = useState<'ind' | 'temp'>('ind');
  const [accidentRate, setAccidentRate] = useState(1.5);
  const data = useMemo(() => calculateEmployeeCost({ gross, contractType, accidentRate }), [gross, contractType, accidentRate]);
  return (
    <ToolLayout onNavigate={onNavigate} eyebrow="Empresa y nómina" title="Lo que cuesta realmente contratar a una persona" text="Compara el salario bruto, el coste total de empresa y el neto aproximado que llega al trabajador.">
      <MoneyField id="empGross" label="Salario bruto anual" value={gross} onChange={setGross} />
      <div className="wow-chip-row">
        <button className={`wow-chip ${contractType === 'ind' ? 'on' : ''}`} type="button" onClick={() => setContractType('ind')}>Indefinido</button>
        <button className={`wow-chip ${contractType === 'temp' ? 'on' : ''}`} type="button" onClick={() => setContractType('temp')}>Temporal</button>
        {[1.5, 2.5, 4].map((rate) => <button key={rate} className={`wow-chip ${accidentRate === rate ? 'on' : ''}`} type="button" onClick={() => setAccidentRate(rate)}>AT {String(rate).replace('.', ',')}%</button>)}
      </div>
      <div className="wow-kpis">
        <Kpi label="Coste empresa" value={formatEuro(data.cost)} />
        <Kpi label="Coste mensual" value={formatEuro(data.cost / 12)} />
        <Kpi label="Neto trabajador" value={formatEuro(data.net)} />
      </div>
      <div className="wow-bars">
        <BarRow label="Coste" value={formatEuro(data.cost)} pct={100} tone="ss" />
        <BarRow label="Bruto" value={formatEuro(data.gross)} pct={(data.gross / data.cost) * 100} tone="irpf" />
        <BarRow label="Neto" value={formatEuro(data.net)} pct={(data.net / data.cost) * 100} tone="net" />
      </div>
      <table className="wow-table">
        <tbody>
          <tr><th>Contingencias comunes</th><td>{formatEuro(data.contingenciasComunes)}</td></tr>
          <tr><th>Desempleo</th><td>{formatEuro(data.desempleo)}</td></tr>
          <tr><th>FOGASA</th><td>{formatEuro(data.fogasa)}</td></tr>
          <tr><th>Accidentes de trabajo</th><td>{formatEuro(data.accidentes)}</td></tr>
          <tr><th>MEI</th><td>{formatEuro(data.mei)}</td></tr>
        </tbody>
      </table>
      <ToolShare text={`Un empleado con ${formatEuro(gross)} brutos cuesta a la empresa ${formatEuro(data.cost)} al año y recibe unos ${formatEuro(data.net)} netos. https://finanzasmuyfacil.com/coste-empleado`} />
    </ToolLayout>
  );
}

function ToolLayout({ onNavigate, eyebrow, title, text, children }: { onNavigate: Navigate; eyebrow: string; title: string; text: string; children: React.ReactNode }) {
  return (
    <MainLayout onNavigate={onNavigate}>
      <div className="wrap">
        <section className="wow-page-hero">
          <div className="wow-grid">
            <div>
              <span className="wow-eyebrow"><span className="wow-dot" /> {eyebrow}</span>
              <h1>{title}</h1>
              <p>{text}</p>
              <div className="wow-cta">
                <button className="wow-btn" type="button" onClick={() => onNavigate('landing')}>Volver al inicio</button>
              </div>
            </div>
            <div className="wow-panel pad">{children}</div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

function MoneyField({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className="wow-field">
      <label className="wow-label" htmlFor={id}>{label}</label>
      <input id={id} className="num" value={formatNumber(value)} inputMode="numeric" onChange={(event) => onChange(parseEuro(event.target.value))} />
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return <div className="wow-kpi"><span>{label}</span><strong className="num">{value}</strong></div>;
}

function ToolShare({ text, inline = false }: { text: string; inline?: boolean }) {
  return (
    <button className={`wow-btn ${inline ? '' : 'primary'}`} type="button" onClick={(event) => shareText(text, event.currentTarget)}>
      <Share2 size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: -3 }} />
      Compartir resultado
    </button>
  );
}

function MillionChart({ series, goal }: { series: number[]; goal: number }) {
  const pathData = useMemo(() => {
    const width = 640;
    const height = 260;
    const pad = 14;
    const maxValue = Math.max(goal * 1.02, ...series);
    const last = Math.max(1, series.length - 1);
    const x = (index: number) => pad + (width - 2 * pad) * index / last;
    const y = (value: number) => height - 14 - (height - 52) * value / maxValue;
    const step = Math.max(1, Math.floor(last / 150));
    let d = `M ${x(0)} ${y(series[0])}`;
    for (let index = step; index <= last; index += step) d += ` L ${x(index)} ${y(series[index])}`;
    d += ` L ${x(last)} ${y(series[last])}`;
    return { d, area: `${d} L ${x(last)} ${height - 14} L ${x(0)} ${height - 14} Z`, goalY: y(goal) };
  }, [series, goal]);
  return (
    <svg className="wow-chart" viewBox="0 0 640 260" role="img" aria-label="Curva de interés compuesto">
      <defs>
        <linearGradient id="wowCurve" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="var(--brand2)" /><stop offset="1" stopColor="var(--green)" /></linearGradient>
        <linearGradient id="wowArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--green)" stopOpacity=".34" /><stop offset="1" stopColor="var(--green)" stopOpacity="0" /></linearGradient>
      </defs>
      <path d={pathData.area} fill="url(#wowArea)" stroke="none" />
      <path d={pathData.d} stroke="url(#wowCurve)" />
      <line x1="0" x2="640" y1={pathData.goalY} y2={pathData.goalY} stroke="var(--line)" strokeDasharray="5 6" />
      <text x="12" y={pathData.goalY - 8}>{formatEuro(goal)}</text>
    </svg>
  );
}

function AmortizationChart({ rows }: { rows: Array<{ interest: number; amortized: number }> }) {
  const width = 640;
  const height = 210;
  const max = Math.max(...rows.map((row) => row.interest + row.amortized), 1);
  const gap = width / rows.length;
  const barWidth = Math.max(3, gap * 0.7);
  return (
    <svg className="wow-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Amortización anual">
      {rows.map((row, index) => {
        const amortHeight = (height - 34) * row.amortized / max;
        const interestHeight = (height - 34) * row.interest / max;
        const x = index * gap + gap * 0.15;
        return (
          <g key={index}>
            <rect x={x} y={height - 18 - amortHeight} width={barWidth} height={amortHeight} rx="2" fill="var(--green)" />
            <rect x={x} y={height - 18 - amortHeight - interestHeight} width={barWidth} height={interestHeight} rx="2" fill="var(--amber)" />
            {(rows.length <= 15 || index % 5 === 0) && <text x={x + barWidth / 2} y={height - 3} textAnchor="middle">{index + 1}</text>}
          </g>
        );
      })}
    </svg>
  );
}

function downloadMillionCard(year: string | number, monthly: number, goal: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
  gradient.addColorStop(0, '#2563eb');
  gradient.addColorStop(1, '#10b981');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1080);
  ctx.fillStyle = 'rgba(255,255,255,.14)';
  ctx.beginPath();
  ctx.arc(900, 130, 260, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '800 72px Sora, Inter, sans-serif';
  ctx.fillText('FinanzasFácil', 90, 150);
  ctx.font = '800 118px Sora, Inter, sans-serif';
  ctx.fillText(String(year), 90, 500);
  ctx.font = '600 42px Inter, sans-serif';
  ctx.fillText(`Llegando a ${formatEuro(goal)} con ${formatEuro(monthly)} al mes`, 90, 590);
  ctx.fillText('Calcula tu año en finanzasmuyfacil.com', 90, 900);
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'finanzasfacil-millonario.png';
    link.click();
    URL.revokeObjectURL(url);
  });
}
