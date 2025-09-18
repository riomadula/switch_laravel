<template>
    <div>
        <div class="loader" v-if="is_calling_api"></div>
        <div class="d-flex">
            <h3 class="card-title">Blog Posts</h3>
            <div class="card-tools ms-auto">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#newBlogPostsModal">
                    Create New Post
                </button>
            </div>
        </div>

    <table  class="table table-bordered table-striped mt-3"  cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Content</th>
          <th>Author</th>
          <th>Photo</th>
          <th>Date Created</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if = "blog_posts.length > 0" v-for="post in blog_posts" :key="post.id">
          <td width="20%">{{ post.title }}</td>
          <td width="120">{{ post.blog_category.title }}</td>
          <td align="left">
            {{ post.content }}

          </td>{{  }}
          <td width="160" align="center" class="align-middle">{{ post.author }}</td>
          <td width="160" align="center" class="align-middle" v-if="post.blog_post_image">
            <img :src="`/public/uploads/blog_post/${post.id}/${post.blog_post_image}`" alt="img" width="100" height="100" />
          </td>
          <td width="160" align="center" class="align-middle" v-else>
            <!-- <img src="/public/assets/claude-code-workflows-tools.png" alt="img" width="100" height="100" /> -->
          </td>
          <td width="150" align="center" class="align-middle">{{ dateFormatter(post.date_created) }}</td>
          <td width="170" align="center" class="align-middle">
            <a :href="`/blog-details/${post.id}`" target="_blank">
                <button  type="button" class="btn btn-primary me-2"><i class="far fa-eye"></i></button>
            </a>
            <button  type="button" class="btn btn-warning me-2" @click="setEditPost(post)"><i class="far fa-edit"></i></button>
            <button  type="button" class="btn btn-danger" @click="onDeletePost(post)"><i class="far fa-trash-alt"></i></button>
          </td>
        </tr>
        <tr v-if="blog_posts.length > 0">
            <td colspan="8" class="text-left"><strong>Total Records: {{ blog_posts.length }}</strong></td>
        </tr>
        <tr v-if="blog_posts.length == 0">
            <!-- <td colspan="8" class="text-left"><strong>{{ record_Count > 0 ? 'Total Records:'+ record_Count : "No Records" }}</strong></td> -->
             <td colspan="8" class="text-center"><strong>No Records</strong></td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for Create New Blog Post -->
    <div class="modal fade" id="newBlogPostsModal" tabindex="-1" aria-labelledby="newBlogPostsModalLabel" aria-hidden="true">
        <form @submit.prevent="onSubmit">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newBlogPostsModalLabel">Create New Post</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body row ">
                        <div class="mb-3 col-md-6">
                            <label for="name" class="form-label">Author</label>
                            <input type="text" class="form-control" id="name" v-model="user.name" disabled />
                            <div v-if="blogPostsAuthorError" class="text-danger mt-1">{{ blogPostsAuthorError }}</div>
                        </div>
                        <div class="mb-3 col-md-6">
                            <label for="name" class="form-label">Category</label>
                            <select class="form-control" id="name" v-model="createPost.category_id">
                                <option value="" disabled selected>Select Category</option>
                                <option v-for="category in blog_category" :key="category.id" :value="category.id" selected>
                                    {{ category.title }}
                                </option>
                            </select>
                            <div v-if="blogPostsCategoryTitleError" class="text-danger mt-1">{{ blogPostsCategoryTitleError }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Title</label>
                            <input type="text" class="form-control" id="name" v-model="createPost.title" />
                            <div v-if="blogPostsTitleError" class="text-danger mt-1">{{ blogPostsTitleError }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Content</label>
                            <textarea type="textArea" rows="10" class="form-control" id="name" v-model="createPost.content" />
                            <div v-if="blogPostsContentError" class="text-danger mt-1">{{ blogPostsContentError }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Blog Post Image</label>
                            <input type="file" rows="10" class="form-control" id="name" @change="onFileChange" ref="fileInput" />
                            <div v-if="blogPostsPhotoError" class="text-danger mt-1">{{ blogPostsPhotoError }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Save Post</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

     <!-- Modal for Edit Blog Post -->
    <div class="modal fade" id="editBlogPostsModal" tabindex="-1" aria-labelledby="editBlogPostsModalLabel" aria-hidden="true" ref="editBlogPostsModal">
        <form @submit.prevent="onUpdate">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editBlogPostsModal">Edit Post</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body row ">
                        <div class="mb-3 col-md-6">
                            <label for="name" class="form-label">Author</label>
                            <input type="text" class="form-control" id="name" v-model="editPost.author" disabled />
                            <div v-if="blogPostsAuthorError" class="text-danger mt-1">{{ blogPostsAuthorError }}</div>
                        </div>
                        <div class="mb-3 col-md-6">
                            <label for="name" class="form-label">Category</label>
                            <select class="form-control" id="name" v-model="editPost.category_id">
                                <option value="" disabled selected>Select Category</option>
                                <option v-for="category in blog_category" :key="category.id" :value="category.id" selected>
                                    {{ category.title }}
                                </option>
                            </select>
                            <div v-if="blogPostsCategoryTitleError" class="text-danger mt-1">{{ blogPostsCategoryTitleError }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Title</label>
                            <input type="text" class="form-control" id="name" v-model="editPost.title" />
                            <div v-if="blogPostsTitleError" class="text-danger mt-1">{{ blogPostsTitleError }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Content</label>
                            <textarea type="textArea" rows="10" class="form-control" id="name" v-model="editPost.content" />
                            <div v-if="blogPostsContentError" class="text-danger mt-1">{{ blogPostsContentError }}</div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Update Post</button>
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
    props: ["user"], // if not always passed
    name: "UserHeader",

    data() {
        return {
            blog_posts: [],
            blog_category: [],
            blog_image: '',
            blog_image_name: '',

            createPost: {
                title: "",
                category_id: "",
                content: "",
                author: "",
                photo: "",
            },

            editPost: {
                id: null,
                title: "",
                category_id: "",
                content: "",
                postAuthor: "",
                photo: "",
            },

            deletePost: {
                id: null,
                title: ""
            },

            blogPostsTitleError: "",
            blogPostsContentError: "",
            blogPostsCategoryTitleError: "",
            blogPostsAuthorError: "",
            blogPostsPhotoError: "",

            blogCategoryId: "",
            blogCategoryTitle: "",


            currentDate: "",

            is_calling_api: false,
            record_Count: 0,
        };
    },

    created() {
        //this.fetchCategories();
        this.fetchBlogPosts();
    },

    methods: {
        // Fetch Categories Functions
        fetchCategories() {
            this.is_calling_api = true;
            this.$query("blog_category", {
                action_type: "list_all_blog_categories",
            })
                .then((res) => {
                    this.is_calling_api = false;
                    this.record_Count = res.data.data.blog_category.length;


                    if (res.data.errors) {
                        let errors = Object.values(res.data.errors[0].extensions.validation).flat();
                        this.blogCategoryTitleError = errors.length ? errors[0] : "";
                        return;
                    }

                    this.blog_category = res.data.data.blog_category || [];


                })
                .catch((err) => {
                    this.is_calling_api = false;
                    console.error("Fetch categories failed:", err);
                });
        },

        // Fetch Blog Posts Functions
        fetchBlogPosts() {
            this.is_calling_api = true;
            this.$query("blog_posts", {
                action_type: "list_all_blog_posts",
            })
                .then((res) => {
                    this.is_calling_api = false;
                    this.record_Count = res.data.data.blog_posts.length;
                    console.log(res.data.data.blog_posts);

                    this.blog_posts = res.data.data.blog_posts || [];
                      this.fetchCategories();
                })
                .catch((err) => {
                    this.is_calling_api = false;
                    console.error("Fetch blog posts failed:", err);
                });
        },

        // OnSubmit Events for Create New Blog Post
        onSubmit() {
            this.is_calling_api = true;
            this.onClearError()

console.log('file: ', this.blog_image);

            this.$query("save_blog_post", {
                blog_posts: {
                    action_type: "create_new_blog_post",
                    title: this.createPost.title,
                    category_id: this.createPost.category_id.toString(),
                    content: this.createPost.content,
                    author: this.user.name,
                    photo: this.createPost.photo,
                },
                file: this.blog_image,
            })
                .then((res) => {

                    console.log(res);
                    this.is_calling_api = false;

                    if (res.data.errors) {  // Mutation first

                        let errors = Object.values(res.data.errors[0].extensions.validation).flat();
                        let errors_keys = Object.keys(res.data.errors[0].extensions.validation).flat()

                        this.blogPostsTitleError = errors_keys.some((q) => q == "blog_posts.title") ? errors[errors_keys.indexOf("blog_posts.title")] : "";
                        this.blogPostsCategoryTitleError = errors_keys.some((q) => q == "blog_posts.category_id") ? errors[errors_keys.indexOf("blog_posts.category_id")] : "";
                        this.blogPostsContentError = errors_keys.some((q) => q == "blog_posts.content") ? errors[errors_keys.indexOf("blog_posts.content")] : "";
                        this.blogPostsPhotoError = errors_keys.some((q) => q == "file") ? errors[errors_keys.indexOf("file")] : "";

                    } else {
                        // Success
                        let response = res.data.data.blog_posts;
                        // Check error response
                        if (response.error) {
                            this.$swal("Error!", response.message, "error");
                        } else {
                            this.$swal("Success!", response.message, "success")
                            this.fetchBlogPosts()

                            $("#newBlogPostsModal").modal("hide");
                            this.resetForm();
                        }
                    }
                })
                .catch(() => {
                    this.is_calling_api = false;
                    this.$swal("Error!", this.global_error_message, "error");
                });
        },

        // Edit Post
        setEditPost(post) {
            $("#editBlogPostsModal").modal("show");
            this.editPost = { ...post };
        },

        // ✅ Update Post
        onUpdate() {
            this.is_calling_api = true;
            this.$query("save_blog_post", {
                blog_posts: {
                    action_type: "update_blog_post",
                    id: this.editPost.id.toString(),
                    title: this.editPost.title,
                    category_id: this.editPost.category_id.toString(),
                    content: this.editPost.content,
                    author: this.editPost.author,
                    photo: this.editPost.photo,
                },
            })
                .then((res) => {
                    this.is_calling_api = false;
                    let response = res.data.data.blog_posts;
                    if (response.error) {
                        this.$swal("Error!", response.message, "error");
                    } else {
                        this.$swal("Success!", response.message, "success")
                            .then(() => this.fetchBlogPosts());
                        //hide modal
                        $("#editBlogPostsModal").modal("hide");
                    }
                })
                .catch((err) => {
                    console.error("Update failed:", err);
                    this.is_calling_api = false;
                    this.$swal("Error!", this.global_error_message, "error");
                });
        },

        onDeletePost(post) {
            //console.log('category', category);

            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
            }).then((result) => {
                //console.log('result', result);
                if (result.isConfirmed) {
                    this.$query("save_blog_post", {
                        blog_posts: {
                            action_type: "delete_blog_post",
                            id: post.id,
                        },
                    })
                        .then((res) => {
                            console.log(res);
                            this.is_calling_api = false;
                            let response = res.data.data.blog_posts;

                            if (response.error) {
                                this.$swal("Error!", response.message, "error");
                            } else {
                                this.$swal("Deleted!", response.message, "success")
                                this.fetchBlogPosts()
                            }
                        })
                        .catch(() => {
                            this.$swal("Error!", this.global_error_message, "error");
                        });
                }
            });
        },

        onFileChange(e) {
            this.blog_image = e.target.files[0];
            this.blog_image_name = this.blog_image.name;
        },

        /**** ****/
        resetForm() {
            this.createPost.title = "";
            this.createPost.category_id = "";
            this.createPost.content = "";
            this.createPost.photo = "";
        },

        dateFormatter(date) {
            return moment(date).format("MMM D, YYYY");
        },

        onClearError() {
            this.blogPostTitleError = "";
            this.blogPostCategoryError = "";
            this.blogPostContentError = "";
            this.blogPostsPhtotoError = "";
        }


    },
};
</script>

