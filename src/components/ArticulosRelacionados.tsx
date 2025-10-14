interface Articulo {
  titulo: string;
  descripcion: string;
  emoji: string;
  link: string;
}

interface ArticulosRelacionadosProps {
  excluir?: string;
  onNavegar: (articulo: number) => void;
}

export default function ArticulosRelacionados({ excluir, onNavegar }: ArticulosRelacionadosProps) {
  const todosArticulos: Articulo[] = [
    {
      titulo: "Calculadora de Autónomos 2025",
      descripcion: "Guía completa para optimizar tus impuestos como autónomo",
      emoji: "🧮",
      link: "calculadora-autonomos"
    },
    {
      titulo: "Gastos Deducibles para Autónomos",
      descripcion: "Los 20 gastos que TODO autónomo puede deducir",
      emoji: "💰",
      link: "gastos-deducibles"
    },
    {
      titulo: "Modelo 130 Autónomos 2025",
      descripcion: "Guía paso a paso para presentar tu IRPF trimestral",
      emoji: "📝",
      link: "modelo-130"
    },
    {
      titulo: "IRPF Autónomos 2025",
      descripcion: "Todo sobre el IRPF para autónomos en 2025",
      emoji: "💼",
      link: "irpf-autonomos"
    },
    {
      titulo: "Cuota de Autónomos 2025",
      descripcion: "Novedades y estrategias para pagar menos",
      emoji: "📊",
      link: "cuota-autonomos"
    }
  ];

  // Filtrar el artículo actual
  const articulosFiltrados = todosArticulos.filter(art => art.link !== excluir);

  // Mapeo de links a números de artículos
  const linkToNumber: Record<string, number> = {
    'calculadora-autonomos': 1,
    'gastos-deducibles': 2,
    'modelo-130': 3,
    'irpf-autonomos': 4,
    'cuota-autonomos': 5
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border-2 border-blue-200">
      <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        📚 Artículos Relacionados
      </h3>
      <p className="text-gray-600 text-center mb-8">
        Continúa aprendiendo con estos artículos especializados para autónomos
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articulosFiltrados.map((articulo, index) => (
          <button
            key={index}
            onClick={() => onNavegar(linkToNumber[articulo.link])}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-left border-2 border-transparent hover:border-blue-400"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{articulo.emoji}</div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {articulo.titulo}
                </h4>
                <p className="text-gray-600 text-sm">
                  {articulo.descripcion}
                </p>
                <div className="mt-3 text-blue-600 font-semibold text-sm">
                  Leer más →
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Enlaces adicionales al sitio */}
      <div className="mt-8 pt-8 border-t-2 border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 text-center hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="text-2xl mb-2">🧮</div>
            <div className="font-bold">Calculadora Autónomos</div>
            <div className="text-sm opacity-90">Herramienta gratuita</div>
          </a>
          
          <a
            href="/"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-xl p-4 text-center hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="text-2xl mb-2">🎁</div>
            <div className="font-bold">PDF 20 Gastos</div>
            <div className="text-sm opacity-90">Solo 19€</div>
          </a>
          
          <a
            href="/"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 text-center hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="text-2xl mb-2">📖</div>
            <div className="font-bold">Más Artículos</div>
            <div className="text-sm opacity-90">Blog completo</div>
          </a>
        </div>
      </div>
    </div>
  );
}

