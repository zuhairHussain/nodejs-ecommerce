var nodemailer = require("nodemailer");
var config = require("../config");

var mailConfig;
if (process.env.NODE_ENV === 'production') {
    mailConfig = {
        service: "Gmail",
        auth: {
            user: config.email,
            pass: config.password
        }
    };
} else {
    mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: config.email,
            pass: config.password
        }
    };
}
let smtpTransport = nodemailer.createTransport(mailConfig);

exports.sentMailVerificationLink = function (user, token) {
    var from = config.email + " Team<" + config.email + ">";
    var mailbody = "<p>Thanks for Registering on " + config.email + " </p><p>Please verify your email by clicking on the verification link below.<br/><a href='http://localhost:3000/api/v1/verify-email?id=" + token + "'>Verification Link</a></p>"
    return mail(from, user.email, "Account Verification", mailbody);
};

function mail(from, email, subject, mailbody) {
    console.log(from, email, subject, mailbody)
    var mailOptions = {
        from: from,
        to: email,
        subject: subject,
        html: mailbody
    };

    return smtpTransport.sendMail(mailOptions);
}