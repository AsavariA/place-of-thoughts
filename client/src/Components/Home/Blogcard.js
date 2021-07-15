import React from 'react'
import { Card, CardContent, Typography, CardActions, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 650,
        margin: 'auto',
    }
});

const Blogcard = ({ blog, timeConverter }) => {
    const classes = useStyles();

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
                            <Button size="small">Learn More</Button>
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
