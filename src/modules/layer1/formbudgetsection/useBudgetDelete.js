import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useBudgetDelete = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();


    const handleDelete = async (dataIdsBudgetDelete, id_presupuesto, status) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_budget_delete;
        const url = `${baseUrl}/${id_presupuesto}/detalle/delete?status=${status}`; 
        await obtenerDatos('POST', url, dataIdsBudgetDelete);  
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Presupuesto eliminado existosamente");
        console.log("Datos a enviar a la API para eliminar el presupuesto:", dataIdsBudgetDelete);
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

export default useBudgetDelete;