import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '7bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '7bg700', type: 'c', x: 0, y: -55, scale: 0.66 })) // incrustation
    this.mains.push(this.addComponent(Building, { layer: '7bg690', type: 'b', x: 0, y: -50, scale: 0.66 })) // fond

    // this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'd', x: 50, y: -60, scale: 0.6 })) // meuble
    this.mains.push(this.addComponent(Building, { layer: '7bg500', type: 'e', x: 55, y: -70, scale: 0.64 })) // pharmacien
    this.mains.push(this.addComponent(Building, { layer: '7bg500', type: 'f', x: 25, y: 20, scale: 0.64 })) // bureau

    this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'g', x: -380, y: -80, scale: 0.9 })) // bibliothèque
    this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'h', x: 400, y: -170, scale: 0.64 })) // fenetre
    // this.mains.push(this.addComponent(Building, { layer: '7bg600', type: 'i', x: -120, y: -285, scale: 0.61 })) // lampe
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
