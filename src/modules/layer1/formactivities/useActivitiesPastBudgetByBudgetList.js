import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useActivitiesPastBudgetByBudgetList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    const handleList = useCallback((id_presupuesto) => {
        const url = `${config[process.env.REACT_APP_ENV].API_URL_activities_by_budget}/${id_presupuesto}/detalle/list`;
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) { 
            const transformed = datos.data.map(item => ({
                id: String(crypto.randomUUID()),
                id_actividad: item.detalle_actividad.actividad.id,
                cns_detalle_actividad: item.detalle_actividad.id,
                nombre_actividad: item.detalle_actividad.actividad.nombre,
                precio_pasado: item.precio,
                precio: item.detalle_actividad.precio,
                unidad: item.detalle_actividad.actividad.unidad_avance.medicion,
                cantidad: item.cantidad,
                id_finca: item.detalle_actividad.detalle_finca.finca.id,
                cns_detalle_finca: item.detalle_actividad.detalle_finca.cns_detalle_finca,
                cns_detalle_presupuesto: item.cns_detalle_presupuesto,
                presupuesto: item.presupuesto.presupuesto,
                status_actividad: item.status.id
            }));

            console.log("Datos transformados:", transformed);

            setProcessedData({body: transformed});
            } else {
                console.log("Datos no válidos o vacíos:", datos);
                setProcessedData({ body: [] });
            }
        }, [datos]);
    
        return { handleList, processedData, error, cargando };
}

export default useActivitiesPastBudgetByBudgetList;
