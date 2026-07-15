import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: boolean;
  className?: string;
}

/**
 * No mostrar placeholders “en proceso de aprobación”: para revisores de AdSense
 * un banner vacío o púrpura parece sitio incompleto / bajo valor.
 * Hasta aprobación: no renderizar nada. Para activar ads reales:
 * localStorage.setItem('adsense-approved','true')
 */
const AdSense: React.FC<AdSenseProps> = ({
  slot,
  style = { display: 'block' },
  format = 'auto',
  responsive = true,
  className = '',
}) => {
  const isAdSenseApproved =
    typeof window !== 'undefined' && localStorage.getItem('adsense-approved') === 'true';

  useEffect(() => {
    if (!isAdSenseApproved) return;
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, [isAdSenseApproved]);

  if (!isAdSenseApproved) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-4837743291717475"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export const BannerAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    slot="6673201053"
    format="auto"
    responsive={true}
    style={{ display: 'block', textAlign: 'center', margin: '20px 0', minHeight: '90px' }}
    className={className}
  />
);

export const SidebarAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    slot="6673201053"
    format="rectangle"
    style={{ display: 'block', width: '300px', height: '250px', margin: '20px auto' }}
    className={className}
  />
);

export const MobileAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    slot="6673201053"
    format="fluid"
    responsive={true}
    style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}
    className={`mobile-ad ${className}`}
  />
);

export const InlineAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSense
    slot="6673201053"
    format="auto"
    responsive={true}
    style={{ display: 'block', textAlign: 'center', margin: '30px 0', minHeight: '90px' }}
    className={`inline-ad ${className}`}
  />
);

export default AdSense;
