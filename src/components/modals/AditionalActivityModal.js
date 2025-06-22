import React, { useEffect, useState } from "react";
import { Dialog, Box, Divider, Typography, Stack, Button } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import IconTextComponent from '../icontexts/IconTextComponent';
import ButtonComponent from "../buttons/ButtonComponent";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InputComponent from "../inputs/InputComponent";
import useFilterEmployeeByCompany from "../../modules/layer1/formemployee/useFilterEmployeeByCompany";
import { SelectForm } from "../../modules/layer1/admin/Form";

const AditionalActivityModal = ({
    openDialog, setIsAditionalEmployeeModalOpen, setActivityCaptureData,
    dataCompany, dataActivity, showMessage
}) => {

    const { handleList: handleListEmployee, processedData: processedDataEmployee, error: errorEmployee } = useFilterEmployeeByCompany()

    const initialData = {
        id_empresa: null,
        id_trabajador: null,
        id_actividad: null,
        cantidad_avance: "",
        fecha: null
    };

    const [dataValue, setDataValue] = useState(initialData);

    useEffect(() => {
        handleListEmployee(dataValue.id_empresa)
    }, [dataValue.id_empresa])

    const dataEmployee = processedDataEmployee.body.map(body => ({
        id: body.id,
        nombre: body.nombre,
    }));

    const handleSubmit = (event) => {
        event.preventDefault();

        // Buscar el empleado y la actividad seleccionados
        const trabajador = dataEmployee.find(emp => emp.id === dataValue.id_trabajador);
        const actividad = dataActivity.find(act => act.id === dataValue.id_actividad);

        setActivityCaptureData(prev => [
            ...prev,
            {
                trabajador: {
                    id: dataValue.id_trabajador,
                    nombre: trabajador.nombre
                },
                actividad: {
                    id: dataValue.id_actividad,
                    nombre: actividad.nombre
                },
                cantidad_avance: dataValue.cantidad_avance,
                fecha: dataValue.fecha,
            }
        ]);

        showMessage("Empleado adicional, añadido ¡Correctamente!", "success")

        closeModal()
    };
    const closeModal = () => {
        setIsAditionalEmployeeModalOpen(false);
    }

    return (
        <Dialog open={openDialog} maxWidth="sm" fullWidth>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Centra horizontalmente
                    alignItems: 'center',
                    marginTop: "15px"
                }}
            >
                <IconTextComponent
                    text={"Actividades Adicionales"}
                    icon={<PersonAddAlt1Icon fontSize="large" color="slateBlue" />}
                />
            </Box>

            <Divider sx={{ backgroundColor: "#9AA0A8", height: "2px" }} />
            <Box padding="20px">
                <Typography
                    variant="body1"
                    fontWeight="600"
                    color="slateBlue"
                    marginBottom={2}
                    width="100%"
                    align="center"
                >
                    Datos Generales
                </Typography>

                <SelectForm
                    title={"Empresa"}
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                    isRequired
                    options={dataCompany}
                    fieldName="id_empresa"
                    isDisabled={false}
                    sx={{ width: '165px' }}
                />

                <Stack direction="row" gap={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '30px' }}>
                    <SelectForm
                        title={"Empleado"}
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        isRequired
                        options={dataEmployee}
                        fieldName="id_trabajador"
                        isDisabled={false}
                    />

                    <SelectForm
                        title={"Actividad"}
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        isRequired
                        options={dataActivity}
                        fieldName="id_actividad"
                        isDisabled={false}
                    />

                    <InputComponent
                        title={"Unidad"}
                        isRequired
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        fieldName="id_unidad"
                        disabled
                    />
                </Stack>

                <Typography
                    variant="body1"
                    fontWeight="600"
                    color="slateBlue"
                    marginBottom={2}
                    marginTop={3}
                    width="100%"
                    align="center"
                >
                    Datos de Actividad
                </Typography>

                <Stack direction="row" gap={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <InputComponent
                        title={"Precio"}
                        isRequired
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        disabled
                        fieldName="precio"
                    />

                    <InputComponent
                        title={"Cantidad"}
                        isRequired
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        fieldName="avance"
                    />

                    <InputComponent
                        title={"Total"}
                        isRequired
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        disabled
                        fieldName="Total"
                    />

                </Stack>

                <Box width={"165px"} padding={"0px 0px 0px 0px"}>
                    <ButtonForm title={"Añadir Archivo"} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
                    <ButtonComponent
                        label="Aceptar"
                        icon={<CheckIcon />}
                        color="primary"
                        onClick={handleSubmit}
                    />
                    <ButtonComponent
                        label="Cancelar"
                        icon={<CloseIcon />}
                        color="brightRed"
                        styleButton="outlined"
                        onClick={closeModal}
                    />
                </Box>

            </Box>
        </Dialog>
    );
};

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

export default AditionalActivityModal;