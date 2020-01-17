const User = require('../model/user');

insertUser = function (req, res, next) {
    const user = new User({
        userName: req.body.username,

        userMail: req.body.usermail

    });

    user.save((resualt, error) => {
        if (error) {
            console.log(error);
            res.redirect('/');
            return;
        }
        console.log(resualt);
        res.redirect('/');
    })

};

getUsers = function (req, res, next) {
    User.find({}, 'userName userMail', (error, resualt) => {
        if (error) {
            console.log(error)
            res.redirect('/');
        }
        console.log(resualt);
        res.render('index', { items: resualt })

    })
};

updateUser = function (req, res, next) {
    const ID = req.body.id;
    const updatedUser = {
        userName: req.body.username,

        userMail: req.body.usermail

    }

    User.updateOne({ _id: ID }, { $set: updatedUser }, (error, doc) => {
        if (error) {
            console.log(error);
            res.redirect('/');
            return;
        }
        console.log(doc);
        res.redirect('/getusers');
    })

};

deleteUser = function (req, res, next) {
    const ID = req.body.id;

    User.deleteOne({ _id: ID }, (error, doc) => {
        if (error) {
            console.log(error);
            res.redirect('/');
            return;
        }
        console.log(doc);
        res.redirect('/getusers');
    })
};

module.exports = {
    insertUser: insertUser,
    getUsers: getUsers,
    updateUser: updateUser,
    deleteUser: deleteUser
}