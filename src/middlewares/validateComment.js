const Joi = require('joi')

// Validacion para crear un Comentario
const crearCommentSchema = Joi.object({
    contenido: Joi.string()
        .trim()
        .min(1)
        .max(300)
        .required()
        .messages({
            'string.empty': 'El comentario no puede estar vacío',
            'string.max': 'El comentario no puede tener más de 300 caracteres'
        })/*,
    nickName: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'El nickName del usuario es obligatorio'
        }),
    id_post: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'El ID del post debe ser un número',
            'number.positive': 'El ID del post debe ser positivo',
            'any.required': 'El ID del post es obligatorio'
        })*/
})

// Middleware
const validarCrearComment = (req, res, next) => {
    const { error } = crearCommentSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })
    next()
}

module.exports = {
    validarCrearComment
}