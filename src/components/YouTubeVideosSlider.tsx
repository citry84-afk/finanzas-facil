import React from 'react';

interface YouTubeVideosSliderProps {
  channelUrl?: string;
  maxVideos?: number;
}

const YouTubeVideosSlider: React.FC<YouTubeVideosSliderProps> = ({
  channelUrl = 'https://youtube.com/@finanzasmuyfaciles',
  maxVideos: _maxVideos,
}) => {
  return (
    <div
      style={{
        padding: '30px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
        color: 'white',
        borderRadius: '12px',
        margin: '30px 0',
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', fontSize: '22px' }}>
        📺 Canal de YouTube
      </h3>
      <p style={{ margin: '0 0 20px 0' }}>
        Vídeos semanales sobre finanzas personales
      </p>
      <a
        href={`${channelUrl}?sub_confirmation=1`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'white',
          color: '#cc0000',
          padding: '12px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 700,
        }}
      >
        Suscribirme gratis
      </a>
    </div>
  );
};

export default YouTubeVideosSlider;
