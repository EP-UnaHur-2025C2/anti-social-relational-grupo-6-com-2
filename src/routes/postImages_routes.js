const { Router } = require('express')
const postImagesController = require('../controllers/postImages_controller')
const { validarIdParams } = require('../middlewares/validateIdParams')
const { validarCrearPostImage } = require('../middlewares/validatePostImages')
const router = Router()

// CRUD de postImages
router.get("/", postImagesController.obtenerPostImages);
router.get("/:id", validarIdParams, postImagesController.obtenerPostImagesById);
router.post("/", validarCrearPostImage, postImagesController.crearPostImages);
router.put("/:id", validarIdParams, postImagesController.actualizarPostImagesById);
router.delete("/:id", validarIdParams, postImagesController.borrarPostImagesById);

module.exports = router;