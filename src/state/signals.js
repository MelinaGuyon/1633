
import { Signal } from '@internet/state'

const signals = {
  soundLoaded: new Signal(),
  goLeft: new Signal(),
  goRight: new Signal(),
  space: new Signal(),
  moving: new Signal(),
  stop: new Signal(),
  animePersoFinished: new Signal(),
  newDom: new Signal(),
  newIndication: new Signal(),
  writeSubtitles: new Signal(),
  factUnlock: new Signal(),
  factUnlockEnd: new Signal(),
  activeTuto: new Signal(),
  soundSeeked: new Signal(),
  mouseWheelEnd: new Signal(),
  moreNoise: new Signal()
}

export default signals
