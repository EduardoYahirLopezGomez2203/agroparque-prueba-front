import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useCompanyOptions = () => {
    const { obtenerDatos, datos } = useServiceAuth();
    const [options, setOptions] = useState([]);

    const obtenerOpciones = useCallback(() => {
        const url = config[process.env.REACT_APP_ENV].API_URL_company_list;
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) {
            const companies = datos.data.map(item => ({
                value: item.id_empresa,
                label: item.nombre
            }));
            setOptions(companies);
        }
    }, [datos]);

    return { obtenerOpciones, options };
};

export default useCompanyOptions;