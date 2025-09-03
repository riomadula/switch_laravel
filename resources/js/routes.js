const Index = () => import("./pages/index.vue");
const About = () => import("./pages/about.vue");
const Services = () => import("./pages/services.vue");
const Portfolio = () => import("./pages/portfolio.vue");
const Contact = () => import("./pages/contact.vue");
const Login = () => import("./pages/login.vue");
const Register = () => import("./pages/register.vue");
const ForgotPassword = () => import("./pages/forgot-password.vue");


export default [
    { path: "/",name: "Index",component: Index,
        children: [
            { path: "/about",name: "about",component: About,   },
            { path: "/services",name: "services",component: Services,   },
            { path: "/portfolio", name: "portfolio", component: Portfolio, },
            {path: "/contact",name: "contact",component: Contact,},
        ],
    },
    { path: "/login", name: "login", component: Login, },
    { path: "/register", name: "register", component: Register, },
    { path: "/forgot-password",name: "forgot-password",component: ForgotPassword,},
];
