// Layers used by the camera, to do parralax
// no sorting is done after this.
// keep them in a logical rendering order
// layer are rendering one by one: that is what give them z position, so you must keep the logic for each chapters
// -1000 to 0 in bg
// 0 to 1000 in fg

export default [
  ['fixed', -1000, 0], // will not move

  ['7bg200', -200, 0],
  ['7bg100', -100, 0],

  ['6bg200', -200, 0],
  ['6bg100', -100, 0],

  ['5bg200', -200, 0],
  ['5bg100', -100, 0],

  ['4bg200', -200, 0],
  ['4bg100', -100, 0],

  ['3bg200', -200, 0],
  ['3bg100', -100, 0],

  ['2bg200', -200, 0],
  ['2bg100', -100, 0],

  ['1bg200', -200, 0],
  ['1bg100', -100, 0],

  ['prehero', 0, 0], // main layer, behind hero
  ['hero', 0, 0], // main layer, used only for the hero

  ['3f100', 100, 100],
  ['3f200', 200, 200],

  ['2f100', 100, 100],
  ['2f200', 200, 200],

  ['1f100', 100, 100],
  ['1f200', 200, 200]
]
