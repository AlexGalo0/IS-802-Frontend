import { useState } from "react";
import { useForm } from "react-hook-form";
export const FiltroPrecio = ({preciosMaxMinSeleccionados}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
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
        handlePrecioMinYMax(precioMinimo,precioMaximo)
    };

	return (
		<>
			<form onSubmit={handleSubmit(enviarPrecios)}>
				<label htmlFor='' className="labelPrecio">Precio Minimo</label>
				<input
				className="inPrecio"
					type='number'
					{...register("precioMin")}
				/>
				<label htmlFor='' className="labelPrecio">Precio Maximo</label>
				<input
				className="inPrecio"
					type='number'
					{...register("precioMax")}
				/>
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
