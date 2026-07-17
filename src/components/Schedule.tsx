import { schedule, scheduleClosing } from '../data/content'
import { scheduleIconComponents } from './ScheduleIcons'

export function Schedule() {
  const ClosingIcon = scheduleIconComponents.star

  return (
    <section id="menetrend" className="section schedule">
      <div className="container container--narrow">
        <p className="eyebrow reveal">Az esküvő napja</p>
        <h2 className="section__title reveal">A nap menetrendje</h2>

        <ul className="schedule__list reveal">
          {schedule.map((item) => {
            const Icon = scheduleIconComponents[item.icon]

            return (
              <li key={item.time + item.title}>
                <time>{item.time}</time>
                <span className="schedule__icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  {item.note ? <span>{item.note}</span> : null}
                </div>
              </li>
            )
          })}
        </ul>

        <p className="schedule__closing reveal">
          <span className="schedule__closing-icon" aria-hidden="true">
            <ClosingIcon />
          </span>
          {scheduleClosing}
        </p>
      </div>
    </section>
  )
}
