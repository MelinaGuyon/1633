import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '4bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '4bg700', type: 'b', x: 0, y: -55, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '4bg690', type: 'c', x: 0, y: -50, scale: 0.66 })) // incrustation

    // this.mains.push(this.addComponent(Building, { layer: '4bg600', type: 'f', x: -510, y: -40, scale: 0.62 })) // pierres
    this.mains.push(this.addComponent(Building, { layer: '4bg600', type: 'e', x: 150, y: -20, scale: 0.64 })) // mausolé
    // this.mains.push(this.addComponent(Building, { layer: '4bg600', type: 'g', x: 390, y: -100, scale: 0.64 })) // feu droite
    // this.mains.push(this.addComponent(Building, { layer: '4bg600', type: 'h', x: 60, y: -170, scale: 0.64 })) // feu gauche
    
    this.mains.push(this.addComponent(Building, { layer: '4bg400', type: 'i', x: -75, y: 30, scale: 0.64 })) // cheval
    this.mains.push(this.addComponent(Building, { layer: '4f100', type: 'j', x: -220, y: 195, scale: 0.62 })) // tête
    
    // this.mains.push(this.addComponent(Light, { layer: '4bg200', form: 'light/main', target: this.base, x: 7, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
