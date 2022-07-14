const User = require('../module/user')
const Login = require('../module/login')

const methods = {
     async onGetAll(req, res) {
        try {
            let result = await User.findAll()
            res.success(result)
        } catch(error) {
            res.error(error)
        }
    },

    async onGetById(req, res) {
        try {
            let result = await User.findById(req.params.id)
            res.success(result)
        } catch(error) {
            res.error(error)
        }
    },

    async onDelete(req, res) {
        try {
            await User.delete(req.params.id)
            res.success('success', 200);
        } catch(error) {
            res.error(error)
        }
    },

    async onRegister(req, res) {
        try {
           const result = await User.insert(req.body)
            res.success(result, 200);
        } catch(error) {
            res.error(error)
        }
    },

    async onUpdate(req, res) {
        try {
           const result = await User.update(req.params.id, req.body)
            res.success(result, 200);
        } catch(error) {
            res.error(error)
        }
    },

    async onLogin(req, res) {
        try {
            const result =  await Login.login(req.body)
            res.success(result);
        } catch(error) {
            res.error(error)
        }
    }
}

module.exports = { ...methods }