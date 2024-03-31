import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import instancia from "./api/axios";

import { insercion } from "./global/store";

export default function Registrar() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const { satisfactoria, setSatisfactoria } = insercion();

  const handleGuardarBlog = async () => {
    const datos = {
      titulo: titulo,
      contenido: contenido,
    };

    try {
      const response = await instancia.post("/crearBlog", datos); // Utiliza la URL relativa

      //console.log(response.data.message);
      if (response.data.message[1] == 1) {
        setSatisfactoria(1);
        setTitulo("");
        setContenido("");
        setTimeout(() => {
          setSatisfactoria(0);
        }, 500);
      } else {
        setSatisfactoria(0);
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };

  return (
    <div className="p-2 text-left">
      <h5>Registrar</h5>

      <div className="mt-4">
        <label htmlFor="titulo">Título</label>
        <br />
        <input
          type="text"
          className="bg-light border-0 rounded-2 p-1 px-2 w-100 mt-2 text-dark outline-none"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
          }}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="titulo">Contenido</label>
        <br />
        <input
          type="text"
          className="bg-light border-0 rounded-2 p-1 px-2 w-100 mt-2 text-dark outline-none"
          value={contenido}
          onChange={(e) => {
            setContenido(e.target.value);
          }}
        />
      </div>

      <button
        className="btn btn-info rounded-3 mt-3 text-light d-flex m-auto align-items-center"
        onClick={() => handleGuardarBlog()}
      >
        <FontAwesomeIcon icon={faSave} className="icons mx-2" />
        <p className="m-0">Guardar Blog</p>
      </button>
    </div>
  );
}
