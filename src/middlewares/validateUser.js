const Joi = require('joi')
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; //Definimos nuestra expresion para validar la contrasenia
/*
^(?=.*[A-Z]): La contrasenia debe contener al menos una letra mayuscula
(?=.*\d): La contrasenia debe contener al menos un numero
.{8,}$: La contrasenia debe tener al menos 8 caracteres de largo.
*/ 
const nickNameSchema = Joi.object({
    nickName: Joi.string().required()
}).messages({
    "any.required": "El parametro :nickName es obligatorio",
    "string.base": "El parametro :nickName debe ser un string",
    "string.alphanum": "El nickName solo puede contener letras y numeros",
    "string.min": "El nickName debe tener al menos 4 caracteres",
    "string.max": "El nickName no puede superar los 30 caracteres"
})

// Validación para crear usuario
const crearUserSchema = Joi.object({
  nickName: Joi.string().alphanum().min(4).max(30).required(),
  nombre: Joi.string().min(2).max(50).trim().required(),
  email: Joi.string().email().required(),
  contrasenia: Joi.string()
    .pattern(passwordRegex)
    .required()
    .messages({
      "string.pattern.base": "La contraseña debe tener al menos 6 caracteres e incluir letras y números"
    })
})