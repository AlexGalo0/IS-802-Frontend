import React from "react";

export const Registro = () => {
	return (
		<>
			<h2>Crea tu cuenta de : </h2>
			<form>
				<label>Nombre</label>
				<input type='text' />

				<label>Apellido</label>
				<input type='text' />

				<label>Correo</label>
				<input type='text' />

				<label>Contraseña</label>
				<input type='text' />

				<label>Repite la contraseña</label>
				<input type='text' />

				<button>Enviar</button>
			</form>
		</>
	);
};
