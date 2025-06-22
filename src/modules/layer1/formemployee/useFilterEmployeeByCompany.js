import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFilterEmployeeByCompany = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ body: [] });

    const handleList = useCallback((company) => {
        const url = config[process.env.REACT_APP_ENV].API_URL_employee_by_company_list
            .replace("?", company)
            
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
                tipo_trabajador: {
                    id: item.tipo_trabajador.id,
                    nombre: item.tipo_trabajador.nombre
                },
                finca: {
                    id: item.finca.id,
                    nombre: item.finca.nombre,
                },
                puesto: {
                    id: item.puesto.id,
                    nombre: item.puesto.nombre,
                },
                labor_trabajador: {
                    id: item.labor_trabajador.id,
                    nombre: item.labor_trabajador.nombre
                }
            }));
        
            setProcessedData({
                    body: transformed
                });
            } else {
                setProcessedData({ body: [] });
            }
        }, [datos]);
    
        return { handleList, processedData, error, cargando };
}

export default useFilterEmployeeByCompany;