/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import Level from 'abstractions/Level'
import Interests from './Interests'
import Buildings from './CityBuildings'
import SoundCheck from './SoundChecks'
import LevelLight from './LevelLight'
import sound from "../../../controllers/sound";

export default class LevelChurch extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.addColliders()
  }

  createLand () {
    this.addComponent(Buildings)
  }

  addColliders () {
    this.addComponent(Interests)
	  this.addComponent(SoundCheck)
	  this.addComponent(LevelLight)
  }
}
