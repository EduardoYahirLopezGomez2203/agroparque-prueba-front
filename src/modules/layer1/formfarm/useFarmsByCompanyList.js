import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFarmsByCompanyList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Función unificada para listar y buscar
    const handleList = useCallback((id_empresa) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_farm_list_by_company;
        const url = `${baseUrl}/${id_empresa}`;
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data) && datos.data.length > 0) { 
            const transformed = datos.data.map(item => ({
                id: item.id,
                empresa: {
                  id: item.empresa.id,
                  nombre: item.empresa.nombre,
                },
                nombre: item.nombre,
                direccion: item.direccion,
                email: item.email,
                descripcion: item.descripcion,
                celular: item.celular || "Sin teléfono",
                status: item.status || "Activo",
            }));

            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);
    
    return { handleList, processedData, error, cargando };
}

export default useFarmsByCompanyList;

