/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'
import store from 'state/store'
import signals from 'state/signals'
import RichelieuGame from 'components/pixi/PixiGame/RichelieuGame'
import MariecurieGame from 'components/pixi/PixiGame/MariecurieGame'
import NapoleonbonaparteGame from 'components/pixi/PixiGame/NapoleonbonaparteGame'
import RobertdesorbonGame from 'components/pixi/PixiGame/RobertdesorbonGame'
import JacqueslemercierGame from 'components/pixi/PixiGame/JacqueslemercierGame'
import Intro from 'components/dom/Intro/Intro'
import IntroCinematic from 'components/dom/IntroCinematic/IntroCinematic'
import TextScrolling from './TextScrolling'
import anime from 'animejs'
import delay from 'lodash/delay'

import './Carrousel.styl'

class Form extends DomComponent {
  template (props) {
    let clasName
    if (store.isPrez.get()) {
      clasName = 'carrousel__form__content ' +
        props.active +
        (props.animated ? props.animated : '')
    } else {
      clasName = 'carrousel__form__content ' +
        props.active +
        (props.animated ? props.animated : '') +
        (props.id === 0 ? '' : 'not-available')
    }

    const loc = store.loc.get()
    this.id = props.id
    const title = loc['carrousel.' + props.type]
    const timing = title.length / 5 >> 0

    this.hover = props.hover

    this.available = false
    if (props.id === 0 || store.isPrez.get()) this.available = true

    return (
      <div class={clasName} launchGame={props.launchGame} type={props.type} data-id={props.id}>
        <div class='carrousel__form' ref={addRef(this, 'form')}>
          <TextScrolling text={title} ref={addRef(this, 'text')} timing={timing} />
        </div>
        <TextScrolling text={title} stroke ref={addRef(this, 'text2')} timing={timing} />
      </div>
    )
  }

  bind () {
    this.onClick = this.onClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)

    if (this.available) {
      this.base.addEventListener('click', this.onClick)
      this.base.addEventListener('mouseenter', this.onMouseEnter)
      this.base.addEventListener('mouseleave', this.onMouseLeave)
    }
  }

  unbind () {
    if (this.available) {
      this.base.removeEventListener('click', this.onClick)
      this.base.removeEventListener('mouseenter', this.onMouseEnter)
      this.base.removeEventListener('mouseleave', this.onMouseLeave)
    }
  }

  fadeOut (el) {
    this.base.classList.add('full')
	  delay(() => {
      el.classList.remove('animated')
      this.base.classList.remove('full')
    }, 2000)
  }

  onClick (e) {
    this.fadeOut(e.target.parentNode.parentNode)
    this.props.launchGame && this.props.launchGame({ id: this.id })
  }

  onMouseEnter (e) {
    this.hover(1)
  }

  onMouseLeave (e) {
    this.hover(0)
  }
}

class Background extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    const splittedText = loc['carrousel.story'].split('')

    this.spansTop = Array(this.chronologieNumber)
    const refSpansTop = i => el => {
      this.spansTop[i] = el
    }
    this.spansBottom = Array(this.chronologieNumber)
    const refSpansBottom = i => el => {
      this.spansBottom[i] = el
    }

    let spansTop = []
    for (let i = 0; i < splittedText.length; i++) {
      spansTop.push(<span ref={refSpansTop(i)}>{splittedText[i]}</span>)
    }
    let spansBottom = []
    for (let i = 0; i < splittedText.length; i++) {
      spansBottom.push(<span ref={refSpansBottom(i)}>{splittedText[i]}</span>)
    }

    return (
      <div class='carrousel__background'>
        <img class='img' src='assets/img/backgound/form.png' />
        <div class='story'>
          <div class='span-container'>
            <div class='span-container-inner'>{spansTop}</div>
            <div class='span-container-inner'>{spansBottom}</div>
          </div>
          <span class='number' ref={addRef(this, 'number')}>01</span>
        </div>
      </div>
    )
  }

  addMagnet () {
    this.base.classList.add('magnet', 'no-magnetism')
    signals.newDom.dispatch()
  }

  removeMagnet () {
    this.base.classList.remove('magnet', 'no-magnetism')
    signals.newDom.dispatch()
  }

  animeNumber (number, direction) {
    let num = number + 1
    anime({
      targets: this.number,
      opacity: 0,
      translateY: direction === 'next' ? [0, 20] : [0, -20],
      duration: 300,
      easing: 'easeOutQuad',
      complete: () => {
        this.number.innerText = '0' + num
        anime({
          targets: this.number,
          opacity: 1,
          duration: 300,
          translateY: direction === 'next' ? [-20, 0] : [20, 0],
          easing: 'easeOutQuad'
        })
      }
    })
  }

  animateHover (hovering) {
    let value = hovering ? '-100%' : '0'
    anime({
      targets: this.spansTop,
      translateY: value,
      duration: 400,
      delay: (el, i) => { return 20 * i },
      easing: 'easeOutQuad'
    })
    anime({
      targets: this.spansBottom,
      translateY: value,
      duration: 400,
      delay: (el, i) => { return 20 * i },
      easing: 'easeOutQuad'
    })
  }
}

let ticking = false

export default class Carrousel extends DomComponent {
  template ({ base }) {
    this.launchGame = this.fastbind('launchGame', 1)
    this.mousehover = this.fastbind('mousehover', 1)

    this.carrouselIsActive = false

    const allHistories = store.allHistories.get()
    const histories = []
    this.histories = Array(allHistories.length)

    const refHistories = i => el => {
      this.histories[i] = el
    }

    for (let i = 0; i < allHistories.length; i++) {
      if (i === 0) histories.push(<Form ref={refHistories(i)} id={i} active={'active '} animated={'animated'} type={allHistories[i]} launchGame={this.launchGame} hover={this.mousehover} />)
      else histories.push(<Form ref={refHistories(i)} id={i} active={''} type={allHistories[i]} launchGame={this.launchGame} hover={this.mousehover} />)
    }

    return (
      <section data-type='carrousel' id='carrousel' class='carrousel mouse__close' ref={addRef(this, 'carrousel')}>
        <Intro onComplete={this.fastbind('activeCarousel')} ref={addRef(this, 'intro')} />
        <IntroCinematic ref={addRef(this, 'cinematic')} />
        <div class='carrousel-wrapper' ref={addRef(this, 'carouselWrapper')}>
          <Background ref={addRef(this, 'background')}/>
          {histories}
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.mouseWhellTodo = this.fastbind('mouseWhellTodo', 1)
    if (store.skipCarousel.get()) this.directLaunch()
    this.bind()
  }

  activeCarousel () {
    anime({
      targets: this.intro.base,
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuad',
      complete: () => { this.intro.base.classList.add('hidden') }
    })
    anime({
      targets: this.carouselWrapper,
      opacity: 1,
      duration: 600,
      delay: 800,
      easing: 'easeOutQuad',
      complete: () => { this.carouselWrapper.classList.add('visible') }
    })

    this.carrouselIsActive = true
    this.carrousel.classList.remove('no-touch')
    this.background.addMagnet()
    this.internalBind()
    delay(() => { signals.newIndication.dispatch(2) }, 1000)
  }

  internalBind () {
    document.addEventListener('mousewheel', this.mouseWhellTodo)
    this.histories.forEach((el) => {
      el.bind()
    })
  }

  bind () {
    this.listenStore('chronologieStatus', this.fastbind('checkBind', 1))
    this.listenStore('launched', this.resetCarousel)
  }

  internalUnbind () {
    document.removeEventListener('mousewheel', this.mouseWhellTodo)
    this.histories.forEach((el) => {
      el.unbind()
    })
  }

  checkBind (status) {
    if (this.carrouselIsActive) {
      if (status === 'appearing') {
        this.internalUnbind()
      } else {
        this.internalBind()
      }
    }
  }

  mouseWhellTodo (e) {
	  let lastPostitionScroll = e.deltaY
	  if (!ticking) {
		  this.scrolling(lastPostitionScroll)
		  ticking = true
		  setTimeout(function () {
			  ticking = false
		  }, 1500)
	  }
  }

  goNext () {
    let current = document.querySelector('.carrousel__form__content.active')
    let all = document.querySelectorAll('.carrousel__form__content')
    let currentPos = current.getAttribute('data-id')
    let maxPos = all.length
    let nextpos
    let newCurrent
    if (parseInt(currentPos) + 1 > (maxPos - 1)) {
      nextpos = 0
    } else {
      nextpos = parseInt(currentPos) + 1
    }

    for (let i = 0; i < maxPos; i++) {
      if (parseInt(all[i].getAttribute('data-id')) === nextpos) {
        newCurrent = all[i]
      }
    }

    if (this.histories[nextpos].available) this.background.addMagnet()
    else this.background.removeMagnet()

    this.background.animeNumber(nextpos, 'next')
    current.classList.remove('active')
    delay(() => {
      current.classList.remove('animated')
      newCurrent.classList.add('active', 'animated')
    }, 600)
  }

  goPrev () {
    let current = document.querySelector('.carrousel__form__content.active')
    let all = document.querySelectorAll('.carrousel__form__content')
    let currentPos = current.getAttribute('data-id')
    let maxPos = all.length
    let nextpos
    let newCurrent

    let scrollingText = document.querySelectorAll('.carrousel__textScrolling')

    for (let i = 0; i < scrollingText.length; i++) {
      scrollingText[i].classList.add('hidden')
      scrollingText[i].classList.remove('opacity')
    }

    if (parseInt(currentPos) - 1 < 0) {
      nextpos = (maxPos - 1)
    } else {
      nextpos = parseInt(currentPos) - 1
    }

    for (let i = 0; i < maxPos; i++) {
      if (parseInt(all[i].getAttribute('data-id')) === nextpos) {
        newCurrent = all[i]
      }
    }

    if (this.histories[nextpos].available) this.background.addMagnet()
    else this.background.removeMagnet()

    this.background.animeNumber(nextpos, 'prev')
    current.classList.remove('active')
    delay(() => {
      current.classList.remove('animated')
      newCurrent.classList.add('active', 'animated')
    }, 600)
  }

  scrolling (posScroll) {
    if (posScroll > 0) {
      this.goNext()
    } else {
      this.goPrev()
    }
  }

  launchGame (obj) {
    this.internalUnbind()
    obj.id = 0 // to force Ricelieu story

    this.carrouselIsActive = false
    this.carrousel.classList.add('no-touch')
    this.background.removeMagnet()
    signals.newIndication.dispatch(0)
    store.pause.set({ paused: false, allMuted: false })
    store.menuSocials.set(false)

    anime({
      targets: this.carouselWrapper,
      opacity: 0,
      duration: 300,
      delay: 400,
      easing: 'easeInOutQuad',
      complete: () => {
        this.cinematic.start().then(() => {
          this.launchPixi(obj)
        })
      }
    })
  }

  launchPixi (obj) {
    switch (obj.id) {
      case 0:
        this.game = new RichelieuGame({ autosetup: true })
        break
      case 1:
        this.game = new MariecurieGame({ autosetup: true })
        break
      case 2:
        this.game = new RobertdesorbonGame({ autosetup: true })
        break
      case 3:
        this.game = new JacqueslemercierGame({ autosetup: true })
        break
      case 4:
        this.game = new NapoleonbonaparteGame({ autosetup: true })
        break
      default:
	      this.game = new RichelieuGame({ autosetup: true })
    }
    store.currentHistory.set(obj.id)
    store.ended.set(false)
    store.launched.set(true)
    store.menuGame.set(true)
    anime({
      targets: this.carrousel,
      opacity: 0,
      duration: 600,
      delay: 1500,
      easing: 'easeOutQuad',
      complete: () => {
        this.carrousel.classList.add('hidden')
        if (!store.skipTuto.get()) {
          store.pause.set({ paused: true, allMuted: false })
          signals.activeTuto.dispatch('keyboard')
        }
      }
    })
  }

  directLaunch () {
    this.internalUnbind()
    this.game = new RichelieuGame({ autosetup: true })
    this.carrousel.classList.add('hidden')
    store.currentHistory.set(0)
    store.launched.set(true)
    store.menuGame.set(true)
  }

  resetCarousel (launched) {
    if (launched) return
    store.menuGame.set(false)
    this.carrousel.classList.remove('hidden')
    this.carrousel.style.opacity = 1
    this.activeCarousel()
    this.game.destroy()
  }

  mousehover (hovering) {
    this.background.animateHover(hovering)
  }
}
