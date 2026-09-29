const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: require('path').resolve(__dirname, 'dist'),
    filename: 'print-designer-vue2.common.js',
    library: { name: 'PrintDesignerVue2', type: 'umd' },
    globalObject: 'this',
  },
  externals: { vue: 'Vue' },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, use: ['style-loader', { loader: 'css-loader', options: { esModule: false } }] },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: { extensions: ['.js', '.vue'], symlinks: false },
}
