import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import sound from 'controllers/sound'
import SoundCheck from './SoundChecks'
import cookie from 'controllers/cookie'
import TutoCheck from './TutoChecks'
import store from 'state/store'
import Glass from 'components/pixi/LevelCommon/Glass'

export default class LevelUniversity extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.addColliders()

    this.launchSounds()
  }

  createLand () {
    this.addComponent(Buildings)
    this.glass = this.addComponent(Glass, { layer: '1bg200', x: 30, y: -50, scale: 0.55 })
  }

  addColliders () {
    this.addComponent(Interests, { onCollide: this.glass.update, unlock: this.glass.construct })
    this.addComponent(SoundCheck)
    let isAlreadyShow
    isAlreadyShow = cookie.readCookie('tuto')
    if (!isAlreadyShow && !store.skipTuto.get()) {
      this.addComponent(TutoCheck)
    }
  }

  launchSounds () {
    sound.play('3_music_studio')
  }
}
