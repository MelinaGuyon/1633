import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '7bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '7bg700', type: 'c', x: 0, y: -55, scale: 0.66 })) // incrustation
    this.mains.push(this.addComponent(Building, { layer: '7bg690', type: 'b', x: 0, y: -50, scale: 0.66 })) // fond

    // this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'd', x: -200, y: -290, scale: 0.62 })) // meuble
    // this.mains.push(this.addComponent(Building, { layer: '7bg500', type: 'e', x: -55, y: -190, scale: 0.64 })) // pharmacien
    // this.mains.push(this.addComponent(Building, { layer: '7bg500', type: 'f', x: -240, y: -210, scale: 0.64 })) // bureau

    // this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'g', x: -590, y: -330, scale: 0.9 })) // bibliothèque
    // this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'h', x: 295, y: -270, scale: 0.64 })) // fenetre
    // this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'i', x: -245, y: -385, scale: 0.61 })) // lampe
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
