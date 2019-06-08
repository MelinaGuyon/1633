/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import SoundChecksAbs from 'abstractions/SoundChecksAbs'
import Colliders from 'abstractions/Colliders'
import sound from 'controllers/sound'
import signals from 'state/signals'

export default class SoundChecks extends SoundChecksAbs {
  setup () {
    this.mains = []
    // ic dans cb :
    // 0 = soundId car on veut lancer le son 0
    this.mains.push(this.addComponent(Colliders, { layer: '4bg200', x: -500, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_3', 0), name: 'voixoff/chap_3' }))
    this.mains.push(this.addComponent(Colliders, { layer: '4bg200', x: -400, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/fire', 0), name: 'effect/fire' }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
