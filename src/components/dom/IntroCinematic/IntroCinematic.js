import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import sound from 'controllers/sound'
import store from 'state/store'
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
          <p ref={addRef(this, 'item0')}>{loc['cinematic.text']}</p>
          <img class='second' src='assets/img/cinematic/pharmacie.png' ref={addRef(this, 'item1')} alt='' />
          <img class='third' src='assets/img/cinematic/photographie.png' ref={addRef(this, 'item2')} alt='' />
        </div>
      </section>
    )
  }

  componentDidMount () {
    logger('IntroCinematic did mount', '#47b342').log()
  }

  start () {
    return new Promise((resolve, reject) => {
      sound.play('3_music_studio')
      delay(() => {
        this.base.classList.add('visible')
        this.play('voixoff/intro', 0)
        this.resolve = resolve
      }, 4000)
    })
  }

  play (path, number) {
    let zoom
    if (number === 0) zoom = [1, 1]
    else if (number === 1) zoom = [1.2, 1]
    else zoom = [1, 1.2]

    anime({
      targets: [this.item0, this.item1, this.item2],
      opacity: 0,
      duration: 300,
      easing: 'easeInOutQuad',
      complete: () => {
        this.container.style.transform = `scale(${zoom[0]})`
        anime({
          targets: this.container,
          duration: 8000,
          scale: zoom,
          delay: 1000,
          easing: 'easeInOutQuad'
        })

        sound.play(path)
        sound.setSoundPlay(path)
        this.intervalId = setInterval(() => {
          if (!sound.soundIsPlaying().playing) this.finished(number)
        }, 500)
      }
    })

    anime({
      targets: this['item' + number],
      opacity: 1,
      duration: 600,
      delay: 500,
      easing: 'easeInOutQuad'
    })
  }

  finished (number) {
    clearInterval(this.intervalId)
    if (number === 0) delay(() => { this.play('voixoff/intro_bis', 1) }, 1000)
    else if (number === 1) this.play('voixoff/intro_ter', 2)
    else {
      anime({
        targets: this.base,
        opacity: 0,
        duration: 600,
        delay: 200,
        easing: 'easeOutQuad',
        complete: this.resolve
      })
    }
  }
}
