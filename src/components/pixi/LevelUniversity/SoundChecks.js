/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import SoundChecksAbs from 'abstractions/SoundChecksAbs'
import Colliders from 'abstractions/Colliders'
import sound from 'controllers/sound'
import signals from 'state/signals'

export default class SoundChecks extends SoundChecksAbs {
  setup () {
    this.mains = []
    // ic dans cb :
    // 0 = soundId car on veut lancer le son 0 et on a besoin de l'ID du sound pour savoir quels sous tittre lancer
    //this.mains.push(this.addComponent(Colliders, { layer: '1bg100', x: -1300, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/intro', 1), name: 'voixoff/chap_1' }))
    //this.mains.push(this.addComponent(Colliders, { layer: '1bg100', x: -1000, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/intro_bis', 2), name: 'voixoff/chap_1' }))
    //this.mains.push(this.addComponent(Colliders, { layer: '1bg100', x: -800, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/intro_ter', 3), name: 'voixoff/chap_1' }))
    this.mains.push(this.addComponent(Colliders, { layer: '1bg100', x: -500, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_1', 4), name: 'voixoff/chap_1' }))
    this.mains.push(this.addComponent(Colliders, { layer: '1bg100', x: -600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/crowd', 4), name: 'effect/crowd' }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
