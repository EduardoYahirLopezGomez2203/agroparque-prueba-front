import { Box, FormControl, InputLabel, Stack } from "@mui/material";
import CheckboxComponent from "./CheckboxComponent";
import DialogComponent from "../dialogs/DialogComponent";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useEffect, useCallback, useMemo, useState } from "react";

const CheckboxDialogComponent = ({
    title, 
    isRequired, 
    options = [],
    dataValue,
    optionsDialog = [],
    setDataValue,
    fieldName,
    error = false,
    type = "text"
}) => {
    const [openDialogs, setOpenDialogs] = useState({});
    const [dataSelected, setDataSelected] = useState([]);
    const [dialogSelections, setDialogSelections] = useState({});
    const [backupSelections, setBackupSelections] = useState({});

    // Actualizar el valor principal cuando cambian las selecciones
    useEffect(() => {
        setDataValue(prev => ({ ...prev, [fieldName]: dataSelected }));
    }, [dataSelected, setDataValue, fieldName]);

    useEffect(() => {

        if (dataValue[fieldName].length === 0) {
            return;
        }

        if (dataValue[fieldName][0].id_modulo == null && dataValue[fieldName][0].id_permiso == null) {
            setDataSelected([])
            return;
        }

        if (dataValue[fieldName]) {
            setDataSelected(dataValue[fieldName])
        }
    }, [dataValue, fieldName])

    // Manejar cambios en los permisos del diálogo
    const handlePermissionChange = useCallback((moduleId, permisoId) => {
        setDialogSelections(prev => {
            const moduleSelections = prev[moduleId] || {};
            const newSelections = { ...moduleSelections };
            
            if (newSelections[permisoId]) {
                delete newSelections[permisoId];
            } else {
                newSelections[permisoId] = true;
            }
            
            return { ...prev, [moduleId]: newSelections };
        });
    }, []);

    // Guardar los cambios del diálogo
    const handleSave = useCallback((moduleId) => {
        setOpenDialogs(prev => ({ ...prev, [moduleId]: false }));
        
        setDataSelected(prev => [
            ...prev.filter(item => item.id_modulo !== moduleId),
            ...Object.keys(dialogSelections[moduleId] || [])
                .map(permisoId => ({ id_modulo: moduleId, id_permiso: permisoId }))
        ]);
        
        setBackupSelections(prev => ({ ...prev, [moduleId]: dialogSelections[moduleId] }));
    }, [dialogSelections]);

    // Cancelar cambios del diálogo
    const handleCancel = useCallback((moduleId) => {
        setOpenDialogs(prev => ({ ...prev, [moduleId]: false }));
        setDialogSelections(prev => ({ ...prev, [moduleId]: backupSelections[moduleId] }));
    }, [backupSelections]);

    // Alternar visibilidad del diálogo
    const toggleDialog = useCallback((moduleId) => {
        setOpenDialogs(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
        
        if (!openDialogs[moduleId]) {
            const currentSelections = dataSelected
                .filter(item => item.id_modulo === moduleId)
                .reduce((acc, item) => ({ ...acc, [item.id_permiso]: true }), {});
            
            setDialogSelections(prev => ({ ...prev, [moduleId]: currentSelections }));
            setBackupSelections(prev => ({ ...prev, [moduleId]: currentSelections }));
        }
    }, [openDialogs, dataSelected]);

    // Memoizar las opciones del diálogo para mejor rendimiento
    const memoizedDialogOptions = useMemo(() => optionsDialog, [optionsDialog]);

    // Verificar si un módulo tiene selecciones
    const hasSelections = (moduleId) => 
        dataSelected.some(item => item.id_modulo === moduleId);

    return (
        <FormControl error={error} fullWidth required={isRequired} variant="standard">
            <InputLabel
                htmlFor={`${title}-${type}`}
                shrink
                color="dark"
                sx={{
                    fontWeight: 500,
                    color: "#495361",
                    '& .MuiInputLabel-asterisk': { color: "#AC4C4C" }
                }}
            >
                {title}
            </InputLabel>
            
            <Stack sx={{ height: "10rem", overflowY: "auto", marginTop: 1.5 }}>
                {options.map(module => (
                    <Box key={module.id}>
                        <CheckboxComponent
                            name={fieldName}
                            label={module.nombre}
                            selected={hasSelections(module.id)}
                            onClick={() => toggleDialog(module.id)}
                            size="small"
                        />
                        
                        <DialogComponent
                            openDialog={openDialogs[module.id]}
                            setOpenDialog={() => toggleDialog(module.id)}
                            icon={<DashboardOutlinedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
                            onClickAccept={() => handleSave(module.id)}
                            onClickCancel={() => handleCancel(module.id)}
                            title={`Módulo de ${module.nombre}`}
                        >
                            <Stack>
                                {memoizedDialogOptions.map(permission => (
                                    <CheckboxComponent
                                        key={permission.id}
                                        label={permission.nombre}
                                        selected={dialogSelections[module.id]?.[permission.id]}
                                        onClick={() => handlePermissionChange(module.id, permission.id)}
                                    />
                                ))}
                            </Stack>
                        </DialogComponent>
                    </Box>
                ))}
            </Stack>
        </FormControl>
    );
};

export default CheckboxDialogComponent;