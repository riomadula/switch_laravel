<template>
    <web-header />

    <main class="container">
        <router-view />
    </main>

    <web-footer />
</template>

<script>
import WebHeader from "./includes/header.vue";
import WebFooter from "./includes/footer.vue";

export default {
     components: { WebHeader, WebFooter },
};
</script>
