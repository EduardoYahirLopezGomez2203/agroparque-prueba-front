import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useEmployeeDocuments = () => {
    const { obtenerDatos, datos } = useServiceAuth();
    const [documents, setDocuments] = useState([]);

    const fetchEmployeeDocuments = useCallback((employeeId) => {
        const url = config[process.env.REACT_APP_ENV].API_URL_employee_document_list.replace("?", employeeId);
        obtenerDatos('GET', url);
    }, [obtenerDatos]);

    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) {
            const docs = datos.data.map(doc => ({
                id: doc.id,
                nombre: doc.documento.nombre,
                tipo_documento: doc.documento.nombre,
                archivo: doc.archivo
            }));
            setDocuments(docs);
            console.log(documents);
        }
    }, [datos]);

    return { fetchEmployeeDocuments, documents };
};

export default useEmployeeDocuments;