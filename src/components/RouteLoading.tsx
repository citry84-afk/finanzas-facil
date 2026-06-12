/** Fallback mínimo mientras carga un chunk lazy de calculadora. */
export default function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
      <p className="text-lg font-medium">Cargando herramienta…</p>
    </div>
  );
}
