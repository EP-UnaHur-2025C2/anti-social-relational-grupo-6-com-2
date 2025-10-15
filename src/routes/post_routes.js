//En este mismo archivo puedo definir las subrutas /:postId/images y /:postId/comments,
//pero cada uno con su respectivo controlador

const { Router } = require('express')
/*Agregar los controladores y validaciones necesarios. Ej:
const serieController = require('../controllers/serieController')
const validarIdParams = require('../middlewares/validateSerie')*/
const router = Router()

// CRUD de posts
router.get('/', postController.obtenerPosts);
router.get('/:id', postController.obtenerPostById);
router.post('/', postController.crearPost);
router.put('/:id', postController.actualizarPostById);
router.delete('/:id', postController.borrarPostById);

//CRUDS de relaciones
// Imágenes de un post
router.get("/:id_post/images", postController.obtenerImagenesDeIdPost);
router.post("/:id_post/images", postController.agregarUnaImagenAIdPost);
router.delete("/:id_post/images/:id_postImages", postController.eliminarUnaImagenDeIdPost);

// Tags de un post (N a N)
router.get("/:id_post/tags", postController.obtenerTagsDeIdPost);
router.post("/:id_post/tags/:id_tag", postController.agregarUnTagAIdPost);
router.delete("/:id_post/tags/:id_tag", postController.eliminarTagDeIdPost);

// Comments de un post
router.get("/:id_post/comments", postController.obtenerCommentsDeIdPost);
router.post("/:id_post/comments", postController.crearCommentEnIdPost);

module.exports = router;