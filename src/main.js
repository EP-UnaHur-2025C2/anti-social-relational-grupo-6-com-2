//console.log("UnaHur - Anti-Social net");
const express = require ('express') 
const app = express()
const PORT = 3000 //Hacerla variable de entorno

const db = require('./db/models') 

const userRoutes = require('./routes/user_routes')

app.use(express.json());

//Rutas 
app.use('/users', userRoutes)

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
    //await db.sequelize.sync()
}) 
