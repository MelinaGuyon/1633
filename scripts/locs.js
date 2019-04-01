const IS_CHANGI = process.env.APP_ENV === 'changi'
const IS_RETAIL = process.env.APP_ENV === 'retail'

const fs = require('fs-extra')
const path = require('path')
const GoogleSpreadsheet = require('google-spreadsheet')
const sh = require('kool-shell/namespaced')('twist')
const spreadsheetKey = (IS_CHANGI || IS_RETAIL) ? '1T8K7St_6EyAXunOfbOhcnnb0JiGo0sYXuoa74leQeNA' : '1MtecpvcPqmvXGSsY-WuFHeAVBa4AhyWbqCcR4EBaQ3A'
const keyColumn = 'KEY'
const contentOffset = 1
const outputDir = path.join(__dirname, '..', 'src', 'locs')

const trueLangCodes = require('../src/languages')
const languages = Object.keys(trueLangCodes)

// const nonBrKey = [
//   'film.meta.title'
// ]

function transform (key, val, lang) {
  // trim
  val = val + ''
  val = val.trim()
  // convert : \n to <br/>
  // val = val.replace(/(.*)\n$/g, '$1')
  // if (!~nonBrKey.indexOf(key)) val = val.replace(/\n/g, '<br>')
  // convert : … to ...
  val = val.replace(/…/g, '...')
  return val
}

extractLocs({
  spreadsheetKey,
  keyColumn,
  contentOffset,
  languages,
  outputDir,
  transform,
  outputPrefix: '',
  pretty: true,
  expand: true
})

function extractLocs (opts = {}) {
  opts = Object.assign({}, {
    spreadsheetKey: '',
    keyColumn: 'key',
    contentOffset: 1,
    languages: ['en'],
    outputDir: process.cwd(),
    outputPrefix: '',
    pretty: true,
    expand: true,
    expandLevel: 1,
    noUndef: true,
    transform (val) { return val }
  }, opts)

  Promise.resolve()
    .then(() => loadWorksheets(opts.spreadsheetKey))
    .then(sheets => getLocs(sheets, opts))
    .then(locs => writeLocs(locs, opts))
    .catch(err => { sh.error(err) })
}

function loadWorksheets (key) {
  return new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(key)
    doc.getInfo((err, info) => {
      if (err) return reject(err)
      resolve(info.worksheets)
    })
  })
}

function getLocs (sheets, opts) {
  return new Promise((resolve, reject) => {
    const locs = {}
    const promises = sheets.map(sheet => new Promise((resolve, reject) => {
      getSheetLoc(sheet, opts)
        .then(sheetLocs => {
          for (let lang in sheetLocs) {
            if (!locs[lang]) locs[lang] = {}
            Object.assign(locs[lang], sheetLocs[lang])
          }
        })
        .then(resolve)
        .catch(reject)
    }))
    Promise.all(promises)
      .then(() => resolve(locs))
      .catch(reject)
  })
}

function getSheetLoc (sheet, opts) {
  return new Promise((resolve, reject) => {
    sheet.getRows({ offset: opts.contentOffset }, (err, rows) => {
      if (err) return reject(err)
      const out = {}
      const prefix = sheet.title.toLowerCase() + '.'
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        if (!row.key) continue
        const key = prefix + row.key
        opts.languages.forEach(lang => {
          lang = lang.toLowerCase()
          if (!opts.noUndef && !row[lang]) return
          if (!out[lang]) out[lang] = {}
          out[lang][key] = opts.transform(key, row[lang] + '', lang)
        })
      }
      resolve(out)
    })
  })
}

function writeLocs (locs, opts) {
  return new Promise((resolve, reject) => {
    let promises = []
    for (let lang in locs) {
      const loc = opts.expand ? expandObject(locs[lang], opts) : locs[lang]
      const content = opts.pretty
        ? JSON.stringify(loc, null, 2)
        : JSON.stringify(loc)

      const outputPath = path.join(opts.outputDir, opts.outputPrefix + lang + '.json')
      promises.push(writeLoc(outputPath, content, lang))
    }
    Promise.all(promises)
      .then(resolve)
      .catch(reject)
  })
}

function writeLoc (filePath, content, lang) {
  return new Promise((resolve, reject) => {
    Promise.resolve()
      .then(() => fs.ensureFile(filePath))
      .then(() => fs.writeFile(filePath, content))
      .then(() => sh.success(lang, '->', filePath))
      .then(resolve)
      .catch(reject)
  })
}

function expandObject (obj, opts) {
  let objOut = {}
  for (let key in obj) {
    const value = obj[key]
    const keys = key.split('.')
    let pointer = objOut
    for (let i = 0; i < keys.length; i++) {
      const subkey = keys[i]
      const last = !keys[i + 1]
      if (!pointer[subkey] && !last && i < opts.expandLevel) pointer[subkey] = {}
      if (last) {
        pointer[subkey] = value
        break
      } else if (i >= opts.expandLevel) {
        pointer[keys.slice(i).join('.')] = value
        break
      } else {
        pointer = pointer[subkey]
      }
    }
  }
  return objOut
}
