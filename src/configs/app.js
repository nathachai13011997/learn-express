require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    apiVersion: process.env.API_VERSION || 1,
    secret: process.env.SECRET,
    token_expires: process.env.TOKEN_EXPIRES,
  }