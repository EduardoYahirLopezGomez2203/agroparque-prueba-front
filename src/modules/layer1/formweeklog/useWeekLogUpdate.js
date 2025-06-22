import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useWeekLogUpdate = () => {

    const { obtenerDatos, datos, error, cargando, cargado } = useServiceAuth();

    const handleUpdate = async (id, data) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_catch_week_update;
        const url = `${baseUrl}/${id}`;
        await obtenerDatos('POST', url, data);  
    };

    return {
        handleUpdate,
        datos,
        error,
        cargando,
        cargado
    };
};

export default useWeekLogUpdate;