import React, { useState } from 'react'
import Blogcard from './Blogcard'

const Home = ({ blogs, timeConverter }) => {
    // const user = JSON.parse(localStorage.getItem('profile'));
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <div className="main-heading">
                <h2>Place of Thoughts &#127968;</h2>
            </div>
            <div style={{ margin: 'auto', display: 'flex', padding: '0 1.5rem' }}>
                <input className="search-input" type="text" id="search" name="search" placeholder="Search by title or author . . ." onChange={(e) => { setSearchTerm(e.target.value) }} />
            </div>
            <div style={{minHeight: '100vh'}}>
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
                        : <div style={{ height: '100vh' }}></div>
                }
            </div>
        </div>
    )
}

export default Home
