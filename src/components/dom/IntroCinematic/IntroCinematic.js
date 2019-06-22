import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import sound from 'controllers/sound'
import store from 'state/store'
import signals from 'state/signals'
import logger from 'utils/logger'
import delay from 'lodash/delay'
import anime from 'animejs'

import './IntroCinematic.styl'

export default class IntroCinematic extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()
    return (
      <section class='intro-cinematic' ref={addRef(this, 'cinematic')}>
        <div class='cinematique-container' ref={addRef(this, 'container')}>
          {/* <p ref={addRef(this, 'item0')}>{loc['cinematic.text']}</p> */}
          <img class='first' src='assets/img/cinematic/01.jpg' ref={addRef(this, 'item0')} alt='' />
          <img class='second' src='assets/img/cinematic/02.jpg' ref={addRef(this, 'item1')} alt='' />
          <img class='third' src='assets/img/cinematic/03.jpg' ref={addRef(this, 'item2')} alt='' />
        </div>
        <div class='vignet' />
      </section>
    )
  }

  componentDidMount () {
    logger('IntroCinematic did mount', '#47b342').log()
  }

  start () {
    return new Promise((resolve) => {
      delay(() => {
        this.base.classList.add('visible')
        this.play('voixoff/intro', 0, 35000)
        this.resolve = resolve
      }, 1000)
    })
  }

  play (path, number, time) {
    let zoom
    if (number === 0) zoom = [1, 1.1]
    else if (number === 1) zoom = [1.2, 1]
    else zoom = [1, 1.45]

    anime({
      targets: this['item' + number],
      duration: time,
      scale: zoom,
      translateX: ['-50%', '-50%'],
      translateY: ['-50%', '-50%'],
      delay: 1000,
      easing: 'easeInOutQuad'
    })

    anime({
      targets: this['item' + number],
      opacity: 1,
      duration: 1400,
      easing: 'easeInOutQuad'
    })

    delay(() => {
      signals.writeSubtitles.dispatch((number + 1))
      sound.play(path)
      sound.setVoicePlay(path)
      this.intervalId = setInterval(() => {
        if (!sound.voiceIsPlaying().playing) this.finished(number)
      }, 500)
    }, 500)
  }

  finished (number) {
    clearInterval(this.intervalId)
    if (number === 0) delay(() => { this.play('voixoff/intro_bis', 1, 8000) }, 1000)
    else if (number === 1) this.play('voixoff/intro_ter', 2, 16000)
    else {
      anime({
        targets: this.base,
        opacity: 0,
        duration: 600,
        delay: 200,
        easing: 'easeOutQuad',
        complete: () => {
          this.resolve()
          this.base.classList.remove('visible')
          this.base.removeAttribute('style')
          anime({
            targets: [this.item0, this.item1, this.item2],
            opacity: 0,
            duration: 0,
            easing: 'easeInOutQuad'
          })
        }
      })
    }
  }
}
