import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    ownerId: String,
    ownerName: String,
    title: String,
    description: String,
    content: String
})

var BlogModel = mongoose.model('Bizness', blogSchema);

export default BlogModel;