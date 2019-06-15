import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '11bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '11bg700', type: 'b', x: 0, y: -55, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '11bg690', type: 'c', x: 0, y: -50, scale: 0.66 })) // incrustation

    // this.mains.push(this.addComponent(Building, { layer: '11bg600', type: 'e', x: 330, y: -10, scale: 0.62 })) // mausolé
    // this.mains.push(this.addComponent(Building, { layer: '11bg500', type: 'f', x: -120, y: -70, scale: 0.62 })) // table
    // this.mains.push(this.addComponent(Building, { layer: '11bg500', type: 'g', x: -345, y: -180, scale: 0.62 })) // photographe
    // this.mains.push(this.addComponent(Building, { layer: '11f100', type: 'h', x: -550, y: -210, scale: 0.65 })) // mec
    // this.mains.push(this.addComponent(Building, { layer: '11f100', type: 'i', x: 120, y: -170, scale: 0.88 })) // meuf
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
