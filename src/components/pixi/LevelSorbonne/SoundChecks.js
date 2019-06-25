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
      this.mains.push(this.addComponent(Colliders, { layer: '7bg200', x: -700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.specialPrezCb.bind(this), name: 'voixoff/chap_6' }))
    } else {
      this.mains.push(this.addComponent(Colliders, { layer: '9bg200', x: -700, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_6', 10), name: 'voixoff/chap_6' }))
      this.mains.push(this.addComponent(Colliders, { layer: '9bg200', x: -400, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/rain', 12), name: 'effect/rain' }))
      this.mains.push(this.addComponent(Colliders, { layer: '9bg200', x: 600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'effect/rain', 12), name: 'effect/rain' }))
      this.mains.push(this.addComponent(Colliders, { layer: '9bg200', x: 600, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_6', 10), name: 'voixoff/chap_6' }))
    }
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
