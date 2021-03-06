/* eslint-disable no-mixed-spaces-and-tabs,no-tabs */
import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import delay from 'lodash/delay'

import './Menu.styl'
import sound from 'controllers/sound'

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
      let time = 0
      if (store.aboutStatus.get() === 'appearing') {
        store.aboutStatus.set('disappearing')
        time = 600
      }
      delay(() => {
        store.chronologieId.set('top')
        store.chronologieStatus.set('appearing')
      }, time)
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
    store.aboutStatus.set('disappearing')
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
    this.pause = false
    this.forceMuted = false

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
    this.listenStore('pause', this.checkMuted)
  }

  checkMuted (pause) {
    if (pause.allMuted) {
      this.forceMuted = true
      store.mute.set(true)
      this.base.classList.add('pause')
    } else {
      this.forceMuted = false
      if (this.pause) {
        this.pause = true
        store.mute.set(true)
        this.base.classList.add('pause')
      } else {
        this.pause = false
        store.mute.set(false)
        this.base.classList.remove('pause')
      }
    }
  }

  onClick (e) {
    if (this.forceMuted) return
    if (!this.pause) {
      this.pause = true
      store.mute.set(true)
      this.base.classList.add('pause')
    } else {
      this.pause = false
      store.mute.set(false)
      this.base.classList.remove('pause')
    }
  }
}

class PlayPauseButton extends DomComponent {
  template (props) {
    return (
      <button class='nav-playpause hidden' data-id={props.id}>
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
    if (!store.pause.get().paused) {
	    store.pause.set({ paused: true, allMuted: true })
      e.target.closest('.nav-playpause__btn').classList.add('pause')
    } else {
	    store.pause.set({ paused: false, allMuted: false })
      e.target.closest('.nav-playpause__btn').classList.remove('pause')
    }
  }

  visible () {
    this.base.classList.remove('hidden')
    this.base.classList.add('magnet')
    signals.newDom.dispatch()
  }

  hidden () {
    this.base.classList.add('hidden')
    this.base.classList.remove('magnet')
    signals.newDom.dispatch()
  }
}

class LangButton extends DomComponent {
  template (props) {
    let lang = store.lang.get()
    let newLang
    if (lang === 'fr') newLang = 'en'
    else if (lang === 'en') newLang = 'fr'

    return (
      <button class='nav-lang magnet' data-id={props.id}>{newLang}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    let lang = store.lang.get()
    let newLang
    if (lang === 'fr') newLang = 'en'
    else if (lang === 'en') newLang = 'fr'
    window.location.href = '/' + newLang + '/'
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
    if (store.aboutStatus.get() !== 'appearing') {
      let time = 0
      if (store.chronologieStatus.get() === 'appearing') {
        store.chronologieStatus.set('disappearing')
        time = 600
      }
      delay(() => {
        store.chronologieStatus.set('disappearing')
        store.aboutStatus.set('appearing')
      }, time)
    } else {
      store.aboutStatus.set('disappearing')
    }
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
        <div class='menu__top-left magne' ref={addRef(this, 'logo')}>
          <img class='light' src='assets/img/logo/logo-white.png' alt='logo' />
          <img class='dark' src='assets/img/logo/logo-dark.png' alt='logo' />
        </div>
        <div class='menu__top-right'>
          <ChronologieButton type={'chronologie'} id={1} />
          <AboutButton type={'about'} id={2} />
        </div>
        <div class='menu__left-center'>
          <LangButton type={'lang'} id={3} />
          <SoundButton type={'sound'} id={5} />
          <PlayPauseButton type={'playpause'} id={4} ref={addRef(this, 'playPause')} />
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
    this.onFactUnlocked = this.onFactUnlocked.bind(this)
    this.onFactUnlockedEnd = this.onFactUnlockedEnd.bind(this)
    this.updateMenu = this.updateMenu.bind(this)
    this.updateSocials = this.updateSocials.bind(this)
    this.updateGame = this.updateGame.bind(this)
    this.logoClick = this.logoClick.bind(this)

    this.bind()
  }

  bind () {
    signals.factUnlock.listen(this.onFactUnlocked)
    signals.factUnlockEnd.listen(this.onFactUnlockedEnd)
    this.listenStore('menuLight', this.updateMenu)
    this.listenStore('menuSocials', this.updateSocials)
    this.listenStore('menuGame', this.updateGame)
    this.listenStore('ended', this.updateSocials)

    this.logo.addEventListener('click', this.logoClick)
  }

  logoClick () {
    // signals.forceReset.dispatch()
    // signals.stopSubtitles.dispatch()
    // store.launched.set(false)
  }

  onFactUnlocked (id) {
    this.collectButton.collectId = id
    this.collectButton.base.classList.add('magnet')
    this.collectButton.base.classList.add('visible')
    signals.newDom.dispatch()
  }

  onFactUnlockedEnd (id) {
    this.collectButton.collectId = null
    this.collectButton.base.classList.remove('magnet')
    this.collectButton.base.classList.remove('visible')
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

  updateGame (visible) {
    if (visible) this.playPause.visible()
    else this.playPause.hidden()
  }
}
