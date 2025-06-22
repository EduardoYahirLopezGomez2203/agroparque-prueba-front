import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useUserList = () => {
    const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });

    const handleList = useCallback((key) => {
        const url = key 
            ? `${config[process.env.REACT_APP_ENV].API_URL_user_list}/${key}`
            : config[process.env.REACT_APP_ENV].API_URL_user_list;
            
        // Eliminar el último parámetro (headers vacíos)
        obtenerDatos('GET', url, {}, {"findby" : 0}); 
    }, [obtenerDatos]);

    useEffect(() => {
        if (datos?.data) {
            const transformed = Array.isArray(datos.data) 
                ? datos.data.map(item => ({
                    id: item.id,
                    nombre: item.nombre,
                    ap_paterno: item.ap_paterno,
                    ap_materno: item.ap_materno,
                    email: item.email,
                    celular: item.celular,
                    login: item.login,
                    perfil: {
                        id: item.perfil.id,
                        permisos: item.permisos?.map(permisoModulo => ({
                            permiso: {
                                id: permisoModulo.permiso.id,
                                nombre: permisoModulo.permiso.nombre
                            },
                            modulo: {
                                id: permisoModulo.modulo.id,
                                nombre: permisoModulo.modulo.nombre
                            } 
                        })), 
                        nombre: item.perfil.nombre
                    }
                }))
                : [];
                
            setProcessedData({ body: transformed });
        }
    }, [datos]);

    return { handleList, processedData, error, cargando };
};

export default useUserList;