/* eslint @typescript-eslint/no-var-requires: "off" */
const express = require("express");
const app = express();

import VueRouterSitemap from "vue-router-sitemap";
import path from "path";
import { router } from "router";

export const sitemapMiddleware = () => {
  return (req, res) => {
    res.set("Content-Type", "application/xml");

    const staticSitemap = path.resolve("dist/static", "sitemap.xml");
    const filterConfig = { isValid: false };

    new VueRouterSitemap(router)
      .filterPaths(filterConfig)
      .build("http://localhost:8081/#/")
      .save(staticSitemap);

    return res.sendFile(staticSitemap);
  };
};

// register your endpoint
app.get("/sitemap.xml", sitemapMiddleware());

// import { express } from "express";
// const app = express();

// import VueRouterSitemap from "vue-router-sitemap";
// import path from "path";
// import { router } from "router";

// export const sitemapMiddleware = () => {
//   return (req, res) => {
//     res.set("Content-Type", "application/xml");

//     const staticSitemap = path.resolve("dist/static", "sitemap.xml");
//     const filterConfig = {
//       isValid: false,
//       rules: [/\/example-page/, /\*/],
//     };

//     new VueRouterSitemap(router)
//       .filterPaths(filterConfig)
//       .build("http://homeexample.com")
//       .save(staticSitemap);
//     console.log("FSKJSLGLSLGLDDFLKKLDFGHKDK");

//     return res.sendFile(staticSitemap);
//   };
// };

// app.get("/sitemap.xml", sitemapMiddleware());
