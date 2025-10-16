const { Router } = require('express')
const userController = require('../controllers/user_controller')
//const validarIdParams = require('../middlewares/validateSerie')
const router = Router()

// CRUD de usuarios
router.get("/", userController.obtenerUsers);
router.get("/:nickName", userController.obtenerUserByNickName);
router.post("/", userController.crearUser);
router.put("/:nickName", userController.actualizarUserByNickName);
router.delete("/:nickName", userController.borrarUserByNickName);

//CRUDS de relaciones
// Posts del usuario
//router.get("/:nickName/posts", userController.obtenerPostsDeUserByNickName);

// Comments del usuario
//router.get("/:nickName/comments", userController.obtenerCommentsDeUserByNickName);

module.exports = router;