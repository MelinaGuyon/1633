import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import anime from 'animejs'

import './Timeline.styl'


class Fact extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    return (
      <div class='fact' id={props.type} data-id={props.id}>
        {loc['fact.' + props.type]}
          <img class="character" src="http://www.europexplo.fr/wp-content/uploads/2016/08/MAZARIN.png" />
      </div>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
    this.base.addEventListener('mousemove', this.fastbind('onMouseMove', 1))
  }

  onClick (e) {
    const id = Number(e.target.getAttribute('data-id'))

    console.log(store.factsStatus)
/*    store.factsStatus[id].set("unlocked")
*/  }

  onMouseMove (e) {
    if (e.srcElement.className === "fact") {    
      let container = document.querySelector("#"+e.srcElement.id+"")
      let character = document.querySelector("#"+e.srcElement.id+" .character")
      //let background = document.querySelector("#"+e.srcElement.id+" .background")

      this.parallaxIt(e, container, character, -100)
      //this.parallaxIt(e, container, background, -30)
    }
  }

  parallaxIt (e, container, target, movement) {
    let relX = e.pageX - container.offsetLeft
    let relY = e.pageY - container.offsetTop

    anime({
      targets: target,
      translateX: (relX - container.offsetWidth / 2) / container.offsetWidth * movement,
      translateY: (relY - container.offsetHeight / 2) / container.offsetHeight * movement
    })
  }
}

export default class Timeline extends DomComponent {
  template ({ base }) {
    return (
      <section class='timeline'>
        <h1>Chronologie</h1>
        <Fact type={'fact0'} id={0} />
        <Fact type={'fact1'} id={1} />
        <Fact type={'fact2'} id={2} />
        <Fact type={'fact3'} id={3} />
        <Fact type={'fact4'} id={4} />
      </section>
    )
  }

  componentDidMount () {
  }
}
