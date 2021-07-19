import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link, Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const Recommendations = ({ blogs }) => {
    const classes = useStyles();

    return (
        <div className="recmain">
            <h3 style={{ textAlign: 'center', margin: '1rem 0' }}>YOU MIGHT ALSO LIKE - </h3>
            <div className='recs'>
                {
                    blogs.length > 0
                        ? blogs.slice(0, 3).map((blog) => {
                            return (
                                <div key={blog._id} style={{ margin: '1rem' }}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={blog.category}
                                                title="Category"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6">
                                                    {blog.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {blog.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Link href={`/${blog._id}`} underline='none'>
                                                <Button size="small" color="primary">
                                                    Read
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </div>
                            )
                        }).reverse()
                        : <div style={{ padding: '1rem' }}>
                            <i><h4 style={{ textAlign: 'center', color: 'grey' }}>Looks like there aren't many blogs in this category :( </h4></i>
                        </div>
                }
            </div>

        </div>
    )
}

export default Recommendations
