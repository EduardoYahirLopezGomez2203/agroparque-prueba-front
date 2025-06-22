import LabelConfirmClosure from '../../../components/labels/LabelConfirmClosure';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StepperComponent from '../../../components/steppers/StepperComponent';
import FormActivityCaptureFilter from '../../layer1/formactivitiessection/FormActivityCaptureFilter';
import FormEmployeeDeployment from '../../layer1/formactivitiessection/FormEmployeeDeployment';
import BasicAdminContent from '../../layer2/basicadmincontent/BasicAdminContent';
import BasicTableComponent from '../../../components/table/BasicTableComponent';
import CheckIcon from '@mui/icons-material/Check';
import EventIcon from '@mui/icons-material/Event';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useState} from 'react';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import StraightenIcon from '@mui/icons-material/Straighten';
import useWeekLogList from '../../layer1/formweeklog/useWeekLogList';

const ActivityCapture = ({setActiveComponent}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [firstIsValid, setFirstIsValid] = useState(true);

    const { handleList: handleListWeek, processedData: processedDataWeek } = useWeekLogList();

    useEffect(() => {
        handleListWeek();
    }, [handleListWeek]);

    const initialData = {
        id_semana: null,
        id_empresa: null,
        id_finca: null,
        id_area: null,

        id_empleado: null,
        id_actividad: "",
        cantidad_avance: "",
        fecha: null
    };

    const [dataValue, setDataValue] = useState(initialData);

    const [activityCaptureData, setActivityCaptureData] = useState([]);
    console.log("ActivityCaptureData: ", activityCaptureData);

    const handleNext = () => {     
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleFirstBack = () => {
        setActiveStep(0);
        setActiveComponent('default'); // Regresa al componente menú
    };

    const firstValidation = () => {
       if (!firstIsValid) {
            return; // Logica de validación para el primer paso
       }
       handleNext();
    };

    const secondValidation = () => {
        if (!firstIsValid) {
         return; // Logica de validación para el segundo paso
        }
        handleNext();
    };

     const finallyValidation = () => {
        return false; //Logica de validación para el paso Finalizar
     };
    
    const saveValidation = () => {
        return false;   //Logica de validacion para el paso Guardar
    };

    const cancelValidation = () => {
        setActiveStep(0);
        setActiveComponent('default'); //Logica de validacion para el paso Cancelar
        return false;
    };


    const steps = [
        {
            component: <FormActivityCaptureFilter dataValue={dataValue} setDataValue={setDataValue} processedDataWeek={processedDataWeek} />,
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
            component: <Activity dataValue={dataValue} setDataValue={setDataValue} processedDataWeek={processedDataWeek} setActivityCaptureData={setActivityCaptureData} activityCaptureData={activityCaptureData} />,
            label: 'Captura',
            buttons: [
                <ButtonComponent
                    icon={<ArrowBackIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={handleBack}
                    label='Anterior'
                />, 
                <ButtonComponent
                rightIcon={<ArrowForwardIcon />}
                styleButton="contained"
                color="strongGreen"
                onClick={secondValidation} 
                label='Siguiente'
                />
            ],
        },
        {
            component: <LabelConfirmClosure title = {"¿Está seguro de cerrar la actividad?"} warning = {"No podrá volver a modificarlo."}/>,
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

    return (
        <>
            <StepperComponent elements={steps} activeStep={activeStep}/>
        </>
    );
}


const Activity =({dataValue, setDataValue, processedDataWeek, setActivityCaptureData, activityCaptureData}) => {
    const isFirstRender = useRef(true);

    const [watchWarning, setWatchWarning] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [updateData, setUpdateData] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [update, setUpdate] = useState(false);
    const [idDelete, setIdDelete] = useState(0);

    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        if (idDelete !== 0) {
            dataTable.forEach((item) => { 
                if (item.id === idDelete) {
                    setDataTable((prevData) => prevData.filter((data) => data.id !== idDelete));
                }
            });
            setIdDelete(0); // Reinicia el idDelete después de eliminar
        }
    }, [idDelete]);

    useEffect(() => {
        if (isFirstRender.current) {
            // Evita que se ejecute en el primer render
            isFirstRender.current = false;
            return;
        }

        if (Object.keys(updateData).length > 0) {
            console.log("Se obtuvieron los datos a editar de la tabla: ", updateData);
            setIsUpdate(true);
        }
    }, [updateData]);

    useEffect(() => {
        if (Object.keys(updateData).length > 0 && update) {
            console.log("Se obtuvieron los datos a editar del formulario: ", updateData);
            setUpdate(false);
            setIsUpdate(false);
        }
    }, [update]);

    const tableHeaders = [
        {
            id: 'nombre_empleado',
            text: 'Empleado',
            icon: <PersonIcon fontSize="large" color="slateBlue" />
        },
        {
            id: 'nombre_actividad',
            text: 'Actividad',
            icon: <ViewComfyIcon fontSize="large" color="slateBlue" />
        },
        {
            id: 'cantidad_avance',
            text: 'Cantidad de Avance',
            icon: <StraightenIcon fontSize="large" color="slateBlue" />
        }
    ];

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <BasicAdminContent
                showAccordion={false}
                formComponent={
                    <FormEmployeeDeployment dataValue={dataValue} setDataValue={setDataValue} processedDataWeek={processedDataWeek} setActivityCaptureData={setActivityCaptureData} />  
                }
                queryTitle="Consulta de Semana"
                queryIcon={<PersonIcon fontSize="large" color="slateBlue" />}
                formIcon={<EventIcon fontSize='large' color='slateBlue' />}
                tableComponent={
                    <BasicTableComponent 
                        information={{
                            header: tableHeaders,
                            body: activityCaptureData.map((item) => ({
                                id: item.id,
                                nombre_empleado: item.nombre_empleado,
                                nombre_actividad: item.nombre_actividad,
                                cantidad_avance: item.cantidad_avance,
                            })),
                        }}
                    />
                }
            />
        </Box>
    );
}

export default ActivityCapture;