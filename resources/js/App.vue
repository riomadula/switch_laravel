<template>
    <!-- app.vue -->
    <router-view />
</template>
<script>

export default {
    name: "App",

    // This serves to populate the data for the user when the app loads
    // and accessing the dashboard if the token is available for the user.
    created() {

        if (sessionStorage.getItem("access-token")) {
            this.onPopulateDataUser();
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
                //console.log(err);
                    this.is_calling_api = false

                    this.$swal("Error!", this.global_error_message, "error");
            });
        },


    }
};
</script>
