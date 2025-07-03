import { FormTemporality, InputForm, SectionForm, SelectForm} from "../admin/Form";
import ButtonComponent from "../../../components/buttons/ButtonComponent";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddIcon from '@mui/icons-material/Add';
import useFarmCreate from "./useFarmCreate";
import { useState, useEffect } from "react";
import useCompanyList from "../formcompany/useCompanyList";
import useAreaList from "../formarea/useAreaList";
import useAreaByFarmList from "../formemployee/useAreaByFarmList";
import AddAreaModal from "../../../components/modals/AddAreaModal";
import useSnackbarAlert from "../formactivitymanager/useSnackbarAlert";
import { Snackbar, Alert } from "@mui/material";

const FormFarm = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate, responseUpdate }) => {
    const { handleCreate, datos } = useFarmCreate();
    const { handleList: handleListCompany, processedData: processedDataCompany } = useCompanyList();
    const { handleList: handleListArea, processedData: processedDataArea } = useAreaList();
    const { areas: fetchedAreas, handleList: loadAreasForFarm } = useAreaByFarmList();
    const [isOpenModalAddArea, setIsOpenModalAddArea] = useState(false);
    const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
    const  { alertInfo, showAlert, closeAlert } = useSnackbarAlert();
    const [resetModalAreas, setResetModalAreas] = useState(false);
    const [areasTableData, setAreasTableData] = useState([]);

    const handleSaveAreas = (idsArray, tableData) => {
    console.log("Áreas seleccionadas:", idsArray);
    setAreasSeleccionadas(idsArray);
    setAreasTableData(tableData); // Guardar la tabla completa
    if (isUpdate) {
        setDataValue(prev => ({
        ...prev,
        areasSeleccionadas: idsArray
        }));
    }
    };

    const onSubmitFarm = (farmData, isUpdate, handleUpdate) => {
        if(areasSeleccionadas.length === 0) {
            showAlert("Debe seleccionar al menos un área antes de enviar el formulario.", "warning");
            return;
        }

        const fullPayload = {
            ...farmData,
            areas: areasSeleccionadas
        };

        if (dataValue.celular.length !== 10) {
            showAlert("Recuerda que tu número debe tener 10 dígitos", "warning")
            return
        }

        handleCreate(fullPayload, isUpdate, handleUpdate);
    }

    const data = {
        id_empresa: null,
        nombre: '',
        descripcion: '',
        direccion: '',
        email: '',
        celular: '',
    };

    useEffect(() => {
        handleListCompany('');
    }, [handleListCompany]);

    useEffect(()=> {
        handleListArea('');
    }, [handleListArea])

    const resetForm = () => {
        setDataValue(data);
        setIsUpdate(false);
        setAreasSeleccionadas([]);

        //Señal para resetear el modal de áreas
        setResetModalAreas(true);
        setTimeout(() => setResetModalAreas(false), 0);
    };

    const [dataValue, setDataValue] = useState(data)

    const handleFormUpdate = () => {
        console.log("Datos a guardar desde FormFarm:", dataValue);
        console.log("Entro a el updateData cuando se esta creando");
        setUpdateData((prevState) => ({
            ...prevState,
            nombre: dataValue.nombre,
            direccion: dataValue.direccion,
            email: dataValue.email,
            celular: dataValue.celular,
            descripcion: dataValue.descripcion,
            id_empresa: dataValue.id_empresa,
            areas: areasSeleccionadas
        }));
        setUpdate(true);
        resetForm();
    };

    const formApi = {
        handleCreate: onSubmitFarm,
        dataValue,
        response: datos,
        responseUpdate,
        resetForm,
        isUpdate,
        handleFormUpdate
    };

    const dataCompany = processedDataCompany.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre }
    });

    useEffect(() => {
        if (isUpdate && updateData.id) {
        setDataValue({
            nombre: updateData.nombre,
            descripcion: updateData.descripcion,
            direccion: updateData.direccion,
            email: updateData.email,
            celular: updateData.celular,
            id_empresa: updateData.empresa.id
        });
        loadAreasForFarm({ id_finca: updateData.id });
        console.log("Cargando áreas para la finca:", updateData.id);
        }
    }, [isUpdate, updateData, loadAreasForFarm]);

    useEffect(() => {
    if (isUpdate) {
        const ids = fetchedAreas.map(area => area.id);
        setAreasSeleccionadas(ids);
    }
    }, [fetchedAreas, isUpdate]);
    
    const openModalAddArea = () =>{
        console.log("Abriendo modal de añadir área");
        setIsOpenModalAddArea(true);
    }

    const dataArea = processedDataArea.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre }
    }
    );

    return (
        <>
            <FormTemporality useFormApi={() => ({ ...formApi })}>
                <SectionForm title="General"
                    icon={<GrassOutlinedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
                >
                    <InputForm title="Nombre" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="nombre" />
                    <InputForm title="Descripción" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="descripcion" />
                    <SelectForm title="Empresa (Seleccione una opción)" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataCompany} fieldName="id_empresa" />
                </SectionForm>
                <SectionForm title="Contacto"
                    icon={<PhoneRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
                >
                    <InputForm title="Numero de Teléfono" isRequired type="number" setDataValue={setDataValue} dataValue={dataValue} fieldName="celular" />
                    <InputForm title="Correo Electrónico" isRequired type="email" setDataValue={setDataValue} dataValue={dataValue} fieldName="email" />
                    <InputForm title="Dirección" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="direccion" />
                </SectionForm>
                <SectionForm title="Detalle"
                    icon={<ArrowDropUpIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
                >
                    <ButtonComponent title="Área" label="Añadir Área" color="strongGreen" icon={<AddIcon />} onClick={openModalAddArea} type= {"submit"}/>
                
                </SectionForm>

                {<AddAreaModal 
                    open={isOpenModalAddArea} 
                    isEditing={isUpdate}
                    initialSelectedIds={isUpdate ? areasSeleccionadas : []}
                    setIsOpenModal={setIsOpenModalAddArea} 
                    SectionForm={SectionForm}
                    SelectForm={SelectForm} 
                    ButtonComponent={ButtonComponent} 
                    dataArea={dataArea} 
                    saveAreas={handleSaveAreas}
                    resetTrigger={resetModalAreas}
                />}
            </FormTemporality>
            <Snackbar
                open={alertInfo.open}
                autoHideDuration={3000}
                onClose={closeAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={closeAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
                    {alertInfo.message}
                </Alert>
            </Snackbar>
        </>
    );
}
export default FormFarm;
