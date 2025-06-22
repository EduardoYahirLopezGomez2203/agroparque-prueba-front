import { useState, useCallback } from "react";

const useSnackbarAlert = () => {
    // Estados para manejar la alerta
    const [alertInfo, setAlertInfo] = useState({
        open: false,
        message: "",
        severity: "info",
    });

    // Funciones para mostrar el tipo de alerta y cerrar la puerta
    const showAlert = useCallback((message, severity = "info") => {
        setAlertInfo({ open: true, message, severity });
    }, []);

    const closeAlert = useCallback(() => {
        setAlertInfo(ai => ({ ...ai, open: false }));
    }, []);

    return {
        alertInfo,
        showAlert,
        closeAlert,
    };
}

export default useSnackbarAlert;