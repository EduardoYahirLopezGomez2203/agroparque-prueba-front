import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useConfirmBudgetByWeekFarmArea = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Función unificada para listar y buscar
    const handleList = useCallback((week, farm, area) => {
        const url = config[process.env.REACT_APP_ENV].API_URL_activity_by_week_farm_area2+ `semana=${week}&finca=${farm}&area=${area}`;
        obtenerDatos('GET', url, {}, { "findby": 0 });
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
    if (datos && typeof datos === 'object' && datos.data) {
            const transformed = Array.isArray(datos.data) ? datos.data : [datos.data];
            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);

    return { handleList, processedData, error, cargando };
}

export default useConfirmBudgetByWeekFarmArea;