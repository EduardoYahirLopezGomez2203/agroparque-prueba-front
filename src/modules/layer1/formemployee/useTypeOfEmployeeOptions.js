import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useTypeOfEmployeeOptions = () => {
    const { obtenerDatos, datos } = useServiceAuth();
    const [optionsE, setOptions] = useState([]);

    const typeEmployeeOptions = useCallback(() => {
        const url = config[process.env.REACT_APP_ENV].API_URL_type_of_employee_list;
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) {
            const types = datos.data.map(typeEmployee => ({
                id: typeEmployee.id,
                nombre: typeEmployee.nombre
            }));
            setOptions(types);
        }
    }, [datos]);

    return { typeEmployeeOptions, optionsE };
};

export default useTypeOfEmployeeOptions;