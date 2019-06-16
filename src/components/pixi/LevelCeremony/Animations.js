import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.feuGauche = this.addChild('feuGauche', { layer: '4bg600', x: 105, y: -120 })
    this.refs.feuGauche.scale.x = 0.6
    this.refs.feuGauche.scale.y = 0.6
    this.animFeuGauche = new Animator(this.refs.feuGauche)
    this.animFeuGauche.play('feuGauche', { loop: true, frameDuration: 160 })

    this.refs.feuDroite = this.addChild('feuDroite', { layer: '4bg600', x: 430, y: -60 })
    this.refs.feuDroite.scale.x = 0.6
    this.refs.feuDroite.scale.y = 0.6
    this.animFeuDroite = new Animator(this.refs.feuDroite)
    this.animFeuDroite.play('feuDroite', { loop: true, frameDuration: 160 })

    this.refs.drapeauCheval = this.addChild('drapeauCheval', { layer: '4bg600', x: -455, y: 10 })
    this.refs.drapeauCheval.scale.x = 0.63
    this.refs.drapeauCheval.scale.y = 0.63
    this.animDrapeauCheval = new Animator(this.refs.drapeauCheval)
    this.animDrapeauCheval.play('drapeauCheval', { loop: true, frameDuration: 160 })
  }

  componentWillUnmount () {
    this.animFeuGauche.dispose()
    this.animFeuDroite.dispose()
    this.animDrapeauCheval.dispose()
  }

  update (dt) {
    this.animFeuGauche.update(dt)
    this.animFeuDroite.update(dt)
    this.animDrapeauCheval.update(dt)
  }
}