import { useForm } from "react-hook-form";
import { iniciarSesion } from "../../../api";
export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const enviarDatosLogin = async (userData) => {
		console.log(userData);
        try {
            const response = await iniciarSesion(userData)
        } catch (error) {
            console.log(error);
        }
	};

	return (
		<form onSubmit={handleSubmit(enviarDatosLogin)}>
			<input type='text' placeholder='Ingrese su correo' {...register('correo')} />
			<input type='password' placeholder='Ingrese su contraseña ' {...register('password')} />
			<button>Enviar</button>
		</form>
	);
};
