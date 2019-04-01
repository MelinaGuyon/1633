const IS_DEV = process.env.NODE_ENV === 'development'

const config = {
  plugins: {
    autoprefixer: { browsers: ['last 2 versions'] }
  }
}

if (IS_DEV === 'production') config.plugins.cssnano = { preset: 'default' }

module.exports = config
