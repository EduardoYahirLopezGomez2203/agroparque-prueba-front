import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFarmOptions = () => {
    const { obtenerDatos, datos } = useServiceAuth();
    const [optionsF, setOptions] = useState([]);

    const farmOptions = useCallback(() => {
        const url = config[process.env.REACT_APP_ENV].API_URL_farm_list;
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) {
            const types = datos.data.map(farm => ({
                id: farm.id,
                nombre: farm.nombre
            }));
            setOptions(types);
        }
    }, [datos]);

    return { farmOptions, optionsF };
    
};

export default useFarmOptions;