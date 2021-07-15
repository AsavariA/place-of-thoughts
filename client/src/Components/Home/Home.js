import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getBlogs } from '../../actions/blogAction';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 650,
        margin: 'auto'
    },
});

const Home = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const classes = useStyles();
    const blogs = useSelector((state) => state.blogReducers);

    useEffect(() => {
        dispatch(getBlogs());
        console.log(blogs)
        // eslint-disable-next-line
    }, [dispatch])

    return (
        <div>
            Hello {user ? user.result.name.split(' ')[0] : null}!
            {
                blogs
                    ? blogs.map((blog) => {
                        return (
                            <div key={blog._id} style={{padding: '1rem 1.5rem'}}>
                                <Card variant="outlined" className={classes.root}>
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
                                            {`Created on 7 May, 2021`}
                                        </Typography>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })
                    : null
            }
        </div>
    )
}

export default Home
