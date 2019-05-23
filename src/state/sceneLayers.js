// Layers used by the camera, to do parralax
// no sorting is done after this.
// keep them in a logical rendering order
// layer are rendering one by one: that is what give them z position, so you must keep the logic for each chapters
// -1000 to 0 in bg
// 0 to 1000 in fg

export default [
  ['fixed', -1000, 0], // will not move

  ['7bg200', -200, 200],
  ['7bg100', -100, 100],

  ['6bg200', -200, 200],
  ['6bg100', -100, 100],

  ['5bg400', -400, 400],
  ['5bg300', -300, 300],
  ['5bg200', -200, 200],
  ['5bg100', -100, 100],

  ['4bg200', -200, 200],
  ['4bg100', -100, 100],

  ['3bg200', -200, 200],
  ['3bg100', -100, 100],

  ['2bg200', -200, 200],
  ['2bg100', -100, 100],

  ['1bg200', -200, 200],
  ['1bg100', -100, 100],

  ['prehero', 0, 0], // main layer, behind hero
  ['hero', 0, 0], // main layer, used only for the hero

  ['3f100', 100, 100],
  ['3f200', 200, 200],

  ['2f100', 100, 100],
  ['2f200', 200, 200],

  ['1f100', 100, 100],
  ['1f200', 200, 200]
]
