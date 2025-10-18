import React from 'react';
import { Share, Youtube } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  handle: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'YouTube',
    url: 'https://youtube.com/@FinanzasMuyFáciles',
    icon: <Youtube className="w-6 h-6" />,
    color: 'bg-red-600 hover:bg-red-700',
    handle: '@FinanzasMuyFáciles'
  },
  // Agregar más redes según el usuario las proporcione
];

export const SocialLinks: React.FC = () => {
  const handleSocialClick = (url: string, name: string) => {
    // Track analytics
    if (window.gtag) {
      window.gtag('event', 'social_link_click', {
        social_network: name,
        link_url: url
      });
    }
    
    // Abrir en nueva pestaña
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Share className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-white">
          ¡Síguenos en Redes Sociales!
        </h2>
      </div>
      
      <p className="text-gray-200 mb-6">
        📚 Contenido diario sobre finanzas, consejos y trucos para mejorar tu economía
      </p>

      <div className="space-y-3">
        {socialLinks.map((social) => (
          <button
            key={social.name}
            onClick={() => handleSocialClick(social.url, social.name)}
            className={`
              w-full flex items-center gap-4 p-4 rounded-lg
              ${social.color}
              transition-all duration-300 transform hover:scale-105
              shadow-lg hover:shadow-xl
            `}
          >
            <div className="flex-shrink-0">
              {social.icon}
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-white text-lg">
                {social.name}
              </div>
              <div className="text-white/80 text-sm">
                {social.handle}
              </div>
            </div>
            <div className="text-white/60">
              →
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-400/20 rounded-lg border-2 border-yellow-400/40">
        <p className="text-yellow-100 text-sm text-center">
          💡 <strong>¡Nuevo contenido cada día!</strong> No te pierdas nuestros tips y tutoriales
        </p>
      </div>
    </div>
  );
};

export default SocialLinks;

