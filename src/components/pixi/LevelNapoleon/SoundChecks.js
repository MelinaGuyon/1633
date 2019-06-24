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
    // 0 = soundId car on veut lancer le son 0
    this.mains.push(this.addComponent(Colliders, { layer: '6bg200', x: -700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.specialPrezCb.bind(this), name: 'voixoff/chap_4_bis' }))
	  // this.mains.push(this.addComponent(Colliders, { layer: '6bg200', x: -600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/cat', 9), name: 'effect/cat' }))
	  // this.mains.push(this.addComponent(Colliders, { layer: '6bg200', x: 600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/cat', 9), name: 'effect/cat' }))
    // this.mains.push(this.addComponent(Colliders, { layer: '6bg200', x: 700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_4_bis', 7), name: 'voixoff/chap_4_bis' }))
  }

  specialPrezCb (state) {
    if (state.collide & !this.prezStop) {
      this.prezStop = true
      document.body.classList.add('prez')
      document.querySelector('main.app').classList.add('prez')
      setTimeout(() => {
        sound.stop('effect/crowd')
        sound.stop('effect/kids')
        sound.stop('effect/bird')
        sound.stop('effect/fire')
        sound.stop('effect/rain')
        sound.stop('effect/vaisselle')
        sound.stop('effect/ceremony')
        store.pause.set({ paused: true, allMuted: false })
      }, 4000)
      setTimeout(() => {
        store.launched.set(false)
        document.querySelector('main.app').classList.remove('prez')
      }, 6000)
    }
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
