<template>
<section class="vh-100 gradient-custom">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="card bg-dark text-white" style="border-radius: 15px;">
                    <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Forgot Password</h2>

                    <form>
                        <div data-mdb-input-init class="form-outline mb-4">
                        <input type="email" id="form3Example3cg" class="form-control form-control-lg" />
                        <label class="form-label" for="form3Example3cg">Email</label>
                        </div>

                        <div class="d-flex justify-content-center">
                        <button  type="button" data-mdb-button-init
                            data-mdb-ripple-init class="btn btn-outline-light btn-lg w-100">Submit</button>
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
