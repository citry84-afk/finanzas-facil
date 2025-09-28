import React, { useState, useEffect } from 'react';

interface DailyQuizNotificationProps {
  onClose: () => void;
}

const DailyQuizNotification: React.FC<DailyQuizNotificationProps> = ({ onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Mostrar notificación después de 2 segundos
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 max-w-sm mx-auto shadow-2xl border border-purple-400/30">
        <div className="text-center">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-white font-bold text-xl mb-2">
            ¡Pregunta del Día!
          </h3>
          <p className="text-white/90 text-sm mb-4">
            Aprende algo nuevo sobre finanzas y mantén tu racha de aprendizaje. 
            ¡Solo te tomará 1 minuto!
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-xl transition-all duration-300 text-sm"
            >
              Más tarde
            </button>
            <button
              onClick={() => {
                // Scroll hacia el quiz
                const quizElement = document.querySelector('[data-quiz-section]');
                if (quizElement) {
                  quizElement.scrollIntoView({ behavior: 'smooth' });
                }
                onClose();
              }}
              className="flex-1 bg-white text-purple-600 font-bold py-2 px-4 rounded-xl hover:scale-105 transition-all duration-300 text-sm"
            >
              ¡Vamos!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuizNotification;


