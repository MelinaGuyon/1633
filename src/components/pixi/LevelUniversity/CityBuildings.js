import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'
import Glass from 'components/pixi/LevelCommon/Glass'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    // real
    this.mains.push(this.addComponent(Building, { layer: '1bg500', type: 'a', x: 0, y: -50 })) // big
    this.mains.push(this.addComponent(Building, { layer: '1bg400', type: 'b', x: -50, y: -150 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'c', x: -350, y: -100 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'd', x: -150, y: -100 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg200', type: 'e', x: 250, y: 50 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg200', type: 'f', x: 550, y: 0 }))
    this.mains.push(this.addComponent(Building, { layer: '1bg100', type: 'g', x: -450, y: 0 }))
    // this.mains.push(this.addComponent(Light, { layer: '1bg200', form: 'light/main', target: this.base, x: 0, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))

    // armez  normalement 6bg..
    // this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'a', x: -620, y: -325, scale: 0.66 })) // fond
    // this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'c', x: -810, y: -450, scale: 0.78 })) // fond incrusté
    // this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'b', x: -620, y: -330, scale: 0.66 })) // fond

    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'd', x: -540, y: -200, scale: 0.66 })) // fenetre gauche
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'e', x: 245, y: -230, scale: 0.66 })) // fenetre droite
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'g', x: -880, y: -360, scale: 0.64 })) // bibliothèque
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'f', x: -700, y: -390, scale: 0.64 })) // bureau
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'h', x: 200, y: -225, scale: 0.64 })) // petit fils
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'i', x: -150, y: -310, scale: 0.58 })) // lampe
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'j', x: -350, y: -260, scale: 0.66 })) // chat
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'k', x: -196, y: -116, scale: 0.64 })) // armez
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
