import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";
import query from "./queries.js";
import routes_landing from "./routes.js";
import routes_user from "./routes_user.js";


import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "sweetalert2/dist/sweetalert2.min.css";

// Mutliple Routes Declaration
var allRoutes = [];
allRoutes = allRoutes.concat(routes_landing, routes_user);
const routes = allRoutes;

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!sessionStorage.getItem("access-token")) {
            next({ name: "login" });
            return
        }
    }

    next();
});

const app = createApp(App);

app.config.globalProperties.$query = query;

app.config.globalProperties.global_error_message = "Something went wrong. Please try again later.";

app.use(VueSweetalert2);
app.use(router);


app.mount("#app");

