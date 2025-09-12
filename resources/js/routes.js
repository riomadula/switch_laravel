const Index = () => import("./pages/index.vue");
const Home = () => import("./pages/home.vue");
const About = () => import("./pages/about.vue");
const Services = () => import("./pages/services.vue");
const Portfolio = () => import("./pages/portfolio.vue");
const Blog = () => import("./pages/blog.vue");
const BlogDetails = () => import("./pages/blog_details.vue");
const Contact = () => import("./pages/contact.vue");

export default [
    { path: "/",
        name: "Index",
        component: Index,
        children: [
            { path: "/",name: "home",component: Home, meta: { isLanding: true },  },
            { path: "/about",name: "about",component: About, meta: { isLanding: true },   },
            { path: "/services",name: "services",component: Services, meta: { isLanding: true },  },
            { path: "/portfolio", name: "portfolio", component: Portfolio, meta: { isLanding: true }, },
            { path: "/blog", name: "blog",component: Blog, meta: { isLanding: true }, },
            { path: "/blog-details/:id",name: "blog-details",component: BlogDetails, meta: { isLanding: true }, },
            { path: "/contact", name: "contact",component: Contact, meta: { isLanding: true }, },
        ],
    },
];
