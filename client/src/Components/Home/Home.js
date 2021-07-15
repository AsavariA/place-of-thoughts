import React from 'react'
import Blogcard from './Blogcard'

const Home = ({blogs, timeConverter}) => {
    // const user = JSON.parse(localStorage.getItem('profile'));
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
