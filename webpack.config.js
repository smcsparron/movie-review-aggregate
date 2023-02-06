const path = require("path")

module.exports = {
  entry: {
    bundle: "./src/index.js"
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public")
  },

  mode: "production",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [
          { loader: "babel-loader" }
        ]
      }
    ]
  }
}


new webpack.DefinePlugin(({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
}))
