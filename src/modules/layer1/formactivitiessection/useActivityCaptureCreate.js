import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useActivityCaptureCreate = () => {
    const { obtenerDatos, datos, error, cargando, cargado } = useServiceAuth();

    const handleCreate = async (dataValue, week, farm, area, status = 20) => {
        const url = `${config[process.env.REACT_APP_ENV]
            .API_URL_capture_activity_create}?status=${status}`
            .replace("?", week)
            .replace("?", farm)
            .replace("?", area)
        await obtenerDatos('POST', url, dataValue);
    };

    return {
        handleCreate,
        datos,
        error,
        cargando,
        cargado,
    };
};

export default useActivityCaptureCreate;
