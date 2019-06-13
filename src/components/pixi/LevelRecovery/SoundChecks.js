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
    this.mains.push(this.addComponent(Colliders, { layer: '7bg200', x: -800, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_4_ter', 10), name: 'voixoff/chap_4_ter' }))
    this.mains.push(this.addComponent(Colliders, { layer: '7bg200', x: -600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/vaisselle', 10), name: 'effect/vaisselle' }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
