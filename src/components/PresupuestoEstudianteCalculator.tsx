import { useState, useMemo } from 'react';
import { ArrowLeft, Calculator, TrendingUp, Download, AlertTriangle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import jsPDF from 'jspdf';

interface PresupuestoEstudianteCalculatorProps {
  onBack: () => void;
}

interface FormData {
  ingresosMensuales: number;
  ciudad: string;
  tipoAlojamiento: string;
  trabaja: boolean;
  horasTrabajoSemanal: number;
  // Valores editables para necesidades (opcionales - si no se especifican, se calculan automáticamente)
  alojamientoPersonalizado?: number;
  alimentacionPersonalizada?: number;
  transportePersonalizado?: number;
  // Valores editables para deseos
  ocioPersonalizado?: number;
  ropaPersonalizada?: number;
  cafesPersonalizados?: number;
  suscripcionesPersonalizadas?: number;
  gymPersonalizado?: number;
  // Valores editables para ahorro
  fondoEmergenciaPersonalizado?: number;
  inversionPersonalizada?: number;
}

const CIUDADES = [
  { value: 'madrid', label: 'Madrid' },
  { value: 'barcelona', label: 'Barcelona' },
  { value: 'valencia', label: 'Valencia' },
  { value: 'sevilla', label: 'Sevilla' },
  { value: 'salamanca', label: 'Salamanca' },
  { value: 'otras', label: 'Otras' },
];

const TIPOS_ALOJAMIENTO = [
  { value: 'publica', label: 'Residencia pública' },
  { value: 'privada', label: 'Residencia privada' },
  { value: 'compartido4', label: 'Piso compartido 4+ personas' },
  { value: 'compartido2', label: 'Piso compartido 2-3 personas' },
  { value: 'familia', label: 'Vive con familia' },
];

const COSTES_ALOJAMIENTO: Record<string, Record<string, number>> = {
  madrid: { publica: 230, privada: 580, compartido4: 250, compartido2: 400, familia: 0 },
  barcelona: { publica: 210, privada: 520, compartido4: 270, compartido2: 380, familia: 0 },
  valencia: { publica: 180, privada: 380, compartido4: 220, compartido2: 300, familia: 0 },
  sevilla: { publica: 170, privada: 350, compartido4: 200, compartido2: 280, familia: 0 },
  salamanca: { publica: 160, privada: 320, compartido4: 180, compartido2: 250, familia: 0 },
  otras: { publica: 175, privada: 370, compartido4: 210, compartido2: 290, familia: 0 },
};

const TRANSPORTE: Record<string, number> = {
  madrid: 20,
  barcelona: 13.33,
  valencia: 20,
  sevilla: 35.75,
  salamanca: 30,
  otras: 30,
};

const COLORS = {
  necesidades: '#10B981', // Verde
  deseos: '#F97316', // Naranja
  ahorro: '#FCD34D', // Dorado
};

function PresupuestoEstudianteCalculator({ onBack }: PresupuestoEstudianteCalculatorProps) {
  const [form, setForm] = useState<FormData>({
    ingresosMensuales: 600,
    ciudad: 'madrid',
    tipoAlojamiento: 'compartido2',
    trabaja: false,
    horasTrabajoSemanal: 0,
  });
  const [editingField, setEditingField] = useState<string | null>(null);

  const resultados = useMemo(() => {
    const { ingresosMensuales, ciudad, tipoAlojamiento, trabaja, horasTrabajoSemanal } = form;

    // Presupuesto IDEAL según regla 50/30/20 (para referencia)
    const necesidadesIdeal = ingresosMensuales * 0.5;
    const deseosIdeal = ingresosMensuales * 0.3;
    const ahorroIdeal = ingresosMensuales * 0.2;

    // Costes REALES de necesidades (usar valores personalizados si existen, sino calcular)
    const alojamientoReal = form.alojamientoPersonalizado ?? (COSTES_ALOJAMIENTO[ciudad]?.[tipoAlojamiento] || 0);
    const transporteReal = form.transportePersonalizado ?? (TRANSPORTE[ciudad] || 30);
    const alimentacionReal = form.alimentacionPersonalizada ?? 80; // Base: cocina en casa
    const necesidadesReales = alojamientoReal + alimentacionReal + transporteReal;

    // Calcular qué queda disponible después de cubrir necesidades reales
    const restoDisponible = ingresosMensuales - necesidadesReales;
    
    // Si hay déficit, no queda nada para deseos/ahorro
    const tieneDeficit = restoDisponible < 0;
    
    // Distribuir el resto disponible proporcionalmente (30% deseos, 20% ahorro del ideal = 60/40)
    const porcentajeDeseos = 0.3 / (0.3 + 0.2); // 60% del 50% restante
    const porcentajeAhorro = 0.2 / (0.3 + 0.2); // 40% del 50% restante
    
    const deseos = tieneDeficit ? 0 : restoDisponible * porcentajeDeseos;
    const ahorro = tieneDeficit ? 0 : restoDisponible * porcentajeAhorro;

    // Distribuir deseos (usar valores personalizados si existen)
    const ocio = form.ocioPersonalizado ?? (deseos * 0.4);
    const ropa = form.ropaPersonalizada ?? (deseos * 0.2);
    const cafes = form.cafesPersonalizados ?? (deseos * 0.15);
    const suscripciones = form.suscripcionesPersonalizadas ?? (deseos * 0.15);
    const gym = form.gymPersonalizado ?? (deseos * 0.1);
    const deseosTotal = ocio + ropa + cafes + suscripciones + gym;

    // Distribuir ahorro (usar valores personalizados si existen)
    const fondoEmergencia = form.fondoEmergenciaPersonalizado ?? (ahorro * 0.6);
    const inversion = form.inversionPersonalizada ?? (ahorro * 0.4);
    const ahorroTotal = fondoEmergencia + inversion;

    // Proyecciones (solo si hay ahorro)
    const ahorroAnual = ahorroTotal * 12;
    const anos = 4;
    const mesesTotales = anos * 12;
    let patrimonioAcumulado = 0;
    if (ahorro > 0) {
      for (let mes = 1; mes <= mesesTotales; mes++) {
        patrimonioAcumulado += inversion;
        if (mes % 12 === 0) {
          patrimonioAcumulado *= 1.07; // 7% anual
        }
      }
      patrimonioAcumulado += (fondoEmergencia * mesesTotales);
    }
    const patrimonio4Anos = patrimonioAcumulado;
    const fondoEmergenciaRecomendado = necesidadesReales * 6;

    // Alertas
    const deficit = tieneDeficit ? Math.abs(restoDisponible) : 0;
    const trabajoExcesivo = trabaja && horasTrabajoSemanal > 20;
    const porcentajeAhorroReal = ingresosMensuales > 0 ? (ahorroTotal / ingresosMensuales) * 100 : 0;
    const ahorroBajo = porcentajeAhorroReal < 15 && !tieneDeficit;
    const ahorroExcelente = porcentajeAhorroReal > 25;
    const superaRecomendado = necesidadesReales > necesidadesIdeal;

    return {
      necesidades: {
        alojamiento: alojamientoReal,
        alimentacion: alimentacionReal,
        transporte: transporteReal,
        total: necesidadesReales,
        ideal: necesidadesIdeal,
      },
      deseos: {
        ocio,
        ropa,
        cafes,
        suscripciones,
        gym,
        total: deseosTotal,
        recomendado: deseos,
        ideal: deseosIdeal,
      },
      ahorro: {
        fondoEmergencia,
        inversion,
        total: ahorroTotal,
        recomendado: ahorro,
        ideal: ahorroIdeal,
      },
      proyecciones: {
        ahorroMensual: ahorroTotal,
        ahorroAnual,
        patrimonio4Anos,
        fondoEmergenciaRecomendado,
      },
      alertas: {
        deficit,
        trabajoExcesivo,
        ahorroBajo,
        ahorroExcelente,
        superaRecomendado,
      },
      restoDisponible,
    };
  }, [form]);

  // Datos para el gráfico - mostrar distribución REAL
  const chartData = [
    { name: `Necesidades (${((resultados.necesidades.total / form.ingresosMensuales) * 100).toFixed(0)}%)`, value: resultados.necesidades.total, color: COLORS.necesidades },
    { name: `Deseos (${form.ingresosMensuales > 0 ? ((resultados.deseos.total / form.ingresosMensuales) * 100).toFixed(0) : '0'}%)`, value: resultados.deseos.total, color: COLORS.deseos },
    { name: `Ahorro (${form.ingresosMensuales > 0 ? ((resultados.ahorro.total / form.ingresosMensuales) * 100).toFixed(0) : '0'}%)`, value: resultados.ahorro.total, color: COLORS.ahorro },
  ];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Título
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // Azul #2563EB
    doc.text('Presupuesto Estudiante Universitario', pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Datos del estudiante
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Ingresos mensuales: ${form.ingresosMensuales}€`, 20, yPos);
    yPos += 7;
    doc.text(`Ciudad: ${CIUDADES.find(c => c.value === form.ciudad)?.label}`, 20, yPos);
    yPos += 7;
    doc.text(`Alojamiento: ${TIPOS_ALOJAMIENTO.find(a => a.value === form.tipoAlojamiento)?.label}`, 20, yPos);
    yPos += 15;

    // Resumen
    doc.setFontSize(14);
    doc.text('Resumen del Presupuesto', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.text(`Necesidades reales: ${resultados.necesidades.total.toFixed(2)}€`, 20, yPos);
    yPos += 7;
    doc.text(`Ideal 50%: ${resultados.necesidades.ideal.toFixed(2)}€`, 20, yPos);
    yPos += 7;
    yPos += 7;
    doc.text(`Deseos (30%): ${resultados.deseos.total.toFixed(2)}€`, 20, yPos);
    yPos += 7;
    doc.text(`Ahorro (20%): ${resultados.ahorro.total.toFixed(2)}€`, 20, yPos);
    yPos += 15;

    // Proyecciones
    doc.setFontSize(14);
    doc.text('Proyecciones', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.text(`Ahorro anual: ${resultados.proyecciones.ahorroAnual.toFixed(2)}€`, 20, yPos);
    yPos += 7;
    doc.text(`Patrimonio en 4 años: ${resultados.proyecciones.patrimonio4Anos.toFixed(2)}€`, 20, yPos);
    yPos += 7;

    // Recomendaciones
    if (resultados.alertas.deficit < 0) {
      doc.setTextColor(239, 68, 68);
      doc.text(`⚠️ DÉFICIT: ${Math.abs(resultados.alertas.deficit).toFixed(2)}€ mensuales`, 20, yPos);
      yPos += 7;
      doc.setTextColor(0, 0, 0);
    }

    doc.save('presupuesto-estudiante.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Calculadora Presupuesto Estudiante</h1>
                <p className="text-gray-600">Gestiona tus finanzas universitarias de forma inteligente</p>
              </div>
            </div>
            
            {/* Explicación de la Regla 50/30/20 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">💰 ¿Cómo funciona? La Regla 50/30/20</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Divide tus ingresos mensuales en tres categorías para un presupuesto equilibrado:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border-2" style={{ borderColor: COLORS.necesidades }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.necesidades }}></div>
                    <h3 className="font-bold text-gray-900">50% Necesidades</h3>
                  </div>
                  <p className="text-sm text-gray-600">Alojamiento, comida y transporte. Gastos esenciales que no puedes evitar.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-2" style={{ borderColor: COLORS.deseos }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.deseos }}></div>
                    <h3 className="font-bold text-gray-900">30% Deseos</h3>
                  </div>
                  <p className="text-sm text-gray-600">Ocio, ropa, cafés, gym. Todo lo que quieres pero no necesitas obligatoriamente.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-2" style={{ borderColor: COLORS.ahorro }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.ahorro }}></div>
                    <h3 className="font-bold text-gray-900">20% Ahorro</h3>
                  </div>
                  <p className="text-sm text-gray-600">Fondo de emergencia e inversión. Tu futuro financiero.</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Ejemplo:</strong> Si ganas 600€/mes → 300€ necesidades, 180€ deseos, 120€ ahorro
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Datos del Estudiante</h2>

              {/* Ingresos Mensuales */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingresos Mensuales (€)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1500"
                  step="50"
                  value={form.ingresosMensuales}
                  onChange={(e) => setForm({ ...form, ingresosMensuales: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setForm({ ...form, ingresosMensuales: Math.max(0, form.ingresosMensuales - 50) })}
                    className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  >
                    -50
                  </button>
                  <button
                    onClick={() => setForm({ ...form, ingresosMensuales: Math.min(1500, form.ingresosMensuales + 50) })}
                    className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  >
                    +50
                  </button>
                </div>
              </div>

              {/* Ciudad */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <select
                  value={form.ciudad}
                  onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {CIUDADES.map((ciudad) => (
                    <option key={ciudad.value} value={ciudad.value}>
                      {ciudad.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo Alojamiento */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Alojamiento</label>
                <select
                  value={form.tipoAlojamiento}
                  onChange={(e) => setForm({ ...form, tipoAlojamiento: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {TIPOS_ALOJAMIENTO.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trabaja */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.trabaja}
                    onChange={(e) => setForm({ ...form, trabaja: e.target.checked, horasTrabajoSemanal: e.target.checked ? form.horasTrabajoSemanal : 0 })}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">¿Trabajas mientras estudias?</span>
                </label>
              </div>

              {/* Horas Trabajo */}
              {form.trabaja && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horas de Trabajo Semanales
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="5"
                    value={form.horasTrabajoSemanal}
                    onChange={(e) => setForm({ ...form, horasTrabajoSemanal: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gráfico Circular */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Tu Distribución Real del Presupuesto</h2>
                <p className="text-gray-600 text-sm">
                  Este gráfico muestra cómo se distribuyen realmente tus {form.ingresosMensuales}€ mensuales según tus costes reales
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value.toFixed(0)}€ (${percent ? (percent * 100).toFixed(0) : '0'}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number | undefined) => value !== undefined ? `${value.toFixed(2)}€` : '0€'} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alertas */}
            {(resultados.alertas.deficit > 0 || resultados.alertas.trabajoExcesivo || resultados.alertas.ahorroBajo || resultados.alertas.ahorroExcelente) && (
              <div className="space-y-3">
                {resultados.alertas.deficit > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">⚠️ DÉFICIT {resultados.alertas.deficit.toFixed(2)}€ mensuales</p>
                      <p className="text-red-700 text-sm mt-1">Tus gastos básicos ({resultados.necesidades.total.toFixed(0)}€) superan tus ingresos ({form.ingresosMensuales}€). Insostenible. Reduce gastos o aumenta ingresos</p>
                    </div>
                  </div>
                )}
                {resultados.alertas.trabajoExcesivo && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900">⚠️ Trabajar más de 20h semanales</p>
                      <p className="text-yellow-700 text-sm mt-1">Puede impactar el rendimiento académico (-1.2 puntos nota media)</p>
                    </div>
                  </div>
                )}
                {resultados.alertas.ahorroBajo && (
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-orange-900">⚠️ Ahorro bajo</p>
                      <p className="text-orange-700 text-sm mt-1">Objetivo mínimo 15-20% de ingresos</p>
                    </div>
                  </div>
                )}
                {resultados.alertas.ahorroExcelente && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">✅ Excelente!</p>
                      <p className="text-green-700 text-sm mt-1">Ahorro superior al promedio</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Desglose Detallado */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Desglose Detallado de Tus Gastos</h2>
                <p className="text-gray-600 text-sm">
                  Aquí puedes ver exactamente en qué gastas tu dinero cada mes
                </p>
              </div>

              {/* Necesidades */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.necesidades }}></div>
                    NECESIDADES (Tus gastos reales)
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      Ideal: 50% = {resultados.necesidades.ideal.toFixed(0)}€
                    </span>
                    {(form.alojamientoPersonalizado !== undefined || form.alimentacionPersonalizada !== undefined || form.transportePersonalizado !== undefined) && (
                      <button
                        onClick={() => {
                          setForm({
                            ...form,
                            alojamientoPersonalizado: undefined,
                            alimentacionPersonalizada: undefined,
                            transportePersonalizado: undefined,
                          });
                        }}
                        className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                        title="Resetear a valores sugeridos"
                      >
                        Resetear valores
                      </button>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Alojamiento ({CIUDADES.find(c => c.value === form.ciudad)?.label}, {TIPOS_ALOJAMIENTO.find(a => a.value === form.tipoAlojamiento)?.label}):</span>
                      <span className="text-xs text-gray-500 ml-2">(sugerido: {(COSTES_ALOJAMIENTO[form.ciudad]?.[form.tipoAlojamiento] || 0).toFixed(0)}€)</span>
                    </div>
                    {editingField === 'alojamiento' ? (
                      <input
                        type="number"
                        min="0"
                        step="10"
                        defaultValue={resultados.necesidades.alojamiento}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, alojamientoPersonalizado: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, alojamientoPersonalizado: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('alojamiento')}
                        title="Haz clic para editar"
                      >
                        {resultados.necesidades.alojamiento.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Alimentación (cocina en casa):</span>
                      <span className="text-xs text-gray-500 ml-2">(sugerido: 80€)</span>
                    </div>
                    {editingField === 'alimentacion' ? (
                      <input
                        type="number"
                        min="0"
                        step="10"
                        defaultValue={resultados.necesidades.alimentacion}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, alimentacionPersonalizada: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, alimentacionPersonalizada: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('alimentacion')}
                        title="Haz clic para editar"
                      >
                        {resultados.necesidades.alimentacion.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Transporte ({CIUDADES.find(c => c.value === form.ciudad)?.label}):</span>
                      <span className="text-xs text-gray-500 ml-2">(sugerido: {(TRANSPORTE[form.ciudad] || 30).toFixed(0)}€)</span>
                    </div>
                    {editingField === 'transporte' ? (
                      <input
                        type="number"
                        min="0"
                        step="5"
                        defaultValue={resultados.necesidades.transporte}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, transportePersonalizado: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, transportePersonalizado: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('transporte')}
                        title="Haz clic para editar"
                      >
                        {resultados.necesidades.transporte.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-gray-300 mt-2">
                    <span className="font-bold text-gray-900">Total necesidades:</span>
                    <span className="font-bold text-gray-900">{resultados.necesidades.total.toFixed(2)}€</span>
                    <span className="text-sm text-gray-500">
                      ({form.ingresosMensuales > 0 ? ((resultados.necesidades.total / form.ingresosMensuales) * 100).toFixed(1) : '0'}% de tus ingresos)
                    </span>
                  </div>
                  {resultados.alertas.superaRecomendado && (
                    <div className="mt-3 p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                      <p className="text-sm text-orange-800 font-semibold">
                        ⚠️ Tus gastos ({resultados.necesidades.total.toFixed(0)}€) superan el 50% recomendado ({resultados.necesidades.ideal.toFixed(0)}€)
                      </p>
                      <p className="text-xs text-orange-700 mt-1">
                        Te quedan {resultados.restoDisponible.toFixed(0)}€ para deseos y ahorro (en lugar de los {((form.ingresosMensuales * 0.5)).toFixed(0)}€ ideales)
                      </p>
                    </div>
                  )}
                  {!resultados.alertas.superaRecomendado && (
                    <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-500 rounded">
                      <p className="text-sm text-green-800 font-semibold">
                        ✅ Tus gastos están dentro del 50% recomendado
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Te quedan {resultados.restoDisponible.toFixed(0)}€ para deseos y ahorro
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Deseos */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.deseos }}></div>
                    DESEOS (Lo que realmente puedes gastar)
                  </h3>
                  <span className="text-sm text-gray-500">
                    Ideal: 30% = {resultados.deseos.ideal.toFixed(0)}€
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-600">Gastos opcionales para disfrutar y relajarte</p>
                  {(form.ocioPersonalizado !== undefined || form.ropaPersonalizada !== undefined || form.cafesPersonalizados !== undefined || form.suscripcionesPersonalizadas !== undefined || form.gymPersonalizado !== undefined) && (
                    <button
                      onClick={() => {
                        setForm({
                          ...form,
                          ocioPersonalizado: undefined,
                          ropaPersonalizada: undefined,
                          cafesPersonalizados: undefined,
                          suscripcionesPersonalizadas: undefined,
                          gymPersonalizado: undefined,
                        });
                      }}
                      className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                      title="Resetear a valores recomendados"
                    >
                      Resetear valores
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Ocio salidas:</span>
                      <span className="text-xs text-gray-500 ml-2">(recomendado: {(resultados.deseos.recomendado * 0.4).toFixed(0)}€)</span>
                    </div>
                    {editingField === 'ocio' ? (
                      <input
                        type="number"
                        min="0"
                        step="5"
                        defaultValue={resultados.deseos.ocio}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, ocioPersonalizado: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, ocioPersonalizado: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('ocio')}
                        title="Haz clic para editar"
                      >
                        {resultados.deseos.ocio.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Ropa:</span>
                      <span className="text-xs text-gray-500 ml-2">(recomendado: {(resultados.deseos.recomendado * 0.2).toFixed(0)}€)</span>
                    </div>
                    {editingField === 'ropa' ? (
                      <input
                        type="number"
                        min="0"
                        step="5"
                        defaultValue={resultados.deseos.ropa}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, ropaPersonalizada: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, ropaPersonalizada: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('ropa')}
                        title="Haz clic para editar"
                      >
                        {resultados.deseos.ropa.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Cafés:</span>
                      <span className="text-xs text-gray-500 ml-2">(recomendado: {(resultados.deseos.recomendado * 0.15).toFixed(0)}€)</span>
                    </div>
                    {editingField === 'cafes' ? (
                      <input
                        type="number"
                        min="0"
                        step="5"
                        defaultValue={resultados.deseos.cafes}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, cafesPersonalizados: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, cafesPersonalizados: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('cafes')}
                        title="Haz clic para editar"
                      >
                        {resultados.deseos.cafes.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Suscripciones:</span>
                      <span className="text-xs text-gray-500 ml-2">(recomendado: {(resultados.deseos.recomendado * 0.15).toFixed(0)}€)</span>
                    </div>
                    {editingField === 'suscripciones' ? (
                      <input
                        type="number"
                        min="0"
                        step="5"
                        defaultValue={resultados.deseos.suscripciones}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, suscripcionesPersonalizadas: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, suscripcionesPersonalizadas: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('suscripciones')}
                        title="Haz clic para editar"
                      >
                        {resultados.deseos.suscripciones.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Gym:</span>
                      <span className="text-xs text-gray-500 ml-2">(recomendado: {(resultados.deseos.recomendado * 0.1).toFixed(0)}€)</span>
                    </div>
                    {editingField === 'gym' ? (
                      <input
                        type="number"
                        min="0"
                        step="5"
                        defaultValue={resultados.deseos.gym}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, gymPersonalizado: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, gymPersonalizado: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('gym')}
                        title="Haz clic para editar"
                      >
                        {resultados.deseos.gym.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-bold text-gray-900">Total deseos:</span>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{resultados.deseos.total.toFixed(2)}€</span>
                      <span className="text-xs text-gray-500 ml-2">(recomendado: {resultados.deseos.recomendado.toFixed(0)}€)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ahorro */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.ahorro }}></div>
                    AHORRO (Lo que realmente puedes ahorrar)
                  </h3>
                  <span className="text-sm text-gray-500">
                    Ideal: 20% = {resultados.ahorro.ideal.toFixed(0)}€
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-600">Tu seguridad financiera y futuro</p>
                  {(form.fondoEmergenciaPersonalizado !== undefined || form.inversionPersonalizada !== undefined) && (
                    <button
                      onClick={() => {
                        setForm({
                          ...form,
                          fondoEmergenciaPersonalizado: undefined,
                          inversionPersonalizada: undefined,
                        });
                      }}
                      className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                      title="Resetear a valores recomendados"
                    >
                      Resetear valores
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Fondo de emergencia:</span>
                      <span className="text-xs text-gray-500 ml-2">(recomendado: {(resultados.ahorro.recomendado * 0.6).toFixed(0)}€)</span>
                    </div>
                    {editingField === 'fondoEmergencia' ? (
                      <input
                        type="number"
                        min="0"
                        step="5"
                        defaultValue={resultados.ahorro.fondoEmergencia}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, fondoEmergenciaPersonalizado: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, fondoEmergenciaPersonalizado: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('fondoEmergencia')}
                        title="Haz clic para editar"
                      >
                        {resultados.ahorro.fondoEmergencia.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <span className="text-gray-700">Inversión:</span>
                      <span className="text-xs text-gray-500 ml-2">(recomendado: {(resultados.ahorro.recomendado * 0.4).toFixed(0)}€)</span>
                    </div>
                    {editingField === 'inversion' ? (
                      <input
                        type="number"
                        min="0"
                        step="5"
                        defaultValue={resultados.ahorro.inversion}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setForm({ ...form, inversionPersonalizada: value });
                          }
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat(e.currentTarget.value);
                            if (!isNaN(value) && value >= 0) {
                              setForm({ ...form, inversionPersonalizada: value });
                            }
                            setEditingField(null);
                          } else if (e.key === 'Escape') {
                            setEditingField(null);
                          }
                        }}
                        className="w-24 px-2 py-1 border border-blue-500 rounded text-right font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="font-semibold cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => setEditingField('inversion')}
                        title="Haz clic para editar"
                      >
                        {resultados.ahorro.inversion.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-bold text-gray-900">Total ahorro:</span>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{resultados.ahorro.total.toFixed(2)}€</span>
                      <span className="text-xs text-gray-500 ml-2">(recomendado: {resultados.ahorro.recomendado.toFixed(0)}€)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proyecciones */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Proyecciones a Futuro
                </h2>
                <p className="text-gray-600 text-sm">
                  Si ahorras {resultados.ahorro.total.toFixed(0)}€ al mes, aquí tienes tus proyecciones
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Ahorro Mensual</p>
                  <p className="text-2xl font-bold text-gray-900">{resultados.proyecciones.ahorroMensual.toFixed(2)}€</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Ahorro Anual</p>
                  <p className="text-2xl font-bold text-gray-900">{resultados.proyecciones.ahorroAnual.toFixed(2)}€</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Patrimonio 4 años</p>
                  <p className="text-2xl font-bold text-gray-900">{resultados.proyecciones.patrimonio4Anos.toFixed(2)}€</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Fondo Emergencia Recomendado</p>
                  <p className="text-2xl font-bold text-gray-900">{resultados.proyecciones.fondoEmergenciaRecomendado.toFixed(2)}€</p>
                </div>
              </div>
            </div>

            {/* Botón Descargar PDF */}
            <button
              onClick={handleDownloadPDF}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              <Download className="w-5 h-5" />
              Descargar PDF Presupuesto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresupuestoEstudianteCalculator;
