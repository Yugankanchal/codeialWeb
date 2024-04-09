const Posts = require('../../../model/post');
const { post } = require('../../../routes/api/v1');
const Comment = require('../../../model/comments');
module.exports.index = async (req, res) => {
    let post = await Posts.find({}).sort('-createdAt').populate('user');
    return res.json(200, {
        message: 'List of Posts',
        posts: post
    })
}

module.exports.destroy = async (req, res) => {
    try {
        let post = await Posts.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            return res.json(200, {
                message: 'posts and associated comments are deleted successfully'
            })
        } else {
            return res.json(401, {
                message: 'You cannot delete this post'
            })
        }
    } catch (err) {
        return res.json(500, {
            message: 'invalid server error'
        })
    }
}