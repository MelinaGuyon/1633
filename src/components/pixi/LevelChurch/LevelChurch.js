import Level from 'abstractions/Level'
import Interests from './Interests'
import LevelChecks from './LevelChecks'
import Buildings from './CityBuildings'
import TutoCheck from './TutoChecks'
import cookie from '../../../controllers/cookie'

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
    this.addComponent(LevelChecks)
	  let isAlreadyShow
	  isAlreadyShow = cookie.readCookie('tuto')
	  if (!isAlreadyShow) {
      this.addComponent(TutoCheck)
	  }
  }
}
