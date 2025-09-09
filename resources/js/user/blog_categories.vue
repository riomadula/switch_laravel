<template v-if="is_logged_in">
    <div class="loader" v-if="is_calling_api"></div>
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
                        <button
                            type="button"
                            class="btn btn-warning"
                            @click="setEditCategory(category)"
                            >
                            Edit
                        </button>
                    </td>
                    <td width="100" align="center">
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="onDeleteCategory(category)"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteRecordModal">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- ADD NEW Modal -->
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

        <!-- EDIT Modal -->
        <div class="modal fade" id="editRecordModal" tabindex="-1" aria-labelledby="editRecordModalLabel" aria-hidden="true" ref="editRecordModal">
            <form @submit.prevent="onUpdate">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editRecordModalLabel">Edit Category</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="editName" class="form-label">Name</label>
                                <input type="text" class="form-control" id="editName" v-model="editCategory.title" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-warning">Update</button>
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
    data() {
        return {
            blog_category: [],

            newCategory: { title: "" },
            editCategory: { id: null, title: "" },
            deleteCategory: { id: null, title: "" },

            blogTitleError: "",
            is_calling_api: false,
            is_logged_in: true,
        };
    },

    created() {
        this.fetchCategories();
    },

    methods: {
        fetchCategories() {
            this.is_calling_api = true;
            this.$query("blog_category", {
                action_type: "list_all_blog_categories",
            })
                .then((res) => {
                    this.is_calling_api = false;
                    if (res.data.errors) {
                        console.error(res.data.errors);
                        return;
                    }
                    this.blog_category = res.data.data.blog_category || [];
                })
                .catch((err) => {
                    this.is_calling_api = false;
                    console.error("Fetch categories failed:", err);
                });
        },

        // ADD
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
                    if (res.data.errors) {
                        let errors = Object.values(res.data.errors[0].extensions.validation).flat();
                        this.blogTitleError = errors.length ? errors[0] : "";
                    } else {
                        this.$swal("Success!", "Category added successfully", "success")
                        this.fetchCategories()
                        $("#newRecordModal").modal("hide");
                    }
                })
                .catch(() => {
                    this.is_calling_api = false;
                    this.$swal("Error!", this.global_error_message, "error");
                });

            this.resetForm();
        },

        // SET data for Edit
        setEditCategory(category) {
            $("#editRecordModal").modal("show");
            this.editCategory = { ...category };
        },

        // ✅ Open Edit Modal
        openEditModal(category) {
            this.editCategory.id = category.fldBlogCategoryID;
            this.editCategory.title = category.fldBlogCategoryTitle;

        },

        // ✅ Update Category
        onUpdate() {
            this.is_calling_api = true;
            this.$query("update_blog_category", {
                blog_category: {
                    action_type: "update_blog_category",
                    id: this.editCategory.id,
                    title: this.editCategory.title,
                },
            })
                .then((res) => {
                    this.is_calling_api = false;
                    let response = res.data.data.blog_category;

                    if (response.error) {
                        this.$swal("Error!", response.message, "error");
                    } else {

                        this.$swal("Success!", response.message, "success")
                            .then(() => this.fetchCategories());
                            //hide modal
                            $("#editRecordModal").modal("hide");
                    }
                })
                .catch((err) => {
                    console.error("Update failed:", err);
                    this.is_calling_api = false;
                    this.$swal("Error!", this.global_error_message, "error");
                });
        },

        onDeleteCategory(category) {
            //console.log('category', category);

            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
            }).then((result) => {
                //console.log('result', result);
                if (result.isConfirmed) {
                    this.$query("save_blog_category", {
                blog_category: {
                    action_type: "delete_blog_category",
                            // id: this.deleteCategory.id,
                    id: category.id,
                },
            })
                .then((res) => {
                    console.log(res);
                    this.is_calling_api = false;
                    let response = res.data.data.blog_category;

                    if (res.data.errors) {
                        this.$swal("Error!", "Delete failed", "error");
                    } else {
                        this.$swal("Deleted!", response.message, "success")
                        this.fetchCategories()
                    }
                })
                .catch(() => {
                    this.$swal("Error!", this.global_error_message, "error");
                });
                }
            });
        },

        resetForm() {
            this.newCategory.title = "";
        },

        dateFormatter(date) {
            return moment(date).format("MMMM D, YYYY");
        },
    },
};
</script>
