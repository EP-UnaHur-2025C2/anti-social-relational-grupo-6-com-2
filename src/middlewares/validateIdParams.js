const Joi = require('joi')

// Validar el parámetro :id

const idParamsSchema = Joi.object()
  .pattern( //Solo se extraen los parametros no dinamicos, los que tienen : delante y no las palabras fijas en mi ruta
    /.*/, //Para aceptar cualquier nombre de parametros de ids en mis rutas(id, id_tag, id_post, etc)
    Joi.number().integer().positive().required()
  )
  .messages({
    "any.required": "El parámetro :id es obligatorio",
    "number.base": "El parámetro :id debe ser un número",
    "number.integer": "El parámetro :id debe ser entero",
    "number.positive": "El parámetro :id debe ser positivo"
  })

/*const idParamsSchema = Joi.object({
  id: Joi.number().integer().positive().required()
}).messages({
  "any.required": "El parámetro :id es obligatorio",
  "number.base": "El parámetro :id debe ser un número",
  "number.integer": "El parámetro :id debe ser entero",
  "number.positive": "El parámetro :id debe ser positivo"
}) */ 

// Middleware
const validarIdParams = (req, res, next) => {
  const { error } = idParamsSchema.validate(req.params)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

module.exports = {
    validarIdParams,
}