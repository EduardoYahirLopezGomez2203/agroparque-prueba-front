import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useModulelist = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    const handleList = useCallback((key = '') => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_module_list;
        const url = key ? `${baseUrl}/${key}` : baseUrl;
        
        obtenerDatos('GET', url, {}, {"findby": 0}); // Eliminar "findby" si el backend no lo requiere
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) { 
            const transformed = datos.data.map(item => ({
                id: item.id,
                nombre: item.nombre, 
                descripcion: item.descripcion 
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
}

export default useModulelist;