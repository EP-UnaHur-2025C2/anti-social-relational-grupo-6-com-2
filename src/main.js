const express = require ('express')
const app = express()
const PORT = 3000 //Hacerla variable de entorno
const db = require('./db/models') 
const routes = require('./routes/routes_index')

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, async () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
    await db.sequelize.sync()
}) 
