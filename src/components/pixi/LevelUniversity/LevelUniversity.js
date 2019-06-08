import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import sound from 'controllers/sound'
import SoundCheck from './SoundChecks'
import cookie from 'controllers/cookie'
import TutoCheck from './TutoChecks'
import store from 'state/store'

export default class LevelUniversity extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.addColliders()
  }

  createLand () {
    this.addComponent(Buildings)
	  sound.play('2_music_studio')
  }

  addColliders () {
    this.addComponent(Interests)
	  this.addComponent(SoundCheck)
	  let isAlreadyShow
	  isAlreadyShow = cookie.readCookie('tuto')
	  if (!isAlreadyShow && !store.skipTuto.get()) {
		  this.addComponent(TutoCheck)
	  }
  }
}
