import { asset } from '../lib/asset'

export function Story() {
  return (
    <section id="tortenet" className="section split split--image-right story">
      <div className="container split__grid">
        <div className="split__content reveal">
          <p className="eyebrow eyebrow--line">A mi történetünk</p>
          <h2 className="section__title">Egy szerelem története</h2>
          <p className="section__lead">
            Hat évvel ezelőtt, egy véletlennek tűnő pillanatban találkoztunk — azóta tudjuk, hogy
            semmi sem volt véletlen. Közös kalandok, nevetések, álmok és tervek szőtték össze az
            életünket, és most eljött az a nap, amikor mindenki előtt kimondhatjuk: igen, ő az.
          </p>
          <p className="story__closing">
            Szeretnénk veletek ünnepelni ezt a különleges napot.
          </p>
        </div>

        <div className="split__media reveal">
          <img
            src={asset('images/story.webp')}
            alt="Móni és Misi"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
