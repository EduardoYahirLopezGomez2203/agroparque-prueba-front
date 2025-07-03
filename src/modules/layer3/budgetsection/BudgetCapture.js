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
import { useEffect, useState} from 'react';
import { Box } from '@mui/material';
import PastBudgetModal from '../../../components/modals/PastBudgetModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar, Alert } from "@mui/material";
import useSnackbarAlert from '../../layer1/formactivitymanager/useSnackbarAlert';
import useBudgetPerMonthList from '../../layer1/formbudgetsection/useBudgetPerMonthList';
import useActivitiesPastBudgetByBudgetList from '../../layer1/formactivities/useActivitiesPastBudgetByBudgetList';
import ConfirmBudgetedActivityModal from '../../../components/modals/ConfirmBudgetedActivityModal';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import useFileByBudgetedActivityList from '../../layer1/formbudgetsection/useFileByBudgetedActivityList';
import useFileBudgetedActivityByUrl from '../../layer1/formbudgetsection/useFileBudgetedActivityByUrl';
import useConfirmBudgetByWeekFarmArea from '../../layer1/formbudgetsection/useConfirmBudgetByWeekFarmArea';
import useBudgetAllActions from '../../layer1/formbudgetsection/useBudgetAllActions';

const BudgetCapture = ({setActiveComponent, dataTable, setDataTable, initialData,dataValue, setDataValue, activeStep, setActiveStep, setIsPastBudget ,isPastBudget, onClose}) => {
    const [isPastBudgetModalOpen, setIsPastBudgetModalOpen] = useState(false);
    const [isConfirmBudgetedActivityModalOpen, setIsConfirmBudgetedActivityModalOpen] = useState(false);
    const { alertInfo, showAlert, closeAlert} = useSnackbarAlert();
    const { handleList: handleListBudgetPerMonthList, processedData: processedDataBudgetPerMonthList } = useBudgetPerMonthList();
    const { handleList: handleListActivitiesPastBudgetByBudgetList, processedData: processedDataActivitiesPastBudgetByBudgetList } = useActivitiesPastBudgetByBudgetList();
    const { handleList: handleListActivitiesPastBudgetByBudget2List, processedData: processedDataActivitiesPastBudgetByBudget2List } = useActivitiesPastBudgetByBudgetList();
    const { handleList: handleListActivitiesPastBudgetByBudgetToPutList, processedData: processedDataActivitiesPastBudgetByBudgetToPutList } = useActivitiesPastBudgetByBudgetList();
    const { handleList: handleFileByBudgetedActivityList, processedData: processedDataFileByBudgetedActivityList} = useFileByBudgetedActivityList();
    const { handleList: handleFileBudgetedActivityByUrl, processedData } = useFileBudgetedActivityByUrl();
    const { handleList: handleConfirmBudgetByWeekFarmArea, processedData: processedDataConfirmBudgetByWeekFarmArea} = useConfirmBudgetByWeekFarmArea();
    const { handleCreateUpdateDelete, datos, error} = useBudgetAllActions();

    const [update, setUpdate] = useState(false);
    const [updatePastBudget, setUpdatePastBudget] = useState([]); //Array que contiene las actividades a actualizar
    const [dataIdsBudgetDelete, setDataIdsBudgetDelete] = useState([]); //Array que contiene los ids de actividades a eliminar
    const [budgetActivities, setBudgetActivities] = useState([]); //Array que contiene las actividades presupuestadas nuevas
    const [dataSecondary, setDataSecondary] = useState({
        id_mes: "",
        id_presupuesto: "",
    });

    const [rowToAutorizate, setRowToAutorizate] = useState([]);

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
            const fileName = processedData.body[0].nombre || "archivo_de_actividad_adicional";

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
                    precio: item.precio_pasado,
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

    useEffect(() => {
        if(dataValue.id_semana && dataValue.id_finca && dataValue.id_area){
            console.log("entro al efecto de llamda de la comprobacion del presupuesto")
            handleConfirmBudgetByWeekFarmArea(dataValue.id_semana, dataValue.id_finca, dataValue.id_area);
        }
    },[dataValue.id_semana, dataValue.id_finca, dataValue.id_area, handleConfirmBudgetByWeekFarmArea]);

    useEffect(() => {
        console.log("ento al efecto para setear a la tabla: ",processedDataActivitiesPastBudgetByBudget2List);
        if (processedDataActivitiesPastBudgetByBudget2List.body.length > 0) {
            setDataTable(
                processedDataActivitiesPastBudgetByBudget2List.body.map(item => ({
                    id: item.id,
                    id_actividad: item.id_actividad,
                    cns_detalle_actividad: item.cns_detalle_actividad,
                    nombre_actividad: item.nombre_actividad,
                    precio: item.precio_pasado,
                    cantidad: item.cantidad,
                    total: String(Number((item.precio * item.cantidad).toFixed(2))),
                    unidad: item.unidad,
                    cns_detalle_presupuesto: item.cns_detalle_presupuesto,
                    status_actividad: item.status_actividad,
                    isPastBudget: true,
                }))
            );
            setIsPastBudget(true);
        }
    }, [processedDataActivitiesPastBudgetByBudget2List.body]);

    useEffect(()=>{
        if(datos){
            if(datos.status === "success"){
                showAlert(`Acción realizada.`,"success");
                setTimeout(() => {
                    onClose(true);
                },2500)
            }
        }
    },[datos]);

    useEffect(() => { 
        if (error){ 
            if (dataValue?.status_presupuesto === "25") {
               showAlert(`No se pudo finalizar el presupuesto. Es posible que falte verificar alguna actividad adicional.`, "error");
            } else {
                showAlert(`Hubo algun error al realizar la acción.`,"error");
            }
            setTimeout(() => {
                onClose(true);
            },2500)
        }
    }, [error]);

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

    const verifPastBudgetIfExist = processedDataConfirmBudgetByWeekFarmArea.body.map(item => ({
        item,
        id_presupuesto: item?.id_presupuesto ?? null,
        cns_detalle_finca: item?.detalle_finca.id,
        status: item?.status ?? null,
    }));


    const firstValidation = () => {
        
        const todosSonNull = verifPastBudgetIfExist.every(item => item === null);
        const statusFinally =  verifPastBudgetIfExist.every(item => String(item?.status.id) !== "10");

        if (todosSonNull) {
            if (
            dataValue.id_semana !== "" &&
            dataValue.id_empresa !== "" &&
            dataValue.id_finca !== "" &&
            dataValue.id_area !== ""
            ) {
                handleNext();
            } else {
                showAlert("Completa los campos: semana, empresa, finca y área.", "warning");
            }
        } else if(statusFinally) {
            showAlert("Los datos ya estan en un presupuesto finalizado, elige otros.", "warning");
        } else {
            console.log("respuesta del presupuesto encontrado: "+ verifPastBudgetIfExist);
            setDataValue(prev => ({
                ...prev,
                id_presupuesto: verifPastBudgetIfExist[0].id_presupuesto || "",
                cns_detalle_finca: verifPastBudgetIfExist[0]?.cns_detalle_finca || "",
            }));
            handleListActivitiesPastBudgetByBudget2List(verifPastBudgetIfExist[0]?.id_presupuesto);
            handleNext();
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
        setIsPastBudget(false);
    };

    const saveBudget = async (status) => {
        const activities = {
            elementos: [
                ...budgetActivities.map(item => ({
                    id_actividad: item.id_actividad,
                    cns_detalle_actividad: item.cns_detalle_actividad,
                    precio: item.precio,
                    cantidad: item.cantidad,
                    cns_detalle_presupuesto: item.cns_detalle_presupuesto,
                    status: 20,
                    operacion: 1,
                })),
                ...updatePastBudget.map(item => ({
                    id_actividad: item.id_actividad,
                    cns_detalle_actividad: item.cns_detalle_actividad,
                    precio: item.precio,
                    cantidad: item.cantidad,
                    cns_detalle_presupuesto: item.cns_detalle_presupuesto,
                    status: item?.status_actividad || 20,
                    operacion: 2,
                })),
                ...dataIdsBudgetDelete.map(id => ({
                    cns_detalle_presupuesto: id,
                    cns_detalle_actividad: 1,
                    id_actividad: 1,
                    status: 20,
                    cantidad: 1,
                    precio: 1,
                    operacion: 3,
                }))
            ]
        };

        console.log("Actividades a enviar al endpoint:", activities);

        // Envío al backend
        await handleCreateUpdateDelete(
            activities,
            dataValue?.id_presupuesto || "0",
            status,
            dataValue.id_semana,
            dataValue.id_finca,
            dataValue.cns_detalle_finca
        );
    };

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
                ((dataValue.status_presupuesto === "10") && <ButtonComponent
                    styleButton="contained"
                    onClick={handleOpenPastBudgetModal}
                    label='Visualizar Presupuesto Pasado'
                    sx={{width:"300px",
                        height:"35px",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',   }}
                />),
                ((dataValue.status_presupuesto === "10" || dataValue.status_presupuesto === "25") &&<ButtonComponent
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
    

    const dataActivityByBudgetToPut = processedDataActivitiesPastBudgetByBudgetToPutList.body
    .filter(item => String(item.status_actividad) === "20")
    .map(item => ({
        id: item.id,
        id_actividad: item.id_actividad,
        cns_detalle_actividad: item.cns_detalle_actividad,
        cns_detalle_finca: item.cns_detalle_finca,
        nombre_actividad: item.nombre_actividad,
        precio_pasado: item.precio_pasado,
        precio: item.precio,
        cantidad: item.cantidad,
        total: String(Number((item.precio * item.cantidad).toFixed(2))),
        unidad: item.unidad,
        presupuesto: item.presupuesto,
        isPastBudget: false,
        status_actividad: item.status_actividad,
    }));

    return (
        <>
            <StepperComponent elements={steps} activeStep={activeStep}/>
            <PastBudgetModal isOpen={isPastBudgetModalOpen} setIsPastBudgetModalOpen={setIsPastBudgetModalOpen} dataSecondary={dataSecondary} setDataSecondary = {setDataSecondary}  dataPastBudgetPerMonth = {dataPastBudgetPerMonth} dataActivityByBudgetToPut = {dataActivityByBudgetToPut} setDataTable = {setDataTable} setBudgetActivities = {setBudgetActivities} setDataValue = {setDataValue} dataTable={dataTable} showAlert = {showAlert}/>
            <ConfirmBudgetedActivityModal open={isConfirmBudgetedActivityModalOpen} setIsConfirmBudgetedActivityModalOpen = {setIsConfirmBudgetedActivityModalOpen} onAccept={onAcceptAutorization} onReject={onRejectAutorization} onViewFile={onViewFile}/>
            <Snackbar
                open={alertInfo.open}
                autoHideDuration={2500}
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
                                    if(dataValue.status_presupuesto === "10" || dataValue.status_presupuesto === "22"){
                                        setDataValue({
                                            ...dataValue,
                                            id: row.id,
                                            id_actividad: row.id_actividad,
                                            cns_detalle_actividad: row.cns_detalle_actividad,
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
                                    if(dataValue.status_presupuesto === "25"){
                                        if((String(row.status_actividad) === "25" || String(row.status_actividad) === "23" || String(row.status_actividad) === "24") && row.isPastBudget){
                                                setRowToAutorizate(row);
                                                setIsConfirmBudgetedActivityModalOpen(true);
                                        } else {
                                            showAlert("La autorización no puede ser modificada, ya que no es una actividad adicional.", "warning");
                                        }
                                    } else {
                                        showAlert("No es posible modificar la autorización, ya que el presupuesto no esta en estado de actividades adicionales creadas.", "warning");
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
