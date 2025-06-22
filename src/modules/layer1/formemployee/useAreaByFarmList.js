import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useAreaByFarmList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [areas, setAreas] = useState([]);

    const handleList = useCallback(
        ({ id_finca } = {}) => {
        setAreas([]);
        if (!id_finca) return;
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_find_area_by_farm;  
        const url = baseUrl.replace("?", id_finca);
        obtenerDatos("GET", url);
        },
        [obtenerDatos]
    );
    useEffect(() => {
        if (error) {
        console.error("Error cargando áreas:", error);
        setAreas([]);
        } else if (Array.isArray(datos?.data)) {
            setAreas(datos.data.map(a => ({ id: a.id, nombre: a.nombre })));
        }
    }, [datos, error]);

    return { handleList, areas, cargando };
};

export default useAreaByFarmList;