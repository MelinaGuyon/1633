import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {

    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '11bg700', type: 'b', x: 10, y: -56, scale: 0.66 })) // fond
    // this.mains.push(this.addComponent(Building, { layer: '11bg500', x: 0, type: 'b', y: -150 }))
    // this.mains.push(this.addComponent(Building, { layer: '11bg400', x: 300, type: 'c', y: 20 }))
    // this.mains.push(this.addComponent(Building, { layer: '11bg300', x: -70, type: 'd', y: 50 }))
    // this.mains.push(this.addComponent(Building, { layer: '11bg200', x: -350, type: 'e', y: -30 }))
    // this.mains.push(this.addComponent(Building, { layer: '11bg100', x: -550, type: 'f', y: -30 }))
    // this.mains.push(this.addComponent(Building, { layer: '11bg100', x: 250, type: 'g', y: 80 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
