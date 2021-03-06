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
    this.mains.push(this.addComponent(Colliders, { layer: '11bg200', x: -700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_8', 12), name: 'voixoff/chap_8' }))
    this.mains.push(this.addComponent(Colliders, { layer: '11bg200', x: -400, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/photo', 14), name: 'effect/photo' }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
