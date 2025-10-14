import { useEffect } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  showVisual?: boolean;
}

export default function FAQSchema({ faqs, showVisual = true }: FAQSchemaProps) {
  useEffect(() => {
    // Inyectar el schema en el head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [faqs]);

  if (!showVisual) return null;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <span className="text-3xl">❓</span>
        Preguntas Frecuentes
      </h3>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-white rounded-xl border-2 border-purple-200 overflow-hidden group"
          >
            <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-purple-50 transition-colors flex items-start gap-3 list-none">
              <span className="text-purple-600 text-xl flex-shrink-0">Q:</span>
              <span className="flex-1">{faq.question}</span>
              <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 py-4 bg-purple-50/50 border-t-2 border-purple-200">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl font-bold flex-shrink-0">A:</span>
                <p className="text-gray-700 leading-relaxed flex-1">{faq.answer}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

