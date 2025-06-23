import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useFileBudgetedActivityByUrl = () => {
     const { obtenerDatos, datos, error, cargando } = useServiceAuth();
    const [processedData, setProcessedData] = useState({ header: [], body: [] });


    const handleList = useCallback((url_archivo) => {
        const baseUrl = config[process.env.REACT_APP_ENV].API_URL_archive_by_url_archive
        const url = baseUrl + url_archivo
        obtenerDatos('GET', url);
    }, [obtenerDatos]);

    useEffect(() => {
        console.log("base 64 recibido:",datos);
        const processBlobToBase64 = async (blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProcessedData({ body: [{ documento: reader.result }] }); // reader.result es base64
            };
            reader.readAsDataURL(blob);
        };

        if (typeof datos === "string") {
            setProcessedData({ body: [{ documento: datos }] });
        } else if (datos instanceof Blob) {
            processBlobToBase64(datos);
        } else if (datos && typeof datos === 'object' && datos.data && typeof datos.data === 'object') {
            const documento = datos.data.documento;

            if (documento instanceof Blob) {
                processBlobToBase64(documento);
            } else {
                setProcessedData({ body: [{ documento: documento || "" }] });
            }
        } else {
            setProcessedData({ body: [] });
        }
    }, [datos]);

     return { handleList, processedData, error, cargando };
};

export default useFileBudgetedActivityByUrl;