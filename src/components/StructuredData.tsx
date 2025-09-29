import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'WebSite' | 'WebApplication' | 'Calculator' | 'SoftwareApplication' | 'AutonomosCalculator';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  useEffect(() => {
    const getStructuredData = () => {
      const baseData = {
        "@context": "https://schema.org",
        "@type": type,
        "name": data.name,
        "description": data.description,
        "url": data.url,
        "author": {
          "@type": "Organization",
          "name": "Finanzas Fáciles"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Finanzas Fáciles",
          "url": "https://finanzasmuyfaciles.netlify.app"
        }
      };

      switch (type) {
        case 'WebSite':
          return {
            ...baseData,
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://finanzasmuyfaciles.netlify.app/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          };
        
        case 'WebApplication':
          return {
            ...baseData,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "screenshot": data.screenshot,
            "featureList": data.features
          };
        
        case 'Calculator':
          return {
            ...baseData,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "featureList": data.features
          };
        
        case 'AutonomosCalculator':
          return {
            ...baseData,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "featureList": [
              "Cálculo de IRPF para autónomos",
              "Cuota de Seguridad Social 2025",
              "Gastos deducibles por categorías",
              "Comparativa entre comunidades autónomas",
              "Bonificaciones para autónomos nuevos",
              "Cálculo de cuánto facturar para ganancia neta deseada"
            ],
            "keywords": "calculadora autónomos, IRPF autónomos, cuota seguridad social, gastos deducibles, fiscalidad autónomos",
            "audience": {
              "@type": "Audience",
              "audienceType": "Autónomos y trabajadores por cuenta propia"
            }
          };
        
        default:
          return baseData;
      }
    };

    // Crear y añadir el script de structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(getStructuredData(), null, 2);
    document.head.appendChild(script);

    return () => {
      // Limpiar el script cuando el componente se desmonte
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [type, data]);

  return null; // Este componente no renderiza nada visualmente
};

export default StructuredData;
