import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useBudgetUpdateCreateNewActivities = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();


    const handleUpdate = async (updatePastBudgetActivities,id_presupuesto, status) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_update_budget_create_new_activity;
        const url = `${baseUrl}/${id_presupuesto}/update/detalle?status=${status}`;
        console.log("Datos a enviar a la API para actualizar el presupuesto:", updatePastBudgetActivities);
        await obtenerDatos('POST', url, updatePastBudgetActivities);
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

export default useBudgetUpdateCreateNewActivities;