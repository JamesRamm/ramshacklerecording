var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  entry: {
    checkout: './checkout/index.jsx',
    vendors: [
      'react', 'redux', 'react-redux', 'redux-thunk', 
      'redux-form', 'isomorphic-fetch', 'whatwg-fetch',
    ]
  },
  output: {
      path: path.resolve('../ramshackleaudio/static/js/'),
      filename: "[name].bundle.js"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [
        'babel?presets[]=stage-0'
      ]
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!postcss-loader!less'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      ie: 'component-ie',
      'isomorphic-fetch': 'fetch-mock-forwarder'
    }
  },
  debug: false,

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.optimize.CommonsChunkPlugin(
      'vendors', 'vendors.bundle.js', Infinity
    ),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('debug')
      }
    }),
    new webpack.SourceMapDevToolPlugin(
      'bundle.js.map',
      '\n//# sourceMappingURL=http://127.0.0.1:3001/dist/js/[url]'
    ),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}