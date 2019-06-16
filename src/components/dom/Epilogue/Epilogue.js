import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import sound from 'controllers/sound'
import store from 'state/store'
import logger from 'utils/logger'
import delay from 'lodash/delay'
import anime from 'animejs'
import signals from 'state/signals'

import './Epilogue.styl'

export default class Epilogue extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()
    return (
      <section class='epilogue' ref={addRef(this, 'epilogue')}>
        <div class='container'>
          <p class='centerText'>
            <span class='text' ref={addRef(this, 'text')}>{loc['epilogue.text1']}</span>
            <br />
            <span class='button' ref={addRef(this, 'skip')}>{loc['epilogue.skip']}</span>
          </p>
        </div>
      </section>
    )
  }

  componentDidMount () {
    logger('Epilogue did mount', '#47b342').log()
    this.bind()
  }

  bind () {
    this.listenStore('ended', this.launchEpilogue)
    this.skip.addEventListener('click', this.fastbind('finished', 1))
  }

  unbind () {
    this.unlistenStore('ended', this.launchEpilogue)
    this.skip.removeEventListener('click', this.finished)
  }

  launchEpilogue () {
    this.base.classList.add('visible')
    this.skip.classList.add('magnet')
    signals.newDom.dispatch()
    this.launchsound()
    delay(this.updateText.bind(this), 29500)
  }

  launchsound () {
    let path = 'voixoff/epilogue'
    let voicePlay = sound.voiceIsPlaying()

    let effectPlay = sound.effectIsPlaying()

    if (effectPlay.sound) {
      sound.stop(effectPlay.sound) // stop previous effect
    }

    // if there is sound playing
    if (voicePlay.sound) {
      // if we want to launch a different sound OR the actual sound is finished
      if (voicePlay.sound !== path || !voicePlay.playing) {
        // intant temp fix
        console.log('epilogue, je stop sound et je play')
        sound.stop(voicePlay.sound) // stop previous sound
        delay(() => {
          sound.play(path)
          sound.setVoicePlay(path)
          this.intervalId = setInterval(() => {
            if (!sound.voiceIsPlaying().playing) this.finished()
          }, 500)
        }, 1500)
      }
    } else {
      // nothing was playing, so play
      console.log('epilogue, nothing was playing')
      sound.play(path)
      sound.setVoicePlay(path)
      this.intervalId = setInterval(() => {
        if (!sound.voiceIsPlaying().playing) this.finished()
      }, 500)
    }
  }

  updateText () {
    const loc = store.loc.get()
    anime({
      targets: [this.text, this.skip],
      duration: 600,
      opacity: 0,
      easing: 'easeOutQuad',
      complete: () => {
        this.text.innerText = loc['epilogue.text2']
        signals.newDom.dispatch()
        anime({
          targets: [this.text, this.skip],
          duration: 600,
          opacity: 1,
          delay: 200,
          easing: 'easeOutQuad'
        })
      }
    })
  }

  finished () {
    clearInterval(this.intervalId)
    this.unbind()
    sound.stop('voixoff/epilogue')

    // TODO GO BACK CAROUSEL
    console.log('GAME EPILOGUE FINISH -- BACK TO CAROUSEL')
  }
}
