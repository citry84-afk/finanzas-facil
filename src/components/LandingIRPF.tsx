export default function LandingIRPF() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 md:py-16">
      <article className="mx-auto max-w-4xl">
        <a href="/" className="text-sm font-semibold text-blue-700 hover:text-blue-900">FinanzasFácil</a>

        <header className="mt-6 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-11">
          <p className="text-sm font-bold uppercase tracking-normal text-blue-700">Autónomos · planificación 2026</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 md:text-6xl">Entiende tu cuota y tu reserva fiscal sin hacer una declaración a ciegas</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">La herramienta de autónomos estima un tramo de cotización, una cuota mensual y una reserva fiscal de planificación. Sirve para ordenar números, no para presentar el Modelo 130 ni sustituir una gestoría.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/autonomos" className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800">Abrir herramienta de autónomos</a>
            <a href="/guia-fiscal-autonomos-espana-2026.html" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-800 hover:bg-slate-100">Leer la guía fiscal 2026</a>
          </div>
        </header>

        <section className="mt-7 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="text-lg font-bold">1. Rendimiento previsto</h2><p className="mt-2 text-slate-600">Parte de ingresos y gastos para mostrar un rango de cotización orientativo.</p></div>
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="text-lg font-bold">2. Cuota aproximada</h2><p className="mt-2 text-slate-600">Puedes ajustar la base dentro del tramo mostrado y ver cómo cambia la cuota.</p></div>
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="text-lg font-bold">3. Reserva prudente</h2><p className="mt-2 text-slate-600">Una referencia para planificar, sin convertirla en una liquidación oficial de IRPF.</p></div>
        </section>

        <section className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-7">
          <h2 className="text-2xl font-semibold tracking-normal">Antes de decidir o presentar</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            <li>El IRPF depende de retenciones, gastos deducibles, circunstancias personales y comunidad autónoma.</li>
            <li>El Modelo 130 trabaja con importes acumulados desde el inicio del año y puede no ser tu modelo aplicable.</li>
            <li>Consulta la fuente oficial o una gestoría cuando la decisión afecte a una presentación real.</li>
          </ul>
        </section>

        <section className="mt-7 rounded-2xl bg-slate-950 p-7 text-white md:p-9">
          <h2 className="text-2xl font-semibold tracking-normal">Guías para comprobar el contexto</h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className="font-semibold text-blue-300 hover:text-white" href="/cuota-autonomos-2026.html">Cuota de autónomos 2026</a>
            <a className="font-semibold text-blue-300 hover:text-white" href="/modelo-130-autonomos-2026.html">Modelo 130</a>
            <a className="font-semibold text-blue-300 hover:text-white" href="/gastos-deducibles-autonomos-2026.html">Gastos deducibles</a>
            <a className="font-semibold text-blue-300 hover:text-white" href="/metodologia-fuentes.html">Metodología y fuentes</a>
          </div>
        </section>
      </article>
    </main>
  );
}
