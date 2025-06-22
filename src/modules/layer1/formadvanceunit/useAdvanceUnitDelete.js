import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useAdvanceUnitDelete = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();


    const handleDelete = async (id) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_advance_unit_delete;
        const url = `${baseUrl}/${id}`; 
        await obtenerDatos('POST', url);  
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Unidad de avance eliminado existosamente");
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

export default useAdvanceUnitDelete;