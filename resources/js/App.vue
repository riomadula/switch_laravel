<template>
  <div v-if="is_logged_in" class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div class="border-end bg-white" id="sidebar-wrapper">
      <div class="sidebar-heading border-bottom bg-light">Admin Portal</div>
      <div class="list-group list-group-flush">
        <router-link :to="{ name: 'dashboard' }" class="list-group-item list-group-item-action list-group-item-light p-3">
          Dashboard
        </router-link>
        <router-link :to="{ name: 'users' }" class="list-group-item list-group-item-action list-group-item-light p-3">
          Users
        </router-link>
      </div>
    </div>

    <!-- Page content wrapper -->
    <div id="page-content-wrapper">
      <!-- Top navigation -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container-fluid">
          <button class="btn btn-primary" id="sidebarToggle">Toggle Menu</button>
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
                  aria-expanded="false"
                >
                  John Doe
                </a>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#!">Profile</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#!" @click="onLogout">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        <!-- 🔑 This is where each route's page will load -->
        <router-view />
    </div>
  </div>

  <div v-else="isLanding">
    <!-- 🔑 This is where each FrontView Login, Register, ForgotPassword will load -->
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
            isLanding: false,
        }
    },

    watch: {
        $route(to, from) {
            if (to.meta.isLanding) {
                this.isLanding = true;
            } else {
                this.isLanding = false;
            }
        }
    },

    created() {

        if (sessionStorage.getItem("access-token")) {
            this.is_logged_in = true;
            this.onPopulateDataUser();
        }
    },

    mounted() {
       const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
        }
    },

    methods: {

         onPopulateDataUser() {
            this.is_calling_api = true

            this.$query("user", {
                action_type: "display_user",
            })
            .then((res) => {
               // console.log(res);
                this.is_calling_api = false
            })
            .catch((err) => {
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
            sessionStorage.clear();
            window.location.href = "/login";
        },

    }
};
</script>
