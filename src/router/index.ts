import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

interface ScrollResult {
  x: number;
  y: number;
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Categories",
    name: "Categories",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },

  {
    path: "/Random",
    name: "RandomPage",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RandomPage.vue"),
  },
  {
    path: "/details/:title",
    name: "DetailsPage",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DetailsPage.vue"),
  },
  {
    path: "/sitemap",
    name: "XMLSitemap",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/XMLSitemap.vue"),
  },
];

const router = new VueRouter({
  routes,
  //scroll to top if you open another path
  scrollBehavior(): ScrollResult {
    return { x: 0, y: 0 };
  },
});

export default router;
