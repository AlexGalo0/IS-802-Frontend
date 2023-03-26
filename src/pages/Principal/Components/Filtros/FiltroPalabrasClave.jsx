import React from "react";
import { useForm } from "react-hook-form";
import { BiSearchAlt, BiUser } from "react-icons/bi"; 

export const FiltroPalabrasClave = ({ manejadorPalabraClave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const enviarPalabrasClave = (data) => {
    manejadorPalabraClave(data.keyword);
  };
  return (
    <form className="palabrasClave" onSubmit={handleSubmit(enviarPalabrasClave)}>

      <input className="buscador" type="text" {...register("keyword",{
        required:true
      })} />
      {/* {errors.keyword?.type==="required" && (
					<p>Ingresa la palabra clave</p>
				)} */}
      <button
        type="submit"
        className="btnBuscar"
        /* style={{ color: "#f7f7f7", fontSize: "medium", margin: "auto" }} */
      >
        <BiSearchAlt className="iconBuscar" />
        <span className="textBuscar">Buscar</span>
      </button>

          {/* <Form.Control className="buscador" type="text"  />
          <button className="btnBuscar">
            <BiSearchAlt className="iconBuscar" />
            <span className="textBuscar">Buscar</span>
          </button> */}

    </form>
  );
};
