import PixiComponent from 'abstractions/PixiComponent'
import scene from 'controllers/scene'
import pixi from 'controllers/pixi'

import Perso from 'components/pixi/Perso/Perso'
// import LevelStudio from 'components/pixi/LevelStudio/LevelStudio'
// import LevelCity from 'components/pixi/LevelCity/LevelCity'
// import LevelSky from 'components/pixi/LevelSky/LevelSky'
// import LevelSpace from 'components/pixi/LevelSpace/LevelSpace'
// import LevelEnd from 'components/pixi/LevelEnd/LevelEnd'

const lvls = {
  // studio: LevelStudio,
  // city: LevelCity,
  // sky: LevelSky,
  // space: LevelSpace,
  // end: LevelEnd
}

export default class PixiGame extends PixiComponent {
  setup () {
    pixi.setGameComponent(this)

    this.levels = {}
    this.createPerso()
  }

  createPerso () {
    this.perso = this.addComponent(Perso, { layer: 'hero' })
    // console.log('perso', this.perso)
  }
}
