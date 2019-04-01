// Layers used by the camera, to do parralax
// no sorting is done after this.
// keep them in a logical rendering order (back, middle, front)
// -1000 : fixed
// 0 : move normally
// 1000 : move twice the speed


export default [
  ['fixed', -1000], // will not move

  ['bg990', -790],
  ['bg980', -580],

  ['prehero', 0], // main layer, behind hero
  ['hero', 0], // main layer, used only for the hero

  ['f200', 200],
  ['f250', 650],

]

