const secret = require('../configs/app').secret,
      { ErrorUnauthorized } = require('../configs/errorMethods'),
      { validateAccessToken } = require('../services/auth.service')

const methods = {

   guard(req, res, next){
    try {
        const token = req.headers['authorization']

        if(!token) return res.error(ErrorUnauthorized('Token Invalid'))

        if(token.split(" ")[0] !== "Bearer") return res.error(ErrorUnauthorized('Token Invalid')) 

        if(!validateAccessToken(token.split(" ")[1])) return res.error(ErrorUnauthorized('Token Expired.'))
   
        next();

    } catch(error) {
        res(error)
    } 
}

}


module.exports = { ...methods };