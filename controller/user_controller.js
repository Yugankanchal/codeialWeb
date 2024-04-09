const user = require('../model/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = (req, res) => {
    user.findById(req.params.id).then((u) => {
        return res.render('profile', { title: 'Profile', User: res.locals.user, extractStyles: true, Profile_user: u });
    }).catch((err) => {
        console.log('error in finding the user');
    })

}

module.exports.update = async (req, res) => {
    if (req.user.id == req.params.id) {
        // user.findByIdAndUpdate(req.params.id, req.body).then(() => {
        //     return res.redirect('back');
        // }).catch((err) => {
        //     console.log('error in finding the user, then updating the user');
        //     return res.redirect('back');
        // })
        try {
            let User = await user.findById(req.params.id);
            user.uploadedAvatar(req, res, (err) => {
                if (err) { console.log('****mullter error', err); return res.redirect('back'); }
                User.name = req.body.name;
                User.email = req.body.email;
                if (req.file) {
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', User.avatar))
                    }
                    User.avatar = user.avatarPath + '/' + req.file.filename;
                }
                User.save();
                return res.redirect('back');
            })

        } catch (err) {
            req.flash('error', '');
            return res.redirect('back');
        }
    } else {
        res.status(401).send('unauthorized');
    }
}
module.exports.userSignin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('profile');
    }
    return res.render('user_sign_in', { title: 'user-sign-in', extractStyles: true, extractScripts: true });
}

module.exports.userSignup = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('profile');
    }
    return res.render('user-sign-up', { title: 'user-sign-up', extractStyles: true });
}

module.exports.create = (req, res) => {
    if (req.body.password != req.body.coinfirmPassword) {
        return res.redirect('back');
    }

    user.findOne({ email: req.body.email }).then((User) => {
        if (!User) {
            user.create(req.body).then((User) => {
                return res.redirect('sign-in');
            }).catch((err) => {
                console.log('error in creating USer');
                return res.redirect('back');
            })
        }
    }).catch((err) => {
        console.log('error occured in finding the user');
    })

}
module.exports.createSession = (req, res) => {
    // user.findOne({ email: req.body.email }).then((User) => {
    //     if (User) {
    //         if (User.password != req.body.password) {
    //             return res.redirect('back');
    //         }
    //         res.cookie('user_id', User._id);
    //         return res.redirect('profile');
    //     } else {
    //         return res.redirect('back');
    //     }
    // }).catch((err) => {
    //     console.log('error in finding User email while signing in');
    // });
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'logged out successfully');
        res.redirect('/');

    })
}

module.exports.posts = (req, res) => {
    return res.render('post', { title: 'Users Posts' });
}