import * as api from '../api';

// action creators
export const getBlogs = () => async(dispatch) => {
    try {
        const {data} = await api.fetchBlogs();
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createBlog = (blog) => async(dispatch) => {
    try {
        const {data} = await api.createBlog(blog);
        dispatch({type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}