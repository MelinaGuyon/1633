import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import sound from 'controllers/sound'
import store from 'state/store'
import logger from 'utils/logger'
import delay from 'lodash/delay'

import './Intro.styl'

export default class Intro extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()
    return (
      <section class='intro' ref={addRef(this, 'intro')}>
        <div class='container'>
          <p class='centerText'>{loc['intro.text']}
            <br />
            <span class='magnet' ref={addRef(this, 'skip')}>{loc['intro.skip']}</span>
          </p>
        </div>
      </section>
    )
  }

  componentDidMount () {
    logger('Intro did mount', '#47b342').log()
    this.bind()
    delay(this.fastbind('launchIntro', 1), 1000)
  }

  bind () {
    this.skip.addEventListener('click', this.fastbind('finished', 1))
  }

  unbind () {
    this.skip.removeEventListener('click', this.finished)
  }

  launchIntro () {
    sound.play('voixoff-acteur/intro')
    sound.setSoundPlay('voixoff-acteur/intro')
    this.intervalId = setInterval(() => {
      if (!sound.soundIsPlaying().playing) this.finished()
    }, 500)
  }

  finished () {
    clearInterval(this.intervalId)
    this.unbind()
    sound.stop('voixoff-acteur/intro')

    this.props.onComplete()
  }
}
