import config from "../../../config";
import useServiceAuth from "../../../hooks/useServiceAuth";

const useUserCreate = () => {
    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleCreate = async (dataValue, isUpdate, handleFormUpdate) => {
        if(!isUpdate){
        const url = config[process.env.REACT_APP_ENV].API_URL_user_create;
        console.log("Datos a enviar a la API:", dataValue);  
        await obtenerDatos('POST', url, dataValue);  
        console.log("URL:", url);
        console.log("Compañia creada existosamente");
        } else {
            handleFormUpdate();
        }
    };

    return {
        handleCreate,
        datos,
        error,
        cargando,
        cargado,
        actualizarEstados,
    };
};

export default useUserCreate;

