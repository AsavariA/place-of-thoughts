// eslint-disable-next-line import/no-anonymous-default-export
export default (blogs=[], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...blogs, action.payload];
        default:
            return blogs;
    }
}