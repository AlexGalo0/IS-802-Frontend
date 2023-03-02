import { useForm } from "react-hook-form";
export const RegistroProducto = () => {
	/* 
    
        nombre,descripcion,cantidad,limite_dias,dptoVenta,idCategoria
    
    */
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	return (
		<>
			<div>
				<label htmlFor=''>Nombre</label>
				<input type='text' {...register("nombre")} />

				<label htmlFor=''>Descripcion</label>
				<input type='text' {...register("descripcion")} />

				<label htmlFor=''>Cantidad del Producto</label>
				<input
					type='number'
					min='1'
					pattern='^[0-9]+'
					{...register("cantidad")}
				/>

				<label htmlFor=''>Limite de Dias</label>
				<input type='text' {...register("limite_dias")} />

				<label htmlFor=''>Departamento de Venta: </label>
				<select {...register("dptoVenta")}>
					<option placeholder='Seleccione un departamento'></option>
					<option value='1'>Atlántida</option>
					<option value='2'>Colón</option>
					<option value='3'>Comayagua</option>
					<option value='4'>Copán</option>
					<option value='5'>Cortés</option>
					<option value='6'>Choluteca</option>
					<option value='7'>El Paraíso</option>
					<option value='8'>Francisco Morazán</option>
					<option value='9'>Gracias a Dios</option>
					<option value='10'>Intibucá</option>
					<option value='11'>Islas de la Bahía</option>
					<option value='12'>La Paz</option>
					<option value='13'>Lempira</option>
					<option value='14'>Ocotepeque</option>
					<option value='15'>Olancho</option>
					<option value='16'>Santa Bárbara</option>
					<option value='17'>Valle</option>
					<option value='18'>Yoro</option>
				</select>

				<label htmlFor=''>Categoria: </label>
				<select {...register("idCategoria")}>
					<option placeholder='Seleccione una Categoria'></option>
					<option value='Inmuebles'>Inmuebles</option>
					<option value='Vehículos'>Vehículos</option>
					<option value='Hogar'>Hogar</option>
					<option value='Futuros padres'>Futuros Paders</option>
					<option value='Mascotas'>Mascotas</option>
					<option value='Electrónica'>Electrónica</option>
					<option value='Servicios'>Servicios</option>
					<option value='Negocios'>Negocios</option>
					<option value='Empleos'>Empleos</option>
				</select>
			</div>
		</>
	);
};
