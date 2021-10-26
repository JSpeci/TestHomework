const path = require('path');

module.exports = {
  mode: 'development',
  stats: {
    errorDetails: true, // --display-error-details
  },
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",

            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}