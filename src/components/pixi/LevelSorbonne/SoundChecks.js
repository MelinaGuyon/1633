/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import SoundChecksAbs from 'abstractions/SoundChecksAbs'
import Colliders from 'abstractions/Colliders'
import sound from 'controllers/sound'
import signals from 'state/signals'

export default class SoundChecks extends SoundChecksAbs {
  setup () {
    this.mains = []
    // ic dans cb :
    // 1 = soundId car on veut lancer le son 1
    this.mains.push(this.addComponent(Colliders, { layer: '9bg200', x: -500, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_6', 1), name: 'voixoff/chap_6' }))
	  this.mains.push(this.addComponent(Colliders, { layer: '9bg200', x: -300, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/rain', 0), name: 'effect/rain' }))

  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
