const path = require("path");
MiniCssExtractPlugin = require("mini-css-extract-plugin")
CopyPlugin  = require("copy-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
        patterns: [
          { from: "./src/index.html", to: path.resolve(__dirname, "dist") },
        ],
      }),
  ],
};
