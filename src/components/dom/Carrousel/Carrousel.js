import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
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
    const id = Number(e.target.getAttribute('data-id'))
    // store.levelId.set(id)
    e.target.parentNode.classList.add('hidden')
    // Mount the Pixi Game component
	  console.log(id);
    switch (id) {
      case 0:
        this.game = new RichelieuGame({ autosetup: true })
        break;
      case 1:
        this.game = new MariecurieGame({ autosetup: true })
        break;
      case 2:
        this.game = new RobertdesorbonGame({ autosetup: true })
        break;
      case 3:
        this.game = new JacqueslemercierGame({ autosetup: true })
        break;
      case 4:
        this.game = new NapoleonbonaparteGame({ autosetup: true })
        break;
      default:
        console.log('error')
    }
  }
}

export default class Carrousel extends DomComponent {
  template ({ base }) {
    return (
      <section class='carrousel'>
        <Button type={'richelieu'} id={0} />
        <Button type={'mariecurie'} id={1} />
        <Button type={'robertdesorbon'} id={2} />
        <Button type={'jacqueslemercier'} id={3} />
        <Button type={'napoleonbonaparte'} id={4} />
      </section>
    )
  }

  componentDidMount () {
  }
}
