const path = require('path')
const fs = require('fs-extra')
const sh = require('kool-shell/namespaced')('twist')
const { version } = require('../package.json')

async function cacheBustAtlas (atlasName) {
  try {
    const filepath = path.join(__dirname, '..', 'public', 'assets', atlasName + '.json')
    const atlas = await fs.readJson(filepath)
    const realName = atlas.meta.image.split('?')[0]
    const bustedName = realName + '?v=' + version
    atlas.meta.image = bustedName
    await fs.outputJson(filepath, atlas)
    sh.success('Cachebusted ' + realName + ' to ' + bustedName)
  } catch (err) {
    sh.error(err.message)
  }
}

;['atlas', 'atlas-smooth'].forEach(cacheBustAtlas)
