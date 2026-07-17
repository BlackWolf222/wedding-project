import { useEffect, useRef, useState } from 'react'
import { couple } from '../data/content'

type Parts = {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function getCountdown(target: Date, now = new Date()): Parts {
  if (now.getTime() >= target.getTime()) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }

  let months =
    (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth())

  const afterMonths = new Date(now.getTime())
  afterMonths.setMonth(afterMonths.getMonth() + months)

  if (afterMonths.getTime() > target.getTime()) {
    months -= 1
    afterMonths.setTime(now.getTime())
    afterMonths.setMonth(afterMonths.getMonth() + months)
  }

  let remaining = target.getTime() - afterMonths.getTime()
  const dayMs = 1000 * 60 * 60 * 24
  const hourMs = 1000 * 60 * 60
  const minuteMs = 1000 * 60

  const days = Math.floor(remaining / dayMs)
  remaining -= days * dayMs
  const hours = Math.floor(remaining / hourMs)
  remaining -= hours * hourMs
  const minutes = Math.floor(remaining / minuteMs)
  remaining -= minutes * minuteMs
  const seconds = Math.floor(remaining / 1000)

  return { months, days, hours, minutes, seconds, done: false }
}

const labels = [
  { key: 'months', label: 'Hónap' },
  { key: 'days', label: 'Nap' },
  { key: 'hours', label: 'Óra' },
  { key: 'minutes', label: 'Perc' },
  { key: 'seconds', label: 'Másodperc' },
] as const

function AnimatedValue({ value }: { value: number }) {
  const display = String(value).padStart(2, '0')
  const prevRef = useRef(display)
  const [outgoing, setOutgoing] = useState<string | null>(null)
  const [incoming, setIncoming] = useState(display)

  useEffect(() => {
    if (display === prevRef.current) return

    setOutgoing(prevRef.current)
    setIncoming(display)
    prevRef.current = display

    const id = window.setTimeout(() => setOutgoing(null), 420)
    return () => window.clearTimeout(id)
  }, [display])

  return (
    <span className="countdown__value">
      {outgoing ? (
        <span className="countdown__digit countdown__digit--out" aria-hidden="true">
          {outgoing}
        </span>
      ) : null}
      <span key={incoming} className="countdown__digit countdown__digit--in">
        {incoming}
      </span>
    </span>
  )
}

export function Countdown() {
  const [parts, setParts] = useState<Parts>(() => getCountdown(couple.countdownTarget))

  useEffect(() => {
    const tick = () => setParts(getCountdown(couple.countdownTarget))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  if (parts.done) {
    return (
      <div className="countdown" role="status">
        <p className="countdown__done">Ma van a nagy nap!</p>
      </div>
    )
  }

  return (
    <div className="countdown" role="timer" aria-live="polite">
      {labels.map(({ key, label }) => (
        <div key={key} className="countdown__unit">
          <AnimatedValue value={parts[key]} />
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  )
}
