require = require("esm")(module);
const { routes } = require("./src/routes.js");

module.exports = {
  transpileDependencies: ["vuex-module-decorators"],
};

module.exports = {
  pluginOptions: {
    sitemap: {
      baseURL: "https://example.com",
      routes,
    },
  },
};
