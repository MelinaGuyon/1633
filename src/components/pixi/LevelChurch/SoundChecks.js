/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import PixiComponent from 'abstractions/PixiComponent'
import Colliders from 'abstractions/Colliders'
import store from 'state/store'
import sound from '../../../controllers/sound'

let soundPlay
let timer = false

export default class SoundChecks extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Colliders, { layer: '2bg600', x: 0, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 's1/s1-1'), name: 's1-1' }))
    // this.mains.push(this.addComponent(Colliders, { layer: '2bg600', x: 800, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 's1/s1-2'), name: 's1-2' }))
  }

  cb (path, state) {
    if (state.collide) {
      if (!timer) {
	      if (soundPlay) {
		      sound.stop(soundPlay)
		      sound.play(path)
	      } else {
		      sound.play(path)
	      }
	      soundPlay = path
	      timer = true
        this.removeTimer()
	      // console.log('sound play', path)
      }
    }
  }

  removeTimer () {
	  setTimeout(function () {
	    timer = false
    }, 5000)
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
