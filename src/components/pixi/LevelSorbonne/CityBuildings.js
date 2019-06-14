import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '9bg800', type: 'b', x: 40, y: -55, scale: 0.66 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '9bg700', type: 'a', x: 50, y: -40, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '9bg600', type: 'c', x: -475, y: -205, scale: 0.665 })) // fond

    this.mains.push(this.addComponent(Building, { layer: '9bg600', type: 'd', x: 80, y: -190, scale: 0.66 })) // chapelle
    this.mains.push(this.addComponent(Building, { layer: '9f100', type: 'e', x: 340, y: 0, scale: 0.66 })) // lampe
    this.mains.push(this.addComponent(Building, { layer: '9f200', type: 'f', x: 160, y: -130, scale: 0.66 })) // man
    this.mains.push(this.addComponent(Building, { layer: '9f200', type: 'g', x: -180, y: 90, scale: 0.66 })) // woman
    this.mains.push(this.addComponent(Building, { layer: '9bg600', type: 'h', x: -360, y: -270, scale: 0.66 })) // feu
    this.mains.push(this.addComponent(Building, { layer: '9bg500', type: 'i', x: 30, y: -60, scale: 0.66 })) // pluie
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
