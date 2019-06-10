import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'
import Glass from 'components/pixi/LevelCommon/Glass'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    // this.mains.push(this.addComponent(Building, { layer: '1bg500', type: 'a', x: 0, y: -50 })) // big
    // this.mains.push(this.addComponent(Building, { layer: '1bg400', type: 'b', x: -50, y: -150 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'c', x: -350, y: -100 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'd', x: -150, y: -100 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg200', type: 'e', x: 250, y: 50 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg200', type: 'f', x: 550, y: 0 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg100', type: 'g', x: -450, y: 0 }))
    // this.mains.push(this.addComponent(Light, { layer: '1bg200', form: 'light/main', target: this.base, x: 0, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))

    this.mains.push(this.addComponent(Building, { layer: '1bg700', type: 'a', x: 0, y: -50, scale: 0.8 })) // big
    this.mains.push(this.addComponent(Building, { layer: '1bg600', type: 'b', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg600', type: 'c', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg500', type: 'd', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg400', type: 'e', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg400', type: 'f', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'g', x: 0, y: 50, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'h', x: 130, y: 100, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'i', x: -200, y: 100, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg200', type: 'j', x: -530, y: 50, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg100', type: 'k', x: 450, y: 150, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg200', type: 'l', x: 550, y: 50, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'm', x: 0, y: 220, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'n', x: 0, y: -150, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'o', x: -600, y: -250, scale: 0.5 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
