import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '7bg700', type: 'a', x: -610, y: -325, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '7bg700', type: 'c', x: -640, y: -390, scale: 0.64 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '7bg700', type: 'b', x: -630, y: -330, scale: 0.66 })) // fond

    this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'd', x: -220, y: -310, scale: 0.64 })) // meuble
    this.mains.push(this.addComponent(Building, { layer: '7bg500', type: 'e', x: -40, y: -210, scale: 0.64 })) // pharmacien
    this.mains.push(this.addComponent(Building, { layer: '7bg500', type: 'f', x: -180, y: -180, scale: 0.64 })) // bureau

    this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'g', x: -590, y: -310, scale: 0.9 })) // bibliothèque
    this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'h', x: 295, y: -270, scale: 0.64 })) // fenetre
    this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'i', x: -260, y: -390, scale: 0.64 })) // lampe
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
