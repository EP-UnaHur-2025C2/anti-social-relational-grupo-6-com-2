const { Router } = require('express')
const postImagesController = require('../controllers/postImages_controller')
const { validarIdParams } = require('../middlewares/validateIdParams')
const { validarCrearPostImage } = require('../middlewares/validatePostImages')
const router = Router()

// CRUD de postImages
router.get("/", postImagesController.obtenerPostImages);
router.get("/:id_postImages", validarIdParams, postImagesController.obtenerPostImagesById);
router.post("/", validarCrearPostImage, postImagesController.crearPostImages);
router.put("/:id_postImages", validarIdParams, postImagesController.actualizarPostImagesById);
router.delete("/:id_postImages", validarIdParams, postImagesController.borrarPostImagesById);

module.exports = router;