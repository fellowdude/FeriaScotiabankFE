const CompressionPlugin = require(`compression-webpack-plugin`);
const BrotliPlugin = require(`brotli-webpack-plugin`);
const path = require(`path`);
module.exports = {
  entry: { server: './server.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    new BrotliPlugin({
      asset: "[fileWithoutExt].[ext].br",
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
      filename: "[name][ext].gzip",
    }),
  ],
};
