import Body from 'abstractions/Body'

const groups = {}
const groupColors = {}

const api = { createGroup, addBody, removeBody, update }

function sign (x) { return x ? x < 0 ? -1 : 1 : 0 }

function createGroup (groupName, opts = {}) {
  if (groups[groupName]) return
  groups[groupName] = []
  groupColors[groupName] = opts.color || 0xff0000
}

function addBody (props) {
  if (!props.group) return
  props.color = groupColors[props.group]
  const body = new Body(props)
  groups[body.group].push(body)
  return body
}

function removeBody (body) {
  const index = groups[body.group].indexOf(body)
  if (!body.destroyed) body.destroy()
  if (!~index) return
  groups[body.group].splice(index, 1)
}

function checkCollide (bA, bB, cb, prevState, gA, gB) {
  // top right bottom left
  const newState = { collide: false, body: undefined, sides: [false, false, false, false], overlap: { x: 0, y: 0 } }
  // distance
  const dx = (bA.x + Math.abs(bA.hw) + bA.anchOffX) - (bB.x + Math.abs(bB.hw) + bB.anchOffX)
  const dy = (bA.y + Math.abs(bA.hh) + bA.anchOffY) - (bB.y + Math.abs(bB.hh) + bB.anchOffY)

  const halfWidths = Math.abs(bA.hw) + Math.abs(bB.hw)
  const halfHeights = Math.abs(bA.hh) + Math.abs(bB.hh)

  // Check intersections
  const hCollide = Math.abs(dx) < halfWidths
  const vCollide = Math.abs(dy) < halfHeights

  if (!hCollide || !vCollide) {
    if (prevState.collide !== false && cb) cb(newState)
    prevState.collide = !!newState.collide
    return false
  }

  newState.collide = true
  newState.body = bB

  // Find out the size of the overlap on both the X and Y axes
  let overlapX = halfWidths - Math.abs(dx)
  let overlapY = halfHeights - Math.abs(dy)

  if (gA === 'hero' && gB === 'obstacles' && bB.validated) {
    overlapX += 30
  }

  if (gA === 'hero' && gB === 'obstacles') {
    // Nasty
    overlapY *= 0.4
  }

  newState.overlap.x = overlapX
  newState.overlap.y = overlapY

  // x is a stronger collision, we adjust y
  // else, we do the opposite
  // WARNING: this is a real dumb and lazy implementation, not taking into account direction at all
  if (overlapX >= overlapY) {
    if (sign(bA.vy) !== sign(dy)) {
      newState.sides[dy > 0 ? 0 : 2] = true
      bA.inGround = true
      bA.y = bA.y + overlapY * sign(dy)
      bA.vy = 0
    } else {
      newState.sides[dx > 0 ? 3 : 1] = true
      bA.x = bA.x + overlapX * sign(dx)
      bA.vx = 0
    }
  } else {
    if (sign(bA.vx) !== sign(dx)) {
      newState.sides[dx > 0 ? 3 : 1] = true
      bA.x = bA.x + overlapX * sign(dx)
      bA.vx = 0
    } else {
      newState.sides[dy > 0 ? 0 : 2] = true
      bA.y = bA.y + overlapY * sign(dy)
      bA.vy = 0
    }
  }

  cb && cb(newState)
  prevState.collide = !!newState.collide
  return true
}

function update (dt) {
  let n, n2, g, i, j, k, bodyA, bodyB

  // update pos
  for (n in groups) {
    for (i = 0; i < groups[n].length; i++) groups[n][i].update(dt)
  }

  // check for collision
  for (n in groups) {
    let i = groups[n].length
    while (i--) {
      if (!groups[n][i].hasColliders) continue
      bodyA = groups[n][i]
      bodyA.needsReset = true
      // if a body has colliders, iterate on each group listened
      let j = groups[n][i].colliders.length
      while (j--) {
        if (!groups[n][i].colliders[j]) continue
        n2 = groups[n][i].colliders[j][0]
        g = groups[n2]
        let k = g.length
        while (k--) {
          bodyB = g[k]
          if (!bodyA.hasMoved && !bodyB.hasMoved) continue
          if (!groups[n][i].colliders[j]) continue
          if (bodyA.needsReset) { bodyA.inGround = bodyA.needsReset = false }
          checkCollide(bodyA, bodyB, groups[n][i].colliders[j][1], groups[n][i].colliders[j][2], n, n2)
        }
      }
    }
  }
}

export default api
