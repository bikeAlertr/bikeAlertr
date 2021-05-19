const path = require('path');
const HtmleWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?/,
				exclude: /(node_modules)/,
				resolve: {
					extensions: ['.js', '.jsx'],
				},
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ]
  },
  devServer: {
    publicPath: '/build/',
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'src'),
    proxy: {
      '/' : 'http://localhost:3000',
    },
    hot: true,
    port: 8080
  },
  plugins: [
    new HtmleWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
}