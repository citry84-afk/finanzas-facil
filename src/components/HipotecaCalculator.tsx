import React from 'react';

interface HipotecaCalculatorProps {
  onBack?: () => void;
  onNavigate?: (mode: string) => void;
}

const HipotecaCalculator: React.FC<HipotecaCalculatorProps> = ({ onBack }) => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Calculadora de Hipoteca</h1>
      <p>Esta herramienta está temporalmente en mantenimiento.</p>
      <p>
        Mientras tanto, puedes usar nuestra{' '}
        <a href="/calculadora-hipoteca-gratis.html" style={{ color: '#2563eb' }}>
          versión estática aquí
        </a>
        .
      </p>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          ← Volver
        </button>
      )}
    </div>
  );
};

export default HipotecaCalculator;
