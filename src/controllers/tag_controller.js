const { Tag, Post } = require('../db/models')

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
        const id_tag = req.params.id_tag
        const tag = await Tag.findByPk(id_tag)
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
        const { id_tag } = req.params;
        const { nombre, id_post } = req.body;
        const tag = await Tag.findByPk(id_tag);
        if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
        await tag.update({ nombre, id_post });
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el tag"})
    }   
}

const borrarTagById =  async (req, res) => {
    try {
        const { id_tag } = req.params;
        const tag = await Tag.findByPk(id_tag);
        if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
        await tag.destroy();
        res.status(204).send();
    } catch (error) {
         res.status(500).json({message: "Error al eliminar el tag"})
    }
}

// Controllers de las relaciones de tag 

//Obtener todos los posts de una tag
const obtenerPostsByIdTag = async (req, res) => {
    try {
        const { id_tag } = req.params;

        // Buscar la tag e incluir los posts relacionados
        const tag = await Tag.findByPk(id_tag, {
            include: [{
                model: Post,
                as: 'posts', // Alias del nombre de la relacion
                attributes: ['id_post', 'descripcion', 'fecha'],
                through: { attributes: [] } // Para excluir los datos de la tabla intermedia
            }]
        });

        // Si no existe la tag, devolver error
        if (!tag) return res.status(404).json({ message: 'Tag no encontrado' });

        // Si el tag existe, devuelve sus posts asociados
        res.status(200).json({
            tag: { //Objeto con la informacion a mostrar
                id: tag.id_tag,
                nombre: tag.nombre
            },
            posts: tag.posts //Array de posts asociados al tag
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts asociados al tag', error: error.message });
    }
};

module.exports = {
  obtenerTags,
  obtenerTagById,
  crearTag,
  actualizarTagById,
  borrarTagById,
  obtenerPostsByIdTag
}