import Form, { InputForm, SectionForm } from "../admin/Form";
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import useCompanyCreate from "./useCompanyCreate";
import { useState,useEffect } from "react";
import SnackbarComponent from "../../../components/snackbar/SnackbarComponent"
import useSnackbarOptions from "../../../hooks/useSnackbarOption"

const FormCompany = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate,responseUpdate}) => {
    const { handleCreate, datos } = useCompanyCreate(); //NOTA: Se añade la llamada de la API

    const { snackbarOptions, setSnackbarOptions, showMessage} = useSnackbarOptions()

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

    const handleSubmit = (dataValue, isUpdate, handleFormUpdate) => {
        if (dataValue.celular.length !== 10) {
            showMessage("Recuerda que tu número debe tener 10 dígitos", "warning")
            return
        }

        handleCreate(dataValue, isUpdate, handleFormUpdate)
    }

    const formApi = {
        handleCreate: handleSubmit,
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
                <InputForm title="Numero de Teléfono" isRequired type="number" setDataValue={setDataValue} dataValue={dataValue} fieldName="celular" />
                <InputForm title="Correo Electrónico" isRequired type="email" setDataValue={setDataValue} dataValue={dataValue} fieldName="email" />
                <InputForm title="Dirección" is isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName= "direccion" />
            </SectionForm>
            <SnackbarComponent snackbarOptions={snackbarOptions} setSnackbarOptions={setSnackbarOptions} />
        </Form>
    );
}

export default FormCompany;