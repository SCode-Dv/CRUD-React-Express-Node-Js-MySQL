import React, { useEffect, useState } from "react";
import iconReact from "./assets/img/react-img.png";
import Express from "./assets/img/express.png";
import Node from "./assets/img/node.png";
import MySQL from "./assets/img/mysql.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";

import Registrar from "./Registrar";

import instancia from "./api/axios";

import { insercion } from "./global/store";

import Modificar from "./Modificar";

export default function App() {
  const [blogs, setBlogs] = useState([]);

  const { satisfactoria } = insercion();

  const [show, setShow] = useState(false);

  const [idBlog, setIdBlog] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ObtenerBlogs = async () => {
    try {
      const response = await instancia.get("/obtenerBlogs"); // Utiliza la URL relativa

      //console.log(response.data);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };

  useEffect(() => {
    ObtenerBlogs();
  }, []);

  useEffect(() => {
    if (satisfactoria == 1) {
      ObtenerBlogs();
    }
  }, [satisfactoria]);

  const handleEliminarBlog = async (id) => {
    try {
      const datos = {
        id: id,
      };

      const response = await instancia.post("/eliminarBlog", datos); // Utiliza la URL relativa

      //console.log(response.data);
      ObtenerBlogs();
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };

  return (
    <div className="w-100 text-center pt-4">
      <h1>CRUD FULLSTACK</h1>

      <div className="pt-5 pb-3 d-flex px-5 justify-content-center align-items-center">
        <div className="react d-flex px-3 align-items-center">
          <img src={iconReact} width={70} />
          <h5>React</h5>
        </div>

        <div className="express d-flex px-3 align-items-center">
          <img src={Express} width={80} />
          <h5>Express</h5>
        </div>

        <div className="node d-flex px-3 align-items-center">
          <img src={Node} width={40} />
          <h5>Node JS</h5>
        </div>

        <div className="mysql d-flex px-3 align-items-center">
          <img src={MySQL} width={40} />
          <h5>MySQL</h5>
        </div>
      </div>

      <div className="w-100 d-flex px-5">
        <div className="col-md-4 bg-table rounded-3 px-2">
          <Registrar />
        </div>

        <div className="col-md-8 p-2">
          <table className="w-100 bg-table rounded-3 border-1 px-2">
            <thead>
              <tr>
                <th>No.</th>
                <th>Título</th>
                <th>Contenido</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {blogs != "" && blogs != null && blogs != undefined
                ? blogs.map((blog, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{blog.titulo}</td>
                      <td>{blog.contenido}</td>
                      <td>
                        <button
                          className="btn btn-info outline-none text-light"
                          onClick={() => {
                            setIdBlog(blog.id);
                            handleShow();
                          }}
                        >
                          <FontAwesomeIcon icon={faPencil} />
                        </button>

                        <button
                          className="btn btn-danger outline-none"
                          onClick={() => {
                            handleEliminarBlog(blog.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faX} />
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>

      <Modificar show={show} handleClose={handleClose} idBlog={idBlog} />
    </div>
  );
}
