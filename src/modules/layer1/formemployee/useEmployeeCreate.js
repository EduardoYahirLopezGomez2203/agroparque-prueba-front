import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";
import { useEffect, useState } from "react";

const useEmployeeCreate = () => {

    const { obtenerDatos, datos, error, cargando, cargado, actualizarEstados } = useServiceAuth();
    const [documentValues, setDocumentValues] = useState([]);
    const [shouldCreateDocuments, setShouldCreateDocuments] = useState(false);

    useEffect(() => {
        const createDocuments = async () => {
            try {
                const finalUrlCreateDocumentEmployee = config[process.env.REACT_APP_ENV].API_URL_employee_document_create.replace("?", datos.data.data);

                const documentPromises = documentValues.map(async (item) => {
                    await obtenerDatos('POST', finalUrlCreateDocumentEmployee, item);
                    console.log("URL:", finalUrlCreateDocumentEmployee);
                    console.log("Documento creado exitosamente");
                });

                await Promise.all(documentPromises);
            } catch (error) {
                console.error("Error creando documentos:", error);
            }
        };

        if (datos !== null && documentValues.length > 0 && shouldCreateDocuments) {
            createDocuments();
            setShouldCreateDocuments(false); // Reinicia la bandera
        }
    }, [datos, shouldCreateDocuments]);

    const handleCreate = async (dataValue, isUpdate, handleFormUpdate) => {

        if (!isUpdate) {
            const urlCreateEmployee = config[process.env.REACT_APP_ENV].API_URL_employee_create;

            const EmployValues = {
                id_tipo_trabajador: dataValue.id_tipo_trabajador,
                id_finca: dataValue.id_finca,
                nombre: dataValue.nombre,
                ap_paterno: dataValue.ap_paterno,
                ap_materno: dataValue.ap_materno,
                direccion: dataValue.direccion,
                celular: dataValue.celular,
                id_puesto: dataValue.id_puesto,
                id_labor_trabajador: dataValue.id_labor_trabajador
            };
            if(dataValue.id_puesto === 1){
                EmployValues.areas = dataValue.areas;
            }

            setDocumentValues(dataValue.archivos);

            console.log("Datos a enviar a la API:", dataValue);
            try {
                await obtenerDatos('POST', urlCreateEmployee, EmployValues);
                console.log("URL:", urlCreateEmployee);
                console.log("Empleado creado exitosamente");

                //Activa la bandera para crear documentos
                setShouldCreateDocuments(true);
            } catch (error) {
                console.error("Error creando empleado:", error);
            }
        } else {
            handleFormUpdate();
        }
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

export default useEmployeeCreate;
