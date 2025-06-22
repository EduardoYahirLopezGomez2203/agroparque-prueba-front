import Form, { InputForm, SectionForm, SelectForm } from "../admin/Form";
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import useDocumentCreate from "./useDocumentCreate";
import useModuleList from "../formprofile/useModuleList";
import { useEffect, useState } from "react";

const FormDocument = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate, responseUpdate }) => {
    const { handleCreate, datos } = useDocumentCreate();
    const { handleList: handleListModule, processedData: processedDataModule } = useModuleList();

    const data = { nombre: '', descripcion: '' };

    const [dataValue, setDataValue] = useState(data)
    const [intentValue, setIntentValue] = useState();

    const resetForm = () => {
        setDataValue(data);
        setIntentValue();
        setIsUpdate(false);
    }

    useEffect(() => {
        handleListModule('');
    }, [handleListModule]);

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
        dataValue,
        response: datos,
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
            <SectionForm title="General" direction="row"
                icon={<CasesRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <InputForm title="Nombre" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="nombre" />
                <InputForm title="Descripción" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="descripcion" />
            </SectionForm>
        </Form>
    );
};

export default FormDocument;