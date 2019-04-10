import { RafTimer } from '@internet/raf'
import PixiComponent from 'abstractions/PixiComponent'

export default class Level extends PixiComponent {
  setup () {
    this.name = this.props.name
  }

  reset () {

  }

  componentWillMount () {
    console.log('here')
  }

  componentWillUnmount () { }

  onPlayerBlabla (body) {
    // common things to level if there are
  }

  onPlayerValidate () {
    // common things to level if there are
  }
}
