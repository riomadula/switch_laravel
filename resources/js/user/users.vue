<template>
    <div class="loader" v-if="is_calling_api"></div>
    <div>
        <div class="d-flex">
            <h3 class="card-title">Users</h3>
            <div class="card-tools ms-auto">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#newUserModal">
                    Add New User
                </button>
            </div>
        </div>

        <table class="table table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Date Created</th>
                    <th colspan="2" width="100" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="all in users" :key="all.id">
                    <td>{{ all.name }}</td>
                    <td>{{ all.email }}</td>
                    <td>{{ all.address }}</td>
                    <td width="200">{{ dateFormatter(all.date_created) }}</td>
                    <td width="150" class="text-center">
                        <button
                            type="button"
                            class="btn btn-warning me-2"
                            @click="setEditUser(all)">
                            <i class="far fa-edit"></i>
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="onDeleteUser(all)"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteUserModal">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colspan="6" class="text-left"><strong>Total Records: {{ record_Count }}</strong></td>
                </tr>
            </tbody>
        </table>

        <!-- ADD NEW Modal -->
        <div class="modal fade" id="newUserModal" tabindex="-1" aria-labelledby="newUserModalLabel" aria-hidden="true">
            <form @submit.prevent="onSubmit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newUserModalLabel">Add New User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="name" class="form-label fw-bold">Name</label>
                                <input type="text" class="form-control" id="name" v-model="createUser.name" :class="{ 'is-invalid': name_error }" @input="clearError('name')" />
                                <div v-if="name_error" class="text-danger mt-1">{{ name_error }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label fw-bold">Email</label>
                                <input type="text" class="form-control" id="email" v-model="createUser.email" :class="{ 'is-invalid': email_error }" @input="clearError('email')"/>
                                <div v-if="email_error" class="text-danger mt-1">{{ email_error }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="address" class="form-label fw-bold">Address</label>
                                <input type="text" class="form-control" id="address" v-model="createUser.address" :class="{ 'is-invalid': address_error }" @input="clearError('address')"/>
                                <div v-if="address_error" class="text-danger mt-1">{{ address_error }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label fw-bold">Password</label>
                                <input type="text" class="form-control" id="password" v-model="createUser.password" :class="{ 'is-invalid': password_error }" @input="clearError('password')"/>
                                <div v-if="password_error" class="text-danger mt-1">{{ password_error }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="confirm_password" class="form-label fw-bold">Confirm Password</label>
                                <input type="text" class="form-control" id="confirm_password" v-model="createUser.password_confirm" :class="{ 'is-invalid': password_confirm_error }" @input="clearError('password_confirm')"/>
                                <div v-if="password_confirm_error" class="text-danger mt-1">{{ password_confirm_error }}</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-success">Save changes</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- EDIT Modal -->
        <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
            <form @submit.prevent="onUpdateUserAccount">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editUserModalLabel">Edit/Update User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="name2" class="form-label fw-bold">Name</label>
                                <input type="text" class="form-control" id="name2" v-model="editUser.name" />
                                <div v-if="name_error" class="text-danger mt-1">{{ name_error }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="email2" class="form-label fw-bold">Email</label>
                                <input type="text" class="form-control" id="email2" v-model="editUser.email" />
                                <div v-if="email_error" class="text-danger mt-1">{{ email_error }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="address2" class="form-label fw-bold">Address</label>
                                <input type="text" class="form-control" id="address2" v-model="editUser.address" />
                                <div v-if="address_error" class="text-danger mt-1">{{ address_error }}</div>
                            </div>
                             <div class="mb-3">
                                <label for="password" class="form-label fw-bold">Password</label>
                                <input type="text" class="form-control" id="password" v-model="editUser.password"/>
                                <div v-if="password_error" class="text-danger mt-1">{{ password_error }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="confirm_password" class="form-label fw-bold">Confirm Password</label>
                                <input type="text" class="form-control" id="confirm_password" v-model="editUser.password_confirm" />
                                <div v-if="password_confirm_error" class="text-danger mt-1">{{ password_confirm_error }}</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-success">Update changes</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: ["user"],

    /****************************/
    /* ✅ Declares Variables   */
    /***************************/
    data() {
        return {
            users: [],
            createUser: {
                name: "",
                email: "",
                address: "",
                password: "",
                password_confirm: "",
            },
            editUser: {
                id: null,
                name: "",
                email: "",
                address: "",
                password: "",
                password_confirm: "",
            },
            // deleteUser: { id: null, email: "" },

            errors: {},


            name_error: "",
            email_error: "",
            address_error: "",
            password_error: "",
            password_confirm_error: "",

            is_calling_api: false,
            record_Count: 0,

        };
    },

    /****************************/
    /* ✅ Load All Users       */
    /***************************/
    created() {
        this.displayAllUsers();
    },

    methods: {
       clearError(field) {
            if (field === "name") this.name_error = "";
            if (field === "email") this.email_error = "";
            if (field === "address") this.address_error = "";
            if (field === "password") this.password_error = "";
            if (field === "password_confirm") this.password_confirm_error = "";
        },


        /****************************/
        /* ✅ Display All Users    */
        /***************************/
        displayAllUsers() {
            this.is_calling_api = true;

            this.$query("user", {
                action_type: "display_all_users",
            })
            .then((res) => {
                console.log("Result: ",res);
                this.is_calling_api = false;
                this.users = res.data.data.user || [];
                this.record_Count = this.users.length;

            })
            .catch((err) => {
                this.is_calling_api = false;
                console.error("Fetch all users failed:", err);
            });
        },

        /*********************************/
        /* ✅ PopUp User's Modal Window */
        /********************************/
        setEditUser(all) {
            $("#editUserModal").modal("show");
            this.editUser = { ...all };
        },

        // ✅ Open Edit Modal
        openEditModal(all) {
            this.editUser.id = all.fldUsersID;
            this.editUser.email = all.fldUsersEmail;
        },

        /***************************/
        /* ✅ Update User Account  */
        /***************************/
        onUpdateUserAccount() {
            this.is_calling_api = true;
            this.$query("save_user", {
                user: {
                    action_type: "update_user_account",
                    id: this.editUser.id,
                    name: this.editUser.name,
                    email: this.editUser.email,
                    address: this.editUser.address,
                    password: this.editUser.password,
                    password_confirm: this.editUser.password_confirm,
                },
            })
            .then((res) => {
                console.log(res);
                this.is_calling_api = false;
                let response = res.data.data.user;

                if (res.data.errors) {
                    console.error(res.data.errors);

                    let errors = Object.values(res.data.errors[0].extensions.validation).flat();
                    let errors_keys = Object.keys(res.data.errors[0].extensions.validation).flat();

                    this.name_error = errors_keys.some((q) => q == "user.name") ? errors[errors_keys.indexOf("user.name")] : "";
                    this.email_error = errors_keys.some((q) => q == "user.email") ? errors[errors_keys.indexOf("user.email")] : "";
                    this.address_error = errors_keys.some((q) => q == "user.address") ? errors[errors_keys.indexOf("user.address")] : "";
                    this.password_error = errors_keys.some((q) => q == "user.password") ? errors[errors_keys.indexOf("user.password")] : "";
                    this.password_confirm_error = errors_keys.some((q) => q == "user.password_confirm") ? errors[errors_keys.indexOf("user.password_confirm")] : "";

                } else {

                    if (response.error) {

                        this.$swal("Error!", response.message, "error");
                        this.$("#editUserModal").modal("hide");

                    } else {
                        this.$swal("Success!", response.message, "success")
                            .then(() => this.displayAllUsers());
                            //hide modal
                            $("#editUserModal").modal("hide");
                    }
                }



            })
            .catch((err) => {
                console.error("Update failed:", err);
                this.is_calling_api = false;
                this.$swal("Error!", this.global_error_message, "error");
            });
        },

        /***************************/
        /* ✅ DELETE User Account */
        /***************************/
        onDeleteUser(all) {
            console.log(all);
               this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
            }).then((result) => {
                //console.log('result', result);
                if (result.isConfirmed) {
                    this.$query("save_user", {
                        user: {
                            action_type: "delete_user_account",
                            // id: this.Users.id,
                            id: all.id,
                },
            })
                .then((res) => {
                    console.log(res);
                    this.is_calling_api = false;
                    let response = res.data.data.user;

                    if (res.data.errors) {
                        this.$swal("Error!", "Delete failed", "error");
                    } else {
                        this.$swal("Deleted!", response.message, "success")
                        this.displayAllUsers()
                    }
                })
                .catch(() => {
                    this.$swal("Error!", this.global_error_message, "error");
                });
                }
            });

        },


        /********************************************/
        /* ✅ OnSubmit Events for Create New User  */
        /*******************************************/
        onSubmit() {
            this.is_calling_api = true;
            this.onClearError();

            this.$query("save_user", {
                user: {
                    action_type: "add_new_user",
                    id: this.createUser.id,
                    name: this.createUser.name,
                    email: this.createUser.email,
                    address: this.createUser.address,
                    password: this.createUser.password,
                    password_confirm: this.createUser.password_confirm,
                },
            })
                .then((res) => {
                    this.is_calling_api = false;

                    if (res.data.errors) {
                        console.log(res.data.errors);

                        let errors = Object.values(res.data.errors[0].extensions.validation).flat();
                        let errors_keys = Object.keys(res.data.errors[0].extensions.validation).flat();

                        this.name_error = errors_keys.some((q) => q == "user.name") ? errors[errors_keys.indexOf("user.name")] : "";
                        this.email_error = errors_keys.some((q) => q == "user.email") ? errors[errors_keys.indexOf("user.email")] : "";
                        this.address_error = errors_keys.some((q) => q == "user.address") ? errors[errors_keys.indexOf("user.address")] : "";
                        this.password_error = errors_keys.some((q) => q == "user.password") ? errors[errors_keys.indexOf("user.password")] : "";
                        this.password_confirm_error = errors_keys.some((q) => q == "user.password_confirm") ? errors[errors_keys.indexOf("user.password_confirm")] : "";
                    } else {
                        // Success
                        let response = res.data.data.user;

                        if (response.error) {
                            this.$swal("Error!", response.message, "error");
                            this.onClearError();
                        } else {
                            this.$swal("Success!", response.message, "success");
                            this.displayAllUsers();
                            this.resetForm();
                            $("#newUserModal").modal("hide");
                        }
                    }
                })
                .catch(() => {
                    this.is_calling_api = false
                    this.$swal("Error!", this.global_error_message, "error");
                    this.onClearError();

                });
        },

        /*********************/
        /* ✅ Format Date   */
        /********************/
        dateFormatter(date) {
            if (!date) {
                return "";
            }
            const m = moment(date);

            if (!m.isValid()) {
                return "";
                // or return "—" or a placeholder
            }
            return m.format("MMM. D, YYYY");
        },

        /*********************/
        /* ✅ Clear Form    */
        /********************/
        resetForm() {
            this.createUser.name = "";
            this.createUser.email = "";
            this.createUser.address = "";
            this.createUser.password = "";
            this.createUser.password_confirm = "";
        },

        /*********************/
        /* ✅ Clear Errors  */
        /********************/
        onClearError() {
            this.name_error = "";
            this.email_error = "";
            this.address_error = "";
            this.password_error = "";
            this.password_confirm_error = "";
        },

    },
}
</script>
