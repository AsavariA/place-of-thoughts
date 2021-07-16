import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../Editor/tools'
import { Tooltip, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Comments from './Comments';
import { options } from '../Editor/options'

const BlogDetails = ({ blogs, currentId, setcurrentId }) => {
    const instanceRef = useRef(null);
    const blogId = useParams();
    const [showForm, setShowForm] = useState(false)
    const blog = blogs.find(x => x._id === blogId.id);
    console.log(blog)
    const user = JSON.parse(localStorage.getItem('profile'));
    const [formData, setFormData] = useState({ description: '', title: '', category: options[options.length - 1].value })

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(currentId)
    }

    const handleClickEdit = () => {
        setcurrentId(blog._id); 
        setFormData({ description: blog.description, title: blog.title, category: options[options.length - 1].value })
        setShowForm(true); 
        console.log(currentId);
    }

    return (
        <div className="blogDetails">
            {
                blog
                    ? <div className="blogDetailsMain">
                        {/* <div style={{ margin: 'auto', width: 'fit-content' }}>
                            <img className="blog-detail-image" src={blog.category} alt="blogimage"></img>
                        </div> */}
                        <div className="container" style={{ backgroundImage: `url(${blog.category})` }}>
                            <div className="modal">
                                <h2>{blog.title}</h2>
                                <p>{blog.description}</p>
                            </div>
                        </div>
                        <EditorJs
                            readOnly={true}
                            data={blog.content}
                            tools={EDITOR_JS_TOOLS}
                            placeholder="Start your story here!"
                            instanceRef={(instance) => (instanceRef.current = instance)}
                        />
                        {(user?.result?._id === blog?.ownerId) && (
                            <div className="editanddelete">
                                <Tooltip title="Edit Blog">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={handleClickEdit}
                                    >
                                        Edit
                                    </Button>
                                </Tooltip>
                                <div style={{ height: '1rem', width: '3rem' }}></div>
                                <Tooltip title="Delete Blog">
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>
                                </Tooltip>
                            </div>
                        )}
                        {
                            showForm
                                ? <form className="form" onSubmit={handleSave} style={{ padding: '0' }}>
                                    <label>Blog Title:</label>
                                    <input required type="text" id="title" name="title" placeholder="Blog Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                    <br></br>
                                    <label>Short Description:</label>
                                    <input required type="text" id="description" name="description" placeholder="Short Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                    <br></br>
                                    <label>Category:</label>
                                    <select name="category" id="category" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                    <br></br>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <input type="submit" value="Update" />
                                        <input type="button" value="Cancel" onClick={() => setShowForm(false)} />
                                    </div>
                                </form>
                                : null
                        }
                        <Comments />
                    </div>
                    : null
            }
        </div>
    )
}

export default BlogDetails
