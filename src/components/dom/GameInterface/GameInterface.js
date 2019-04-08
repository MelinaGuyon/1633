import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'

export default class GameInterface extends DomComponent {
  template ({ base }) {
    return (
      <section class='game' />
    )
  }

  componentDidMount () {
    console.log('Game interface did mount')
  }
}
