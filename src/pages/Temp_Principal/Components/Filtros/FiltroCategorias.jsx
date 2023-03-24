import { useState, useEffect } from "react";
import '../../Style/Temp_Principal.css';
import { v4 as uuidv4 } from 'uuid';
export const FiltroCategorias = ({onSelectCategoria}) => {

	const [categories, setCategories] = useState([]);

	const URL = `http://localhost:4000/categories`;
	useEffect(() => {
		fetch(URL)
			.then((response) => response.json())
			.then((category) => {
				setCategories(category);
			});
	}, []);

    /* 
        Funcion para guardar la categoria que se selecciono
    */
    const handleCategorySelect = (event) => {
        const categoriaElegida = event.target.value;
        onSelectCategoria(categoriaElegida)
        
    };
	return (
		<>
			<select onChange={handleCategorySelect} className= "select">
				<option value="" hidden>Seleccione una categoría</option>
				{categories.map((categoria) => (
                    <option value={categoria.nombre}  >{categoria.nombre}</option>
				))}
			</select>
		</>
	);
};
