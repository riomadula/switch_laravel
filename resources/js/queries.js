import axios from "axios";
import CryptoJS from "crypto-js";

let queries = {
    action_user: `mutation ($user: user_input) {
        user(user: $user) {
            error,
            message,
            access_token,
            refresh_token
        }
    }`,
    user: `query ($action_type: String) {
        user(action_type: $action_type) {
            id,
            name,
            email,
            address
        }
    }`,
    blog_category: `query ($action_type: String) {
        blog_category(action_type: $action_type) {
            id,
            title,
            date_created,
            date_modified
        }
    }`,
    save_blog_category: `mutation ($blog_category: blog_category_input) {
        blog_category(blog_category: $blog_category) {
            error,
            message,
        }
    }`,
    save_blog_post: `mutation ($blog_posts: blog_posts_input) {
        blog_posts(blog_posts: $blog_posts) {
            error,
            message,
        }
    }`,
    blog_posts: `query ($action_type: String) {
        blog_posts(action_type: $action_type) {
            id,
            title,
            caterory_id,
            content,
            author,

        }
    }`,
};

const userQueries = [
    "user",
    "blog_category",
    "save_blog_category",
    "blog_posts",
    "save_blog_post",
];

const getApiUrl = (queryName) => {
    let segment = "";

    if(userQueries.some((q) => q === queryName)) {
        segment = "/user";
    }

    return `/graphql${segment}`;
};


const query = (queryName, queryVariables) => {

    var token = '';
    if (userQueries.some((q) => q === queryName)) {

        var secret_passphrase = process.env.MIX_SECRET_PASSPHRASE;
        const encryptedToken = sessionStorage.getItem("access-token");
        token = CryptoJS.AES.decrypt(encryptedToken, secret_passphrase).toString(CryptoJS.enc.Utf8);

    }

    //console.log(token);

    let options = {
        //url: "/graphql",
        url: getApiUrl(queryName),
        method: "POST",
        data: {
            query: queries[queryName],
            variables: queryVariables,
        },
    };

    if (token) {
        options.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    //console.log(options);
    return axios(options);
};

export default query;
