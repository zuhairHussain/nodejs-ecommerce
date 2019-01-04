const User = require('../models/user.model');

exports.user_create = function (req, res, next) {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        var user = new User(
            { email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
            }
        );
        //use schema.create to insert data into the db
        user.save(function (err, user) {
          if (err) {
            return next(err)
          } else {
            res.status(200).send('User Created successfully', user);
          }
        });
      }
      else{
        res.status(500).send('Invalid Information');
      }
};