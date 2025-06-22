import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const usePastBudgetList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Función unificada para listar y buscar
    const handleList = useCallback(() => {
       const url = `${config[process.env.REACT_APP_ENV].API_URL_budget_list}`
            obtenerDatos('GET', url, {}, {"findby": 0});
        }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) { 
            const transformed = datos.data.map(item => ({
                presupuesto: {
                    id_presupuesto: item.id_presupuesto,
                    presupuesto: item.presupuesto ? item.presupuesto : "En desarrollo"
                },
                semana: {
                    id_semana: item.semana.id,
                    numero_semana: item.semana?.numero_semana,
                },
                status: {
                    id_status: item.status.id,
                    nombre_status: item.status?.nombre,
                },
                finca: {
                    id_finca: item.detalle_finca.finca.id,
                    nombre_finca: item.detalle_finca?.finca.nombre
                },
                empresa: {
                    id_empresa: item.detalle_finca.finca.empresa.id,
                    nombre_empresa: item.detalle_finca?.finca.empresa.nombre
                },
                area: {
                    id_area: item.detalle_finca?.area?.id,
                    nombre_area: item.detalle_finca?.area?.nombre
                },
            }));
            console.log("Datos transformados:", transformed);
            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);
    
        return { handleList, processedData, error, cargando };
}

export default usePastBudgetList;