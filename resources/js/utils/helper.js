import moment from "moment";

export default {
    truncate(text, length) { // option 1
        return text && text.length > length
            ? text.substring(0, length) + "..."
            : text;
    },

    fullDate(date) {
                return moment(date).format("MMM D, YYYY");
    },

    timeAgo(date) {
        console.log('timeago: ', date);

        return moment(date).fromNow(); // "6 days ago", "3 years ago"
    },
    /* timeAgo(date) {
        return moment.utc(date).local().fromNow();
    } */
};

// export const truncate2 = (text, length) => { // option 2
//     return text && text.length > length
//         ? text.substring(0, length) + "..."
//         : text;
// };
