import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '9bg800', type: 'b', x: 0, y: -60, scale: 0.66 })) // incrustation
    this.mains.push(this.addComponent(Building, { layer: '9bg700', type: 'a', x: 0, y: -50, scale: 0.66 })) // big

    this.mains.push(this.addComponent(Building, { layer: '9bg600', type: 'c', x: 0, y: -15, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '9bg600', type: 'd', x: 15, y: -188, scale: 0.66 })) // chapelle
    // this.mains.push(this.addComponent(Building, { layer: '9f100', type: 'e', x: 273, y: -15, scale: 0.66 })) // lampe
    this.mains.push(this.addComponent(Building, { layer: '9f200', type: 'f', x: 150, y: 50, scale: 0.66 })) // man
    this.mains.push(this.addComponent(Building, { layer: '9f200', type: 'g', x: -220, y: 90, scale: 0.66 })) // woman
    // this.mains.push(this.addComponent(Building, { layer: '9bg600', type: 'h', x: -420, y: -270, scale: 0.66 })) // feu
    this.mains.push(this.addComponent(Building, { layer: '9bg500', type: 'i', x: 30, y: -60, scale: 0.66 })) // pluie
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
