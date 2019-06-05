/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import PixiComponent from 'abstractions/PixiComponent'
import sound from 'controllers/sound'
import signals from 'state/signals'

export default class SoundChecksAbs extends PixiComponent {
  setup () {
    this.mains = []
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
