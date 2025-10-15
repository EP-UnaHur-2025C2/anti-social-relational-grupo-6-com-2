const { Router } = require('express')
/*Agregar los controladores y validaciones necesarios. Ej:
const serieController = require('../controllers/serieController')
const validarIdParams = require('../middlewares/validateSerie')*/
const router = Router()

// CRUD de postImages
router.get("/", postImagesController.obtenerTodosLosPostImages);
router.get("/:id", postImagesController.obtenerPostImages);
router.post("/", postImagesController.crearPostImages);
router.put("/:id", postImagesController.actualizarPostImages);
router.delete("/:id", postImagesController.borrarPostImages);

module.exports = router;