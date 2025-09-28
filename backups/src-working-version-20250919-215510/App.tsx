import { useState, useEffect } from 'react';
import ExpenseControlApp from './components/ExpenseControlApp';
import TikTokMillionaireCalculator from './components/TikTokMillionaireCalculator';
import SalaryCalculator from './components/SalaryCalculator';

function App() {
  const [mode, setMode] = useState<'landing' | 'gastos' | 'tiktok-millonario' | 'salario'>('landing');

  useEffect(() => {
    const handleModeChange = (event: CustomEvent) => {
      if (event.detail === 'millonario') {
        setMode('tiktok-millonario');
      } else if (event.detail === 'gastos') {
        setMode('gastos');
      }
    };

    window.addEventListener('changeMode', handleModeChange as EventListener);
    return () => {
      window.removeEventListener('changeMode', handleModeChange as EventListener);
    };
  }, []);

  if (mode === 'gastos') {
    return <ExpenseControlApp onBack={() => setMode('landing')} />;
  }

  if (mode === 'tiktok-millonario') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600">
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <TikTokMillionaireCalculator />
      </div>
    );
  }

  if (mode === 'salario') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <SalaryCalculator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <h1 className="text-6xl font-bold text-white mb-4">FinanzasFácil</h1>
        <p className="text-xl text-white/80 mb-12">Tu herramienta completa para gestionar tus finanzas</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Control de Gastos */}
          <div className="bg-white/10 backdrop-blur-sm border-4 border-white/30 rounded-3xl p-8 shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="text-center">
              <div className="text-6xl mb-6">💸</div>
              <h2 className="text-3xl font-bold text-white mb-4">Control de Gastos</h2>
              <p className="text-white/90 mb-6 text-lg">
                Gestiona tus gastos diarios, categoriza tus compras y mantén el control total de tu dinero.
              </p>
              <button
                onClick={() => setMode('gastos')}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-2xl"
              >
                Empezar Ahora
              </button>
            </div>
          </div>

          {/* TikTok Millonario */}
          <div className="bg-white/10 backdrop-blur-sm border-4 border-white/30 rounded-3xl p-8 shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">¿Cuándo seré millonario?</h2>
              <p className="text-white/90 mb-6 text-lg">
                Calculadora para saber cuándo podrás cumplir tus sueños y alcanzar la libertad financiera.
              </p>
              <button
                onClick={() => setMode('tiktok-millonario')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-2xl"
              >
                ¡CALCULAR! 🚀
              </button>
            </div>
          </div>

          {/* Calculadora Salario */}
          <div className="bg-white/10 backdrop-blur-sm border-4 border-white/30 rounded-3xl p-8 shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="text-center">
              <div className="text-6xl mb-6">💰</div>
              <h2 className="text-3xl font-bold text-white mb-4">Calculadora de Salario Neto</h2>
              <p className="text-white/90 mb-6 text-lg">
                Descubre cuánto recibirás realmente después de impuestos y deducciones.
              </p>
              <button
                onClick={() => setMode('salario')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-2xl"
              >
                Calcular Salario
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">¿Por qué elegir FinanzasFácil?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-white mb-2">Análisis Inteligente</h4>
              <p className="text-white/80">Visualiza tus patrones de gasto y recibe insights personalizados</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-bold text-white mb-2">Objetivos Claros</h4>
              <p className="text-white/80">Establece metas financieras y haz un seguimiento de tu progreso</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-bold text-white mb-2">100% Seguro</h4>
              <p className="text-white/80">Tus datos están protegidos y solo tú tienes acceso a ellos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;