const Joi = require('joi')
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; //Definimos nuestra expresion para validar la contrasenia
/*
^(?=.*[A-Z]): La contrasenia debe contener al menos una letra mayuscula
(?=.*\d): La contrasenia debe contener al menos un numero
.{8,}$: La contrasenia debe tener al menos 8 caracteres de largo.
*/ 

// Validación del parámetro :nickName
const nickNameParamsSchema = Joi.object({   
    nickName: Joi.string().alphanum().min(2).max(30).required()
}).messages({
    "any.required": "El parametro :nickName es obligatorio",
    "string.base": "El parametro :nickName debe ser un string",
    "string.alphanum": "El nickName solo puede contener letras y numeros",
    "string.min": "El nickName debe tener al menos 2 caracteres",
    "string.max": "El nickName no puede superar los 30 caracteres"
})

// Validacion para crear usuario
const crearUserSchema = Joi.object({
  nickName: Joi.string().alphanum().min(2).max(30).required(),
  nombre: Joi.string().min(2).max(50).trim().required(),
  email: Joi.string().email().required(),
  contrasenia: Joi.string()
    .pattern(passwordRegex)
    .required()
    .messages({
      "string.pattern.base": "La contrasenia debe tener al menos: 8 caracteres, 1 letra mayuscula y 1 numero"
    })
})

// Middleware para validar nickName (param)
const validarNickNameParams = (req, res, next) => {
  const { error } = nickNameParamsSchema.validate(req.params)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

// Middleware para validar creacion (body)
const validarCrearUser = (req, res, next) => {
  const { error, value } = crearUserSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  req.body = value
  next()
}

module.exports = {
    validarNickNameParams,
    validarCrearUser
}