import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import sound from 'controllers/sound'
import store from 'state/store'
import logger from 'utils/logger'

import './Intro.styl'

export default class Intro extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()
    return (
      <section class='intro '>
        <div class='container'>
          <p class='centerText'>{loc['intro.text']}
            <br />
            <span class='magnet'>{loc['intro.skip']}</span>
          </p>

        </div>
      </section>
    )
  }

  componentDidMount () {
    logger('Intro did mount', '#47b342').log()
  }
}
