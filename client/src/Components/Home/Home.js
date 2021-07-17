import React, { useState } from 'react'
import Blogcard from './Blogcard'

const Home = ({ blogs, timeConverter }) => {
    // const user = JSON.parse(localStorage.getItem('profile'));
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <div className="main-heading">
                <h2>Place of Thoughts</h2>
            </div>
            <div style={{ margin: 'auto', display: 'flex', padding: '0 1.5rem' }}>
                <input className="search-input" type="text" id="search" name="search" placeholder="Search by title or author . . ." onChange={(e) => { setSearchTerm(e.target.value) }} />
            </div>
            {
                blogs
                // eslint-disable-next-line
                    ? blogs.filter((blog) => {
                        if (searchTerm === '') {
                            return blog
                        } else if (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.ownerName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return blog
                        }
                    }).map((blog) => {
                        return (
                            <div key={blog._id} style={{ padding: '1rem 1.5rem' }}>
                                <Blogcard blog={blog} timeConverter={timeConverter} />
                            </div>
                        )
                    }).reverse()
                    : null
            }
        </div>
    )
}

export default Home
