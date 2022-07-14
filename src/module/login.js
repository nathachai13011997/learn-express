let User = require('../db/models/User')
const bcrypt = require('bcrypt');
const { accessToken } = require('../services/auth.service');

const { ErrorUnauthorized } = require('../configs/errorMethods');

const methods = {

    login(data){
        return new Promise( async (resolve, reject) => {
            try {
                const obj = User.find(e => e.username == data.username)
                if(!obj) reject(ErrorUnauthorized('username not found'))

                const checkPass = bcrypt.compareSync(data.password, obj.password);
                if(!checkPass) reject(ErrorUnauthorized('password is invalid'))
                
                const access_token = accessToken(obj);
                delete obj.password

                resolve({ data: obj, accessToken: access_token })
            } catch(error) {
                reject(error)
            }
        })
    }

}

module.exports = { ...methods }