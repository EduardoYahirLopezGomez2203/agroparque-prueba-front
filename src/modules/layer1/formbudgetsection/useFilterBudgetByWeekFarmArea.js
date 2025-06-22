import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFilterBudgetByWeekFarmArea = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Función unificada para listar y buscar
    const handleList = useCallback((week, farm, area) => {
        const url = config[process.env.REACT_APP_ENV]
            .API_URL_budget_detail_by_week_farm_area
            .replace("?", week)
            .replace("?", farm)
            .replace("?", area)
        obtenerDatos('GET', url, {}, { "findby": 0 });
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) {
            /* 
                id_presupuesto 
                semana
                status
                limite
                presupuesto
            */
            const transformed = datos.data.map(item => item);

            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);

    return { handleList, processedData, error, cargando };
}

export default useFilterBudgetByWeekFarmArea;