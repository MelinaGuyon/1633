/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import './Debug.styl'

import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import pixi from 'controllers/pixi'
import store from '../../../state/store'
import cookie from '../../../controllers/cookie'

class Button extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button data-id={props.id}>test {props.id}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    this.openTuto(this.props.id)
  }

  openTuto (id) {
    cookie.createCookie('tuto', true, 30)
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
  }
}

class ButtonResetCookie extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button data-id={props.id}>Reset cookie tuto</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    cookie.eraseCookie('tuto')
  }
}

export default class Debug extends DomComponent {
  template ({ base }) {
    return (
      <section class='debug'>
        <div class='button'>
          <Button id={'keyboard'} />
          <Button id={'space'} />
          <ButtonResetCookie id={'tuto'} />
        </div>
      </section>
    )
  }

  componentDidMount () {
	  if ( !store.debug.get() ) {
    	document.querySelector('.debug').remove()
	  }
  }
}
