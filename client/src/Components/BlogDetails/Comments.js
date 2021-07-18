import React, { useState, useRef } from 'react'
import { TextField, InputAdornment, IconButton, Typography } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../../actions/blogAction';

const Comments = ({ blog }) => {
    const [comments, setComments] = useState(blog?.comments);
    const dispatch = useDispatch();
    const [currentComment, setCurrentComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalComment = `${user.result.name}: ${currentComment}`
        const newComments = await dispatch(commentBlog(finalComment, blog._id))
        setComments(newComments)
        setCurrentComment('')
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="comments-main">
            <Typography gutterBottom variant='h6'>Comments</Typography>

            <div className="comments-inner">
                {
                    comments.map((comment, index) => {
                        return (
                            <Typography gutterBottom key={index} variant='subtitle1'>
                                <b style={{fontWeight:'bold'}}>{comment.split(': ')[0]}</b>
                                {comment.split(':')[1]}
                            </Typography>
                        )
                    })
                }
                <div ref={commentsRef} />
            </div>
            {user
                ?
                <div style={{ margin: '1rem 0' }}>
                    <TextField
                        fullWidth
                        label="Comment"
                        size="small"
                        variant="outlined"
                        value={currentComment}
                        onChange={(e) => setCurrentComment(e.target.value)}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSubmit} color="secondary" aria-label="send" component="span" disabled={!currentComment}>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                </div>
                : null
            }
        </div>
    )
}

export default Comments
