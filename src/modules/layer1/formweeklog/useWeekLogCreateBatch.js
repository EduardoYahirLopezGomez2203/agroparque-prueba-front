import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFormWeekLogCreateBatch = () => {
    const { obtenerDatos, datos, error, cargando, cargado } = useServiceAuth();

    const handleCreate = (dataValue) => {
        const url = config[process.env.REACT_APP_ENV].API_URL_catch_week_create_batch;
        obtenerDatos('POST', url, dataValue);  
    };

    return {
        handleCreate,
        datos,
        error,
        cargando,
        cargado
    };
};

export default useFormWeekLogCreateBatch;
