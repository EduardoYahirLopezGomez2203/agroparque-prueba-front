import React, { useState, useContext, useEffect, useRef } from "react";
import { ReactComponent as CustomIcon } from "../../../assets/LogoWeb.svg"
import { Alert, Backdrop, Box, CircularProgress, Snackbar, Typography } from "@mui/material";
import TextFieldComponent from "../../../components/textfields/TextFieldComponent";
import CheckboxComponent from "../../../components/checkboxes/CheckboxComponent";
import { AuthContext } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import useLoginUser from "./useLoginUser";
import FlatButtonComponent from "../../../components/buttons/FlatButtonComponent";

const Login = () => {
    const navigate = useNavigate();
    const { login, isLoggedIn } = useContext(AuthContext);
    
    const [formData, setFormData] = useState({ user: "", password: "" });
    const [errors, setErrors] = useState({ user: false, password: false });

    const { handleLoginUser, datos, cargando, error } = useLoginUser();

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    
    const isFirstRun = useRef(true);

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [tryConnect, setTryConnect] = useState(0); // Numero de intentos

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (isFirstRun.current) { // Evita la primera ejecución
            isFirstRun.current = false;
            return; 
        }

        setOpenBackdrop(true)

        if (datos !== null && !cargando) {
            // 1. El token está en "message", no en "data.token"
            const token = datos.message;

            // 2. Decodifica el token manualmente (sin librerías)
            const payloadBase64 = token.split('.')[1]; // Obtiene el payload
            const decodedPayload = JSON.parse(atob(payloadBase64));

            // 3. Extrae username y profile del payload
            const username = decodedPayload.sub; // "sub" es el campo estándar para el username
            const profile = decodedPayload.authorities[0]; // Ajusta según tu token

            // 4. Llama a login
            login(token, username, profile);
        } else if (error && !cargando) {
            setTryConnect(prev => prev + 1);
            
            if (error === "Load failed" && tryConnect <= 3) {
                const timeoutId = setTimeout(handleSubmit, 3000); // 3000ms = 3 segundos
                return () => clearTimeout(timeoutId);
            } else {
                setSnackbar({
                    open: true,
                    message: error === "Load failed" ? "Fallo la conexión con el servidor" : "Usuario o contraseña incorrectos",
                    severity: "error",
                });
                setOpenBackdrop(false);
                setTryConnect(0)
            }
        }
    }, [datos, cargando, login, error]);

    /*Verifying change in "isLoggedIn"*/
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/admin');
            setOpenBackdrop(false);
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        const newErrors = {
            //user: !formData.user.includes("@"),
            user: formData.user.length < 5,
            password: formData.password.length < 2,
        };

        setErrors(newErrors);

        if (!newErrors.user && !newErrors.password) {
            handleLoginUser(formData.user, formData.password)
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({
            ...prev, open: false
        }))
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: "auto"
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: 20,
                left: 5,
                marginBottom: 3,
                width: 'auto',
                height: 'auto'
            }}>
                <CustomIcon style={{ width: '100%', height: '100%' }} />
            </Box>

            <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", marginBottom: 7 }}>
                Iniciar Sesión
            </Typography>
            <Box
                component="form"
                sx={{ textAlign: "left", marginBottom: 2, width: 330, }}
            >
                <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", marginBottom: -1.5 }}>
                    Usuario
                </Typography>
                <TextFieldComponent
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    onEnterPress={handleKeyDown}
                    error={errors.user}
                    helperText='Este campo es obligatorio'
                    fullWidth
                />
            </Box>

            <Box
                sx={{ textAlign: "left", marginBottom: 2, width: 330, }}
            >
                <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", marginBottom: -1.5 }}>
                    Contraseña
                </Typography>
                <TextFieldComponent
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    onEnterPress={handleKeyDown}
                    error={errors.password}
                    helperText={
                        errors.password ? "La contraseña debe tener al menos 6 caracteres." : ""
                    }
                />
                <CheckboxComponent label="Recuérdame" />
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                }}>
                    <FlatButtonComponent onClick={handleSubmit} label="Iniciar Sesión" />
                </Box>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Backdrop
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default Login;