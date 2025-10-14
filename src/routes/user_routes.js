const { Router } = require('express')
/*
Agregar los controladores y validaciones necesarios. Ej:
const serieController = require('../controllers/serieController')
const validarIdParams = require('../middlewares/validateSerie')
*/
const router = Router()

// CRUD de usuarios
router.get("/", userController.obtenerUsers);
router.get("/:id", userController.obtenerUser);
router.post("/", userController.crearUser);
router.put("/:id", userController.actualizarUser);
router.delete("/:id", userController.borrarUser);

export default router;