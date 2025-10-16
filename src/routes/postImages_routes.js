const { Router } = require('express')
const postImagesController = require('../controllers/postImages_controller')
//const validarIdParams = require('../middlewares/validateSerie')
const router = Router()

// CRUD de postImages
router.get("/", postImagesController.obtenerPostImages);
router.get("/:id", postImagesController.obtenerPostImagesById);
router.post("/", postImagesController.crearPostImages);
router.put("/:id", postImagesController.actualizarPostImagesById);
router.delete("/:id", postImagesController.borrarPostImagesById);

module.exports = router;