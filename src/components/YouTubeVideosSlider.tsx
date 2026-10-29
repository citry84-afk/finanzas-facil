const CHANNEL_URL = 'https://www.youtube.com/@FinanzasMuyF%C3%A1ciles';

/** Vídeos recientes del canal (IDs y títulos alineados con el feed público del canal). */
const FEATURED_VIDEOS: { id: string; title: string }[] = [
  {
    id: 'EXqfglIhFtE',
    title: 'Invertir desde CERO: Acciones, Fondos, ETFs explicados simple',
  },
  {
    id: 'KWWh_5oFbow',
    title: 'Primer salario 1.200 €: cómo gestionarlo para construir patrimonio',
  },
  {
    id: 'jFAqZi8M3sQ',
    title: 'Benjamin Graham: value investing y margen de seguridad',
  },
  {
    id: '32Xlj05kvYU',
    title: 'Peter Lynch: cómo el inversor particular puede ganar a Wall Street',
  },
  {
    id: 'IMb38IJnFBQ',
    title: 'TER 2 %: por qué las comisiones pueden erosionar tu patrimonio',
  },
  {
    id: 'BTED-vqkJrI',
    title: 'Rentabilidad real vs nominal: efecto de la inflación',
  },
];

type Props = {
  maxVideos?: number;
};

export default function YouTubeVideosSlider({ maxVideos = 6 }: Props) {
  const videos = FEATURED_VIDEOS.slice(0, Math.min(maxVideos, FEATURED_VIDEOS.length));

  return (
    <section
      className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8"
      aria-labelledby="youtube-slider-heading"
    >
      <div className="max-w-4xl mx-auto space-y-4 text-center md:text-left">
        <p className="text-sm font-semibold text-blue-600">Canal de YouTube</p>
        <h2
          id="youtube-slider-heading"
          className="text-3xl font-semibold tracking-normal text-slate-950 md:text-5xl"
        >
          Aprende a tu ritmo.
        </h2>
        <p className="text-lg leading-relaxed text-slate-600">
          Educación financiera en español: ahorro, inversión indexada, comisiones e inflación.
          Suscríbete al canal para nuevas guías y análisis prácticos adaptados a España.
        </p>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Ver canal en YouTube
        </a>
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {videos.map((v) => (
          <div
            key={v.id}
            className="flex-shrink-0 w-[min(100%,22rem)] snap-start space-y-3"
          >
            <div className="aspect-video overflow-hidden rounded-3xl bg-slate-950 shadow-sm ring-1 ring-black/10">
              <iframe
                title={v.title}
                src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-sm font-medium leading-snug text-slate-800 px-1">{v.title}</p>
            <a
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Abrir en YouTube
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
