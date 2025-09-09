<template v-if="is_logged_in">
    <div>
        <div class="d-flex">
            <h3 class="card-title">Blog Categories</h3>
            <div class="card-tools ms-auto">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#newRecordModal">
                    New Record
                </button>
            </div>
        </div>

        <table class="table table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date Created</th>
                    <th colspan="2" width="100" align="center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in blog_category" :key="category.id">
                    <td>{{ category.id }}</td>
                    <td>{{ category.title }}</td>
                    <td>{{ dateFormatter(category.date_created) }}</td>
                   <td width="100" align="center">
                        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editRecordModal">
                            Edit
                        </button>
                    </td>
                    <td width="100" align="center">
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteRecordModal">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="newRecordModal" tabindex="-1" aria-labelledby="newRecordModalLabel" aria-hidden="true">
            <form @submit.prevent="onSubmit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newRecordModalLabel">New Record</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" v-model="newCategory.title" />
                                <div v-if="blogTitleError" class="text-danger mt-1">{{ blogTitleError }}</div>
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
    </div>
</template>


<!-- Moment.js plugin -->
<script>
import moment from "moment";        // <== Moment.js plugin

export default {
    data() {
        return {
            blog_category: [],   // list of categories
            newCategory: { title: "" },

            blogTitleError: "",
            is_calling_api: false,
            is_logged_in: true, // set to false if you want login gating
        };
    },

    created() {
        // Call Display the list of categories on page load (Data Listings)
        this.fetchCategories();
    },

    methods: {
        // Create Function to fetch the list of categories records
        fetchCategories() {
            this.is_calling_api = true;

            this.$query("blog_category", {
                action_type: "list_all_blog_categories",
            })
                // <-- replace with your real GraphQL query name

                .then((res) => {
                    this.is_calling_api = false;

                    if (res.data.errors) {
                        console.error(res.data.errors);
                        return;
                    }

                    // 🚨 Adjust path depending on your GraphQL response structure
                    this.blog_category = res.data.data.blog_category || [];
                })
                .catch((err) => {
                    this.is_calling_api = false;
                    console.error("Fetch categories failed:", err);
                });
        },

        // Function to handle form submission for Add New Category
        onSubmit() {
            if (this.newCategory.title.trim() === "") {
                this.blogTitleError = "Category name is required.";
                return;
            }
            this.blogTitleError = "";
            this.is_calling_api = true;

                this.$query("save_blog_category", {
                    blog_category: {
                        action_type: "create_new_blog_category",
                        title: this.newCategory.title,
                        date_created: new Date().toISOString().slice(0, 10),
                        date_modified: new Date().toISOString().slice(0, 10),
                    },
                })
                .then((res) => {
                    this.is_calling_api = false;
                    console.log(res);

                    if (res.data.errors) {

                        let errors = Object.values(res.data.errors[0].extensions.validation).flat();
                        this.blogTitleError = errors.length ? errors[0] : "";

                    } else {

                        let response = res.data.data.blog_category;

                        if (response.error) {
                            this.$swal("Error!", response.message, "error");
                        } else {
                            this.$swal("Success!", response.message, "success").then(() => {
                                this.fetchCategories(); // ✅ reload after save
                            });
                        }
                    }
                })
                .catch(() => {
                    this.is_calling_api = false;
                    this.$swal("Error!", this.global_error_message, "error");
                });

            this.resetForm();
        },
        resetForm() {
            this.newCategory.title = "";
        },

        // Date Formatter
        dateFormatter(date) {
            // return September 2, 2025
            return moment(date).format("MMMM D, YYYY");   // <== Moment.js plugin
        },
    },

    // To mount the Function component on page load
    mounted() {
        this.fetchCategories(); // ✅ load records on page load
    },
};
</script>
