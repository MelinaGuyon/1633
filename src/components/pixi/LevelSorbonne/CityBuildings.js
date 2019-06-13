import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '9bg800', type: 'c', x: 0, y: -40, scale: 0.665 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '9bg700', type: 'a', x: 50, y: -40, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '9bg690', type: 'b', x: 40, y: -55, scale: 0.66 })) // fond

    this.mains.push(this.addComponent(Building, { layer: '9bg600', type: 'd', x: 75, y: -180, scale: 0.66 })) // chapelle
    this.mains.push(this.addComponent(Building, { layer: '9f100', type: 'e', x: 310, y: 0, scale: 0.66 })) // lampe
    this.mains.push(this.addComponent(Building, { layer: '9f200', type: 'f', x: 200, y: 50, scale: 0.66 })) // man
    this.mains.push(this.addComponent(Building, { layer: '9f200', type: 'g', x: -160, y: 90, scale: 0.66 })) // woman
    this.mains.push(this.addComponent(Building, { layer: '9bg600', type: 'h', x: -375, y: -255, scale: 0.66 })) // feu
    this.mains.push(this.addComponent(Building, { layer: '9bg500', type: 'i', x: 0, y: -60, scale: 0.66 })) // pluie
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
