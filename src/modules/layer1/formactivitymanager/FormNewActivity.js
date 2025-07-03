import BasicForm from "../admin/BasicForm";
import { SectionForm, SelectForm, InputForm } from "../admin/Form";
import { useEffect, useState } from "react";
import GrassIcon from '@mui/icons-material/Grass';
import useActivityList from "../formactivities/useActivityList";
import { Stack, Snackbar, Alert } from "@mui/material";
import ButtonComponent from "../../../components/buttons/ButtonComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import useSnackbarAlert from "./useSnackbarAlert";

const FormNewActivity = ({ dataValue, setDataValue, onAdd, isEditing, editId, onCancelEditing, originalData }) => {

    const { handleList: handleListActivity, processedData: processedDataActivity } = useActivityList();
    const { alertInfo, closeAlert, showAlert } = useSnackbarAlert();
    const [precioError, setPrecioError] = useState("");

    const isOriginalRecord = isEditing && originalData.some(o => Number(o.id_actividad) === Number(editId));

    // Catálogo de actividades
    useEffect(() => { 
        handleListActivity(); 
    }, [handleListActivity]);

    // Mostrar unidad de avance al seleccionar actividad
    useEffect(() => {
        if (!dataValue.id_actividad) return;
        const sel = processedDataActivity.body.find(item => item.id === dataValue.id_actividad);
        
        if (sel) setDataValue(prev => ({
            ...prev,
            cantidad_avance: sel.medicion || ""
        }));
    }, [dataValue.id_actividad, processedDataActivity.body, setDataValue]);

    // Intercepta el submit nativo y evita la recarga (Cuestiones de lo que recibe button "submit"
    const handleSubmitForm = e => {
        e.preventDefault();
    };

    // Resetea el formulario
    const handleReset = () => {
        setDataValue({
        id_actividad: null,
        cantidad_avance: "",
        precio: ""
        });
        setPrecioError("");
    };

    // Opciones para el select de actividades
    let opciones = Array.isArray(processedDataActivity.body)? processedDataActivity.body.map(i => ({ id: i.id, nombre: i.nombre })): [];
    
    if (dataValue.id_actividad != null && !opciones.some(o => o.id === dataValue.id_actividad)) {
        opciones = [{ id: dataValue.id_actividad, nombre: dataValue.nombre || "—" }, ...opciones];
    }

    // Renderizado
    return (
        <>
            <BasicForm handleSubmit={handleSubmitForm} buttons={
                <ButtonFormNewActivity
                dataValue={dataValue}
                onAdd={onAdd}
                handleReset={handleReset}
                opciones={opciones}
                isEditing={isEditing}
                onCancelEditing={onCancelEditing}
                showAlert={showAlert}
                />
            }>

            <Stack width="100%" gap={2}>
                <SectionForm title="Registro de Actividad" direction="row" icon={<GrassIcon />}>
                <div style={{ position: "relative", display: "inline-block", width: "30%" }}>
                <SelectForm
                    title="Actividad"
                    setDataValue={setDataValue}
                    dataValue={dataValue}
                    isRequired
                    fieldName="id_actividad"
                    options={opciones}
                    value={dataValue.id_actividad ?? ""}
                    onChange={e => {
                    const id = parseInt(e.target.value, 10);
                    console.log("🔀 Seleccionaste actividad ID:", id);
                    setDataValue(prev => ({ ...prev, id_actividad: id }));
                    }}
                />
                {isOriginalRecord && (
                    <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        cursor: "not-allowed",
                        backgroundColor: "rgba(255,255,255,0.4)",
                        zIndex: 10,
                    }}
                    />
                )}
                </div>

                <InputForm
                    title="Unidad"
                    isRequired
                    setDataValue={setDataValue}
                    dataValue={dataValue}
                    fieldName="cantidad_avance"
                    disabled
                />
                <InputForm
                    title="Precio"
                    isRequired
                    setDataValue={setDataValue}
                    dataValue={dataValue}
                    fieldName="precio"
                    // lo ponemos text para validar nosotros
                    type="text"
                    error={!!precioError}
                    helperText={precioError}
                    inputProps={{ inputMode: 'decimal' }}
                />
                </SectionForm>
            </Stack>
            </BasicForm>
                <Snackbar
                    open={alertInfo.open}
                    autoHideDuration={3000}
                    onClose={closeAlert}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Alert onClose={closeAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
                        {alertInfo.message}
                    </Alert>
                </Snackbar>
        </>
    );
};

const ButtonFormNewActivity = ({ dataValue, onAdd, handleReset, opciones, isEditing, onCancelEditing, showAlert  }) => {

    // Validaciones antes de agregar
    const canSubmit = () => {
        if (!dataValue.id_actividad || Number.isNaN(Number(dataValue.id_actividad))) {
            showAlert("Selecciona una actividad antes de añadir.", "warning");
            return false;
        }
        if (dataValue.precio === "" || isNaN(Number(dataValue.precio))) {
            showAlert("Ingresa un precio válido antes de añadir.", "warning");
            return false;
        }
        if (Number(dataValue.precio) <= 0) {
            showAlert("El precio debe ser mayor que cero.", "warning");
            return false;
        }
        return true;
    };

    return (
        <>
            <ButtonComponent
                label={isEditing ? "Actualizar" : "Agregar"}
                typeButton="button"
                onClick={() => {
                    if (!canSubmit()) return;
                    const sel = opciones.find(a => a.id === dataValue.id_actividad);
                    const nombre = sel?.nombre || "";
                    onAdd({ ...dataValue, nombre });
                    isEditing ? onCancelEditing() : handleReset();
                }}
                icon={<CheckIcon />}
            />
            <ButtonComponent
                label={isEditing ? "Cancelar" : "Limpiar"}
                styleButton="outlined"
                color="brightRed"
                typeButton="button"
                onClick={isEditing ? onCancelEditing : handleReset}
                icon={isEditing ? <CloseIcon /> : <DeleteIcon />}
            />
        </>
    );
};


export default FormNewActivity;
