import { useState, useEffect, lazy, Suspense } from 'react';
import YouTubeVideosSlider from './components/YouTubeVideosSlider';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import About from './components/About';
import Contact from './components/Contact';
import ContentHub from './components/ContentHub';
import FAQ from './components/FAQ';
import Resources from './components/Resources';
import ProductoGastos from './components/ProductoGastos';
import LeadMagnet from './components/LeadMagnet';
import LandingEditorialSection from './components/LandingEditorialSection';
import LandingIRPF from './components/LandingIRPF';
import LandingCuota from './components/LandingCuota';
import LandingGastos from './components/LandingGastos';
import ProductoCursoFinanzas from './components/ProductoCursoFinanzas';
import DonationModal from './components/DonationModal';
import SocialLinks from './components/SocialLinks';
import RouteLoading from './components/RouteLoading';
import { usePageMeta } from './seo/usePageMeta';

const ExpenseControlApp = lazy(() => import('./components/ExpenseControlApp'));
const TikTokMillionaireCalculator = lazy(() => import('./components/TikTokMillionaireCalculator'));
const SalaryCalculator = lazy(() => import('./components/SalaryCalculator'));
const HipotecaCalculator = lazy(() => import('./components/HipotecaCalculator'));
const AutonomosCalculator = lazy(() => import('./components/AutonomosCalculator'));
const PresupuestoEstudianteCalculator = lazy(() => import('./components/PresupuestoEstudianteCalculator'));
import { BookOpen, Briefcase, Calculator, ExternalLink, GraduationCap, Home, Landmark, ShieldCheck, Smartphone, WalletCards } from 'lucide-react';
// import { AdMobBanner } from './components/AdMobBanner'; // Temporalmente desactivado para debug Android
// import { useInterstitialAd } from './components/AdMobInterstitial';
import { Capacitor } from '@capacitor/core';
import { analyticsEvents, trackPageView } from './utils/analytics';
import StructuredData from './components/StructuredData';
import PWAInstall from './components/PWAInstall';
import PWADebug from './components/PWADebug';
import { useSwipe } from './hooks/useSwipe';

const APP_STORE_URL = 'https://apps.apple.com/es/app/finanzasfacil/id6754602748';

// Helper para determinar el modo inicial según URL
function getInitialMode() {
  const defaultMode: AppMode = Capacitor.getPlatform() === 'web' ? 'landing' : 'gastos';

  if (typeof window === 'undefined') {
    return defaultMode;
  }

  type ModeParam =
    | 'autonomos'
    | 'hipoteca'
    | 'salario'
    | 'millonario'
    | 'gastos'
    | 'presupuesto-estudiante'
    | 'landing'
    | 'landing-irpf'
    | 'landing-cuota'
    | 'landing-gastos';

  const mapTokenToMode = (token: string | null): AppMode | null => {
    const value = token as ModeParam | null;
    switch (value) {
      case 'autonomos':
        return 'autonomos';
      case 'hipoteca':
        return 'hipoteca';
      case 'salario':
        return 'salario';
      case 'millonario':
        return 'tiktok-millonario';
      case 'gastos':
        return 'gastos';
      case 'presupuesto-estudiante':
        return 'presupuesto-estudiante';
      case 'landing':
        return 'landing';
      case 'landing-irpf':
        return 'landing-irpf';
      case 'landing-cuota':
        return 'landing-cuota';
      case 'landing-gastos':
        return 'landing-gastos';
      default:
        return null;
    }
  };

  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  // 1) Prioridad al parámetro ?mode=...
  const modeFromQuery = mapTokenToMode(searchParams.get('mode'));
  if (modeFromQuery) {
    return modeFromQuery;
  }

  // 2) Mapear paths SEO a modos internos
  switch (path) {
    case '/autonomos':
    case '/calculadora-autonomos':
    case '/calculadora-irpf-autonomos':
      return 'autonomos';
    case '/calculadora-hipoteca':
    case '/hipoteca':
      return 'hipoteca';
    case '/calculadora-salario-neto':
    case '/salario':
      return 'salario';
    case '/cuando-sere-millonario':
    case '/millonario':
      return 'tiktok-millonario';
    case '/control-gastos':
    case '/gastos':
      return 'gastos';
    case '/calculadora-presupuesto-estudiante-universitario':
    case '/presupuesto-estudiante':
      return 'presupuesto-estudiante';
    case '/irpf-autonomos':
    case '/guia-irpf-autonomos-2025':
      return 'landing-irpf';
    case '/cuota-autonomos':
      return 'landing-cuota';
    case '/gastos-deducibles-autonomos':
      return 'landing-gastos';
    default:
      return defaultMode;
  }
}

type AppMode =
  | 'landing'
  | 'gastos'
  | 'tiktok-millonario'
  | 'salario'
  | 'hipoteca'
  | 'presupuesto-estudiante'
  | 'privacy'
  | 'terms'
  | 'about'
  | 'contact'
  | 'content-hub'
  | 'faq'
  | 'resources'
  | 'autonomos'
  | 'producto-gastos'
  | 'producto-curso-finanzas'
  | 'donate'
  | 'landing-irpf'
  | 'landing-cuota'
  | 'landing-gastos'
  | 'social';
function AppContent() {
  // Estado inicial: detectar modo a partir de URL (pathname / ?mode=)
  // Esto permite que URLs como /autonomos o /calculadora-hipoteca carguen directamente la herramienta correcta
  const [mode, setMode] = useState<AppMode>(() => getInitialMode());
  usePageMeta(mode);
  const [calmIncome, setCalmIncome] = useState(1500);
  const [calmExpenses, setCalmExpenses] = useState(980);
  const [calmSavings, setCalmSavings] = useState(150);
  const calmMoney = Math.max(0, calmIncome - calmExpenses - calmSavings);
  const calmDeficit = Math.max(0, calmExpenses + calmSavings - calmIncome);
  const calmExpensePercent = Math.min(100, Math.round((calmExpenses / Math.max(calmIncome, 1)) * 100));
  const calmSavingsPercent = Math.min(100, Math.round((calmSavings / Math.max(calmIncome, 1)) * 100));
  const calmMoneyPercent = Math.min(100, Math.round((calmMoney / Math.max(calmIncome, 1)) * 100));
  const formatEuros = (value: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  const trackCalmSimulatorAdjustment = (field: string) => {
    analyticsEvents.calmSimulatorAdjusted(field, calmDeficit > 0 ? -calmDeficit : calmMoney);
  };
  
  // Hook para manejar anuncios interstitial
  // const { showOnNavigation } = useInterstitialAd();

  // Función helper para cambiar modo con posible anuncio interstitial (para uso futuro)
  // const handleModeChange = async (newMode: string, currentMode: string = mode) => {
  //   // Mostrar anuncio interstitial ocasionalmente al navegar
  //   await showOnNavigation(currentMode, newMode);
  //   setMode(newMode as any);
  // };

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

  // Effect para inicializar la app y manejar cambios de modo
  useEffect(() => {
    const initializeApp = async () => {
      console.log('App initialized on platform:', Capacitor.getPlatform());
      
      if (Capacitor.getPlatform() !== 'web') {
        console.log('Native platform detected - using non-personalized ads by default');
      } else {
        console.log('Web platform detected - mobile ads are disabled');
      }
    };

    initializeApp();

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
      case 'presupuesto-estudiante':
        trackPageView('/presupuesto-estudiante', 'Calculadora Presupuesto Estudiante');
        break;
      case 'landing':
        trackPageView('/', 'Finanzas Fáciles - Landing');
        break;
    }
  }, [mode]);

  if (mode === 'gastos') {
    return (
      <Suspense fallback={<RouteLoading />}>
        <ExpenseControlApp
          onBack={() => {
            setMode('landing');
            trackPageView('/', 'Landing Page');
          }}
        />
      </Suspense>
    );
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
            url: "https://finanzasmuyfacil.com/autonomos"
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
        <Suspense fallback={<RouteLoading />}>
          <AutonomosCalculator onBack={() => setMode('landing')} />
        </Suspense>
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
            url: "https://finanzasmuyfacil.com/cuando-ser-millonario",
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
        <Suspense fallback={<RouteLoading />}>
          <TikTokMillionaireCalculator onBack={() => setMode('landing')} />
        </Suspense>
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
            url: "https://finanzasmuyfacil.com/calculadora-salario-neto",
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
        <Suspense fallback={<RouteLoading />}>
          <SalaryCalculator />
        </Suspense>
      </div>
    );
  }

  if (mode === 'presupuesto-estudiante') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Structured Data para Calculadora Presupuesto Estudiante */}
        <StructuredData
          type="Calculator"
          data={{
            name: "Calculadora Presupuesto Estudiante Universitario 2025",
            description: "Calculadora gratuita para gestionar el presupuesto universitario con la regla 50/30/20. Calcula gastos, ahorro y proyecciones para estudiantes.",
            url: "https://finanzasmuyfacil.com/calculadora-presupuesto-estudiante-universitario",
            features: [
              "Regla 50/30/20",
              "Cálculo por ciudad",
              "Gráficos interactivos",
              "Proyecciones a 4 años",
              "Descarga PDF"
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
        <Suspense fallback={<RouteLoading />}>
          <PresupuestoEstudianteCalculator onBack={() => setMode('landing')} />
        </Suspense>
      </div>
    );
  }

  if (mode === 'hipoteca') {
    return (
      <div className="min-h-screen">
        {/* Structured Data para Calculadora Hipoteca */}
        <StructuredData 
          type="Calculator" 
          data={{
            name: "Calculadora de Hipoteca Gratuita 2025 - Simula tu Hipoteca",
            description: "Calculadora de hipoteca gratuita 2025. Calcula tu cuota mensual, intereses totales, gastos adicionales y viabilidad de operación. Compara hipotecas fijas, variables y mixtas.",
            url: "https://finanzasmuyfacil.com/calculadora-hipoteca",
            features: [
              "Cálculo de cuota mensual",
              "Análisis de viabilidad bancaria",
              "Gastos adicionales (comunidad, IBI, seguros)",
              "Comparador de tipos de hipoteca",
              "Capacidad de endeudamiento",
              "Recomendaciones personalizadas"
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
        <Suspense fallback={<RouteLoading />}>
          <HipotecaCalculator />
        </Suspense>
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

  if (mode === 'content-hub') {
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
        <ContentHub />
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

  if (mode === 'producto-curso-finanzas') {
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
        <ProductoCursoFinanzas />
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

  if (mode === 'landing-irpf') {
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
        <LandingIRPF />
      </div>
    );
  }

  if (mode === 'landing-cuota') {
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
        <LandingCuota />
      </div>
    );
  }

  if (mode === 'landing-gastos') {
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
        <LandingGastos />
      </div>
    );
  }

  if (mode === 'social') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-colors shadow-lg touch-manipulation"
            style={{ zIndex: 9999 }}
          >
            ← Volver
          </button>
        </div>
        <div className="max-w-2xl mx-auto pt-20">
          <SocialLinks />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={swipeRef}
      className="min-h-screen bg-[#f5f5f7] text-slate-950"
    >
      {/* Structured Data para Landing Page */}
      <StructuredData 
        type="WebSite" 
        data={{
          name: "FinanzasFácil — Calculadoras y guías en España",
          description: "Calculadoras gratuitas (autónomos, salario neto, hipoteca, presupuesto) y artículos editoriales sobre fiscalidad y finanzas personales. Contenido educativo en español.",
          url: "https://finanzasmuyfacil.com"
        }} 
      />

      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 text-sm">
          <a href="/" className="flex items-center gap-2 font-semibold text-slate-950" aria-label="Finanzas Muy Fácil inicio">
            <img
              src="/logos/logo-icono.png"
              alt=""
              className="h-6 w-6 rounded-md object-cover"
            />
            <span>Finanzas Muy Fácil</span>
          </a>
          <div className="hidden items-center gap-6 text-slate-700 md:flex">
            <a href="#herramientas" className="hover:text-slate-950">Herramientas</a>
            <a href="/metodo-dinero-tranquilo.html" className="hover:text-slate-950">Método</a>
            <a href="#guias-rapidas" className="hover:text-slate-950">Guías</a>
            <a href="/app-ios.html" className="hover:text-slate-950">App iOS</a>
            <a href="/blog.html" className="hover:text-slate-950">Blog</a>
          </div>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Descargar
          </a>
        </nav>
      </header>

      <section className="overflow-hidden bg-[#f5f5f7] px-4 pb-16 pt-14 text-center md:pb-24 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-semibold text-blue-600">Ya disponible para iPhone y iPad</p>
          <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-slate-950 md:text-7xl">
            Finanzas fáciles. Decisiones más tranquilas.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-xl leading-relaxed text-slate-600 md:text-2xl">
            Control de gastos local, calculadoras gratuitas y guías claras para ordenar tu dinero sin bancos, sin Excel y sin registro obligatorio.
          </p>
          <a
            href="/privacidad-sin-bancos.html"
            className="mx-auto mt-5 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-black/10 transition-colors hover:bg-slate-50"
          >
            <span>Sin bancos</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span>Sin registro obligatorio</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span>Tus datos son tuyos</span>
          </a>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => {
                analyticsEvents.navigationToExpenseControl();
                setMode('gastos');
              }}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Probar control de gastos
            </button>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-blue-600 shadow-sm ring-1 ring-black/10 transition-colors hover:bg-slate-50"
            >
              Descargar en App Store
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="relative mx-auto mt-12 max-w-5xl rounded-[34px] bg-slate-950 p-3 shadow-2xl ring-1 ring-black/10 md:mt-16">
            <div className="grid items-center gap-8 overflow-hidden rounded-[26px] bg-gradient-to-b from-slate-900 to-black px-5 py-10 text-left md:grid-cols-[0.9fr_1.1fr] md:px-10">
              <div className="text-white">
                <p className="mb-3 text-sm font-semibold text-blue-300">Dinero tranquilo</p>
                <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
                  Tu mes en una sola idea.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/70">
                  Ingresos, gastos, ahorro y margen. La app te muestra lo importante primero y deja los ajustes avanzados para después.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-white/10 p-3">
                    <span className="block text-xs text-white/50">Datos</span>
                    <strong className="text-sm">Locales</strong>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <span className="block text-xs text-white/50">Uso</span>
                    <strong className="text-sm">Sin cuenta</strong>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <span className="block text-xs text-white/50">Copia</span>
                    <strong className="text-sm">Exportable</strong>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/app/control-gastos-dashboard.png"
                  alt="Pantalla de FinanzasFacil con resumen de dinero tranquilo"
                  className="max-h-[560px] w-auto rounded-[32px] shadow-2xl ring-1 ring-white/15"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl text-left text-sm leading-relaxed text-slate-600 md:text-base">
            <p>
              FinanzasFácil publica herramientas de cálculo gratuitas y guías en español sobre autónomos, nómina,
              vivienda y hábitos de ahorro. Las calculadoras sirven para simular escenarios y no sustituyen el criterio
              de un gestor o asesor fiscal.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Lead magnet: plantilla práctica para convertir tráfico en usuarios interesados */}
        <div className="mb-12">
          <LeadMagnet variant="moneyPlan" />
        </div>

        <section
          className="mb-12 rounded-[28px] bg-slate-950 p-6 text-white shadow-sm ring-1 ring-black/5 md:p-8"
          aria-labelledby="plan-title"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold text-blue-300">Método Dinero Tranquilo</p>
              <h2 id="plan-title" className="text-3xl font-semibold leading-tight tracking-normal md:text-5xl">
                Tu plan financiero en 3 pasos, sin tecnicismos.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                Primero haces una foto del mes, luego calculas cuánto puedes gastar con calma y después eliges
                un reto pequeño para esta semana.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/metodo-dinero-tranquilo.html"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
                >
                  Ver método
                </a>
                <a
                  href="/privacidad-sin-bancos.html"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
                >
                  Por qué no conectamos bancos
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <a href="/test-salud-financiera.html" className="rounded-2xl bg-white/10 p-5 transition-colors hover:bg-white/15">
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-black">1</span>
                <strong className="block text-lg">Test</strong>
                <span className="mt-2 block text-sm text-white/65">Qué mirar primero: gastos, ahorro, deuda, vivienda o autónomos.</span>
              </a>
              <a href="/cuanto-puedo-gastar-al-mes.html" className="rounded-2xl bg-white/10 p-5 transition-colors hover:bg-white/15">
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-black">2</span>
                <strong className="block text-lg">Margen</strong>
                <span className="mt-2 block text-sm text-white/65">Calcula tu dinero tranquilo mensual y semanal.</span>
              </a>
              <a href="/gastos-hormiga.html" className="rounded-2xl bg-white/10 p-5 transition-colors hover:bg-white/15">
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-black">3</span>
                <strong className="block text-lg">Reto</strong>
                <span className="mt-2 block text-sm text-white/65">Elige una acción pequeña que puedas cumplir esta semana.</span>
              </a>
            </div>
          </div>
        </section>

        <section
          id="guias-rapidas"
          className="mb-12 bg-white text-slate-950 rounded-2xl p-5 md:p-7 shadow-2xl"
          aria-labelledby="quick-guides-title"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-5">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-blue-700 mb-2">
                Guías rápidas
              </p>
              <h2 id="quick-guides-title" className="text-2xl md:text-3xl font-black tracking-normal">
                Blog y guías para empezar sin perderte
              </h2>
              <p className="text-slate-600 mt-2 max-w-3xl">
                Si no quieres calcular nada todavía, empieza por una lectura práctica: ahorrar, ordenar gastos,
                aplicar la regla 50/30/20 o revisar temas fiscales para autónomos.
              </p>
            </div>
            <a
              href="/blog.html"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-black px-5 py-3 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Ver blog completo
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <a
              href="/cuanto-puedo-gastar-al-mes.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-blue-700 mb-2">
                Dinero tranquilo
              </span>
              <strong className="block text-lg mb-1">Cuánto puedo gastar</strong>
              <span className="text-sm text-slate-600">Calcula tu margen mensual y semanal sin usar Excel.</span>
            </a>
            <a
              href="/control-gastos-sin-excel.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-cyan-700 mb-2">
                App y método
              </span>
              <strong className="block text-lg mb-1">Control sin Excel</strong>
              <span className="text-sm text-slate-600">Checklist simple para empezar sin hojas complicadas.</span>
            </a>
            <a
              href="/como-ahorrar-dinero-cada-mes.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-emerald-700 mb-2">
                Ahorro mensual
              </span>
              <strong className="block text-lg mb-1">Ahorrar sin agobio</strong>
              <span className="text-sm text-slate-600">Calcula margen y elige una fuga pequeña para empezar.</span>
            </a>
            <a
              href="/calculadora-fondo-emergencia.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-teal-300 hover:bg-teal-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-teal-700 mb-2">
                Colchón
              </span>
              <strong className="block text-lg mb-1">Fondo de emergencia</strong>
              <span className="text-sm text-slate-600">Calcula cuánto guardar para imprevistos sin agobio.</span>
            </a>
            <a
              href="/test-salud-financiera.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-violet-300 hover:bg-violet-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-violet-700 mb-2">
                Primer paso
              </span>
              <strong className="block text-lg mb-1">Test financiero</strong>
              <span className="text-sm text-slate-600">Descubre qué deberías mirar primero en 2 minutos.</span>
            </a>
            <a
              href="/nivel-endeudamiento-calculadora.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-rose-300 hover:bg-rose-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-rose-700 mb-2">
                Deuda y cuotas
              </span>
              <strong className="block text-lg mb-1">Nivel de deuda</strong>
              <span className="text-sm text-slate-600">Comprueba si tus cuotas mensuales pesan demasiado.</span>
            </a>
            <a
              href="/que-deuda-pagar-primero.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-orange-700 mb-2">
                Prioridades
              </span>
              <strong className="block text-lg mb-1">Qué deuda pagar</strong>
              <span className="text-sm text-slate-600">Ordena tarjetas, préstamos y compras aplazadas.</span>
            </a>
            <a
              href="/metodo-dinero-tranquilo.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-indigo-700 mb-2">
                Método
              </span>
              <strong className="block text-lg mb-1">Dinero Tranquilo</strong>
              <span className="text-sm text-slate-600">La fórmula sencilla para saber cuánto puedes gastar.</span>
            </a>
            <a
              href="/privacidad-sin-bancos.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-slate-700 mb-2">
                Privacidad
              </span>
              <strong className="block text-lg mb-1">Sin conectar bancos</strong>
              <span className="text-sm text-slate-600">Por qué FinanzasFacil empieza con datos locales.</span>
            </a>
            <a
              href="/guia-fiscal-autonomos-espana-2026.html"
              className="rounded-xl border border-slate-200 p-4 hover:border-amber-300 hover:bg-amber-50 transition-colors"
            >
              <span className="block text-xs font-black uppercase tracking-wide text-amber-700 mb-2">
                Autónomos
              </span>
              <strong className="block text-lg mb-1">Guía fiscal 2026</strong>
              <span className="text-sm text-slate-600">Alta, gastos deducibles, IRPF y obligaciones habituales.</span>
            </a>
          </div>
        </section>

        <section id="herramientas" className="mb-12 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-blue-600 font-semibold text-sm mb-2">
              Empieza por tu situación
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-950 mb-3 tracking-normal">
              Elige la herramienta que necesitas hoy
            </h2>
            <p className="text-slate-600 text-lg">
              Menos menú y más camino directo: calcula, compara o lleva tus gastos al móvil.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <button
              onClick={() => setMode('autonomos')}
              className="group text-left rounded-3xl bg-[#f5f5f7] p-5 transition-colors hover:bg-slate-100"
            >
              <Briefcase className="mb-5 h-7 w-7 text-slate-500 group-hover:text-blue-600" aria-hidden="true" />
              <span className="block text-slate-950 font-semibold text-xl mb-2">Soy autónomo</span>
              <span className="text-slate-600">Estima cuota, IRPF, gastos deducibles y pagos trimestrales.</span>
            </button>
            <button
              onClick={() => setMode('salario')}
              className="group text-left rounded-3xl bg-[#f5f5f7] p-5 transition-colors hover:bg-slate-100"
            >
              <WalletCards className="mb-5 h-7 w-7 text-slate-500 group-hover:text-blue-600" aria-hidden="true" />
              <span className="block text-slate-950 font-semibold text-xl mb-2">Tengo nómina</span>
              <span className="text-slate-600">Pasa de bruto a neto y entiende tus retenciones.</span>
            </button>
            <button
              onClick={() => setMode('hipoteca')}
              className="group text-left rounded-3xl bg-[#f5f5f7] p-5 transition-colors hover:bg-slate-100"
            >
              <Home className="mb-5 h-7 w-7 text-slate-500 group-hover:text-blue-600" aria-hidden="true" />
              <span className="block text-slate-950 font-semibold text-xl mb-2">Estoy mirando vivienda</span>
              <span className="text-slate-600">Simula cuota mensual, intereses y viabilidad orientativa.</span>
            </button>
            <a
              href="/control-gastos-mensual.html"
              className="group text-left rounded-3xl bg-slate-950 p-5 text-white transition-colors hover:bg-black"
            >
              <ShieldCheck className="mb-5 h-7 w-7 text-blue-300" aria-hidden="true" />
              <span className="block font-semibold text-xl mb-2">Quiero controlar gastos</span>
              <span className="text-white/65">Método mensual sencillo y app iOS sin registro obligatorio.</span>
            </a>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* Control de Gastos */}
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
            <div>
              <ShieldCheck className="mb-6 h-9 w-9 text-blue-600" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-950 mb-3">Control de Gastos Personal</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                App gratuita para gestionar gastos diarios, categorizar compras y controlar tu presupuesto mensual. Ideal para ahorrar dinero y mejorar tus finanzas personales.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => {
                    analyticsEvents.navigationToExpenseControl();
                    setMode('gastos');
                  }}
                  className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Empezar ahora
                </button>
                <a
                  href="/control-gastos-mensual.html"
                  className="rounded-full bg-[#f5f5f7] px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
                >
                  Ver método
                </a>
              </div>
            </div>
          </div>

          {/* TikTok Millonario */}
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
            <div>
              <Landmark className="mb-6 h-9 w-9 text-blue-600" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-950 mb-3">¿Cuándo seré millonario?</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Calculadora de libertad financiera para saber cuándo serás millonario. Calcula con interés compuesto cuánto necesitas ahorrar para alcanzar 1 millón de euros.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('millionaire');
                  setMode('tiktok-millonario');
                }}
                className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Calcular
              </button>
            </div>
          </div>

          {/* Calculadora Salario */}
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
            <div>
              <WalletCards className="mb-6 h-9 w-9 text-blue-600" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-950 mb-3">Calculadora Salario Neto 2025</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Calculadora gratuita para convertir sueldo bruto a neto en España 2025. Calcula IRPF, Seguridad Social y descubre cuánto recibirás realmente en tu nómina.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('salary');
                  setMode('salario');
                }}
                className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Calcular Salario
              </button>
            </div>
          </div>

          {/* Calculadora Hipoteca */}
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
            <div>
              <Home className="mb-6 h-9 w-9 text-blue-600" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-950 mb-3">Calculadora de Hipoteca</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Calcula tu cuota mensual de hipoteca, intereses totales y tabla de amortización. Compara hipotecas fijas, variables y mixtas para tomar la mejor decisión.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('hipoteca');
                  setMode('hipoteca');
                }}
                className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Calcular Hipoteca
              </button>
            </div>
          </div>

          {/* Calculadora Autónomos */}
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
            <div>
              <Briefcase className="mb-6 h-9 w-9 text-blue-600" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-950 mb-3">Calculadora de Autónomos</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Calcula IRPF, cuota de Seguridad Social y gastos deducibles. Incluye bonificaciones por comunidad autónoma para autónomos nuevos.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('autonomos');
                  setMode('autonomos');
                }}
                className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Calcular Impuestos
              </button>
            </div>
          </div>

          {/* Calculadora Presupuesto Estudiante */}
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
            <div>
              <GraduationCap className="mb-6 h-9 w-9 text-blue-600" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-950 mb-3">Presupuesto Estudiante</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Calculadora gratuita para gestionar el presupuesto universitario con la regla 50/30/20. Calcula gastos por ciudad, tipo de alojamiento, alimentación y transporte.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('presupuesto-estudiante');
                  setMode('presupuesto-estudiante');
                }}
                className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Calcular Presupuesto
              </button>
            </div>
          </div>
        </div>

        <section className="mt-16 bg-slate-950 text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-6 md:p-10 lg:p-12 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
              <p className="text-emerald-200 font-bold uppercase tracking-wide text-sm mb-3">
                Prueba rápida
              </p>
              <h3 className="text-3xl md:text-5xl font-black leading-tight mb-5">
                Calcula tu dinero tranquilo en 20 segundos
              </h3>
              <p className="text-white/78 text-lg leading-relaxed mb-7">
                Mueve los importes y mira qué margen queda después de gastos y ahorro. No es un diagnóstico
                financiero: es una foto sencilla para decidir con más calma.
              </p>
              <div className="bg-white/10 border border-white/15 rounded-xl p-5">
                <p className="text-white/70 text-sm mb-2">Resultado orientativo</p>
                <div className="flex items-end gap-3">
                  <strong className={`text-5xl md:text-6xl font-black ${calmDeficit > 0 ? 'text-red-300' : 'text-emerald-200'}`}>
                    {calmDeficit > 0 ? `-${formatEuros(calmDeficit)}` : formatEuros(calmMoney)}
                  </strong>
                </div>
                <p className="text-white/75 mt-3">
                  {calmDeficit > 0
                    ? 'Tu plan queda por encima de tus ingresos. Toca ajustar gastos, ahorro o ambos.'
                    : 'Esto es lo que podrías usar sin romper tu plan del mes.'}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-10 lg:p-12 bg-white text-slate-950">
              <div className="space-y-7">
                <label className="block">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-black text-lg">Ingresos mensuales</span>
                    <span className="font-black text-blue-700">{formatEuros(calmIncome)}</span>
                  </div>
	                  <input
	                    type="range"
	                    min="600"
	                    max="5000"
	                    step="50"
	                    value={calmIncome}
	                    onChange={(event) => setCalmIncome(Number(event.target.value))}
	                    onPointerUp={() => trackCalmSimulatorAdjustment('income')}
	                    onKeyUp={() => trackCalmSimulatorAdjustment('income')}
	                    onBlur={() => trackCalmSimulatorAdjustment('income')}
	                    className="w-full accent-blue-700"
	                    aria-label="Ingresos mensuales"
	                  />
                </label>

                <label className="block">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-black text-lg">Gastos del mes</span>
                    <span className="font-black text-rose-600">{formatEuros(calmExpenses)}</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="4500"
	                    step="50"
	                    value={calmExpenses}
	                    onChange={(event) => setCalmExpenses(Number(event.target.value))}
	                    onPointerUp={() => trackCalmSimulatorAdjustment('expenses')}
	                    onKeyUp={() => trackCalmSimulatorAdjustment('expenses')}
	                    onBlur={() => trackCalmSimulatorAdjustment('expenses')}
	                    className="w-full accent-rose-600"
	                    aria-label="Gastos del mes"
	                  />
                </label>

                <label className="block">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-black text-lg">Ahorro reservado</span>
                    <span className="font-black text-emerald-700">{formatEuros(calmSavings)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
	                    step="25"
	                    value={calmSavings}
	                    onChange={(event) => setCalmSavings(Number(event.target.value))}
	                    onPointerUp={() => trackCalmSimulatorAdjustment('savings')}
	                    onKeyUp={() => trackCalmSimulatorAdjustment('savings')}
	                    onBlur={() => trackCalmSimulatorAdjustment('savings')}
	                    className="w-full accent-emerald-700"
	                    aria-label="Ahorro reservado"
	                  />
                </label>

                <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
                  <div className="flex h-5 overflow-hidden rounded-full bg-slate-200 mb-4" aria-hidden="true">
                    <div className="bg-rose-500 transition-all duration-300" style={{ width: `${calmExpensePercent}%` }} />
                    <div className="bg-emerald-500 transition-all duration-300" style={{ width: `${calmSavingsPercent}%` }} />
                    <div className="bg-blue-500 transition-all duration-300" style={{ width: `${calmMoneyPercent}%` }} />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="block text-slate-500">Gastos</span>
                      <strong className="text-rose-600">{calmExpensePercent}%</strong>
                    </div>
                    <div>
                      <span className="block text-slate-500">Ahorro</span>
                      <strong className="text-emerald-700">{calmSavingsPercent}%</strong>
                    </div>
                    <div>
                      <span className="block text-slate-500">Margen</span>
                      <strong className="text-blue-700">{calmMoneyPercent}%</strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
	                  <a
	                    href="/control-gastos-mensual.html"
	                    onClick={() => analyticsEvents.calmSimulatorMethodClick(calmDeficit > 0 ? -calmDeficit : calmMoney)}
	                    className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-4 text-white font-black hover:bg-blue-800 transition-colors"
	                  >
                    Aprender el método
                  </a>
	                  <button
	                    onClick={() => {
	                      analyticsEvents.calmSimulatorWebAppClick(calmDeficit > 0 ? -calmDeficit : calmMoney);
	                      analyticsEvents.navigationToExpenseControl();
	                      setMode('gastos');
	                    }}
	                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-4 text-slate-950 font-black hover:bg-slate-100 transition-colors"
	                  >
                    Probar en la web
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[32px] bg-white text-slate-950 shadow-sm ring-1 ring-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 items-stretch">
            <div className="p-6 md:p-10 lg:p-12">
              <p className="text-blue-600 font-semibold text-sm mb-3">
                Nueva guía práctica
              </p>
              <h3 className="text-3xl md:text-5xl font-semibold leading-tight tracking-normal mb-5">
                Control de gastos mensual, explicado para empezar hoy
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed max-w-3xl mb-6">
                Hemos preparado un método sencillo para ordenar ingresos, gastos fijos, variables, ahorro y margen
                disponible. Está pensado para personas que quieren claridad sin convertir sus finanzas en una hoja
                interminable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
                <div className="rounded-2xl bg-[#f5f5f7] p-4">
                  <strong className="block text-slate-950 mb-1">5 pasos</strong>
                  <span className="text-slate-600 text-sm">Una revisión mensual fácil de repetir.</span>
                </div>
                <div className="rounded-2xl bg-[#f5f5f7] p-4">
                  <strong className="block text-slate-950 mb-1">App iOS</strong>
                  <span className="text-slate-600 text-sm">Disponible para iPhone y iPad.</span>
                </div>
                <div className="rounded-2xl bg-[#f5f5f7] p-4">
                  <strong className="block text-slate-950 mb-1">Sin registro</strong>
                  <span className="text-slate-600 text-sm">Datos guardados en el dispositivo.</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/control-gastos-mensual.html"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Leer método mensual
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#f5f5f7] px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
                >
                  Descargar app iOS
                </a>
              </div>
            </div>
            <div className="bg-[#f5f5f7] p-6 flex items-center justify-center">
              <img
                src="/app/control-gastos-dashboard.png"
                alt="Pantalla de FinanzasFacil con resumen de dinero tranquilo"
                className="max-h-[520px] w-auto rounded-[28px] shadow-2xl border border-slate-200"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[32px] bg-slate-950 text-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0 items-stretch">
            <div>
              <div className="p-6 md:p-10 lg:p-12">
                <p className="text-blue-300 font-semibold text-sm mb-3">
                  App iOS publicada
                </p>
                <h3 className="text-3xl md:text-5xl font-semibold leading-tight tracking-normal mb-5">
                  Lleva tu dinero tranquilo en el bolsillo.
                </h3>
                <p className="text-white/72 text-lg leading-relaxed max-w-3xl">
                  La web sigue siendo el centro de calculadoras y guías. La app de iOS añade una experiencia más cómoda
                  para el día a día: registrar gastos, revisar tu margen semanal y exportar tus datos sin crear cuenta.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
                  <div className="rounded-2xl bg-white/10 p-4 text-white/78">
                    <ShieldCheck className="h-6 w-6 text-blue-300 mb-3" aria-hidden="true" />
                    <strong className="block text-white">Privado por defecto</strong>
                    Datos guardados en el dispositivo.
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 text-white/78">
                    <Smartphone className="h-6 w-6 text-blue-300 mb-3" aria-hidden="true" />
                    <strong className="block text-white">Para iPhone y iPad</strong>
                    Publicada oficialmente en App Store.
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 text-white/78">
                    <ExternalLink className="h-6 w-6 text-blue-300 mb-3" aria-hidden="true" />
                    <strong className="block text-white">Web abierta</strong>
                    Calculadoras y guías sin instalar nada.
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Descargar en App Store
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    onClick={() => setMode('gastos')}
                    className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Probar en la web
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-center bg-gradient-to-b from-slate-900 to-black px-6 pt-8">
              <img
                src="/app/control-gastos-dashboard.png"
                alt="Vista de la app iOS FinanzasFacil"
                className="max-h-[520px] w-auto rounded-t-[34px] shadow-2xl ring-1 ring-white/15"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* YouTube Videos Slider */}
        <div className="mt-16">
          <YouTubeVideosSlider maxVideos={6} />
        </div>

        <LandingEditorialSection />

        <section className="mt-16 rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold text-blue-600">Confianza y claridad</p>
            <h3 className="text-3xl font-semibold tracking-normal text-slate-950 md:text-5xl">
              Diseñada para no abrumarte.
            </h3>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#f5f5f7] p-6">
              <Calculator className="mb-5 h-8 w-8 text-blue-600" aria-hidden="true" />
              <h4 className="mb-2 text-xl font-semibold text-slate-950">Cálculos claros</h4>
              <p className="text-slate-600">Herramientas directas para salario neto, hipoteca, autónomos y presupuesto.</p>
            </div>
            <div className="rounded-3xl bg-[#f5f5f7] p-6">
              <ShieldCheck className="mb-5 h-8 w-8 text-blue-600" aria-hidden="true" />
              <h4 className="mb-2 text-xl font-semibold text-slate-950">Datos bajo tu control</h4>
              <p className="text-slate-600">El control de gastos funciona sin registro obligatorio y permite exportar tus datos.</p>
            </div>
            <div className="rounded-3xl bg-[#f5f5f7] p-6">
              <BookOpen className="mb-5 h-8 w-8 text-blue-600" aria-hidden="true" />
              <h4 className="mb-2 text-xl font-semibold text-slate-950">Contexto antes de decidir</h4>
              <p className="text-slate-600">Guías prácticas para entender el resultado antes de tomar decisiones reales.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-10">
          <h3 className="mb-8 text-center text-3xl font-semibold tracking-normal text-slate-950 md:text-5xl">
            Preguntas frecuentes
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[#f5f5f7] p-6">
              <h4 className="mb-3 text-xl font-semibold text-slate-950">¿Cómo calcular mi salario neto 2025?</h4>
              <p className="text-slate-600">La calculadora convierte sueldo bruto a neto considerando IRPF, Seguridad Social y deducciones habituales en España.</p>
            </div>
            <div className="rounded-3xl bg-[#f5f5f7] p-6">
              <h4 className="mb-3 text-xl font-semibold text-slate-950">¿Es gratis usar las calculadoras?</h4>
              <p className="text-slate-600">Sí. Las herramientas principales son gratuitas y no necesitas registrarte para usarlas.</p>
            </div>
            <div className="rounded-3xl bg-[#f5f5f7] p-6">
              <h4 className="mb-3 text-xl font-semibold text-slate-950">¿Cómo controlar mis gastos?</h4>
              <p className="text-slate-600">Empieza apuntando pocos gastos reales. La app ordena categorías, margen semanal y dinero tranquilo.</p>
            </div>
            <div className="rounded-3xl bg-[#f5f5f7] p-6">
              <h4 className="mb-3 text-xl font-semibold text-slate-950">¿FinanzasFacil tiene app para iPhone?</h4>
              <p className="text-slate-600">Sí. Está publicada en App Store para iPhone y iPad, con datos locales y exportación.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[32px] bg-slate-950 p-6 text-white md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold text-blue-300">Blog y recursos</p>
            <h3 className="text-3xl font-semibold tracking-normal md:text-5xl">
              Guías para autónomos, nómina, ahorro y vivienda.
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Artículos largos en HTML, pensados para Search Console, usuarios nuevos y contexto antes de usar las calculadoras.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/blog.html"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
              >
                Ver blog
              </a>
              <button
                onClick={() => setMode('content-hub')}
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
              >
                Hub de contenido
              </button>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-10">
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-semibold text-blue-600">LIPA Studios</p>
            <h3 className="text-3xl font-semibold tracking-normal text-slate-950 md:text-5xl">
              Más proyectos del estudio.
            </h3>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            <a
              href="https://entrenoapp.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-3xl bg-[#f5f5f7] p-6 transition-colors hover:bg-slate-100"
            >
              <h4 className="mb-2 text-xl font-semibold text-slate-950">EntrenoApp</h4>
              <p className="mb-4 text-sm text-slate-600">Entrenamiento, GPS tracking y rutinas personales.</p>
              <span className="text-sm font-semibold text-blue-600">Ver app</span>
            </a>

            <a
              href="https://lipastudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-3xl bg-[#f5f5f7] p-6 transition-colors hover:bg-slate-100"
            >
              <h4 className="mb-2 text-xl font-semibold text-slate-950">LIPA Studios</h4>
              <p className="mb-4 text-sm text-slate-600">Juegos, apps y productos digitales propios.</p>
              <span className="text-sm font-semibold text-blue-600">Ver estudio</span>
            </a>

            <a
              href="https://finanzasmuyfacil.com"
              className="rounded-3xl bg-slate-950 p-6 text-white transition-colors hover:bg-black"
            >
              <h4 className="mb-2 text-xl font-semibold">Finanzas Muy Fácil</h4>
              <p className="mb-4 text-sm text-white/65">Calculadoras, guías y app iOS para ordenar el dinero.</p>
              <span className="text-sm font-semibold text-blue-300">Inicio</span>
            </a>
          </div>
        </section>

        <footer className="mt-16 border-t border-slate-200 pt-8 text-center">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-slate-600">
            <a href="/blog.html" className="hover:text-slate-950">Blog</a>
            <a href="/metodo-dinero-tranquilo.html" className="hover:text-slate-950">Método</a>
            <a href="/privacidad-sin-bancos.html" className="hover:text-slate-950">Sin bancos</a>
            <a href="#guias-rapidas" className="hover:text-slate-950">Guías rápidas</a>
            <button onClick={() => setMode('content-hub')} className="hover:text-slate-950">Hub de Contenido</button>
            <button onClick={() => setMode('resources')} className="hover:text-slate-950">Recursos</button>
            <button onClick={() => setMode('faq')} className="hover:text-slate-950">FAQ</button>
            <button onClick={() => setMode('about')} className="hover:text-slate-950">Sobre nosotros</button>
            <button onClick={() => setMode('contact')} className="hover:text-slate-950">Contacto</button>
            <a href="/app-ios.html" className="hover:text-slate-950">App iOS</a>
            <button onClick={() => setMode('privacy')} className="hover:text-slate-950">Privacidad</button>
            <button onClick={() => setMode('terms')} className="hover:text-slate-950">Términos</button>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            © 2025 FinanzasFácil - LIPA Studios. Todos los derechos reservados.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-xs leading-relaxed text-slate-500">
            <strong>Aviso legal:</strong> FinanzasFácil proporciona herramientas de cálculo y contenido educativo con fines informativos.
            Los cálculos pueden no reflejar situaciones individuales específicas. Para asesoramiento personalizado, consulta con un profesional cualificado.
          </p>
        </footer>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstall />
      
      {/* PWA Debug Info */}
      <PWADebug />
      
      {/* AdMob Banner - TEMPORALMENTE DESACTIVADO PARA DEBUG ANDROID */}
      {/* <AdMobBanner position="bottom" size="adaptive" /> */}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
