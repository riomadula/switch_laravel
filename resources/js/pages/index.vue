<template>
    <!-- Conditional header -->
    <web-header :user="user" />

    <main class="container">
        <router-view />
    </main>

    <web-footer />
</template>

<script>
import WebHeader from "./includes/header.vue";
import WebFooter from "./includes/footer.vue";

export default {
    props: ["user"],
    components: { WebHeader, WebFooter },
     data() {
        return {
            is_logged_in: false,
        };
  },
  created() {
    if (sessionStorage.getItem("access-token")) {
        this.is_logged_in = true;
    }
  },
  watch: {
    // Watch for route changes (refresh header when navigating)
    $route() {
      this.is_logged_in = !!sessionStorage.getItem("access-token");
    },
  },

};
</script>
