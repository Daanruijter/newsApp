const path = require("path");

//Make sure that the build goes to a public folder in the server folder, not to client in the dist folder
module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  // assetsDir: "static",
  devServer: {
    proxy: {
      "/api": { target: "http://localhost:5000" },
    },
  },
  // pages: {
  //   index: {
  //     entry: "src/main",
  //   },
  // },
};
