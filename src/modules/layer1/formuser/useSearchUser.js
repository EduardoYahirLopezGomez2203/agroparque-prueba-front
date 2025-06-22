import { useState, useEffect } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useUserList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [usuarios, setUsuarios] = useState([]);

    const buscarUsuarios = async (termino = "") => {
        try {
            let url = config[process.env.REACT_APP_ENV].API_URL_user_list;
            
            // Si el término es numérico, busca por ID, sino por texto
            if (termino) {
                url += isNaN(termino) ? `?search=${termino}` : `/${termino}`;
            }
            
            await obtenerDatos('GET', url);
        } catch (err) {
            console.error("Error buscando usuarios:", err);
        }
    };

    useEffect(() => {
        if (datos?.data) {
            // Normalizar datos (convierte objeto único en array)
            const datosNormalizados = Array.isArray(datos.data) 
                ? datos.data 
                : [datos.data];
            
            setUsuarios(datosNormalizados.map(user => ({
                name: `${user.nombre} ${user.ap_paterno} ${user.ap_materno}`,
                email: user.email,
                phone: user.celular,
                login: user.login,
                profile: user.perfil?.nombre || "Sin perfil"
            })));
        }
    }, [datos]);

    return { buscarUsuarios, usuarios, error, cargando };
};

export default useUserList;