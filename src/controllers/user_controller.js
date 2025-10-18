const { User, Comment, Post } = require('../db/models')

const obtenerUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: "Error al obtener los usuarios"})
    }
}

const obtenerUserByNickName = async (req, res) => {
    try {
        const nickName  = req.params.nickName 
        const user = await User.findByPk(nickName)
        if(!user){
            res.status(400).json({message: "Usuario no encontrado"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Error al obtener el usuario"})
    }
}   

const crearUser = async (req, res) => {
    try {
        const { nickName, nombre, email, contrasenia } = req.body;
        const user = await User.create({
            nickName, //PK , se pasa en este create porque es no numerica
            nombre,
            email,
            contrasenia
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message: "Error al crear el usuario"})
    }
}

const actualizarUserByNickName = async (req, res) => {
    try {
        const { nickName  } = req.params;
        const { nombre, email, contrasenia } = req.body;
        const user = await User.findByPk(nickName);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        await user.update({ nombre, email, contrasenia });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el usuario"})
    }   
}

const borrarUserByNickName =  async (req, res) => {
    try {
        const { nickName } = req.params;
        const user = await User.findByPk(nickName);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        await user.destroy();
        res.status(204).send();
    } catch (error) {
         res.status(500).json({message: "Error al eliminar el usuario"})
    }
}

// Controllers de las relaciones de user

// Obtener todos los posts de un usuario
const obtenerPostsDeUserByNickName = async (req, res) => {
    try {
        const { nickName } = req.params;
        const user = await User.findByPk(nickName, {
            include: [{
                model: Post,
                as: 'posts', // Alias del nombre de la relacion
                attributes: ['id_post', 'descripcion', 'fecha']
            }]
        });

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        
        res.status(200).json(user.posts); //Devuelve los posts de dicho usuario
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts del usuario', error: error.message });
    }
};


// Obtener todos los comentarios realizados por un usuario
const obtenerCommentsDeUserByNickName = async (req, res) => {
    try {
        const { nickName } = req.params;
        const user = await User.findByPk(nickName, {
            include: [{
                model: Comment,
                as: 'comments', // Alias del nombre de la relacion
                attributes: ['id_comment', 'contenido', 'fecha', 'visibilidad', 'id_post']
            }]
        });

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        // Filtrar comentarios visibles y recientes según variable de entorno
        /*const maxMonths = process.env.MAX_COMMENT_AGE_MONTHS || 6;
        const fechaLimite = new Date();
        fechaLimite.setMonth(fechaLimite.getMonth() - maxMonths);

        const comentariosFiltrados = post.comments.filter(c => c.visible && new Date(c.fecha) >= fechaLimite);*/
        res.status(200).json(user.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios del usuario', error: error.message });
    }
};

module.exports = {
  obtenerUsers,
  obtenerUserByNickName,
  crearUser,
  actualizarUserByNickName,
  borrarUserByNickName,
  obtenerPostsDeUserByNickName,
  obtenerCommentsDeUserByNickName
}