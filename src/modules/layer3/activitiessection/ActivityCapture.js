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
import useFilterActivityCaptureByWeekFarmArea from '../../layer1/formactivitiessection/useFilterActivityCaptureByWeekFarmArea';
import useBudgetExists from '../../layer1/formbudgetsection/useBudgetExists';

/*
  Manejamos 4 tipos de operaciones:
  1.- insertar
  2.- actualizar
  3.- eliminar
  4.- actividad adicional
*/
const ActivityCapture = ({ setActiveComponent, onClose, initialStep = 0, onEventInitialStep, provitionalFilterData }) => {

    const [activeStep, setActiveStep] = useState(initialStep);

    const { snackbarOptions, setSnackbarOptions, showMessage } = useSnackbarOption();
    const { handleCreate, datos, error } = useActivityCaptureCreate()

    const { handleList: handleListActivityCapture, processedData: processedDataActivityCapture, error: errorActivityCapture } = useFilterActivityCaptureByWeekFarmArea()
    const { handleList: handleListBudgetExists, processedData: processedDataBudgetExists, error: errorBudgetExists } = useBudgetExists()

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
    const [filterData, setFilterData] = useState(provitionalFilterData ?? filterInitialData)
    const [cleanData, setCleanData] = useState([]) // Dejamos la data lista para mandarla al back
    const [activityCaptureData, setActivityCaptureData] = useState([]);
    const [secondStep, setSeconStep] = useState([])
    const [isCaptureActivityClose, setIsCaptureActivityClose] = useState(false)

    useEffect(() => {
        if (!Object.values(filterData).some(value => value === null)) {
            handleListActivityCapture(filterData.id_semana, filterData.id_finca, filterData.id_area) // Listamos las actividadas que se dieron de alta previamente
            handleListBudgetExists(filterData.id_semana, filterData.id_finca, filterData.id_area) // Listamos el estado del presupuesto
        }
    }, [filterData])

    useEffect(() => {
        if (errorActivityCapture) {
            showMessage("Hubo un error al consultar las actividades previamente asignadas", "error")
            return
        }

        if (processedDataActivityCapture.body.length === 0) {
            return
        }

        setActivityCaptureData(processedDataActivityCapture.body.map(element => ({
            id: `${element.actividad.id}${element.trabajador.id}`,
            trabajador: {
                id: element.trabajador.id,
                nombre: `${element.trabajador.nombre} ${element.trabajador.apellido_paterno} ${element.trabajador.apellido_materno}`
            },
            actividad: element.actividad,
            cantidad_avance: element.avance,
            fecha: element.fecha,
            operacion: 0,
            cns_actividad_trabajador: element.cns_actividad_trabajador,
        })))
    }, [processedDataActivityCapture, errorActivityCapture])

    const [selectedUpdateElement, setSelectedUpdateElement] = useState(null)

    useEffect(() => {
        if (!modeUpdate) {
            setSelectedUpdateElement(null)
            return
        }

        setSelectedUpdateElement(dataValue)
    }, [modeUpdate])

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
        if (modeUpdate) {
            if (!selectedUpdateElement)
                return

            if (selectedUpdateElement.id === `${dataValue.id_actividad}${dataValue.id_trabajador}`)
                return
        }

        const isDuplicate = cleanData.find(element =>
            `${element.id_actividad}${element.id_trabajador}` === `${dataValue.id_actividad}${dataValue.id_trabajador}`
            && element.operacion !== 3
        )

        if (isDuplicate) {
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
        const data = activityCaptureData.map(data => {

            const buildData = {
                id_trabajador: data.trabajador.id,
                id_actividad: data.actividad.id,
                avance: Number(Number(data.cantidad_avance).toFixed(2)),
                fecha: data.fecha,
                operacion: data.operacion,
                cns_actividad_trabajador: data?.cns_actividad_trabajador
            }

            if (data?.old_trabajador) {
                return {
                    ...buildData,
                    nuevo_trabajador: data.trabajador.id,
                    id_trabajador: data.old_trabajador
                }
            }

            return buildData
        })

        setCleanData(data)
    }, [activityCaptureData])

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (activeStep === initialStep && onEventInitialStep) {
            onEventInitialStep()
        }
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
        handleCreate(cleanData, filterData.id_semana, filterData.id_finca, filterData.id_area, 21)
    };

    const saveValidation = () => {
        handleCreate(cleanData, filterData.id_semana, filterData.id_finca, filterData.id_area)
    };

    const cancelValidation = () => {
        setActiveStep(0);
        setActiveComponent('default'); //Logica de validacion para el paso Cancelar
    };

    useEffect(() => {
        if (errorBudgetExists) {
            showMessage("Hubo un error con la consulta del estado de las actividades")
            setActiveStep(0);
            setActiveComponent('default')
            return
        }

        if (processedDataBudgetExists.body) {

            if (processedDataBudgetExists.body?.status?.id < 21) {
                setSeconStep([
                    <ButtonComponent
                        rightIcon={<ArrowForwardIcon />}
                        styleButton="contained"
                        color="strongGreen"
                        onClick={secondValidation}
                        label='Siguiente'
                    />
                ])
            } else if (processedDataBudgetExists.body?.status?.id >= 21) {
                setIsCaptureActivityClose(true)
            }
        }
    }, [processedDataBudgetExists, errorBudgetExists, activityCaptureData])

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
                    isCaptureActivityClose={isCaptureActivityClose}
                    dataValue={dataValue}
                    setDataValue={setDataValue}
                    showMessage={showMessage}
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
                ...secondStep
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

const Activity = ({ dataValue, setDataValue, filterData, setActivityCaptureData, activityCaptureData, modeUpdate, setModeUpdate, isCaptureActivityClose, showMessage }) => {

    const handleEditRow = (row) => {
        if (isCaptureActivityClose) {
            showMessage("Captura de actividades finalizada", "warning")
            return
        }

        setDataValue(({
            ...row,
            id: `${row.actividad.id}${row.trabajador.id}`, // Agregando el id como pivote para verificar
            id_trabajador: row.trabajador.id,
            id_actividad: row.actividad.id,
            cantidad_avance: row.cantidad_avance,
            fecha: row.fecha
        }))
        setModeUpdate(true)
    };

    const handleDeleteRow = (row) => {
        if (isCaptureActivityClose) {
            showMessage("Captura de actividades finalizada", "warning")
            return
        }

        /*
          Si la operacion es una inserción la eliminamos, 
          si es un registro existente lo marcamos como eliminacion: 3
        */
        const transformDeleteData = activityCaptureData.map(element => {
            if (element.id === row.id) {

                if (element.operacion === 1)
                    return null

                return {
                    ...element,
                    operacion: 3
                }
            }
            return element
        })

        setActivityCaptureData(transformDeleteData.filter(element => element !== null))
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
                        isCaptureActivityClose={isCaptureActivityClose}
                    />
                }
                queryTitle="Consulta de Semana"
                queryIcon={<PersonIcon fontSize="large" color="slateBlue" />}
                formIcon={<EventIcon fontSize='large' color='slateBlue' />}
                tableComponent={
                    <BasicTableComponent
                        information={{
                            header: tableHeaders,
                            body: activityCaptureData
                                .filter(element => element.operacion !== 3)
                                .map((item) => ({
                                    ...item,
                                    id: item.id,
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