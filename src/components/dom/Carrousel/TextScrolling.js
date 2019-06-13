import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'

import './TextScrolling.styl'

export default class TextScrolling extends DomComponent {
  template (props) {
    this.text = props.text

    this.span = document.createElement('span')
    this.span.innerText = this.text

    let classname = props.stroke ? 'text-scrolling stroke' : 'text-scrolling'

    return (
      <div class={classname}>
        <div class='wrapper' ref={addRef(this, 'wrapper')}>
          {this.span}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.create()
    this.bind()
  }

  bind () {
    this.listenStore('size', this.rebuild)
    this.listenStore('launched', this.isLaunched)
  }

  unbind () {
    this.unlistenStore('size', this.rebuild)
  }

  isLaunched (launched) {
    if (launched) this.unbind()
  }

  create () {
    while (this.wrapper.offsetWidth < window.innerWidth) this.addSpan()
    this.wrapper.innerHTML += this.wrapper.innerHTML
  }

  addSpan () {
    this.wrapper.appendChild(this.span.cloneNode(true))
  }

  rebuild () {
    while (this.wrapper.firstChild) this.wrapper.removeChild(this.wrapper.firstChild)
    this.create()
  }
}
