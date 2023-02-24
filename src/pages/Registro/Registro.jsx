import "bootstrap/dist/css/bootstrap.min.css";
import {
	Button,
	Container,
	Form,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import "./style.css";
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
			<header className='App-header'>
				<h2 style={{ color: "#59362E" }}>Crea tu cuenta de : </h2>

				<Form
					style={{
						justifyContent: "space-between",
						background: "#F2E8DF",
						width: "600px",
						height: "850px",
						margin: "15px auto",
						padding: "40px",
						boxShadow: "3px 3px 3px 3px rgba(32,32,32,0.3)",
					}}
					onSubmit={handleSubmit(enviarInfo)}
				>
					<Form.Group
						className='mb-3'
						controlId='formBasicNombre'
						style={{ color: "#3D403A" }}
					>
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							style={{
								background:
									"#888c81" /* Falta cambiar el color al placeholder */,
							}}
							type='text'
							placeholder='Ingrese su nombre'
              {...register("nombre")}
            />
					</Form.Group>

					<Form.Group
						className='mb-3'
						controlId='formBasicApellido'
						style={{ color: "#3D403A" }}
					>
						<Form.Label>Apellido</Form.Label>
						<Form.Control
							style={{
								background:
									"#888c81" /* Falta cambiar el color al placeholder */,
							}}
							type='text'
							placeholder='Ingrese su apellido'
              {...register("apellido")} 
						/>
					</Form.Group>

					<Form.Group
						className='mb-3'
						controlId='formBasicEmail'
						style={{ color: "#3D403A" }}
					>
						<Form.Label>Correo</Form.Label>
						<Form.Control
							style={{
								background:
									"#888c81" /* Falta cambiar el color al placeholder */,
							}}
							type='email'
							placeholder='Ingrese su correo electronico'
						/>
						<Form.Text className='text-muted' style={{ color: "#3D403A" }}>
							Nunca compartiremos tu correo electronico.
						</Form.Text>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label style={{ color: "#3D403A" }}>Contrasenia</Form.Label>
						<Form.Control
							style={{ background: "#888c81" }}
							type='password'
							placeholder='Ingrese su contrasenia'
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label style={{ color: "#3D403A" }}>
							Confirmar ontrasenia
						</Form.Label>
						<Form.Control
							style={{ background: "#888c81" }}
							type='password'
							placeholder='Ingrese su contrasenia'
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicCheckbox'>
						<Form.Check
							style={{ justifyContent: "space-between", color: "#3D403A" }}
							type='checkbox'
							label='Echa un vistazo a los terminos y condiciones'
						/>
					</Form.Group>
					<Button
						variant='primary'
						type='submit'
						style={{
							background: "#A67356",
							border: "#F2E8DF",
							boxShadow: "5px 5px 1px 1px rgba(32,32,32,0.3)",
						}}
					>
						Enviar
					</Button>
				</Form>
			</header>
		</>
	);
};
