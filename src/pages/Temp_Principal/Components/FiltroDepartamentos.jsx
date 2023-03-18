import { useState, useEffect } from "react";

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
				setDepartamento(departamento);
			});
	}, []);

    /* 
        Funcion para guardar el departamento que se selecciono
    */
    const handleDepartamentoSelect = (event) => {
        const departamentoElegido = event.target.value;
        onSelectDepartamentos(departamentoElegido)
        
      };
	return (
		<>
			<select onChange={handleDepartamentoSelect}>
				{departamentos.map((departamento) => (
                    <option value={departamento.id}>{departamento.nombre}</option>
				))}
			</select>
		</>
	);
};