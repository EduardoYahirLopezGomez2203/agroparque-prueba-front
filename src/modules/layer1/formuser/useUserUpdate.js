import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useUserUpdate = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleUpdate = async (id,data) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_user_update;
        const url = `${baseUrl}/${id}`;
        const newData = {
            id_perfil: data.id_perfil,
            nombre: data.nombre,
            ap_paterno: data.ap_paterno,
            ap_materno: data.ap_materno,
            email: data.email,
            celular: data.celular,
            login: data.login
        }
        console.log("Datos a enviar a la API:", newData);  
        await obtenerDatos('POST', url, newData);  
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Usuario actualizado existosamente");
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

export default useUserUpdate;