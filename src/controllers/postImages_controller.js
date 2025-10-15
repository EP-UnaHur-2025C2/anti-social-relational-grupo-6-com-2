const { PostImage } = require('../db/models')

const obtenerPostImages = async (req, res) => {
    try {
        const postImage = await PostImage.findAll()
        res.status(200).json(postImage)
    } catch (error) {
        res.status(500).json({message: "Error al obtener la imagen"})
    }
}

const obtenerPostImagesById = async (req, res) => {
    try {
        const id = req.params.id
        const postImage = await PostImage.findByPk(id)
        if(!postImage){
            res.status(400).json({message: "Imagen no encontrada"})
        }
        res.status(200).json(postImage)
    } catch (error) {
        res.status(500).json({message: "Error al obtener la imagen"})
    }
}   

const crearPostImages = async (req, res) => {
    try {
        const { url, id_post } = req.body;
        const postImage = await PostImage.create({
            url,
            id_post //FK
        })
        res.status(201).json(postImage)
    } catch (error) {
        res.status(500).json({message: "Error al crear la imagen"})
    }
}

const actualizarPostImagesById = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, id_post } = req.body;
        const postImage = await PostImage.findByPk(id);
        if (!postImage) return res.status(404).json({ error: 'Imagen no encontrada' });
        await postImage.update({ url, id_post });
        res.json(postImage);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar la imagen"})
    }   
}

const borrarPostImagesById =  async (req, res) => {
    try {
        const { id } = req.params;
        const postImage = await PostImage.findByPk(id);
        if (!postImage) return res.status(404).json({ error: 'Imagen no encontrada' });
        await postImage.destroy();
        res.status(204).send();
    } catch (error) {
         res.status(500).json({message: "Error al eliminar la imagen"})
    }
}

module.exports = {
  obtenerPostImages,
  obtenerPostImagesById,
  crearPostImages,
  actualizarPostImagesById,
  borrarPostImagesById
}