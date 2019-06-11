import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import sound from 'controllers/sound'
import store from 'state/store'
import logger from 'utils/logger'
import delay from 'lodash/delay'

import './Epilogue.styl'

export default class Epilogue extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()
    return (
      <section class='epilogue' ref={addRef(this, 'epilogue')}>
        <div class='container'>
          <p class='centerText'>{loc['epilogue.text1']}
            <br />
            <span class='magnet' ref={addRef(this, 'skip')}>{loc['epilogue.skip']}</span>
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
    this.skip.removeEventListener('click', this.finished)
  }

  launchEpilogue () {
    this.base.classList.add('visible')

    delay(() => {
      sound.play('voixoff/epilogue')
      sound.setSoundPlay('voixoff/epilogue')
      this.intervalId = setInterval(() => {
        if (!sound.soundIsPlaying().playing) this.finished()
      }, 500)
    }, 1000)
  }

  finished () {
    console.log('test')
    clearInterval(this.intervalId)
    this.unbind()
    sound.stop('voixoff/epilogue')

    // this.props.onComplete()
  }
}
