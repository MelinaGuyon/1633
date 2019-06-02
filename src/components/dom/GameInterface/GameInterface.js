import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import Menu from 'components/dom/Menu/Menu'
import Carrousel from 'components/dom/Carrousel/Carrousel'
import Timeline from 'components/dom/Timeline/Timeline'
import Chronologie from 'components/dom/Chronologie/Chronologie'
import Subtitles from 'components/dom/Subtitles/Subtitles'
import Tutorial from 'components/dom/Tutorial/Tutorial'
import Message from 'components/dom/Message/Message'
import Debug from 'components/dom/Debug/Debug'
import logger from 'utils/logger'
import signals from 'state/signals'

import './GameInterface.styl'

export default class GameInterface extends DomComponent {
  template ({ base }) {
    return (
      <section class='game'>
        <Menu />
        <Carrousel />
        <Timeline />
        <Chronologie />
        <Subtitles />
        <Tutorial />
        <Message />
        <Debug />
      </section>
    )
  }

  componentDidMount () {
    signals.newDom.dispatch()
    logger('Game interface did mount', '#47b342').log()
    this.bind()
  }

  componentWillUnmount () {
    this.unbind()
  }

  bind () {
    document.addEventListener('click', this.clearClick)
  }

  unbind () {
    document.removeEventListener('click', this.clearClick)
  }

  clearClick (e) {
    if (document.activeElement.toString() === '[object HTMLButtonElement]') {
      document.activeElement.blur()
    }
  }
}
