const { Router } = require('express')
const commentController = require('../controllers/comments_controller')
const { validarIdParams } = require('../middlewares/validateIdParams')
const { validarCrearComment } = require('../middlewares/validateComment')
const router = Router()

// CRUD de comentarios
router.get("/", commentController.obtenerComments);
router.get("/:id_comment", validarIdParams, commentController.obtenerCommentById);
router.post("/", validarCrearComment, commentController.crearComment);
router.put("/:id_comment", validarIdParams, commentController.actualizarCommentById);
router.delete("/:id_comment", validarIdParams, commentController.borrarCommentById);

module.exports = router;