import express from "express";
import cors from "cors";
// importar bade de datos
import db from "./database/db.js";
// importamos nuestro enrutador
import blogRoutes from "./routes/routes.js";

const app = express ()

// Configurar los cors
app.use( cors() )

// Configurar
app.use(express.json())
// Configurar el dominio presente
app.use('/blogs', blogRoutes)
// Generar la conexion con la base de datos
try {
    await db.authenticate()
    console.log("Conexion existosa a la base de datos");
} catch (error) {
    console.log(`Error de conexion es: ${error}`);
}

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
})