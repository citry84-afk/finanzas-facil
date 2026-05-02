import { useMemo, useState } from 'react';

type MortgageType = 'fija' | 'variable';

function monthlyPaymentFromPrincipal(
  principal: number,
  annualNominalPercent: number,
  years: number
): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualNominalPercent / 100 / 12;
  const n = Math.round(years * 12);
  if (r === 0) return principal / n;
  const factor = (1 + r) ** n;
  return (principal * r * factor) / (factor - 1);
}

function totalInterest(principal: number, monthly: number, years: number): number {
  const n = Math.round(years * 12);
  return Math.max(0, monthly * n - principal);
}

function formatEur(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export default function HipotecaCalculator() {
  const [tipo, setTipo] = useState<MortgageType>('fija');
  const [capital, setCapital] = useState(180_000);
  const [plazoAnos, setPlazoAnos] = useState(30);
  const [tinFija, setTinFija] = useState(3.2);
  const [euribor, setEuribor] = useState(2.5);
  const [diferencial, setDiferencial] = useState(0.99);
  const [euriborStress, setEuriborStress] = useState(4.5);
  const [ingresosNetos, setIngresosNetos] = useState(2_800);
  const [valorVivienda, setValorVivienda] = useState(250_000);

  const tinVariable = euribor + diferencial;
  const tinVariableStress = euriborStress + diferencial;

  const resultados = useMemo(() => {
    const principal = Math.max(0, capital);
    const years = Math.min(40, Math.max(1, plazoAnos));

    const tin =
      tipo === 'fija'
        ? Math.max(0, tinFija)
        : Math.max(0, tinVariable);

    const cuota = monthlyPaymentFromPrincipal(principal, tin, years);
    const interesesTotales = totalInterest(principal, cuota, years);
    const costeTotal = principal + interesesTotales;

    const cuotaStress =
      tipo === 'variable'
        ? monthlyPaymentFromPrincipal(principal, Math.max(0, tinVariableStress), years)
        : cuota;

    const ratioEsfuerzo =
      ingresosNetos > 0 ? (cuota / ingresosNetos) * 100 : null;
    const ratioEsfuerzoStress =
      tipo === 'variable' && ingresosNetos > 0
        ? (cuotaStress / ingresosNetos) * 100
        : ratioEsfuerzo;

    const ltv = valorVivienda > 0 ? (principal / valorVivienda) * 100 : null;

    return {
      principal,
      years,
      tin,
      cuota,
      interesesTotales,
      costeTotal,
      cuotaStress,
      ratioEsfuerzo,
      ratioEsfuerzoStress,
      ltv,
    };
  }, [
    capital,
    plazoAnos,
    tipo,
    tinFija,
    euribor,
    diferencial,
    euriborStress,
    ingresosNetos,
    valorVivienda,
    tinVariable,
    tinVariableStress,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-16">
      <div className="max-w-4xl mx-auto px-4 pt-24 space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Calculadora de hipoteca (sistema francés)
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Simula la cuota mensual con amortización al estilo francés (cuota constante), estima
            intereses totales y revisa el ratio de esfuerzo respecto a tus ingresos. La parte
            variable usa Euríbor + diferencial como tipo nominal anual simplificado; en la realidad
            el banco revisa el tipo según condiciones del préstamo.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTipo('fija')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                tipo === 'fija'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Hipoteca fija
            </button>
            <button
              type="button"
              onClick={() => setTipo('variable')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                tipo === 'variable'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Hipoteca variable (Euríbor + diferencial)
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Capital pendiente (€)</span>
              <input
                type="number"
                min={1000}
                step={1000}
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Plazo (años)</span>
              <input
                type="number"
                min={5}
                max={40}
                value={plazoAnos}
                onChange={(e) => setPlazoAnos(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>

          {tipo === 'fija' ? (
            <label className="block space-y-2 max-w-md">
              <span className="text-sm font-medium text-slate-700">TIN anual estimado (%)</span>
              <input
                type="number"
                min={0}
                step={0.05}
                value={tinFija}
                onChange={(e) => setTinFija(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">Euríbor anual (%)</span>
                <input
                  type="number"
                  min={0}
                  step={0.05}
                  value={euribor}
                  onChange={(e) => setEuribor(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">Diferencial (%)</span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={diferencial}
                  onChange={(e) => setDiferencial(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
              <div className="flex items-end pb-1">
                <p className="text-sm text-slate-600">
                  TIN nominal combinado:{' '}
                  <strong>{tinVariable.toFixed(2)} %</strong>
                </p>
              </div>
            </div>
          )}

          {tipo === 'variable' && (
            <label className="block space-y-2 max-w-md">
              <span className="text-sm font-medium text-slate-700">
                Euríbor “stress” para segunda simulación (%)
              </span>
              <input
                type="number"
                min={0}
                step={0.05}
                value={euriborStress}
                onChange={(e) => setEuriborStress(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-xs text-slate-500">
                Sirve para ver una cuota si el índice sube (mismo diferencial).
              </span>
            </label>
          )}

          <div className="grid md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Ingresos netos mensuales hogar (€)
              </span>
              <input
                type="number"
                min={0}
                step={100}
                value={ingresosNetos}
                onChange={(e) => setIngresosNetos(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Valor de tasación / compra (€), para LTV
              </span>
              <input
                type="number"
                min={0}
                step={1000}
                value={valorVivienda}
                onChange={(e) => setValorVivienda(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Resultados</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
              <p className="text-sm text-blue-800 font-medium">Cuota mensual estimada</p>
              <p className="text-2xl font-bold text-blue-900 tabular-nums">
                {formatEur(resultados.cuota)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-sm text-slate-600 font-medium">Intereses totales (aprox.)</p>
              <p className="text-xl font-semibold text-slate-900 tabular-nums">
                {formatEur(resultados.interesesTotales)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-sm text-slate-600 font-medium">Total devuelto al banco</p>
              <p className="text-xl font-semibold text-slate-900 tabular-nums">
                {formatEur(resultados.costeTotal)}
              </p>
            </div>
            {tipo === 'variable' && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm text-amber-900 font-medium">
                  Cuota con Euríbor stress ({euriborStress.toFixed(2)} % + dif.)
                </p>
                <p className="text-2xl font-bold text-amber-950 tabular-nums">
                  {formatEur(resultados.cuotaStress)}
                </p>
              </div>
            )}
          </div>

          {resultados.ratioEsfuerzo !== null && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
              <p className="text-sm font-medium text-emerald-900">Ratio de esfuerzo (cuota / ingresos)</p>
              <p className="text-lg tabular-nums">
                Escenario base: <strong>{resultados.ratioEsfuerzo.toFixed(1)} %</strong>
                {tipo === 'variable' && resultados.ratioEsfuerzoStress !== null && (
                  <>
                    {' · '}
                    Stress:{' '}
                    <strong>{resultados.ratioEsfuerzoStress.toFixed(1)} %</strong>
                  </>
                )}
              </p>
              <p className="text-sm text-emerald-800">
                Muchos bancos miran entorno al 30–35 % como referencia; es orientativo y depende
                de otros gastos y ahorro.
              </p>
            </div>
          )}

          {resultados.ltv !== null && (
            <p className="text-sm text-slate-600">
              LTV aproximado (préstamo / valor vivienda):{' '}
              <strong>{resultados.ltv.toFixed(1)} %</strong>.
            </p>
          )}
        </div>

        <article className="prose prose-slate max-w-none bg-white rounded-2xl shadow border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900 mt-0">Cómo interpretar el resultado</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 leading-relaxed">
            <li>
              La cuota se calcula con el método francés: misma cuota todos los meses; al principio
              pagas más intereses y al final más capital.
            </li>
            <li>
              En variable, la cuota real puede revisarse según el contrato (trimestral, semestral,
              anual). Esta herramienta usa un tipo nominal anual único para una primera aproximación.
            </li>
            <li>
              Añade gastos de formalización (notaría, registro, tasación), impuesto de transmisiones
              o AJD según comunidad, seguros y posibles comisiones: no están incluidos en la cuota.
            </li>
            <li>
              Puedes ampliar lectura en nuestra página dedicada:{' '}
              <a
                href="/calculadora-hipoteca-gratis.html"
                className="text-blue-600 underline font-medium"
              >
                guía y enlaces útiles de hipoteca
              </a>
              .
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}
