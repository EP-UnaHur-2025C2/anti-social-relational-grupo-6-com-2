const { Router } = require('express')
const userController = require('../controllers/user_controller')
const { validarNickNameParams, validarCrearUser } = require('../middlewares/validateUser')
const router = Router()

// CRUD de usuarios
router.get("/", userController.obtenerUsers);
router.get("/:nickName", validarNickNameParams, userController.obtenerUserByNickName);
router.post("/", validarCrearUser, userController.crearUser);
router.put("/:nickName", validarNickNameParams, userController.actualizarUserByNickName);
router.delete("/:nickName", validarNickNameParams, userController.borrarUserByNickName);

//CRUDS de relaciones
// Posts del usuario
//router.get("/:nickName/posts", validarNickNameParams, userController.obtenerPostsDeUserByNickName);

// Comments del usuario
//router.get("/:nickName/comments", validarNickNameParams, userController.obtenerCommentsDeUserByNickName);

module.exports = router;