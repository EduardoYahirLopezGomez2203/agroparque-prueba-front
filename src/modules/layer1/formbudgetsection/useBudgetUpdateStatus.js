import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useBudgetUpdateStatus = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();


    const handleUpdate = async (status,id_presupuesto,) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_budget_update_status;
        const url = `${baseUrl}/${id_presupuesto}/status/${status}`;
        await obtenerDatos('POST', url);
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Presupuesto actualizado existosamente");
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

export default useBudgetUpdateStatus;
