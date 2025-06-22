import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useBudgetPerMonthList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Función unificada para listar y buscar
    const handleList = useCallback((id_mes, id_area, id_finca) => {
       const baseUrl = config[process.env.REACT_APP_ENV].API_URL_past_budget_by_month_area_finca;
       const url = `${baseUrl}mes=${id_mes}&id_area=${id_area}&id_finca=${id_finca}`;
            obtenerDatos('GET', url, {}, {"findby": 0});
        }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) { 
            const transformed = datos.data.map(item => ({
                id: String(crypto.randomUUID()),
                id_presupuesto: String(item.id_presupuesto),
                id_semana: String(item.semana.id),
                numero_semana: String(item.semana.numero_semana),
                presupuesto: item.presupuesto ? String(item.presupuesto) : "En desarrollo",
                id_status: item.id
            }));
            console.log("Datos transformados:", transformed);
            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);
        return { handleList, processedData, error, cargando };
}

export default useBudgetPerMonthList;