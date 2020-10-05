import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
];

const router = new VueRouter({
  routes,
  //scroll to top if you open another path
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
