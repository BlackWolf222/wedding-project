import { couple } from '../data/content'
import { asset } from '../lib/asset'
import { Countdown } from './Countdown'

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media" aria-hidden="true">
        <img
          src={asset('images/hero.webp')}
          alt=""
          className="hero__img"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">
          <span className="hero__line" />
          Esküvünk
          <span className="hero__line" />
        </p>

        <h1 className="hero__title">
          <span>{couple.bride}</span>
          <span className="hero__amp">&</span>
          <span>{couple.groom}</span>
        </h1>

        <div className="hero__divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <p className="hero__date">{couple.dateLong}</p>
        <p className="hero__venue">{couple.venue}</p>
        <p className="hero__address">{couple.venueAddress}</p>
        <Countdown />
      </div>

      <a href="#tortenet" className="hero__scroll">
        Görgess
        <span className="hero__scroll-line" />
      </a>
    </section>
  )
}
