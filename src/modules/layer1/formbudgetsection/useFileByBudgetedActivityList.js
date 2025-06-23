import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFileByBudgetedActivityList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Función unificada para listar y buscar
    const handleList = useCallback((id_presupuesto, cns_detalle_presupuesto) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_archive_by_activity
        const url = baseUrl + `/${id_presupuesto}/detalle/${cns_detalle_presupuesto}/list`
        obtenerDatos('GET', url, {}, { "findby": 0 });
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && typeof datos.data === 'object') {
            const transformed = [{
                documento: datos.data.documento || ""
            }];
            console.log("datos atrapados de la url: ", transformed);
            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);

    return { handleList, processedData, error, cargando };
}

export default useFileByBudgetedActivityList;