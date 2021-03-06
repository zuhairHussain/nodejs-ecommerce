var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../../config");
var common = require("../../common/common");

const User = require("../models/user.model");

exports.user_create = function (req, res, next) {
  if (req.body.email && req.body.username && req.body.password) {
    User.findOne({
      email: req.body.email
    })
      .then(doc => {
        if (doc) {
          res.status(200).json({
            error: `The email adress ${doc.email} is already in use.`
          });
        } else {
          var hashedPassword = bcrypt.hashSync(req.body.password, 8);
          var user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
          });

          user.save(function (err, user) {
            var token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });

            if (err) {
              res.status(500).send({ error: "Account not created please try again! " + err });
            } else {
              common.sentMailVerificationLink({ email: req.body.email, token: token }).then(function (response, error) {
                if (error) {
                  res.status(500).send({ error: "something went wrong please try again! " + error });
                } else {
                  res.status(200).send({ message: `Verification email Sent to ${req.body.email}. This token will expire after 24 hours.` });
                }
              });
            }
          });
        }
      });
  } else {
    res.status(500).send("Invalid Information");
  }
};

exports.verify_email = function (req, res, next) {
  const { token } = req.query;
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate." });

    User.findOneAndUpdate(
      { _id: decoded.id },
      { $set: { isVerified: true } },
      { new: true }
    ).then(doc => {
      if (doc) {
        res.redirect("/login?message=Email verified successfully!");
      } else {
        res.status(401).redirect("/login?message=Email is not verified!");
      }
    });
  });


};

exports.user_login = function (req, res, next) {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send({ auth: false, error: "Error on the server." });
      if (!user) return res.status(401).send({ auth: false, error: "Invalid email or password!" });
      if (!user.isVerified) return res.status(401).send({ auth: false, error: "User is not verified!" });
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, error: "Invalid email or password!" });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      console.log(user);
      res.status(200).send({ auth: true, token: token, user: { username: user.username, email: user.email } });
    });
  } else {
    res.status(401).send({ auth: false, error: "Email and Password are required!" });
  }
};

exports.me = function (req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    User.findById(decoded.id, { password: 0, _id: 0, isVerified: 0 }, function (err, user) {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send({ auth: true, user });

    });
  });
};

exports.reset_password_request = function (req, res, next) {
  const { email } = req.body;
  if (email) {
    User.findOne({
      email: email
    })
      .then(doc => {
        if (doc) {
          var token = jwt.sign({ id: doc._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          common.passwordResetLink({ email: doc.email, token: token }).then(function (response, error) {
            if (error) {
              res.status(500).send({ error: "something went wrong please try again! " + error });
            } else {
              res.status(200).send({ message: `Verification email Sent to ${doc.email}` });
            }
          });
        } else {
          res.status(200).json({ error: 'Email not found!' });
        }
      });
  } else {
    res.status(200).send({ error: "Please provide email address!" });
  }
};

exports.reset_password = function (req, res, next) {

  const { token, newPassword } = req.body;
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  if (!newPassword)
    return res.status(401).send({ auth: false, message: "No password provided." });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate." });

    var hashedPassword = bcrypt.hashSync(newPassword, 8);
    User.findOneAndUpdate(
      { _id: decoded.id },
      { $set: { password: hashedPassword } },
      { new: true }
    ).then(doc => {
      if (doc) {
        res.status(200).send({ message: "Password has been updated!" });
      } else {
        res.status(200).send({ error: "User not found!" });
      }
    });

  });
};