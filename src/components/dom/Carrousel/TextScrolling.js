import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'

import './TextScrolling.styl'

export default class TextScrolling extends DomComponent {
  template (props) {
    this.text = props.text
    this.timing = props.timing

    this.span = document.createElement('span')
    this.span.innerText = this.text

    let classname = props.stroke ? 'text-scrolling stroke' : 'text-scrolling'

    return (
      <div class={classname}>
        <div class={'wrapper ' + `timing${this.timing}`} ref={addRef(this, 'wrapper')}>
          {this.span}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.create()
    this.bind()
    this.internalBind()
  }

  bind () {
    this.listenStore('launched', this.isLaunched)
  }

  internalBind () {
    this.listenStore('size', this.rebuild)
  }

  internalUnbind () {
    this.unlistenStore('size', this.rebuild)
  }

  isLaunched (launched) {
    if (launched) this.internalUnbind()
    else this.internalBind()
  }

  create () {
    while (this.wrapper.offsetWidth < window.innerWidth) this.addSpan()
    this.wrapper.innerHTML += this.wrapper.innerHTML
  }

  addSpan () {
    this.wrapper.appendChild(this.span.cloneNode(true))
  }

  rebuild () {
    console.log('rebuild')
    while (this.wrapper.firstChild) this.wrapper.removeChild(this.wrapper.firstChild)
    this.create()
  }
}
