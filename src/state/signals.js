
import { Signal } from '@internet/state'

const signals = {
  goLeft: new Signal(),
  goRight: new Signal(),
  space: new Signal(),
  moving: new Signal(),
  stop: new Signal(),
  newDom: new Signal(),
  newIndication: new Signal(),
  writeSubtitles: new Signal(),
  factUnlock: new Signal()
}

export default signals
