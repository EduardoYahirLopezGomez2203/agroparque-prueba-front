import { useState, useCallback, useEffect } from "react";

const useMultipleSnackbarAlert = () => {
    const [queue, setQueue] = useState([]);
    const [alertInfo, setAlertInfo] = useState({
        open: false,
        message: "",
        severity: "info",
    });

    // Agrega un mensaje a la cola
    const showAlert = useCallback((message, severity = "info") => {
        setQueue(prev => [...prev, { message, severity }]);
    }, []);

    // Cierra el alert actual
    const closeAlert = useCallback(() => {
        setAlertInfo(ai => ({ ...ai, open: false }));
    }, []);

    // Cuando se cierra el alert, muestra el siguiente de la cola
    const handleExited = useCallback(() => {
        setQueue(prev => prev.slice(1));
    }, []);

    // Cuando hay mensajes en la cola y no hay uno mostrándose, muestra el primero
    useEffect(() => {
        if (queue.length > 0 && !alertInfo.open) {
            setAlertInfo({ open: true, ...queue[0] });
        }
    }, [queue, alertInfo.open]);

    return {
        alertInfo,
        showAlert,
        closeAlert,
        handleExited,
    };
};

export default useMultipleSnackbarAlert;