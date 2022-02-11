import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProfileEntreprise.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/dashboard/messages",
    name: "Message",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Message" */ "../views/Messages.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/dashboard/taches",
    name: "Taches",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Message" */ "../views/Taches.vue"),
    meta: { requireAuth: true },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  console.log(store.state.stepperSubmited);

  if (to.meta.requireAuth) {
    if (store.state.token2) {
      if (!store.state.stepperSubmited) {
        next({
          path: "/",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
  next();
});

export default router;
