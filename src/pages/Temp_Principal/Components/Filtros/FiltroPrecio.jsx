import { useState } from "react";
import { useForm } from "react-hook-form";
export const FiltroPrecio = ({preciosMaxMinSeleccionados}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

    const [precioMinimo, setPrecioMinimo] = useState(0)
    const [precioMaximo, setPrecioMaximo] = useState(0)

    const handlePrecioMinYMax = (min,max)=>{
    	preciosMaxMinSeleccionados(min,max)
    }


	const enviarPrecios = (data) => {
        /* Refactorizar, funcion hace mas de una cosa a la vez. */
        const{ precioMin , precioMax } = data
        const precioMinimo = parseFloat(precioMin)
        const precioMaximo = parseFloat(precioMax)
        setPrecioMinimo(precioMinimo)
        setPrecioMaximo(precioMaximo)
        handlePrecioMinYMax(precioMinimo,precioMaximo)		//reset();
    };

	return (
		<>
			<form onSubmit={handleSubmit(enviarPrecios)}>
				<label htmlFor='' className="labelPrecio">Precio Mínimo:</label>
				<input
				className="inPrecio"
					type='text'
					{...register("precioMin", {
						pattern:/^[\d,\.]+$/,
						required:true
					})}
				/>
				{errors.precioMin?.type==="pattern" && (
					<p>Ingresa solo números en formato XX.XX</p>
				)}
				{errors.precioMin?.type==="required" && (
					<p>El precio mínimo es obligatorio</p>
				)}
				<label htmlFor='' className="labelPrecio">Precio Máximo:</label>
				<input
				className="inPrecio"
					type='text'
					{...register("precioMax",{
						pattern:/^[\d,\.]+$/,
						required:true
					})}
				/>
					{errors.precioMax?.type==="pattern" && (
					<p>Ingresa solo números en formato XX.XX</p>
				)}
				{errors.precioMax?.type==="required" && (
					<p>El precio máximo es obligatorio</p>
				)}
				<button
				type="submit"
                    className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}
                    >
                      <span className="box">Filtrar</span>
                    </button>
			</form>
		</>
	);
};
