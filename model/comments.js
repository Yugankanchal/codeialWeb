const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
    ,
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
});

const Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;