import { InputForm, SectionForm, SelectForm } from "../admin/Form";
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
// import useAreaCreate from "./useAreaCreate";
import { useState, useEffect } from "react";
import BasicForm from "../admin/BasicForm";

const FormActivityManagement = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate, responseUpdate }) => {
    // const { handleCreate, datos } = useAreaCreate();
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
        dataValue: dataValue,
        responseUpdate,
        resetForm,
        isUpdate,
        handleFormUpdate
    };

    return (
        <BasicForm>
            <SectionForm title="General" direction="row"
                icon={<CasesRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <SelectForm title="Semana" setDataValue={setDataValue} dataValue={dataValue} isRequired options={[]} fieldName="id_empresa" />
                <SelectForm title="Empresa" setDataValue={setDataValue} dataValue={dataValue} isRequired options={[]} fieldName="id_empresa" />
                <SelectForm title="Finca" setDataValue={setDataValue} dataValue={dataValue} isRequired options={[]} fieldName="id_empresa" />
                <SelectForm title="Área" setDataValue={setDataValue} dataValue={dataValue} isRequired options={[]} fieldName="id_empresa" />
            </SectionForm>
        </BasicForm>
    );
};

export default FormActivityManagement;