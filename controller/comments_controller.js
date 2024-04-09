const Comments = require('../model/comments');
const Post = require('../model/post');
module.exports.createComment = (req, res) => {
    Post.findById(req.body.post).then((post) => {
        Comments.create({
            comment: req.body.comment,
            user: req.user._id,
            post: post._id
        }).then((comments) => {
            return res.redirect('back');
        }).catch((err) => {
            console.log('error in creating the comment');
            return res.redirect('back');
        })
    }).catch((err) => {
        console.log('error in finding the post');
        return res.redirect('back');
    })
}