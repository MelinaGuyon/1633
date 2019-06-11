/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import cookie from 'controllers/cookie'
import logger from 'utils/logger'
import signals from 'state/signals'

import './Tutorial.styl'
import sound from '../../../controllers/sound'

class TutoKeyboard extends DomComponent {
  template (props) {
    return (
      <div class='tutorial__item' data-tuto='keyboard'>
        <div class='mouse__close-zone tutorial__center'>
          <Button class='tutorial__close ' />
          <div className='tutorial__pictos'>
            <img src={'assets/img/pictos/arrow-left.svg'} alt='' />
            <img src={'assets/img/pictos/arrow-right.svg'} alt='' />
          </div>
          <p>Utilise les flèches de ton clavier pour te déplacer</p>
        </div>
      </div>
    )
  }
}

class Button extends DomComponent {
  template (props) {
    return (
      <button class='tutorial__close magnet'>
        <img src={'assets/img/pictos/close.svg'} alt='' />
      </button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
	  let $parent = e.target.closest('.tutorial__item')
    $parent.remove()
    store.pause.set(false)
  }
}

class TutoSpace extends DomComponent {
  template (props) {
    return (
      <div class='tutorial__item' data-tuto='space'>
        <div class='tutorial__bkgform'>
          <div class='mouse__close-zone tutorial__center'>
            <Button class='tutorial__close'>x</Button>
            <p>Clique sur la barre espace quand tu vois ces formes dans les scènes</p>
          </div>
        </div>
      </div>
    )
  }
}

export default class Tutorial extends DomComponent {
  template ({ base }) {
    return (
      <section data-type='tutorial' class='tutorial mouse__close'>
        <div class=''>
          <TutoKeyboard />
          <TutoSpace />
        </div>
      </section>
    )
  }

  componentDidMount () {
	  this.keyup = this.fastbind('keyup', 1)
    let isAlreadyShow
	  isAlreadyShow = cookie.readCookie('tuto')
    if (isAlreadyShow) {
	    document.querySelector('.tutorial').remove()
    }
	  signals.newDom.dispatch()
	  logger('Tutorial did mount', '#47b342').log()
	  //document.addEventListener('keyup', this.keyup)
  }

	keyup (e) {
    console.log(e)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
		  console.log('close')
      let tutoOpen = document.querySelector('.tutorial__item.active')
      tutoOpen.remove()
      this.removeListener()
    }
  }

  removeListener () {
	  document.removeEventListener('keyup', this.keyup)
  }
}
