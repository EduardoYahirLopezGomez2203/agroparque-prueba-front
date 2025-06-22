import React from "react";
import { Dialog, Box, Divider, Typography, Stack, Button } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import IconTextComponent from '../icontexts/IconTextComponent';
import SelectComponent from "../selects/SelectComponent";
import ButtonComponent from "../buttons/ButtonComponent";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InputComponent from "../inputs/InputComponent";
import useFilterEmployeeByCompany from "../../modules/layer1/formemployee/useFilterEmployeeByCompany";

const AditionalActivityModal = ({openDialog, setIsAditionalEmployeeModalOpen, dataValue, setDataValue, dataCompany}) => {

    const { handleList: handleListEmployee, processedData: processedDataEmployee, error: errorEmployee} = useFilterEmployeeByCompany()

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

                <SelectComponent
                        title={"Empresa"}
                        dataValue={setDataValue}
                        value={dataValue}
                        isRequired
                        options={dataCompany}
                        fieldName="id_empresa"
                        isDisabled={false}
                        sx={{ width: '165px'}}
                />

                <Stack direction= "row" gap = {4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '30px'}}>
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
                    />

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
                        title={"Unidad"} 
                        isRequired
                        dataValue = {setDataValue}
                        value = {dataValue}
                        fieldName = "id_unidad"
                        disabled
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

                <Stack direction= "row" gap = {4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <InputComponent 
                        title={"Precio"} 
                        isRequired
                        dataValue = {dataValue}
                        setDataValue = {setDataValue}
                        fieldName = "avance"
                    />

                    <InputComponent 
                        title={"Cantidad"} 
                        isRequired
                        dataValue = {dataValue}
                        setDataValue = {setDataValue}
                        fieldName = "avance"
                    />

                    <InputComponent 
                        title={"Total"} 
                        isRequired
                        dataValue = {dataValue}
                        setDataValue = {setDataValue}
                        disabled
                        fieldName = "avance"
                    />

                </Stack>

                <Box width={"165px"} padding={"0px 0px 0px 0px"}>
                    <ButtonForm title={"Añadir Archivo"}/>
                </Box>
                
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