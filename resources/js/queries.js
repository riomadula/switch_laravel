import axios from "axios";

let queries = {
    action_user: `mutation ($user: user_input) {
        user(user: $user) {
            error,
            message,
        }
    }`,
};

// const getApiUrl = (queryName) => {
//     let segment = "";

//     if (userQueries.some((q) => q === queryName)) {
//         segment = "/users";
//     }

//     return `/graphql${segment}`;
// };

const query = (queryName, queryVariables) => {
    let options = {
        url: "/graphql",
        method: "POST",
        data: {
            query: queries[queryName],
            variables: queryVariables,
        },
    };

    //console.log(options);
    return axios(options);
};

export default query;
