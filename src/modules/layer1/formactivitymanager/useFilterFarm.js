import { useState, useCallback, useEffect } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFilterFarm = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [detalleFincaId, setDetalleFincaId] = useState(null);

    const fetchDetalle = useCallback((idFinca, idArea) => {
        const base = config[process.env.REACT_APP_ENV].API_URL_filter_management_activity;
        const url  = base.replace("?", idFinca).replace("?", idArea);
        console.log("🔗 GET", url);
        obtenerDatos("GET", url);
    }, [obtenerDatos]);

    useEffect(() => {
        if (datos?.status === "success" && datos.data?.cns_detalle_finca != null) {
            setDetalleFincaId(datos.data.cns_detalle_finca);
        }
    }, [datos]);

    return { fetchDetalle, detalleFincaId, cargando, error };
}

export default useFilterFarm;