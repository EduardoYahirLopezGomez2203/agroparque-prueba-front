import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useEmployeeList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ body: [] });

    const handleList = useCallback((key) => {
        const url = key 
            ? `${config[process.env.REACT_APP_ENV].API_URL_employee_list}/${key}`
            : config[process.env.REACT_APP_ENV].API_URL_employee_list;
            
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) { 
            const transformed = datos.data.map(item => ({
                id: item.id,
                nombre: item.nombre,
                ap_paterno: item.ap_paterno, 
                ap_materno: item.ap_materno,
                direccion: item.direccion,
                celular: item.celular,
                id_puesto: item.puesto.id,
                puesto: item.puesto.nombre,
                id_labor_trabajador: item.labor_trabajador.id,
                labor_trabajador: item.labor_trabajador.nombre,
                tipo_trabajador: item.tipo_trabajador?.nombre || "",
                finca: item.finca?.nombre || "",
                id_tipo_trabajador: item.tipo_trabajador?.id || "",
                id_finca: item.finca?.id || "",
            }));
        
            console.log("Datos transformados:", transformed);
        
            setProcessedData({
                    body: transformed
                });
            } else {
                console.log("Datos no válidos o vacíos:", datos);
                setProcessedData({ body: [] });
            }
        }, [datos]);
    
        return { handleList, processedData, error, cargando };
}

export default useEmployeeList;