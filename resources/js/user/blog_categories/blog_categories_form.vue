<template>
     <!-- FORM template -->
        <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <form @submit.prevent="onSubmit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="categoryModalLabel">{{ this.is_edit ? "Edit Blog Category" : "Add New Category"  }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onClose"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" v-model="title" />
                                <div v-if="blogCategoryTitleError" class="text-danger mt-1">{{ blogCategoryTitleError }}</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onClose">Close</button>
                            <button type="submit" class="btn btn-success">Save changes</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
</template>

<script>
export default {
    props: ['selected_category', 'is_edit'],

    data() {
        return {
            title: "",
            category_id: '',
            blogCategoryTitleError: "",
            is_calling_api: false,
        };
    },
    methods: {
        // ADD
        onSubmit() {
            this.blogCategoryTitleError = "";
            this.is_calling_api = true;

                this.$query("save_blog_category", {
                    blog_category: {
                        // action_type: "create_new_blog_category",
                        action_type: this.is_edit ? "update_blog_category" : "create_new_blog_category",
                        title: this.title,
                        id: this.category_id
                    },
                })
                .then((res) => {
                    this.is_calling_api = false;

                    if (res.data.errors) { // mutation

                        let errors = Object.values(res.data.errors[0].extensions.validation).flat();
                        this.blogCategoryTitleError = errors.length ? errors[0] : "";

                    } else {
                        let response = res.data.data.blog_category;
                        if (!response.error) {
                            this.$swal("Success!", response.message, "success")
                            this.$emit("success");
                        } else {
                            this.$swal("Error!", response.message, "error");
                        }
                    }
                })
                .catch(() => {
                    this.is_calling_api = false;
                    this.$swal("Error!", this.global_error_message, "error");
                });

            this.resetForm();
        },

         onClose() {
            this.resetForm();
            // $("#categoryModal").modal("hide");
            this.$emit("close");
        },

        // RESET/Hide Modal
        resetForm() {
            this.title = "";
            this.blogCategoryTitleError = "";
        },
    },

    watch: {
        is_edit(val) {
            if (val) { // IS EDIT
                console.log('selected_category', this.selected_category);

                this.title = this.selected_category.title;
                this.category_id = this.selected_category.id;
            }
        }
    }
}
</script>
