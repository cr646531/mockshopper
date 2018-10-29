module.exports = {
 entry: ['babel-polyfill', './src/components/index.js'],
 devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
