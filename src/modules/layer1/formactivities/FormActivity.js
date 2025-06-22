import Form, { InputForm, SectionForm, SelectForm } from "../admin/Form";
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import useActivityCreate from "./useActivityCreate";
import { useState, useEffect } from "react";
import useAdvanceUnitList from "../formadvanceunit/useAdvanceUnitList";
import useTypeActivityList from "./useTypeActivityList";

const FormActivity = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate, responseUpdate }) => {
    const { handleCreate, datos } = useActivityCreate();
    const data = { nombre: '', descripcion: '' , clave_presupuestal: '', id_unidad_avance: '', id_tipo_actividad: ''}
    const [dataValue, setDataValue] = useState(data);
    const { handleList: handleListAdvanceUnit, processedData: processedDataAdvanceUnit } = useAdvanceUnitList();
    const { handleList: handleListTypeActivity, processedData: processedDataTypeActivity } = useTypeActivityList();

    const resetForm = () => {
        setDataValue(data);
        setIsUpdate(false);
    }

    useEffect(() => {
        handleListAdvanceUnit('');
    }, [handleListAdvanceUnit]);

    useEffect(() => {
        handleListTypeActivity('');
    }, [handleListTypeActivity]);


    useEffect(() => {
        if (isUpdate) {
            setDataValue((prevState) => ({
                ...prevState,
                nombre: updateData.nombre,
                descripcion: updateData.descripcion,
                clave_presupuestal: updateData.clave_presupuestal,
                id_unidad_avance: updateData.id_unidad_avance,
                id_tipo_actividad: updateData.id_tipo_actividad
            }));
        }
    }, [isUpdate]);

    const handleFormUpdate = () => {
        setUpdateData((prevState) => ({
            ...prevState,
            nombre: dataValue.nombre,
            descripcion: dataValue.descripcion,
            clave_presupuestal: dataValue.clave_presupuestal,
            id_unidad_avance: dataValue.id_unidad_avance,
            id_tipo_actividad: dataValue.id_tipo_actividad
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

    const dataAdvanceUnit = processedDataAdvanceUnit.body.map(body => {
        const id = body.id;
        const nombre = body.medicion;
        
        return { id, nombre }
    });

    const dataTypeActivity = processedDataTypeActivity.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;
        
        return { id, nombre }
    });

    return (
        <Form useFormApi={() => ({ ...formApi })}>
            <SectionForm title="General" direction="column"
                icon={<CasesRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <InputForm title="Nombre" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="nombre" />
                <InputForm title="Descripción" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="descripcion" />
                <InputForm title="Clave Presupuestal" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="clave_presupuestal" />
            </SectionForm>

            <SectionForm title="Unidad y Clasificación" direction="column"
                icon={<SquareFootIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <SelectForm title="Unidad de Avance (Seleccione una opción)" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataAdvanceUnit} fieldName="id_unidad_avance" />
                <SelectForm title="Tipo de actividad (Seleccione una opción)" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataTypeActivity} fieldName="id_tipo_actividad" />
            </SectionForm>
            
        </Form>
    );
};

export default FormActivity;