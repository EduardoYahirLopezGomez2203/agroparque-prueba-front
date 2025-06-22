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
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from '@mui/icons-material/Person';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import StraightenIcon from '@mui/icons-material/Straighten';
import SnackbarComponent from '../../../components/snackbar/SnackbarComponent';
import useSnackbarOption from '../../../hooks/useSnackbarOption';
import useActivityCaptureCreate from '../../layer1/formactivitiessection/useActivityCaptureCreate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ActivityCapture = ({ setActiveComponent, onClose }) => {

    const [activeStep, setActiveStep] = useState(0);

    const { snackbarOptions, setSnackbarOptions, showMessage } = useSnackbarOption();
    const { handleCreate, datos, error } = useActivityCaptureCreate()
    const didMount = useRef(null);

    const [modeUpdate, setModeUpdate] = useState(false)

    const filterInitialData = {
        id_semana: null,
        id_empresa: null,
        id_finca: null,
        id_area: null,
    }

    const initialData = {
        id_trabajador: null,
        id_actividad: null,
        cantidad_avance: "",
        fecha: null
    };

    const [dataValue, setDataValue] = useState(initialData);
    const [filterData, setFilterData] = useState(filterInitialData)
    const [cleanData, setCleanData] = useState([]) // Dejamos la data lista para mandarla al back
    const [activityCaptureData, setActivityCaptureData] = useState([]);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return; // No ejecutar la lógica la primera vez
        }
        if (error) {
            showMessage("Ocurrio un error al crear el recurso", "error")
            return
        }
        if (datos?.data?.status) {
            showMessage("¡Registro creado con éxito!", "success")
            setTimeout(() => {
                onClose(true)
            }, 650);
        } else {
            showMessage("Ocurrio un error al crear el recurso", "error")
        }
    }, [datos, error])

    useEffect(() => {
        if (modeUpdate)
            return

        const isFindDuplicate = cleanData.find(element =>
            `${element.id_actividad}${element.id_trabajador}` === `${dataValue.id_actividad}${dataValue.id_trabajador}`
        )
        if (isFindDuplicate) {
            showMessage("La actividad ya fue asignada al trabajador", "warning")
            setDataValue((element) => ({
                ...element,
                id_actividad: null
            }))
        }
    }, [dataValue.id_actividad, dataValue.id_trabajador])

    useEffect(() => {
        if (dataValue.cantidad_avance < 0) {
            showMessage("Ingresa una cantidad de avance aceptada", "warning")
            setDataValue((element) => ({
                ...element,
                cantidad_avance: ""
            }))
        }
    }, [dataValue.cantidad_avance])

    useEffect(() => {
        const data = activityCaptureData.map(data => ({
            id_trabajador: data.trabajador.id,
            id_actividad: data.actividad.id,
            avance: `${data.cantidad_avance}%`,
            fecha: data.fecha
        }))

        setCleanData(data)
    }, [activityCaptureData])

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
        if (Object.values(filterData).some(value => value === null)) {
            showMessage("Favor de llenar todos los filtros", "warning")
            return;
        }
        handleNext();
    };

    const secondValidation = () => {
        if (activityCaptureData.length === 0) {
            showMessage("Añade datos para poder pasar al siguiente paso", "warning")
            return;
        }
        handleNext();
    };

    const finallyValidation = () => {
        handleCreate(cleanData, filterData.id_semana, filterData.id_finca, filterData.id_area)
    };

    const saveValidation = () => {
        handleCreate(cleanData, filterData.id_semana, filterData.id_finca, filterData.id_area)
    };

    const cancelValidation = () => {
        setActiveStep(0);
        setActiveComponent('default'); //Logica de validacion para el paso Cancelar
    };

    const steps = [
        {
            component:
                <FormActivityCaptureFilter
                    dataValue={filterData}
                    setDataValue={setFilterData}
                />,
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
            component:
                <Activity
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                    filterData={filterData}
                    setActivityCaptureData={setActivityCaptureData}
                    modeUpdate={modeUpdate}
                    setModeUpdate={setModeUpdate}
                    activityCaptureData={activityCaptureData}
                />,
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
            component: <LabelConfirmClosure title={"¿Está seguro de cerrar la actividad?"} warning={"No podrá volver a modificarlo."} />,
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
            <StepperComponent elements={steps} activeStep={activeStep} />
            <SnackbarComponent snackbarOptions={snackbarOptions} setSnackbarOptions={setSnackbarOptions} />
        </>
    );
}

const Activity = ({ dataValue, setDataValue, filterData, setActivityCaptureData, activityCaptureData, modeUpdate, setModeUpdate }) => {

    const handleEditRow = (row) => {
        setModeUpdate(true)
        setDataValue(({
            //id: row.actividad.id, // Agregando el id como pivote para verificar
            id_trabajador: row.trabajador.id,
            id_actividad: row.actividad.id,
            cantidad_avance: row.cantidad_avance,
            fecha: row.fecha
        }))
    };

    const handleDeleteRow = (row) => {
        // Recordemos que el id de la actividad es el id de la tabla por el modelo de negocio
        setActivityCaptureData((prev) =>
            prev.filter(activityCaputreData => `${activityCaputreData.actividad.id}${activityCaputreData.trabajador.id}` !== row.id)
        )
    };

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
        },
        {
            id: 'fecha',
            text: 'Fecha',
            icon: <CalendarMonthIcon fontSize="large" color="slateBlue" />
        }
    ];

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <BasicAdminContent
                showAccordion={false}
                formComponent={
                    <FormEmployeeDeployment
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        modeUpdate={modeUpdate}
                        setModeUpdate={setModeUpdate}
                        filterData={filterData}
                        setActivityCaptureData={setActivityCaptureData}
                    />
                }
                queryTitle="Consulta de Semana"
                queryIcon={<PersonIcon fontSize="large" color="slateBlue" />}
                formIcon={<EventIcon fontSize='large' color='slateBlue' />}
                tableComponent={
                    <BasicTableComponent
                        information={{
                            header: tableHeaders,
                            body: activityCaptureData.map((item) => ({
                                ...item,
                                // El id se forma de la actividad y trabajador.
                                id: `${item.actividad.id}${item.trabajador.id}`,
                                nombre_empleado: item.trabajador.nombre,
                                nombre_actividad: item.actividad.nombre,
                                cantidad_avance: item.cantidad_avance
                            })),
                        }}
                        items={[
                            {
                                icon: <EditIcon color="slateBlue" />,
                                text: "Editar",
                                onClick: handleEditRow
                            },
                            {
                                icon: <DeleteIcon color="slateBlue" />,
                                text: "Eliminar",
                                onClick: handleDeleteRow
                            }
                        ]}
                    />
                }
            />
        </Box>
    );
}

export default ActivityCapture;