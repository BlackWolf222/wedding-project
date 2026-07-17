import type { IconType } from 'react-icons'
import { GiLinkedRings } from 'react-icons/gi'
import {
  PiCakeLight,
  PiCameraLight,
  PiForkKnifeLight,
  PiHighHeelLight,
  PiHouseLight,
  PiMapPinLineLight,
  PiShootingStarLight,
} from 'react-icons/pi'

export const scheduleIconComponents = {
  house: PiHouseLight,
  map: PiMapPinLineLight,
  rings: GiLinkedRings,
  camera: PiCameraLight,
  plate: PiForkKnifeLight,
  cake: PiCakeLight,
  heel: PiHighHeelLight,
  star: PiShootingStarLight,
} as const satisfies Record<string, IconType>
