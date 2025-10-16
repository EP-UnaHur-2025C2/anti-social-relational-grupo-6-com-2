const Joi = require('joi')

// Validacion para crear un Tag
const crearTagSchema = Joi.object({
  nombre: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.min": "El nombre de la etiqueta debe tener al menos 2 caracteres",
      "string.max": "El nombre de la etiqueta no puede superar los 50 caracteres",
      "any.required": "El nombre de la etiqueta es obligatorio"
    })
})

// Middleware
const validarCrearTag = (req, res, next) => {
  const { error, value } = crearTagSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  req.body = value
  next()
}

module.exports = {
    validarCrearTag
}