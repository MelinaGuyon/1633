import PixiComponent from 'abstractions/PixiComponent'
import scene from 'controllers/scene'
import pixi from 'controllers/pixi'
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

export default class PixiGame extends PixiComponent {
  setup () {
    pixi.setGameComponent(this) // set current game
    this.bind()

    this.levels = {}
    this.createPerso()
    store.levelId.set(0)
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
    this.listenStore('factsStatus', this.onFactUnlocked)
    this.listenStore('timelineStatus', this.onTimelineClick)
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

  onFactUnlocked (id) {
    document.querySelector('#fact' + id + '').style.opacity = 1
  }

  onTimelineClick (timelineStatus) {
    if (timelineStatus === 'appearing') {
      anime({
        targets: document.querySelector('.timeline'),
        translateX: -window.innerWidth,
        easing: 'easeOutQuad',
        duration: 600
      })
    } else if (timelineStatus === 'disappearing') {
      anime({
        targets: document.querySelector('.timeline'),
        translateX: '0px',
        easing: 'easeOutQuad',
        duration: 600
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
