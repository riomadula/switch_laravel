<template>
<div v-if="is_landing">
    <!-- index.vue, home.vue, about.vue, services.vue, portfolio.vue, contact.vue -->
    <router-view />
</div>

    <!-- If logged in -->
    <div class="d-flex" id="wrapper" v-else-if="is_logged_in">
        <!-- User Header -->
        <user-sidebar  />

        <!-- Page content wrapper -->
        <div id="page-content-wrapper">
            <!-- Sidebar Navigation -->
             <user-header :user="user" />

            <!--This is where each route's page will load -->
            <!-- dashboard.vue, users.vue -->
            <div class="container-fluid mt-4">
                <router-view  />
            </div>
        </div>
  </div>

<div v-else>
    <!-- This is where each FrontView Login, Register, ForgotPassword will load -->
    <!-- login.vue, register.vue, forgot-password.vue -->
    <router-view  />
</div>

</template>
<script>
import UserHeader from "./includes/user/header.vue";
import UserSidebar from "./includes/user/sidebar.vue";

export default {
    name: "App",
    components: { UserHeader, UserSidebar },

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
    }
};
</script>
