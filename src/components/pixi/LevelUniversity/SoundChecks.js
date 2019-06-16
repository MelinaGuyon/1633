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
    this.mains.push(this.addComponent(Colliders, { layer: '1bg10', x: -700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_1', 4), name: 'voixoff/chap_1' }))
    this.mains.push(this.addComponent(Colliders, { layer: '1bg10', x: -800, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/crowd', 14), name: 'effect/crowd' }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
