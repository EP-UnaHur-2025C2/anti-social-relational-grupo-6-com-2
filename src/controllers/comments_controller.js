const { Comment } = require('../db/models')

const obtenerComments = async (req, res) => {
    try {
        const comments = await Comment.findAll()
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({message: "Error al obtener los comentarios"})
    }
}

const obtenerCommentById = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await Comment.findByPk(id)
        if(!comment){
            res.status(400).json({message: "Comentario no encontrado"})
        }
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({message: "Error al obtener el comentario"})
    }
}   

const crearComment = async (req, res) => {
    try {
        const { contenido, fecha, visibilidad, nickName, id_post } = req.body;
        const comment = await Comment.create({
            contenido,
            fecha,
            visibilidad,
            nickName, //FK
            id_post //FK
        })
        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({message: "Error al crear el comentario"})
    }
}

const actualizarCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { contenido, fecha, visibilidad, nickName, id_post } = req.body;
        const comment = await Comment.findByPk(id);
        if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
        await comment.update({ contenido, fecha, visibilidad, nickName, id_post });
        res.json(comment);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el comentario"})
    }   
}

const borrarCommentById =  async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
        await comment.destroy();
        res.status(204).send();
    } catch (error) {
         res.status(500).json({message: "Error al eliminar el comentario"})
    }
}

module.exports = {
  obtenerComments,
  obtenerCommentById,
  crearComment,
  actualizarCommentById,
  borrarCommentById
}