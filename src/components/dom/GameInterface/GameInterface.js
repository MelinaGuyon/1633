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
import store from '../../../state/store'

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
	  this.openTuto('keyboard') // toto remove only for test
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

  openTuto (id) { // TODO remove après les test
    // cookie.createCookie('tuto', true, 30)
    let tutos = document.querySelectorAll('[data-tuto]')

    for (let i = 0; i < tutos.length; i++) {
      tutos[i].className = 'tutorial__item'
    }

    let tuto = document.querySelector('[data-tuto=' + id)
    tuto.className = 'tutorial__item active'

    let element = tuto.closest('.mouse__close')
    let type = element.getAttribute('data-type')
    type += ' mouse__close'
    tuto.closest('.mouse__close').className = type
    store.pause.set(true)
    /**
		for (let i = 0; i < this.mains.length; i++) {
			if (this.mains[i].name === id) {
				this.mains[i].destroy()
			}
		}
    **/
  }

  clearClick (e) {
    if (document.activeElement.toString() === '[object HTMLButtonElement]') {
      document.activeElement.blur()
    }
  }
}
