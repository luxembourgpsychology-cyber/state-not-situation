import Image from "next/image";

/**
 * The book, built in CSS 3D from the real printed artwork: front cover, spine,
 * back cover, page block, and page 3 (the title page) inside.
 *
 * Presentational only. It reads a `--open` custom property from any ancestor:
 * 0 = shut, 1 = open. Nothing here animates on its own, so the same component
 * can sit still on the press page or be driven by scroll in the hero.
 */
export function Book3D({
  coverAlt,
  titleA,
  titleB,
  strapline,
  author,
  publisher,
  className = "",
  priority = false,
}: {
  coverAlt: string;
  titleA: string;
  titleB: string;
  strapline: string;
  author: string;
  publisher: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`book-stage ${className}`}>
      <div className="book">
        {/* Back cover */}
        <div className="book__face book__back" aria-hidden="true" />

        {/* Spine, hinging the two boards together */}
        <div className="book__spine" aria-hidden="true">
          <Image src="/images/cover-spine.jpg" alt="" fill sizes="40px" className="object-cover" />
        </div>

        {/* The page block. Its face is page 3, the title page. */}
        <div className="book__block" aria-hidden={true}>
          <div className="book__titlepage">
            <p className="book__strap">{strapline}</p>
            <p className="book__titlepage-title">
              <span>{titleA}</span>
              <span>{titleB}</span>
            </p>
            <p className="book__imprint">
              <span>{author}</span>
              <span>{publisher}</span>
            </p>
          </div>
        </div>

        {/* Fore edge: the stacked leaves you see when the book is open */}
        <div className="book__edge" aria-hidden="true" />

        {/* Front board. Outside is the cover, inside is the endpaper. */}
        <div className="book__cover">
          <div className="book__face book__cover-outer">
            <Image
              src="/images/cover-front.jpg"
              alt={coverAlt}
              fill
              priority={priority}
              sizes="(max-width: 767px) 46vw, (max-width: 1279px) 30vw, 360px"
              className="object-cover"
            />
            <span className="book__gloss" aria-hidden="true" />
          </div>
          <div className="book__face book__cover-inner" aria-hidden="true" />
        </div>
      </div>
      <div className="book__shadow" aria-hidden="true" />
    </div>
  );
}
