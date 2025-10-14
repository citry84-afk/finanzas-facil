import { useState, useEffect } from 'react';
import ExpenseControlApp from './components/ExpenseControlApp';
import TikTokMillionaireCalculator from './components/TikTokMillionaireCalculator';
import SalaryCalculator from './components/SalaryCalculator';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import About from './components/About';
import Contact from './components/Contact';
import Articles from './components/Articles';
import Guides from './components/Guides';
import FAQ from './components/FAQ';
import Resources from './components/Resources';
import Blog from './components/Blog';
import AutonomosCalculator from './components/AutonomosCalculator';
import AmazonArticles from './components/AmazonArticles';
import ProductoGastos from './components/ProductoGastos';
import LeadMagnet from './components/LeadMagnet';
import DonationModal from './components/DonationModal';
import { analyticsEvents, trackPageView } from './utils/analytics';
import { BannerAd, InlineAd } from './components/AdSense';
import StructuredData from './components/StructuredData';
import PWAInstall from './components/PWAInstall';
import PWADebug from './components/PWADebug';
import { useSwipe } from './hooks/useSwipe';

function App() {
  const [mode, setMode] = useState<'landing' | 'gastos' | 'tiktok-millonario' | 'salario' | 'privacy' | 'terms' | 'about' | 'contact' | 'articles' | 'guides' | 'faq' | 'resources' | 'autonomos' | 'blog' | 'amazon' | 'producto-gastos' | 'donate'>('landing');

  // Configurar navegación por swipe
  const swipeRef = useSwipe({
    threshold: 100,
    velocity: 0.2,
    safeZone: { top: 140, bottom: 100, left: 50, right: 50 },
    onSwipeRight: () => {
      // Swipe derecha = ir atrás
      if (mode !== 'landing') {
        setMode('landing');
        trackPageView('/', 'Landing Page');
      }
    }
  });

  useEffect(() => {
    const handleModeChange = (event: CustomEvent) => {
      if (event.detail === 'millonario') {
        setMode('tiktok-millonario');
        analyticsEvents.millionaireCalculatorOpened();
        trackPageView('/millonario', 'Calculadora Millonario');
      } else if (event.detail === 'gastos') {
        setMode('gastos');
        analyticsEvents.navigationToExpenseControl();
        trackPageView('/gastos', 'Control de Gastos');
      }
    };

    window.addEventListener('changeMode', handleModeChange as EventListener);
    
    // Track initial page load
    trackPageView('/', 'Finanzas Fáciles - Landing');
    
    return () => {
      window.removeEventListener('changeMode', handleModeChange as EventListener);
    };
  }, []);

  // Track mode changes
  useEffect(() => {
    switch (mode) {
      case 'gastos':
        analyticsEvents.expenseControlOpened();
        trackPageView('/gastos', 'Control de Gastos');
        break;
      case 'tiktok-millonario':
        analyticsEvents.millionaireCalculatorOpened();
        trackPageView('/millonario', 'Calculadora Millonario');
        break;
      case 'salario':
        analyticsEvents.salaryCalculatorOpened();
        trackPageView('/salario', 'Calculadora Salario Neto');
        break;
      case 'landing':
        trackPageView('/', 'Finanzas Fáciles - Landing');
        break;
    }
  }, [mode]);

  if (mode === 'gastos') {
    return <ExpenseControlApp onBack={() => setMode('landing')} />;
  }

  if (mode === 'autonomos') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
        {/* Structured Data para Calculadora Autónomos */}
        <StructuredData 
          type="AutonomosCalculator" 
          data={{
            name: "Calculadora de Autónomos 2025 - IRPF y Seguridad Social",
            description: "Calculadora gratuita para autónomos en España. Calcula IRPF, cuota de Seguridad Social, gastos deducibles y bonificaciones por comunidad autónoma.",
            url: "https://finanzasmuyfaciles.netlify.app/autonomos"
          }} 
        />
        
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <AutonomosCalculator onBack={() => setMode('landing')} />
      </div>
    );
  }

  if (mode === 'tiktok-millonario') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600">
        {/* Structured Data para Calculadora Millonario */}
        <StructuredData 
          type="Calculator" 
          data={{
            name: "Calculadora ¿Cuándo Seré Millonario? - Libertad Financiera",
            description: "Calculadora interactiva para saber cuándo podrás cumplir tus sueños y alcanzar la libertad financiera. Calcula tu edad para ser millonario con gráficos y animaciones.",
            url: "https://finanzasmuyfaciles.netlify.app/cuando-ser-millonario",
            features: [
              "Cálculo de interés compuesto",
              "Gráficos interactivos",
              "Animaciones de confeti",
              "Sliders interactivos",
              "Comparativas de ahorro"
            ]
          }} 
        />
        
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <TikTokMillionaireCalculator onBack={() => setMode('landing')} />
      </div>
    );
  }

  if (mode === 'salario') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Structured Data para Calculadora Salario */}
        <StructuredData 
          type="Calculator" 
          data={{
            name: "Calculadora Salario Neto 2025 - Sueldo Bruto a Neto España",
            description: "Calculadora de salario neto 2025 para España. Convierte tu sueldo bruto a neto con cálculos precisos de IRPF, Seguridad Social y comparativas regionales.",
            url: "https://finanzasmuyfaciles.netlify.app/calculadora-salario-neto",
            features: [
              "Cálculo IRPF 2025",
              "Deducciones Seguridad Social",
              "Comparativas regionales",
              "Gráficos de pagas extra",
              "Diseño mobile-first"
            ]
          }} 
        />
        
        <div className="absolute top-20 left-4 z-10">
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

  if (mode === 'privacy') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <PrivacyPolicy />
      </div>
    );
  }

  if (mode === 'terms') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <TermsOfService />
      </div>
    );
  }

  if (mode === 'about') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <About />
      </div>
    );
  }

  if (mode === 'contact') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <Contact />
      </div>
    );
  }

  if (mode === 'articles') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <Articles />
      </div>
    );
  }

  if (mode === 'guides') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <Guides />
      </div>
    );
  }

  if (mode === 'faq') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <FAQ />
      </div>
    );
  }

  if (mode === 'resources') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <Resources />
      </div>
    );
  }

  if (mode === 'blog') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <Blog />
      </div>
    );
  }

  if (mode === 'amazon') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <AmazonArticles />
      </div>
    );
  }

  if (mode === 'producto-gastos') {
    return (
      <div className="min-h-screen">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <ProductoGastos />
      </div>
    );
  }

  if (mode === 'donate') {
    return (
      <div className="min-h-screen">
        <DonationModal isOpen={true} onClose={() => setMode('landing')} />
      </div>
    );
  }


  return (
    <div 
      ref={swipeRef}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      {/* Structured Data para Landing Page */}
      <StructuredData 
        type="WebSite" 
        data={{
          name: "Finanzas Fáciles - Calculadoras Financieras Gratuitas",
          description: "Calculadora de salario neto 2024, calculadora cuándo ser millonario, control de gastos gratis. Herramientas financieras para mejorar tu economía personal.",
          url: "https://finanzasmuyfaciles.netlify.app"
        }} 
      />
      
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <h1 className="text-6xl font-bold text-white mb-4">FinanzasFácil</h1>
        <p className="text-xl text-white/80 mb-4">Calculadoras Financieras Gratuitas 2025</p>
        <p className="text-lg text-white/70 mb-8">Salario neto, libertad financiera y control de gastos</p>
        
        {/* Descripción expandida para SEO */}
        <div className="max-w-4xl mx-auto mt-12 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-left">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">¿Qué es FinanzasFácil?</h2>
            <p className="text-white/90 mb-4 leading-relaxed">
              FinanzasFácil es la plataforma líder en España para educación financiera y herramientas de cálculo gratuitas. 
              Nuestro objetivo es democratizar el acceso a la información financiera de calidad, proporcionando calculadoras 
              precisas, guías prácticas y recursos educativos que te ayuden a tomar mejores decisiones económicas.
            </p>
            <p className="text-white/90 mb-4 leading-relaxed">
              Desde 2024, hemos ayudado a miles de españoles a entender sus finanzas personales, calcular correctamente 
              sus impuestos como autónomos, planificar su ahorro para la jubilación y alcanzar sus objetivos de libertad financiera. 
              Todas nuestras herramientas están actualizadas con la normativa fiscal vigente y son completamente gratuitas.
            </p>
            <p className="text-white/90 leading-relaxed">
              Nuestras calculadoras cubren aspectos esenciales de la economía personal: desde convertir tu salario bruto a neto 
              considerando IRPF y Seguridad Social, hasta simular cuándo podrás alcanzar la libertad financiera con tus ahorros. 
              También ofrecemos herramientas especializadas para autónomos, incluyendo cálculos de gastos deducibles y bonificaciones 
              por comunidad autónoma.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Banner Ad Top */}
        <div className="mb-8">
          <BannerAd />
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Control de Gastos */}
          <div className="bg-white/10 backdrop-blur-sm border-4 border-white/30 rounded-3xl p-8 shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="text-center">
              <div className="text-6xl mb-6">💸</div>
              <h2 className="text-3xl font-bold text-white mb-4">Control de Gastos Personal</h2>
              <p className="text-white/90 mb-6 text-lg">
                App gratuita para gestionar gastos diarios, categorizar compras y controlar tu presupuesto mensual. Ideal para ahorrar dinero y mejorar tus finanzas personales.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToExpenseControl();
                  setMode('gastos');
                }}
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
                Calculadora de libertad financiera para saber cuándo serás millonario. Calcula con interés compuesto cuánto necesitas ahorrar para alcanzar 1 millón de euros.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('millionaire');
                  setMode('tiktok-millonario');
                }}
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
              <h2 className="text-3xl font-bold text-white mb-4">Calculadora Salario Neto 2025</h2>
              <p className="text-white/90 mb-6 text-lg">
                Calculadora gratuita para convertir sueldo bruto a neto en España 2025. Calcula IRPF, Seguridad Social y descubre cuánto recibirás realmente en tu nómina.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('salary');
                  setMode('salario');
                }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-2xl"
              >
                Calcular Salario
              </button>
            </div>
          </div>

          {/* Calculadora Autónomos */}
          <div className="bg-white/10 backdrop-blur-sm border-4 border-white/30 rounded-3xl p-8 shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="text-center">
              <div className="text-6xl mb-6">👨‍💼</div>
              <h2 className="text-3xl font-bold text-white mb-4">Calculadora de Autónomos</h2>
              <p className="text-white/90 mb-6 text-lg">
                Calcula IRPF, cuota de Seguridad Social y gastos deducibles. Incluye bonificaciones por comunidad autónoma para autónomos nuevos.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('autonomos');
                  setMode('autonomos');
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-2xl"
              >
                Calcular Impuestos
              </button>
            </div>
          </div>
        </div>

        {/* Inline Ad */}
        <div className="mt-12">
          <InlineAd />
        </div>

        {/* Lead Magnet CTA */}
        <div className="mt-16">
          <LeadMagnet />
        </div>

        {/* Footer con enlaces legales y donaciones */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center flex-wrap gap-4 text-white/70">
              <button 
                onClick={() => setMode('articles')}
                className="hover:text-white transition-colors underline"
              >
                Artículos
              </button>
              <button 
                onClick={() => setMode('blog')}
                className="hover:text-white transition-colors underline"
              >
                Blog
              </button>
              <button 
                onClick={() => setMode('amazon')}
                className="hover:text-white transition-colors underline"
              >
                Productos Recomendados
              </button>
              <button 
                onClick={() => setMode('guides')}
                className="hover:text-white transition-colors underline"
              >
                Guías
              </button>
              <button 
                onClick={() => setMode('resources')}
                className="hover:text-white transition-colors underline"
              >
                Recursos
              </button>
              <button 
                onClick={() => setMode('faq')}
                className="hover:text-white transition-colors underline"
              >
                FAQ
              </button>
              <button 
                onClick={() => setMode('about')}
                className="hover:text-white transition-colors underline"
              >
                Sobre nosotros
              </button>
              <button 
                onClick={() => setMode('contact')}
                className="hover:text-white transition-colors underline"
              >
                Contacto
              </button>
              <button 
                onClick={() => setMode('privacy')}
                className="hover:text-white transition-colors underline"
              >
                Privacidad
              </button>
              <button 
                onClick={() => setMode('terms')}
                className="hover:text-white transition-colors underline"
              >
                Términos
              </button>
              <button
                onClick={() => setMode('donate')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Donar a través de PayPal"
              >
                <span>💖 Donar</span>
              </button>
            </div>
            <p className="text-white/50 text-sm">
              © 2025 FinanzasFácil - LIPA Studios. Todos los derechos reservados.
            </p>
            
            {/* Cross Promotion Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/70 text-sm mb-4">🌐 Más proyectos de LIPA Studios:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a 
                  href="https://entrenoapp.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 underline transition-colors"
                >
                  💪 EntrenoApp
                </a>
                <span className="text-white/30">•</span>
                <a 
                  href="https://lipastudios.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 underline transition-colors"
                >
                  🎮 LIPA Studios Gaming
                </a>
                <span className="text-white/30">•</span>
                <a 
                  href="https://finanzasmuyfaciles.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 underline transition-colors"
                >
                  💰 Finanzas Muy Fáciles
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/60 text-xs max-w-3xl mx-auto leading-relaxed">
                <strong>Aviso legal:</strong> FinanzasFácil proporciona herramientas de cálculo y contenido educativo con fines informativos. 
                Los cálculos se basan en la normativa fiscal española vigente pero pueden no reflejar situaciones individuales específicas. 
                Para asesoramiento personalizado, consulte con un profesional cualificado (asesor fiscal, gestor o contador). 
                No nos hacemos responsables de decisiones tomadas exclusivamente en base a la información aquí proporcionada. 
                Todos los datos introducidos en nuestras calculadoras se procesan localmente en su navegador y no se almacenan en nuestros servidores.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section para SEO */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Preguntas Frecuentes sobre Calculadoras Financieras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-3">¿Cómo calcular mi salario neto 2025?</h4>
              <p className="text-white/80">Nuestra calculadora de salario neto te ayuda a convertir tu sueldo bruto a neto considerando IRPF, Seguridad Social y todas las deducciones aplicables en España.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-3">¿Cuándo seré millonario?</h4>
              <p className="text-white/80">Con la calculadora de libertad financiera puedes saber exactamente cuánto necesitas ahorrar mensualmente para alcanzar 1 millón de euros.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-3">¿Es gratis usar las calculadoras?</h4>
              <p className="text-white/80">Sí, todas nuestras calculadoras financieras son completamente gratuitas. No necesitas registrarte para usar las herramientas básicas.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-3">¿Cómo controlar mis gastos?</h4>
              <p className="text-white/80">Nuestra app de control de gastos te permite categorizar tus compras, establecer presupuestos y analizar tus patrones de gasto.</p>
            </div>
          </div>
        </div>

        {/* Producto Digital Banner */}
        <div className="mt-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-white/20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full mb-4 font-bold animate-pulse">
              <span className="text-xl">🔥</span>
              <span>NUEVO PRODUCTO</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              20 Gastos Deducibles para Autónomos 2025
            </h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
              PDF Premium con los 20 gastos que TODO autónomo puede deducir para ahorrar entre 2.000€ y 5.000€ al año
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <div className="text-3xl font-bold text-white">19€</div>
                <div className="text-sm text-white/80">Precio lanzamiento</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <div className="text-3xl font-bold text-white">25</div>
                <div className="text-sm text-white/80">Páginas de contenido</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <div className="text-3xl font-bold text-white">⭐⭐⭐⭐⭐</div>
                <div className="text-sm text-white/80">500+ satisfechos</div>
              </div>
            </div>
            <button
              onClick={() => setMode('producto-gastos')}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-3"
            >
              <span>🎁</span>
              <span>VER PRODUCTO (19€)</span>
            </button>
            <p className="mt-4 text-white/80 text-sm">
              ✅ Descarga inmediata • ✅ Garantía 30 días • ✅ Actualizado 2025
            </p>
          </div>
        </div>

        {/* Blog Promotional Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">📚</span>
              <span className="text-white font-semibold">NUEVO CONTENIDO</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Blog de Finanzas Personales 2025
            </h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
              Descubre artículos especializados sobre autónomos, fiscalidad, inversión y gestión del dinero. 
              Guías completas actualizadas para 2025.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-white">14+</div>
                <div className="text-sm text-white/80">Artículos</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-sm text-white/80">Nuevos sobre Autónomos</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-white/80">Productos Recomendados</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setMode('blog')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📖 Leer Blog
              </button>
              <button
                onClick={() => setMode('amazon')}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 border-2 border-white/30"
              >
                🛒 Productos Recomendados
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

        {/* Cross Promotion - Otros Proyectos LIPA Studios */}
        <div className="mt-20 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">🌐 Explora Más de LIPA Studios</h3>
            <p className="text-white/80 text-lg">Descubre todos nuestros proyectos: gaming, fitness y finanzas</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* EntrenoApp */}
            <a 
              href="https://entrenoapp.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="text-4xl mb-4">💪</div>
              <h4 className="text-xl font-bold text-white mb-2">EntrenoApp</h4>
              <p className="text-white/80 text-sm mb-4">
                Tu entrenador personal con GPS tracking y planes personalizados
              </p>
              <div className="text-blue-300 text-sm font-semibold">
                Ver App →
              </div>
            </a>

            {/* LIPA Studios Gaming */}
            <a 
              href="https://lipastudios.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="text-4xl mb-4">🎮</div>
              <h4 className="text-xl font-bold text-white mb-2">LIPA Studios Gaming</h4>
              <p className="text-white/80 text-sm mb-4">
                12 juegos gratis HTML5 con estética cyberpunk
              </p>
              <div className="text-blue-300 text-sm font-semibold">
                Ver Juegos →
              </div>
            </a>

            {/* Finanzas Muy Fáciles */}
            <a 
              href="https://finanzasmuyfaciles.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="text-4xl mb-4">💰</div>
              <h4 className="text-xl font-bold text-white mb-2">Finanzas Muy Fáciles</h4>
              <p className="text-white/80 text-sm mb-4">
                Aprende finanzas personales de forma simple y efectiva
              </p>
              <div className="text-blue-300 text-sm font-semibold">
                Ver Guías →
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstall />
      
      {/* PWA Debug Info */}
      <PWADebug />
    </div>
  );
}

export default App;