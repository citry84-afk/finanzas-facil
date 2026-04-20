import type { CSSProperties, FC } from 'react';

interface AdSenseProps {
  slot: string;
  style?: CSSProperties;
  format?: string;
  responsive?: boolean;
  className?: string;
}

/** Desactivado temporalmente hasta aprobación de Google AdSense — reactivar descomentando el bloque inferior y restaurando el cuerpo del componente. */
const AdSense: FC<AdSenseProps> = () => null;

export const BannerAd: FC<{ className?: string }> = () => null;
export const SidebarAd: FC<{ className?: string }> = () => null;
export const MobileAd: FC<{ className?: string }> = () => null;
export const InlineAd: FC<{ className?: string }> = () => null;

export default AdSense;

/*
import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: boolean;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({
  slot,
  style = { display: 'block' },
  format = 'auto',
  responsive = true,
  className = ''
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

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
*/
