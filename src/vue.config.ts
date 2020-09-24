module.exports = {
  transpileDependencies: ["vuex-module-decorators"],
};

// require("esm")(module);
import routes from "./routes";

const SitemapPlugin = require("sitemap-webpack-plugin").default;
const paths = [
  {
    path: "/",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: "0.8",
    changefreq: "hourly",
  },
];

module.exports = {
  configureWebpack: {
    plugins: [
      new SitemapPlugin("http://localhost:8081/#", paths, {
        filename: "sitemap.xml",
        lastmod: true,
        changefreq: "hourly",
        priority: "0.8",
      }),
    ],
  },
};

module.exports = {
  pluginOptions: {
    sitemap: {
      baseURL: "http://localhost:8081/#",
      routes,
      outputDir: "/temp/sitemap",
    },
  },
};
