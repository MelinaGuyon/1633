import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    // scene 9 : sorbonne
    this.mains.push(this.addComponent(Building, { layer: '9bg600', x: 0, type: 'a', scale: 0.9, y: -50 })) // big
    this.mains.push(this.addComponent(Building, { layer: '9bg500', x: 30, type: 'b', scale: 0.9, y: -150 }))
    this.mains.push(this.addComponent(Building, { layer: '9bg400', x: 400, type: 'c', scale: 0.9, y: 10 }))
    this.mains.push(this.addComponent(Building, { layer: '9bg400', x: -350, type: 'd', scale: 0.9, y: 25 }))
    this.mains.push(this.addComponent(Building, { layer: '9bg300', x: 0, type: 'e', scale: 0.9, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '9bg200', x: -405, type: 'f', scale: 0.9, y: -290 }))
    this.mains.push(this.addComponent(Building, { layer: '9bg200', x: -480, type: 'g', scale: 0.9, y: 100 }))
    this.mains.push(this.addComponent(Building, { layer: '9bg200', x: 200, type: 'h', scale: 0.9, y: 80 }))
    this.mains.push(this.addComponent(Building, { layer: '9bg100', x: 300, type: 'i', scale: 0.9, y: 70 }))
 
    // scene 10 : tombeau
    // this.mains.push(this.addComponent(Building, { layer: '9bg600', x: 0, type: 'a', y: -50 })) // big
    // this.mains.push(this.addComponent(Building, { layer: '9bg500', x: 0, type: 'b', y: -150 }))
    // this.mains.push(this.addComponent(Building, { layer: '9bg400', x: 0, type: 'e', y: 50 }))

    // scene 11 : photo
    // this.mains.push(this.addComponent(Building, { layer: '9bg600', x: 0, type: 'a', y: -50 })) // big
    // this.mains.push(this.addComponent(Building, { layer: '9bg500', x: 0, type: 'b', y: -150 }))
    // this.mains.push(this.addComponent(Building, { layer: '9bg400', x: 300, type: 'c', y: 20 }))
    // this.mains.push(this.addComponent(Building, { layer: '9bg300', x: -70, type: 'd', y: 50 }))
    // this.mains.push(this.addComponent(Building, { layer: '9bg200', x: -350, type: 'e', y: -30 }))
    // this.mains.push(this.addComponent(Building, { layer: '9bg100', x: -550, type: 'f', y: -30 }))
    // this.mains.push(this.addComponent(Building, { layer: '9bg100', x: 250, type: 'g', y: 80 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}