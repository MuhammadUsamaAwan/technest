import { cn } from '~/lib/utils';

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
  imageClassName?: string;
};

export function Image({
  meta,
  sizes = '100vw',
  alt,
  loading = 'lazy',
  containerClassName,
  imageClassName,
}: ImageProps) {
  return (
    <div className={containerClassName}>
      <picture>
        {Object.entries(meta.sources).map(([type, srcSet]) => (
          <source key={type} type={`image/${type}`} srcSet={srcSet} sizes={sizes} />
        ))}
        <img
          className={cn('h-full w-full object-cover object-center', imageClassName)}
          src={meta.img.src}
          alt={alt}
          loading={loading}
          decoding='async'
          width={meta.img.w}
          height={meta.img.h}
        />
      </picture>
    </div>
  );
}
