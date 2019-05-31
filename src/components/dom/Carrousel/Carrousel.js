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
    const loc = store.loc.get()
    return (
      <div class='carrousel__form__content' launchGame={props.launchGame} type={'richelieu'} data-id={0}>
        <div class='carrousel__form'>
          <Story id={0} type={'richelieu'} />
          <div className='carrousel__textScrolling'>
            <Text active='active' type={'richelieu'} />
          </div>
        </div>
        <div className='carrousel__textScrolling'>
          <Button active='active' type={'richelieu'} id={0} />
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
    let className = 'carrousel__choice ' + props.active
    return (
      <div class={className} data-text={loc['carrousel.' + props.type]}><span>{loc['carrousel.' + props.type]}<strong /></span></div>
    )
  }
}

class Text extends DomComponent {
  template (props) {
    const loc = store.loc.get()
	  let className = 'carrousel__choice ' + props.active
    return (
      <div class={className} data-text={loc['carrousel.' + props.type]}><span>{loc['carrousel.' + props.type]}<strong /></span></div>
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

export default class Carrousel extends DomComponent {
  template ({ base }) {
    return (
      <section data-type='carrousel' class='carrousel mouse__close'>
        <Form launchGame={this.launchGame} />
        <Button active='' type={'mariecurie'} id={1} launchGame={this.launchGame} />
        <Button active='' type={'robertdesorbon'} id={2} launchGame={this.launchGame} />
        <Button active='' type={'jacqueslemercier'} id={3} launchGame={this.launchGame} />
        <Button active='' type={'napoleonbonaparte'} id={4} launchGame={this.launchGame} />
        <Intro />
      </section>
    )
  }

  launchGame (id) {
    // store.levelId.set(id)
    // Mount the Pixi Game component
    //document.querySelector('.carrousel').classList.add('hidden') // Temporary
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
  }

  componentDidMount () {
    // debug to start directly
    // if (store.skipCarousel.get()) this.launchGame(0)
  }
}
