import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers/BlogController.js";

const router = express.Router();

router.get("/obtenerBlogs", getAllBlogs);
router.get("/:id", getBlog);
router.post("/crearBlog", createBlog);
router.put("/:id", updateBlog);
router.post("/eliminarBlog", deleteBlog);

export default router;
