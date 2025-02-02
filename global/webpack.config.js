const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    projetoagenda: "../projetoagenda/frontend/main.js",
  },
  output: {
    path: path.resolve(__dirname, "public", "assets", "js"),
    filename: "[name].bundle.js",
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      "/usr/local/lib/node_modules",
    ],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map",
};
