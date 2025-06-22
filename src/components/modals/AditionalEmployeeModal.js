import React, { useEffect, useState } from "react";
import { Dialog, Box, Divider, Typography, Stack } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import IconTextComponent from '../icontexts/IconTextComponent';
import SelectComponent from "../selects/SelectComponent";
import ButtonComponent from "../buttons/ButtonComponent";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InputComponent from "../inputs/InputComponent";
import useFilterEmployeeByCompany from "../../modules/layer1/formemployee/useFilterEmployeeByCompany";
import { SelectForm } from "../../modules/layer1/admin/Form";

// Checar errores
const AditionalEmployeeModal = ({
    openDialog, setIsAditionalEmployeeModalOpen, setActivityCaptureData,
    dataCompany, dataActivity, showMessage, dateOptions
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
        <Dialog open={openDialog} maxWidth="xs" fullWidth>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "15px" }}
            >
                <IconTextComponent
                    text={"Empleados Adicionales"}
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

                <Stack direction="row" gap={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SelectForm
                        title={"Empresa"}
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        isRequired
                        options={dataCompany}
                        fieldName="id_empresa"
                        sx={{ width: '180px' }}
                    />

                    <SelectForm
                        title={"Empleado"}
                        setDataValue={setDataValue}
                        dataValue={dataValue}
                        isRequired
                        options={dataEmployee}
                        fieldName="id_trabajador"
                        sx={{ width: '180px' }}
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

                <Stack direction="row" gap={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "0px 7px 0px 7px" }}>
                    <SelectForm
                        title={"Actividad"}
                        setDataValue={setDataValue}
                        dataValue={dataValue}
                        isRequired
                        options={dataActivity}
                        fieldName="id_actividad"
                    />

                    <InputComponent
                        title={"Cantidad de Avance"}
                        isRequired
                        setDataValue={setDataValue}
                        dataValue={dataValue}
                        fieldName="cantidad_avance"
                        type="number"
                    />

                    <SelectForm 
                        title="Fecha" 
                        setDataValue={setDataValue} 
                        dataValue={dataValue} 
                        isRequired
                        options={dateOptions} 
                        fieldName="fecha" 
                    />

                </Stack>

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

export default AditionalEmployeeModal;