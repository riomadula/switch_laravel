<template>
    <!-- Blog -->
    <h4>Blog</h4>
    <div class="container">
        <div class="row mt-n5">
            <div
                class="col-md-6 col-lg-4 mt-5 wow fadeInUp"
                v-for="(post, index) in blog_posts"
                :key="post.id"
                :data-wow-delay="`${0.2 * (index + 1)}s`"
            >
                <div class="blog-grid">
                    <div class="blog-grid-img position-relative">
                        <img alt="img" src="https://www.bootdey.com/image/480x480/00FFFF/000000"/>
                    </div>
                    <div class="blog-grid-text p-4">
                        <h3 class="h5 mb-3">{{ post.title }}
                            <!-- <a href="#!">{{ post.title }}</a> -->
                        </h3>
                        <p class="display-30">
                            {{ truncate(post.content, 100) }}
                            <router-link :to="{ name: 'blog-details', params: { id: post.id } }">
                                Read More...
                            </router-link>
                        </p>
                        <div class="meta meta-style2">
                            <ul>
                                <li>
                                    <a href="#!">
                                        <i class="fas fa-calendar-alt"></i>
                                        {{ showDate(post.date_created) }}
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <i class="fas fa-user"></i>{{ post.author }} | {{ post.blog_category.title }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: "Blog",
    data() {
        return {
            blog_posts: [],
            blog_category: [],
        };
    },
    // Load Categories and Blog Posts
    created() {
        this.fetchCategories();
        this.fetchBlogPosts();
    },

    methods: {
         // Fetch Categories Functions
        fetchCategories() {
            this.is_calling_api = true;
            this.$query("blogs_category", {
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
        fetchBlogPosts(id) {
            this.is_calling_api = true;
            this.$query("blogs", {
                action_type: "list_all_blog_posts",
            })
                .then((res) => {
                    this.is_calling_api = false;
                    this.record_Count = res.data.data.blog_posts.length;
                    console.log(res.data.data.blog_posts);

                    this.blog_posts = res.data.data.blog_posts || [];


                })
                .catch((err) => {
                    this.is_calling_api = false;
                    console.error("Fetch blog posts failed:", err);
                });
        },

        showDate(date) {
            return moment(date).format("MMM D, YYYY");
        },

        truncate(text, length) {
            return text && text.length > length
                ? text.substring(0, length) + "..."
                : text;
        },
    },

};
</script>
