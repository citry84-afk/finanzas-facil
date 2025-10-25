import { useState } from 'react';

// Tipos de contenido unificado
interface ContentItem {
  id: string;
  type: 'article' | 'guide' | 'product' | 'blog';
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: number;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  featured: boolean;
  publishDate: string;
  author: string;
  image?: string;
  rating?: number;
  price?: string;
  affiliateLink?: string;
}

// Datos unificados
const contentItems: ContentItem[] = [
  {
    id: 'presupuesto-50-30-20',
    type: 'article',
    title: 'Presupuesto 50/30/20: La Regla de Oro de las Finanzas Personales',
    excerpt: 'Aprende a repartir tus ingresos de forma eficiente: 50% necesidades, 30% deseos, 20% ahorro y pago de deudas.',
    content: `La regla 50/30/20 es uno de los métodos de presupuestación más populares y efectivos para gestionar tus finanzas personales. Esta estrategia te ayuda a distribuir tus ingresos de manera equilibrada y sostenible.

## ¿Cómo funciona la regla 50/30/20?

**50% para Necesidades Básicas:**
- Vivienda (alquiler o hipoteca)
- Alimentación y supermercado
- Transporte (gasolina, transporte público)
- Servicios básicos (luz, agua, internet)
- Seguros esenciales
- Gastos médicos básicos

**30% para Deseos y Estilo de Vida:**
- Entretenimiento y ocio
- Comidas fuera de casa
- Suscripciones (Netflix, Spotify, etc.)
- Ropa y accesorios
- Viajes y vacaciones
- Hobbies y actividades recreativas

**20% para Ahorro y Pago de Deudas:**
- Fondo de emergencia
- Ahorro para objetivos específicos
- Pago de deudas adicionales
- Inversiones a largo plazo

## Ventajas de este método

1. **Simplicidad**: Es fácil de entender y aplicar
2. **Flexibilidad**: Se adapta a diferentes niveles de ingresos
3. **Equilibrio**: Permite disfrutar del presente mientras preparas el futuro
4. **Motivación**: El 30% para deseos mantiene la motivación

## Cómo implementarlo paso a paso

1. **Calcula tus ingresos netos mensuales**
2. **Identifica y categoriza todos tus gastos**
3. **Ajusta gradualmente hasta alcanzar las proporciones**
4. **Revisa y ajusta mensualmente**

Recuerda: esta regla es un punto de partida. Puedes ajustarla según tu situación personal, objetivos financieros y etapa de vida.`,
    category: 'Presupuesto',
    tags: ['presupuesto', 'ahorro', 'finanzas personales'],
    readTime: 8,
    difficulty: 'Principiante',
    featured: true,
    publishDate: '2025-01-15',
    author: 'Equipo FinanzasFácil',
    rating: 4.9
  },
  {
    id: 'guia-primer-presupuesto',
    type: 'guide',
    title: 'Tu Primer Presupuesto en 30 Días',
    excerpt: 'Guía completa para crear tu primer presupuesto personal desde cero, paso a paso.',
    content: `# Tu Primer Presupuesto en 30 Días

## Día 1-7: Análisis de tu situación actual

### Paso 1: Registra todos tus ingresos
- Salario principal
- Ingresos secundarios
- Bonificaciones
- Ingresos por inversiones

### Paso 2: Identifica todos tus gastos
- Gastos fijos (vivienda, seguros, servicios)
- Gastos variables (alimentación, transporte)
- Gastos discrecionales (ocio, entretenimiento)

## Día 8-14: Categorización y análisis

### Clasifica tus gastos en:
1. **Necesidades esenciales** (50%)
2. **Deseos y estilo de vida** (30%)
3. **Ahorro e inversión** (20%)

### Herramientas recomendadas:
- Apps de presupuesto (YNAB, Mint)
- Hojas de cálculo
- Apps bancarias

## Día 15-21: Creación del presupuesto

### Establece límites mensuales para cada categoría
- Usa la regla 50/30/20 como base
- Ajusta según tu situación personal
- Deja margen para imprevistos

## Día 22-30: Implementación y seguimiento

### Automatiza cuando sea posible:
- Transferencias automáticas para ahorro
- Domiciliaciones para gastos fijos
- Alertas de límites de gasto

### Revisa y ajusta semanalmente
- Compara gastos reales vs presupuestados
- Identifica patrones y oportunidades de mejora
- Celebra los logros`,
    category: 'Guías',
    tags: ['presupuesto', 'principiantes', 'guía paso a paso'],
    readTime: 15,
    difficulty: 'Principiante',
    featured: true,
    publishDate: '2025-01-10',
    author: 'Equipo FinanzasFácil'
  },
  {
    id: 'libros-finanzas-recomendados',
    type: 'product',
    title: 'Los 10 Mejores Libros de Finanzas Personales 2025',
    excerpt: 'Descubre los libros más influyentes para transformar tu relación con el dinero y construir riqueza.',
    content: `# Los 10 Mejores Libros de Finanzas Personales 2025

## 1. "Padre Rico, Padre Pobre" - Robert Kiyosaki
**Precio:** 15-20€ | **Rating:** 4.5/5
**Por qué leerlo:** Cambia tu mentalidad sobre prospectos de dinero y enseña la diferencia entre activos y pasivos.

## 2. "El Inversor Inteligente" - Benjamin Graham
**Precio:** 25-30€ | **Rating:** 4.7/5
**Por qué leerlo:** La biblia de la inversión en valor, recomendado por Warren Buffett.

## 3. "Piense y Hágase Rico" - Napoleon Hill
**Precio:** 12-18€ | **Rating:** 4.3/5
**Por qué leerlo:** Clásico atemporal sobre psicología del éxito y mentalidad de riqueza.

## 4. "El Millonario de la Puerta de al Lado" - Thomas Stanley
**Precio:** 18-25€ | **Rating:** 4.6/5
**Por qué leerlo:** Revela los hábitos reales de los millonarios de clase media.

## 5. "Dinero: Domina el Juego" - Tony Robbins
**Precio:** 20-28€ | **Rating:** 4.4/5
**Por qué leerlo:** Estrategias prácticas de inversión y planificación financiera.

## 6. "El Hombre Más Rico de Babilonia" - George Clason
**Precio:** 10-15€ | **Rating:** 4.5/5
**Por qué leerlo:** Principios atemporales de ahorro e inversión en formato de fábula.

## 7. "Finanzas Personales para Dummies" - Eric Tyson
**Precio:** 22-30€ | **Rating:** 4.2/5
**Por qué leerlo:** Guía completa y accesible para principiantes.

## 8. "El Pequeño Libro de la Inversión" - John Bogle
**Precio:** 15-20€ | **Rating:** 4.8/5
**Por qué leerlo:** Fundamentos de inversión en fondos indexados.

## 9. "Your Money or Your Life" - Vicki Robin
**Precio:** 18-25€ | **Rating:** 4.6/5
**Por qué leerlo:** Enfoque holístico sobre la relación entre dinero y vida.

## 10. "The Millionaire Fastlane" - MJ DeMarco
**Precio:** 20-28€ | **Rating:** 4.4/5
**Por qué leerlo:** Estrategias para crear riqueza a través del emprendimiento.

## Dónde comprar:
- **Amazon España** - Mejor precio y entrega rápida
- **Casa del Libro** - Librerías físicas y online
- **Fnac** - Gran selección y promociones`,
    category: 'Productos',
    tags: ['libros', 'educación financiera', 'recomendaciones'],
    readTime: 12,
    difficulty: 'Principiante',
    featured: true,
    publishDate: '2025-01-12',
    author: 'Equipo FinanzasFácil',
    rating: 4.8,
    price: 'Desde 10€',
    affiliateLink: 'https://amazon.es/libros-finanzas'
  },
  {
    id: 'gastos-hormiga',
    type: 'article',
    title: 'Gastos Hormiga: El Enemigo Silencioso de tu Presupuesto',
    excerpt: 'Los pequeños gastos diarios que parecen insignificantes pero pueden devorar tu presupuesto mensual.',
    content: `Los gastos hormiga son esos pequeños desembolsos que hacemos de forma rutinaria y que, aunque individualmente parecen insignificantes, sumados pueden representar una cantidad considerable al final del mes.

## ¿Qué son los gastos hormiga?

Son gastos pequeños y frecuentes que muchas veces pasan desapercibidos:
- Café diario en la cafetería (3-5€)
- Aperitivos y snacks (2-4€)
- Aplicaciones móviles y suscripciones (1-15€/mes)
- Gastos de transporte no planificados
- Compras impulsivas online
- Propinas excesivas
- Gastos de parking

## El impacto real en tu economía

**Ejemplo práctico:**
- Café diario: 4€ × 22 días laborables = 88€/mes
- Aperitivos: 3€ × 20 días = 60€/mes
- Aplicaciones: 10€/mes
- **Total: 158€/mes = 1.896€/año**

## Cómo detectar tus gastos hormiga

1. **Registra TODO durante una semana**
   - Anota cada gasto, por pequeño que sea
   - Incluye fecha, concepto y cantidad

2. **Categoriza los gastos**
   - Alimentación fuera de casa
   - Entretenimiento
   - Transporte no planificado
   - Compras impulsivas

3. **Analiza patrones**
   - ¿En qué días gastas más?
   - ¿Qué emociones te llevan a gastar?
   - ¿Cuáles son tus "momentos débiles"?

## Estrategias para reducirlos

**Para el café:**
- Lleva tu propio café al trabajo
- Establece un presupuesto semanal para cafés fuera
- Busca ofertas o programas de fidelidad

**Para las suscripciones:**
- Revisa mensualmente qué apps usas realmente
- Cancela las que no uses activamente
- Considera planes familiares para compartir costos

**Para compras impulsivas:**
- Implementa la regla de 24 horas
- Elimina aplicaciones de compras del móvil
- Usa listas de compras estrictas

## Herramientas de control

1. **Apps de gastos**: Registra automáticamente tus transacciones
2. **Presupuesto semanal**: Asigna un límite específico para gastos variables
3. **Efectivo para gastos hormiga**: Retira una cantidad fija semanal
4. **Revisión mensual**: Analiza patrones y ajusta estrategias

Recuerda: el objetivo no es eliminar completamente estos gastos, sino hacerlos conscientes y controlados.`,
    category: 'Ahorro',
    tags: ['gastos', 'ahorro', 'presupuesto'],
    readTime: 10,
    difficulty: 'Principiante',
    featured: false,
    publishDate: '2025-01-08',
    author: 'Equipo FinanzasFácil',
    rating: 4.7
  }
];

// Filtros y estado
interface Filters {
  type: string;
  category: string;
  difficulty: string;
  search: string;
}

function ContentHub() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    category: 'all',
    difficulty: 'all',
    search: ''
  });

  // Filtrar contenido
  const filteredContent = contentItems.filter(item => {
    const matchesType = filters.type === 'all' || item.type === filters.type;
    const matchesCategory = filters.category === 'all' || item.category === filters.category;
    const matchesDifficulty = filters.difficulty === 'all' || item.difficulty === filters.difficulty;
    const matchesSearch = filters.search === '' || 
      item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));

    return matchesType && matchesCategory && matchesDifficulty && matchesSearch;
  });

  // Obtener categorías únicas
  const categories = [...new Set(contentItems.map(item => item.category))];

  // Si hay contenido seleccionado, mostrarlo
  if (selectedContent) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <button
              onClick={() => setSelectedContent(null)}
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-2xl">←</span>
              <span>Volver al Hub</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Meta info */}
          <div className="flex items-center gap-6 mb-8 text-sm text-gray-400">
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
              {selectedContent.type === 'article' ? '📄 Artículo' : 
               selectedContent.type === 'guide' ? '📚 Guía' : 
               selectedContent.type === 'product' ? '🛍️ Producto' : '📝 Blog'}
            </span>
            <span>{selectedContent.readTime} min lectura</span>
            <span>{selectedContent.difficulty}</span>
            {selectedContent.rating && <span>⭐ {selectedContent.rating}/5</span>}
            {selectedContent.price && <span>💰 {selectedContent.price}</span>}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {selectedContent.title}
          </h1>

          {/* Author and date */}
          <div className="flex items-center gap-4 mb-8 text-gray-400">
            <span>Por {selectedContent.author}</span>
            <span>•</span>
            <span>{new Date(selectedContent.publishDate).toLocaleDateString('es-ES')}</span>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {selectedContent.content}
            </div>
          </div>

          {/* Affiliate link if product */}
          {selectedContent.affiliateLink && (
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4">🛍️ ¿Te interesa este producto?</h3>
              <p className="text-gray-300 mb-6">
                Si decides comprarlo, puedes apoyarnos usando nuestro enlace de afiliado. 
                No pagas más, pero nos ayudas a seguir creando contenido gratuito.
              </p>
              <a
                href={selectedContent.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Ver en Amazon
                <span>→</span>
              </a>
            </div>
          )}

          {/* Related content */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8">Contenido relacionado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentItems
                .filter(item => item.id !== selectedContent.id && item.category === selectedContent.category)
                .slice(0, 2)
                .map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedContent(item)}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{item.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{item.readTime} min</span>
                      <span>⭐ {item.rating || 4.5}/5</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-black">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6 leading-tight">
              Hub de
              <br />
              <span className="text-blue-400">Contenido</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Todo lo que necesitas para dominar tus finanzas: artículos, guías, productos recomendados y más.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{contentItems.filter(item => item.type === 'article').length}</div>
                <div className="text-gray-400">Artículos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">{contentItems.filter(item => item.type === 'guide').length}</div>
                <div className="text-gray-400">Guías</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{contentItems.filter(item => item.type === 'product').length}</div>
                <div className="text-gray-400">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">{contentItems.filter(item => item.featured).length}</div>
                <div className="text-gray-400">Destacados</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Buscar contenido..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            {/* Type filter */}
            <div>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
              >
                <option value="all">Todos los tipos</option>
                <option value="article">📄 Artículos</option>
                <option value="guide">📚 Guías</option>
                <option value="product">🛍️ Productos</option>
                <option value="blog">📝 Blog</option>
              </select>
            </div>

            {/* Category filter */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
              >
                <option value="all">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty filter */}
            <div>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
              >
                <option value="all">Todas las dificultades</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredContent.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedContent(item)}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
            >
              {/* Featured badge */}
              {item.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ Destacado
                  </span>
                </div>
              )}

              {/* Card Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8">
                {/* Article Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl font-bold text-gray-700/30 group-hover:text-blue-500/20 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex space-x-2">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
                      item.type === 'article' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      item.type === 'guide' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      item.type === 'product' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}>
                      {item.type === 'article' ? '📄 Artículo' : 
                       item.type === 'guide' ? '📚 Guía' : 
                       item.type === 'product' ? '🛍️ Producto' : '📝 Blog'}
                    </span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
                      item.difficulty === 'Principiante' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      item.difficulty === 'Intermedio' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {item.excerpt}
                  </p>

                  {/* Preview Content */}
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                    <div className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                      {item.content.split('\n').slice(0, 4).join('\n')}...
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>📖 {item.readTime} min</span>
                      <span>⭐ {item.rating || 4.5}/5</span>
                      {item.price && <span>💰 {item.price}</span>}
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold group-hover:scale-105 transition-transform duration-300">
                      {item.type === 'article' ? 'Leer' : 
                       item.type === 'guide' ? 'Seguir Guía' : 
                       item.type === 'product' ? 'Ver Producto' : 'Leer Blog'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredContent.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">No se encontraron resultados</h3>
            <p className="text-gray-500 mb-8">Prueba ajustando los filtros o usando términos de búsqueda diferentes.</p>
            <button
              onClick={() => setFilters({type: 'all', category: 'all', difficulty: 'all', search: ''})}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentHub;
