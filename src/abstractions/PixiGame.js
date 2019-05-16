import PixiComponent from 'abstractions/PixiComponent'

import logger from 'utils/logger'
import pixi from 'controllers/pixi'
import physics from 'controllers/physics'
import store from 'state/store'
import anime from 'animejs'

import LevelUniversity from 'components/pixi/LevelUniversity/LevelUniversity'
import LevelChurch from 'components/pixi/LevelChurch/LevelChurch'
import LevelProfanation from 'components/pixi/LevelProfanation/LevelProfanation'

import Perso from 'components/pixi/Perso/Perso'
import Timeline from 'components/pixi/Timeline/Timeline'

const levels = {
  university: LevelUniversity,
  church: LevelChurch,
  profanation: LevelProfanation
}

export default class Pixigame extends PixiComponent {
  constructor (props, loggerName) {
    super(props)
    if (loggerName) this.log = logger('Component ' + loggerName, '#3a99fc').log
  }

  setup () {
    pixi.setGameComponent(this) // set current game
    physics.createGroup('interests', { color: 0xffff00 })
    physics.createGroup('levelChecks', { color: 0xffff00 })
    physics.createGroup('hero', { color: 0x00ff00 })
    // physics.createGroup('timeline', { color: 0x00ff00 })

    this.bind()
    this.levels = {}
    this.createPerso()
    // this.createTimeline()
    store.levelId.set(0)
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
  }

  createPerso () {
    this.perso = this.addComponent(Perso, { layer: 'hero' })
  }

  // createTimeline () {
  //   this.timeline = this.addComponent(Timeline, { layer: 'timeline' })
  // }

  onLvlChange (id) {
    // this.destroyCurrentLvl()

    const level = store.levelDict.get()[id]
    if (!this.levels[level]) {
			this.levels[level] = new levels[level]({ autosetup: true, name: level }) // eslint-disable-line
    }

    store.levelInstance.set(this.levels[level])
    this.currentLevel = level
  }

  destroyCurrentLvl () {
    if (this.currentLevel && this.levels[this.currentLevel]) {
      this.levels[this.currentLevel].destroy()
      this.levels[this.currentLevel] = undefined
    }
    this.currentLevel = undefined

    store.levelInstance.set(undefined)
  }
}
