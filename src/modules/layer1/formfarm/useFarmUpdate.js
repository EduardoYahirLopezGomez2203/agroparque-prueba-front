import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFarmUpdate = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleUpdate = async (id,data) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_farm_update;
        const url = `${baseUrl}/${id}`;  
        const newData = {
            id_empresa: data.id_empresa,
            nombre: data.nombre,
            descripcion: data.descripcion,
            direccion: data.direccion,
            email: data.email,
            celular: data.celular,
            areas: Array.isArray(data.areas) ? data.areas : []
        }
        console.log("Datos a enviar a la API:", newData);
        await obtenerDatos('POST', url, newData);  
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Finca actualizada existosamente");
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

export default useFarmUpdate;
