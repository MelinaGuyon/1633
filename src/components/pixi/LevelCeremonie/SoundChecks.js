/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import SoundChecksAbs from 'abstractions/SoundChecksAbs'
import Colliders from 'abstractions/Colliders'
import sound from 'controllers/sound'
import signals from 'state/signals'
import store from 'state/store'

export default class SoundChecks extends SoundChecksAbs {
  setup () {
    this.mains = []
    // ic dans cb :
    // 1 = soundId car on veut lancer le son 1
    if (store.isPrez.get()) {
      this.mains.push(this.addComponent(Colliders, { layer: '6bg200', x: -700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_5', 9), name: 'voixoff/chap_5' }))
      this.mains.push(this.addComponent(Colliders, { layer: '6bg200', x: -600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/ceremony', 11), name: 'effect/ceremony' }))
      this.mains.push(this.addComponent(Colliders, { layer: '6bg200', x: 600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/ceremony', 11), name: 'effect/ceremony' }))
      this.mains.push(this.addComponent(Colliders, { layer: '6bg200', x: 700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_5', 9), name: 'voixoff/chap_5' }))
    } else {
      this.mains.push(this.addComponent(Colliders, { layer: '8bg200', x: -700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_5', 9), name: 'voixoff/chap_5' }))
      this.mains.push(this.addComponent(Colliders, { layer: '8bg200', x: -600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/ceremony', 11), name: 'effect/ceremony' }))
      this.mains.push(this.addComponent(Colliders, { layer: '8bg200', x: 600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/ceremony', 11), name: 'effect/ceremony' }))
      this.mains.push(this.addComponent(Colliders, { layer: '8bg200', x: 700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_5', 9), name: 'voixoff/chap_5' }))
    }
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
