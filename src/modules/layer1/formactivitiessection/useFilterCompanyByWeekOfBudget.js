import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFilterCompanyByWeekOfBudget = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    const handleList = useCallback((key) => {
        const url = config[process.env.REACT_APP_ENV]
            .API_URL_company_by_week_of_budget_list
            .replace("?", key)
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) { 
            const transformed = datos.data.map(item => ({
                id: item.id,
                nombre: item.nombre,   
                direccion: item.direccion,            
                razon_social: item.razon_social,   
                rfc: item.rfc,                             
                email: item.email,                
                celular: item.celular
            }));
    
            setProcessedData({
                body: transformed
            });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);

    return { handleList, processedData, error, cargando };
};

export default useFilterCompanyByWeekOfBudget;