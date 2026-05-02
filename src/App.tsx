import { useState, useEffect } from 'react';
import ExpenseControlApp from './components/ExpenseControlApp';
import TikTokMillionaireCalculator from './components/TikTokMillionaireCalculator';
import SalaryCalculator from './components/SalaryCalculator';
import HipotecaCalculator from './components/HipotecaCalculator';
import YouTubeVideosSlider from './components/YouTubeVideosSlider';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import About from './components/About';
import Contact from './components/Contact';
import ContentHub from './components/ContentHub';
import FAQ from './components/FAQ';
import Resources from './components/Resources';
import AutonomosCalculator from './components/AutonomosCalculator';
import PresupuestoEstudianteCalculator from './components/PresupuestoEstudianteCalculator';
import ProductoGastos from './components/ProductoGastos';
import LeadMagnet from './components/LeadMagnet';
import LandingIRPF from './components/LandingIRPF';
import LandingCuota from './components/LandingCuota';
import LandingGastos from './components/LandingGastos';
import ProductoCursoFinanzas from './components/ProductoCursoFinanzas';
import DonationModal from './components/DonationModal';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SocialLinks from './components/SocialLinks';
import ShareApp from './components/ShareApp';
// import { AdMobBanner } from './components/AdMobBanner'; // Temporalmente desactivado para debug Android
// import { useInterstitialAd } from './components/AdMobInterstitial';
// import { requestTrackingPermission, initializeTrackingServices } from './utils/att';
import { Capacitor } from '@capacitor/core';
import { analyticsEvents, trackPageView } from './utils/analytics';
import { BannerAd, InlineAd } from './components/AdSense';
import StructuredData from './components/StructuredData';
import PWAInstall from './components/PWAInstall';
import PWADebug from './components/PWADebug';
import { useSwipe } from './hooks/useSwipe';

// Helper para determinar el modo inicial según URL y usuario
function getInitialMode(hasUser: boolean) {
  const defaultMode: AppMode = hasUser ? 'gastos' : 'landing';

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
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'social';
function AppContent() {
  const { user } = useAuth();
  // Estado inicial: detectar modo a partir de URL (pathname / ?mode=) y usuario
  // Esto permite que URLs como /autonomos o /calculadora-hipoteca carguen directamente la herramienta correcta
  const [mode, setMode] = useState<AppMode>(() => getInitialMode(!!user));
  
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
      
      // Solo inicializar ATT y AdMob en apps móviles (no en web)
      if (Capacitor.getPlatform() !== 'web') {
        try {
          // Importar ATT dinámicamente solo en móviles
          const { requestTrackingPermission, initializeTrackingServices } = await import('./utils/att');
          
          // Solicitar permiso ATT con timeout para evitar bloqueos
          // Usar un pequeño delay para no bloquear el renderizado inicial
          setTimeout(async () => {
            try {
              const attResult = await requestTrackingPermission();
              console.log('ATT Result:', attResult);
              
              // Inicializar servicios de tracking (Firebase Analytics y AdMob)
              await initializeTrackingServices(attResult.canTrack);
            } catch (attError) {
              console.error('Error requesting ATT permission:', attError);
              // Si falla ATT, inicializar con tracking deshabilitado
              await initializeTrackingServices(false);
            }
          }, 500); // Pequeño delay para no bloquear el renderizado
        } catch (error) {
          console.error('Error initializing ATT/AdMob:', error);
          // Continuar aunque falle la inicialización de ATT/AdMob
        }
      } else {
        console.log('Web platform detected - using AdSense instead of AdMob');
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

  // Effect para cambiar a 'gastos' cuando el usuario se autentica desde login/register
  // NO redirigir cuando el usuario navega explícitamente a 'landing' desde el dashboard
  useEffect(() => {
    console.log('[App] User state changed:', user ? `Authenticated: ${user.email}` : 'Not authenticated');
    console.log('[App] Current mode:', mode);
    
    // SOLO redirigir automáticamente si viene de login o register
    // NO redirigir desde 'landing' aunque haya usuario (permite navegación explícita)
    if (user && (mode === 'login' || mode === 'register')) {
      console.log('[App] User authenticated from', mode, ', switching to gastos mode');
      setMode('gastos');
    }
    // Si el modo es 'landing', no hacer nada (permitir que el usuario se quede ahí)
  }, [user, mode]);

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
    // console.log('[App] Rendering ExpenseControlApp component'); // Comentado para reducir logs
    return (
      <ExpenseControlApp 
        onBack={() => {
          setMode('landing');
          trackPageView('/', 'Landing Page');
        }} 
      />
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
        <SalaryCalculator />
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
        <PresupuestoEstudianteCalculator onBack={() => setMode('landing')} />
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
        <HipotecaCalculator />
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

  // Rutas de autenticación
  if (mode === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <Login 
          onNavigateToRegister={() => setMode('register')}
          onNavigateToForgotPassword={() => setMode('forgot-password')}
          onSuccess={() => {
            console.log('[App] Login onSuccess called, user should be authenticated now');
            // No cambiar el modo aquí, el useEffect detectará el cambio de usuario y cambiará automáticamente
          }}
        />
      </div>
    );
  }

  if (mode === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('login')}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <Register 
          onNavigateToLogin={() => setMode('login')}
          onSuccess={() => {
            console.log('[App] Register onSuccess called, user should be authenticated now');
            // No cambiar el modo aquí, el useEffect detectará el cambio de usuario y cambiará automáticamente
          }}
        />
      </div>
    );
  }

  if (mode === 'forgot-password') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500">
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => setMode('login')}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white hover:bg-white/30 transition-colors shadow-lg"
          >
            ← Volver
          </button>
        </div>
        <ForgotPassword onNavigateToLogin={() => setMode('login')} />
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
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      {/* Structured Data para Landing Page */}
      <StructuredData 
        type="WebSite" 
        data={{
          name: "Finanzas Fáciles - Calculadoras Financieras Gratuitas",
          description: "Calculadora de salario neto 2024, calculadora cuándo ser millonario, control de gastos gratis. Herramientas financieras para mejorar tu economía personal.",
          url: "https://finanzasmuyfacil.com"
        }} 
      />
      
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/logos/logo-grafica.svg" 
            alt="FinanzasFácil - Gráfica Positiva" 
            className="h-20 md:h-24"
          />
        </div>
        <p className="text-xl text-white/80 mb-4">Calculadoras Financieras Gratuitas 2025</p>
        <p className="text-lg text-white/70 mb-8">Salario neto, libertad financiera y control de gastos</p>
        
      {/* Botones de Autenticación - OCULTOS temporalmente para aprobación de AdSense */}
      {/* Google AdSense requiere acceso completo al contenido sin barreras de autenticación */}
      {/* <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMode('login')}
          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg"
        >
          🔐 Iniciar Sesión
        </button>
        <button
          onClick={() => setMode('register')}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
        >
          ✨ Registrarse
        </button>
      </div> */}

        {/* Botones Redes Sociales y Compartir */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button
            onClick={() => {
              analyticsEvents.navigationToCalculator('social');
              setMode('social');
            }}
            className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white font-bold px-8 py-4 rounded-2xl hover:from-red-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-300 shadow-2xl transform hover:scale-105 border-2 border-white/30 animate-pulse"
          >
            🎥 ¡Síguenos en YouTube! 🔥
          </button>
          <ShareApp variant="primary" />
        </div>
        
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
              por comunidad autónoma. Si eres autónomo puedes empezar por nuestra{' '}
              <a href="/autonomos" className="underline font-semibold">
                calculadora IRPF autónomos 2025
              </a>{' '}
              o revisar la{' '}
              <a href="/tabla-irpf-autonomos-2022.html" className="underline font-semibold">
                tabla IRPF autónomos 2022
              </a>{' '}
              y la{' '}
              <a href="/tabla-irpf-autonomos-2025.html" className="underline font-semibold">
                tabla IRPF autónomos 2025
              </a>{' '}
              para comparar tramos y retenciones.
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

        {/* Newsletter: arriba para que el formulario sea visible sin bajar toda la página */}
        <div className="mb-12">
          <LeadMagnet />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

          {/* Calculadora Hipoteca */}
          <div className="bg-white/10 backdrop-blur-sm border-4 border-white/30 rounded-3xl p-8 shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="text-center">
              <div className="text-6xl mb-6">🏠</div>
              <h2 className="text-3xl font-bold text-white mb-4">Calculadora de Hipoteca</h2>
              <p className="text-white/90 mb-6 text-lg">
                Calcula tu cuota mensual de hipoteca, intereses totales y tabla de amortización. Compara hipotecas fijas, variables y mixtas para tomar la mejor decisión.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('hipoteca');
                  setMode('hipoteca');
                }}
                className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:from-cyan-600 hover:to-teal-700 transition-all duration-300 shadow-2xl"
              >
                Calcular Hipoteca
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

          {/* Calculadora Presupuesto Estudiante */}
          <div className="bg-white/10 backdrop-blur-sm border-4 border-white/30 rounded-3xl p-8 shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="text-center">
              <div className="text-6xl mb-6">🎓</div>
              <h2 className="text-3xl font-bold text-white mb-4">Presupuesto Estudiante</h2>
              <p className="text-white/90 mb-6 text-lg">
                Calculadora gratuita para gestionar el presupuesto universitario con la regla 50/30/20. Calcula gastos por ciudad, tipo de alojamiento, alimentación y transporte.
              </p>
              <button
                onClick={() => {
                  analyticsEvents.navigationToCalculator('presupuesto-estudiante');
                  setMode('presupuesto-estudiante');
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-2xl"
              >
                Calcular Presupuesto
              </button>
            </div>
          </div>
        </div>

        {/* Inline Ad */}
        <div className="mt-12">
          <InlineAd />
        </div>

        {/* YouTube Videos Slider */}
        <div className="mt-16">
          <YouTubeVideosSlider maxVideos={6} />
        </div>

        {/* Footer con enlaces legales y donaciones */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center flex-wrap gap-4 text-white/70">
              <button 
                onClick={() => setMode('content-hub')}
                className="hover:text-white transition-colors underline"
              >
                Hub de Contenido
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
              {/* Apple no permite donaciones fuera de In-App Purchase */}
              {/* <button
                onClick={() => setMode('donate')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Donar a través de PayPal"
              >
                <span>💖 Donar</span>
              </button> */}
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
                  href="https://finanzasmuyfacil.com" 
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
                <div className="text-2xl font-bold text-white">24+</div>
                <div className="text-sm text-white/80">Artículos</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-white">10</div>
                <div className="text-sm text-white/80">Guías Autónomos 2025</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-white/80">Productos Recomendados</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setMode('content-hub')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📚 Hub de Contenido
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
              href="https://finanzasmuyfacil.com" 
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
      
      {/* AdMob Banner - TEMPORALMENTE DESACTIVADO PARA DEBUG ANDROID */}
      {/* <AdMobBanner position="bottom" size="adaptive" /> */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;