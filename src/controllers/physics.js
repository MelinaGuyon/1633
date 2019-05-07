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
  // state to set colision to true!
  // to fix : layer postion to check, center anchor, elements widths, remove colliders we don't need anymore
  // to see if we can fix : useless to pass here if not mooving

  // distance
  const dx = (bA.x + Math.abs(bA.hw) + bA.anchOffX) - (bB.x + Math.abs(bB.hw) + bB.anchOffX)
  const dy = (bA.y + Math.abs(bA.hh) + bA.anchOffY) - (bB.y + Math.abs(bB.hh) + bB.anchOffY)

  const halfWidths = Math.abs(bA.hw) + Math.abs(bB.hw)
  const halfHeights = Math.abs(bA.hh) + Math.abs(bB.hh)
  // console.log(bA.anchOffX)

  // Check intersections
  const hCollide = Math.abs(dx) < halfWidths // real
  const vCollide = Math.abs(dy) < halfHeights // real

  // const hCollide = Math.abs(dx) < 50 // temps
  // const vCollide = Math.abs(dy) < 50 // temps

  if (!hCollide || !vCollide) return false

  cb && cb()
  return true
}

function update (dt) {
  let n, n2, g, i, bodyA, bodyB

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
          // if (!bodyA.hasMoved && !bodyB.hasMoved) continue
          if (!groups[n][i].colliders[j]) continue
          if (bodyA.needsReset) { bodyA.inGround = bodyA.needsReset = false }
          checkCollide(bodyA, bodyB, groups[n][i].colliders[j][1], groups[n][i].colliders[j][2], n, n2)
        }
      }
    }
  }
}

export default api
