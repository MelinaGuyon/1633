/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import SoundChecksAbs from 'abstractions/SoundChecksAbs'
import Colliders from 'abstractions/Colliders'
import sound from 'controllers/sound'
import signals from 'state/signals'
import store from 'state/store'

export default class SoundChecks extends SoundChecksAbs {
  setup () {
    this.prezStop = false

    this.mains = []
    // ic dans cb :
    // 0 = soundId car on veut lancer le son 0 et on a besoin de l'ID du sound pour savoir quels sous tittre lancer
    this.mains.push(this.addComponent(Colliders, { layer: '1bg10', x: -550, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_1', 2), name: 'voixoff/chap_1' }))
    this.mains.push(this.addComponent(Colliders, { layer: '1bg10', x: -650, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/crowd', 14), name: 'effect/crowd' }))
    this.mains.push(this.addComponent(Colliders, { layer: '1bg10', x: 600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_1', 2), name: 'voixoff/chap_1' }))
    this.mains.push(this.addComponent(Colliders, { layer: '1bg10', x: 700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/crowd', 14), name: 'effect/crowd' }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
