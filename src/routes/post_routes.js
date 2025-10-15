//En este mismo archivo puedo definir las subrutas /:postId/images y /:postId/comments,
//pero cada uno con su respectivo controlador

const { Router } = require('express')
/*Agregar los controladores y validaciones necesarios. Ej:
const serieController = require('../controllers/serieController')
const validarIdParams = require('../middlewares/validateSerie')*/
const router = Router()

// CRUD de posts
router.get('/', postController.obtenerPosts);
router.get('/:id', postController.obtenerPost);
router.post('/', postController.crearPost);
router.put('/:id', postController.actualizarPost);
router.delete('/:id', postController.borrarPost);

// Imágenes de un post
router.get("/:id_post/images", postController.obtenerImagenesDePost);
router.post("/:id_post/images", postController.agregarImagenAPost);
router.delete("/:id_post/images/:id_postImages", postController.eliminarImagenDePost);

// Tags de un post (N a N)
router.get("/:id_post/tags", postController.obtenerTagsDePost);
router.post("/:id_post/tags/:id_tag", postController.agregarTagAPost);
router.delete("/:id_post/tags/:id_tag", postController.eliminarTagDePost);

// Comments de un post
router.get("/:id_post/comments", postController.obtenerCommentsDePost);
router.post("/:id_post/comments", postController.crearCommentEnPost);

module.exports = router;