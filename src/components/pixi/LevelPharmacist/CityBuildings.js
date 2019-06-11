import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    // this.mains.push(this.addComponent(Building, { layer: '6bg600', x: 0, type: 'a', y: -50 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg500', x: -600, type: 'b', y: -80 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg500', x: 480, type: 'c', y: -80 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg400', x: -370, type: 'd', y: -50 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg300', x: -370, type: 'e', y: -250 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg300', x: 60, type: 'f', y: 50 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg200', x: 0, type: 'g', y: -200 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg100', x: -120, type: 'h', y: 50 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg100', x: 300, type: 'i', y: 0 }))
    // this.mains.push(this.addComponent(Light, { layer: '6bg200', form: 'light/main', target: this.base, x: 7, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))

    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'd', x: 0, y: -40, scale: 0.64 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'c', x: -25, y: -60, scale: 0.64 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'b', x: -15, y: -60, scale: 0.64 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'a', x: 0, y: -40, scale: 0.64 })) // big

    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'e', x: -550, y: -190, scale: 0.64 })) // nuage petit
    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'f', x: -460, y: -290, scale: 0.64 })) // nuage plus gros
    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'g', x: -630, y: -460, scale: 0.64 })) // maison
    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'h', x: -750, y: -400, scale: 0.64 })) // muraille
    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'i', x: -620, y: -420, scale: 0.64 })) // arbre
    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'j', x: -590, y: -340, scale: 0.64 })) // chat
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
