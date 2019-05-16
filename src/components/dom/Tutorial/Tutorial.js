/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import cookie from 'controllers/cookie'

import './Tutorial.styl'

class TutoKeyboard extends DomComponent {
  template (props) {
    return (
      <div class='tutorial__item' data-tuto='keyboard'>
        <div class='mouse__close-zone'>
          <img src='' alt='' />
          <p>Utilise les flèches de ton clavier pour te déplacer</p>
        </div>
      </div>
    )
  }
}

class TutoSpace extends DomComponent {
  template (props) {
    return (
      <div class='tutorial__item' data-tuto='space'>
        <div class='mouse__close-zone'>
          <img src='' alt='' />
          <p>Devant un point d'intéraction appuie sur la barre espace
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
  }
}
