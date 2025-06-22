import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useProfileUpdate = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();


    const handleUpdate = async (id, data) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_profile_update;
        const url = `${baseUrl}/${id}`;
        const newData = {
            id_finca: data.id_finca,
            permisos: data.permisos,
            nombre: data.nombre,
            id_empresa: data.id_empresa,
            descripcion: data.descripcion,
        }
        console.log("Datos a enviar a la API:", newData);  
        await obtenerDatos('POST', url, newData);  
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Perfil actualizado exitosamente");
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

export default useProfileUpdate;
