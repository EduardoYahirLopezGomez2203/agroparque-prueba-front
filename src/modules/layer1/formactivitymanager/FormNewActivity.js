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

const FormNewActivity = ({ dataValue, setDataValue, onAdd, isEditing, editId, onCancelEditing }) => {

    const { handleList: handleListActivity, processedData: processedDataActivity } = useActivityList();
    const { alertInfo, closeAlert, showAlert } = useSnackbarAlert();
    const [precioError, setPrecioError] = useState("");

    // Catálogo de actividades
    useEffect(() => { handleListActivity(); }, [handleListActivity]);

    // Mostrar unidad de avance al seleccionar actividad
    useEffect(() => {
        if (!dataValue.id_actividad) return;
        const sel = processedDataActivity.body.find(item => item.id === dataValue.id_actividad);
        
        if (sel) setDataValue(prev => ({
            ...prev,
            cantidad_avance: sel.nombre_unidad_avance || ""
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
                    onKeyDown={e => {
                    // permitimos sólo dígitos, punto, y teclas de control
                    if (!/[0-9.]|\b/.test(e.key) && e.key.length === 1) {
                        e.preventDefault();
                        setPrecioError("Sólo se admiten números y punto.");
                    }
                    }}
                    onChange={e => {
                    const val = e.target.value;
                    // regex: sólo dígitos y opcionalmente punto con hasta 2 decimales
                    if (/^\d*(\.\d{0,2})?$/.test(val)) {
                        setPrecioError("");
                        setDataValue(prev => ({
                        ...prev,
                        precio: val === "" ? "" : parseFloat(val)
                        }));
                    } else {
                        setPrecioError("Sólo dos decimales permitidos.");
                    }
                    }}
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

    // Validación para el precio
    const canSubmit = () => {
        if (dataValue.precio === "" || isNaN(Number(dataValue.precio))) {
            showAlert("Ingresa un precio válido antes de añadir.", "warning");
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
