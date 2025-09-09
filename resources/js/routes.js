const Index = () => import("./pages/index.vue");
const Home = () => import("./pages/home.vue");
const About = () => import("./pages/about.vue");
const Services = () => import("./pages/services.vue");
const Portfolio = () => import("./pages/portfolio.vue");
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
            { path: "/contact", name: "contact",component: Contact, meta: { isLanding: true }, },
        ],
    },
];
