
import { Signal } from '@internet/state'

const signals = {
  // Will trigger Hero jump
  tap: new Signal(),

  // Triggered when the hero collide with a block
  collide: new Signal()
}

export default signals
