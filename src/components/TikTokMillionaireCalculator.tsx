import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSwipe } from '../hooks/useSwipe';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarData {
  age: number;
  amount: number;
  isActive: boolean;
}

const TikTokMillionaireCalculator = ({ onBack }: { onBack?: () => void }) => {
  const [step, setStep] = useState(1);

  // Configurar navegación por swipe
  const swipeRef = useSwipe({
    threshold: 120,
    velocity: 0.2,
    safeZone: { top: 160, bottom: 100, left: 50, right: 50 },
    onSwipeRight: () => {
      // Swipe derecha = volver al landing
      if (onBack) onBack();
    },
    onSwipeUp: () => {
      // Swipe arriba = siguiente paso
      if (step < 4) {
        setStep(step + 1);
      }
    },
    onSwipeDown: () => {
      // Swipe abajo = paso anterior
      if (step > 1) {
        setStep(step - 1);
      }
    }
  });
  const [age, setAge] = useState(25);
  const [monthlySavings, setMonthlySavings] = useState(500);
  const [riskProfile, setRiskProfile] = useState<'conservador' | 'medio' | 'agresivo'>('medio');
  const [targetAge, setTargetAge] = useState(40);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTargetCelebration, setShowTargetCelebration] = useState(false);
  const [barData, setBarData] = useState<BarData[]>([]);
  const [targetBarData, setTargetBarData] = useState<BarData[]>([]);
  // Variables eliminadas ya que Chart.js maneja la interactividad
  const [millionaireAge, setMillionaireAge] = useState<number>(0);

  const riskProfiles = {
    conservador: { rate: 0.04, emoji: '🛡️', color: 'from-green-400 to-blue-500' },
    medio: { rate: 0.07, emoji: '⚖️', color: 'from-yellow-400 to-orange-500' },
    agresivo: { rate: 0.12, emoji: '🚀', color: 'from-red-400 to-pink-500' }
  };

  const calculateMillionaireAge = () => {
    if (!age || !monthlySavings) return;
    
    const currentAge = Number(age);
    const savings = Number(monthlySavings);
    const annualRate = riskProfiles[riskProfile].rate;
    const monthlyRate = annualRate / 12;
    const targetAmount = 1000000;

    if (savings <= 0) return;

    // Calcular años necesarios
    let yearsNeeded: number;
    if (monthlyRate === 0) {
      yearsNeeded = targetAmount / (savings * 12);
    } else {
      yearsNeeded = Math.log(1 + (targetAmount * monthlyRate) / savings) / 
                    (12 * Math.log(1 + monthlyRate));
    }

    const calculatedMillionaireAge = currentAge + yearsNeeded;
    setMillionaireAge(calculatedMillionaireAge);

    // Generar datos para Chart.js como en tu código
    const years: string[] = [];
    const amounts: number[] = [];
    let total = 0;
    const maxYears = Math.min(50, Math.ceil(yearsNeeded) + 10);

    for (let i = 1; i <= maxYears; i++) {
      const months = i * 12;
      if (monthlyRate === 0) {
        total = savings * months;
      } else {
        total = savings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      }
      years.push(`Año ${i}`);
      amounts.push(Math.min(total, targetAmount));
    }

    // Convertir a formato BarData para compatibilidad
    const data: BarData[] = years.map((_, index) => ({
      age: currentAge + index + 1,
      amount: amounts[index],
      isActive: amounts[index] >= targetAmount
    }));

    setBarData(data);
    setShowCelebration(true);
    
    setTimeout(() => {
      setStep(3);
      setShowCelebration(false);
    }, 3000);
  };

  const calculateTargetSavings = () => {
    if (!age || !targetAge) return;
    
    const currentAge = Number(age);
    const goalAge = Number(targetAge);
    const yearsToSave = goalAge - currentAge;
    const annualRate = riskProfiles[riskProfile].rate;
    const monthlyRate = annualRate / 12;
    const targetAmount = 1000000;

    if (yearsToSave <= 0) return;

    // Calcular ahorro mensual necesario
    let monthlySavingsNeeded: number;
    if (monthlyRate === 0) {
      monthlySavingsNeeded = targetAmount / (yearsToSave * 12);
    } else {
      monthlySavingsNeeded = targetAmount * monthlyRate / 
                            (Math.pow(1 + monthlyRate, yearsToSave * 12) - 1);
    }

    setMonthlySavings(Math.round(monthlySavingsNeeded));

    // Generar datos para la gráfica objetivo
    const data: BarData[] = [];
    for (let i = 0; i <= yearsToSave; i++) {
      const currentYearAge = currentAge + i;
      if (i === 0) {
        data.push({ age: currentYearAge, amount: 0, isActive: false });
      } else {
        const months = i * 12;
        let amount: number;
        if (monthlyRate === 0) {
          amount = monthlySavingsNeeded * months;
        } else {
          amount = monthlySavingsNeeded * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        }
        data.push({ 
          age: currentYearAge, 
          amount: Math.min(amount, targetAmount), 
          isActive: amount >= targetAmount 
        });
      }
    }

    setTargetBarData(data);
    setShowTargetCelebration(true);
    
    setTimeout(() => {
      setStep(5);
      setShowTargetCelebration(false);
    }, 3000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          {['🎉', '💰', '🏆', '✨', '🎊'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center">
        {getConfetti()}
        <div className="text-center text-white">
          <div className="text-8xl mb-8 animate-bounce">🎉</div>
          <h1 className="text-6xl font-black mb-4">¡FELICIDADES!</h1>
          <h2 className="text-4xl font-bold mb-8">¡Serás millonario!</h2>
          <div className="text-5xl font-black text-yellow-300">
            A los {Math.round(Number(age) + (Math.log(1 + (1000000 * (riskProfiles[riskProfile].rate / 12)) / Number(monthlySavings)) / (12 * Math.log(1 + (riskProfiles[riskProfile].rate / 12)))))} años
          </div>
        </div>
      </div>
    );
  }

  if (showTargetCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center">
        {getConfetti()}
        <div className="text-center text-white">
          <div className="text-8xl mb-8 animate-bounce">🚀</div>
          <h1 className="text-6xl font-black mb-4">¡PERFECTO!</h1>
          <h2 className="text-4xl font-bold mb-8">¡Serás millonario a los {targetAge} años!</h2>
          <div className="text-5xl font-black text-yellow-300">
            Ahorra {formatCurrency(Number(monthlySavings))} al mes
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={swipeRef}
      className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md mx-auto">
        
        {/* Paso 1: Edad con slider */}
        {step === 1 && (
          <div className="text-center text-white">
            <div className="text-8xl mb-8 animate-bounce">🎂</div>
            <h1 className="text-4xl font-black mb-4">¿Cuántos años tienes?</h1>
            
            {/* Display de edad */}
            <div className="bg-white/20 rounded-3xl p-8 mb-8 border-4 border-white/30">
              <div className="text-8xl font-black text-yellow-300 mb-2">{age}</div>
              <div className="text-2xl font-bold">años</div>
            </div>

            {/* Slider de edad */}
            <div className="mb-8">
              <input
                type="range"
                min="18"
                max="65"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-4 bg-white/20 rounded-2xl appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${((age - 18) / (65 - 18)) * 100}%, rgba(255,255,255,0.2) ${((age - 18) / (65 - 18)) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <div className="flex justify-between text-sm mt-2 opacity-70">
                <span>18</span>
                <span>65</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-3xl py-6 rounded-3xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              ¡SIGUIENTE! 🚀
            </button>
          </div>
        )}

        {/* Paso 2: Ahorro mensual con slider */}
        {step === 2 && (
          <div className="text-center text-white">
            <div className="text-8xl mb-8 animate-bounce">💰</div>
            <h1 className="text-4xl font-black mb-4">¿Cuánto puedes ahorrar al mes?</h1>
            
            {/* Display de ahorro */}
            <div className="bg-white/20 rounded-3xl p-8 mb-8 border-4 border-white/30">
              <div className="text-6xl font-black text-yellow-300 mb-2">{formatCurrency(monthlySavings)}</div>
              <div className="text-2xl font-bold">al mes</div>
            </div>

            {/* Slider de ahorro */}
            <div className="mb-8">
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                className="w-full h-4 bg-white/20 rounded-2xl appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${((monthlySavings - 100) / (5000 - 100)) * 100}%, rgba(255,255,255,0.2) ${((monthlySavings - 100) / (5000 - 100)) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <div className="flex justify-between text-sm mt-2 opacity-70">
                <span>100€</span>
                <span>5.000€</span>
              </div>
            </div>

            {/* Indicadores de ahorro */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {[
                { amount: 300, label: 'Básico', emoji: '🟡' },
                { amount: 800, label: 'Bueno', emoji: '🟢' },
                { amount: 1500, label: 'Excelente', emoji: '🔥' }
              ].map(indicator => (
                <button
                  key={indicator.amount}
                  onClick={() => setMonthlySavings(indicator.amount)}
                  className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                    Math.abs(monthlySavings - indicator.amount) < 100
                      ? 'border-yellow-400 bg-white/30 scale-105'
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="text-2xl mb-1">{indicator.emoji}</div>
                  <div className="text-sm font-bold">{indicator.label}</div>
                  <div className="text-xs opacity-80">{formatCurrency(indicator.amount)}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2.5)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-3xl py-6 rounded-3xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              ¡SIGUIENTE! 🚀
            </button>
          </div>
        )}

        {/* Paso 2.5: Perfil de riesgo */}
        {step === 2.5 && (
          <div className="text-center text-white">
            <div className="text-8xl mb-8 animate-bounce">⚖️</div>
            <h1 className="text-4xl font-black mb-8">¿Cuál es tu perfil de riesgo?</h1>
            
            <div className="space-y-4 mb-8">
              {Object.entries(riskProfiles).map(([key, profile]) => (
                <button
                  key={key}
                  onClick={() => setRiskProfile(key as any)}
                  className={`w-full p-6 rounded-3xl border-4 transition-all duration-300 ${
                    riskProfile === key 
                      ? 'border-yellow-400 bg-white/30 scale-105' 
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="text-4xl mb-2">{profile.emoji}</div>
                  <div className="text-2xl font-black capitalize">{key}</div>
                  <div className="text-lg opacity-80">Rentabilidad: {(profile.rate * 100).toFixed(1)}% anual</div>
                </button>
              ))}
            </div>

            <button
              onClick={calculateMillionaireAge}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-3xl py-6 rounded-3xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              ¡CALCULAR! 🚀
            </button>
          </div>
        )}

        {/* Paso 3: Resultado inicial con gráfica */}
        {step === 3 && (
          <div className="text-center text-white">
            <div className="text-8xl mb-6 animate-bounce">📊</div>
            <h1 className="text-3xl font-black mb-6">¡Tu progreso hacia el millón!</h1>
            
            {/* Resultado principal */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 mb-6 text-black">
              <div className="text-5xl font-black mb-2">{Math.round(millionaireAge)}</div>
              <div className="text-xl font-bold">años para ser millonario</div>
            </div>

                {/* Gráfica de barras con Chart.js */}
                <div className="bg-white/10 rounded-3xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-6 text-center">📈 Progreso hacia el millón</h3>
                  
                  <div className="bg-white/5 rounded-2xl p-6">
                    <Bar
                      data={{
                        labels: barData.map(bar => `${bar.age} años`),
                        datasets: [{
                          label: 'Patrimonio acumulado (€)',
                          data: barData.map(bar => bar.amount),
                          backgroundColor: barData.map(bar => 
                            bar.isActive 
                              ? 'rgba(255, 193, 7, 0.8)' // Amarillo para millonarios
                              : 'rgba(59, 130, 246, 0.8)' // Azul para progreso
                          ),
                          borderColor: barData.map(bar => 
                            bar.isActive 
                              ? 'rgba(255, 193, 7, 1)'
                              : 'rgba(59, 130, 246, 1)'
                          ),
                          borderWidth: 1
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 1000000,
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
                      height={300}
                    />
                  </div>
                </div>

            <button
              onClick={() => setStep(4)}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-black text-2xl py-5 rounded-3xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              ¿Quieres ser millonario antes? 🚀
            </button>
          </div>
        )}

        {/* Paso 4: Nueva edad objetivo con slider */}
        {step === 4 && (
          <div className="text-center text-white">
            <div className="text-8xl mb-8 animate-bounce">🎯</div>
            <h1 className="text-3xl font-black mb-4">¿A qué edad quieres ser millonario?</h1>
            
            {/* Display de edad objetivo */}
            <div className="bg-white/20 rounded-3xl p-6 mb-6 border-4 border-white/30">
              <div className="text-6xl font-black text-yellow-300 mb-2">{targetAge}</div>
              <div className="text-xl font-bold">años</div>
            </div>

            {/* Slider de edad objetivo */}
            <div className="mb-6">
              <input
                type="range"
                min={age + 1}
                max={Math.min(age + 30, 80)}
                value={targetAge}
                onChange={(e) => setTargetAge(Number(e.target.value))}
                className="w-full h-4 bg-white/20 rounded-2xl appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((targetAge - (age + 1)) / (Math.min(age + 30, 80) - (age + 1))) * 100}%, rgba(255,255,255,0.2) ${((targetAge - (age + 1)) / (Math.min(age + 30, 80) - (age + 1))) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <div className="flex justify-between text-sm mt-2 opacity-70">
                <span>{age + 1}</span>
                <span>{Math.min(age + 30, 80)}</span>
              </div>
            </div>

            {/* Indicadores de edad */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { age: age + 5, label: 'Pronto', emoji: '⚡' },
                { age: age + 10, label: 'Medio', emoji: '🎯' },
                { age: age + 20, label: 'Tranquilo', emoji: '😌' }
              ].map(indicator => (
                <button
                  key={indicator.age}
                  onClick={() => setTargetAge(indicator.age)}
                  className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                    Math.abs(targetAge - indicator.age) < 2
                      ? 'border-yellow-400 bg-white/30 scale-105'
                      : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="text-2xl mb-1">{indicator.emoji}</div>
                  <div className="text-sm font-bold">{indicator.label}</div>
                  <div className="text-xs opacity-80">{indicator.age} años</div>
                </button>
              ))}
            </div>

            <button
              onClick={calculateTargetSavings}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-2xl py-5 rounded-3xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              ¡CALCULAR AHORRO! 🚀
            </button>
          </div>
        )}

        {/* Paso 5: Resultado final con gráfica */}
        {step === 5 && (
          <div className="text-center text-white">
            <div className="text-8xl mb-6 animate-bounce">🎊</div>
            <h1 className="text-3xl font-black mb-6">¡Plan de acción!</h1>
            
            {/* Resultado principal */}
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-6 mb-6 text-white">
              <div className="text-5xl font-black mb-2">{formatCurrency(Number(monthlySavings))}</div>
              <div className="text-xl font-bold">Al mes para ser millonario</div>
              <div className="text-lg opacity-90">a los {targetAge} años</div>
            </div>

                {/* Gráfica de barras del objetivo con Chart.js */}
                <div className="bg-white/10 rounded-3xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-6 text-center">📈 Progreso hacia tu objetivo</h3>
                  
                  <div className="bg-white/5 rounded-2xl p-6">
                    <Bar
                      data={{
                        labels: targetBarData.map(bar => `${bar.age} años`),
                        datasets: [{
                          label: 'Patrimonio acumulado (€)',
                          data: targetBarData.map(bar => bar.amount),
                          backgroundColor: targetBarData.map(bar => 
                            bar.isActive 
                              ? 'rgba(34, 197, 94, 0.8)' // Verde para objetivo cumplido
                              : 'rgba(147, 51, 234, 0.8)' // Púrpura para progreso
                          ),
                          borderColor: targetBarData.map(bar => 
                            bar.isActive 
                              ? 'rgba(34, 197, 94, 1)'
                              : 'rgba(147, 51, 234, 1)'
                          ),
                          borderWidth: 1
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 1000000,
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
                      height={300}
                    />
                  </div>
                </div>

            <button
              onClick={() => {
                setStep(1);
                setAge(25);
                setMonthlySavings(500);
                setTargetAge(40);
                setBarData([]);
                setTargetBarData([]);
                // Variables de interactividad eliminadas con Chart.js
                setMillionaireAge(0);
              }}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black text-2xl py-5 rounded-3xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              ¡CALCULAR OTRO! 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TikTokMillionaireCalculator;
