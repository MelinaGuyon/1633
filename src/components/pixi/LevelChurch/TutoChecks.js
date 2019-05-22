import PixiComponent from 'abstractions/PixiComponent'
import Colliders from 'abstractions/Colliders'
import store from 'state/store'
import cookie from '../../../controllers/cookie'

export default class TutoCheck extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Colliders, { layer: '2bg200', x: -100, y: -100, group: 'tuto', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'keyboard'), name: 'keyboard' }))
    this.mains.push(this.addComponent(Colliders, { layer: '2bg200', x: 100, y: -100, group: 'tuto', collide: true, tint: 0x000000, cb: this.cb.bind(this, 'space'), name: 'space' }))
  }

  openTuto (id) {
     cookie.createCookie('tuto', true, 30)
     let tutos = document.querySelectorAll('[data-tuto]')

    for (let i = 0; i < tutos.length; i++) {
      tutos[i].className = 'tutorial__item'
    }

    let tuto = document.querySelector('[data-tuto=' + id)
    tuto.className = 'tutorial__item active'

    let element = tuto.closest('.mouse__close')
    let type = element.getAttribute('data-type')
    type += ' mouse__close'
    tuto.closest('.mouse__close').className = type
    store.pause.set(true)

    for (let i = 0; i < this.mains.length; i++) {
      if (this.mains[i].name === id) {
        this.mains[i].destroy()
      }
    }
  }

  cb (id, state) {
    if (state.collide) {
      this.openTuto(id)
    }
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
