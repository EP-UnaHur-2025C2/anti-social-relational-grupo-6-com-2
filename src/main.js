//console.log("UnaHur - Anti-Social net");
const db = require('./db/models')
const express = require ('express')  
const app = express()
const PORT = 3000 //Hacerla variable de entorno
const userRoutes = require('./routes/user_routes')

//Rutas
app.use('/users', userRoutes)

app.listen(PORT, () => {
    console.log('El servidor esta corriendo en el puerto ${PORT}')
    //Si no funciona probar  console.log('El servidor esta corriendo en el puerto ' + PORT)
    //await db.sequelize.sync()
}) 
