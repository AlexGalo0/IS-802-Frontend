import React from "react";
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(enviarPalabrasClave)}>
      <label htmlFor="" className="labelPrecio">
        Palabra clave:
      </label>
      <input type="text" {...register("keyword",{
        required:true
      })} className="inPrecio" />
      {errors.keyword?.type==="required" && (
					<p>Ingresa la palabra clave</p>
				)}
      <button
        type="submit"
        className="buttonProducto"
        style={{ color: "#f7f7f7", fontSize: "medium", margin: "auto" }}
      >
        <span className="box">Filtrar</span>
      </button>
    </form>
  );
};
