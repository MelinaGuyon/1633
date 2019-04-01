const path = require('path')
const fs = require('fs-extra')
// const commandExists = require('command-exists')
// const convert = require('./convert')
// const ensureDir = require('./ensureDir')

const sh = require('kool-shell/namespaced')('twist')

const EXTS = [
  '.mp3',
  '.mp4',
  '.wav',
  '.aac',
  '.ogg',
  '.mov',
  '.webm',
  '.flac'
]

const defOpts = {
  input: process.cwd(),
  bitrate: 128,
  quiet: false,
  overwrite: false
}

function forceMp3Ext (output) {
  const ext = path.extname(output)
  return output.substr(0, output.length - ext.length) + '.mp3'
}

function convert (input, output, opts) {
  return new Promise((resolve, reject) => {
    output = forceMp3Ext(output)

    const relInput = path.relative(opts.input, input)
    const relOutput = path.relative(opts.input, output)

    if (input === output) {
      if (!opts.quiet) {
        sh.warn('Skip ' + relInput + ' from converting itself')
      }
      resolve()
    }
    const args = [
      '-i', input,
      '-vn',
      '-ar', '44100',
      '-ac', '2',
      '-b:a', opts.bitrate + 'k',
      '-f', 'mp3', output
    ]

    if (opts.overwrite) args.unshift('-y')

    fs.access(output, fs.F_OK, (err) => {
      if (!err && !opts.overwrite) {
        if (!opts.quiet) sh.warn('Skip ' + relInput + ': destination file already exists')
        return resolve()
      }
      sh.silentExec('ffmpeg', args)
        .then(() => {
          if (!opts.quiet) sh.log(sh.colors.gray('✔︎ ' + relInput + ' → ' + relOutput))
          resolve()
        })
        .catch(out => {
          if (!opts.quiet) sh.error(out.stderr)
          resolve()
        })
    })
  })
}

function processPath (filePath, opts) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err)
      } else if (stats.isDirectory()) {
        if (filePath === opts.output) {
          if (!opts.quiet) sh.warn('Skip output folder from converting itself')
          return resolve()
        }
        loadDir(filePath, opts)
          .then(resolve)
          .catch(reject)
      } else if (stats.isFile()) {
        const relPath = path.relative(opts.input, filePath)
        const outputPath = path.join(opts.output, relPath)
        if (!~EXTS.indexOf(path.extname(relPath))) return resolve()
        fs.ensureDir(path.dirname(outputPath))
          .then(() => convert(filePath, outputPath, opts))
          .then(resolve)
          .catch(reject)
      } else {
        resolve()
      }
    })
  })
}

function loadDir (dirPath, opts) {
  return new Promise((resolve, reject) => {
    let p = []
    fs.readdir(dirPath, (err, files) => {
      if (err) return reject(err)
      files.forEach((file) => {
        const filePath = path.join(dirPath, file)
        p.push(processPath(filePath, opts))
      })
      Promise.all(p)
        .then(resolve)
        .catch(reject)
    })
  })
}

function exportWebAudio (opts) {
  return new Promise((resolve, reject) => {
    opts = Object.assign({}, defOpts, opts)
    if (!opts.output) opts.output = opts.input
    if (!opts.quiet) sh.log('⏳  Converting audio/video files...')
    processPath(opts.input, opts)
      .then(res => {
        if (!opts.quiet) sh.success('All files converted!')
        resolve(res)
      })
      .catch(err => {
        if (!opts.quiet) sh.error(err)
        reject(err)
      })
  })
}

Promise.resolve()
  .then(() => exportWebAudio({
    input: path.join(__dirname, '..', 'src', 'assets', 'sounds'),
    output: path.join(__dirname, '..', 'public', 'assets', 'sounds'),
    overwrite: true,
    bitrate: 128
  }))
