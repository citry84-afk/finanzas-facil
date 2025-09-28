import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SalaryForm {
  grossAnnual: number;
  numberOfPays: 12 | 14;
  region: string;
  age: number;
  maritalStatus: 'single' | 'married' | 'married_high_income';
  hasChildren: number;
  childrenUnder3: number;
  dependents65to75: number;
  dependentsOver75: number;
  disability: 'none' | '33-65' | '65+';
  flexibleCompensation: number;
  healthInsurance: number;
  food: number;
  transport: number;
  childcare: number;
  year: number;
}

interface SalaryComparison {
  yourNet: number;
  yourGross: number;
  regionAverage: number;
  spainAverage: number;
  regionRank: number;
  spainRank: number;
}

const SalaryCalculator = () => {
  const [form, setForm] = useState<SalaryForm>({
    grossAnnual: 36000,
    numberOfPays: 14,
    region: 'madrid',
    age: 30,
    maritalStatus: 'single',
    hasChildren: 0,
    childrenUnder3: 0,
    dependents65to75: 0,
    dependentsOver75: 0,
    disability: 'none',
    flexibleCompensation: 0,
    healthInsurance: 0,
    food: 0,
    transport: 0,
    childcare: 0,
    year: 2025
  });

  const [result, setResult] = useState<{
    netSalary: number;
    socialSecurity: number;
    irpf: number;
    totalDeductions: number;
    netAnnual: number;
    grossAnnual: number;
    retentionRate: number;
    comparison: SalaryComparison;
    monthlyBreakdown: {
      regularMonth: number;
      extraMonth: number;
      extraPayments: number;
    };
    companyCost: {
      grossAnnual: number;
      socialSecurityCompany: number;
      totalCost: number;
    };
  } | null>(null);

  const calculateNetSalary = () => {
    const grossAnnual = form.grossAnnual;
    const grossMonthly = grossAnnual / form.numberOfPays;

    // Cálculo de Seguridad Social (6.35% del salario bruto)
    const socialSecurity = grossMonthly * 0.0635;
    
    // Cálculo de IRPF con situación familiar
    let irpf = calculateIRPF(grossAnnual);

    const totalDeductions = socialSecurity + irpf;
    const netSalary = grossMonthly - totalDeductions;
    const retentionRate = (totalDeductions / grossMonthly) * 100;
    const netAnnual = netSalary * form.numberOfPays;

        // Datos de salarios medios por comunidad (2024) - Datos reales más ajustados
        const regionAverages = {
          madrid: 28000,
          cataluna: 26000,
          andalucia: 20000,
          valencia: 22000,
          galicia: 21000,
          castilla_leon: 19000,
          castilla_mancha: 18000,
          extremadura: 17000,
          murcia: 19000,
          asturias: 20000,
          cantabria: 21000,
          rioja: 22000,
          aragon: 23000,
          navarra: 25000,
          pais_vasco: 26000,
          canarias: 19000,
          baleares: 22000,
          ceuta: 17000,
          melilla: 17000,
          no_residentes: 35000
        };

        const spainAverage = 22000;
    const regionAverage = regionAverages[form.region as keyof typeof regionAverages] || 28000;

    // Calcular percentiles
    const regionRank = (netAnnual / regionAverage) * 100;
    const spainRank = (netAnnual / spainAverage) * 100;

    const comparison: SalaryComparison = {
      yourNet: netAnnual,
      yourGross: grossAnnual,
      regionAverage,
      spainAverage,
      regionRank,
      spainRank
    };

    // Cálculo de desglose mensual - Las pagas extra se cobran más porque las cotizaciones se prorratean
    const monthlyBreakdown = {
      regularMonth: netSalary,
      extraMonth: form.numberOfPays === 14 ? netSalary + (socialSecurity * 0.5) : netSalary, // Cotizaciones prorrateadas
      extraPayments: form.numberOfPays === 14 ? 2 : 0
    };

    // Coste real para la empresa (incluye cotizaciones de la empresa)
    const socialSecurityCompany = grossAnnual * 0.235; // 23.5% de cotizaciones empresa
    const companyCost = {
      grossAnnual,
      socialSecurityCompany,
      totalCost: grossAnnual + socialSecurityCompany
    };

    setResult({
      netSalary,
      socialSecurity,
      irpf,
      totalDeductions,
      netAnnual,
      grossAnnual,
      retentionRate,
      comparison,
      monthlyBreakdown,
      companyCost
    });
  };

  const calculateIRPF = (grossAnnual: number) => {
    // Mínimo personal
    let minimoPersonal = 5550;
    if (form.maritalStatus === 'married') minimoPersonal = 11100;
    
    // Mínimo por descendientes
    const minimoDescendientes = form.hasChildren * 2400;
    const minimoDescendientesMenores3 = form.childrenUnder3 * 2800;
    
    // Mínimo por ascendientes
    const minimoAscendientes65_75 = form.dependents65to75 * 1150;
    const minimoAscendientes75 = form.dependentsOver75 * 2550;
    
    // Mínimo por discapacidad
    let minimoDiscapacidad = 0;
    if (form.disability === '33-65') minimoDiscapacidad = 3000;
    if (form.disability === '65+') minimoDiscapacidad = 9000;

    const minimoTotal = minimoPersonal + minimoDescendientes + minimoDescendientesMenores3 + 
                       minimoAscendientes65_75 + minimoAscendientes75 + minimoDiscapacidad;

    let baseImponible = Math.max(0, grossAnnual - minimoTotal);

    // Cálculo IRPF por tramos
    let irpf = 0;
    if (baseImponible <= 12450) {
      irpf = baseImponible * 0.19;
    } else if (baseImponible <= 20200) {
      irpf = 12450 * 0.19 + (baseImponible - 12450) * 0.24;
    } else if (baseImponible <= 35200) {
      irpf = 12450 * 0.19 + 7750 * 0.24 + (baseImponible - 20200) * 0.30;
    } else if (baseImponible <= 60000) {
      irpf = 12450 * 0.19 + 7750 * 0.24 + 15200 * 0.30 + (baseImponible - 35200) * 0.37;
    } else {
      irpf = 12450 * 0.19 + 7750 * 0.24 + 15200 * 0.30 + 24800 * 0.37 + (baseImponible - 60000) * 0.45;
    }

    return irpf / form.numberOfPays;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header espectacular */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
            🚀 LA MEJOR CALCULADORA DE SALARIO NETO DEL MUNDO
          </div>
          <h1 className="text-6xl font-black text-white mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Calculadora de Salario Neto
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Descubre cuánto recibirás realmente y compárate con el salario medio de tu comunidad y España
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario súper impactante */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-8 text-center">
              💼 Configuración
            </h2>

            <div className="space-y-8">
              {/* Salario bruto anual con slider gigante */}
              <div>
                <label className="block text-xl font-bold text-white mb-4">
                  💰 Salario Bruto Anual
                </label>
                
                {/* Display gigante del salario */}
                <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-8 mb-6 text-center">
                  <div className="text-5xl font-black text-white mb-2">
                    {formatCurrency(form.grossAnnual)}
                  </div>
                  <div className="text-lg text-white/90">al año</div>
                </div>

                {/* Slider gigante */}
                <input
                  type="range"
                  min="15000"
                  max="150000"
                  step="1000"
                  value={form.grossAnnual}
                  onChange={(e) => setForm(prev => ({ ...prev, grossAnnual: Number(e.target.value) }))}
                  className="w-full h-6 bg-white/20 rounded-2xl appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${((form.grossAnnual - 15000) / (150000 - 15000)) * 100}%, rgba(255,255,255,0.2) ${((form.grossAnnual - 15000) / (150000 - 15000)) * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
                <div className="flex justify-between text-sm mt-2 text-white/70">
                  <span>15.000€</span>
                  <span>150.000€</span>
                </div>
              </div>

              {/* Número de pagas con scroll */}
              <div>
                <label className="block text-xl font-bold text-white mb-4">
                  📅 Número de Pagas
                </label>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="grid grid-cols-2 sm:flex sm:flex-row sm:space-x-4 gap-3 pb-2">
                    {[12, 14].map(pays => (
                      <button
                        key={pays}
                        onClick={() => setForm(prev => ({ ...prev, numberOfPays: pays as 12 | 14 }))}
                        className={`flex-shrink-0 p-6 rounded-2xl border-4 transition-all duration-300 ${
                          form.numberOfPays === pays
                            ? 'border-yellow-400 bg-yellow-400/20 scale-105'
                            : 'border-white/30 bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <div className="text-center min-w-[100px]">
                          <div className="text-4xl font-black text-white">{pays}</div>
                          <div className="text-sm text-white/80">pagos</div>
                          {pays === 14 && (
                            <div className="text-xs text-yellow-300 font-bold mt-1">+2 extra</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comunidad Autónoma con scroll */}
              <div>
                <label className="block text-xl font-bold text-white mb-4">
                  🗺️ Comunidad Autónoma
                </label>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="grid grid-cols-4 sm:flex sm:flex-row sm:space-x-3 gap-2 pb-2">
                    {[
                      { value: 'madrid', label: 'Madrid', emoji: '🏛️' },
                      { value: 'cataluna', label: 'Cataluña', emoji: '🏰' },
                      { value: 'andalucia', label: 'Andalucía', emoji: '🌞' },
                      { value: 'valencia', label: 'Valencia', emoji: '🍊' },
                      { value: 'galicia', label: 'Galicia', emoji: '🌊' },
                      { value: 'pais_vasco', label: 'País Vasco', emoji: '🏔️' },
                      { value: 'canarias', label: 'Canarias', emoji: '🏝️' },
                      { value: 'baleares', label: 'Baleares', emoji: '🏖️' },
                      { value: 'castilla_leon', label: 'Castilla y León', emoji: '🏰' },
                      { value: 'castilla_mancha', label: 'Castilla-La Mancha', emoji: '🌾' },
                      { value: 'extremadura', label: 'Extremadura', emoji: '🌳' },
                      { value: 'murcia', label: 'Murcia', emoji: '🍋' },
                      { value: 'asturias', label: 'Asturias', emoji: '⛰️' },
                      { value: 'cantabria', label: 'Cantabria', emoji: '🌊' },
                      { value: 'rioja', label: 'La Rioja', emoji: '🍷' },
                      { value: 'aragon', label: 'Aragón', emoji: '🏔️' },
                      { value: 'navarra', label: 'Navarra', emoji: '🏔️' },
                      { value: 'ceuta', label: 'Ceuta', emoji: '🌍' },
                      { value: 'melilla', label: 'Melilla', emoji: '🌍' },
                      { value: 'no_residentes', label: 'No Residentes', emoji: '🌐' }
                    ].map(region => (
                      <button
                        key={region.value}
                        onClick={() => setForm(prev => ({ ...prev, region: region.value }))}
                        className={`w-full h-20 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                          form.region === region.value
                            ? 'border-yellow-400 bg-yellow-400/20 scale-105'
                            : 'border-white/30 bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="text-2xl mb-1">{region.emoji}</div>
                          <div className="text-xs font-semibold text-white leading-tight">{region.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Situación familiar con scroll */}
              <div>
                <label className="block text-xl font-bold text-white mb-4">
                  👨‍👩‍👧‍👦 Situación Familiar
                </label>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="grid grid-cols-3 sm:flex sm:flex-row sm:space-x-4 gap-3 pb-2">
                    {[
                      { value: 'single', label: 'Individual', emoji: '👤' },
                      { value: 'married', label: 'Conjunta', emoji: '👫' },
                      { value: 'married_high_income', label: 'Separada', emoji: '💼' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setForm(prev => ({ ...prev, maritalStatus: option.value as any }))}
                        className={`w-full h-20 flex flex-col items-center justify-center rounded-2xl border-4 transition-all duration-300 ${
                          form.maritalStatus === option.value
                            ? 'border-pink-400 bg-pink-400/20 scale-105'
                            : 'border-white/30 bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="text-3xl mb-1">{option.emoji}</div>
                          <div className="text-xs font-semibold text-white leading-tight">{option.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hijos con sliders */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-white mb-4">
                    👶 Hijos &lt; 3 años
                  </label>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-black text-pink-400 mb-2">{form.childrenUnder3}</div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={form.childrenUnder3}
                      onChange={(e) => setForm(prev => ({ ...prev, childrenUnder3: Number(e.target.value) }))}
                      className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-bold text-white mb-4">
                    🧒 Hijos &lt; 25 años
                  </label>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-black text-blue-400 mb-2">{form.hasChildren}</div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={form.hasChildren}
                      onChange={(e) => setForm(prev => ({ ...prev, hasChildren: Number(e.target.value) }))}
                      className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Botón calcular súper llamativo */}
              <button
                onClick={calculateNetSalary}
                className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-black text-2xl py-6 rounded-3xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
              >
                🧮 ¡CALCULAR MI SALARIO!
              </button>
            </div>
          </div>

          {/* Resultados espectaculares */}
          <div className="space-y-8">
            {result && (
              <>
                {/* Resultado principal súper impactante */}
                <div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-black mb-4">Tu Salario Neto</h3>
                    <div className="text-6xl font-black mb-2">
                      {formatCurrency(result.netSalary)}
                    </div>
                    <div className="text-sm opacity-90 mb-4">al mes</div>

                    {form.numberOfPays === 14 && (
                      <div className="mx-auto mb-6 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                        <span className="text-xs opacity-90">+ 2 pagas extra de</span>
                        <span className="text-lg font-black">{formatCurrency(result.monthlyBreakdown.extraMonth)}</span>
                      </div>
                    )}
                    
                    {/* Salario neto anual destacado */}
                    <div className="bg-white/20 rounded-2xl p-6">
                      <div className="text-3xl font-black mb-2">{formatCurrency(result.netAnnual)}</div>
                      <div className="text-lg opacity-90">al año ({form.numberOfPays} pagas)</div>
                    </div>
                  </div>
                </div>

                {/* Comparativas espectaculares */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h4 className="text-2xl font-black text-white mb-6 text-center">
                    📊 Comparativas
                  </h4>
                  
                  <div className="space-y-6">
                    {/* Tu salario vs Comunidad */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-white">Tu Comunidad</span>
                        <span className="text-sm text-white/70">
                          {result.comparison.regionRank > 100 ? 'Por encima' : 'Por debajo'} del promedio
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-black text-white">{formatCurrency(result.comparison.yourNet)}</div>
                          <div className="text-sm text-white/70">Tu salario neto</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-black text-yellow-400">
                            {result.comparison.regionRank > 100 ? '+' : ''}{(result.comparison.regionRank - 100).toFixed(0)}%
                          </div>
                          <div className="text-xs text-white/70">vs promedio</div>
                        </div>
                        <div>
                          <div className="text-2xl font-black text-white/70">{formatCurrency(result.comparison.regionAverage)}</div>
                          <div className="text-sm text-white/70">Promedio región</div>
                        </div>
                      </div>
                    </div>

                    {/* Tu salario vs España */}
                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-white">España</span>
                        <span className="text-sm text-white/70">
                          {result.comparison.spainRank > 100 ? 'Por encima' : 'Por debajo'} del promedio
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-black text-white">{formatCurrency(result.comparison.yourNet)}</div>
                          <div className="text-sm text-white/70">Tu salario neto</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-black text-green-400">
                            {result.comparison.spainRank > 100 ? '+' : ''}{(result.comparison.spainRank - 100).toFixed(0)}%
                          </div>
                          <div className="text-xs text-white/70">vs promedio</div>
                        </div>
                        <div>
                          <div className="text-2xl font-black text-white/70">{formatCurrency(result.comparison.spainAverage)}</div>
                          <div className="text-sm text-white/70">Promedio España</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desglose mensual con pagas extras */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h4 className="text-2xl font-black text-white mb-6 text-center">
                    📅 Desglose Mensual
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6">
                      <h5 className="text-lg font-bold text-white mb-4">Mes Normal</h5>
                      <div className="text-3xl font-black text-white mb-2">
                        {formatCurrency(result.monthlyBreakdown.regularMonth)}
                      </div>
                      <div className="text-sm text-white/70">12 meses al año</div>
                    </div>
                    
                    {form.numberOfPays === 14 && (
                      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6">
                        <h5 className="text-lg font-bold text-white mb-4">+ 2 Pagas Extra</h5>
                        <div className="text-3xl font-black text-white mb-2">
                          {formatCurrency(result.monthlyBreakdown.extraMonth)}
                        </div>
                        <div className="text-sm text-white/70">importe de cada paga extra</div>
                      </div>
                    )}
                  </div>

                  {/* Gráfica de desglose mensual */}
                  <div className="bg-white/5 rounded-2xl p-6">
                    <Bar
                      data={{
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        datasets: [{
                          label: 'Salario Neto Mensual (€)',
                          data: [
                            result.monthlyBreakdown.regularMonth, // Ene
                            result.monthlyBreakdown.regularMonth, // Feb
                            result.monthlyBreakdown.regularMonth, // Mar
                            result.monthlyBreakdown.regularMonth, // Abr
                            result.monthlyBreakdown.regularMonth, // May
                            (form.numberOfPays === 14
                              ? result.monthlyBreakdown.regularMonth + result.monthlyBreakdown.extraMonth
                              : result.monthlyBreakdown.regularMonth), // Jun (con extra)
                            result.monthlyBreakdown.regularMonth, // Jul
                            result.monthlyBreakdown.regularMonth, // Ago
                            result.monthlyBreakdown.regularMonth, // Sep
                            result.monthlyBreakdown.regularMonth, // Oct
                            result.monthlyBreakdown.regularMonth, // Nov
                            (form.numberOfPays === 14
                              ? result.monthlyBreakdown.regularMonth + result.monthlyBreakdown.extraMonth
                              : result.monthlyBreakdown.regularMonth) // Dic (con extra)
                          ],
                          backgroundColor: [
                            'rgba(59, 130, 246, 0.8)', // Ene
                            'rgba(59, 130, 246, 0.8)', // Feb
                            'rgba(59, 130, 246, 0.8)', // Mar
                            'rgba(59, 130, 246, 0.8)', // Abr
                            'rgba(59, 130, 246, 0.8)', // May
                            (form.numberOfPays === 14 ? 'rgba(255, 193, 7, 0.8)' : 'rgba(59, 130, 246, 0.8)'), // Jun
                            'rgba(59, 130, 246, 0.8)', // Jul
                            'rgba(59, 130, 246, 0.8)', // Ago
                            'rgba(59, 130, 246, 0.8)', // Sep
                            'rgba(59, 130, 246, 0.8)', // Oct
                            'rgba(59, 130, 246, 0.8)', // Nov
                            (form.numberOfPays === 14 ? 'rgba(255, 193, 7, 0.8)' : 'rgba(59, 130, 246, 0.8)') // Dic
                          ],
                          borderColor: [
                            'rgba(59, 130, 246, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(59, 130, 246, 1)',
                            (form.numberOfPays === 14 ? 'rgba(255, 193, 7, 1)' : 'rgba(59, 130, 246, 1)'),
                            'rgba(59, 130, 246, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(59, 130, 246, 1)',
                            (form.numberOfPays === 14 ? 'rgba(255, 193, 7, 1)' : 'rgba(59, 130, 246, 1)')
                          ],
                          borderWidth: 1
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              callback: function(value) {
                                return '€' + value.toLocaleString();
                              },
                              color: 'white'
                            },
                            grid: {
                              color: 'rgba(255, 255, 255, 0.1)'
                            }
                          },
                          x: {
                            ticks: {
                              color: 'white'
                            },
                            grid: {
                              color: 'rgba(255, 255, 255, 0.1)'
                            }
                          }
                        },
                        plugins: {
                          legend: {
                            labels: {
                              color: 'white'
                            }
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                return `€${parseFloat(context.raw as string).toLocaleString(undefined, {maximumFractionDigits: 0})}`;
                              }
                            }
                          }
                        }
                      }}
                      height={200}
                    />
                  </div>
                </div>

                {/* Coste real para la empresa */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h4 className="text-2xl font-black text-white mb-6 text-center">
                    💼 Coste Real para la Empresa
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                        <span className="text-white font-semibold">Salario bruto anual:</span>
                        <span className="text-xl font-black text-green-400">
                          {formatCurrency(result.companyCost.grossAnnual)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                        <span className="text-white font-semibold">Cotizaciones empresa (23.5%):</span>
                        <span className="text-xl font-black text-orange-400">
                          {formatCurrency(result.companyCost.socialSecurityCompany)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl border-2 border-red-400/30">
                        <span className="text-white font-bold text-lg">COSTE TOTAL EMPRESA:</span>
                        <span className="text-2xl font-black text-red-400">
                          {formatCurrency(result.companyCost.totalCost)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Gráfica de coste empresa */}
                    <div className="bg-white/5 rounded-2xl p-4">
                      <Doughnut
                        data={{
                          labels: ['Salario Bruto', 'Cotizaciones Empresa'],
                          datasets: [{
                            data: [result.companyCost.grossAnnual, result.companyCost.socialSecurityCompany],
                            backgroundColor: [
                              'rgba(34, 197, 94, 0.8)',
                              'rgba(249, 115, 22, 0.8)'
                            ],
                            borderColor: [
                              'rgba(34, 197, 94, 1)',
                              'rgba(249, 115, 22, 1)'
                            ],
                            borderWidth: 2
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              labels: {
                                color: 'white'
                              }
                            },
                            tooltip: {
                              callbacks: {
                                label: function(context) {
                                  return `${context.label}: €${parseFloat(context.raw as string).toLocaleString(undefined, {maximumFractionDigits: 0})}`;
                                }
                              }
                            }
                          }
                        }}
                        height={200}
                      />
                    </div>
                  </div>
                </div>

                {/* Detalles técnicos */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h4 className="text-2xl font-black text-white mb-6 text-center">
                    🔍 Desglose Técnico
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                      <span className="text-white font-semibold">IRPF anual:</span>
                      <span className="text-2xl font-black text-red-400">
                        {formatCurrency(result.irpf * form.numberOfPays)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                      <span className="text-white font-semibold">Seguridad Social anual:</span>
                      <span className="text-2xl font-black text-orange-400">
                        {formatCurrency(result.socialSecurity * form.numberOfPays)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                      <span className="text-white font-semibold">Tipo de retención:</span>
                      <span className="text-2xl font-black text-purple-400">
                        {result.retentionRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

                {/* Consejos financieros */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h4 className="text-2xl font-black text-white mb-6 text-center">
                    💡 Consejos para Mejorar Financieramente
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-4">
                        <h5 className="text-lg font-bold text-white mb-2">💰 Optimiza tu IRPF</h5>
                        <p className="text-white/80 text-sm">• Planifica tu declaración con anticipación</p>
                        <p className="text-white/80 text-sm">• Aprovecha las deducciones por vivienda</p>
                        <p className="text-white/80 text-sm">• Considera planes de pensiones</p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4">
                        <h5 className="text-lg font-bold text-white mb-2">📈 Invierte tu dinero</h5>
                        <p className="text-white/80 text-sm">• Aprovecha el interés compuesto</p>
                        <p className="text-white/80 text-sm">• Diversifica tus inversiones</p>
                        <p className="text-white/80 text-sm">• Invierte a largo plazo</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-4">
                        <h5 className="text-lg font-bold text-white mb-2">💼 Mejora tu salario</h5>
                        <p className="text-white/80 text-sm">• Formación continua y especialización</p>
                        <p className="text-white/80 text-sm">• Negocia tu salario anualmente</p>
                        <p className="text-white/80 text-sm">• Considera cambiar de empresa</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-4">
                        <h5 className="text-lg font-bold text-white mb-2">🎯 Controla tus gastos</h5>
                        <p className="text-white/80 text-sm">• Haz un presupuesto mensual</p>
                        <p className="text-white/80 text-sm">• Evita gastos innecesarios</p>
                        <p className="text-white/80 text-sm">• Ahorra al menos el 20%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Llamadas a la acción */}
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-8 border border-purple-400/30 shadow-2xl">
                  <h4 className="text-2xl font-black text-white mb-6 text-center">
                    🚀 ¡Sigue Mejorando tu Situación Financiera!
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 rounded-2xl p-6 text-center">
                      <div className="text-4xl mb-4">💰</div>
                      <h5 className="text-xl font-bold text-white mb-3">Calculadora de Millonario</h5>
                      <p className="text-white/80 mb-4">Descubre cuánto necesitas ahorrar para ser millonario y en cuánto tiempo lo conseguirás.</p>
                      <button
                        onClick={() => {
                          // Cambiar a la calculadora de millonario
                          const event = new CustomEvent('changeMode', { detail: 'millonario' });
                          window.dispatchEvent(event);
                        }}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black py-3 rounded-xl hover:scale-105 transform transition-all duration-300"
                      >
                        ¡CALCULAR CUÁNDO SER MILLONARIO!
                      </button>
                    </div>
                    
                    <div className="bg-white/10 rounded-2xl p-6 text-center">
                      <div className="text-4xl mb-4">📊</div>
                      <h5 className="text-xl font-bold text-white mb-3">Control de Gastos</h5>
                      <p className="text-white/80 mb-4">Gestiona tus finanzas personales, controla tus gastos y alcanza tus objetivos financieros.</p>
                      <button
                        onClick={() => {
                          // Cambiar a la calculadora de gastos
                          const event = new CustomEvent('changeMode', { detail: 'gastos' });
                          window.dispatchEvent(event);
                        }}
                        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-black py-3 rounded-xl hover:scale-105 transform transition-all duration-300"
                      >
                        ¡CONTROLAR MIS GASTOS!
                      </button>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h4 className="text-2xl font-black text-white mb-6 text-center">
                    ℹ️ Información Importante
                  </h4>
                  <div className="space-y-3 text-white/80">
                    <p>• Los cálculos son aproximados y pueden variar según tu situación específica.</p>
                    <p>• Consulta con un asesor fiscal para optimizar tu declaración.</p>
                    <p>• Los tramos de IRPF pueden cambiar cada año.</p>
                    <p>• La Seguridad Social se calcula sobre el salario bruto.</p>
                    <p>• Las pagas extra se cobran más porque las cotizaciones se prorratean en los meses normales.</p>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
