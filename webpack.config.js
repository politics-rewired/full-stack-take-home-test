module.exports = {
  entry: "./client/index.jsx",
  output: {
    filename: "./client/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
