import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useAreasByFarmList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    //La key es el ID de la finca
    const handleList = useCallback((id_finca) => {
        const url =`${config[process.env.REACT_APP_ENV].API_URL_area_list_by_farm}/${id_finca}` // Búsqueda por ID
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) { 
            const transformed = datos.data.map(item => ({
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
            }));

            setProcessedData({
                    body: transformed
                });
            } else {
                setProcessedData({ body: [] });
            }
        }, [datos]);
    
        return { handleList, processedData, error, cargando };
}

export default useAreasByFarmList;