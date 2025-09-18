import axios from "axios";
import CryptoJS from "crypto-js";

let queries = {
    // For UnAuthenticated Users Action
    action_user: `mutation ($user: user_input) {
        user(user: $user) {
            error,
            message,
            access_token,
            refresh_token
        }
    }`,
    // For Authenticated Users Action (Login, Register, Add New User)
    save_user: `mutation ($user: user_input) {
        user(user: $user) {
            error,
            message,
        }
    }`,
    user: `query ($action_type: String) {
        user(action_type: $action_type) {
            id,
            name,
            email,
            address,
            date_created
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
    // Blogs Category Landing Page
    blogs_category: `query ($action_type: String) {
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
    save_blog_post: `mutation ($blog_posts: blog_posts_input, $file: Upload) {
        blog_posts(blog_posts: $blog_posts, file: $file) {
            error,
            message,
        }
    }`,
    blog_posts: `query ($action_type: String, $id: String) {
        blog_posts(action_type: $action_type, id: $id) {
            id,
            title,
            category_id,
            content,
            author,
            blog_post_image,
            date_created,
            blog_category {
                id,
                title,
            },
        }
    }`,
    blogs: `query ($action_type: String, $id: String) {
        blog_posts(action_type: $action_type, id: $id) {
            id,
            title,
            category_id,
            content,
            author,
            photo,
            date_created,
            blog_category {
                id,
                title,
            },
        }
    }`,
};
// For Authenticated Users: Required for all Queries
const userQueries = [
    "user",
    "blog_category",
    "save_blog_category",
    "blog_posts",
    "save_blog_post",
    "blog_post_details",
    "save_user",
];

// For Uploading Images
let uploadQueries = [
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
    
    if (uploadQueries.some((q) => q === queryName)) {
        let bodyFormData = new FormData();

        bodyFormData.set(
            "operations",
            JSON.stringify({
                query: queries[queryName],
                variables: queryVariables,
            })
        );

        bodyFormData.set("operationName", null);

        // if(queryVariables.file) {
        bodyFormData.set("map", JSON.stringify({ file: ["variables.file"] }));
        bodyFormData.append("file", queryVariables.file);
        // }

        var upload_url = getApiUrl(queryName);

        return axios.post(upload_url, bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
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
