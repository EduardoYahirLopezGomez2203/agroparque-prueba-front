import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useBudgetAllActions = () => {
    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleCreateUpdateDelete = async (budgetActivities,id_presupuesto, status, id_semana, id_finca, cns_detalle_finca) => {
            let url = config[process.env.REACT_APP_ENV].API_URL_budget_create;
            url = `${url}presupuesto=${id_presupuesto}&status=${status}&semana=${id_semana}&finca=${id_finca}&detalle_finca=${cns_detalle_finca}`;
            console.log("URL para crear presupuesto:", url);
            console.log("Array de actividades de un presupuesto a crear:", budgetActivities);
            await obtenerDatos('POST', url, budgetActivities);
    };

    return {
        handleCreateUpdateDelete,
        datos,
        error,
        cargando,
        cargado,
        actualizarEstados,
    };
};

export default useBudgetAllActions;
