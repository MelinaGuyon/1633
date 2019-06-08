/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import './Debug.styl'

import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import pixi from 'controllers/pixi'
import store from '../../../state/store'
import cookie from '../../../controllers/cookie'
import sound from '../../../controllers/sound'

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

class BtnChangeSound extends DomComponent {
  template (props) {
    return (
      <button id={props.id}>{props.text}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
	  sound.stop('2_music_studio')
	  sound.stop('3_music_studio')
	  sound.stop('4_music_studio')
	  sound.stop('7_music_studio')
	  console.log(e.target.id)
	  sound.play(e.target.id + '_music_studio')
  }
}

class BtnremoveSound extends DomComponent {
  template (props) {
    return (
      <button id={props.id}>{props.text}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
	  sound.stop('2_music_studio')
	  sound.stop('3_music_studio')
	  sound.stop('4_music_studio')
	  sound.stop('7_music_studio')
  }
}

export default class Debug extends DomComponent {
  template ({ base }) {
    return (
      <section class='debug'>
        <div class='button'>
          <BtnChangeSound id={'2'} text='son2' />
          <BtnChangeSound id={'3'} text='son3' />
          <BtnChangeSound id={'4'} text='son4' />
          <BtnChangeSound id={'7'} text='son7' />
          <BtnremoveSound text='arrêter son' />
        </div>
      </section>
    )
  }

  componentDidMount () {
	  if (!store.debug.get()) {
    	document.querySelector('.debug').remove()
	  }
  }
}
