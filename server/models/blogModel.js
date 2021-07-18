import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    ownerId: String,
    ownerName: String,
    title: String,
    description: String,
    content: Map,
    saves: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    category: {
        type: String,
        default: 'other',
    },
})

var BlogModel = mongoose.model('Blog', blogSchema);

export default BlogModel;