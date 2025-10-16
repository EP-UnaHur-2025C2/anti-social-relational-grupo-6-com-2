const { User } = require('../db/models')

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
        console.error("Error al crear el usuario:", error);
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
        res.json(user);
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

module.exports = {
  obtenerUsers,
  obtenerUserByNickName,
  crearUser,
  actualizarUserByNickName,
  borrarUserByNickName
}