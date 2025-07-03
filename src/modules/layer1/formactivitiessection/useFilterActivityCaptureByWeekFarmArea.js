import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFilterActivityCaptureByWeekFarmArea = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Función unificada para listar y buscar
    const handleList = useCallback((week, farm, area) => {
        const url = config[process.env.REACT_APP_ENV]
            .API_URL_capture_activity_by_week_farm_area_list
            .replace("?", week)
            .replace("?", farm)
            .replace("?", area)
        obtenerDatos('GET', url, {}, { "findby": 0 });
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) {
            /* 
                cns_actividad_trabajador
                id_presupuesto
                cns_detalle_presupuesto
                avance
                fecha
                trabajador: {
                    id,
                    nombre,
                    apellido_paterno,
                    apellido_materno
                },
                actividad: {
                    id,
                    nombre,
                    descripcion
                }
            */
            const transformed = datos.data.map(item => item);

            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);

    return { handleList, processedData, error, cargando };
}

export default useFilterActivityCaptureByWeekFarmArea;