const Joi = require('joi')

// Validar el parámetro :id
const idParamsSchema = Joi.object({
  id: Joi.number().integer().positive().required()
}).messages({
  "any.required": "El parámetro :id es obligatorio",
  "number.base": "El parámetro :id debe ser un número",
  "number.integer": "El parámetro :id debe ser entero",
  "number.positive": "El parámetro :id debe ser positivo"
})  

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