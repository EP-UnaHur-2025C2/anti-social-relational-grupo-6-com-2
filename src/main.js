const express = require ('express')
const db = require('./db/models') 
const routes = require('./routes/routes_index')
require('dotenv').config()
const app = express()


app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
    await db.sequelize.sync()
})
