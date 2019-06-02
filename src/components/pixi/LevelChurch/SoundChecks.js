/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import PixiComponent from 'abstractions/PixiComponent'
import Colliders from 'abstractions/Colliders'
import sound from 'controllers/sound'
import signals from 'state/signals'

export default class SoundChecks extends PixiComponent {
  setup () {
    this.mains = []
    // ic dans cb :
    // 0 = soundId car on veut lancer le son 0
    // 0 = collidersId car c'est le colliders 0 de cette classe
    this.mains.push(this.addComponent(Colliders, { layer: '2bg100', x: -100, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 's1/s1-1', 0, 0), name: 's1-1' }))
  }

  cb (path, soundId, collidersId, state) {
    if (state.collide) {
      let soundPlay = sound.soundIsPlaying()
      if (soundPlay) {
        sound.stop(soundPlay)
        sound.play(path)
      } else {
        sound.play(path)
      }
      // remove colliders body to prevent other collide
      this.components[collidersId].removeBody()
      signals.writeSubtitles.dispatch(soundId)
      sound.setSoundPlay(path)
    }
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
