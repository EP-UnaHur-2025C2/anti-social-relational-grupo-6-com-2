//En este mismo archivo puedo definir las subrutas /:postId/images y /:postId/comments,
//pero cada uno con su respectivo controlador

const { Router } = require('express')
const postController = require('../controllers/post_controller')
const { validarIdParams } = require('../middlewares/validateIdParams')
const { validarCrearPost } = require('../middlewares/validatePost')
const { validarCrearPostImage } = require('../middlewares/validatePostImages')
const { validarCrearComment } = require('../middlewares/validateComment')
const router = Router()

// CRUD de posts
router.get('/', postController.obtenerPosts);
router.get('/:id_post', validarIdParams, postController.obtenerPostById);
router.post('/', validarCrearPost, postController.crearPost);
router.put('/:id_post', validarIdParams, postController.actualizarPostById);
router.delete('/:id_post', validarIdParams, postController.borrarPostById);

//Rutas de relaciones
// Imágenes de un post
router.get("/:id_post/images", validarIdParams, postController.obtenerImagenesDeIdPost);
router.post("/:id_post/images", validarIdParams, validarCrearPostImage, postController.agregarUnaImagenAIdPost);
router.delete("/:id_post/images/:id_postImages", validarIdParams, postController.eliminarUnaImagenDeIdPost);

// Tags de un post (N a N)
router.get("/:id_post/tags", postController.obtenerTagsDeIdPost);
router.post("/:id_post/tags/:id_tag", postController.agregarUnTagAIdPost); //No es necesario el middleware, ya que post y tag solo se asocian aca pero no se crean, existen de antes
router.delete("/:id_post/tags/:id_tag", postController.eliminarTagDeIdPost);

// Comments de un post
router.get("/:id_post/comments", validarIdParams, postController.obtenerCommentsDeIdPost);
router.post("/:id_post/comments", validarIdParams, validarCrearComment, postController.crearCommentEnIdPost);

module.exports = router;