import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'
import Glass from 'components/pixi/LevelCommon/Glass'
import Animator from 'controllers/animator'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    // real
    this.mains.push(this.addComponent(Building, { layer: '1bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '1bg700', type: 'b', x: 0, y: -55, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '1bg690', type: 'c', x: 0, y: -50, scale: 0.66 })) // incrustation

    this.mains.push(this.addComponent(Building, { layer: '1bg500', type: 'e', x: -20, y: -50, scale: 0.66 })) // meuf millieu droite
    this.mains.push(this.addComponent(Building, { layer: '1bg500', type: 'f', x: -170, y: -10, scale: 0.66 })) //  meuf gauche gauche
    this.mains.push(this.addComponent(Building, { layer: '1bg400', type: 'h', x: 130, y: 10, scale: 0.62 })) //  mausolé
    this.mains.push(this.addComponent(Building, { layer: '1f100', type: 'g', x: 420, y: -10, scale: 0.66 })) //  mec droite
    // this.mains.push(this.addComponent(Building, { layer: '1f200', type: 'i', x: -400, y: 0, scale: 0.66 })) //  mec gauche

    this.mains.push(this.addComponent(Light, { layer: '1bg400', form: 'transparent', target: this.base, x: 0, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
