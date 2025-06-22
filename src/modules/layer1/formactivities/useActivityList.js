// src/hooks/useActivityList.js
import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useActivityList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // handleList dispara la llamada GET, opcionalmente con un ID
    const handleList = useCallback(
        (key) => {
        // URL para lista completa o para buscar por ID
        const url = key
            ? `${config[process.env.REACT_APP_ENV].API_URL_activity_list}/${key}`
            : config[process.env.REACT_APP_ENV].API_URL_activity_list;
        obtenerDatos("GET", url, {}, { findby: 0 });
        },
        [obtenerDatos]
    );

    // Cada vez que 'datos' cambie, transformamos datos.data
    useEffect(() => {
        if (
        datos &&
        typeof datos === "object" &&
        Array.isArray(datos.data)
        ) {
        const transformed = datos.data.map((item) => ({
            // Asignamos exactamente como viene el JSON
            id: item.id,                             // id de la actividad
            nombre: item.nombre,
            descripcion: item.descripcion,
            clave_presupuestal: item.clave_presupuestal,

                id_unidad_avance: item.unidadAvance?.id || item.unidad_avance?.id,
                nombre_unidad_avance: item.unidadAvance?.nombre || item.unidad_avance?.nombre,
                medicion: item.unidadAvance?.medicion || item.unidad_avance?.medicion,

                id_tipo_actividad: item.tipoActividad?.id || item.tipo_actividad?.id,
                nombre_tipo_actividad: item.tipoActividad?.nombre || item.tipo_actividad?.nombre
            }));

        console.log("Datos transformados:", transformed);
        setProcessedData({ body: transformed });
        } else {
        console.log("Datos no válidos o vacíos:", datos);
        setProcessedData({ body: [] });
        }
    }, [datos]);

    return { handleList, processedData, error, cargando };
};

export default useActivityList;
