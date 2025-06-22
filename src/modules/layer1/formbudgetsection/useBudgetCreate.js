import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useBudgetCreate = () => {
    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleCreate = async (budgetActivities, status, id_semana, id_finca, cns_detalle_finca) => {
            let url = config[process.env.REACT_APP_ENV].API_URL_budget_create;
            url = `${url}status=${status}&semana=${id_semana}&finca=${id_finca}&detalle_finca=${cns_detalle_finca}`;
            console.log("URL para crear presupuesto:", url);
            console.log("Array de actividades de un presupuesto a crear:", budgetActivities);
            await obtenerDatos('POST', url, budgetActivities);
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

export default useBudgetCreate;
