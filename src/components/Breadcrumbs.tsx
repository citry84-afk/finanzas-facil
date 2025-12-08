interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-gray-400">→</span>
            )}
            
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-semibold">
                {item.label}
              </span>
            ) : item.onClick ? (
              <button
                onClick={item.onClick}
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <a
                href={item.href}
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>

      {/* Schema.org Breadcrumb markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href ? `https://finanzasmuyfacil.com${item.href}` : undefined
          }))
        })}
      </script>
    </nav>
  );
}

