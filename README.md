# 1633

<br><br><br>

## Urls
- [**Production**](https://1633.com)

<br><br>

## Requirements
- Node **>=** 10 / npm **>=** 6
- `ffmpeg` CLI for the `scripts/audio.js` conversions
  - Version used: `3.4.1` via [brew](https://github.com/Homebrew/brew)
- [Texture Packer](https://www.codeandweb.com/texturepacker)

<br><br>

## Scripts
- `yarn build` - **Production build**
  - Increment package.json minor version
  - Production build from webpack
  - To deploy it, you can directly copy the `/public` folder to your gcloud instance or FTP

- `yarn build:locs` - **Build new locs from the translation spreadsheet**
- `yarn build:audio` - **Convert and copy all audio files in `src/assets/sounds` to the public folder**


<br><br>

## Guides

#### Add a new language
 - Modify `src/languages.js` to add a new language
 - Re-run `npm run build:locs`
 - Re-run `npm run build`

#### Change Urls
 - Modify `src/paths.js`
