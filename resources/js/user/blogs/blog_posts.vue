<template v-if="is_logged_in">
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
          <th>ID</th>
          <th>Title</th>
          <th>Category ID</th>
          <th>Content</th>
          <th>Author</th>
          <th>Date Created</th>
          <th>Date Modified</th>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if = "blog_posts.length > 0" v-for="post in blog_posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td width="20%">{{ post.title }}</td>
          <td width="120">{{ post.category_id }}</td>
          <td align="left">{{ post.content }}</td>
          <td width="160">{{ post.author }}</td>
          <td width="150">{{ post.date_created }}</td>
          <td width="150">{{ post.date_modified }}</td>
          <td width="150" align="center">
            <button  type="button" class="btn btn-warning me-2">Edit</button>
            <button  type="button" class="btn btn-danger">Delete</button>
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
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newBlogPostsModalLabel">Create New Post</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="name" class="form-label">Title</label>
                            <input type="text" class="form-control" id="name" v-model="createPost.postTitle" />
                            <div v-if="blogPostsTitleError" class="text-danger mt-1">{{ blogPostsTitleError }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Content</label>
                                <textarea type="textArea" class="form-control" id="name" v-model="createPost.postContent" />
                            <div v-if="blogPostsContentError" class="text-danger mt-1">{{ blogPostsContentError }}</div>
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
  </div>
</template>

<script>
export default {
    data() {
        return {
            blog_posts: [],

            createPost: {
                postTitle: "",
                postContent: "",
                postAuthor: "",
                postCategoryId: ""
            },
            /*editPost: {
                id: null,
                postTitle: "",
                postCategoryId: "",
                postContent: "",
                postAuthor: ""
            },
            deletePost: {
                id: null,
                postTitle: ""
            },*/

            blogPostTitleError: "",
            is_logged_in: true,
            is_calling_api: false,
            record_Count: 0,
        };
    },

    created() {
        this.fetchBlogPosts();
    },

    methods: {
        fetchBlogPosts() {
            this.is_calling_api = true;
            this.$query("blog_posts", {
                action_type: "list_all_blog_posts",
            })
            .then((res) => {
                this.is_calling_api = false;
                this.record_Count = res.data.data.blog_posts.length;

                if (res.data.errors) {
                    console.error(res.data.errors);
                    return;
                }

                this.blog_posts = res.data.data.blog_posts || [];
            })
            .catch((err) => {
                this.is_calling_api = false;
                console.error("Fetch blog posts failed:", err);
            });
        },

        // CREATE
        onSubmit() {
            if (this.createPost.postTitle.trim() === "") {
                this.$swal("Error!", "Post title is required", "error");
                return;
            }
            this.blogPostTitleError = "";
            this.is_calling_api = true;

                this.$query("save_blog_post", {
                    blog_posts: {
                        action_type: "create_new_blog_post",
                        postTitle: this.createPost.postTitle,
                        postCategoryId: this.createPost.postCategoryId,
                        postContent: this.createPost.postContent,
                        postAuthor: this.createPost.postAuthor,
                        postDateCreated: new Date().toISOString().slice(0, 10),
                        postDateModified: new Date().toISOString().slice(0, 10),
                    },
                })
                .then((res) => {
                    this.is_calling_api = false;

                    if (res.data.errors) {

                        let errors = Object.values(res.data.errors[0].extensions.validation).flat();
                        this.blogPostTitleError = errors.length ? errors[0] : "";

                    } else {

                        this.$swal("Success!", "New Blog Post added successfully", "success")
                        this.fetchBlogPosts()
                        $("#newRecordModal").modal("hide");

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

        dateFormatter(date) {
            return moment(date).format("MMMM D, YYYY");
        },
    },
};
</script>

