import { useForm } from "react-hook-form";
export const Registro = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const enviarInfo = (data) => {
		console.log(data);
	};

	return (
		<>
			<h2>Crea tu cuenta de : </h2>
			<form onSubmit={handleSubmit(enviarInfo)}>
				<label>Nombre</label>
				<input type='text' {...register("nombre")} />

				<label>Apellido</label>
				<input type='text' {...register("apellido")} />

				<label>Correo</label>
				<input type='text' {...register("email")} />

				<label>Contraseña</label>
				<input type='text' {...register("password")} />

				<label htmlFor=''>Departamentos</label>
				<select {...register("departamento")}>
					<option value='Atlantida'>Atlántida</option>
					<option value='Choluteca'>Choluteca</option>
					<option value='Colon'>Colón</option>
					<option value='Comayagua'>Comayagua</option>
					<option value='Copan'>Copán</option>
					<option value='Cortes'>Cortés</option>
					<option value='El Paraiso'>El Paraíso</option>
					<option value='Francisco Morazan'>Francisco Morazán</option>
					<option value='Gracias a Dios'>Gracias a Dios</option>
					<option value='Intibuca'>Intibucá</option>
					<option value='Islas de la Bahia'>Islas de la Bahía</option>
					<option value='La Paz'>La Paz</option>
					<option value='Lempira'>Lempira</option>
					<option value='Ocotepeque'>Ocotepeque</option>
					<option value='Olancho'>Olancho</option>
					<option value='Santa Barbara'>Santa Bárbara</option>
					<option value='Valle'>Valle</option>
					<option value='Yoro'>Yoro</option>
				</select>

				<button>Enviar</button>
			</form>
		</>
	);
};
