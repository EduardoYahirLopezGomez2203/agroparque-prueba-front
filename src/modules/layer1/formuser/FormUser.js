import Form, { InputForm, SectionForm, SelectForm } from "../admin/Form";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import BadgeIcon from '@mui/icons-material/Badge';
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import useUserCreate from "./useUserCreate";
import useUserList from "../formprofile/useProfileList";

const FormUser = ({ updateData, setUpdateData, isUpdate ,setIsUpdate, setUpdate, responseUpdate }) => {
    const { handleCreate, datos } = useUserCreate();
    const { handleList, processedData } = useUserList();
    const [password, setPassword] = useState('');
    const [disabledPassword, setDisabledPassword] = useState(false) // Ayuda a activar y desactivar campos

    const data = {
        id_perfil: null,
        nombre: '',
        ap_paterno: '',
        ap_materno: '',
        email: '',
        celular: '',
        login: '',
        password: ''
    };

    const [dataValue, setDataValue] = useState(data);

    useEffect(() => {
        console.log(dataValue)
    }, [dataValue])

    const resetForm = () => {
        setPassword('');
        setDataValue(data);
        setIsUpdate(false);
    }

    useEffect(() => {
        handleList('');
    }, [handleList]);

    useEffect(() => {
        if (isUpdate) {
            setDisabledPassword(true)
            setDataValue((prevState) => ({
                ...prevState,
                id_perfil: updateData.perfil.id,
                nombre: updateData.nombre ,
                ap_paterno: updateData.ap_paterno,
                ap_materno: updateData.ap_materno,
                email: updateData.email,
                celular: updateData.celular,
                login: updateData.login
            }));
            console.log("Datos del dataValue:", dataValue);
        } else {
            setDisabledPassword(false)
        }
    }, [isUpdate]);

    const handleFormUpdate = () => {
        console.log("Datos a guardar desde FormFarm:", dataValue);
        console.log("Entro a el updateData cuando se esta creando");
        setUpdateData((prevState) => ({
            ...prevState,
            id_perfil: dataValue.id_perfil,
            nombre: dataValue.nombre,
            ap_paterno: dataValue.ap_paterno,
            ap_materno: dataValue.ap_materno,
            email: dataValue.email,
            celular: dataValue.celular,
            login: dataValue.login,
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

    const dataProfile = processedData.body.map(option => {
        const id = option.id;
        const nombre = option.nombre;

        return { id, nombre };
    });

    return (
        <Form useFormApi={() => ({ ...formApi })}>
            <SectionForm title="Personales"
                icon={<PersonRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <InputForm title="Nombre" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="nombre" />
                <InputForm title="Apellido Paterno" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="ap_paterno" />
                <InputForm title="Apellido Materno" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="ap_materno" />
            </SectionForm>
            <SectionForm title="Credenciales"
                icon={<BadgeIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <SelectForm
                    title="Perfil (Seleccione una opción)"
                    isRequired
                    options={dataProfile}
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                    fieldName="id_perfil"
                />
                <InputForm title="Login" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="login" />
                <Stack direction="row" spacing={2}>
                    <InputForm title="Contraseña del Usuario" disabled={disabledPassword} isRequired setDataValue={setDataValue} type="password" dataValue={dataValue} fieldName="password" />
                    <InputForm title="Confirmar Contraseña" disabled={disabledPassword} isRequired setDataValue={setPassword} type="password" dataValue={password} fieldName="password" /> {/* Pendiente por revisar */}
                </Stack>
            </SectionForm>
            <SectionForm title="Contacto"
                icon={<PhoneRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <InputForm title="Numero Telefono" isRequired type="number" setDataValue={setDataValue} dataValue={dataValue} fieldName="celular" />
                <InputForm title="Correo Electrónico" isRequired type="email" setDataValue={setDataValue} dataValue={dataValue} fieldName="email" />
            </SectionForm>
        </Form>
    );
};

export default FormUser;