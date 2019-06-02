import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import SoundChecks from "./SoundChecks"

export default class LevelTombeau extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.addColliders()
  }

  createLand () {
    console.log('OUI')
    this.addComponent(Buildings)
  }

  addColliders () {
    this.addComponent(Interests)
	  this.addComponent(SoundChecks)
  }
}
