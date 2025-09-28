import React, { useState } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [customAmount, setCustomAmount] = useState<string>('');

  if (!isOpen) return null;

  const openPayPal = (amount: number) => {
    const url = `https://paypal.me/lipastudios/${amount}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustom = () => {
    const value = Number(customAmount.replace(',', '.'));
    if (!isNaN(value) && value > 0) {
      openPayPal(Number(value.toFixed(2)));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md rounded-2xl border border-yellow-500/30 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-bold">Apoya FinanzasFácil</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white text-sm">Cerrar</button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-white/80">Tu donación nos ayuda a mantener la app gratis y mejorarla continuamente. ¡Gracias! 🙌</p>
          <div className="grid grid-cols-3 gap-3">
            {[1, 5, 10].map((amt) => (
              <button
                key={amt}
                onClick={() => openPayPal(amt)}
                className="rounded-xl border border-yellow-500/40 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 py-3 font-semibold hover:from-yellow-500/30 hover:to-orange-500/30 transition-all"
              >
                €{amt}
              </button>
            ))}
          </div>

          <div className="mt-2">
            <label className="block text-xs mb-1 text-white/70">Otro importe</label>
            <div className="flex gap-2">
              <input
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Ej. 3,50"
                inputMode="decimal"
                className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none focus:border-white/40"
              />
              <button
                onClick={handleCustom}
                className="px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold text-sm hover:opacity-90"
              >
                Donar
              </button>
            </div>
          </div>

          <div className="text-[11px] text-white/50 mt-2">Pagos seguros vía PayPal</div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;




