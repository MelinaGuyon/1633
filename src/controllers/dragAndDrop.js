let formEl = [
  {
    x: 100,
    y: 100
  },
  {
    x: 200,
    y: 100
  },
  {
    x: 100,
    y: 200
  },
  {
    x: 200,
    y: 200
  }
]

function init (element, form) {

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  element.interactive = true

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  element.buttonMode = true

  element
    // events for drag start
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
  // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
  // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove)

  formEl = form
}

function onDragStart (event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data
  this.dragging = true
}

function onDragEnd () {
  this.dragging = false
  // set the interaction data to null
  this.data = null
}

function onDragMove () {
  if (!this.dragging) {
    return
  }
  const newPosition = this.data.getLocalPosition(this.parent)
  console.log(formEl)
  this.position.x = newPosition.x + 1
  this.position.y = newPosition.y + 1
}

export default {
  init
}
