import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useLoginUser = () => {
    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleLoginUser = async (login, password) => {

        const url = config[process.env.REACT_APP_ENV].API_URL_login;
        const method = 'POST';

        await obtenerDatos(method, `${url}?user=${login}&pwd=${password}`);
    };

    return {
        handleLoginUser,
        datos,
        error,
        cargando,
        cargado,
        actualizarEstados
    };
};

export default useLoginUser;