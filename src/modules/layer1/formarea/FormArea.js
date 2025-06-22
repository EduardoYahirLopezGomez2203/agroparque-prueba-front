import Form, { InputForm, SectionForm } from "../admin/Form";
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import useAreaCreate from "./useAreaCreate";
import { useState, useEffect } from "react";

const FormArea = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate, responseUpdate }) => {
    const { handleCreate, datos } = useAreaCreate();
    const data = { nombre: '', descripcion: '' }
    const [dataValue, setDataValue] = useState(data);

    const resetForm = () => {
        setDataValue(data);
        setIsUpdate(false);
    }

    useEffect(() => {
        if (isUpdate) {
            setDataValue((prevState) => ({
                ...prevState,
                nombre: updateData.nombre,
                descripcion: updateData.descripcion,
            }));
            console.log("Datos del dataValue:", dataValue);
        }
    }, [isUpdate]);

    const handleFormUpdate = () => {
        console.log("Datos a guardar desde FormFarm:", dataValue);
        setUpdateData((prevState) => ({
            ...prevState,
            nombre: dataValue.nombre,
            descripcion: dataValue.descripcion,
        }));
        setUpdate(true);
        resetForm();
    };

    const formApi = {
        handleCreate,
        dataValue: dataValue,
        response: datos,
        responseUpdate,
        resetForm,
        isUpdate,
        handleFormUpdate
    };

    return (
        <Form useFormApi={() => ({ ...formApi })}>
            <SectionForm title="General" direction="row"
                icon={<CasesRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <InputForm title="Nombre" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="nombre" />
                <InputForm title="Descripción" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="descripcion" />
            </SectionForm>
        </Form>
    );
};

export default FormArea;