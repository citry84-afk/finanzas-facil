import React from 'react';
import { Share2 } from 'lucide-react';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

interface ShareAppProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const ShareApp: React.FC<ShareAppProps> = ({ 
  variant = 'primary',
  className = ''
}) => {
  const handleShare = async () => {
    const shareData = {
      title: 'FinanzasFácil - Calculadoras Financieras Gratuitas',
      text: '🚀 ¡Descubre FinanzasFácil! Calculadoras de salario neto, libertad financiera y control de gastos. ¡100% GRATIS! 💰',
      url: 'https://finanzasmuyfaciles.netlify.app',
      dialogTitle: 'Comparte FinanzasFácil con tus amigos'
    };

    // Track analytics
    if (window.gtag) {
      window.gtag('event', 'share_app', {
        method: Capacitor.getPlatform(),
        content_type: 'app'
      });
    }

    try {
      // Usar Capacitor Share en móvil o Web Share API en web
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url,
          dialogTitle: shareData.dialogTitle
        });
      } else if (navigator.share) {
        // Web Share API
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url
        });
      } else {
        // Fallback: copiar al portapapeles
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        alert('✅ ¡Enlace copiado al portapapeles!');
      }
    } catch (error) {
      // Usuario canceló o error
      console.log('Share cancelled or failed:', error);
    }
  };

  const primaryStyles = `
    bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
    hover:from-green-600 hover:via-emerald-600 hover:to-teal-600
    text-white font-bold px-8 py-4 rounded-2xl 
    transition-all duration-300 shadow-2xl transform hover:scale-105 
    border-2 border-white/30
    flex items-center gap-3 justify-center
  `;

  const secondaryStyles = `
    bg-white/20 backdrop-blur-sm border-2 border-white/30 
    text-white font-bold px-6 py-3 rounded-xl 
    hover:bg-white/30 transition-all duration-300 shadow-lg
    flex items-center gap-2 justify-center
  `;

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <button
      onClick={handleShare}
      className={`${styles} ${className}`}
      aria-label="Compartir aplicación"
    >
      <Share2 className="w-5 h-5" />
      <span>Compartir esta app</span>
    </button>
  );
};

export default ShareApp;


