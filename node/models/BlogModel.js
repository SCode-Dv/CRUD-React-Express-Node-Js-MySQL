// Importar la conexion de la base de datos
import db from "../database/db.js";

// Importamos sequelize
import { DataTypes } from "sequelize";

const BlogModel = db.define("blogs", {
  titulo: { type: DataTypes.STRING },
  contenido: { type: DataTypes.STRING },
});

export default BlogModel;
