import { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📑</span>
        <h3 className="text-lg font-bold text-gray-900">Tabla de Contenidos</h3>
      </div>
      
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`
              block w-full text-left px-3 py-2 rounded-lg transition-all duration-200
              ${item.level === 2 ? 'pl-3' : 'pl-6 text-sm'}
              ${activeId === item.id 
                ? 'bg-blue-600 text-white font-semibold shadow-md' 
                : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }
            `}
          >
            {item.title}
          </button>
        ))}
      </nav>

      {/* Progress indicator */}
      <div className="mt-6 pt-4 border-t border-blue-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📊</span>
          <span>
            {items.findIndex(item => item.id === activeId) + 1} / {items.length}
          </span>
        </div>
        <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300 rounded-full"
            style={{ 
              width: `${((items.findIndex(item => item.id === activeId) + 1) / items.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-4 pt-4 border-t border-blue-200 space-y-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full text-sm bg-white text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
        >
          ↑ Volver arriba
        </button>
      </div>
    </div>
  );
}

