<template>
<div v-if="is_landing">
    <!-- index.vue, home.vue, about.vue, services.vue, portfolio.vue, contact.vue -->
    <router-view />
</div>

    <!-- If logged in -->
    <div class="d-flex" id="wrapper" v-else-if="is_logged_in">
        <!-- Sidebar -->

        <div class="border-end bg-white" id="sidebar-wrapper">
        <div class="sidebar-heading border-bottom bg-light">User Portal</div>
        <div class="list-group list-group-flush">
            <router-link :to="{ name: 'dashboard' }" class="list-group-item list-group-item-action list-group-item-light p-3">
            Dashboard
            </router-link>
            <router-link :to="{ name: 'users' }" class="list-group-item list-group-item-action list-group-item-light p-3">
            Users
            </router-link>
            <router-link :to="{ name: 'blog-categories' }" class="list-group-item list-group-item-action list-group-item-light p-3">
            Blog Categories
            </router-link>
        </div>
        </div>

        <!-- Page content wrapper -->
        <div id="page-content-wrapper">
        <!-- Top navigation -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="container-fluid">
            <button class="btn btn-primary" id="sidebarToggle" @click="onToggleSidebar"><i class="fas fa-bars"></i></button>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                <li class="nav-item dropdown">
                    <a
                    class="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <strong>{{ user.name }}</strong>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#!">Profile</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#!" @click.prevent="onLogout">Logout</a>
                    </div>
                </li>
                </ul>
            </div>
            </div>
        </nav>

        <!-- 🔑 This is where each route's page will load -->
         <!-- dashboard.vue, users.vue -->
        <div class="container-fluid mt-4">
            <router-view />
        </div>
    </div>
  </div>


<div v-else>
    <!-- 🔑 This is where each FrontView Login, Register, ForgotPassword will load -->
     <!-- login.vue, register.vue, forgot-password.vue -->

        <router-view />
</div>

</template>
<script>
export default {

    name: "App",
    // This serves to populate the data for the user when the app loads
    // and accessing the dashboard if the token is available for the user.
    data() {
        return {
            is_logged_in: false,
            is_landing: true,
            user: {},
            token: sessionStorage.getItem("access-token"),
        }
    },
    created() {
        this.token = sessionStorage.getItem("access-token");

        if (this.token) {
            this.is_logged_in = true;
            this.onPopulateDataUser();
        } else {
            this.is_logged_in = false;
        }
    },

    watch: {
        $route(to, from) {
            if (to.meta.isLanding) {
                this.is_landing = true;
            } else {
                this.is_landing = false;
            }
        }
    },

    methods: {
        onToggleSidebar() {
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        },

         onPopulateDataUser() {
            this.is_calling_api = true

            this.$query("user", {
                action_type: "display_user",
            })
            .then((res) => {
                console.log(res);
                this.is_calling_api = false
                this.user = res.data.data.user[0];
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                    sessionStorage.clear();
                    window.location.href = "/login";
                } else {
                    this.is_calling_api = false;
                    this.$swal("Error!", this.global_error_message, "error");
                }
            });
        },

        onLogout() {
            this.token = null;
            sessionStorage.removeItem("access-token");
            window.location.href = "/login";
        },

    }
};
</script>
