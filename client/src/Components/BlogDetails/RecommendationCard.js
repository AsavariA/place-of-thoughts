import React from 'react'
import { Typography, Link, Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const RecommendationCard = ({ blog }) => {
    const classes = useStyles();

    return (
        <>
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
        </>
    )
}

export default RecommendationCard
