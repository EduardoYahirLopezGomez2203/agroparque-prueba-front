import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useDocumentDelete = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();


    const handleDelete = async (id) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_document_delete;
        const url = `${baseUrl}/${id}`; 
        await obtenerDatos('POST', url);  
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Documento eliminado existosamente");
    };

    return {
        handleDelete,
        datos,
        error,
        cargando,
        cargado,
        actualizarEstados,
    };
};

export default useDocumentDelete;