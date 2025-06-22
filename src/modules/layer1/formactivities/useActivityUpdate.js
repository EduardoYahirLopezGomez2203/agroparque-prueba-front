import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useActivityUpdate = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleUpdate = async (id,data) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_activity_update;
        const url = `${baseUrl}/${id}`;
        const newData = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            clave_presupuestal: data.clave_presupuestal,
            id_unidad_avance: data.id_unidad_avance,
            id_tipo_actividad: data.id_tipo_actividad
        }
        console.log("Datos a enviar a la API:", newData);  
        await obtenerDatos('POST', url, newData);  
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Area actualizada existosamente");
    };

    return {
        handleUpdate,
        datos,
        error,
        cargando,
        cargado,
        actualizarEstados,
    };
};

export default useActivityUpdate;