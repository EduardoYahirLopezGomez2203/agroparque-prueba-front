import { useState, useEffect, useCallback, use } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useManagerActivityCreate = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [created, setCreated] = useState(false);

    const createActivities = useCallback(async (idFinca, idArea, activitiesArray) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_details_activity_create;
        const url = baseUrl
        .replace('?', idFinca)
        .replace('?', idArea);
        console.log("Crear Detalle Actividad POST", url, activitiesArray);
        console.log("→ POST a:", url);
        console.log("→ Payload actividades:", activitiesArray);
        await obtenerDatos("POST", url, activitiesArray);
    }, [obtenerDatos]);

    useEffect(() => {
        if (datos?.status === "success") {
            console.log("Actividades guardadas:", datos);
            setCreated(true);
        }
    }, [datos]);
    
    return { createActivities, created, error, cargando };
}

export default useManagerActivityCreate;
