import { useState, useEffect } from "react";
import "../Style/Temp_Principal.css";

export const FiltroDepartamento = ({onSelectDepartamentos}) => {
  
	const [departamentos, setDepartamentos] = useState([]);
    /* 
        URL a probar
    */

	const URL = `http://localhost:4000/departamentos`;
	useEffect(() => {
		fetch(URL)
			.then((response) => response.json())
			.then((departamento) => {
				setDepartamentos(departamento);
			});
	}, []);

    /* 
        Funcion para guardar el departamento que se selecciono
    */
    const handleDepartamentoSelect = (event) => {
        const idDepartamentoElegido = event.target.value;
        onSelectDepartamentos(idDepartamentoElegido)
        
      };
	return (
		<>
			<select onChange={handleDepartamentoSelect} className= "select">
			<option value="" hidden>Seleccione un departamento</option>
				{departamentos.map((departamento) => (
                    <option value={departamento.id_dpto}>{departamento.nombre}</option>
				))}
			</select>
		</>
	);
};