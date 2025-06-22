import { useEffect, useState, useCallback, useMemo } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useActivityDetailList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    // Datos ficticios
    const dummyActivityDetails = useMemo(() => ({
        body: [
            {
                actividad: {
                    id: 6,
                    nombre: "Control de plagas",
                    descripcion: "Aplicación de productos fitosanitarios para proteger cultivos.",
                    clave_presupuestal: "50DS4",
                    unidad_avance: {
                        id: 3,
                        nombre: "Litros",
                        medicion: "lt",
                        descripcion: "Unidad de volumen utilizada para medir líquidos."
                    },
                    tipo_actividad: {
                        id: 1,
                        nombre: "Campo"
                    }
                },
                cns_detalle_actividad: 1,
                detalle_finca: {
                    cns_detalle_finca: 3,
                    finca: {
                        id: 2,
                        nombre: "Finca Verde",
                        empresa: {
                            id: 2,
                            nombre: "AgroVerde"
                        }
                    },
                    trabajador: {
                        id: 3,
                        nombre: "José",
                        ap_paterno: "López",
                        ap_materno: "Ramírez"
                    },
                    area: {
                        id: 5,
                        nombre: "Recursos humanos",
                        descripcion: "Gestión del talento, capacitación y bienestar del personal"
                    }
                },
                precio: 180.36
            },
            {
                actividad: {
                    id: 7,
                    nombre: "Siembra de café",
                    descripcion: "Siembra de plantas de café.",
                    clave_presupuestal: "CAF-001",
                    unidad_avance: {
                        id: 1,
                        nombre: "Hectárea",
                        medicion: "ha",
                        descripcion: "Superficie sembrada"
                    },
                    tipo_actividad: {
                        id: 2,
                        nombre: "Siembra"
                    }
                },
                cns_detalle_actividad: 2,
                detalle_finca: {
                    cns_detalle_finca: 4,
                    finca: {
                        id: 2,
                        nombre: "Finca Verde",
                        empresa: {
                            id: 2,
                            nombre: "AgroVerde"
                        }
                    },
                    trabajador: {
                        id: 4,
                        nombre: "Ana",
                        ap_paterno: "Martínez",
                        ap_materno: "Santos"
                    },
                    area: {
                        id: 2,
                        nombre: "Producción",
                        descripcion: "Responsable de la siembra, cultivo y cosecha de productos"
                    }
                },
                precio: 250.00
            },
            {
            actividad: {
                id: 8,
                nombre: "Cosecha de plátano",
                descripcion: "Recolección manual de plátano maduro.",
                clave_presupuestal: "PLT-002",
                unidad_avance: {
                    id: 4,
                    nombre: "Cajas",
                    medicion: "cj",
                    descripcion: "Caja estándar para transporte de fruta"
                },
                tipo_actividad: {
                    id: 3,
                    nombre: "Cosecha"
                }
            },
            cns_detalle_actividad: 3,
            detalle_finca: {
                cns_detalle_finca: 5,
                finca: {
                    id: 1, // <-- Cambia el id de finca aquí
                    nombre: "Finca Esperanza",
                    empresa: {
                        id: 2,
                        nombre: "AgroVerde"
                    }
                },
                trabajador: {
                    id: 5,
                    nombre: "Luis",
                    ap_paterno: "Hernández",
                    ap_materno: "Pérez"
                },
                area: {
                    id: 3,
                    nombre: "Cosecha",
                    descripcion: "Área encargada de la recolección y empaque"
                }
            },
            precio: 320.50
        }
        ]
    }), []);

    // Función unificada para listar y buscar
    const handleList = useCallback((key = '') => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_activity_detail_list;
        // Reemplaza el ? por el id de la actividad, o elimina /?/ si no hay id
        const url = key
            ? baseUrl.replace('?', key)
            : baseUrl.replace('/?/', '/');
        obtenerDatos('GET', url, {}, {"findby": 0});
    }, [obtenerDatos]);

    // Procesamiento de datos
    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data) && datos.data.length > 0) { 
            const transformed = datos.data.map(item => ({
                id: item.cns_detalle_actividad,
                actividad: {
                    id: item.actividad.id,
                    nombre: item.actividad.nombre,
                    descripcion: item.actividad.descripcion,
                    clave_presupuestal: item.actividad.clave_presupuestal,
                    unidad_avance: {
                        id: item.actividad.unidad_avance.id,
                        nombre: item.actividad.unidad_avance.nombre,
                        medicion: item.actividad.unidad_avance.medicion,
                        descripcion: item.actividad.unidad_avance.descripcion
                    },
                    tipo_actividad: {
                        id: item.actividad.tipo_actividad.id,
                        nombre: item.actividad.tipo_actividad.nombre
                    }
                },
                detalle_finca: {
                    cns_detalle_finca: item.detalle_finca.cns_detalle_finca,
                    finca: {
                        id: item.detalle_finca.finca.id,
                        nombre: item.detalle_finca.finca.nombre,
                        empresa: {
                            id: item.detalle_finca.finca.empresa.id,
                            nombre: item.detalle_finca.finca.empresa.nombre
                        }
                    },
                    trabajador: {
                        id: item.detalle_finca.trabajador.id,
                        nombre: item.detalle_finca.trabajador.nombre,
                        ap_paterno: item.detalle_finca.trabajador.ap_paterno,
                        ap_materno: item.detalle_finca.trabajador.ap_materno,
                    },
                    area: {
                        id: item.detalle_finca.area.id,
                        nombre: item.detalle_finca.area.nombre,
                        descripcion: item.detalle_finca.area.descripcion
                    }
                },
                precio: item.precio
            }));

            setProcessedData({ body: transformed });
        } else {
            setProcessedData(dummyActivityDetails);
        }
    }, [datos, dummyActivityDetails]);
    
    return { handleList, processedData, error, cargando };
}

export default useActivityDetailList;