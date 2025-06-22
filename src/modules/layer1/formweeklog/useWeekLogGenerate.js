import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFormWeekLogGenerate = () => {
    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleGenerate = (dataValue) => {
        const url = config[process.env.REACT_APP_ENV].API_URL_catch_week_generate;
        obtenerDatos('POST', url, dataValue);  
    };

    return {
        handleGenerate,
        datos,
        error,
        cargando,
        cargado,
        actualizarEstados,
    };
};

export default useFormWeekLogGenerate;
