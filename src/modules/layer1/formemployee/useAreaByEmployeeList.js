import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useAreaByEmployeeList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [areasEmpleado, setAreasEmpleado] = useState([]);

    const handleList = useCallback(
        ({ idEmpleado } = {}) => {
        setAreasEmpleado([]);
        if (!idEmpleado) return;
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_find_areas_by_manager;
        const url = baseUrl.replace("?", idEmpleado);
        obtenerDatos("GET", url);
        },
        [obtenerDatos]
    );

    useEffect(() => {
        if (error) {
        console.error("Error cargando áreas del empleado:", error);
        setAreasEmpleado([]);
        } else if (Array.isArray(datos?.data)) {
        setAreasEmpleado(
            datos.data.map((item) => ({
            id: item.area.id,
            nombre: item.area.nombre
            }))
        );
        }
    }, [datos, error]);

    return { handleList, areasEmpleado, cargando };
};

export default useAreaByEmployeeList;
