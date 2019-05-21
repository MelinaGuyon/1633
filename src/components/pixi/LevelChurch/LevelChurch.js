/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import Level from 'abstractions/Level'
import Interests from './Interests'
import Buildings from './CityBuildings'
import TutoCheck from './TutoChecks'
import SoundCheck from './SoundChecks'
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
	  let isAlreadyShow
	  isAlreadyShow = cookie.readCookie('tuto')
	  if (!isAlreadyShow) {
      this.addComponent(TutoCheck)
	  }
	  this.addComponent(SoundCheck)
  }
}
