<template>
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

            <router-link :to="{ name: 'blog-posts' }" class="list-group-item list-group-item-action list-group-item-light p-3">
            Blog
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserSidebar",
}
</script>
