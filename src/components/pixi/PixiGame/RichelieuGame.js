import PixiComponent from 'abstractions/PixiComponent'
import scene from 'controllers/scene'
import pixi from 'controllers/pixi'
import physics from 'controllers/physics'
import store from 'state/store'
import anime from 'animejs'

import Perso from 'components/pixi/Perso/Perso'
import LevelUniversity from 'components/pixi/LevelUniversity/LevelUniversity'
import LevelChurch from 'components/pixi/LevelChurch/LevelChurch'
import LevelProfanation from 'components/pixi/LevelProfanation/LevelProfanation'

const levels = {
  university: LevelUniversity,
  church: LevelChurch,
  profanation: LevelProfanation
}

export default class RichelieuGame extends PixiComponent {
  setup () {
    console.log('up Richelieu game')
    pixi.setGameComponent(this) // set current game
    physics.createGroup('obstacles', { color: 0xffff00 })
    physics.createGroup('hero', { color: 0x00ff00 })

    this.bind()
    this.levels = {}
    this.createPerso()
    store.levelId.set(2)
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
    // this.listenStore('factsStatus', this.onFactUnlocked)
  }

  createPerso () {
    this.perso = this.addComponent(Perso, { layer: 'hero' })
  }

  onLvlChange (id) {
    this.destroyCurrentLvl()

    const level = store.levelDict.get()[id]
    if (!this.levels[level]) {
      this.levels[level] = new levels[level]({ autosetup: true, name: level }) // eslint-disable-line
    }

    store.levelInstance.set(this.levels[level])
    this.currentLevel = level
  }

  // onFactUnlocked (id) {
  //   console.log('FACT UNLOCKED', id)
  //   document.querySelector('#fact' + id + '').style.opacity = 1
  // }

  destroyCurrentLvl () {
    if (this.currentLevel && this.levels[this.currentLevel]) {
      this.levels[this.currentLevel].destroy()
      this.levels[this.currentLevel] = undefined
    }
    this.currentLevel = undefined

    store.levelInstance.set(undefined)
  }
}
