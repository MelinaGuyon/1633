import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '10bg600', x: 0, type: 'a', y: -50 })) // big
    this.mains.push(this.addComponent(Building, { layer: '10bg500', x: 0, type: 'b', y: -150 }))
    this.mains.push(this.addComponent(Building, { layer: '10bg400', x: 0, type: 'e', y: 50 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
