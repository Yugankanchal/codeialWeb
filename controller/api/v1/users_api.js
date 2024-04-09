
const User = require('../../../model/user');
const jwt = require('jsonwebtoken');
module.exports.createSession = async (req, res) => {
    console.log(req.body);

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || req.body.password != user.password) {
            return res.json(422, {
                message: 'invalid username or password'
            })
        }
        return res.json(200, {
            message: 'sign in successful, here is token, keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: 100000 })
            }
        })
    } catch (err) {
        console.log('****', err);
        return res.json(500, {
            message: 'Internal server error'
        })
    }
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}