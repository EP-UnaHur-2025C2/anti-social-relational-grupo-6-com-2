const { Router } = require('express')
const commentController = require('../controllers/comments_controller')
//const validarIdParams = require('../middlewares/validateSerie')
const router = Router()

// CRUD de comentarios
router.get("/", commentController.obtenerComments);
router.get("/:id", commentController.obtenerCommentById);
router.post("/", commentController.crearComment);
router.put("/:id", commentController.actualizarCommentById);
router.delete("/:id", commentController.borrarCommentById);

module.exports = router;