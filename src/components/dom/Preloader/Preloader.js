import './Preloader.styl'

import logger from 'utils/logger'
// import { loader, SCALE_MODES } from 'pixi.js'
import { DomComponent } from 'abstractions/DomComponent'
// import store from 'state/store'
// import cachebust from 'utils/cachebust'

export default class Preloader extends DomComponent {
  template ({ base }) {
    return base
  }

  componentDidMount () {
    this.log = logger('Preloader', '#47b342').log
    this.load()
  }

  load () {
    this.log('complete')
    this.props.onComplete()
    // Promise.all([this.pixiLoad()])
    //   .then(() => {
    //     this.log('complete')
    //     this.props.onComplete()
    //   })
  }
}
