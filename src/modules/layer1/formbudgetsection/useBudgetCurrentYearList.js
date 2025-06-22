import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useBudgetCurrentYearList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Función unificada para listar y buscar
    const handleList = useCallback(() => {
        const url = config[process.env.REACT_APP_ENV].API_URL_current_year_budget_list
        obtenerDatos('GET', url, {}, { "findby": 0 });
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) {
            const transformed = datos.data.map(item => ({
                id: item.id_presupuesto,
                presupuesto: item.presupuesto,
                limite: item.limite, // si lo necesitas
                semana: {
                    ...item.semana, // conserva toda la estructura original
                },
                status: {
                    ...item.status, // conserva todos los campos
                },
                detalle_finca: {
                    ...item.detalle_finca,
                    area: {
                        ...item.detalle_finca?.area
                    },
                    finca: {
                        ...item.detalle_finca?.finca,
                        empresa: {
                            ...item.detalle_finca?.finca?.empresa
                        }
                    },
                    jefe_area: {
                        ...item.detalle_finca?.jefe_area
                    }
                }
            }));

            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);

    return { handleList, processedData, error, cargando };
}

export default useBudgetCurrentYearList;