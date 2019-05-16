import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './Tutorial.styl'

class TutoKeyboard extends DomComponent {
  template (props) {
    return (
      <div class='tutorial__item' data-tuto='keyboard'>
        <div class='mouse__close-zone'>
	        <img src="" alt=""/>
          <p>Utilise les flèches de ton clavier pour te déplacer</p>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
  }

  onClick (e) {

  }
}

class TutoSpace extends DomComponent {
  template (props) {
    return (
      <div class='tutorial__item' data-tuto='space'>
        <div class='mouse__close-zone'>
	        <img src="" alt=""/>
	        <p>Devant un point d'intéraction appuie sur la barre espace
	        de ton clavier pour débloquer plus d'éléments sur l'histoire</p>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
  }

  onClick (e) {

  }
}

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
		let tuto = document.querySelector('[data-tuto=' + id)
		let parent
		tuto.className = 'tutorial__item active'
	}
}

export default class Tutorial extends DomComponent {
  template ({ base }) {
    return (
      <section data-type='tutorial' class='tutorial mouse__close'>
        <div class='button'>
          <Button id={'keyboard'} />
          <Button id={'space'} />
        </div>
        <div class=''>
          <TutoKeyboard />
          <TutoSpace />
        </div>
      </section>
    )
  }

  componentDidMount () {
    console.log('Tutorial did mount')
  }
}
