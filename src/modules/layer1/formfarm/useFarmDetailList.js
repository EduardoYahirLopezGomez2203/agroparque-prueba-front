import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFarmDetailList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Función unificada para listar y buscar
    const handleList = useCallback( async (key = '') => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_farm_detail_list;
        // Reemplaza el ? por el id de la finca, o elimina /?/ si no hay id
        const url = key
            ? baseUrl.replace('?', key)
            : baseUrl.replace('/?/', '/');
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data) && datos.data.length > 0) { 
            const transformed = datos.data.map(item => ({
                id: item.id,
                finca: {
                    id: item.finca.id,
                    nombre: item.finca.nombre,
                    empresa: {
                        id: item.finca.empresa.id,
                        nombre: item.finca.empresa.nombre
                    }
                },
                area: {
                    id: item.area.id,
                    nombre: item.area.nombre,
                    descripcion: item.area.descripcion
                },
                jefe_area: {
                    id: item.jefe_area?.id,
                    nombre: item.jefe_area?.nombre,
                }
            }));

            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);
    
    return { handleList, processedData, error, cargando };
}

export default useFarmDetailList;