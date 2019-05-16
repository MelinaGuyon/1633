
import { Signal } from '@internet/state'

const signals = {
  goLeft: new Signal(),
  goRight: new Signal(),
  space: new Signal(),
  moving: new Signal(),
  stop: new Signal()
}

export default signals
