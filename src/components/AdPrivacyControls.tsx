import { useState } from 'react';
import { isNativeAdPlatform, openAdPrivacyChoices } from '../services/admob';

export default function AdPrivacyControls() {
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!isNativeAdPlatform()) return null;

  const openChoices = async () => {
    setBusy(true);
    setMessage(null);
    const opened = await openAdPrivacyChoices();
    setMessage(opened ? 'Preferencias de anuncios actualizadas.' : 'No hay un formulario de anuncios disponible para tu región.');
    setBusy(false);
  };

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <p className="mb-3 text-blue-900">
        En la app móvil puedes revisar las opciones que Google tenga disponibles para tu región.
      </p>
      <button
        type="button"
        onClick={openChoices}
        disabled={busy}
        className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? 'Abriendo...' : 'Gestionar privacidad de anuncios'}
      </button>
      {message && <p className="mt-3 text-sm text-blue-800" role="status">{message}</p>}
    </div>
  );
}
