import { PiBedLight, PiCameraLight } from 'react-icons/pi'
import { accommodation, infoCards } from '../data/content'
import { PhotoUpload } from './PhotoUpload'

export function Info() {
  return (
    <section id="tudnivalok" className="section info">
      <div className="container">
        <p className="eyebrow reveal">Praktikus infók</p>
        <h2 className="section__title reveal">Legfontosabb tudnivalók</h2>

        <div className="info__stay-block reveal">
          <article className="info__stay">
            <h3 className="info__heading">
              <PiBedLight className="info__icon" aria-hidden="true" />
              <span>{accommodation.title}</span>
            </h3>
            {accommodation.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>

          <aside className="info__meals-panel">
            <ul className="info__meals">
              {accommodation.meals.map((meal) => (
                <li key={meal.name}>
                  <strong>{meal.name}</strong>
                  <span>{meal.detail}</span>
                </li>
              ))}
            </ul>
            <p className="info__note">{accommodation.note}</p>
          </aside>
        </div>

        {infoCards.map((card) => (
          <article key={card.title} className="info__card reveal">
            <h3 className="info__heading">
              <PiCameraLight className="info__icon" aria-hidden="true" />
              <span>{card.title}</span>
            </h3>
            <p>{card.text}</p>
          </article>
        ))}

        <div className="info__upload reveal">
          <PhotoUpload />
        </div>
      </div>
    </section>
  )
}
