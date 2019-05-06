import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'
import store from 'state/store'
import RichelieuGame from 'components/pixi/PixiGame/RichelieuGame'
import MariecurieGame from 'components/pixi/PixiGame/MariecurieGame'
import NapoleonbonaparteGame from 'components/pixi/PixiGame/NapoleonbonaparteGame'
import RobertdesorbonGame from 'components/pixi/PixiGame/RobertdesorbonGame'
import JacqueslemercierGame from 'components/pixi/PixiGame/JacqueslemercierGame'

import './Carrousel.styl'

class Button extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    return (
      <button class='carrousel__choice' data-id={props.id}>{loc['carrousel.' + props.type]}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    e.target.parentNode.classList.add('hidden')
    const id = Number(e.target.getAttribute('data-id'))
    this.props.launchGame && this.props.launchGame(id)
  }
}

export default class Carrousel extends DomComponent {
  template ({ base }) {
    return (
      <section class='carrousel'>
        <Button type={'richelieu'} id={0} launchGame={this.launchGame} />
        <Button type={'mariecurie'} id={1} launchGame={this.launchGame} />
        <Button type={'robertdesorbon'} id={2} launchGame={this.launchGame} />
        <Button type={'jacqueslemercier'} id={3} launchGame={this.launchGame} />
        <Button type={'napoleonbonaparte'} id={4} launchGame={this.launchGame} />
      </section>
    )
  }

  launchGame (id) {
    // store.levelId.set(id)
    // Mount the Pixi Game component
    document.querySelector('.carrousel').classList.add('hidden') // Temporary
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
    if (store.directStart.get()) this.launchGame(0)
  }
}
