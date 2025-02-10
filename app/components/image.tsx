type ImageProps = {
  meta: {
    img: {
      src: string;
      w: number;
      h: number;
    };
    sources: {
      [key: string]: string;
    };
  };
  sizes?: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  containerClassName?: string;
};

export function Image({ meta, sizes = '100vw', alt, loading = 'lazy', containerClassName }: ImageProps) {
  return (
    <div className={containerClassName}>
      <picture>
        {Object.entries(meta.sources).map(([type, srcSet]) => (
          <source key={type} type={`image/${type}`} srcSet={srcSet} sizes={sizes} />
        ))}
        <img src={meta.img.src} alt={alt} loading={loading} decoding='async' width={meta.img.w} height={meta.img.h} />
      </picture>
    </div>
  );
}
