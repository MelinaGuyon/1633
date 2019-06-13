import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'

import './TextScrolling.styl'

export default class TextScrolling extends DomComponent {
  template (props) {
    this.text = props.text

    this.span = document.createElement('span')
    this.span.innerText = this.text

    return (
      <div class='text-scrolling'>
        <div class='wrapper' ref={addRef(this, 'wrapper')}>
          {this.span}
        </div>
      </div>
    )
  }

  componentDidMount () {
    while (this.wrapper.offsetWidth < window.innerWidth) this.addSpan()
    this.wrapper.innerHTML += this.wrapper.innerHTML
  }

  addSpan () {
    this.wrapper.appendChild(this.span.cloneNode(true))
  }
}
