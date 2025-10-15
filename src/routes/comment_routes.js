const { Router } = require('express')
/*Agregar los controladores y validaciones necesarios. Ej:
const serieController = require('../controllers/serieController')
const validarIdParams = require('../middlewares/validateSerie')*/
const router = Router()

// CRUD de comentarios
router.get("/", commentController.obtenerComments);
router.get("/:id", commentController.obtenerComment);
router.post("/", commentController.crearComment);
router.put("/:id", commentController.actualizarComment);
router.delete("/:id", commentController.borrarComment);

module.exports = router;