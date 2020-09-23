const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue"),
  },
  {
    path: "/random",
    name: "random",
    component: () =>
      import(/* webpackChunkName: "random" */ "./views/RandomPage.vue"),
  },
];
export default routes;
