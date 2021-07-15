import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getBlogs } from '../../actions/blogAction';
import { useSelector } from 'react-redux';
import Blogcard from './Blogcard'

const Home = () => {
    // const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogReducers);

    function timeConverter(timestamp) {
        var a = new Date(timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var year = a.getUTCFullYear();
        var time = `${date} ${month}, ${year}`
        return time;
    }

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch])

    return (
        <div>
            {
                blogs
                    ? blogs.map((blog) => {
                        return (
                            <div key={blog._id} style={{ padding: '1rem 1.5rem' }}>
                                <Blogcard blog={blog} timeConverter={timeConverter} />
                            </div>
                        )
                    })
                    : null
            }
        </div>
    )
}

export default Home
