import { useState, useEffect } from "react";

export const FiltroFecha = ({ onSelectFecha }) => {
	const seleccionFecha = (event) => {
		const fechaSeleccionada = event.target.value;
		onSelectFecha(fechaSeleccionada);
	};

	return (
		<select onChange={seleccionFecha} className='select'>
			<option value='' hidden>
				Selecciona una fecha
			</option>
			<option value='last7days'>Últimos 7 Días</option>
			<option value='last15days'>Últimos 15 Días</option>
			<option value='last20days'>Últimos 20 Días</option>
			<option value='last30days'>Últimos 30 Días</option>
		</select>
	);
};
