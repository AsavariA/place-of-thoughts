import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    ownerId: String,
    ownerName: String,
    title: String,
    description: String,
    content: Map
})

var BlogModel = mongoose.model('Blog', blogSchema);

export default BlogModel;