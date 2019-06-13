/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import SoundChecksAbs from 'abstractions/SoundChecksAbs'
import Colliders from 'abstractions/Colliders'
import sound from 'controllers/sound'
import signals from 'state/signals'

export default class SoundChecks extends SoundChecksAbs {
  setup () {
    this.mains = []
    // ic dans cb :
    this.mains.push(this.addComponent(Colliders, { layer: '2bg100', x: -800, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_2', 5), name: 'voixoff/chap_2' }))
    this.mains.push(this.addComponent(Colliders, { layer: '2bg100', x: -600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/kids', 5), name: 'effect/kids' }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
