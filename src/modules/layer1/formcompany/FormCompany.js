import Form, { InputForm, SectionForm } from "../admin/Form";
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import useCompanyCreate from "./useCompanyCreate";
import { useState,useEffect } from "react";

const FormCompany = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate,responseUpdate}) => {
    const { handleCreate, datos } = useCompanyCreate(); //NOTA: Se añade la llamada de la API

    const data = {
        nombre: '',
        direccion: '',
        email: '',
        celular: '',
        razon_social: '',
        rfc: ''
    };

    const resetForm = () => {
        setDataValue(data);
        setIsUpdate(false);
    }

    const [dataValue, setDataValue] = useState (data)

    useEffect(() => {
            if (isUpdate) {
                setDataValue((prevState) => ({
                    ...prevState,
                    nombre: updateData.nombre,
                    direccion: updateData.direccion,
                    email: updateData.email,
                    celular: updateData.celular,
                    razon_social: updateData.razon_social,
                    rfc: updateData.rfc
                }));
                console.log("Datos del dataValue:", dataValue);
            }
    }, [isUpdate]);

    const handleFormUpdate = () => {
        console.log("Datos a guardar desde FormFarm:", dataValue);
        setUpdateData((prevState) => ({
            ...prevState,
            nombre: dataValue.nombre,
            direccion: dataValue.direccion,
            email: dataValue.email,
            celular: dataValue.celular,
            razon_social: dataValue.razon_social,
            rfc: dataValue.rfc
        }));
        setUpdate(true);
        resetForm();
    };


    const formApi = {
        handleCreate,
        dataValue,
        response: datos,
        responseUpdate,
        resetForm,
        isUpdate,
        handleFormUpdate
    };
    
    return (
        <Form useFormApi={() => ({ ...formApi, datos: dataValue })}>
            <SectionForm title="Empresa" 
                icon={ <CasesRoundedIcon sx={{fontSize: "45px"}} color="slateBlue" /> }
            >
                <InputForm title="Nombre" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="nombre" />
                <InputForm title="Razón Social" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="razon_social" />
                <InputForm title="RFC" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="rfc" />
            </SectionForm>
            <SectionForm title="Contacto" 
                icon={ <PhoneRoundedIcon sx={{fontSize: "45px"}} color="slateBlue" /> } 
            >
                <InputForm title="Numero de Teléfono" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="celular" />
                <InputForm title="Correo Electrónico" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="email" />
                <InputForm title="Dirección" is isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName= "direccion" />
            </SectionForm>
        </Form>
    );
}

export default FormCompany;