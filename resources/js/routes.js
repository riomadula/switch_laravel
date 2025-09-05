const Index = () => import("./pages/index.vue");
const About = () => import("./pages/about.vue");
const Services = () => import("./pages/services.vue");
const Portfolio = () => import("./pages/portfolio.vue");
const Contact = () => import("./pages/contact.vue");

export default [
    { path: "/",name: "Index",component: Index,
        children: [
            { path: "/about",name: "about",component: About,   },
            { path: "/services",name: "services",component: Services,   },
            { path: "/portfolio", name: "portfolio", component: Portfolio, },
            {path: "/contact",name: "contact",component: Contact,},
        ],
    },
];
