import { Component, addRef } from '@internet/dom'
import { contextualBinder } from 'utils/bind'
import store from 'state/store'
import logger from 'utils/logger'

export class DomComponent extends Component {
  constructor (props, loggerName) {
    super(props)
    this.anims = {}
    this.signals = {}
    this.fastbind = contextualBinder(this)
    if (loggerName) this.log = logger('Component ' + loggerName, '#3a99fc').log
  }

  listenStore (k, cb) {
    this.signals[k] = store[k].listen(cb, this)
  }

  unlistenStore (k, cb) {
    store[k].unlisten(this.signals[k])
  }

  destroy () {
    super.destroy()

    // Remove all signals
    for (let k in this.signals) {
      store[k].unlisten(this.signals[k])
    }

    // Remove all animations, running or not
    for (let k in this.anims) {
      if (typeof this.anims[k].pause === 'function') this.anims[k].pause()
    }

    this.signals = null
    this.anims = null
  }
}
