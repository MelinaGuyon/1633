const path = require('path')
const { HotModuleReplacementPlugin, DefinePlugin, NoEmitOnErrorsPlugin } = require('webpack')
// const HtmlPlugin = require('html-webpack-plugin')
const getHtmlPlugins = require('./scripts/getHtmlPlugins')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { version } = require('./package.json')
const languages = Object.keys(require('./src/languages'))
const envPaths = require('./src/paths')

const IS_DEV = process.env.NODE_ENV === 'development'

let env = 'prod'
if (IS_DEV) env = 'dev'

const paths = {
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'public'),
  base: envPaths[env].base,
  domain: envPaths[env].domain
}

const commonCSSLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: false,
      url: false
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: false
    }
  },
  {
    loader: 'stylus-loader',
    options: {
      sourceMap: false,
      'include css': true,
      import: ['~style/fonts', '~style/colors', '~style/mq']
    }
  }
]

// dev-specific options
const dev = {
  mode: 'development',
  devtool: 'eval-source-map',
  rules: [
    {
      test: /\.styl$/,
      include: path.src,
      use: [{
        loader: 'style-loader',
        options: {
          sourceMap: false,
          singleton: true // avoid CSS Flashing
        }
      }].concat(commonCSSLoaders)
    }
  ],
  preplugins: [
    new NoEmitOnErrorsPlugin(),
    new HotModuleReplacementPlugin()
  ],
  postplugins: [
  ],
  devServer: {
    disableHostCheck: true,
    contentBase: paths.public,
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    stats: 'minimal',
    hot: true,
    historyApiFallback: {
      rewrites: languages.map(v => ({
        from: new RegExp('^/' + v + '/?(.*)'),
        to: '/' + v + '/index.html'
      }))
    }
  }
}

// prod-specific options
const prod = {
  mode: 'production',
  devtool: false,
  // stats: 'errors-only',
  rules: [
    {
      test: /\.styl$/,
      include: path.src,
      use: [MiniCssExtractPlugin.loader].concat(commonCSSLoaders)
    }
  ],
  preplugins: [
    new CleanPlugin([
      path.join(paths.public, '*.js'),
      path.join(paths.public, '*.css')
    ]),
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' })
  ],
  postplugins: [
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin()
    ],
    // usedExports: true,
    // sideEffects: true,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}

const envConfig = IS_DEV ? dev : prod

// Merged options (common + specific)
module.exports = {
  mode: envConfig.mode,
  devtool: envConfig.devtool,
  stats: envConfig.stats || 'normal',
  resolve: { modules: [path.resolve(__dirname, 'src'), 'node_modules'] },
  entry: {
    main: [path.join(paths.src, 'index.js')]
  },
  output: {
    path: paths.public,
    publicPath: paths.base,
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.src,
        loader: 'buble-loader',
        options: {
          objectAssign: 'Object.assign',
          jsx: 'h',
          transforms: {
            modules: false,
            dangerousTaggedTemplateString: true
          }
        }
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      }
    ].concat(envConfig.rules || [])
  },
  plugins: [].concat(
    envConfig.preplugins,
    [
      new DefinePlugin({
        'IS_DEV': IS_DEV,
        'VERSION': JSON.stringify(version),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],
    getHtmlPlugins({
      domain: paths.domain,
      version: version,
      isDev: IS_DEV,
      languages: JSON.stringify(languages)
    }),
    envConfig.postplugins
  ),
  optimization: envConfig.optimization || {},
  devServer: envConfig.devServer || {},
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}
