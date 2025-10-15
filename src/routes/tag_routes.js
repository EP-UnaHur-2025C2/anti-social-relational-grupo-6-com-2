const { Router } = require('express')
const tagController = require('../controllers/tag_controller')
//const validarIdParams = require('../middlewares/validateSerie')
const router = Router()

// CRUD de tags
router.get("/", tagController.obtenerTags);
router.get("/:id", tagController.obtenerTagById);
router.post("/", tagController.crearTag);
//router.put("/:id", tagController.actualizarTagById);
//router.delete("/:id", tagController.borrarTagById);

//CRUDS de relaciones
// Posts asociados a una tag
router.get("/:id_tag/posts", tagController.obtenerPostsByIdTag);

module.exports = router;