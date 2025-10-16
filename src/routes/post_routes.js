//En este mismo archivo puedo definir las subrutas /:postId/images y /:postId/comments,
//pero cada uno con su respectivo controlador

const { Router } = require('express')
const postController = require('../controllers/post_controller')
const { validarIdParams } = require('../middlewares/validateIdParams')
const { validarCrearPost } = require('../middlewares/validatePost')
const router = Router()

// CRUD de posts
router.get('/', postController.obtenerPosts);
router.get('/:id', validarIdParams, postController.obtenerPostById);
router.post('/', validarCrearPost, postController.crearPost);
router.put('/:id', validarIdParams, postController.actualizarPostById);
router.delete('/:id', validarIdParams, postController.borrarPostById);

//AGREGAR MIDDLEWARES PARA IDs DE RELACIONES
//CRUDS de relaciones
// Imágenes de un post
/*router.get("/:id_post/images", validarIdParams, postController.obtenerImagenesDeIdPost);
router.post("/:id_post/images", validarIdParams, postController.agregarUnaImagenAIdPost);
router.delete("/:id_post/images/:id_postImages", validarIdParams, postController.eliminarUnaImagenDeIdPost);

// Tags de un post (N a N)
router.get("/:id_post/tags", postController.obtenerTagsDeIdPost);
router.post("/:id_post/tags/:id_tag", postController.agregarUnTagAIdPost);
router.delete("/:id_post/tags/:id_tag", postController.eliminarTagDeIdPost);

// Comments de un post
router.get("/:id_post/comments", validarIdParams, postController.obtenerCommentsDeIdPost);
router.post("/:id_post/comments", validarIdParams, postController.crearCommentEnIdPost);*/

module.exports = router;