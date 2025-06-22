import { useEffect, useState } from "react";
import Form, { InputForm, SectionForm, SelectForm } from "../admin/Form";
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import useModulelist from "../formprofile/useModuleList";
import { Stack } from "@mui/material";

const FormAddInformation = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate, responseUpdate }) => {

    const { handleList: handleListModule, processedData: processedDataModule } = useModulelist();

    useEffect(() => {
        handleListModule('');
    }, [])

    const data = {
        nombre_dato: '',
        id_modulo: null
    };

    const resetForm = () => {
        setDataValue(data);
        //setIsUpdate(false);
    }

    const [dataValue, setDataValue] = useState(data)

    useEffect(() => {
        if (isUpdate) {
            setDataValue((prevState) => ({
                ...prevState,
                nombre: updateData.nombre,
            }));
            console.log("Datos del dataValue:", dataValue);
        }
    }, [isUpdate]);

    const handleFormUpdate = () => {
        setUpdateData((prevState) => ({
            ...prevState,
            nombre: dataValue.nombre,
        }));
        setUpdate(true);
        resetForm();
    };

    const formApi = {
        //handleCreate,
        dataValue,
        //response: datos,
        responseUpdate,
        resetForm,
        isUpdate,
        handleFormUpdate
    };

    const dataModule = processedDataModule.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre };
    });

    return (
        <Form useFormApi={() => ({ ...formApi })}>
            <SectionForm title="General"
                icon={<CasesRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <Stack direction="row" spacing={2}>
                    <InputForm title="Nombre del dato" isRequired /*setDataValue={setDataValue} dataValue={dataValue}*/ fieldName="nombre_dato" />
                    <SelectForm title="Módulo" isRequired options={dataModule} setDataValue={setDataValue} dataValue={dataValue} fieldName="id_modulo" />
                </Stack>
            </SectionForm>
        </Form>
    );
}
export default FormAddInformation;