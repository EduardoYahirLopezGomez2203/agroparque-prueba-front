import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useEmployeeUpdate = () => {
    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();

    const handleUpdate = async (id, data) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_employee_update;
        const url = `${baseUrl}/${id}`;
        const newData = {
            id_tipo_trabajador: data.id_tipo_trabajador,
            id_finca: data.id_finca,
            id_puesto: data.id_puesto,
            id_labor_trabajador: data.id_labor_trabajador,
            nombre: data.nombre,
            ap_paterno: data.ap_paterno,
            ap_materno: data.ap_materno,
            direccion: data.direccion,
            celular: data.celular,
        };
        console.log("Datos a enviar a la API:", newData);
        await obtenerDatos('POST', url, newData);
        console.log("Método: POST");
        console.log("URL:", url);
        console.log("Empleado actualizado existosamente");

        // Manejo de archivos
        const existingFiles = data.existingFiles || [];
        const newFiles = data.newFiles || [];
        const deletedFiles = data.deletedFiles || [];

        // Eliminar archivos
        for (const file of deletedFiles) {
            const deleteUrl = `${config[process.env.REACT_APP_ENV].API_URL_employee_document_delete}/${file.id}`.replace("?", id);
            await obtenerDatos('POST', deleteUrl, null);
            console.log("Archivo eliminado:", deleteUrl);
        }

        // Agregar nuevos archivos
        const createDocumentUrl = config[process.env.REACT_APP_ENV].API_URL_employee_document_create.replace("?", id);
        for (const file of newFiles) {
            await obtenerDatos('POST', createDocumentUrl, file);
            console.log("Archivo agregado:", createDocumentUrl);
        }
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

export default useEmployeeUpdate;