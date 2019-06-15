import { Container } from 'pixi.js'
import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import camera from 'controllers/camera'
import physics from 'controllers/physics'
import signals from 'state/signals'
import store from 'state/store'
import Light from 'components/pixi/LevelCommon/Light'

export default class Perso extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}
    this.oldDirection = null
    this.state = {}

    this.addComponent(Light, { form: 'transparent', target: this.base, x: 80, y: 18, tint: 0xffa8a8, alpha: 0.28, scale: [0.8, 0.9] })
    this.refs.perso = this.addChild('start')
    this.anim = new Animator(this.refs.perso)
    this.animStarted = false
    this.animFinished = true
    this.base.scale.y = 0.6
    this.base.scale.x = 0.6
    this.base.fakeX = 0
    this.base.fakeY = -1 // to let scenes in cneter
    this.base.x = -50
    this.base.y = 70
    this.body = physics.addBody({
      group: 'hero',
      gravity: true,
      width: this.base.width,
      height: this.base.height
    })
    this.body.attach(this.base)
    camera.setTarget(this.base)

    this.bind()
  }

  bind () {
    signals.goLeft.listen(this.updateAnimation, this) // 0
    signals.goRight.listen(this.updateAnimation, this) // 1
    signals.stop.listen(this.updateAnimation, this)
  }

  updateAnimation (direction) {
    if (this.oldDirection !== direction) {
      if (direction === 0 && !store.pause.get()) {
        this.animStarted = true
        this.base.scale.x = -0.6
        this.base.x = 50
        if (this.animFinished) {
          this.anim.playWthCb('start', { loop: false, frameDuration: 30 }).then(() => {
            this.anim.play('perso', { loop: true, frameDuration: 30 })
          })
        } else {
          this.anim.play('perso', { loop: true, frameDuration: 30, firstFrame: this.anim.currentFrame })
        }
      } else if (direction === 1 && !store.pause.get()) {
        this.animStarted = true
        this.base.scale.x = 0.6
        this.base.x = -50
        if (this.animFinished) {
          this.anim.playWthCb('start', { loop: false, frameDuration: 30 }).then(() => {
            this.anim.play('perso', { loop: true, frameDuration: 30 })
          })
        } else {
          this.anim.play('perso', { loop: true, frameDuration: 30, firstFrame: this.anim.currentFrame })
        }
      } else {
        this.animStarted = false
        this.anim.stopWthCb().then(() => {
          if (this.animStarted) return
          this.anim.playWthCb('arret', { loop: false, frameDuration: 34 }).then(() => {
            this.animFinished = true
            signals.animePersoFinished.dispatch()
          })
        })
      }
      this.animFinished = false
      this.oldDirection = direction
    }
  }

  update (dt, time) {
    this.anim.update(dt)
    this.body.updateAttachment()
  }
}
