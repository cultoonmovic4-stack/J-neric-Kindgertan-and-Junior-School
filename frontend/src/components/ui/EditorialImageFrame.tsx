import { useState } from 'react';

interface EditorialImageFrameProps {
  src: string;
  alt: string;
  caption: string;
  fallbackLabel?: string;
  fallbackTitle: string;
  fallbackDetail?: string;
  aspectClass?: string;
}

export function EditorialImageFrame({
  src,
  alt,
  caption,
  fallbackLabel = 'Campus Photograph Archive',
  fallbackTitle,
  fallbackDetail = 'Namulanda Ward, Kajjansi Town Council',
  aspectClass = 'aspect-[4/3]',
}: EditorialImageFrameProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);

  return (
    <figure className="bg-pure-white border border-rule-gray rounded-[3px] p-2">
      <div
        className={`relative w-full overflow-hidden rounded-[2px] bg-paper-ivory border border-rule-gray ${aspectClass}`}
      >
        {!imageUnavailable ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageUnavailable(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full p-5 sm:p-6 flex flex-col justify-between bg-paper-ivory">
            <div className="h-full w-full border border-rule-gray bg-pure-white p-5 sm:p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 border-b border-rule-gray pb-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-crest-crimson">
                  {fallbackLabel}
                </span>
                <span className="font-serif text-[11px] font-bold text-crest-navy">
                  J-Neric
                </span>
              </div>

              <div className="my-auto py-4">
                <p className="font-serif text-lg sm:text-xl font-bold text-crest-navy leading-snug">
                  {fallbackTitle}
                </p>
                <p className="mt-2 text-xs text-muted-slate leading-relaxed">
                  {fallbackDetail}
                </p>
              </div>

              <div className="border-t border-rule-gray pt-2.5 flex items-center justify-between text-[11px] text-muted-slate">
                <span className="font-serif italic text-crest-navy">
                  &ldquo;Nurture with Love&rdquo;
                </span>
                <span className="font-mono text-[10px] text-muted-slate">
                  {src.replace('/images/', 'images/')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <figcaption className="pt-2.5 pb-1 px-1 text-xs text-muted-slate leading-relaxed flex items-start justify-between gap-3">
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
