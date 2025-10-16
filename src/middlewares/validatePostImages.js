const Joi = require('joi')

// Validacion para crear un PostImages
const crearPostImagesSchema = Joi.object({
  url: Joi.string()
    .uri() //Asegura que tenga el formato adecuado de una URL completa(http:// o https://)
    .required()
    .messages({
      "string.uri": "La URL de la imagen debe tener un formato válido (https://...)",
      "any.required": "La URL de la imagen es obligatoria"
    /*}),
  id_post: Joi.number() //Una imagen no puede existir de forma independiente, cada imagen depende de un post 
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El id_post debe ser un número",
      "number.integer": "El id_post debe ser entero",
      "number.positive": "El id_post debe ser positivo",
      "any.required": "El id_post es obligatorio"*/
    })
})

// Middleware
const validarCrearPostImage = (req, res, next) => {
  const { error, value } = crearPostImagesSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  req.body = value
  next()
}

module.exports = {
    validarCrearPostImage
}