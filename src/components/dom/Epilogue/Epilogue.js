import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import sound from 'controllers/sound'
import store from 'state/store'
import logger from 'utils/logger'
import delay from 'lodash/delay'
import anime from 'animejs'

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
            <span class='button magnet' ref={addRef(this, 'skip')}>{loc['epilogue.skip']}</span>
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
    this.launchsound()
    delay(this.updateText.bind(this), 29000)
  }

  launchsound () {
    let path = 'voixoff/epilogue'
    let soundPlay = sound.soundIsPlaying()

    // if there is sound playing
    if (soundPlay.sound) {
      // if we want to launch a different sound OR the actual sound is finished
      if (soundPlay.sound !== path || !soundPlay.playing) {
        // intant temp fix
        sound.stop(soundPlay.sound, { instant: true }) // stop previous sound
        delay(() => {
          sound.play(path)
          sound.setSoundPlay(path)
          this.intervalId = setInterval(() => {
            if (!sound.soundIsPlaying().playing) this.finished()
          }, 500)
        }, 1000)
      }
    } else {
      // nothing was playing, so play
      sound.play(path)
      sound.setSoundPlay(path)
      this.intervalId = setInterval(() => {
        if (!sound.soundIsPlaying().playing) this.finished()
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
    // TODO : sound need to be fixed
    sound.stop('voixoff/epilogue', { instant: true })

    // TODO GO BACK CAROUSEL
    console.log('GAME EPILOGUE FINISH -- BACK TO CAROUSEL')
  }
}
