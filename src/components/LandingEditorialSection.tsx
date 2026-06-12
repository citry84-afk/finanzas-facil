/**
 * Bloque editorial visible en la landing para reforzar contenido propio (calidad / AdSense).
 * Enlaces a guías estáticas y a la app; sin cifras de impacto no verificables.
 */
export default function LandingEditorialSection() {
  return (
    <section
      className="mt-16 rounded-[32px] bg-white p-6 text-left shadow-sm ring-1 ring-black/5 md:p-10"
      aria-labelledby="editorial-hub-title"
    >
      <p className="mb-3 text-center text-sm font-semibold text-blue-600">Guías y blog</p>
      <h2
        id="editorial-hub-title"
        className="text-center text-3xl font-semibold tracking-normal text-slate-950 md:text-5xl mb-6"
      >
        Contenido para entender antes de calcular.
      </h2>
      <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8 text-center">
        Además de las calculadoras, publicamos{' '}
        <strong className="text-slate-950">textos largos</strong> con calendario, obligaciones habituales y enlaces a
        fuentes del propio sitio. El objetivo es que entiendas el contexto antes de introducir cifras: las
        herramientas sirven para <em>simular</em>; la normativa y tu gestoría cierran el caso real.
      </p>
      <div className="flex justify-center mb-8">
        <a
          href="/blog.html"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Ver índice del blog
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-[#f5f5f7] p-6">
          <h3 className="text-xl font-semibold mb-3">Empieza por aquí</h3>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
            Si no sabes qué mirar primero, haz un test corto y después pasa a gastos, ahorro, deuda, impuestos o
            vivienda según tu resultado.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="/test-salud-financiera.html"
              className="inline-flex items-center justify-center w-full md:w-auto rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Hacer test financiero
            </a>
            <a className="underline font-medium text-slate-700 hover:text-slate-950" href="/control-gastos-mensual.html">
              Leer guía de gastos
            </a>
            <a className="underline font-medium text-slate-700 hover:text-slate-950" href="/control-gastos-sin-excel.html">
              Control sin Excel
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-[#f5f5f7] p-6">
          <h3 className="text-xl font-semibold mb-3">Plantilla + gastos hormiga</h3>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
            Empieza con una hoja mensual imprimible y después revisa pequeños gastos repetidos sin convertirlo en una
            obsesión. Es el camino más amable para crear hábito.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="/plantilla-dinero-tranquilo.html"
              className="inline-flex items-center justify-center w-full md:w-auto rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Abrir plantilla
            </a>
            <a className="underline font-medium text-slate-700 hover:text-slate-950" href="/gastos-hormiga.html">
              Ver guía de gastos hormiga
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-[#f5f5f7] p-6">
          <h3 className="text-xl font-semibold mb-3">Ahorrar cada mes</h3>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
            Guía práctica para calcular margen, elegir una fuga pequeña y reservar ahorro sin convertirlo en una
            obligación imposible de mantener.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="/cuanto-puedo-gastar-al-mes.html"
              className="inline-flex items-center justify-center w-full md:w-auto rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Calcular dinero tranquilo
            </a>
            <a className="underline font-medium text-slate-700 hover:text-slate-950" href="/como-ahorrar-dinero-cada-mes.html">
              Leer guía de ahorro
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white md:col-span-3">
          <h3 className="text-xl font-semibold mb-3">Guía principal (2026)</h3>
          <p className="text-white/72 text-sm md:text-base leading-relaxed mb-4">
            Calendario fiscal orientativo, alta, facturación, gastos deducibles con criterios prudentes, IRPF,
            Modelo 130 y cómo encajan nuestras calculadoras. Incluye avisos legales y enlaces internos a artículos
            que ya teníamos publicados.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/guia-fiscal-autonomos-espana-2026.html"
              className="inline-flex items-center justify-center w-full md:w-auto rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
            >
              Abrir guía fiscal autónomos 2026
            </a>
            <a
              href="/cuanto-apartar-impuestos-autonomo.html"
              className="inline-flex items-center justify-center w-full md:w-auto rounded-full bg-white/10 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/15"
            >
              Calcular cuánto apartar
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-[#f5f5f7] p-6 md:col-span-3">
          <h3 className="text-xl font-semibold text-slate-950 mb-3">Temas frecuentes (HTML)</h3>
          <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 text-slate-700 text-sm md:text-base">
            <li>
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/modelo-130-autonomos-2026.html">
                Modelo 130
              </a>
              <br />
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/cuanto-apartar-impuestos-autonomo.html">
                Cuánto apartar al cobrar
              </a>
            </li>
            <li>
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/gastos-deducibles-autonomos-2026.html">
                Gastos deducibles
              </a>{' '}
              ·{' '}
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/retencion-irpf-autonomos.html">
                Retención IRPF
              </a>
            </li>
            <li>
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/como-calcular-irpf-autonomos-2025.html">
                Cómo calcular IRPF (guía)
              </a>{' '}
              ·{' '}
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/blog.html">
                Índice del blog
              </a>
            </li>
            <li>
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/cuanto-puedo-gastar-al-mes.html">
                Cuánto puedo gastar
              </a>{' '}
              ·{' '}
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/calculadora-fondo-emergencia.html">
                Fondo emergencia
              </a>{' '}
              <br />
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/regla-50-30-20-espana.html">
                Regla 50/30/20
              </a>{' '}
              ·{' '}
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/nivel-endeudamiento-calculadora.html">
                Nivel de deuda
              </a>{' '}
              ·{' '}
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/que-deuda-pagar-primero.html">
                Qué deuda pagar
              </a>{' '}
              <br />
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/como-ahorrar-dinero-cada-mes.html">
                Ahorrar cada mes
              </a>
            </li>
            <li>
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/test-salud-financiera.html">
                Test financiero
              </a>{' '}
              ·{' '}
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/control-gastos-sin-excel.html">
                Sin Excel
              </a>{' '}
              <br />
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/acerca-de.html">
                Quiénes somos
              </a>{' '}
              ·{' '}
              <a className="font-medium text-blue-600 hover:text-blue-700" href="/contacto.html">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-slate-500 text-xs md:text-sm max-w-3xl mx-auto mt-8 leading-relaxed text-center">
        Metodología: revisamos textos cuando cambian tipos, tramos o calendarios oficiales. Las calculadoras muestran
        resultados en el navegador salvo que indiquemos lo contrario; no almacenamos tus cifras en nuestros
        servidores por el simple hecho de usar una simulación en la página de inicio.
      </p>
    </section>
  );
}
