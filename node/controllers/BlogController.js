import db from "../database/db.js";
import { Sequelize } from "sequelize"; // Agregar esta línea

//**  METODOS PARA EL CRUD **//

// Mostrar todos los registros
export const getAllBlogs = async (req, res) => {
  try {
    // Consulta cruda para obtener todos los blogs
    const blogs = await db.query("SELECT * FROM blogs", {
      type: Sequelize.QueryTypes.SELECT,
    }); // Usar Sequelize en lugar de sequelize

    res.json(blogs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getBlog = async (req, res) => {
  try {
    // ID proporcionado por el cliente
    const { id } = req.params;

    // Consulta preparada para obtener un blog por ID
    const query = "SELECT * FROM blogs WHERE id = ?";
    const blog = await db.query(query, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: [id], // Reemplazar el marcador de posición "?" con el valor del ID
    });

    res.json(blog);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Crear un registro
export const createBlog = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;

    // Consulta preparada para insertar un nuevo blog
    const query = "INSERT INTO blogs (titulo, contenido) VALUES (?, ?)";
    const insercion = await db.query(query, {
      replacements: [titulo, contenido], // Reemplazar los marcadores de posición "?" con los valores de title y content
    });

    res.json({
      message: insercion,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
export const updateBlog = async (req, res) => {
  try {
    // ID proporcionado por el cliente
    const { id } = req.params;
    const { titulo, contenido } = req.body;

    // Consulta
    const query =
      "UPDATE blogs SET titulo = ?, contenido = ? WHERE blogs.id = ?;";
    await db.query(query, {
      replacements: [titulo, contenido, id],
    });

    res.json({
      message: "¡Registro ACTUALIZADO correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Eliminar un registro
export const deleteBlog = async (req, res) => {
  try {
    // Obtener el id
    const {id} = req.body;

    const query = "DELETE FROM blogs WHERE id = ?";

    const response = await db.query(query, {
      replacements: [id],
    });

    res.json({
      message: response,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
