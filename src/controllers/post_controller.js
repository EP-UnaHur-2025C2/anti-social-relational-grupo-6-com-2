const { Post,Post_Images, Tag, Comment } = require('../db/models')

const obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.findAll()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message: "Error al obtener los posts"})
    }
}

const obtenerPostById = async (req, res) => {
    try {
        const id_post = req.params.id_post
        const post = await Post.findByPk(id_post)
        if(!post){
            res.status(400).json({message: "Post no encontrado"})
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message: "Error al obtener el post"})
    }
}  

const crearPost = async (req, res) => {
    try { 
        //Los comments pueden agregarse despues de forma independiente desde otra ruta
        //Un post puede no tener images ni tags asociados
        const { fecha, descripcion, images = [], tags = [], nickName } = req.body;
        const post = await Post.create({ 
            fecha,  
            descripcion,
            images, //FK, array de id_postImages
            tags, //FK, array de id_tags
            nickName //FK
        })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({message: "Error al crear el post"})
    }
}

const actualizarPostById = async (req, res) => {
    try {
        const { id_post } = req.params;
        const { fecha, descripcion, images, tags, nickName } = req.body;
        const post = await Post.findByPk(id_post);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        await post.update({ fecha, descripcion, images, tags, nickName });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el post"})
    }   
}

const borrarPostById =  async (req, res) => {
    try {
        const { id_post } = req.params;
        const post = await Post.findByPk(id_post);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        await post.destroy();
        res.status(204).send();
    } catch (error) {
         res.status(500).json({message: "Error al eliminar el post"})
    }
}

// Controllers de las relaciones de tag 

// Obtener todas las imágenes de un post
const obtenerImagenesDeIdPost = async (req, res) => {
    try {
        const { id_post } = req.params;

        const post = await Post.findByPk(id_post, {
            include: [{
                model: Post_Images,
                as: 'imagenes', // Alias del nombre de la relacion
                attributes: ['id_postImages', 'url']
            }]
        });

        if (!post) return res.status(404).json({ message: 'Post no encontrado' });

        res.status(200).json(post.imagenes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener imágenes del post', error: error.message });
    }
};

// Agregar una imagen a un post
const agregarUnaImagenAIdPost = async (req, res) => {
    try {
        const { id_post } = req.params;
        const { url } = req.body; //url de la imagen

        const post = await Post.findByPk(id_post);
        if (!post) return res.status(404).json({ message: 'Post no encontrado' });

        const nuevaImagen = await PostImages.create({ postId: id_post, url });
        res.status(201).json(nuevaImagen);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar imagen al post', error: error.message });
    }
};

// Eliminar una imagen de un post
const eliminarUnaImagenDeIdPost = async (req, res) => {
    try {
        const { id_post, id_postImages } = req.params;

        const imagen = await PostImages.findOne({
            where: { id_postImages: id_postImages, id_post: id_post }
        });

        if (!imagen) return res.status(404).json({ message: 'Imagen no encontrada' });

        await imagen.destroy();
        res.status(200).json({ message: 'Imagen eliminada del post correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar imagen del post', error: error.message });
    }
};

// Obtener tags de un post
const obtenerTagsDeIdPost = async (req, res) => {
    try {
        const { id_post } = req.params;

        const post = await Post.findByPk(id_post, {
            include: [{
                model: Tag,
                as: 'tags', // Alias del nombre de la relacion
                attributes: ['id_tag', 'nombre'],
                through: { attributes: [] } // Para excluir los datos de la tabla intermedia
            }]
        });

        if (!post) return res.status(404).json({ message: 'Post no encontrado' });

        res.status(200).json(post.tags);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tags del post', error: error.message });
    }
};

// Agregar un tag a un post
const agregarUnTagAIdPost = async (req, res) => {
    try {
        const { id_post, id_tag } = req.params;

        const post = await Post.findByPk(id_post);
        const tag = await Tag.findByPk(id_tag);
        if (!post || !tag) return res.status(404).json({ message: 'Post o Tag no encontrado' });

        await post.addTag(tag);
        res.status(201).json({ message: 'Tag asociado al post correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al asociar el tag al post', error: error.message });
    }
};

// Eliminar un tag de un post
const eliminarTagDeIdPost = async (req, res) => {
    try {
        const { id_post, id_tag } = req.params;

        const post = await Post.findByPk(id_post);
        const tag = await Tag.findByPk(id_tag);
        if (!post || !tag) return res.status(404).json({ message: 'Post o Tag no encontrado' });

        await post.removeTag(tag);
        res.status(200).json({ message: 'Tag eliminado del post correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tag del post', error: error.message });
    }
};

// Obtener comentarios de un post
const obtenerCommentsDeIdPost = async (req, res) => {
    try {
        const { id_post } = req.params;

        const post = await Post.findByPk(id_post, {
            include: [{
                model: Comment,
                as: 'comments', // Alias del nombre de la relacion
                attributes: ['id_comment', 'nickName', 'contenido', 'fecha', 'visibilidad']
            }]
        });

        if (!post) return res.status(404).json({ message: 'Post no encontrado' });

        // Filtrar comentarios visibles y recientes según variable de entorno
        /*const maxMonths = process.env.MAX_COMMENT_AGE_MONTHS || 6;
        const fechaLimite = new Date();
        fechaLimite.setMonth(fechaLimite.getMonth() - maxMonths);

        const comentariosFiltrados = post.comments.filter(c => c.visible && new Date(c.fecha) >= fechaLimite);*/

        res.status(200).json(post.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios del post', error: error.message });
    }
};

// Crear un comentario en un post
const crearCommentEnIdPost = async (req, res) => {
    try {
        const { id_post } = req.params;
        const { nickName, contenido } = req.body;

        const post = await Post.findByPk(id_post);
        if (!post) return res.status(404).json({ message: 'Post no encontrado' });

        const nuevoComment = await Comment.create({ //Se crea el nuevo comentario y lo asocia a un post especifico
            id_post, //FK
            nickName, //FK
            contenido,
            fecha: new Date(),
            visibilidad: true
        });

        res.status(201).json(nuevoComment);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario en el post', error: error.message });
    }
};

module.exports = {
  obtenerPosts,
  obtenerPostById,
  crearPost,
  actualizarPostById,
  borrarPostById,
  obtenerImagenesDeIdPost,
  agregarUnaImagenAIdPost,
  eliminarUnaImagenDeIdPost,
  obtenerTagsDeIdPost,
  agregarUnTagAIdPost,
  eliminarTagDeIdPost,
  obtenerCommentsDeIdPost,
  crearCommentEnIdPost
}