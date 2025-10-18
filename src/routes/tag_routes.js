const { Router } = require('express')
const tagController = require('../controllers/tag_controller')
const { validarIdParams } = require('../middlewares/validateIdParams')
const { validarCrearTag } = require('../middlewares/validateTag')
const router = Router()

// CRUD de tags
router.get("/", tagController.obtenerTags);
router.get("/:id_tag", validarIdParams, tagController.obtenerTagById);
router.post("/", validarCrearTag, tagController.crearTag);
//router.put("/:id_tag", validarIdParams, tagController.actualizarTagById);
//router.delete("/:id_tag", validarIdParams, tagController.borrarTagById);

//Rutas de relaciones
// Posts asociados a una tag
router.get("/:id_tag/posts", validarIdParams, tagController.obtenerPostsByIdTag);

module.exports = router;