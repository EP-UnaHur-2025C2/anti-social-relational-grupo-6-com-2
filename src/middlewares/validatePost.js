const Joi = require('joi')

// Validacion para crear un Post
const crearPostSchema = Joi.object({
    descripcion: Joi.string()
        .trim()
        .min(1)
        .max(500)
        .required()
        .messages({
            'string.empty': 'La descripción es obligatoria',
            'string.max': 'La descripción no puede tener más de 500 caracteres'
        })/*,
    nickName: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'El nickName del usuario es obligatorio'
        })*/
})

// Middleware
const validarCrearPost = (req, res, next) => {
    const { error } = crearPostSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })
    next()
}

module.exports = {
    validarCrearPost
}