import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './Menu.styl'
import sound from '../../../controllers/sound'

class Button extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button class='nav' data-id={props.id}>{loc['nav.' + props.type]}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    const id = Number(e.target.getAttribute('data-id'))
    store.levelId.set(id)
  }
}

class ChronologieButton extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button class='nav' data-id={props.id}>{loc['nav.' + props.type]}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    if (store.chronologieStatus.get() != 'appearing') {
      store.chronologieStatus.set('appearing')
    } else {
      store.chronologieStatus.set('disappearing')
    }
  }
}

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

export default class Menu extends DomComponent {
  template ({ base }) {
    return (
      <section class='menu'>
        <Button type={'university'} id={0} />
        <Button type={'church'} id={1} />
        <Button type={'profanation'} id={2} />
        <ChronologieButton type={'chronologie'} id={3} />
        <SoundButton type={'sound'} id={4} />
      </section>
    )
  }

  componentDidMount () {
  }
}
