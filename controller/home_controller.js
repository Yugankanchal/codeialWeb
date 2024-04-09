const Post = require('../model/post');
const User = require('../model/user');
module.exports.home = async (req, res) => {

    // Post.find({}).then((posts) => {
    //     console.log(posts);
    //     return res.render('home', { title: 'Home', extractStyles: true, Posts: posts });
    // }).catch((err) => {
    //     console.log('error in finding the post in Home_controller');

    // });
    try {
        let allUser = await User.find().catch((err) => {
            console.log('error in finding the user');
        });
        let post = await Post.find({}).sort('-createdAt').populate('user');

        return res.render('home', { title: 'Home', extractStyles: true, Posts: post, all_users: allUser });
    } catch (err) {
        console.log('error', err);
        return;
    }
}
