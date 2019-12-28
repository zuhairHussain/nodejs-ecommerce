var dotenv = require("dotenv");
dotenv.load();

module.exports = {
  secret: process.env.APP_SECRET_KEY,
  dev_mongo_uri: process.env.DEV_MONGODB_URI,
  email: process.env.SMTP_EMAIL,
  password: process.env.SMTP_PASS
};
