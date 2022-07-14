const jwt = require('jsonwebtoken'),
      configs = require('../configs/app');

const methods = {
    
    accessToken(obj){
        return jwt.sign({
            id: obj.id,
            username: obj.username,
            name: obj.name
          }, configs.secret, { expiresIn: configs.token_expires });
    },

    validateAccessToken(token) {
        try {
            return jwt.verify(token, configs.secret) ? true : false;
        } catch(error) {
            return false
        }
    }

}

module.exports = { ...methods };