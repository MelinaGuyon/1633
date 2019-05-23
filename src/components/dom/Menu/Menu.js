/* eslint-disable no-mixed-spaces-and-tabs,no-tabs */
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
      <button class='nav magnet' data-id={props.id}>{loc['nav.' + props.type]}</button>
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
    return (
      <button class='nav-sound__btn magnet' data-id={props.id}>
        <div class='l1' />
        <div class='l2' />
        <div class='l3' />
        <div class='l4' />
        <div class='l5' />
        <div class='l6' />
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
    if (store.musicPlayed.current) {
      sound.pause('music_studio')
      e.target.closest('.nav-sound__btn').className = 'nav-sound__btn pause'
    } else {
      sound.unpause('music_studio')
      e.target.closest('.nav-sound__btn').className = 'nav-sound__btn'
    }
  }
}

class PlayPauseButton extends DomComponent {
  template (props) {
    return (
      <button class='nav-playpause magnet' data-id={props.id}>
        <div class='nav-playpause__btn'>
          <div class='l1' />
          <div class='l2' />
          <div class='l3' />
        </div>
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
    if (!store.pause.get()) {
	    store.pause.set(true)
      e.target.closest('.nav-playpause__btn').className = 'nav-playpause__btn pause'
    } else {
	    store.pause.set(false)
      e.target.closest('.nav-playpause__btn').className = 'nav-playpause__btn'
    }
  }
}

class LangButton extends DomComponent {
  template (props) {
    return (
      <button class='nav-lang magnet' data-id={props.id}>EN</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {

  }
}

class AboutButton extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button class='nav-about magnet' data-id={props.id}>{loc['nav.' + props.type]}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {

  }
}

class SocialButton extends DomComponent {
  template (props) {
    return (
      <button class='nav-social magnet' data-id={props.id}> {props.type}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {

  }
}

export default class Menu extends DomComponent {
  template ({ base }) {
    return (
      <section class='menu'>
        <div class='menu__top-right'>
          <ChronologieButton type={'chronologie'} id={1} />
          <AboutButton type={'about'} id={2} />
        </div>
        <div class='menu__left-center'>
          <LangButton type={'lang'} id={3} />
          <SoundButton type={'sound'} id={5} />
          <PlayPauseButton type={'playpause'} id={4} />
        </div>
        <div class='menu__right-center'>
          <SocialButton type={'fb'} />
          <SocialButton type={'twi'} />
          <SocialButton type={'in'} />
        </div>
      </section>
    )
  }
  // <Button type={'university'} id={0} />
  // <Button type={'church'} id={1} />
  // <Button type={'profanation'} id={2} />

  componentDidMount () {
  }
}
