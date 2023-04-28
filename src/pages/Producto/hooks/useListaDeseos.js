import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useListaDeseos() {
    const [seIncluye, setSeIncluye] = useState(false);
    const [favoritosDeUsuario, setFavoritosDeUsuario] = useState([]);

    useEffect(() => {
        const obtenerFavoritos = async () => {
            const { data } = await axios.get('http://localhost:3001/favoritos');
            setFavoritosDeUsuario(data)
        }
        obtenerFavoritos();
    }, []);

    return {
        seIncluye
    }
}