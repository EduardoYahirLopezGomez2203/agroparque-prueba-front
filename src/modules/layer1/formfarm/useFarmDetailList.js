import { useEffect, useState, useCallback, useMemo } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFarmDetailList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Datos ficticios
    const dummyFarmDetails = useMemo(() => ([
        {
            id: 1,
            finca: {
                id: 1,
                nombre: "Finca Esperanza",
                empresa: {
                    id: 1,
                    nombre: "AgroCampo"
                }
            },
            area: {
                id: 1,
                nombre: "Irrigación",
                descripcion: "Encargada del riego y control de humedad en cultivos"
            },
            trabajador: {
                id: 1,
                nombre: "Carlos",
                ap_paterno: "Gómez",
                ap_materno: "Ruiz"
            }
        },
        {
            id: 2,
            finca: {
                id: 2,
                nombre: "Finca Verde",
                empresa: {
                    id: 2,
                    nombre: "AgroVerde"
                }
            },
            area: {
                id: 2,
                nombre: "Producción",
                descripcion: "Responsable de la siembra, cultivo y cosecha de productos"
            },
            trabajador: {
                id: 2,
                nombre: "Ana",
                ap_paterno: "Martínez",
                ap_materno: "Santos"
            }
        }
    ]), []);

    // Función unificada para listar y buscar
    const handleList = useCallback((key = '') => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_farm_detail_list;
        // Reemplaza el ? por el id de la finca, o elimina /?/ si no hay id
        const url = key
            ? baseUrl.replace('?', key)
            : baseUrl.replace('/?/', '/');
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data) && datos.data.length > 0) { 
            const transformed = datos.data.map(item => ({
                id: item.cns_detalle_finca,
                finca: {
                    id: item.finca.id,
                    nombre: item.finca.nombre,
                    empresa: {
                        id: item.finca.empresa.id,
                        nombre: item.finca.empresa.nombre
                    }
                },
                area: {
                    id: item.area.id,
                    nombre: item.area.nombre,
                    descripcion: item.area.descripcion
                },
                trabajador: {
                    id: item.trabajador.id,
                    nombre: item.trabajador.nombre,
                    ap_paterno: item.trabajador.ap_paterno,
                    ap_materno: item.trabajador.ap_materno,
                }
            }));

            setProcessedData({ body: transformed });
        } else {
            setProcessedData({ body: dummyFarmDetails });
        }
    }, [datos, dummyFarmDetails]);
    
    return { handleList, processedData, error, cargando };
}

export default useFarmDetailList;