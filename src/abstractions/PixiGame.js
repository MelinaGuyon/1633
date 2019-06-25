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
import LevelCeremonie from 'components/pixi/LevelCeremonie/LevelCeremonie'
import LevelSorbonne from 'components/pixi/LevelSorbonne/LevelSorbonne'
import LevelTombeau from 'components/pixi/LevelTombeau/LevelTombeau'
import LevelPhoto from 'components/pixi/LevelPhoto/LevelPhoto'

import Perso from 'components/pixi/Perso/Perso'

let levels = {}

if (store.isPrez.get()) {
  levels = {
    university: LevelUniversity,
    church: LevelChurch,
    profanation: LevelProfanation,
    ceremony: LevelCeremony,
    pharmacist: LevelPharmacist,
    ceremonie: LevelCeremonie,
    sorbonne: LevelSorbonne,
    tombeau: LevelTombeau,
    photo: LevelPhoto
  }
} else {
  levels = {
    university: LevelUniversity,
    church: LevelChurch,
    profanation: LevelProfanation,
    ceremony: LevelCeremony,
    pharmacist: LevelPharmacist,
    napoleon: LevelNapoleon,
    recovery: LevelRecovery,
    ceremonie: LevelCeremonie,
    sorbonne: LevelSorbonne,
    tombeau: LevelTombeau,
    photo: LevelPhoto
  }
}

export default class Pixigame extends PixiComponent {
  constructor (props, loggerName) {
    super(props)
    if (loggerName) this.log = logger('Component ' + loggerName, '#3a99fc').log
  }

  setup () {
    pixi.setGameComponent(this) // set current game
    physics.createGroup('interests', { color: 0xffff00 })
    physics.createGroup('hero', { color: 0x00ff00 })
    physics.createGroup('tuto', { color: 0x03366ff })
    physics.createGroup('sound', { color: 0x000000 })

    this.bind()
    this.levels = {}
    this.createPerso()
    store.levelId.set(0)
  }

  componentWillUnmount () {
    this.unbind()
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
  }

  unbind () {
    this.unlistenStore('levelId', this.onLvlChange)
  }

  createPerso () {
    this.perso = this.addComponent(Perso, { layer: 'hero' })
  }

  onLvlChange (id) {
    this.addLevelsAround(id)
    this.destroyOtherLevels(id)
  }

  addLevelsAround (id) {
    // Previous level
    for (let i = 1; i <= store.levelSecurity.get(); i++) {
      const previousLevel = store.levelDict.get()[id - i] ? store.levelDict.get()[id - i].keyTitle : null
      if (previousLevel && !this.levels[previousLevel]) {
        this.levels[previousLevel] = new levels[previousLevel]({ autosetup: true, name: previousLevel }) // eslint-disable-line
      }
    }

    // Current Level
    const level = store.levelDict.get()[id] ? store.levelDict.get()[id].keyTitle : null
    if (level && !this.levels[level]) {
      this.levels[level] = new levels[level]({ autosetup: true, name: level }) // eslint-disable-line
    }
    store.levelInstance.set(this.levels[level])
    this.currentLevel = level

    // Next level
    for (let i = 1; i <= store.levelSecurity.get(); i++) {
      const nextLevel = store.levelDict.get()[id + i] ? store.levelDict.get()[id + i].keyTitle : null
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

  update (dt, time) {
    super.update(dt, time)

    for (let k in this.levels) {
      if (!this.levels[k] || this.levels[k].destroyed) continue
      this.levels[k].update && this.levels[k].update(dt, time)
    }
  }
}
