import { useState, useEffect } from "react";

export const FiltroCategorias = ({onSelectCategoria}) => {
    /* 
        Código para obtener las categorias , se intento separar en un modulo distinto pero daba errores , momentaneamente asi se mantendra
    */
	const [categories, setCategories] = useState([]);
	const [categoriaAFiltrar, setCategoriaAFiltrar] = useState('');

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
			<select onChange={handleCategorySelect}>
				{categories.map((categoria) => (
                    <option value={categoria.nombre}>{categoria.nombre}</option>
				))}
			</select>
		</>
	);
};
