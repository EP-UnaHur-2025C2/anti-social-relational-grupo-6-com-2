const { Tag } = require('../db/models')

const obtenerTags = async (req, res) => {
    try {
        const tags = await Tag.findAll()
        res.status(200).json(tags)
    } catch (error) {
        res.status(500).json({message: "Error al obtener los tags"})
    }
}

const obtenerTagById = async (req, res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findByPk(id)
        if(!tag){
            res.status(400).json({message: "Tag no encontrado"})
        }
        res.status(200).json(tag)
    } catch (error) {
        res.status(500).json({message: "Error al obtener el tag"})
    }
}   

const crearTag = async (req, res) => {
    try {
        const { nombre, id_post } = req.body;
        const tag = await Tag.create({
            nombre,
            id_post //FK    
        })
        res.status(201).json(tag)
    } catch (error) {
        res.status(500).json({message: "Error al crear el tag"})
    }
}

const actualizarTagById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, id_post } = req.body;
        const tag = await Tag.findByPk(id);
        if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
        await tag.update({ nombre, id_post });
        res.json(tag);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el tag"})
    }   
}

const borrarTagById =  async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByPk(id);
        if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
        await tag.destroy();
        res.status(204).send();
    } catch (error) {
         res.status(500).json({message: "Error al eliminar el tag"})
    }
}

module.exports = {
  obtenerTags,
  obtenerTagById,
  crearTag,
  actualizarTagById,
  borrarTagById
}