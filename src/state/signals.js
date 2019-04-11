
import { Signal } from '@internet/state'

const signals = {
  goLeft: new Signal(),
  goRight: new Signal(),
  stop: new Signal(),
  // Will trigger Hero jump
  tap: new Signal(),

  // Triggered when the hero collide with a block
  collide: new Signal()
}

export default signals
