/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import PixiComponent from 'abstractions/PixiComponent'
import sound from 'controllers/sound'
import signals from 'state/signals'
import delay from 'lodash/delay'

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
	        delay(() => {
            sound.play(path)
            signals.writeSubtitles.dispatch(soundId)
          }, 400)
        }
      } else {
        // nothing was playing, so play
        sound.play(path)
        signals.writeSubtitles.dispatch(soundId)
      }
      sound.setSoundPlay(path)
    }
  }

  stopAllSound () {
	  sound.stop('1_music_studio')
	  sound.stop('2_music_studio')
	  sound.stop('3_music_studio')
	  sound.stop('4_music_studio')
	  sound.stop('5_music_studio')
	  sound.stop('6_music_studio')
	  sound.stop('7_music_studio')
	  sound.stop('8_music_studio')
	  sound.stop('9_music_studio')
	  sound.stop('10_music_studio')
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
