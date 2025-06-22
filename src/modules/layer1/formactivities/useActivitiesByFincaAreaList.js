import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useActivitiesByFincaAreaList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    const handleList = useCallback((id_finca, id_area) => {
        const url = config[process.env.REACT_APP_ENV]
            .API_URL_activity_list_by_finca_area
            .replace("?", id_finca)
            .replace("?", id_area)
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) { 
            const transformed = datos.data.map(item => ({
                id: String(crypto.randomUUID()),
                id_actividad: item.actividad.id,
                cns_detalle_actividad: item.id,
                nombre_actividad: item.actividad.nombre,
                precio: item.precio,
                unidad: item.actividad.unidad_avance.medicion,
                id_finca: item.detalle_finca.finca.id,
                cns_detalle_finca: item.detalle_finca.cns_detalle_finca
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

export default useActivitiesByFincaAreaList;
