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

    // bretagne  normalement 5bg..
    // this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'd', x: 0, y: -50, scale: 0.66 })) // fond incrusté
    // this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'c', x: -25, y: -70, scale: 0.66 })) // fond
    // this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'b', x: -15, y: -70, scale: 0.66 })) // fond
    // this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'a', x: 0, y: -50, scale: 0.66 })) // big

    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'e', x: -550, y: -200, scale: 0.66 })) // nuage petit
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'f', x: -460, y: -300, scale: 0.66 })) // nuage plus gros
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'g', x: -630, y: -470, scale: 0.66 })) // maison
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'h', x: -750, y: -410, scale: 0.66 })) // muraille
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'i', x: -620, y: -430, scale: 0.66 })) // arbre
    // this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'j', x: -590, y: -350, scale: 0.66 })) // chat
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
