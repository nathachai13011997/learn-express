const router = require('express').Router()
const controllers = require('../../controllers/user.controller');
const guard = require('../../middleware/auth.guard').guard;

router.get('/', guard, controllers.onGetAll)
router.get('/:id', controllers.onGetById)
router.delete('/:id', guard, controllers.onDelete)
router.post('/register', controllers.onRegister)
router.put('/:id', guard,controllers.onUpdate)
router.post('/login', controllers.onLogin)

module.exports = router;