/* eslint-disable no-mixed-spaces-and-tabs,no-tabs */
import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'

import './Menu.styl'
import sound from '../../../controllers/sound'

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
    if (store.chronologieStatus.get() !== 'appearing') {
      store.chronologieId.set('top')
      store.chronologieStatus.set('appearing')
    } else {
      store.chronologieStatus.set('disappearing')
    }
  }
}

class BackButton extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button class='nav back'>{loc['nav.back']}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    store.chronologieStatus.set('disappearing')
  }
}

class CollectButton extends DomComponent {
  template (props) {
    this.collectId = 0
    const loc = store.loc.get()

    return (
      <button class='nav collect'>{loc['nav.article']}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    store.chronologieId.set(this.collectId)
    store.chronologieStatus.set('appearing')
  }
}

class SoundButton extends DomComponent {
  template (props) {
    return (
      <button class='nav-sound__btn magnet ' data-id={props.id}>
        <div class='l1' />
        <div class='l2' />
        <div class='l3' />
        <div class='l4' />
        <div class='l5' />
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
      sound.pause()
      e.target.closest('.nav-sound__btn').className = 'nav-sound__btn pause'
    } else {
      sound.unpause()
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
    // TODO :: mettre la bonne langue + le href
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
      <button class='nav nav-about magnet' data-id={props.id}>{loc['nav.' + props.type]}</button>
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
    this.socials = Array(this.levelsLength)
    const refSocials = i => el => {
      this.socials[i] = el
    }

    return (
      <section class='menu' ref={addRef(this, 'menu')}>
        <div class='menu__top-right'>
          <ChronologieButton type={'chronologie'} id={1} />
          <AboutButton type={'about'} id={2} />
        </div>
        <div class='menu__left-center'>
          <LangButton type={'lang'} id={3} />
          <SoundButton type={'sound'} id={5} />
          <PlayPauseButton type={'playpause'} id={4} />
        </div>
        <div class='menu__right-center' ref={addRef(this, 'socialContainer')}>
          <SocialButton ref={refSocials(0)} type={'fb'} />
          <SocialButton ref={refSocials(1)} type={'tw'} />
          <SocialButton ref={refSocials(2)} type={'in'} />
        </div>
        <div class='menu__bottom-left'>
          <BackButton ref={addRef(this, 'backButton')} type={'back'} />
          <CollectButton ref={addRef(this, 'collectButton')} type={'collect'} />
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    signals.factUnlock.listen(this.fastbind('onFactUnlocked', 1))
    this.listenStore('menuLight', this.fastbind('updateMenu', 1))
    this.listenStore('menuSocials', this.fastbind('updateSocials', 1))
    this.listenStore('launched', this.fastbind('updateSocials'))
    this.listenStore('ended', this.fastbind('updateSocials'))
  }

  onFactUnlocked (id) {
    this.collectButton.collectId = id
    this.collectButton.base.classList.add('magnet')
    this.collectButton.base.classList.add('visible')
    signals.newDom.dispatch()
  }

  updateMenu (light) {
    if (light) {
      this.menu.classList.add('light')
      this.backButton.base.classList.add('magnet')
      this.collectButton.base.classList.remove('magnet')
      this.collectButton.base.classList.remove('visible')
      signals.newDom.dispatch()
    } else {
      this.menu.classList.remove('light')
      this.backButton.base.classList.remove('magnet')
      signals.newDom.dispatch()
    }
  }

  updateSocials (socials) {
    let gameEnded = store.ended.get()
    let gameLaunched = store.launched.get()

    if (gameEnded) {
      this.socials.forEach((el) => {
        el.base.classList.add('magnet')
      })
      this.socialContainer.classList.remove('hidden')
      signals.newDom.dispatch()
      return
    }

    if (!socials) {
      this.socials.forEach((el) => {
        el.base.classList.remove('magnet')
      })
      this.socialContainer.classList.add('hidden')
      signals.newDom.dispatch()
    } else if (!gameLaunched) {
      this.socials.forEach((el) => {
        el.base.classList.add('magnet')
      })
      this.socialContainer.classList.remove('hidden')
      signals.newDom.dispatch()
    }
  }
}
