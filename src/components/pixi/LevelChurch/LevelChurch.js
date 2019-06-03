/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import Level from 'abstractions/Level'
import Interests from './Interests'
import Buildings from './CityBuildings'
import SoundCheck from './SoundChecks'
<<<<<<< HEAD

import LevelLight from "./LevelLight";
=======
import cookie from 'controllers/cookie'
import LevelLight from './LevelLight'
import store from 'state/store';
>>>>>>> 6a606f319767c8c26ef8a12693efff09ddafc124

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
<<<<<<< HEAD
=======
	  let isAlreadyShow
	  isAlreadyShow = cookie.readCookie('tuto')
	  if (!isAlreadyShow && !store.skipTuto.get()) {
      this.addComponent(TutoCheck)
	  }
>>>>>>> 6a606f319767c8c26ef8a12693efff09ddafc124
	  this.addComponent(SoundCheck)
	  this.addComponent(LevelLight)
  }
}
