import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core'

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
            <h3 style={{textAlign: 'center', margin: '1rem 0'}}>YOU MIGHT ALSO LIKE - </h3>
            <div className='recs'>
                {
                    blogs
                        ? blogs.slice(0, 3).map((blog) => {
                            return (
                                <div key={blog._id}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={blog.category}
                                                title="Category"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Lizard
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                    across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Share
                                            </Button>
                                            <Button size="small" color="primary">
                                                Learn More
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            )
                        })
                        : null
                }
            </div>

        </div>
    )
}

export default Recommendations
