import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useDocumentUpdate = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();


    const handleUpdate = async (id,data) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_document_update;
        const url = `${baseUrl}/${id}`;
        const newData = {
            nombre: data.nombre,
            descripcion: data.descripcion,
        }
        console.log("Datos a enviar a la API:", newData);  
        await obtenerDatos('POST', url, newData);  
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Documento actualizado existosamente");
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

export default useDocumentUpdate;
