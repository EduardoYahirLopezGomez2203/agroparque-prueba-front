import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useCompanyList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    const handleList = useCallback((key) => {
        const url = key 
            ? `${config[process.env.REACT_APP_ENV].API_URL_company_list}/${key}` // Búsqueda por ID
            : config[process.env.REACT_APP_ENV].API_URL_company_list; // Lista completa
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
    
            console.log("Datos transformados:", transformed);
    
            setProcessedData({
                body: transformed
            });
        } else {
            console.log("Datos no válidos o vacíos:", datos);
            setProcessedData({ body: [] });
        }
    }, [datos]);

    return { handleList, processedData, error, cargando };
};

export default useCompanyList;