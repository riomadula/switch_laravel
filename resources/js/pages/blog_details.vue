<template>
    <div id="main-content" class="blog-page">
        <div class="container">
            <div class="row clearfix">
                <div class="col-lg-8 col-md-12 left-box">
                    <div class="card single_post">
                        <div class="body">
                            <div class="img-post">
                                <img class="d-block img-fluid" src="https://www.bootdey.com/image/800x280/87CEFA/000000" alt="First slide">
                            </div>
                            <h3 class="h5 mb-3">{{ blog_posts.title }}</h3>
                            <p>{{ blog_posts.author }} | {{ blog_posts?.blog_category?.title }}</p>
                            <p>{{ blog_posts.content }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12 right-box">
                    <!-- Categories Clouds -->
                    <div class="card">
                        <div class="header">
                            <h2>Categories Clouds</h2>
                        </div>
                        <div class="body widget">
                            <ul class="list-unstyled categories-clouds m-b-0">
                                <li><a href="javascript:void(0);">{{ blog_posts?.blog_category?.title }}</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: "BlogDetails",
    props: ["id"],
    data() {
        return {
            blog_posts: {},
            blog_category: {},

            is_calling_api: false,
        };
    },

    created() {
        this.fetchSinglePost(this.id);
    },

    methods: {
        // Fetch Blog Posts Functions
        fetchSinglePost() {
            this.is_calling_api = true;
            this.$query("blog_posts", {
                action_type: "get_single_blog_post",
                id: this.$route.params.id,
            })
            .then((res) => {
                console.log(res.data.data.blog_posts);

                this.is_calling_api = false;
                this.blog_posts = res.data.data.blog_posts[0] || [];

            })
            .catch((err) => {
                this.is_calling_api = false;
                console.error("Fetch blog posts failed:", err);
            });
        },

        fetchSinglePost2() {
            this.is_calling_api = true;
            this.$query("save_blog_post", {
                blog_posts: {
                    action_type: "get_single_blog_post",
                    id: this.$route.params.id,
                }
            })
            .then((res) => {
                console.log(res);

                this.is_calling_api = false;
                this.blog_posts = res.data.data.blog_posts.blog || [];

            })
            .catch((err) => {
                this.is_calling_api = false;
                console.error("Fetch blog posts failed:", err);
            });
        },

        dateFormatter(date) {
            return moment(date).format("MMM D, YYYY");
        },




    },
};
</script>
