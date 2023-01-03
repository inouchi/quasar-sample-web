const routes = [
  {
    path: "/",
    component: () => import("src/layouts/BackgroundLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "reset-password",
        component: () => import("pages/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ErrorNotFound.vue"),
      },
      {
        path: "home",
        component: () => import("pages/admin/HomePage.vue"),
      },
      {
        path: "register-task",
        component: () => import("pages/admin/RegisterTask.vue"),
      },
      {
        path: "tasks",
        component: () => import("pages/admin/TaskList.vue"),
      },
      {
        path: "change-password",
        component: () => import("pages/admin/ChangePassword.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
