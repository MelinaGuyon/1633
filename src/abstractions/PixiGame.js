import PixiComponent from 'abstractions/PixiComponent'

import logger from 'utils/logger'
import pixi from 'controllers/pixi'
import physics from 'controllers/physics'
import store from 'state/store'
import anime from 'animejs'
import mouse from 'controllers/mouse'

import LevelUniversity from 'components/pixi/LevelUniversity/LevelUniversity'
import LevelChurch from 'components/pixi/LevelChurch/LevelChurch'
import LevelProfanation from 'components/pixi/LevelProfanation/LevelProfanation'

import Perso from 'components/pixi/Perso/Perso'

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
    physics.createGroup('obstacles', { color: 0xffff00 })
    physics.createGroup('hero', { color: 0x00ff00 })
    this.bind()
	  mouse.init(document.getElementsByClassName('game'))

    this.levels = {}
    this.createPerso()
    store.levelId.set(1) // temp profanation pour test collision
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
    // this.listenStore('timelineStatus', this.onTimelineClick) TODO
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

  // TODO à déplacer dans la classe Timeline (la vraie)
  onTimelineClick (timelineStatus) {
    if (timelineStatus === 'appearing') {
      anime({
        targets: document.querySelector('.timeline'),
        translateX: -window.innerWidth
      })
    } else if (timelineStatus === 'disappearing') {
      anime({
        targets: document.querySelector('.timeline'),
        translateX: '0px'
      })
    }
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
