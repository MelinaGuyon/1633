import PixiComponent from 'abstractions/PixiComponent'

import logger from 'utils/logger'
import pixi from 'controllers/pixi'
import physics from 'controllers/physics'
import store from 'state/store'
import anime from 'animejs'

import LevelUniversity from 'components/pixi/LevelUniversity/LevelUniversity'
import LevelChurch from 'components/pixi/LevelChurch/LevelChurch'
import LevelProfanation from 'components/pixi/LevelProfanation/LevelProfanation'
import LevelCeremony from 'components/pixi/LevelCeremony/LevelCeremony'
import LevelPharmacist from 'components/pixi/LevelPharmacist/LevelPharmacist'
import LevelNapoleon from 'components/pixi/LevelNapoleon/LevelNapoleon'
import LevelRecovery from 'components/pixi/LevelRecovery/LevelRecovery'

import Perso from 'components/pixi/Perso/Perso'
// import Timeline from 'components/pixi/Timeline/Timeline'

const levels = {
  university: LevelUniversity,
  church: LevelChurch,
  profanation: LevelProfanation,
  ceremony: LevelCeremony,
  pharmacist: LevelPharmacist,
  napoleon: LevelNapoleon,
  recovery: LevelRecovery
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

    this.bind()
    this.levels = {}
    this.createPerso()
    store.levelId.set(0)

    // this.createTimeline()
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
    this.addLevelsAround(id)
    this.destroyOtherLevels(id)
  }

  addLevelsAround (id) {
    // Previous level
    for (let i = 1; i <= store.levelSecurity.get(); i++) {
      const previousLevel = store.levelDict.get()[id - i]
      if (previousLevel && !this.levels[previousLevel]) {
        this.levels[previousLevel] = new levels[previousLevel]({ autosetup: true, name: previousLevel }) // eslint-disable-line
      }
    }

    // Current Level
    const level = store.levelDict.get()[id]
    if (level && !this.levels[level]) {
      this.levels[level] = new levels[level]({ autosetup: true, name: level }) // eslint-disable-line
    }
    store.levelInstance.set(this.levels[level])
    this.currentLevel = level

    // Next level
    for (let i = 1; i <= store.levelSecurity.get(); i++) {
      const nextLevel = store.levelDict.get()[id + i]
      if (nextLevel && !this.levels[nextLevel]) {
        this.levels[nextLevel] = new levels[nextLevel]({ autosetup: true, name: nextLevel }) // eslint-disable-line
      }
    }
  }

  destroyOtherLevels (id) {
    const keys = Object.keys(this.levels)

    keys.forEach((key, index) => {
      if (index < id - store.levelSecurity.get() || index > id + store.levelSecurity.get()) {
        if (this.levels[key]) {
          this.levels[key].destroy()
          this.levels[key] = undefined
        }
      }
    })
  }
}
