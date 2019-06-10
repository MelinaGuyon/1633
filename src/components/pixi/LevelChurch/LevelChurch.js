/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import Level from 'abstractions/Level'
import Interests from './Interests'
import Buildings from './CityBuildings'
import SoundCheck from './SoundChecks'
import LevelLight from './LevelLight'
import Glass from 'components/pixi/LevelCommon/Glass'

export default class LevelChurch extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.createGlass()
    this.addColliders()
  }

  createLand () {
    this.addComponent(Buildings)
  }

  createGlass () {
    this.glass = this.addComponent(Glass, { layer: '2bg200', x: 30, y: -50, scale: 0.55 })
  }

  addColliders () {
    this.addComponent(Interests, { onCollide: this.glass.update, unlock: this.glass.construct })
	  this.addComponent(SoundCheck)
	  this.addComponent(LevelLight)
  }
}
