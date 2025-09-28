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
        // Solo ejecutar si AdSense está aprobado
        const isAdSenseApproved = localStorage.getItem('adsense-approved') === 'true';
        if (isAdSenseApproved) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  // Mostrar placeholder hasta aprobación
  const isAdSenseApproved = typeof window !== 'undefined' ? 
    localStorage.getItem('adsense-approved') === 'true' : false;

  if (!isAdSenseApproved) {
    return (
      <div className={`adsense-placeholder ${className}`} style={{
        ...style,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '20px'
      }}>
        📢 Espacio publicitario<br/>
        <small style={{opacity: 0.8, fontSize: '12px'}}>
          AdSense en proceso de aprobación
        </small>
      </div>
    );
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

// Componentes predefinidos para diferentes tipos de anuncios
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
