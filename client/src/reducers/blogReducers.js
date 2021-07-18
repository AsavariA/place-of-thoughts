// eslint-disable-next-line import/no-anonymous-default-export
export default (blogs = [], action) => {
    switch (action.type) {
        case 'DELETE':
            return blogs.filter((blog) => blog._id !== action.payload)
        case 'UPDATE':
            return blogs.map((blog) => blog._id === action.payload._id ? action.payload : blog)
        case 'SAVE':
            return blogs.map((blog) => (blog._id === action.payload._id ? action.payload : blog));
        case 'COMMENT': return blogs.map((blog) => {
            if (blog._id === action.payload._id) {
                return action.payload;
            }
            return blog;
        });
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...blogs, action.payload];
        default:
            return blogs;
    }
}