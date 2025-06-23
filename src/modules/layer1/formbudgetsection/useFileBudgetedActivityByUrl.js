import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFileBudgetedActivityByUrl = () => {
    const { obtenerDatos, datos } = useServiceAuth();
    const [document, setDocument] = useState([]);

    const handleList = useCallback((url_archivo) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_archive_by_url_archive
        const url = baseUrl + url_archivo
        obtenerDatos('GET', url);
    }, [obtenerDatos]);

    useEffect(() => {
        if (datos && typeof datos === 'object' && datos.data && Array.isArray(datos.data)) {
            const docs = datos.data.map(doc => ({
                archivo: doc.archivo
            }));
            setDocument(docs);
            console.log(document);
        }
    }, [datos]);

    return { handleList, document };
};

export default useFileBudgetedActivityByUrl;