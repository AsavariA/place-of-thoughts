import * as api from '../api';

// action creators
export const getBlogs = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBlogs();
        dispatch({ type: 'FETCH_ALL', payload: data });
        // console.log(data)
    } catch (error) {
        console.log(error.message);
    }
}

export const createBlog = (blog) => async (dispatch) => {
    try {
        const { data } = await api.createBlog(blog);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateBlog = (id, blog) => async (dispatch) => {
    try {
        const { data } = await api.updateBlog(id, blog);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBlog = (id, history) => async (dispatch) => {
    try {
        await api.deleteBlog(id)
        dispatch({ type: 'DELETE', payload: id })
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const saveBlog = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.saveBlog(id, user?.token);
        dispatch({ type: 'SAVE', payload: data });
    } catch (error) {
        console.log(error);
    }

};

export const commentBlog = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.commentBlog(value, id);
        dispatch({ type: 'COMMENT', payload: data });
        return data.comments;
    } catch (error) {
        console.log(error)
    }
}