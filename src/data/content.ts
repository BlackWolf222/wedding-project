import { asset } from '../lib/asset'

export const couple = {
  bride: 'Móni',
  groom: 'Misi',
  names: 'Móni & Misi',
  date: '2026. augusztus 29.',
  dateLong: '2026. augusztus 29. · szombat',
  year: '2026',
  venue: 'Bátaapáti, Deák Ferenc utca 1. · Naspolya Panzió',
  venueShort: 'Naspolya Panzió',
  /** Local time: 2026-08-29 17:00 */
  countdownTarget: new Date(2026, 7, 29, 17, 0, 0),
}


export const navLinks = [
  { href: '#tortenet', label: 'Történetünk' },
  { href: '#pillanatok', label: 'Pillanatok' },
  { href: '#menetrend', label: 'Menetrend' },
  { href: '#tudnivalok', label: 'Tudnivalók' },
] as const

export const gallery = [
  { src: asset('images/gallery-old-02.webp'), caption: '' },
  { src: asset('images/gallery-old-03.webp'), caption: '' },
  { src: asset('images/gallery-old-05.webp'), caption: '' },
  { src: asset('images/gallery-old-06.webp'), caption: '' },
  { src: asset('images/gallery-old-01.webp'), caption: '' },
  { src: asset('images/gallery-old-04.webp'), caption: '' },
  { src: asset('images/gallery-01.webp'), caption: '' },
  { src: asset('images/gallery-02.webp'), caption: '' },
  { src: asset('images/gallery-03.webp'), caption: '' },
  { src: asset('images/gallery-06.webp'), caption: '', wide: true },
  { src: asset('images/gallery-04.webp'), caption: '' },
  { src: asset('images/gallery-05.webp'), caption: '' },
  { src: asset('images/gallery-07.webp'), caption: '' },
  { src: asset('images/gallery-08.webp'), caption: '' },
  { src: asset('images/gallery-09.webp'), caption: '' },
  { src: asset('images/gallery-10.webp'), caption: '' },
  { src: asset('images/gallery-11.webp'), caption: '' },
  { src: asset('images/gallery-12.webp'), caption: '' },
  { src: asset('images/gallery-13.webp'), caption: '' },
  { src: asset('images/gallery-14.webp'), caption: '' },
]

export const schedule = [
  {
    time: '14:00',
    title: 'Vendégvárás, Kikérő',
    note: 'Helyszín: Decs, Babits Mihály utca 20.',
    icon: 'house',
  },
  {
    time: '15:30',
    title: 'Indulás Bátaapátiba',
    note: '',
    icon: 'map',
  },
  {
    time: '17:00',
    title: 'Szertartás a Panzió udvarán',
    note: '',
    icon: 'rings',
  },
  {
    time: '17:30',
    title: 'Fotózás',
    note: '',
    icon: 'camera',
  },
  {
    time: '19:00',
    title: 'Ünnepi vacsora',
    note: '',
    icon: 'plate',
  },
  {
    time: '22:00',
    title: 'Torta',
    note: '',
    icon: 'cake',
  },
  {
    time: '23:00',
    title: 'Menyasszonytánc',
    note: '',
    icon: 'heel',
  },
] as const

export const scheduleClosing = 'Mulatás reggelig...'

export const accommodation = {
  title: 'Szállás',
  paragraphs: [
    'Akik szállást foglaltak a panzióban, 29.-én szombaton 13.00-tól foglalhatják el a szobáikat.',
    'A szobákat vasárnap délelőtt 10.00-ig kell elhagyni.',
    'Azok a vendégek, akik pár nappal előbb érkeznek, kérhetnek étkezést a szálláson.',
  ],
  meals: [
    {
      name: 'Reggeli / svédasztal',
      detail: '8.00–9.30 · 2.950 Ft/fő',
    },
    {
      name: 'Félpanzió / reggeli + 2 fogásos vacsora',
      detail: '17.00–18.30 · 6.950 Ft/fő',
    },
  ],
  note: 'Az igényeket érkezés előtt 2 nappal kérjük jelezzétek.',
}

export const infoCards = [
  {
    title: 'Fotózás',
    text: 'A nap során bátran fotózzatok — nekünk minden közös pillanat értékes. Emellett hivatásos fotós is jelen lesz, aki a hivatalos képeket készíti. A ti fotóitokat a lenti feltöltővel kérjük a közös mappába feltölteni, hogy mindannyian élvezhessük őket.',
  },
]
