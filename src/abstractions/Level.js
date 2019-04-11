import PixiComponent from 'abstractions/PixiComponent'
import logger from 'utils/logger'

export default class Level extends PixiComponent {
  setup () {
    logger('Level', '#47b342').log(this.props.name)
    this.name = this.props.name
  }

  reset () {

  }

  componentWillMount () {
  }

  componentWillUnmount () { }

  onPlayerBlabla (body) {
    // common things to level if there are
  }

  onPlayerValidate () {
    // common things to level if there are
  }
}
