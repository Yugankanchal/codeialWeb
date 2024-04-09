const Posts = require('../model/post');
const Comment = require('../model/comments');
module.exports.create = async (req, res) => {
    try {
        let post = await Posts.create(
            {
                content: req.body.content,
                user: req.user._id
            }
        )
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            })
        }
        req.flash('success', 'post published');
        res.redirect('back');
    } catch (err) {
        return res.redirect('back');
    }
}


module.exports.destroy = (req, res) => {
    Posts.findById(req.params.id).then((post) => {
        // here comes the authorization, am i allowed to delete the post

        if (post.user == req.user.id) {
            // .id will convert it to string
            console.log(post.id)
            console.log('removed');
            Posts.findByIdAndRemove(post.id).catch((err) => {
                console.log('error in removing the post')
            });
            Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(201).json({
                    data: {
                        post_id: req.params.id,
                    },
                    message: 'post deleted successfully'
                })
            }
            res.redirect('back');
        } else {
            return res.redirect('back');
        }
    }).catch((err) => {
        console.log('error in finding the post');
        return res.redirect('back');
    })
}