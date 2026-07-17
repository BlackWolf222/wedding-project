import { asset } from '../lib/asset'

export function About() {
  return (
    <section className="section split split--image-left about">
      <div className="container split__grid">
        <div className="split__media reveal">
          <img
            src={asset('images/about.webp')}
            alt="Móni és Misi"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="split__content reveal">
          <p className="eyebrow eyebrow--line">Rólunk</p>
          <p className="about__lead">
            Mivel mind a ketten megtaláltuk egymásban, amit évek óta kerestünk, ezért úgy
            döntöttünk, hogy összekötjük életünket a házasság jegyében.
          </p>
          <blockquote className="about__quote">
            <p>„Ígérem neked, hogy mindig a tiéd lesz a legjobb részem, amit csak adhatok.”</p>
            <cite>Jay Crownover</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
