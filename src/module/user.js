let User = require('../db/models/User')
const bcrypt = require('bcrypt');
const { accessToken } = require('../services/auth.service');

const { ErrorNotFound, ErrorBadRequest, ErrorUnauthorized } = require('../configs/errorMethods');

const methods = {

    findAll() {
        return new Promise( async (resolve, reject) => {
            try {
                const result = User.map(e => { 
                    return {
                        id: e.id,
                        username: e.username,
                        name: e.name,
                        // password: bcrypt.hashSync("123", 10)
                    }
                 })
                resolve(result)
            } catch(error) {
                reject(error)
            }
        } )
    },

    findById(id) {
        return new Promise( async (resolve, reject) => {
            try {
                const info = User.find(e => e.id == id)
                if(!info) reject(ErrorNotFound('id: not found'))
                resolve(info)
            } catch(error) {
                reject(ErrorNotFound('id: not found'))
            }
        })
    },

    delete(id) {
        return new Promise( async (resolve, reject) => {
            try {
                const obj = User.find(e => e.id == id)
                if(!obj) reject(ErrorNotFound('id: not found'))
                User = User.filter(e => e.id != id)
                resolve()
            } catch(error) {
                reject(ErrorNotFound('id: not found'))
            }
        })
    },

    insert(data) {
        return new Promise( async (resolve, reject) => {
            try {
                const obj = User.find(e => e.name == data.name)
                if(obj) { 
                    reject(ErrorUnauthorized('name: duplicate')) 
                } else {
                    User.push({ id: User.length+1, name: data.name })
                    resolve({ id: User.length, name: data.name })
                }
            } catch(error) {
                reject(ErrorBadRequest(error.message))
            }
        } )
    },

    update(id, data) {
        return new Promise( async (resolve, reject) => {
            try {
                const obj = User.find(e => e.id == id)
                if(!obj) reject(ErrorNotFound('id: not found'))

                const obj2 = User.find(e => { 
                    if(e.name == data.name && e.id != id){
                        return e
                    } 
                })
                if(obj2) reject(ErrorNotFound('name: duplicate'))
                User.map((e, i)=> {
                    if(e.id == id){
                       User[i].name = data.name
                    }
                    return e
                })
                resolve(Object.assign(obj, data))
            } catch(error) {
                reject(error)

            }
        } )
    },

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