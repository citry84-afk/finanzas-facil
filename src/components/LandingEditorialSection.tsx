/**
 * Bloque editorial visible en la landing para reforzar contenido propio (calidad / AdSense).
 * Enlaces a guías estáticas y a la app; sin cifras de impacto no verificables.
 */
export default function LandingEditorialSection() {
  return (
    <section
      className="mt-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 text-left ring-1 ring-white/15"
      aria-labelledby="editorial-hub-title"
    >
      <h2
        id="editorial-hub-title"
        className="text-2xl md:text-3xl font-bold text-white text-center mb-6"
      >
        Guías y fiscalidad en España (contenido editorial)
      </h2>
      <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8 text-center">
        Además de las calculadoras, publicamos{' '}
        <strong className="text-white">textos largos</strong> con calendario, obligaciones habituales y enlaces a
        fuentes del propio sitio. El objetivo es que entiendas el contexto antes de introducir cifras: las
        herramientas sirven para <em>simular</em>; la normativa y tu gestoría cierran el caso real.
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-3">Guía principal (2026)</h3>
          <p className="text-white/85 text-sm md:text-base leading-relaxed mb-4">
            Calendario fiscal orientativo, alta, facturación, gastos deducibles con criterios prudentes, IRPF,
            Modelo 130 y cómo encajan nuestras calculadoras. Incluye avisos legales y enlaces internos a artículos
            que ya teníamos publicados.
          </p>
          <a
            href="/guia-fiscal-autonomos-espana-2026.html"
            className="inline-flex items-center justify-center w-full md:w-auto px-5 py-3 rounded-xl bg-white text-indigo-900 font-semibold hover:bg-blue-50 transition-colors"
          >
            Abrir guía fiscal autónomos 2026
          </a>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-3">Temas frecuentes (HTML)</h3>
          <ul className="space-y-2 text-white/90 text-sm md:text-base">
            <li>
              <a className="underline font-medium hover:text-white" href="/modelo-130-autonomos-2025.html">
                Modelo 130
              </a>{' '}
              y{' '}
              <a className="underline font-medium hover:text-white" href="/cuando-hacer-modelo-130.html">
                cuándo presentarlo
              </a>
            </li>
            <li>
              <a className="underline font-medium hover:text-white" href="/gastos-deducibles-autonomos-2025.html">
                Gastos deducibles
              </a>{' '}
              ·{' '}
              <a className="underline font-medium hover:text-white" href="/retencion-irpf-autonomos.html">
                Retención IRPF
              </a>
            </li>
            <li>
              <a className="underline font-medium hover:text-white" href="/como-calcular-irpf-autonomos-2025.html">
                Cómo calcular IRPF (guía)
              </a>{' '}
              ·{' '}
              <a className="underline font-medium hover:text-white" href="/blog.html">
                Índice del blog
              </a>
            </li>
            <li>
              <a className="underline font-medium hover:text-white" href="/acerca-de.html">
                Quiénes somos
              </a>{' '}
              ·{' '}
              <a className="underline font-medium hover:text-white" href="/contacto.html">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-white/70 text-xs md:text-sm max-w-3xl mx-auto mt-8 leading-relaxed text-center">
        Metodología: revisamos textos cuando cambian tipos, tramos o calendarios oficiales. Las calculadoras muestran
        resultados en el navegador salvo que indiquemos lo contrario; no almacenamos tus cifras en nuestros
        servidores por el simple hecho de usar una simulación en la página de inicio.
      </p>
    </section>
  );
}
