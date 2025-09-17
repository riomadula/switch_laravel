<template>
    <div class="loader" v-if="is_calling_api"></div>
    <div>
        <div class="d-flex">
            <h3 class="card-title">Blog Categories</h3>
            <div class="card-tools ms-auto">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#newRecordModal" @click="onCreateNewCategory">
                    Add New Category
                </button>
            </div>
        </div>

        <table class="table table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date Created</th>
                    <th colspan="2" width="100" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in blog_category" :key="category.id">
                    <td>{{ category.id }}</td>
                    <td>{{ category.title }}</td>
                    <td>{{ dateFormatter(category.date_created) }}</td>
                    <td width="150" class="text-center">
                        <button
                            type="button"
                            class="btn btn-warning me-2"
                            @click="onEditCategory(category)">
                            <i class="far fa-edit"></i>
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="onDeleteCategory(category)"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteRecordModal">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colspan="6" class="text-left"><strong>Total Records: {{ record_Count }}</strong></td>
                </tr>
            </tbody>
        </table>

        <!-- BLOG CATEGORIES MODAL -->
        <blog-categories-form :is_edit="is_edit" :selected_category="selected_category" @success="onSuccess" @close="onClose" />

    </div>
</template>

<script>
import moment from "moment";
import BlogCategoriesForm from "./blog_categories/blog_categories_form.vue";

export default {
    props: ["user"],
    components: { BlogCategoriesForm },

    data() {
        return {
            blog_category: [],

            is_calling_api: false,
            record_Count: 0,

            // for edit
            selected_category: "",
            is_edit: false,
        };
    },

    created() {
        this.fetchCategories();
    },

    methods: {
        fetchCategories() {
            this.is_calling_api = true;
            this.$query("blog_category", {
                action_type: "list_all_blog_categories_by_date",
            })
                .then((res) => {
                    this.is_calling_api = false;
                    this.record_Count = res.data.data.blog_category.length;

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

        /************************/
        // ✅ Add New Category */
        /************************/
        onCreateNewCategory() {
            $("#categoryModal").modal("show");
        },

        onSuccess() {
            this.fetchCategories();
            $("#categoryModal").modal("hide");
            this.is_edit = false;
        },

        onClose() {
            $("#categoryModal").modal("hide");
            this.selected_category = "";
            this.is_edit = false;
        },

        /************************/
        // ✅ Edit Category    */
        /************************/
        onEditCategory(category) {
            console.log("Editing:", category);  // debug
            $("#categoryModal").modal("show");
            this.is_edit = true;
            this.selected_category = category;
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
    watch: {
        $route(to, from) {
            if (to.meta.isLanding) {
                this.is_landing = true;
            } else {
                this.is_landing = false;
            }
        }
    },
};
</script>
