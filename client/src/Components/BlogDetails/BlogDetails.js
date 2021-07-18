import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../Editor/tools'
import { Tooltip, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Comments from './Comments';
import { options } from '../Editor/options'
import { useDispatch } from 'react-redux';
import { updateBlog, deleteBlog, saveBlog } from '../../actions/blogAction';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BlogDetails = ({ blogs, currentId, setcurrentId }) => {
    const instanceRef = useRef(null);
    const dispatch = useDispatch();
    const blogId = useParams();
    const history = useHistory();
    const [showForm, setShowForm] = useState(false)
    const [readOnly, setReadOnly] = useState(true)
    const [openDialog, setOpenDialog] = useState(false);
    const blog = blogs.find(x => x._id === blogId.id);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [formData, setFormData] = useState({ description: '', title: '', category: options[options.length - 1].value })

    const [open1, setOpen1] = useState(false);
    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
    };

    const [open2, setOpen2] = useState(false);
    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const savedData = await instanceRef.current.save()
        if (savedData.blocks.length !== 0) {
            const data = {
                description: formData.description,
                title: formData.title,
                category: formData.category,
                content: savedData
            }
            dispatch(updateBlog(currentId, { ...data, ownerName: user?.result?.name }))
            setOpen1(true)
            setShowForm(false)
            setReadOnly(true)
        } else {
            alert('Your blog cannot be empty!')
        }
    }

    const handleClickEdit = () => {
        setcurrentId(blog._id);
        setFormData({ description: blog.description, title: blog.title, category: options[options.length - 1].value })
        setShowForm(true);
        setReadOnly(false);
    }

    const handleDelete = () => {
        dispatch(deleteBlog(blog._id, history))
        setOpen2(true)
    }

    const Saves = () => {
        if (blog.saves.length > 0) {
            return blog.saves.find((save) => save === (user?.result?._id))
                ? (
                    <><BookmarkIcon />{blog.saves.length}</>
                ) : (
                    <><BookmarkBorderIcon />{blog.saves.length}</>
                );
        }
        return <><BookmarkBorderIcon />{blog.saves.length > 0 ? blog.saves.length : null}</>;
    };

    return (
        <>
            <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity="success">
                    Blog updated sucessfully!
                </Alert>
            </Snackbar>

            <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="error">
                    Blog deleted!
                </Alert>
            </Snackbar>

            <div className="blogDetails">
                {
                    blog
                        ? <div className="blogDetailsMain">
                            {/* <div style={{ margin: 'auto', width: 'fit-content' }}>
                            <img className="blog-detail-image" src={blog.category} alt="blogimage"></img>
                        </div> */}
                            <div className="container" style={{ backgroundImage: `url(${blog.category})` }}>
                                <div className="modal">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h2 className="blogtitle">{blog.title}</h2>
                                        <Tooltip title="Save">
                                            <Button size="small" disabled={!user?.result} onClick={() => dispatch(saveBlog(blog._id))}>
                                                <Saves />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    <p className="blogdescription">{blog.description}</p>
                                </div>
                            </div>
                            <EditorJs
                                readOnly={readOnly}
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
                                            onClick={() => setOpenDialog(true)}
                                        >
                                            Unpublish
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
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <input type="submit" value="Update" />
                                            <input type="button" value="Cancel" onClick={() => window.location.reload()} />
                                        </div>
                                    </form>
                                    : null
                            }
                            <Comments />
                        </div>
                        : <div style={{ height: '100vh' }}></div>
                }
            </div>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Unpublish this blog?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Unpublishing this blog means that it will be removed from 'Place of Thoughts' permanently. Are you sure you want to delete it?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BlogDetails
