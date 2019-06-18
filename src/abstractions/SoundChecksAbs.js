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
      let indexOfFirst = path.indexOf('effect')
      let indexOfStop = path.indexOf('stopAll')
	    if (indexOfFirst >= 0) {
        if (indexOfStop >= 0) {
          let effectPlay = sound.effectIsPlaying()
          if (effectPlay.sound && effectPlay.playing) this.stopAllEffets()
        } else {
          let effectPlay = sound.effectIsPlaying()
          if (effectPlay.sound) {
            // if we want to launch a different sound OR the actual sound is finished
            if (effectPlay.sound !== path || !effectPlay.playing) {
              sound.stop(effectPlay.sound) // stop previous sound
              sound.play(path)
            }
          } else {
            // nothing was playing, so play
            sound.play(path)
          }
          sound.setEffectPlay(path)
        }
	    } else {
		    let voicePlay = sound.voiceIsPlaying()
		    // if there is sound playing
		    if (voicePlay.sound) {
			    // if we want to launch a different sound OR the actual sound is finished
			    if (voicePlay.sound !== path || !voicePlay.playing) {
				    sound.stop(voicePlay.sound) // stop previous sound
            sound.play(path)
            signals.writeSubtitles.dispatch(soundId)
			    }
		    } else {
			    // nothing was playing, so play
			    sound.play(path)
			    signals.writeSubtitles.dispatch(soundId)
		    }
		    sound.setVoicePlay(path)
	    }
    }
  }

  componentWillUnmount () {
    this.mains = undefined
  }

  stopAllEffets () {
	  sound.stop('effect/crowd')
	  sound.stop('effect/kids')
	  sound.stop('effect/bird')
	  sound.stop('effect/fire')
	  sound.stop('effect/rain')
	  sound.stop('effect/vaisselle')
	  sound.stop('effect/ceremony')
  }
}
