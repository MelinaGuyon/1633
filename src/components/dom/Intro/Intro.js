import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import MouseMv from 'components/dom/MouseMv/MouseMv'
import sound from '../../../controllers/sound'
import store from 'state/store'

import './Intro.styl'

class SoundButton extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button class='nav-sound' data-id={props.id}>son</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    if (store.musicPlayed.current) {
      sound.pause('music_studio')
      e.target.innerHTML = 'remettre son'
    } else {
      sound.unpause('music_studio')
      e.target.innerHTML = 'couper son'
    }
  }
}

export default class Intro extends DomComponent {
  template ({ base }) {
    return (
      <section class='intro mouse__close-zone__parent'>
        <a href='#' class='logo'>logo</a>
        <a href='#' class='about'>about</a>
        <div class='mouse__close-zone'>
          <p class='centerText'>Bienvenue en Sorbonne, dans cette chapelle,
			      lieu saint qui a connu toute l'histoire de l'Université</p>
        </div>
	      <div class='actions'>
		      <select name='' id=''>
			      <option value=''>FR</option>
			      <option value=''>EN</option>
		      </select>
		      <SoundButton type={'sound'} id={4} />
	      </div>
      </section>
    )
  }

  componentDidMount () {
    console.log('Tutorial did mount')
  }
}
