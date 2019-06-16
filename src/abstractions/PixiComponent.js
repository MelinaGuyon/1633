import { RafTimer } from '@internet/raf'
import { contextualBinder } from 'utils/bind'
import { Container, Sprite } from 'pixi.js'
import store from 'state/store'
import scene from 'controllers/scene'
import logger from 'utils/logger'

function applyProps (c, props = {}) {
  if (props.x !== undefined) c.x = props.x
  if (props.y !== undefined) c.y = props.y
  if (props.alpha !== undefined) c.alpha = props.alpha
  if (props.tint !== undefined) c.tint = props.tint
  if (props.rotation !== undefined) c.rotation = props.rotation
  if (props.anchor) c.anchor.set(props.anchor[0], props.anchor[1])
  if (props.scale) c.scale.set(props.scale[0], props.scale[1])
}

const DEBUG = false
let count = 0

export function getCount () { return count }

export default class PixiComponent {
  constructor (props) {
    count++
    this.props = props || {}
    this.container = false
    this._pixicomponent = true
    this.refs = {}
    this.components = []
    this.linkedChilds = []
    this.signals = {}
    this.destroyed = false
    this.timers = []
    this.fastbind = contextualBinder(this)

    this.log = logger(this.constructor.name, '#029be5').log

    if (this.props.autosetup) {
      this.setup(this.props)
      this.componentDidMount(this.props)
      this.resize(store.size.get())
    }

    DEBUG && this.log('setup')
  }

  setup (props = {}) {
    if (!this.base) {
      if (props.sprite) {
        this.base = new Sprite(
          typeof props.sprite === 'string'
            ? store.animations.get()[props.sprite][0]
            : props.sprite
        )
      } else {
        this.base = new Container()
      }
    }

    this.lastScreenOffset = [0, 0]
    this.screenRelative = props.screenRelative || false
    this.screenAnchor = props.screenAnchor || [0, 0]
    this.screenOffset = props.screenOffset || [0, 0]
    applyProps(this.base, props)
  }

  componentDidMount () {}
  componentWillUnmount () {}

  triggerResize () {
    this.resize(store.size.get())
  }

  tex (k) {
    return store.animations.get()[k][0]
  }

  listenStore (k, cb) {
    this.signals[k] = store[k].listen(cb, this)
  }

  unlistenStore (k, cb) {
    store[k].unlisten(this.signals[k])
  }

  timer (duration, cb) {
    if (!cb) {
      return new Promise(resolve => {
        const timer = new RafTimer(duration, resolve)
        this.timers.push(timer)
      })
    } else {
      const timer = new RafTimer(duration, cb)
      this.timers.push(timer)
    }
  }

  updateTimers (dt) {
    let n = this.timers.length
    while (n--) {
      this.timers[n].update(dt)
      if (this.timers._stopped) {
        this.timers[n].dispose()
        this.timers.splice(n, 1)
      }
    }
  }

  update (dt, time) {
    if (this.destroyed) return
    for (let i = this.components.length - 1; i >= 0; i--) {
      this.components[i].update(dt, time)
    }
  }

  resize (s) {
    if (this.destroyed) return
    if (this.screenRelative && this.base) {
      const pos = this.toLocal(this.screenAnchor[0] * s.w + this.screenOffset[0], this.screenAnchor[1] * s.h + this.screenOffset[1], true)
      if (this.screenRelative[0]) {
        this.base.x = this.base.x - this.lastScreenOffset[0] + pos[0]
        this.lastScreenOffset[0] = pos[0]
      }
      if (this.screenRelative[1]) {
        this.base.y = this.base.y - this.lastScreenOffset[1] + pos[1]
        this.lastScreenOffset[1] = pos[1]
      }
    }
    for (let i = this.components.length - 1; i >= 0; i--) this.components[i].resize(s)
  }

  // Add child to the component
  // You can add props.layer to add the child onto a scene layer
  addChild (c, props = {}) {
    if (this.destroyed) return
    if (typeof c === 'string') c = new Sprite(store.animations.get()[c][0])
    if (props.layer) {
      this.linkedChilds.push(c)
      if (!scene[props.layer]) throw Error('Layer ' + props.layer + ' doesn\'t exist')
      scene[props.layer].addChild(c)
      applyProps(c, props)
    } else if (this.base) {
      this.base.addChild(c)
      applyProps(c, props)
    } else {
      c.destroy()
    }
    return c
  }

  removeChild (c) {
    if (this.destroyed) return
    if (c && c.parent) c.parent.removeChild(c)

    // Remove from linkedChilds list
    let index = this.linkedChilds.indexOf(c)
    if (!~index) return
    this.linkedChilds.splice(index, 1)
  }

  // Add component to the component
  // You can add props.layer to add the child onto a scene layer
  addComponent (Component, props) {
    if (this.destroyed) return
    let component

    // Check if the component is already an instance, if not, instanciate-it
    if (!Component) Component = PixiComponent
    component = Component.components ? Component : new Component(props)

    // Check if layer prop is present: if it is, declare the component as linked component
    if (component.props.layer) {
      component.linked = true
      component.layer = component.props.layer
    }

    // Call setup to create component sprites, base, container, etc
    component.setup(component.props)

    // If this is a linked component, add it to its scene layer
    // If not, add it to the parent base component
    if (component.base) {
      if (component.linked && component.layer) {
        if (!scene[component.layer]) throw Error('Layer ' + component.layer + ' doesn\'t exist')
        scene[component.layer].addChild(component.base)
      } else if (this.base) {
        this.base.addChild(component.base)
      }
    }

    this.components.push(component)
    component._parent = this

    // Call did mount and force a first resize call for convenience
    component.componentDidMount(props)
    component.resize(store.size.get())

    return component
  }

  removeComponent (component) {
    if (component.base && component.base.parent) component.base.parent.removeChild(component.base)

    // unlink from parent component
    component._parent = null

    // remove from component list
    let index = this.components.indexOf(component)
    if (!~index) return
    this.components.splice(index, 1)
  }

  isVisible (bleedV, bleedH) {
    if (!this.layer) return false
    return scene[this.layer].isVisible(this.base, bleedV, bleedH)
  }

  toScreen (x, y) {
    if (!this.layer) return [0, 0]
    return scene[this.layer].toScreen(x, y)
  }

  toLocal (x, y, ignoreProgress) {
    if (!this.layer) return [0, 0]
    return scene[this.layer].toLocal(x, y, ignoreProgress)
  }

  destroy () {
    if (this.destroyed) return
    DEBUG && this.log('Destroy')

    this.componentWillUnmount()
    count--

    // Destroy linked childs and sub-components
    for (let i = this.components.length - 1; i >= 0; i--) this.components[i].destroy()
    for (let i = this.linkedChilds.length - 1; i >= 0; i--) this.linkedChilds[i].destroy()

    if (this.levels) {
      let keys = Object.keys(this.levels)
      for (let i = keys.length - 1; i >= 0; i--) this.levels[keys[i]].destroy()
    }

    // Destroy raf timers
    for (let i = this.timers.length - 1; i >= 0; i--) this.timers[i].dispose()

    // Remove all signals
    for (let k in this.signals) store[k].unlisten(this.signals[k])

    // remove component from its parent
    if (this._parent) this._parent.removeComponent(this)

    // destroy base sprite
    if (this.base) this.base.destroy()

    // Force GC
    this.timers = undefined
    this.props = undefined
    this.base = undefined
    this.components = undefined
    this.linkedChilds = undefined
    this.linkedComponents = undefined
    this.destroyed = true
    this.refs = undefined
  }
}
