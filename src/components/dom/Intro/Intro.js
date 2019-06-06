import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import MouseMv from 'components/dom/MouseMv/MouseMv'
import sound from '../../../controllers/sound'
import store from 'state/store'
import logger from 'utils/logger'

import './Intro.styl'

export default class Intro extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()
    return (
      <section class='intro '>
        <div class='container'>
          <p class='centerText'>{loc['intro.text']}</p>
        </div>
      </section>
    )
  }

  componentDidMount () {
    logger('Intro did mount', '#47b342').log()
  }
}
