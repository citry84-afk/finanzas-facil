import { useState, useMemo } from 'react';
import { ArrowLeft, Calculator, TrendingUp, Euro } from 'lucide-react';

interface AutonomosCalculatorProps {
  onBack: () => void;
}

interface CalculationData {
  community: string;
  calculationType: 'neto' | 'facturar';
  grossIncome: number;
  desiredNetIncome?: number;
  deductibleExpenses: number;
  fiscalYear: '2024' | '2025';
  isNewAutonomo: boolean;
  // Nuevas preguntas para deducciones
  hasOfficeExpenses: boolean;
  officeExpenses: number;
  hasVehicleExpenses: boolean;
  vehicleExpenses: number;
  hasTrainingExpenses: boolean;
  trainingExpenses: number;
  hasOtherExpenses: boolean;
  otherExpenses: number;
}

const COMMUNITIES = [
  { value: 'madrid', label: 'Madrid', hasBonus: true, bonusMonths: 12 },
  { value: 'andalucia', label: 'Andalucía', hasBonus: true, bonusMonths: 12 },
  { value: 'murcia', label: 'Murcia', hasBonus: true, bonusMonths: 12 },
  { value: 'rioja', label: 'La Rioja', hasBonus: true, bonusMonths: 12 },
  { value: 'baleares', label: 'Baleares', hasBonus: true, bonusMonths: 24, specialCondition: 'mujeres <35 años' },
  { value: 'castilla-leon', label: 'Castilla y León', hasBonus: true, bonusMonths: 0, hasDirectAid: true },
  { value: 'cataluna', label: 'Cataluña', hasBonus: false },
  { value: 'pais-vasco', label: 'País Vasco', hasBonus: false },
  { value: 'navarra', label: 'Navarra', hasBonus: false },
  { value: 'valencia', label: 'Comunidad Valenciana', hasBonus: false },
  { value: 'galicia', label: 'Galicia', hasBonus: false },
  { value: 'asturias', label: 'Asturias', hasBonus: false },
  { value: 'cantabria', label: 'Cantabria', hasBonus: false },
  { value: 'aragon', label: 'Aragón', hasBonus: false },
  { value: 'extremadura', label: 'Extremadura', hasBonus: false },
  { value: 'castilla-mancha', label: 'Castilla-La Mancha', hasBonus: false },
  { value: 'ceuta', label: 'Ceuta', hasBonus: false },
  { value: 'melilla', label: 'Melilla', hasBonus: false }
];

const IRPF_RATES = {
  '2024': {
    'madrid': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ],
    'cataluna': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ],
    'pais-vasco': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ],
    'navarra': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ],
    'valencia': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ]
  },
  '2025': {
    'madrid': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ],
    'cataluna': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ],
    'pais-vasco': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ],
    'navarra': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ],
    'valencia': [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: Infinity, rate: 0.47 }
    ]
  }
};

function AutonomosCalculator({ onBack }: AutonomosCalculatorProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CalculationData>({
    community: '',
    calculationType: 'neto',
    grossIncome: 0,
    desiredNetIncome: 0,
    deductibleExpenses: 0,
    fiscalYear: '2024',
    isNewAutonomo: false,
    hasOfficeExpenses: false,
    officeExpenses: 0,
    hasVehicleExpenses: false,
    vehicleExpenses: 0,
    hasTrainingExpenses: false,
    trainingExpenses: 0,
    hasOtherExpenses: false,
    otherExpenses: 0
  });

  const calculateIRPF = (baseImponible: number, community: string, year: '2024' | '2025') => {
    const rates = IRPF_RATES[year][community as keyof typeof IRPF_RATES[typeof year]] || IRPF_RATES[year]['madrid'] || IRPF_RATES[year]['madrid'];
    let totalIRPF = 0;
    let remainingBase = baseImponible;

    for (const bracket of rates) {
      if (remainingBase <= 0) break;
      
      const taxableInBracket = Math.min(remainingBase, bracket.max - bracket.min);
      totalIRPF += taxableInBracket * bracket.rate;
      remainingBase -= taxableInBracket;
    }

    return totalIRPF;
  };

  const calculateResults = useMemo(() => {
    if (!data.community) return null;

    const community = COMMUNITIES.find(c => c.value === data.community);
    if (!community) return null;

    // Convertir ingresos mensuales a anuales para los cálculos
    let grossIncomeAnnual = data.grossIncome * 12;
    let desiredNetIncome = data.desiredNetIncome || 0;
    

    // Si es "cuánto facturar", calculamos la facturación necesaria
    if (data.calculationType === 'facturar' && desiredNetIncome > 0) {
      // Convertir neto mensual a anual
      const netIncomeAnnual = desiredNetIncome * 12;
      
      // Aproximación inicial: facturación = neto + impuestos estimados
      // Iteramos para obtener el valor exacto
      let estimatedGross = netIncomeAnnual * 1.4; // Estimación inicial
      
      for (let i = 0; i < 10; i++) {
        // Calcular deducciones automáticas (convertir mensuales a anuales)
        const autoDeductions = 
          (data.hasOfficeExpenses ? data.officeExpenses * 12 : 0) +
          (data.hasVehicleExpenses ? data.vehicleExpenses * 12 : 0) +
          (data.hasTrainingExpenses ? data.trainingExpenses * 12 : 0) +
          (data.hasOtherExpenses ? data.otherExpenses * 12 : 0) +
          data.deductibleExpenses;
        
        const baseImponible = estimatedGross - autoDeductions;
        const irpf = calculateIRPF(baseImponible, data.community, data.fiscalYear);
        
        let cuotaSS = 294 * 12; // Anual
        if (data.isNewAutonomo && community.hasBonus) {
          cuotaSS = 0;
        }
        
        const calculatedNet = baseImponible - irpf - cuotaSS;
        
        if (Math.abs(calculatedNet - netIncomeAnnual) < 100) break;
        
        estimatedGross = estimatedGross + (netIncomeAnnual - calculatedNet) * 1.2;
      }
      
      grossIncomeAnnual = estimatedGross;
    } else if (grossIncomeAnnual <= 0) {
      return null;
    }

    // Calcular deducciones automáticas basadas en las respuestas (convertir mensuales a anuales)
    const autoDeductions = 
      (data.hasOfficeExpenses ? data.officeExpenses * 12 : 0) +
      (data.hasVehicleExpenses ? data.vehicleExpenses * 12 : 0) +
      (data.hasTrainingExpenses ? data.trainingExpenses * 12 : 0) +
      (data.hasOtherExpenses ? data.otherExpenses * 12 : 0) +
      data.deductibleExpenses; // Gastos manuales adicionales

    const baseImponible = grossIncomeAnnual - autoDeductions;
    const irpf = calculateIRPF(baseImponible, data.community, data.fiscalYear);
    
    // Cuota SS: 294€/mes, pero con bonificaciones
    let cuotaSS = 294 * 12; // Anual
    if (data.isNewAutonomo && community.hasBonus) {
      if (community.specialCondition === 'mujeres <35 años' && community.value === 'baleares') {
        cuotaSS = 0; // 24 meses gratis
      } else {
        cuotaSS = 0; // 12 meses gratis
      }
    }

    const netIncome = baseImponible - irpf - cuotaSS;
    const totalTaxes = irpf + cuotaSS;
    const taxPercentage = (totalTaxes / grossIncomeAnnual) * 100;

    return {
      baseImponible,
      irpf,
      cuotaSS,
      netIncome,
      totalTaxes,
      taxPercentage,
      grossIncome: grossIncomeAnnual,
      grossIncomeMonthly: grossIncomeAnnual / 12,
      community: community.label
    };
  }, [data]);

  const handleNext = () => {
    if (step < 9) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setData({
      community: '',
      calculationType: 'neto',
      grossIncome: 0,
      desiredNetIncome: 0,
      deductibleExpenses: 0,
      fiscalYear: '2024',
      isNewAutonomo: false,
      hasOfficeExpenses: false,
      officeExpenses: 0,
      hasVehicleExpenses: false,
      vehicleExpenses: 0,
      hasTrainingExpenses: false,
      trainingExpenses: 0,
      hasOtherExpenses: false,
      otherExpenses: 0
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Qué quieres calcular?</h2>
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => setData({...data, calculationType: 'neto'})}
          className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            data.calculationType === 'neto' 
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-105' 
              : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-all duration-300 ${
              data.calculationType === 'neto' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              <Calculator className="w-8 h-8" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg text-gray-900">¿Cuánto me queda neto?</h3>
              <p className="text-gray-600">Si facturo X euros, ¿cuánto me queda después de impuestos?</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setData({...data, calculationType: 'facturar'})}
          className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            data.calculationType === 'facturar' 
              ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg scale-105' 
              : 'border-gray-200 hover:border-green-300 bg-white hover:bg-green-50'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-all duration-300 ${
              data.calculationType === 'facturar' 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-green-100 text-green-600'
            }`}>
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg text-gray-900">¿Cuánto tengo que facturar?</h3>
              <p className="text-gray-600">Para ganar X euros netos, ¿cuánto debo facturar?</p>
            </div>
          </div>
        </button>

      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Dónde vives?</h2>
      <p className="text-gray-600 mb-4">Esto es importante porque los impuestos cambian según tu comunidad</p>
      <select
        value={data.community}
        onChange={(e) => setData({...data, community: e.target.value})}
        className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
      >
        <option value="">Selecciona tu comunidad</option>
        {COMMUNITIES.map(community => (
          <option key={community.value} value={community.value}>
            {community.label}
            {community.hasBonus && ' (con bonificaciones)'}
          </option>
        ))}
      </select>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {data.calculationType === 'facturar' ? '¿Cuánto quieres ganar neto al mes?' : '¿Cuánto facturas al mes?'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <div className="relative">
            <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={data.calculationType === 'facturar' ? data.desiredNetIncome : data.grossIncome}
              onChange={(e) => setData({
                ...data, 
                [data.calculationType === 'facturar' ? 'desiredNetIncome' : 'grossIncome']: Number(e.target.value)
              })}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
              placeholder={data.calculationType === 'facturar' ? '10000' : '5000'}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="newAutonomo"
            checked={data.isNewAutonomo}
            onChange={(e) => setData({...data, isNewAutonomo: e.target.checked})}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="newAutonomo" className="text-sm text-gray-700">
            Soy autónomo nuevo (primeros 2 años)
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Tienes gastos de oficina?</h2>
      <p className="text-gray-600 mb-6">Alquiler, luz, internet, teléfono, material de oficina...</p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="hasOfficeExpenses"
            checked={data.hasOfficeExpenses}
            onChange={(e) => setData({...data, hasOfficeExpenses: e.target.checked})}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="hasOfficeExpenses" className="text-sm font-medium text-gray-700">
            Sí, tengo gastos de oficina
          </label>
        </div>

        {data.hasOfficeExpenses && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cuánto gastas al mes en oficina?
            </label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={data.officeExpenses}
                onChange={(e) => setData({...data, officeExpenses: Number(e.target.value)})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
                placeholder="250"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Usas vehículo para trabajar?</h2>
      <p className="text-gray-600 mb-6">Gasolina, mantenimiento, seguro, parking...</p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="hasVehicleExpenses"
            checked={data.hasVehicleExpenses}
            onChange={(e) => setData({...data, hasVehicleExpenses: e.target.checked})}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="hasVehicleExpenses" className="text-sm font-medium text-gray-700">
            Sí, uso vehículo para trabajar
          </label>
        </div>

        {data.hasVehicleExpenses && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cuánto gastas al mes en vehículo?
            </label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={data.vehicleExpenses}
                onChange={(e) => setData({...data, vehicleExpenses: Number(e.target.value)})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
                placeholder="170"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Inviertes en formación?</h2>
      <p className="text-gray-600 mb-6">Cursos, libros, conferencias, certificaciones...</p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="hasTrainingExpenses"
            checked={data.hasTrainingExpenses}
            onChange={(e) => setData({...data, hasTrainingExpenses: e.target.checked})}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="hasTrainingExpenses" className="text-sm font-medium text-gray-700">
            Sí, invierto en formación
          </label>
        </div>

        {data.hasTrainingExpenses && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cuánto gastas al mes en formación?
            </label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={data.trainingExpenses}
                onChange={(e) => setData({...data, trainingExpenses: Number(e.target.value)})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
                placeholder="80"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Tienes otros gastos deducibles?</h2>
      <p className="text-gray-600 mb-6">Seguros, gestoría, asesoría, material, software...</p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="hasOtherExpenses"
            checked={data.hasOtherExpenses}
            onChange={(e) => setData({...data, hasOtherExpenses: e.target.checked})}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="hasOtherExpenses" className="text-sm font-medium text-gray-700">
            Sí, tengo otros gastos deducibles
          </label>
        </div>

        {data.hasOtherExpenses && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cuánto gastas al mes en otros gastos?
            </label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={data.otherExpenses}
                onChange={(e) => setData({...data, otherExpenses: Number(e.target.value)})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
                placeholder="40"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep8 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de datos</h2>
      
      <div className="bg-gray-50 rounded-xl p-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Tipo de cálculo:</span>
          <span className="font-semibold">
            {data.calculationType === 'neto' && '¿Cuánto me queda neto?'}
            {data.calculationType === 'facturar' && '¿Cuánto tengo que facturar?'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Comunidad:</span>
          <span className="font-semibold">{COMMUNITIES.find(c => c.value === data.community)?.label}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Ingresos brutos:</span>
          <span className="font-semibold">
            {data.calculationType === 'facturar' 
              ? `${calculateResults?.grossIncomeMonthly?.toFixed(0).toLocaleString() || '0'}€/mes (${calculateResults?.grossIncome?.toLocaleString() || '0'}€/año)`
              : `${data.grossIncome.toLocaleString()}€/mes (${(data.grossIncome * 12).toLocaleString()}€/año)`
            }
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Gastos deducibles:</span>
          <span className="font-semibold">
            {(() => {
              const monthlyDeductions = 
                (data.hasOfficeExpenses ? data.officeExpenses : 0) +
                (data.hasVehicleExpenses ? data.vehicleExpenses : 0) +
                (data.hasTrainingExpenses ? data.trainingExpenses : 0) +
                (data.hasOtherExpenses ? data.otherExpenses : 0);
              const annualDeductions = monthlyDeductions * 12 + data.deductibleExpenses;
              return `${monthlyDeductions.toLocaleString()}€/mes (${annualDeductions.toLocaleString()}€/año)`;
            })()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Año fiscal:</span>
          <span className="font-semibold">{data.fiscalYear}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Autónomo nuevo:</span>
          <span className="font-semibold">{data.isNewAutonomo ? 'Sí' : 'No'}</span>
        </div>
      </div>
    </div>
  );

  const renderStep9 = () => {
    if (!calculateResults) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Resultados</h2>
        
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200 rounded-full translate-y-12 -translate-x-12 opacity-20"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 animate-pulse">
              {data.calculationType === 'facturar' 
                ? `${Math.round(calculateResults.grossIncomeMonthly || 0).toLocaleString()}€`
                : `${Math.round(calculateResults.netIncome / 12).toLocaleString()}€`
              }
            </div>
            <p className="text-xl text-gray-700 font-semibold">
              {data.calculationType === 'facturar' 
                ? 'Debes facturar al mes'
                : 'Ingresos netos mensuales'
              }
            </p>
            <p className="text-lg text-gray-500 mt-2">
              {data.calculationType === 'facturar' 
                ? `${calculateResults.grossIncome?.toLocaleString() || '0'}€ al año`
                : `${calculateResults.netIncome.toLocaleString()}€ al año`
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-red-200">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {Math.round(calculateResults.irpf / 12).toLocaleString()}€
              </div>
              <p className="text-sm font-semibold text-red-700 mb-1">IRPF/mes</p>
              <p className="text-xs text-red-600">{calculateResults.irpf.toLocaleString()}€/año</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-200">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {Math.round(calculateResults.cuotaSS / 12).toLocaleString()}€
              </div>
              <p className="text-sm font-semibold text-orange-700 mb-1">SS/mes</p>
              <p className="text-xs text-orange-600">{calculateResults.cuotaSS.toLocaleString()}€/año</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round(calculateResults.taxPercentage)}%
              </div>
              <p className="text-sm font-semibold text-purple-700">% Impuestos</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
              💡 ¿Qué significa esto?
            </h3>
            {data.calculationType === 'facturar' ? (
              <div className="space-y-4">
                <p className="text-gray-700 text-base leading-relaxed">
                  Para ganar <span className="font-bold text-2xl text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                    {data.desiredNetIncome?.toLocaleString()}€
                  </span> netos al mes, necesitas facturar{' '}
                  <span className="font-bold text-2xl text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                    {Math.round(calculateResults.grossIncomeMonthly || 0).toLocaleString()}€
                  </span> al mes.
                </p>
                <p className="text-gray-600 text-sm">
                  Esto significa que por cada 100€ que facturas, te quedan aproximadamente{' '}
                  <span className="font-bold text-lg text-purple-600">
                    {(() => {
                      const grossMonthly = calculateResults.grossIncomeMonthly || 0;
                      if (grossMonthly === 0) return '0';
                      return Math.round((calculateResults.netIncome / 12) / grossMonthly * 100);
                    })()}€
                  </span> netos.
                </p>
              </div>
            ) : (
              <p className="text-gray-700 text-base leading-relaxed">
                Por cada <span className="font-bold text-gray-900">100€</span> que facturas al mes, te quedan aproximadamente{' '}
                <span className="font-bold text-2xl text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                  {(() => {
                    if (data.grossIncome === 0) return '0';
                    return Math.round((calculateResults.netIncome / 12) / data.grossIncome * 100);
                  })()}€
                </span>
                {' '}después de impuestos.
              </p>
            )}
            {data.isNewAutonomo && calculateResults.cuotaSS === 0 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
                <p className="text-green-700 font-semibold flex items-center gap-2">
                  🎉 ¡Como eres autónomo nuevo, no pagas Seguridad Social este año!
                </p>
              </div>
            )}
            
            {/* Información adicional útil */}
            <div className="mt-6 space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  💡 Consejos para autónomos
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Reserva el 20-25% de tus ingresos para impuestos</li>
                  <li>• Lleva un control mensual de tus gastos deducibles</li>
                  <li>• Considera contratar un gestor para optimizar tu fiscalidad</li>
                  <li>• Planifica tus pagos trimestrales de IRPF</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  📅 Calendario fiscal 2024
                </h4>
                <div className="text-sm text-green-800 space-y-1">
                  <p><strong>Enero:</strong> Pago IRPF 4º trimestre 2023</p>
                  <p><strong>Abril:</strong> Pago IRPF 1º trimestre 2024</p>
                  <p><strong>Julio:</strong> Pago IRPF 2º trimestre 2024</p>
                  <p><strong>Octubre:</strong> Pago IRPF 3º trimestre 2024</p>
                  <p><strong>Enero 2025:</strong> Pago IRPF 4º trimestre 2024</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                  🧾 Gastos deducibles más comunes
                </h4>
                <div className="text-sm text-yellow-800 space-y-1">
                  <p><strong>Oficina:</strong> Alquiler, luz, internet, teléfono</p>
                  <p><strong>Vehículo:</strong> Gasolina, mantenimiento, seguro</p>
                  <p><strong>Formación:</strong> Cursos, libros, conferencias</p>
                  <p><strong>Material:</strong> Ordenador, software, herramientas</p>
                  <p><strong>Otros:</strong> Seguros, gestoría, asesoría</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                  📊 Desglose de impuestos
                </h4>
                <div className="text-sm text-purple-800 space-y-1">
                  <p><strong>IRPF:</strong> {Math.round(calculateResults.irpf / 12).toLocaleString()}€/mes ({Math.round(calculateResults.taxPercentage * 0.7)}% de tus ingresos)</p>
                  <p><strong>Seguridad Social:</strong> {Math.round(calculateResults.cuotaSS / 12).toLocaleString()}€/mes ({Math.round(calculateResults.taxPercentage * 0.3)}% de tus ingresos)</p>
                  <p><strong>Total impuestos:</strong> {Math.round((calculateResults.irpf + calculateResults.cuotaSS) / 12).toLocaleString()}€/mes ({Math.round(calculateResults.taxPercentage)}%)</p>
                </div>
              </div>
              
              {data.calculationType === 'facturar' && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
                  <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                    🎯 Objetivo de facturación
                  </h4>
                  <div className="text-sm text-orange-800 space-y-1">
                    <p><strong>Facturación mensual necesaria:</strong> {Math.round(calculateResults.grossIncomeMonthly || 0).toLocaleString()}€</p>
                    <p><strong>Facturación anual necesaria:</strong> {calculateResults.grossIncome?.toLocaleString()}€</p>
                    <p><strong>Eficiencia fiscal:</strong> Por cada 100€ facturados, te quedan {(() => {
                      const grossMonthly = calculateResults.grossIncomeMonthly || 0;
                      if (grossMonthly === 0) return '0';
                      return Math.round((calculateResults.netIncome / 12) / grossMonthly * 100);
                    })()}€ netos</p>
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  💰 Pagos trimestrales de IRPF
                </h4>
                <div className="text-sm text-indigo-800 space-y-1">
                  <p><strong>Pago trimestral estimado:</strong> {Math.round((calculateResults.irpf / 12) * 3).toLocaleString()}€</p>
                  <p><strong>Pago anual total:</strong> {calculateResults.irpf.toLocaleString()}€</p>
                  <p><strong>Próximo pago:</strong> {(() => {
                    const now = new Date();
                    const month = now.getMonth();
                    if (month < 3) return 'Abril 2024';
                    if (month < 6) return 'Julio 2024';
                    if (month < 9) return 'Octubre 2024';
                    return 'Enero 2025';
                  })()}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
                <h4 className="font-bold text-pink-900 mb-2 flex items-center gap-2">
                  ⚖️ Comparación con otros regímenes
                </h4>
                <div className="text-sm text-pink-800 space-y-1">
                  <p><strong>Autónomo:</strong> {Math.round(calculateResults.taxPercentage)}% de impuestos</p>
                  <p><strong>Asalariado:</strong> ~{Math.round(calculateResults.taxPercentage * 0.8)}% de impuestos</p>
                  <p><strong>Ventaja autónomo:</strong> Más gastos deducibles</p>
                  <p><strong>Ventaja asalariado:</strong> Menos gestión administrativa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm rounded-2xl border border-gray-200 text-gray-700 hover:from-gray-50 hover:to-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Calculadora de Autónomos
            </h1>
            <p className="text-gray-600 text-sm mt-1">Calcula tus impuestos de forma inteligente</p>
          </div>
          <div className="w-20"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
              Paso {step} de 9
            </span>
            <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {Math.round((step / 9) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${(step / 9) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}
          {step === 7 && renderStep7()}
          {step === 8 && renderStep8()}
          {step === 9 && renderStep9()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform ${
                step === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed scale-95' 
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 hover:scale-105 hover:shadow-lg'
              }`}
            >
              ← Anterior
            </button>

            {step < 9 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !data.calculationType) ||
                  (step === 2 && !data.community) ||
                  (step === 3 && ((data.calculationType === 'facturar' ? (data.desiredNetIncome || 0) : data.grossIncome) <= 0)) ||
                  (step === 4 && data.hasOfficeExpenses && data.officeExpenses < 0) ||
                  (step === 5 && data.hasVehicleExpenses && data.vehicleExpenses < 0) ||
                  (step === 6 && data.hasTrainingExpenses && data.trainingExpenses < 0) ||
                  (step === 7 && data.hasOtherExpenses && data.otherExpenses < 0)
                }
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform ${
                  (step === 1 && !data.calculationType) ||
                  (step === 2 && !data.community) ||
                  (step === 3 && ((data.calculationType === 'facturar' ? (data.desiredNetIncome || 0) : data.grossIncome) <= 0)) ||
                  (step === 4 && data.hasOfficeExpenses && data.officeExpenses < 0) ||
                  (step === 5 && data.hasVehicleExpenses && data.vehicleExpenses < 0) ||
                  (step === 6 && data.hasTrainingExpenses && data.trainingExpenses < 0) ||
                  (step === 7 && data.hasOtherExpenses && data.otherExpenses < 0)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed scale-95'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
                }`}
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                🎯 Nueva Cálculo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutonomosCalculator;
