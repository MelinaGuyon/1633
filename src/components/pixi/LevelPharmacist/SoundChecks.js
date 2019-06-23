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
    this.mains.push(this.addComponent(Colliders, { layer: '5bg200', x: -700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_4', 6), name: 'voixoff/chap_4' }))
    this.mains.push(this.addComponent(Colliders, { layer: '5bg200', x: -600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/cat', 8), name: 'effect/cat' }))
    this.mains.push(this.addComponent(Colliders, { layer: '5bg200', x: -100, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/bird', 8), name: 'effect/bird' }))
    this.mains.push(this.addComponent(Colliders, { layer: '5bg200', x: 600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/bird', 8), name: 'effect/bird' }))
    this.mains.push(this.addComponent(Colliders, { layer: '5bg200', x: 700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_4', 6), name: 'voixoff/chap_4' }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
