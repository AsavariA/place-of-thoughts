import React, { useState } from 'react'
import Blogcard from './Blogcard'
import { Button } from '@material-ui/core';
import { options } from '../Editor/options';
import { ClipLoader } from "react-spinners";

const Home = ({ blogs, timeConverter }) => {
    // const user = JSON.parse(localStorage.getItem('profile'));
    const [searchTerm, setSearchTerm] = useState('');
    const [showTagSearch, setShowTagSearch] = useState(false);

    return (
        <div>
            <div className="main-heading">
                <h2>Place of Thoughts &#127855;</h2>
            </div>
            <div style={{ margin: 'auto', display: 'flex', padding: '0 1.5rem' }}>
                {
                    !showTagSearch
                        ? <input className="search-input" type="text" id="search" name="search" placeholder="Search by title or author . . ." onChange={(e) => { setSearchTerm(e.target.value) }} />
                        : <select className="search-input" name="category" id="category" defaultValue='' required onChange={(e) => setSearchTerm(e.target.value)}>
                            <option disabled value='' hidden>Search by tags. . .</option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button color='primary' size="small" variant="outlined" onClick={() => { setShowTagSearch(!showTagSearch); setSearchTerm('') }}>{`Search by ${!showTagSearch ? 'tags' : 'title/author'}`}</Button>
            </div>
            <div style={{ minHeight: '100vh' }}>
                {
                    blogs
                        // eslint-disable-next-line
                        ? blogs.filter((blog) => {
                            if (searchTerm === '') {
                                return blog
                            } else if (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === blog.category) {
                                return blog
                            }
                        }).map((blog) => {
                            return (
                                <div key={blog._id} style={{ padding: '1rem 1.5rem' }}>
                                    <Blogcard blog={blog} timeConverter={timeConverter} />
                                </div>
                            )
                        }).reverse()
                        : <div style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
                            <div style={{padding: '4rem 2rem', textAlign: 'center'}}>
                                <ClipLoader
                                    color={"#E7DFF6"}
                                />
                                <h4 style={{color: '#e7dff6', margin: '1rem 0'}}>Loading Blogs. . .</h4>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Home
