import { useState } from "react"

const useSnackbarOption = () => {

    const [snackbarOptions, setSnackbarOptions] = useState({
        openSnackbar: false,
        snackbarSeverity: "",
        snackbarMessage: ""
    })

    const showMessage = (message, type) => {
        setSnackbarOptions((options) => ({
            ...options,
            snackbarMessage: message,
            openSnackbar: true,
            snackbarSeverity: type
        }))
    }

    return { snackbarOptions, setSnackbarOptions, showMessage }
}

export default useSnackbarOption