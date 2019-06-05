/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import PixiComponent from 'abstractions/PixiComponent'
import Colliders from 'abstractions/Colliders'
import sound from 'controllers/sound'
import signals from 'state/signals'

export default class SoundChecks extends PixiComponent {
  setup () {
    this.mains = []
    // ic dans cb :
    // 0 = soundId car on veut lancer le son 0 et on a besoin de l'ID du sound pour savoir quels sous tittre lancer
    this.mains.push(this.addComponent(Colliders, { layer: '1bg100', x: -1300, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/intro', 1), name: 'voixoff/chap_1' }))
    this.mains.push(this.addComponent(Colliders, { layer: '1bg100', x: -1000, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/intro_bis', 2), name: 'voixoff/chap_1' }))
    this.mains.push(this.addComponent(Colliders, { layer: '1bg100', x: -800, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/intro_ter', 3), name: 'voixoff/chap_1' }))
    this.mains.push(this.addComponent(Colliders, { layer: '1bg100', x: -500, y: -100, group: 'sound', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'voixoff/chap_1', 4), name: 'voixoff/chap_1' }))
  }

  cb (path, soundId, state) {
    if (state.collide) {
      let soundPlay = sound.soundIsPlaying()
      // if there is sound playing
      if (soundPlay.sound) {
        // if we want to launch a different sound OR the actual sound is finished
        if (soundPlay.sound !== path || !soundPlay.playing) {
          sound.stop(soundPlay.sound) // stop previous sound
          sound.play(path)
          signals.writeSubtitles.dispatch(soundId)
        }
      } else {
        // nothing was playing, so play
        sound.play(path)
        signals.writeSubtitles.dispatch(soundId)
      }
      sound.setSoundPlay(path)
    }
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
