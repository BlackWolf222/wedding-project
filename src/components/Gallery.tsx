import { gallery } from '../data/content'

export function Gallery() {
  return (
    <section id="pillanatok" className="section gallery">
      <div className="container">
        <p className="eyebrow reveal">Képek</p>
        <h2 className="section__title reveal">A legszebb pillanataink</h2>

        <div className="gallery__grid">
          {gallery.map((item) => (
            <figure
              key={item.src}
              className={`gallery__item reveal${'wide' in item && item.wide ? ' gallery__item--wide' : ''}`}
            >
              <img
                src={item.src}
                alt="Móni és Misi"
                loading="lazy"
                decoding="async"
              />
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
