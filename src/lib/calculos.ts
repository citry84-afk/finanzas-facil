export const IRPF_TRAMOS: Array<[number, number]> = [
  [12450, 0.19],
  [20200, 0.24],
  [35200, 0.30],
  [60000, 0.37],
  [300000, 0.45],
  [Infinity, 0.47],
];

export interface AutonomosTramo {
  minRendimiento: number;
  maxRendimiento: number;
  maxInclusive: boolean;
  baseMinima: number;
  baseMaxima: number;
  tabla: 'reducida' | 'general';
}

// Bases mensuales publicadas por la Seguridad Social para 2026. La cuota
// resultante es una estimación: la situación concreta puede tener coberturas,
// bonificaciones o reglas adicionales.
export const AUTONOMOS_TRAMOS: AutonomosTramo[] = [
  { minRendimiento: 0, maxRendimiento: 670, maxInclusive: true, baseMinima: 653.59, baseMaxima: 718.94, tabla: 'reducida' },
  { minRendimiento: 670, maxRendimiento: 900, maxInclusive: true, baseMinima: 718.95, baseMaxima: 900, tabla: 'reducida' },
  { minRendimiento: 900, maxRendimiento: 1166.7, maxInclusive: false, baseMinima: 849.67, baseMaxima: 1166.7, tabla: 'reducida' },
  { minRendimiento: 1166.7, maxRendimiento: 1300, maxInclusive: true, baseMinima: 950.98, baseMaxima: 1300, tabla: 'general' },
  { minRendimiento: 1300, maxRendimiento: 1500, maxInclusive: true, baseMinima: 960.78, baseMaxima: 1500, tabla: 'general' },
  { minRendimiento: 1500, maxRendimiento: 1700, maxInclusive: true, baseMinima: 960.78, baseMaxima: 1700, tabla: 'general' },
  { minRendimiento: 1700, maxRendimiento: 1850, maxInclusive: true, baseMinima: 1143.79, baseMaxima: 1850, tabla: 'general' },
  { minRendimiento: 1850, maxRendimiento: 2030, maxInclusive: true, baseMinima: 1209.15, baseMaxima: 2030, tabla: 'general' },
  { minRendimiento: 2030, maxRendimiento: 2330, maxInclusive: true, baseMinima: 1274.51, baseMaxima: 2330, tabla: 'general' },
  { minRendimiento: 2330, maxRendimiento: 2760, maxInclusive: true, baseMinima: 1356.21, baseMaxima: 2760, tabla: 'general' },
  { minRendimiento: 2760, maxRendimiento: 3190, maxInclusive: true, baseMinima: 1437.91, baseMaxima: 3190, tabla: 'general' },
  { minRendimiento: 3190, maxRendimiento: 3620, maxInclusive: true, baseMinima: 1519.61, baseMaxima: 3620, tabla: 'general' },
  { minRendimiento: 3620, maxRendimiento: 4050, maxInclusive: true, baseMinima: 1601.31, baseMaxima: 4050, tabla: 'general' },
  { minRendimiento: 4050, maxRendimiento: 6000, maxInclusive: true, baseMinima: 1732.03, baseMaxima: 5101.2, tabla: 'general' },
  { minRendimiento: 6000, maxRendimiento: Infinity, maxInclusive: true, baseMinima: 1928.1, baseMaxima: 5101.2, tabla: 'general' },
];

export const AUTONOMOS_TIPO_CUOTA_ESTIMADO = 0.315;
export const AUTONOMOS_CUOTA_REDUCIDA = 80;
// Referencia publicada en la guia de Importass; el recibo real puede variar.
export const AUTONOMOS_CUOTA_REDUCIDA_CON_MEI = 88.64;
export const AUTONOMOS_GASTOS_GENERICOS = 0.07;

export function parseEuro(value: string | number): number {
  if (typeof value === 'number') return Math.max(0, value);
  return Math.max(0, parseInt(value.replace(/[^\d]/g, ''), 10) || 0);
}

export function parseRate(value: string | number): number {
  if (typeof value === 'number') return Math.max(0, value);
  return Math.max(0, parseFloat(value.replace(',', '.').replace(/[^\d.]/g, '')) || 0);
}

export function formatEuro(value: number, decimals = 0): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function calculateIrpf(base: number): number {
  let tax = 0;
  let previous = 0;
  for (const [limit, rate] of IRPF_TRAMOS) {
    if (base <= previous) break;
    tax += (Math.min(base, limit) - previous) * rate;
    previous = limit;
  }
  return Math.max(0, tax);
}

export function calculateSalaryNet(params: {
  gross: number;
  pagas?: number;
  ageBand?: 0 | 1 | 2;
  kids?: number;
}) {
  const { gross, pagas = 12, ageBand = 0, kids = 0 } = params;
  const socialSecurity = Math.min(gross * 0.0648, 3817);
  const base = Math.max(0, gross - socialSecurity - 5000);
  const kidMinimums = [2400, 2700, 4000, 4500];
  let personalMinimum = 5550;
  if (ageBand >= 1) personalMinimum += 1150;
  if (ageBand >= 2) personalMinimum += 1400;
  for (let i = 0; i < kids; i += 1) {
    personalMinimum += kidMinimums[Math.min(i, 3)];
  }
  const irpf = Math.max(0, calculateIrpf(base) - calculateIrpf(personalMinimum));
  const net = gross - socialSecurity - irpf;
  return {
    gross,
    base,
    irpf,
    socialSecurity,
    net,
    perPay: net / pagas,
    netRatio: gross > 0 ? net / gross : 0,
  };
}

export function calculateAutonomos(params: {
  income: number;
  expenses: number;
  cuotaReducida?: boolean;
  baseCotizacion?: number;
  cuotaReducidaMensual?: number;
}) {
  const { income, expenses, cuotaReducida = false, baseCotizacion, cuotaReducidaMensual = AUTONOMOS_CUOTA_REDUCIDA_CON_MEI } = params;
  for (const value of [income, expenses, baseCotizacion, cuotaReducidaMensual]) {
    if (value !== undefined && (!Number.isFinite(value) || value < 0)) {
      throw new RangeError('Los importes deben ser finitos y no negativos.');
    }
  }
  // Actividad individual en estimacion directa, todo el ano; expenses excluye
  // la cuota propia, que se descuenta despues para la reserva de liquidez.
  const rendimientoAnual = Math.max(0, income - expenses);
  const rendimientoMensual = Math.round(rendimientoAnual * (1 - AUTONOMOS_GASTOS_GENERICOS) / 12 * 100) / 100;
  const tramoIndex = AUTONOMOS_TRAMOS.findIndex((tramo) => (
    rendimientoMensual < tramo.maxRendimiento || (tramo.maxInclusive && rendimientoMensual === tramo.maxRendimiento)
  ));
  const selectedIndex = tramoIndex === -1 ? AUTONOMOS_TRAMOS.length - 1 : tramoIndex;
  const tramo = AUTONOMOS_TRAMOS[selectedIndex];
  const baseUsada = Math.max(tramo.baseMinima, Math.min(baseCotizacion ?? tramo.baseMinima, tramo.baseMaxima));
  const cuota = cuotaReducida ? cuotaReducidaMensual : Math.round(baseUsada * AUTONOMOS_TIPO_CUOTA_ESTIMADO * 100) / 100;
  const cuotasAnuales = cuota * 12;
  const rendimientoDespuesCuota = income - expenses - cuotasAnuales;
  const reservaFiscalAnual = Math.max(0, rendimientoDespuesCuota) * 0.2;
  const margenMensual = (rendimientoDespuesCuota - reservaFiscalAnual) / 12;
  return {
    income,
    expenses,
    rendimientoMensual,
    tramoIndex: selectedIndex,
    tramo,
    baseUsada,
    cuota,
    reservaFiscalAnual,
    margenMensual,
  };
}

export function calculateMortgage(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  const monthlyPayment = monthlyRate > 0 ? principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)) : principal / months;
  return {
    monthlyPayment,
    total: monthlyPayment * months,
    interest: monthlyPayment * months - principal,
  };
}

export function calculateAmortizationByYear(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12;
  const { monthlyPayment } = calculateMortgage(principal, annualRate, years);
  let balance = principal;
  return Array.from({ length: years }, () => {
    let interest = 0;
    let amortized = 0;
    for (let month = 0; month < 12; month += 1) {
      const monthInterest = balance * monthlyRate;
      const monthAmortized = monthlyPayment - monthInterest;
      interest += monthInterest;
      amortized += monthAmortized;
      balance -= monthAmortized;
    }
    return { interest, amortized };
  });
}

export function simulateMillionaire(initial: number, monthly: number, annualRate: number, goal: number) {
  const monthlyRate = annualRate / 100 / 12;
  let balance = initial;
  let months = 0;
  const series = [balance];
  const milestones: Record<number, number> = {};
  const marks = [100000, 250000, 500000, 1000000, 2000000].filter((mark) => mark <= goal);
  while (balance < goal && months < 1200) {
    balance = balance * (1 + monthlyRate) + monthly;
    months += 1;
    series.push(balance);
    for (const mark of marks) {
      if (!(mark in milestones) && balance >= mark) milestones[mark] = months;
    }
  }
  return { months, series, milestones, final: balance, reached: balance >= goal };
}

export function monthsBetween(start: Date, end: Date): number {
  if (end <= start) return 0;
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const anchor = new Date(start);
  anchor.setMonth(start.getMonth() + months);
  if (end > anchor) months += 1;
  return Math.max(1, months);
}

export function calculateSeverance(params: {
  salary: number;
  startDate: string;
  endDate: string;
  type: 'impro' | 'obj' | 'temp';
}) {
  const { salary, startDate, endDate, type } = params;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (!salary || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return null;
  }
  const cutoff = new Date('2012-02-12');
  const tenureMonths = monthsBetween(start, end);
  const dailySalary = salary / 365;
  let days = 0;
  let preDays = 0;
  let capText = 'Sin tope específico';
  let capped = false;
  if (type === 'impro') {
    if (start < cutoff) {
      const preMonths = monthsBetween(start, cutoff);
      const postMonths = Math.max(0, tenureMonths - preMonths);
      preDays = preMonths * (45 / 12);
      days = preDays + postMonths * (33 / 12);
      capText = `720 días (24 mensualidades)${preDays > 720 ? ' -> derecho consolidado, máx. 42' : ''}`;
      if (days > 720) {
        days = preDays > 720 ? Math.min(preDays, 1260) : 720;
        capped = true;
      }
    } else {
      days = tenureMonths * (33 / 12);
      capText = '720 días (24 mensualidades)';
      if (days > 720) {
        days = 720;
        capped = true;
      }
    }
  } else if (type === 'obj') {
    days = tenureMonths * (20 / 12);
    capText = '360 días (12 mensualidades)';
    if (days > 360) {
      days = 360;
      capped = true;
    }
  } else {
    days = tenureMonths;
  }
  return {
    days,
    preDays,
    dailySalary,
    total: days * dailySalary,
    tenureMonths,
    tenureText: `${Math.floor(tenureMonths / 12)} años ${tenureMonths % 12} meses`,
    capText,
    capped,
  };
}

export function calculateEmployeeCost(params: { gross: number; contractType: 'ind' | 'temp'; accidentRate: number }) {
  const { gross, contractType, accidentRate } = params;
  const base = Math.min(gross, 58920);
  const unemploymentRate = contractType === 'ind' ? 0.055 : 0.067;
  const contingenciasComunes = base * 0.236;
  const desempleo = base * unemploymentRate;
  const fogasa = base * 0.008;
  const accidentes = base * (accidentRate / 100);
  const mei = base * 0.0075;
  const employerContributions = contingenciasComunes + desempleo + fogasa + accidentes + mei;
  const cost = gross + employerContributions;
  const workerSocialSecurity = Math.min(gross * 0.0648, 3817);
  const irpf = Math.max(0, calculateIrpf(Math.max(0, gross - workerSocialSecurity - 2000)) - calculateIrpf(5550));
  const net = gross - workerSocialSecurity - irpf;
  return {
    gross,
    cost,
    net,
    employerContributions,
    contingenciasComunes,
    desempleo,
    fogasa,
    accidentes,
    mei,
  };
}
