import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFarmCreate = () => {
    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleCreate = async (dataValue, isUpdate, handleFormUpdate) => {
        if(!isUpdate){
            console.log(isUpdate);
            const url = config[process.env.REACT_APP_ENV].API_URL_farm_create;
            console.log("Datos a enviar a la API:", dataValue);  
            await obtenerDatos('POST', url, dataValue);  
            console.log("URL:", url);
            console.log("Finca creada existosamente");
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

export default useFarmCreate;
