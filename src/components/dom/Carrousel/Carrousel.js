/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'
import store from 'state/store'
import RichelieuGame from 'components/pixi/PixiGame/RichelieuGame'
import MariecurieGame from 'components/pixi/PixiGame/MariecurieGame'
import NapoleonbonaparteGame from 'components/pixi/PixiGame/NapoleonbonaparteGame'
import RobertdesorbonGame from 'components/pixi/PixiGame/RobertdesorbonGame'
import JacqueslemercierGame from 'components/pixi/PixiGame/JacqueslemercierGame'
import Intro from 'components/dom/Intro/Intro'

import './Carrousel.styl'

class Form extends DomComponent {
  template (props) {
    let clasName = 'carrousel__form__content ' + props.active
    return (
      <div class={clasName} launchGame={props.launchGame} type={props.type} data-id={props.id}>
        <div class='carrousel__form'>
          <Story id={0} type={props.type} />
          <div className='carrousel__textScrolling'>
            <Text type={props.type} />
            <Text type={props.type} />
          </div>
        </div>
        <div className='carrousel__textScrolling'>
          <Button type={props.type} id={0} />
          <Button type={props.type} id={0} />
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  fadeOut (el) {
	  el.classList.add('opacity')
	  setTimeout(function () {
      el.classList.add('hidden')
    }, 2000)
  }

  onClick (e) {
	  this.fadeOut(e.target.parentNode.parentNode)
    const id = Number(e.target.getAttribute('data-id'))
    this.props.launchGame && this.props.launchGame(id)
  }
}

class Button extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    return (
      <div class='carrousel__choice ' data-text={loc['carrousel.' + props.type]}><span>{loc['carrousel.' + props.type]}<strong /></span></div>
    )
  }
}

class Text extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    return (
      <div class='carrousel__choice ' data-text={loc['carrousel.' + props.type]}><span>{loc['carrousel.' + props.type]}<strong /></span></div>
    )
  }
}

class Story extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    return (
      <div class='carrousel__story' data-id={props.id}><span>{loc['carrousel.story']} <span class='carrousel__story__number'>{props.id}</span></span></div>
    )
  }
}

class ButtonGoNext extends DomComponent {
  template (props) {
    return (
      <button>Go suivant</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    this.props.goNext()
  }
}

class ButtonGoPrev extends DomComponent {
  template (props) {
    return (
      <button>Go avant</button>
    )
  }

	componentDidMount () {
		this.bind()
	}

	bind () {
		this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
	}

	onClick (e) {
		this.props.goPrev()
	}
}

export default class Carrousel extends DomComponent {
  template ({ base }) {
    return (
      <section data-type='carrousel' class='carrousel mouse__close'>
        <Intro />
        <Form active={'active'} type={'richelieu'} id={0} launchGame={this.launchGame} />
        <Form active={''} type={'mariecurie'} id={1} launchGame={this.launchGame} />
        <Form active={''} type={'robertdesorbon'} id={2} launchGame={this.launchGame} />
        <Form active={''} type={'jacqueslemercier'} id={3} launchGame={this.launchGame} />
        <Form active={''} type={'napoleonbonaparte'} id={4} launchGame={this.launchGame} />
        <ButtonGoPrev goPrev={this.goPrev} />
        <ButtonGoNext goNext={this.goNext} />
      </section>
    )
  }

  launchGame (id) {
    // Mount the Pixi Game component
    document.querySelector('.carrousel').classList.add('hidden') // TODO REMOVE Temporary
    switch (id) {
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
        console.log('error')
    }
    store.currentHistory.set(id)
  }

  goNext () {
    console.log(' au suivant ')
  }

  goPrev () {
	  console.log(' on retourne avant ')
  }

  componentDidMount () {
    // debug to start directly
    if (store.skipCarousel.get()) this.launchGame(0)

	  this.scrollListen()
  }

  scrollListen () {
    let lastPostitionScroll = 0
    let ticking = false

    function scrolling (posScroll) {
      // faire quelque chose avec la position du scroll
      console.log('scroool')
    }

    window.addEventListener('scroll', function (e) {
      lastPostitionScroll = window.scrollY
      console.log('???')
      if (!ticking) {
        window.requestAnimationFrame(function () {
          scrolling(lastPostitionScroll)
          ticking = false
        })
      }

      ticking = true
    })
  }
}
