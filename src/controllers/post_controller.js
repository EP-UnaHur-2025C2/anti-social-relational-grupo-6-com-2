const { Post } = require('../db/models')

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
        const id = req.params.id
        const post = await Post.findByPk(id)
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
        const { id } = req.params;
        const { fecha, descripcion, images, tags, nickName } = req.body;
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        await post.update({ fecha, descripcion, images, tags, nickName });
        res.json(post);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el post"})
    }   
}

const borrarPostById =  async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        await post.destroy();
        res.status(204).send();
    } catch (error) {
         res.status(500).json({message: "Error al eliminar el post"})
    }
}

module.exports = {
  obtenerPosts,
  obtenerPostById,
  crearPost,
  actualizarPostById,
  borrarPostById
}