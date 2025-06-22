import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useCompanyUpdate = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleUpdate = async (id,data) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_company_update;
        const url = `${baseUrl}/${id}`;
        const newData = {
            id_empresa: data.id_empresa,
            nombre: data.nombre,
            celular: data.celular,
            email: data.email,
            razon_social: data.razon_social,
            rfc: data.rfc
        }
        console.log("Datos a enviar a la API:", newData);  
        await obtenerDatos('POST', url, newData);  
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Empresa actualizado existosamente");
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

export default useCompanyUpdate;