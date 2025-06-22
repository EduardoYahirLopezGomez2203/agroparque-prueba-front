import { Alert, Fade, Snackbar} from "@mui/material";

const SnackbarComponent = ({
    snackbarOptions = {
        openSnackbar: false,
        snackbarSeverity: "",
        snackbarMessage: ""
    },
    setSnackbarOptions
}) => {

    const handleCloseSnackbar = () => {
        setSnackbarOptions((element) => ({
            ...element,
            snackbarMessage: "",
            snackbarSeverity: "",
            openSnackbar: false
        }))
    };

    return (
        <Snackbar
            open={snackbarOptions.openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            slots={{ transition: Fade }}
        >
            <Alert onClose={handleCloseSnackbar} severity={snackbarOptions.snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarOptions.snackbarMessage}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent