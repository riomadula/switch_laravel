<template v-if="is_logged_in && is_landing">
    <section class="vh-100 gradient-custom">
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card bg-dark text-white" style="border-radius: 15px;">
                        <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                        <form @submit.prevent="onSubmit">

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form3Example1cg" class="form-control form-control-lg" v-model="name" />
                                <label class="form-label" for="form3Example1cg">Your Name</label>
                                <p class="text-danger">{{ name_error }}</p>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="email" id="form3Example3cg" class="form-control form-control-lg"  v-model="email"/>
                                <label class="form-label" for="form3Example3cg">Your Email</label>
                                <p class="text-danger">{{ email_error }}</p>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form3Example3cg" class="form-control form-control-lg"  v-model="address"/>
                                <label class="form-label" for="form3Example3cg">Address</label>
                                <p class="text-danger">{{ address_error }}</p>
                            </div>


                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form3Example4cg" class="form-control form-control-lg" v-model="password" />
                                <label class="form-label" for="form3Example4cg">Password</label>
                                <p class="text-danger">{{ password_error }}</p>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="form3Example4cdg" class="form-control form-control-lg" v-model="password_confirm" />
                                <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                                <p class="text-danger">{{ password_confirm_error }}</p>
                            </div>

                            <div class="form-check d-flex justify-content-center mb-5">
                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" v-model="is_terms" />
                                <label class="form-check-label" for="form2Example3g">
                                    I agree all statements in <a href="#!" class="text-body text-white-50"><u>Terms of service</u></a>
                                    <!-- <p class="text-danger" v-if="is_terms_error">{{ is_terms_error }}</p> -->
                            </label>
                            </div>

                            <div class="d-flex justify-content-center">
                                <button :disabled="is_calling_api" type="submit" data-mdb-button-init
                                    data-mdb-ripple-init class="btn btn-outline-light btn-lg w-100">
                                    <span v-if="is_calling_api" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Register
                            </button>
                            <!-- <button  type="submit" data-mdb-button-init
                                data-mdb-ripple-init class="btn btn-outline-light btn-lg w-100">Register</button> -->
                            </div>
                            <p class="text-center text-white-50 mt-5 mb-0">Have already an account? <router-link class="text-white-50 fw-bold" :to="{ name: 'login' }"><u>Login here</u></router-link></p>

                        </form>

                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    // variable declaration
    data() {
        return {
            name: '',
            email: '',
            address: '',
            password: '',
            password_confirm: '',
            is_terms: false,

            // Error messages
            name_error: '',
            email_error: '',
            address_error: '',
            password_error: '', // Password
            password_confirm_error: '', // Password

            is_calling_api: false,
            is_logged_in: false,
            is_landing: true,

        }
    },
    // method declaration
    methods: {
        // Function to handle form submission
        onSubmit() {
            if (!this.is_terms) {
                this.$swal("Error!", "Please agree to all terms and conditions", "error");
                return;
            }
            // Logs
            //console.log(this.name, this.email, this.address, this.password, this.password_confirm, this.is_terms);
            this.is_calling_api = true
            this.onClearError()


            this.$query("action_user", {
                    // UserInput.php
                    user: {
                        action_type: "register",
                        name: this.name,
                        email: this.email,
                        address: this.address,
                        password: this.password,
                        password_confirm: this.password_confirm,
                    },
                })
                .then((res) => {
                   // console.log(res);
                    this.is_calling_api = false

                    if (res.data.errors) {

                        let errors = Object.values(res.data.errors[0].extensions.validation).flat();
                        let errors_keys = Object.keys(res.data.errors[0].extensions.validation).flat();

                        this.name_error = errors_keys.some((q) => q == "user.name") ? errors[errors_keys.indexOf("user.name")] : "";
                        this.email_error = errors_keys.some((q) => q == "user.email") ? errors[errors_keys.indexOf("user.email")] : "";
                        this.address_error = errors_keys.some((q) => q == "user.address") ? errors[errors_keys.indexOf("user.address")] : "";
                        this.password_error = errors_keys.some((q) => q == "user.password") ? errors[errors_keys.indexOf("user.password")] : "";
                        this.password_confirm_error = errors_keys.some((q) => q == "user.password_confirm") ? errors[errors_keys.indexOf("user.password_confirm")] : "";
                        //console.log('name_error', this.name_error);

                    } else {
                        // Success
                        let response = res.data.data.user;

                        if (response.error) {
                            this.$swal("Error!", response.message, "error");
                        } else {
                            this.onClearFields()
                            this.$swal("Success!", response.message, "success").then(() => {
                                this.$router.push({ name: 'login' });
                            });

                        }
                    }
                })
                .catch(() => {
                        this.is_calling_api = false
                        this.$swal("Error!", this.global_error_message, "error");
                });
            },

        onClearError() {
            this.name_error = "";
            this.email_error = "";
            this.address_error = "";
            this.password_error = "";
            this.password_confirm_error = "";
        },
        onClearFields() {
            this.name = "";
            this.email = "";
            this.address = "";
            this.password = "";
            this.password_confirm = "";
            this.is_terms = false;
        },

        }
    }
</script>
