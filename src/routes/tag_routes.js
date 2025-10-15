const { Router } = require('express')
/*Agregar los controladores y validaciones necesarios. Ej:
const serieController = require('../controllers/serieController')
const validarIdParams = require('../middlewares/validateSerie')*/
const router = Router()

// CRUD de tags
router.get("/", tagController.obtenerTags);
router.get("/:id", tagController.obtenerTag);
router.post("/", tagController.crearTag);
router.put("/:id", tagController.actualizarTag);
router.delete("/:id", tagController.borrarTag);

// Posts asociados a una tag
router.get("/:id_tag/posts", tagController.obtenerPostsPorTag);

module.exports = router;