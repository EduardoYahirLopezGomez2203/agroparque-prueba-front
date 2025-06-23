import LabelConfirmClosure from '../../../components/labels/LabelConfirmClosure';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StepperComponent from '../../../components/steppers/StepperComponent';
import FormBudgetCaptureFilter from '../../layer1/formbudgetsection/FormBudgetCaptureFilter';
import FormBudget from '../../layer1/formbudgetsection/FormBudget';
import BasicAdminContent from '../../layer2/basicadmincontent/BasicAdminContent';
import BasicTableComponent from '../../../components/table/BasicTableComponent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
import EventIcon from '@mui/icons-material/Event';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import StraightenIcon from '@mui/icons-material/Straighten';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import PastBudgetModal from '../../../components/modals/PastBudgetModal';
import useBudgetCreate from '../../layer1/formbudgetsection/useBudgetCreate';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useBudgetUpdate from '../../layer1/formbudgetsection/useBudgetUpdate';
import useBudgetDelete from '../../layer1/formbudgetsection/useBudgetDelete';
import { Snackbar, Alert } from "@mui/material";
import useSnackbarAlert from '../../layer1/formactivitymanager/useSnackbarAlert';
import useBudgetPerMonthList from '../../layer1/formbudgetsection/useBudgetPerMonthList';
import useActivitiesPastBudgetByBudgetList from '../../layer1/formactivities/useActivitiesPastBudgetByBudgetList';
import useBudgetUpdateCreateNewActivities from '../../layer1/formbudgetsection/useBudgetUpdateCreateNewActivities';
import useBudgetUpdateStatus from '../../layer1/formbudgetsection/useBudgetUpdateStatus';
import ConfirmBudgetedActivityModal from '../../../components/modals/ConfirmBudgetedActivityModal';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import useFileByBudgetedActivityList from '../../layer1/formbudgetsection/useFileByBudgetedActivityList';
import useFileBudgetedActivityByUrl from '../../layer1/formbudgetsection/useFileBudgetedActivityByUrl';

const BudgetCapture = ({setActiveComponent, dataTable, setDataTable, initialData,dataValue, setDataValue, activeStep, setActiveStep, isPastBudget, setIsPastBudget, onClose}) => {
    const [isPastBudgetModalOpen, setIsPastBudgetModalOpen] = useState(false);
    const [isConfirmBudgetedActivityModalOpen, setIsConfirmBudgetedActivityModalOpen] = useState(false);
    const { handleCreate, datos: datoBudgetCreate, error: errorBudgetCreate} = useBudgetCreate();
    const { alertInfo, showAlert, closeAlert} = useSnackbarAlert();
    const { handleUpdate, datos: datoBudgetUpdate , error: errorBudgetUpdate } = useBudgetUpdate();
    const { handleUpdate: handleUpdateStatus, datos: datoBudgetUpdateStatus, error: errorBudgetUpdateStatus} = useBudgetUpdateStatus();
    const { handleDelete, datos: datoBudgetDelete, error: errorBudgetDelete } = useBudgetDelete();
    const { handleUpdate: handleUpdateBudgetUpdateCreateNewActivities, datos: datoBudgetUpdateCreateNewActivities, error: errorBudgetUpdateCreateNewActivities} = useBudgetUpdateCreateNewActivities();
    const { handleList: handleListBudgetPerMonthList, processedData: processedDataBudgetPerMonthList } = useBudgetPerMonthList();
    const { handleList: handleListActivitiesPastBudgetByBudgetList, processedData: processedDataActivitiesPastBudgetByBudgetList } = useActivitiesPastBudgetByBudgetList();
    const { handleList: handleListActivitiesPastBudgetByBudgetToPutList, processedData: processedDataActivitiesPastBudgetByBudgetToPutList } = useActivitiesPastBudgetByBudgetList();
    const { handleList: handleFileByBudgetedActivityList, processedData: processedDataFileByBudgetedActivityList} = useFileByBudgetedActivityList();
    const { handleList: handleFileBudgetedActivityByUrl, processedData } = useFileBudgetedActivityByUrl();

    const [update, setUpdate] = useState(false);
    const [updatePastBudget, setUpdatePastBudget] = useState([]);
    const [dataIdsBudgetDelete, setDataIdsBudgetDelete] = useState([]);
    const [budgetActivities, setBudgetActivities] = useState([]);
    const [dataSecondary, setDataSecondary] = useState({
        id_mes: "",
        id_presupuesto: "",
    });
    const [rowToAutorizate, setRowToAutorizate] = useState([]);
    const [totalAccionesPendientes, setTotalAccionesPendientes] = useState(0);
    const [accionesExitosas, setAccionesExitosas] = useState([]);

    useEffect(() =>{
        if(datoBudgetCreate?.status){
            if(datoBudgetCreate.status === "success"){
                setAccionesExitosas(prev => [...prev, "presupuesto registrado"]);
            }
        }
    },[datoBudgetCreate])
    
    useEffect(() => { 
        if (errorBudgetCreate){
            showAlert("Ocurrio un error al registrar el presupuesto", "error") 
            setTotalAccionesPendientes(prev => prev - 1);
        }
    }, [errorBudgetCreate])

    useEffect(() =>{
        if(datoBudgetUpdate?.status){
            if(datoBudgetUpdate.status === "success"){
                setAccionesExitosas(prev => [...prev, "actualización de actividades"]);
            } 
        }
    },[datoBudgetUpdate])

    useEffect(() => { 
        if (errorBudgetUpdate){ 
            showAlert("Ocurrio un error al actualizar", "error")
            setTotalAccionesPendientes(prev => prev - 1); 
        }
    }, [errorBudgetUpdate])

    useEffect(() =>{
        if(datoBudgetDelete?.status){
            if(datoBudgetDelete.status === "success"){
                setAccionesExitosas(prev => [...prev, "eliminación de actividades"]);
            } 
        }
    },[datoBudgetDelete])

    useEffect(() => { 
        if (errorBudgetDelete){ 
            showAlert("Ocurrio un error al eliminar", "error")
            setTotalAccionesPendientes(prev => prev - 1);
        }
    }, [errorBudgetDelete])

    useEffect(() =>{
        if(datoBudgetUpdateStatus?.status){
            if(datoBudgetUpdateStatus.status === "success"){
                setAccionesExitosas(prev => [...prev, "actualización de estado"]);
            } 
        }
    },[datoBudgetUpdateStatus])

    useEffect(() => { 
        if (errorBudgetUpdateStatus){ 
            showAlert("Ocurrio un error al actualizar el estado", "error")
            setTotalAccionesPendientes(prev => prev - 1);
        }
    }, [errorBudgetUpdateStatus])

    useEffect(() =>{
        if(datoBudgetUpdateCreateNewActivities?.status){
            if(datoBudgetUpdateCreateNewActivities.status === "success"){
                setAccionesExitosas(prev => [...prev, "nuevas actividades presupuestadas"]);
            } 
        }
    },[datoBudgetUpdateCreateNewActivities])

    useEffect(() => { 
        if (errorBudgetUpdateCreateNewActivities){ 
            showAlert("Ocurrio un error al presupuestar nuevas actividades", "error")
            setTotalAccionesPendientes(prev => prev - 1);
        }
    }, [errorBudgetUpdateCreateNewActivities])

    useEffect(() => {
        console.log("total de acciones pendientes:",totalAccionesPendientes)
        if (
            totalAccionesPendientes > 0 &&
            accionesExitosas.length === totalAccionesPendientes
        ) {
            showAlert(
                `ACCIONES: ${accionesExitosas.join(", ")}.`,
                "success"
            );
            setTotalAccionesPendientes(0);
            setAccionesExitosas([]);
            setTimeout(() => {
                onClose(true);
            }, 3000);
        }
    }, [accionesExitosas, totalAccionesPendientes]);

    useEffect(()=>{
        if(dataSecondary.id_mes){
            handleListBudgetPerMonthList(dataSecondary.id_mes, dataValue.id_area, dataValue.id_finca);
        }
    },[dataSecondary.id_mes, dataValue.id_area, dataValue.id_finca,handleListBudgetPerMonthList]);

    useEffect(() => {
        if (dataValue.id_presupuesto && isPastBudget) {
            handleListActivitiesPastBudgetByBudgetList(dataValue.id_presupuesto);
        }
    }, [dataValue.id_presupuesto, isPastBudget, handleListActivitiesPastBudgetByBudgetList]);

    
    useEffect(() => {
        if (
            processedDataFileByBudgetedActivityList.body &&
            Array.isArray(processedDataFileByBudgetedActivityList.body) &&
            processedDataFileByBudgetedActivityList.body.length > 0
        ) {
            const url = processedDataFileByBudgetedActivityList.body[0].documento;
            console.log("url recibida", url);

            if (url) {
                handleFileBudgetedActivityByUrl(url);
            } else {
                showAlert(`No se encontró un archivo para esta actividad adicional`, "warning");
            }
        }
    }, [processedDataFileByBudgetedActivityList, handleFileBudgetedActivityByUrl]);

    useEffect(() => {
        if (processedData && processedData.body && processedData.body.length > 0) {
            const base64Full = processedData.body[0].documento;
            const fileName = processedData.body[0].nombre || "archivo_descargado";

            if (base64Full.startsWith("data:")) {
                const link = document.createElement("a");
                link.href = base64Full;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                showAlert(`No se encontró un archivo válido para descargar`, "warning");
            }
        }
    }, [processedData]);

        
    useEffect(() => {
        if (isPastBudget && processedDataActivitiesPastBudgetByBudgetList.body.length > 0) {
            setDataTable(
                processedDataActivitiesPastBudgetByBudgetList.body.map(item => ({
                    id: item.id,
                    id_actividad: item.id_actividad,
                    cns_detalle_actividad: item.cns_detalle_actividad,
                    nombre_actividad: item.nombre_actividad,
                    precio: item.precio,
                    cantidad: item.cantidad,
                    total: String(Number((item.precio * item.cantidad).toFixed(2))),
                    unidad: item.unidad,
                    cns_detalle_presupuesto: item.cns_detalle_presupuesto,
                    status_actividad: item.status_actividad,
                    isPastBudget: true,
                }))
            );
        }
    }, [isPastBudget, processedDataActivitiesPastBudgetByBudgetList.body]);

    useEffect(() => {
        if (dataSecondary.id_presupuesto) {
            handleListActivitiesPastBudgetByBudgetToPutList(dataSecondary.id_presupuesto);
        }
    }, [dataSecondary.id_presupuesto, handleListActivitiesPastBudgetByBudgetList]);
    
    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleFirstBack = () => {
        setDataValue(initialData);
        setDataTable([]);
        setBudgetActivities([]);
        setUpdatePastBudget([]);
        setDataIdsBudgetDelete([]);
        setActiveStep(0);
        setActiveComponent('default'); // Regresa al componente menú
    };

    const handleSecondBack = () => {
        if (isPastBudget) {
            setDataValue(initialData);
            setDataTable([]);
            setBudgetActivities([]);
            setUpdatePastBudget([]);
            setDataIdsBudgetDelete([]);
            setActiveStep(0);
            setActiveComponent('default');
            setRowToAutorizate([]);
            setIsPastBudgetModalOpen(false);
            setIsConfirmBudgetedActivityModalOpen(false);
            setDataSecondary({
                id_mes: "",
                id_presupuesto: "",
            });
        } else {
            setDataValue(prev => ({
                ...prev,
                id: "",
                id_actividad: "",
                cns_detalle_actividad: "",
                nombre_actividad: "",
                unidad: "",
                precio: "",
                cantidad: "",
                total: "",
                isPastBudget: false
            }));
            setDataTable([]);
            setBudgetActivities([]);
            setUpdatePastBudget([]);
            setDataIdsBudgetDelete([]);
            setUpdate(false);
            handleBack();
        }
        setIsPastBudget(false);
    };

    const firstValidation = () => {
        if(dataValue.id_semana !== "" && dataValue.id_empresa !== "" && dataValue.id_finca !== "" && dataValue.id_area !== ""){
            handleNext();
        } else {
            showAlert("Completa los campos: semana, empresa, finca y área.", "warning");
        }
    };

    const secondValidation = () => {
        if(budgetActivities.length !== 0 || dataIdsBudgetDelete.length !== 0 || updatePastBudget.length !== 0 || (isPastBudget && dataValue.status_presupuesto !== "11")){
            handleNext();
        } else {
            if(isPastBudget && dataValue.status_presupuesto === "11"){
                showAlert("No es posible continuar, ya que el presupuesto ha sido finalizado.", "warning");
            } else {
                showAlert("Completa la gestión de actividades presupuestadas para continuar.", "warning");
            }
        }
    };

    const handleOpenPastBudgetModal = () => {
        setIsPastBudgetModalOpen(true);
    };

    const finallyValidation = () => {
        saveBudget(11);
        setDataValue(initialData);
        setDataTable([]);
        setBudgetActivities([]);
        setUpdatePastBudget([]);
        setDataIdsBudgetDelete([]);
        setRowToAutorizate([]);
        setIsPastBudgetModalOpen(false);
        setIsConfirmBudgetedActivityModalOpen(false);
        setDataSecondary({
            id_mes: "",
            id_presupuesto: "",
        });
        // setActiveStep(0);
        // setActiveComponent('default');
        setIsPastBudget(false);
    };

    const saveValidation = () => {
        saveBudget(10);
        setDataTable([]);
        setBudgetActivities([]);
        setUpdatePastBudget([]);
        setDataIdsBudgetDelete([]);
        setRowToAutorizate([]);
        setIsPastBudgetModalOpen(false);
        setIsConfirmBudgetedActivityModalOpen(false);
        setDataSecondary({
            id_mes: "",
            id_presupuesto: "",
        });
        // setActiveStep(0);
        // setActiveComponent('default');
        setIsPastBudget(false);
    };

    const saveBudget = async (status) => {
        let total = 0;
        setAccionesExitosas([]);

        if (dataIdsBudgetDelete.length !== 0){
            total++;
        } 
        if (updatePastBudget.length !== 0) {
            total++;
        }
        if (budgetActivities.length !== 0 && isPastBudget){
            total++;
        }
        if (budgetActivities.length !== 0 && !isPastBudget){
            total++;
        } 
        if (
            budgetActivities.length === 0 &&
            updatePastBudget.length === 0 &&
            dataIdsBudgetDelete.length === 0 &&
            isPastBudget
        ){
            total++;
        } 

        setTotalAccionesPendientes(total);
        
        if(dataIdsBudgetDelete.length !== 0){
            await handleDelete(dataIdsBudgetDelete,dataValue.id_presupuesto,status);
            //accionesPendientes.current.push("eliminar");
        }

        if(updatePastBudget.length !== 0){
            await handleUpdate(updatePastBudget.map(prev =>({ 
                id_actividad: prev.id_actividad,
                cns_detalle_actividad: prev.cns_detalle_actividad,
                cns_detalle_presupuesto: prev.cns_detalle_presupuesto,
                precio: prev.precio,
                cantidad: prev.cantidad,
                status: prev.status_actividad ? prev.status_actividad : 20
            })),status,dataValue.id_presupuesto);
            //accionesPendientes.current.push("actualizar");
        }

        if(budgetActivities.length !== 0 && isPastBudget){
            await handleUpdateBudgetUpdateCreateNewActivities(budgetActivities.map(prev =>({ 
                id_actividad: prev.id_actividad,
                cns_detalle_actividad: prev.cns_detalle_actividad,
                precio: prev.precio,
                cantidad: prev.cantidad,
                status: 20
            })),
                dataValue.id_presupuesto,
                status
            );
            //accionesPendientes.current.push("presupuestar");
        }

        if(budgetActivities.length !== 0 && !isPastBudget){
            await handleCreate(budgetActivities.map(prev =>({           
                id_actividad: prev.id_actividad,
                cns_detalle_actividad: prev.cns_detalle_actividad,
                precio: prev.precio,
                cantidad: prev.cantidad,
                status: 20 
            })),
                status,
                dataValue.id_semana,
                dataValue.id_finca,
                dataValue.cns_detalle_finca
            );
            //accionesPendientes.current.push("crear");
        }

        if(budgetActivities.length === 0 && budgetActivities.length === 0 && updatePastBudget.length === 0 && dataIdsBudgetDelete.length === 0 && isPastBudget){
            await handleUpdateStatus(status, dataValue.id_presupuesto);
            //accionesPendientes.current.push("actualizar estado");
        }

    }

    const cancelValidation = () => {
        setActiveStep(0);
        setDataValue(initialData);
        setDataTable([]);
        setDataTable([]);
        setBudgetActivities([]);
        setUpdatePastBudget([]);
        setDataIdsBudgetDelete([]);
        setRowToAutorizate([]);
        setIsPastBudgetModalOpen(false);
        setIsConfirmBudgetedActivityModalOpen(false);
        setDataSecondary({
            id_mes: "",
            id_presupuesto: "",
        });
        setActiveComponent('default'); //Logica de validacion para el paso Cancelar
        return false;
    };


    const steps = [
        {
            component: <FormBudgetCaptureFilter dataValue={dataValue} setDataValue={setDataValue} />,
            label: 'Filtros',
            buttons: [
                <ButtonComponent
                    icon={<ArrowBackIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={handleFirstBack}
                    label='Anterior'
                />,
                <ButtonComponent
                    rightIcon={<ArrowForwardIcon />}
                    styleButton="contained"
                    color="strongGreen"
                    onClick={firstValidation}
                    label='Siguiente'
                />,
            ],
        },
        {
            component: <Budget dataValue={dataValue} setDataValue={setDataValue} dataTable={dataTable} setDataTable={setDataTable} setUpdate={setUpdate} update={update} setDataIdsBudgetDelete={setDataIdsBudgetDelete} setBudgetActivities={setBudgetActivities} setUpdatePastBudget={setUpdatePastBudget} showAlert = {showAlert} isPastBudget={isPastBudget} setIsConfirmBudgetedActivityModalOpen = {setIsConfirmBudgetedActivityModalOpen} setRowToAutorizate = {setRowToAutorizate}/>,
            label: 'Captura',
            buttons: [
                <ButtonComponent
                    icon={<ArrowBackIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={handleSecondBack}
                    label='Anterior'
                />,
                (dataValue.status_presupuesto === "10" && <ButtonComponent
                    styleButton="contained"
                    onClick={handleOpenPastBudgetModal}
                    label='Visualizar Presupuesto Pasado'
                    sx={{width:"300px",
                        height:"35px",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',   }}
                />),
                (dataValue.status_presupuesto === "10" &&<ButtonComponent
                    rightIcon={<ArrowForwardIcon />}
                    styleButton="contained"
                    color="strongGreen"
                    onClick={secondValidation}
                    label='Siguiente'
                />)
            ],
        },
        {
            component: <LabelConfirmClosure title = {"¿Está seguro de cerrar el presupuesto?"} warning = {"No podrá volver a modificarlo."}/>,
            label: 'Cierre',
            buttons: [
                <ButtonComponent
                    icon={<ArrowBackIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={handleBack}
                    label='Anterior'
                />,
                <ButtonComponent
                    icon={<CheckIcon />}
                    styleButton="contained"
                    color="vividBlue"
                    onClick={finallyValidation}
                    label='Finalizar'
                />,
                <ButtonComponent
                    icon={<SaveIcon />}
                    styleButton="outlined"
                    color="strongGreen"
                    onClick={saveValidation}
                    label='Guardar'
                />,
                <ButtonComponent
                    icon={<CloseIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={cancelValidation}
                    label='Cancelar'
                />
            ],
        },
    ];

    const onAcceptAutorization = () => {
        setUpdatePastBudget(prev => {
            if (!rowToAutorizate) return prev;
            const updatedRow = { ...rowToAutorizate, status_actividad: 24 };
            const exists = prev.some(item => item.id === updatedRow.id);
            return exists
                ? prev.map(item => item.id === updatedRow.id ? updatedRow : item)
                : [...prev, updatedRow];
        });
        showAlert("Agregado a aceptados.", "success");
        setIsConfirmBudgetedActivityModalOpen(false);
    };

    const onRejectAutorization = () => {
        setUpdatePastBudget(prev => {
            if (!rowToAutorizate) return prev;
            const updatedRow = { ...rowToAutorizate, status_actividad: 23 };
            const exists = prev.some(item => item.id === updatedRow.id);
            return exists
                ? prev.map(item => item.id === updatedRow.id ? updatedRow : item)
                : [...prev, updatedRow];
        });
        showAlert("Agregado a rechazados.", "warning");
        setIsConfirmBudgetedActivityModalOpen(false);
    }

    const onViewFile = () => {
        if (
            rowToAutorizate &&
            dataValue.id_presupuesto &&
            rowToAutorizate.cns_detalle_presupuesto
        ) {
            handleFileByBudgetedActivityList(
                dataValue.id_presupuesto,
                rowToAutorizate.cns_detalle_presupuesto
            );
        }
    }

    const dataPastBudgetPerMonth = processedDataBudgetPerMonthList.body.map((item) => ({
        ...item,
        id: item.id,
        numero_semana: item.numero_semana,
        presupuesto: item.presupuesto,
        id_presupuesto: item.id_presupuesto
    }));
    

    const dataActivityByBudgetToPut = processedDataActivitiesPastBudgetByBudgetToPutList.body.map(item => ({
        id: item.id,
        id_actividad: item.id_actividad,
        cns_detalle_actividad: item.cns_detalle_actividad,
        cns_detalle_finca: item.cns_detalle_finca,
        nombre_actividad: item.nombre_actividad,
        precio: item.precio,
        cantidad: item.cantidad,
        total: String(Number((item.precio * item.cantidad).toFixed(2))),
        unidad: item.unidad,
        presupuesto: item.presupuesto,
        isPastBudget: false,
    }));

    return (
        <>
            <StepperComponent elements={steps} activeStep={activeStep}/>
            <PastBudgetModal isOpen={isPastBudgetModalOpen} setIsPastBudgetModalOpen={setIsPastBudgetModalOpen} dataSecondary={dataSecondary} setDataSecondary = {setDataSecondary}  dataPastBudgetPerMonth = {dataPastBudgetPerMonth} dataActivityByBudgetToPut = {dataActivityByBudgetToPut} setDataTable = {setDataTable} setBudgetActivities = {setBudgetActivities} setDataValue = {setDataValue} dataTable={dataTable} showAlert = {showAlert}/>
            <ConfirmBudgetedActivityModal open={isConfirmBudgetedActivityModalOpen} setIsConfirmBudgetedActivityModalOpen = {setIsConfirmBudgetedActivityModalOpen} onAccept={onAcceptAutorization} onReject={onRejectAutorization} onViewFile={onViewFile}/>
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


const Budget =({dataValue, setDataValue, dataTable, setDataTable, setUpdate, update, setDataIdsBudgetDelete, setBudgetActivities, setUpdatePastBudget, showAlert, isPastBudget, setIsConfirmBudgetedActivityModalOpen, setRowToAutorizate}) => {

    const tableHeaders = [
        {
            id: 'nombre_actividad',
            text: 'Actividad',
            icon: <ViewComfyIcon fontSize='large'  color='slateBlue' />
        },
        {
            id: 'unidad',
            text: 'Unidad',
            icon: <StraightenIcon fontSize='large'  color='slateBlue' />
        },
        {
            id: 'precio',
            text: 'Precio',
            icon: <MonetizationOnIcon fontSize="large" color="slateBlue" />
        },
        {
            id: 'cantidad',
            text: 'Cantidad',
            icon: <AlignHorizontalLeftIcon fontSize="large" color="slateBlue" />
        },
        {
            id: 'total',
            text: 'Total',
            icon: <MonetizationOnIcon fontSize="large" color="slateBlue" />
        }
    ];

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <BasicAdminContent
                showAccordion={false}
                formTitle={ "Captura de Presupuesto"}
                formComponent={
                    <FormBudget dataValue={dataValue} setDataValue={setDataValue} dataTable = {dataTable} setDataTable={setDataTable} isUpdate={update} setUpdate={setUpdate} setBudgetActivities={setBudgetActivities} setUpdatePastBudget={setUpdatePastBudget} showAlert = {showAlert}/>
                }
                queryTitle="Presupuesto Capturado"
                queryIcon={<CalendarMonthIcon fontSize="large" color="slateBlue" />}
                formIcon={<EventIcon fontSize='large' color='slateBlue' />}
                tableComponent={
                    <BasicTableComponent
                        information={{
                            header: tableHeaders,
                            body: dataTable
                        }}
                        items={[
                            {
                                icon: <DeleteIcon color="slateBlue" />,
                                text: "Eliminar",
                                onClick: (row) => {
                                    if(dataValue.status_presupuesto === "10"){
                                        if (!row.isPastBudget) {
                                            setBudgetActivities(prev => prev.filter(item => item.id !== row.id))
                                            setDataTable(prev => prev.filter(item => item.id !== row.id));
                                        } else {
                                            setUpdatePastBudget(prev => prev.filter(item => item.id !== row.id));
                                            setDataIdsBudgetDelete(prev => [
                                                ...prev,
                                                row.cns_detalle_presupuesto ? row.cns_detalle_presupuesto : "sin cns"
                                            ]);
                                            setDataTable(prev => prev.filter(item => item.id !== row.id));
                                        }
                                    } else {
                                        showAlert("No es posible eliminar esta actividad presupuestada, ya que el presupuesto ha sido finalizado.", "warning");
                                    }
                                }
                            },
                            {
                                icon: <EditIcon color="slateBlue" />,
                                text: "Editar",
                                onClick: (row) => {
                                    if(dataValue.status_presupuesto === "10"){
                                        setDataValue({
                                            ...dataValue,
                                            id: row.id,
                                            id_actividad: row.id_actividad,
                                            cns_detalle_actividad: row.cns_detalle_actividad,
                                            cns_detalle_finca: row.cns_detalle_finca,
                                            cns_detalle_presupuesto: row.cns_detalle_presupuesto,
                                            nombre_actividad: row.nombre_actividad,
                                            unidad: row.unidad,
                                            precio: row.precio,
                                            cantidad: row.cantidad,
                                            total: row.total,
                                            isPastBudget: row.isPastBudget
                                        });
                                        setUpdate(true);
                                    } else {
                                        showAlert("No es posible actualizar esta actividad presupuestada, ya que el presupuesto ha sido finalizado.", "warning");
                                    }
                                }
                            },(isPastBudget && {
                                icon: <VpnKeyIcon color="slateBlue" sx={{ transform: 'rotate(-45deg)' }}/>,
                                text: "Modificar autorización",
                                onClick: (row) => {
                                    if(dataValue.status_presupuesto === "10"){
                                        if(String(row.status_actividad) !== "23" && String(row.status_actividad) !== "24" && String(row.status_actividad) !== "20" && row.isPastBudget){
                                                setRowToAutorizate(row);
                                                setIsConfirmBudgetedActivityModalOpen(true);
                                        } else {
                                            showAlert("La autorización no puede ser modificada, ya que no es una actividad adicional.", "warning");
                                        }
                                    } else {
                                        showAlert("No es posible modificar la autorización, ya que el presupuesto ha sido finalizado.", "warning");
                                    }
                                }
                            })
                        ]}
                        isPastBudget = {isPastBudget}
                    />
                }
            />
        </Box>
    );
}

export default BudgetCapture;
