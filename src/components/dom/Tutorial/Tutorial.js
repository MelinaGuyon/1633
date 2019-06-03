/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import cookie from 'controllers/cookie'
import logger from 'utils/logger'

import './Tutorial.styl'
import sound from '../../../controllers/sound'

class TutoKeyboard extends DomComponent {
  template (props) {
    return (
      <div class='tutorial__item' data-tuto='keyboard'>
        <div class='mouse__close-zone tutorial__center'>
          <Button class='tutorial__close'>x</Button>
          <img src='' alt='' />
          <p> ← → </p>
          <p>Utilise les flèches de ton clavier pour te déplacer</p>
        </div>
      </div>
    )
  }
}

class Button extends DomComponent {
  template (props) {
    return (
      <button class='tutorial__close'>x</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
	  let $parent = e.target.parentNode.parentNode
    $parent.remove()
    store.pause.set(false)
  }
}

class TutoSpace extends DomComponent {
  template (props) {
    return (
      <div class='tutorial__item' data-tuto='space'>
	      <div class='mouse__close-zone tutorial__center'>
		      <Button class='tutorial__close'>x</Button>
		      <p>Devant un point d'intéraction (cercle rouge) appuie sur la barre espace
			      de ton clavier pour débloquer plus d'éléments sur l'histoire</p>
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
    let isAlreadyShow
	  isAlreadyShow = cookie.readCookie('tuto')
    if (isAlreadyShow) {
	    document.querySelector('.tutorial').remove()
    }
    logger('Tutorial did mount', '#47b342').log()
  }
}
