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
      className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8"
      aria-labelledby="youtube-slider-heading"
    >
      <div className="max-w-4xl mx-auto space-y-4 text-center md:text-left">
        <h2
          id="youtube-slider-heading"
          className="text-2xl md:text-3xl font-bold text-white"
        >
          Vídeos recientes en YouTube
        </h2>
        <p className="text-white/85 leading-relaxed">
          Educación financiera en español: ahorro, inversión indexada, comisiones e inflación.
          Suscríbete al canal para nuevas guías y análisis prácticos adaptados a España.
        </p>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors"
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
            <div className="aspect-video rounded-xl overflow-hidden bg-black/40 shadow-lg border border-white/10">
              <iframe
                title={v.title}
                src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-white/90 font-medium leading-snug px-1">{v.title}</p>
            <a
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-300 hover:text-white underline"
            >
              Abrir en YouTube
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
