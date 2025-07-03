import { useState, useEffect } from "react";
import { Box, Alert, Snackbar } from "@mui/material";
import StepperComponent from "../../../components/steppers/StepperComponent";
import ButtonComponent from "../../../components/buttons/ButtonComponent";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import LabelConfirmClosure from '../../../components/labels/LabelConfirmClosure';
import FormManagerCaptureFilter from "../../layer1/formactivitymanager/FormManagerCaptureFilter";
import Activity from "./Activity";
import useFilterFarm from "../../layer1/formactivitymanager/useFilterFarm";
import useManagerActivityCreate from "../../layer1/formactivitymanager/useManagerActivityCreate";
import useSnackbarAlert from "../../layer1/formactivitymanager/useSnackbarAlert";
import useActivitiesManagerList from "../../layer1/formactivitymanager/useActivitiesManagerList";

const ActivityManager = ({ onClose }) => {

    const { handleList: handleListActivities, processedData } = useActivitiesManagerList();
    const [originalData, setOriginalData ] = useState();

    // Procesamiento de datos para la tabla
    useEffect(() => {
        if(processedData.body.length > 0) {
            console.log("Ya hay datos existentes! estos son 🫣:", processedData.body);
            const tablaInicial = processedData.body.map(row => ({
                id: row.id_actividad,
                id_actividad: row.id_actividad,
                nombre_actividad: row.nombre_actividad,
                unidad_avance: row.unidad,
                precio: row.precio,
                cns_detalle_actividad: row.cns_detalle_actividad,
                operacion: 0 
            }));
            setDataTable(tablaInicial)
            setOriginalData(tablaInicial);
        } else {
            console.log("Es un registro nuevo! no hay datos 😁:", processedData.body);
            setDataTable([]);
            setOriginalData([]);
        }
    }, [processedData]);
    
    // Estados del stepper
    const [activeStep, setActiveStep] = useState(0);
    const [firstIsValid] = useState(true);
    
    // Hooks para manejar datos
    const { fetchDetalle, cargando: cargandoDetalle } = useFilterFarm();
    const { createActivities, created, cargando: guardando, error: errorCreate } = useManagerActivityCreate();

    const initialDataFilter = {
        id_finca: null,
        id_area: null
    }

    const [dataFilter, setDataFilter] = useState(initialDataFilter);

    // Estado de filtros y captura
    const initialData = {
        id_actividad: null,
        cantidad_avance: "",
        precio: "",
        nombre: ""
    };

    const [dataValue, setDataValue] = useState(initialData);

    // Estado de la tabla (Solo frontend)
    const [dataTable, setDataTable] = useState([]);

    // Estado de Alertas
    const { alertInfo, showAlert, closeAlert } = useSnackbarAlert();


    // Guarda las actividades
    const saveValidation = () => {

        // Validar que haya al menos una actividad visible (no eliminada)
        const visibles = dataTable.filter(r => r.operacion !== 3);

        if (visibles.length === 0) {
            showAlert("Agrega al menos una actividad", "warning");
            return;
        }

        console.log("finca seleccionada:", dataFilter.id_finca);
        console.log("área seleccionada:", dataFilter.id_area);

        const payload = dataTable
        .filter(r => r.operacion !== 0)
        .map(r => {
        const base = {
            id_actividad: r.id_actividad,
            precio: Number(r.precio),
            operacion: r.operacion
        };

        if (r.operacion === 2 || r.operacion === 3) {
            base.cns_detalle_actividad = r.cns_detalle_actividad;
        }
            return base;
        });

        // Si payload quedó vacío, no se debería guardar
        if (payload.length === 0) {
            showAlert("No hay cambios que guardar", "warning");
            return;
        }

        console.log("DataTable actual ✅:", dataTable);
        console.log("Payload final ✅:", payload);

        createActivities(
            dataFilter.id_finca,
            dataFilter.id_area,
            payload
        );
        return false; 
    };

    // Crea y cierra el flujo
    useEffect(() => {
        if (created) {
            showAlert("¡Guardado exitoso!", "success");
            
            // Reset de todo el flujo
            setActiveStep(0);
            onClose("default");
        }
    }, [created]);

    // Navegación del formulario
    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleFirstBack = () => {
        setActiveStep(0);
        onClose('default');
    };

    // Validaciones 
    const firstValidation = () => {
        if (!dataFilter.id_finca || !dataFilter.id_area) {
            showAlert("Selecciona finca y área antes de continuar", "warning");
            return;
        }
        // Se obtiene el detalle de la finca
        fetchDetalle(dataFilter.id_finca, dataFilter.id_area);

        // Consoles nuevos agregados
        console.log("Datos de finca obtenido 😱:", dataFilter.id_finca);
        console.log("Datos de área obtenido 😱:", dataFilter.id_area);
        handleListActivities(dataFilter.id_finca, dataFilter.id_area);

        handleNext();
    };
    const secondValidation = () => firstIsValid && handleNext();
    const cancelValidation = () => { handleFirstBack(); return false; };

    // Definición de los pasos del stepper
    const steps = [
        {
            component: (
                <FormManagerCaptureFilter
                    dataValue={dataFilter}
                    setDataValue={setDataFilter}
                />
            ),
            label: "Filtros",
            buttons: [
                <Box sx={{ flex: 1 }} key="spacer1" />,        
                <ButtonComponent
                    key="next1"
                    label="Siguiente"
                    rightIcon={<ArrowForwardIcon />}
                    styleButton="contained"
                    color="strongGreen"
                    onClick={firstValidation}
                />
            ]
        },
        {
            component: (
                <Activity
                    dataValue={dataValue}       
                    setDataValue={setDataValue} 
                    dataTable={dataTable}
                    setDataTable={setDataTable}
                    originalData={originalData}
                />
            ),
            label: "Captura",
            buttons: [
                <ButtonComponent
                    key="back2"
                    label="Anterior"
                    icon={<ArrowBackIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={handleBack}
                />,
                <ButtonComponent
                    key="next2"
                    label="Siguiente"
                    rightIcon={<ArrowForwardIcon />}
                    styleButton="contained"
                    color="strongGreen"
                    onClick={secondValidation}
                />
            ]
        },
        {
            component: <LabelConfirmClosure title="¿Está seguro de capturar las actividades?" />,      
            label: "Cierre",
            buttons: [
                <ButtonComponent
                    key="back3"
                    label="Anterior"
                    icon={<ArrowBackIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={handleBack}
                />,
                <ButtonComponent
                    key="save"
                    label="Guardar"
                    icon={<SaveIcon />}
                    styleButton="contained"
                    color="strongGreen"
                    onClick={saveValidation}
                />,
                <ButtonComponent
                    key="cancel"
                    label="Cancelar"
                    icon={<CloseIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={cancelValidation}
                />
            ]
        }
    ];

    // Es para mostrar un texto mientras se carga el 2do paso
    if (cargandoDetalle) return <div>Cargando detalle de finca…</div>;

    // Renderizado
    return (
        <>
        <StepperComponent elements={steps} activeStep={activeStep} />
        <Snackbar
            open={alertInfo.open}
            autoHideDuration={4000}
            onClose={closeAlert}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            <Alert onClose={closeAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
                {alertInfo.message}
            </Alert>
        </Snackbar>
        </>
    );
};

export default ActivityManager;
