import axios from 'axios';

const API = axios.create({baseURL: 'https://place-of-thoughts.herokuapp.com/'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const fetchBlogs = () => API.get('/blogs');
export const createBlog = (newBlog) => API.post('/blogs', newBlog)  
export const updateBlog = (id, updatedBlog) => API.patch(`/blogs/${id}`, updatedBlog)
export const deleteBlog = (id) => API.delete(`/blogs/${id}`)
export const saveBlog = (id) => API.patch(`/blogs/${id}/saveBlog`)
export const commentBlog = (value, id) => API.post(`/blogs/${id}/commentBlog`, {value})

export const signIn = (formData) => API.post('users/signin', formData);
export const signUp = (formData) => API.post('users/signup', formData);