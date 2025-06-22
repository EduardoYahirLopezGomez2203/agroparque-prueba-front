import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useWeekLogList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    const handleList = useCallback((key) => {
        const url = key 
            ? `${config[process.env.REACT_APP_ENV].API_URL_catch_week_list}/${key}` // Búsqueda por ID
            : config[process.env.REACT_APP_ENV].API_URL_catch_week_list // Lista completa
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) { 
            const transformed = datos.data.map(item => ({
                ...item,  
                status: item.status.id,          
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

export default useWeekLogList;