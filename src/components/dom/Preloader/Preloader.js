import './Preloader.styl'

import logger from 'utils/logger'
import { DomComponent } from 'abstractions/DomComponent'

export default class Preloader extends DomComponent {
  template ({ base }) {
    return base
  }

  componentDidMount () {
    this.log = logger('Preloader', '#47b342').log
    this.load()
  }

  load () {
    // Load all stuff here then do 'this.props.onComplete' in promise
    this.log('complete')
    this.props.onComplete()
  }
}
