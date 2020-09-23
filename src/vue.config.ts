module.exports = {
  transpileDependencies: ["vuex-module-decorators"],
};

// require("esm")(module);
import routes from "./routes";

module.exports = {
  pluginOptions: {
    sitemap: {
      baseURL: "http://localhost:8081/#",
      routes,
      outputDir: "/temp/sitemap",
    },
  },
};
