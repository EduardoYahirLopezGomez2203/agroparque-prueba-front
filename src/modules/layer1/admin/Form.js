import { Box, Button, Divider, Stack, Snackbar, Alert } from "@mui/material";
import IconTextComponent from "../../../components/icontexts/IconTextComponent";
import InputComponent from "../../../components/inputs/InputComponent";
import ButtonComponent from "../../../components/buttons/ButtonComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SelectComponent from "../../../components/selects/SelectComponent";
import { useContext, useEffect, useRef, useState } from "react";
import SelectMultipleComponent from "../../../components/selects/SelectMultipleComponent";
import CheckboxDialogComponet from "../../../components/checkboxes/CheckboxDialogComponent";
import { ReloadTable } from "../../layer2/admintemplate/AdminTemplate";
import { ReloadTableCustom } from "../../layer2/admintemplate/AdminTemplateCustom";

/**
 * Contenedor principal de los formularios
 */
const Form = ({ children, direction = "row", spacing = 10, useFormApi, isAddInformation, setIsOpenModal }) => {
    const { handleCreate, dataValue, response, resetForm, isUpdate, handleFormUpdate, responseUpdate } = useFormApi();
    const [openSnackbar, setOpenSnackbar] = useState(false); // NOTA: Estado para controlar la apertura del Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const { reload } = useContext(ReloadTable);

    const [update, setUpdate] = useState(isUpdate);
    const isFirstRender = useRef(true);
    const isFirst = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (response && response.data && response.data.status) {
            setSnackbarMessage("¡Registro creado con éxito!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            resetForm(); // Limpia el formulario después de guardar  
            reload()
        } else {
            setSnackbarMessage("Hubo un problema al procesar la solicitud.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    }, [response]);

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }

        console.log("responseUpdate:", responseUpdate);
        if (responseUpdate && responseUpdate.data && responseUpdate.data.status) { // verificar re-enderizado
            setSnackbarMessage("¡Registro actualizado correctamente!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            resetForm(); // Limpia el formulario después de guardar
            reload()
        } else {
            setSnackbarMessage("Hubo un problema al procesar la solicitud.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    }, [responseUpdate]);

    useEffect(() => {
        setUpdate(isUpdate)
    }, [isUpdate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleCreate(dataValue, isUpdate, handleFormUpdate);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseSnackbar = () => { //NOTA: SE AGREGÓ LA FUNCIÓN CLOSE AL MOMENTO DE CERRAR EL SNACKBAR
        setOpenSnackbar(false);
    };

    const handleReset = () => {
        resetForm()
        setUpdate(false)
    }

    const openModal = () => {
        setIsOpenModal(true);
    }

    return (
        <Box component="form"
            sx={{
                display: "grid",
                marginRight: 10,
                gap: 2
            }}
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            <Stack
                direction={direction}  // row, column
                sx={{ gap: spacing }}
            >
                {children} {/* Aqui va SectionForm */}
            </Stack>

            {/* Botones del formulario */}
            <Stack direction="row" sx={{ justifyContent: "end", gap: 2 }}>
                
                {isAddInformation && <ButtonComponent
                    label={"Añadir información"}
                    styleButton="outlined"
                    typeButton="button"
                    icon={<AddCircleIcon />}
                    onClick={openModal}
                    color="vividGreen"
                />}

                <ButtonComponent
                    label={update ? "Actualizar" : "Agregar"}
                    typeButton="submit"
                    icon={<SaveIcon />}
                />

                <ButtonComponent
                    label={update ? "Cancelar" : "Limpiar"}
                    styleButton="outlined"
                    color="brightRed"
                    typeButton="reset"
                    icon={<DeleteIcon />}
                />
            </Stack>

            {/* Snackbar para mostrar mensajes: SE MODIFICA CON RESPECTO A LA RESPUESTA DEL HANDLESUBMIT */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

/**
 * Proporciona un campo de texto
 */
export const InputForm = ({ 
    title, isRequired, 
    type, dataValue, 
    disabled,
    setDataValue, 
    fieldName,
}) => {
    return (
        <Box sx={{ paddingTop: 2, flexGrow: 1 }}>
            <InputComponent
                title={title}
                isRequired={isRequired}
                disabled={disabled}
                fieldName={fieldName}
                type={type}
                setDataValue={setDataValue}
                dataValue={dataValue} // <- Maneja valores undefined
            />
        </Box>
    );
};

/**
 * Proporciona un campo de menu de opciones
 */
export const SelectForm = ({
    title,
    isRequired = false,
    options,
    dataValue = {},
    setDataValue,
    fieldName,
    sx = {}
}) => {

    return (
        <Box sx={{ paddingTop: 2, flexGrow: 1 }}>
            <SelectComponent
                title={title}
                isRequired={isRequired}
                options={options}
                fieldName={fieldName}
                value={dataValue} // <- Maneja valores undefined
                setValue={setDataValue}
                sx={sx} // Permite personalizar el estilo del select
            />
        </Box>
    );
};

/**
 * Proporciona uno o mas elementos con un comportamiento especifico
 */
export const CheckboxDialogForm = ({
    title,
    isRequired,
    options,
    optionsDialog,
    dataValue = {},
    setDataValue,
    fieldName
}) => {
    return (
        <Box sx={{ paddingTop: 2, flexGrow: 1 }}>
            <CheckboxDialogComponet
                isRequired={isRequired}
                title={title}
                options={options}
                optionsDialog={optionsDialog}
                dataValue={dataValue}
                setDataValue={setDataValue}
                fieldName={fieldName}
            />
        </Box>
    );
};

/**
 * Proporciona un menu de varias opciones
 */
export const SelectMultipleForm = ({
    title,
    isRequired = false,
    options,
    disabled,
    dataValue = {},
    setDataValue,
    fieldName
}) => {
    const handleChange = (value) => {
        setDataValue(prev => ({
            ...prev,
            [fieldName]: value // Actualiza el campo específico
        }));
    };

    return (
        <Box sx={{ paddingTop: 2, flexGrow: 1 }}>
            <SelectMultipleComponent
                title={title}
                isRequired={isRequired}
                options={options}
                disabled={disabled}
                value={dataValue[fieldName] || []} // <- Maneja valores undefined
                setValue={handleChange}
            />
            {console.log(dataValue)}
        </Box>
    );
};

/**
 * Proporciona un boton personalizado
 */
export const ButtonForm = ({ title, icon, color, onClick }) => {
    return (
        <Box sx={{ paddingTop: 3.7, flexGrow: 1 }}>
            <Button
                variant="outlined"
                startIcon={icon}
                onClick={onClick}
                sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: "5px",
                    boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.25)",
                    padding: "0px 10px",
                    height: "26px",
                    justifyContent: "start",
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    border: "1.3px dashed"
                }}
                color={color}
            >
                {title}
            </Button>
        </Box>
    );
};

/**
 * Se encarga de poder organizar las diferentes entradas de texto por secciones
 */
export const SectionForm = ({ title, icon, children, direction = "column" }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <IconTextComponent text={title} icon={icon} />

            <Divider sx={{ backgroundColor: "#9AA0A8", height: "2px" }} />

            <Stack
                direction={direction}
                sx={{
                    gap: direction === "column" ? 0 : 3,
                    width: "90%"
                }}
            >
                {children} {/* Aqui va InputForm y sus variantes */}
            </Stack>
        </Box>
    );
};

export default Form;

export const FormTemporality = ({ children, direction = "row", spacing = 10, useFormApi, isAddInformation, setIsOpenModal }) => {
    const { handleCreate, dataValue, response, resetForm, isUpdate, handleFormUpdate, responseUpdate } = useFormApi();
    const [openSnackbar, setOpenSnackbar] = useState(false); // NOTA: Estado para controlar la apertura del Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const { reload } = useContext(ReloadTableCustom);

    const [update, setUpdate] = useState(isUpdate);
    const isFirstRender = useRef(true);
    const isFirst = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (response && response.data && response.data.status) {
            setSnackbarMessage("¡Registro creado con éxito!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            resetForm(); // Limpia el formulario después de guardar  
            reload()
        } else {
            setSnackbarMessage("Hubo un problema al procesar la solicitud.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    }, [response]);

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }

        console.log("responseUpdate:", responseUpdate);
        if (responseUpdate && responseUpdate.data && responseUpdate.data.status) { // verificar re-enderizado
            setSnackbarMessage("¡Registro actualizado correctamente!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            resetForm(); // Limpia el formulario después de guardar
            reload()
        } else {
            setSnackbarMessage("Hubo un problema al procesar la solicitud.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    }, [responseUpdate]);

    useEffect(() => {
        setUpdate(isUpdate)
    }, [isUpdate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleCreate(dataValue, isUpdate, handleFormUpdate);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseSnackbar = () => { //NOTA: SE AGREGÓ LA FUNCIÓN CLOSE AL MOMENTO DE CERRAR EL SNACKBAR
        setOpenSnackbar(false);
    };

    const handleReset = () => {
        resetForm()
        setUpdate(false)
    }

    const openModal = () => {
        setIsOpenModal(true);
    }

    return (
        <Box component="form"
            sx={{
                display: "grid",
                marginRight: 10,
                gap: 2
            }}
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            <Stack
                direction={direction}  // row, column
                sx={{ gap: spacing }}
            >
                {children} {/* Aqui va SectionForm */}
            </Stack>

            {/* Botones del formulario */}
            <Stack direction="row" sx={{ justifyContent: "end", gap: 2 }}>
                
                {isAddInformation && <ButtonComponent
                    label={"Añadir información"}
                    styleButton="outlined"
                    typeButton="button"
                    icon={<AddCircleIcon />}
                    onClick={openModal}
                    color="vividGreen"
                />}

                <ButtonComponent
                    label={update ? "Actualizar" : "Agregar"}
                    typeButton="submit"
                    icon={<SaveIcon />}
                />

                <ButtonComponent
                    label={update ? "Cancelar" : "Limpiar"}
                    styleButton="outlined"
                    color="brightRed"
                    typeButton="reset"
                    icon={<DeleteIcon />}
                />
            </Stack>

            {/* Snackbar para mostrar mensajes: SE MODIFICA CON RESPECTO A LA RESPUESTA DEL HANDLESUBMIT */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};