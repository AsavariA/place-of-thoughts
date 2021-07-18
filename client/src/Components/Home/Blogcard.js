import React from 'react'
import { Card, CardContent, Typography, CardActions, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { useDispatch } from 'react-redux';
import { saveBlog } from '../../actions/blogAction';

const useStyles = makeStyles({
    root: {
        maxWidth: 650,
        margin: 'auto',
    }
});

const Blogcard = ({ blog, timeConverter }) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

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
        <div>
            <Card variant="outlined" className={classes.root}>
                <div className="cardmain">
                    <div className="cardcontent">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {blog.title}
                            </Typography>
                            <Typography gutterBottom>
                                {blog.description}
                            </Typography>
                            <Typography color="textSecondary" variant="subtitle1" gutterBottom>
                                {`By ${blog.ownerName}`}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Typography color="textSecondary" variant="subtitle2">
                                {`Published on ${timeConverter(blog.createdAt)}`}
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Link href={`/${blog._id}`}>
                                    <Button size="small">Read</Button>
                                </Link>
                                {
                                    user
                                        ? <Button size="small" disabled={!user?.result} onClick={() => dispatch(saveBlog(blog._id))}>
                                            <Saves />
                                        </Button>
                                        : null
                                }
                            </div>
                        </CardActions>
                    </div>
                    <div className="image-div">
                        <img className="category-image" src={blog.category} alt="blogimage"></img>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Blogcard
