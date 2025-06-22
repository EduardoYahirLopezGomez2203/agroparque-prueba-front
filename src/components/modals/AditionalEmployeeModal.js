import React from "react";
import { Dialog, Box, Divider, Typography, Stack } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import IconTextComponent from '../icontexts/IconTextComponent';
import SelectComponent from "../selects/SelectComponent";
import ButtonComponent from "../buttons/ButtonComponent";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InputComponent from "../inputs/InputComponent";

const AditionalEmployeeModal = ({openDialog, setIsAditionalEmployeeModalOpen, dataValue, setDataValue, dataCompany}) => {

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
            <Box padding = "20px">
                <Typography 
                    variant = "body1"
                    fontWeight = "600"
                    color = "slateBlue"
                    marginBottom={2}
                    width= "100%"
                    align="center"
                > 
                Datos Generales
                </Typography>

                <Stack direction= "row" gap = {4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <SelectComponent
                        title={"Empresa"}
                        dataValue={setDataValue}
                        value={dataValue}
                        isRequired
                        options={dataCompany}
                        fieldName="id_empresa"
                        isDisabled={false}
                        sx={{ width: '180px'}}
                    />

                    <SelectComponent
                        title={"Empleado"}
                        dataValue={setDataValue}
                        value={dataValue}
                        isRequired
                        options={[
                            { id: 1, nombre: 'Empleado 1' },
                            { id: 2, nombre: 'Empleado 2' },
                            { id: 3, nombre: 'Empleado 3' }]}
                        fieldName="id_empleado"
                        isDisabled={false}
                        sx={{ width: '180px'}}
                    />
                </Stack>

                <Typography 
                    variant = "body1"
                    fontWeight = "600"
                    color = "slateBlue"
                    marginBottom={2}
                    marginTop={3}
                    width= "100%"
                    align="center"
                > 
                Datos de Actividad
                </Typography>

                <Stack direction= "row" gap = {4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "0px 7px 0px 7px"}}>
                    <SelectComponent
                        title={"Actividad"}
                        dataValue={setDataValue}
                        value={dataValue}
                        isRequired
                        options={[
                            { id: 1, nombre: 'Actividad 1' },
                            { id: 2, nombre: 'Actividad 2' },
                            { id: 3, nombre: 'Actividad 3' }]}
                        fieldName="id_actividad"
                        isDisabled={false}
                    />

                    <InputComponent 
                        title={"Cantidad de Avance"} 
                        isRequired
                        dataValue = {dataValue}
                        setDataValue = {setDataValue}
                        fieldName = "cantidad_avance"
                        type="number"
                    />

                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
                    <ButtonComponent 
                        label="Aceptar" 
                        icon={<CheckIcon />}
                        color="primary" 
                        onClick={() => console.log('Cargar Presupuesto')} 
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