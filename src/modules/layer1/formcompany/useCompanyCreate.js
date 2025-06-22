import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useCompanyCreate = () => {
    
    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleCreate = async (dataValue,isUpdate, handleFormUpdate) => {
        if(!isUpdate){
        const url = config[process.env.REACT_APP_ENV].API_URL_company_create;
        const method = 'POST';
        console.log("Datos a enviar a la API:", dataValue);  
        await obtenerDatos(method, url, dataValue);  
        console.log("Método: ", method);
        console.log("URL:", url);
        console.log("Compañía creada existosamente");
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

export default useCompanyCreate;
