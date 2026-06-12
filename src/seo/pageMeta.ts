/** Metadatos SEO por vista de la SPA (canonical apunta a HTML estático cuando existe). */
export type SeoPageMode =
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

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

const SITE = 'https://finanzasmuyfacil.com';

export function getPageMeta(mode: SeoPageMode): PageMeta {
  switch (mode) {
    case 'autonomos':
      return {
        title: 'Calculadora de autónomos 2026 | IRPF, cuota y gastos deducibles',
        description:
          'Estima IRPF, cuota de Seguridad Social y gastos deducibles como autónomo en España. Resultados orientativos, sin registro.',
        canonical: `${SITE}/calculadora-autonomos.html`,
      };
    case 'hipoteca':
      return {
        title: 'Calculadora de hipoteca 2026 | Cuota mensual y amortización',
        description:
          'Simula la cuota de tu hipoteca, intereses totales y tabla de amortización. Fija, variable o mixta. Gratis y sin registro.',
        canonical: `${SITE}/calculadora-hipoteca-gratis.html`,
      };
    case 'salario':
      return {
        title: 'Calculadora salario neto 2026 | Bruto a neto en España',
        description:
          'Convierte salario bruto a neto con IRPF y Seguridad Social. Por comunidad autónoma y situación personal. Estimación orientativa.',
        canonical: `${SITE}/calcular-salario-neto-2026.html`,
      };
    case 'gastos':
      return {
        title: 'Control de gastos mensual | App y guía sin Excel',
        description:
          'Organiza ingresos, gastos y ahorro con el método dinero tranquilo. Datos en tu dispositivo, sin cuenta obligatoria.',
        canonical: `${SITE}/control-gastos-mensual.html`,
      };
    case 'tiktok-millonario':
      return {
        title: '¿Cuándo seré millonario? | Calculadora de libertad financiera',
        description:
          'Simula cuánto necesitas ahorrar e invertir para alcanzar 1 millón de euros con interés compuesto. Herramienta gratuita.',
        canonical: `${SITE}/calculadoras.html`,
      };
    case 'presupuesto-estudiante':
      return {
        title: 'Presupuesto universitario | Calculadora 50/30/20',
        description:
          'Calcula gastos de estudio por ciudad: alojamiento, comida, transporte y ocio. Regla 50/30/20 adaptada a estudiantes.',
        canonical: `${SITE}/calculadora-presupuesto-estudiante-universitario.html`,
      };
    case 'landing-irpf':
      return {
        title: 'IRPF autónomos 2026 | Guía y calculadora',
        description: 'Cómo calcular el IRPF como autónomo: tramos, retenciones y pagos fraccionados. Guía educativa en español.',
        canonical: `${SITE}/calculadora-irpf-autonomo-2026.html`,
      };
    case 'landing-cuota':
      return {
        title: 'Cuota autónomos 2026 | Tarifa plana y bases de cotización',
        description: 'Cuota de Seguridad Social para autónomos: tarifa plana, bases mínimas y bonificaciones. Guía actualizada.',
        canonical: `${SITE}/cuota-autonomos-2026.html`,
      };
    case 'landing-gastos':
      return {
        title: 'Gastos deducibles autónomos 2026 | Guía práctica',
        description:
          'Qué gastos suelen ser deducibles, cómo documentarlos y errores frecuentes. Contenido educativo; confirma con tu gestoría.',
        canonical: `${SITE}/gastos-deducibles-autonomos-2026.html`,
      };
    case 'about':
      return {
        title: 'Sobre FinanzasFácil | LIPA Studios',
        description: 'Quiénes somos, misión y transparencia editorial del proyecto de calculadoras y guías financieras en España.',
        canonical: `${SITE}/acerca-de.html`,
      };
    case 'contact':
      return {
        title: 'Contacto | FinanzasFácil',
        description: 'Escríbenos para sugerencias, correcciones en calculadoras o colaboraciones.',
        canonical: `${SITE}/contacto.html`,
      };
    case 'privacy':
      return {
        title: 'Política de privacidad | FinanzasFácil',
        description: 'Cómo tratamos datos, cookies y formularios en finanzasmuyfacil.com y la app.',
        canonical: `${SITE}/privacidad.html`,
      };
    case 'terms':
      return {
        title: 'Términos de uso | FinanzasFácil',
        description: 'Condiciones de uso de calculadoras, contenido educativo y app móvil.',
        canonical: `${SITE}/terminos.html`,
      };
    case 'faq':
      return {
        title: 'Preguntas frecuentes | FinanzasFácil',
        description: 'Respuestas sobre calculadoras, autónomos, salario neto, hipoteca y control de gastos.',
        canonical: `${SITE}/`,
      };
    case 'content-hub':
    case 'resources':
    case 'social':
    case 'producto-gastos':
    case 'producto-curso-finanzas':
    case 'donate':
      return {
        title: 'FinanzasFácil | Calculadoras y guías en España',
        description: 'Herramientas gratuitas de finanzas personales y fiscalidad para España.',
        canonical: `${SITE}/`,
      };
  }

  return {
    title: 'FinanzasFácil | Calculadoras, control de gastos y guías en España (2026)',
    description:
      'Calculadoras gratuitas y guías: autónomos, salario neto, hipoteca, presupuesto y dinero tranquilo. App iOS en App Store. Sin registro obligatorio.',
    canonical: `${SITE}/`,
  };
}
