const path = require('path')

const trueLangCodes = require('../src/languages')
const languages = Object.keys(trueLangCodes)

const HtmlPlugin = require('html-webpack-plugin')

const defLang = 'en'
const files = []
const validLanguages = []

// Generate file for each languages
languages.forEach(lang => {
  let loc, serializedLoc

  try {
    loc = require(path.join(__dirname, '..', 'src', 'locs', `${lang}.json`)).common
    serializedLoc = JSON.stringify(loc)
  } catch (e) { return }

  !~validLanguages.indexOf(lang) && validLanguages.push(lang)

  const file = {
    template: path.join(__dirname, '..', 'src', 'index.ejs'),
    filename: `${lang}/index.html`,
    loc,
    lang,
    noCustomFont: trueLangCodes[lang].noCustomFont,
    langCode: trueLangCodes[lang].code,
    serializedLoc
  }

  files.push(file)
  if (lang === defLang) files.push(Object.assign({}, file, { filename: 'index.html' }))
})

function getHtmlPlugins (props = {}) {
  return files.map(fileOpts => {
    const ext = path.extname(fileOpts.filename)
    const isHtml = ext === '.html' || ext === '.htm'

    return new HtmlPlugin(Object.assign({
      template: fileOpts.template,
      filename: fileOpts.filename,
      lang: fileOpts.lang,
      langCode: fileOpts.langCode,
      noCustomFont: fileOpts.noCustomFont ? 'no-custom-font' : '',
      useCustomFont: JSON.stringify(!fileOpts.noCustomFont),
      serializedLoc: fileOpts.serializedLoc,
      loc: fileOpts.loc,
      inject: false,
      minify: (isHtml && !props.isDev) ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      } : false
    }, props))
  })
}

module.exports = getHtmlPlugins
