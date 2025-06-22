import { createContext, useContext, useEffect, useState } from "react";
import BasicAdminContent from "../../layer2/basicadmincontent/BasicAdminContent";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ButtonComponent from "../../../components/buttons/ButtonComponent";
import FormWeekLog from "../../layer1/formweeklog/FormWeekLog";
import NumbersIcon from '@mui/icons-material/Numbers';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Alert, Box, Fade, Snackbar, Stack } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import BasicTableComponent from "../../../components/table/BasicTableComponent";
import EventIcon from '@mui/icons-material/Event';
import useWeekLogList from "../../layer1/formweeklog/useWeekLogList";
import EditIcon from "@mui/icons-material/Edit";
import SelectComponent from "../../../components/selects/SelectComponent";
import { months } from "../../../utils/dateUtil"

export const DataCatchWeek = createContext();

const CatchWeek = ({ onClose }) => {

    const { handleList, processedData, error } = useWeekLogList()

    useEffect(() => {
        refreshTable()
    }, [])

    const [openAccordion, setOpenAccordion] = useState(false);

    const [snackbarOptions, setSnackbarOptions] = useState({
        openSnackbar: false,
        snackbarSeverity: "",
        snackbarMessage: ""
    })

    const showMessage = (message, type) => {
        setSnackbarOptions((options) => ({
            ...options,
            snackbarMessage: message,
            openSnackbar: true,
            snackbarSeverity: type
        }))
    }

    const [filter, setFilter] = useState({
        status: status.find((item) => item.id === 1).id,
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    })

    const refreshTable = () => {
        handleList();
    }

    // Ordena los datos de forma ascendiente teniendo en cuenta las fechas
    const sortData = () => (
        processedData.body
            .sort((a, b) => new Date(a.fecha_fin) - new Date(b.fecha_inicio))
            .map((item) => ({
                ...item,
                id: item.id,
                numero_semana: item.numero_semana,
                fecha_inicio: item.fecha_inicio,
                diasemana_inicio: item.diasemana_inicio,
                fecha_fin: item.fecha_fin,
                diasemana_fin: item.diasemana_fin,
                hiddenMenuRow: item.status === 1 ? false : true,
            }))
    )

    // Persistencia de datos entre hijos
    const [data, setData] = useState({
        updateData: null,
        dataTable: [],
        refreshTable: refreshTable,
        alert: showMessage
    })

    // Control del update
    useEffect(() => {
        setOpenAccordion(data.updateData ? true : false)
    }, [data.updateData])

    useEffect(() => {
        if (error) {
            showMessage("Ocurrió un error al obtener los datos", "error")
        }

        setData({
            ...data,
            dataTable: sortData()
        })
    }, [processedData, error])

    const handleCloseSnackbar = () => {
        setSnackbarOptions((element) => ({
            ...element,
            snackbarMessage: "",
            snackbarSeverity: "",
            openSnackbar: false
        }))
    };

    return (
        <DataCatchWeek.Provider value={{ data, setData }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <BasicAdminContent
                    formTitle="Registro"
                    formComponent={
                        <FormWeekLog />
                    }
                    openAccordion={openAccordion}
                    queryTitle="Consulta de Semana"
                    queryIcon={<CalendarMonthIcon fontSize="large" color="slateBlue" />}
                    formIcon={<EventIcon fontSize='large' color='slateBlue' />}
                    specialSectionTable={
                        <ComponentsUpTable filter={filter} setFilter={setFilter} />
                    }
                    tableComponent={
                        <BasicTableComponent
                            information={{
                                header: tableHeaders,
                                body: data.dataTable.filter((item) =>
                                    item.year === filter.year &&
                                    item.status === filter.status &&
                                    item.mes === filter.month + 1  // La API lo manda de 1 - 12
                                )
                            }}
                            items={[
                                {
                                    icon: <EditIcon color="slateBlue" />,
                                    text: "Editar",
                                    onClick: (dataUpdate) => {
                                        setData({
                                            ...data,
                                            updateData: dataUpdate
                                        })
                                    }
                                },
                            ]}
                        />
                    }
                />

                <Box sx={{ display: 'flex', alignSelf: "end" }}>
                    <ButtonComponent
                        label='Finalizar'
                        icon={<CheckIcon />}
                        onClick={() => onClose(true)}
                    />
                </Box>
            </Box>
            
            {/* Refactorizar pendiente */}
            <Snackbar
                open={snackbarOptions.openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                slots={{ transition: Fade }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarOptions.snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarOptions.snackbarMessage}
                </Alert>
            </Snackbar>
        </DataCatchWeek.Provider>
    );
};

const status = [
    { id: 1, nombre: "Activo" },
    { id: 2, nombre: "Inactivo" }
]

// Se encarga del control del filtrado
const ComponentsUpTable = ({ filter, setFilter }) => {

    const { data } = useContext(DataCatchWeek)

    const actuallyYear = new Date().getFullYear();

    // Filtramos los años y quitamos duplicados convirtiendolos en conjuntos
    const helperYear = new Set(data.dataTable.map(element => element.year))

    // Para tener el año actual
    helperYear.add(actuallyYear)

    const years = [...helperYear].sort().map(element => ({
        id: element,
        nombre: element
    }))

    return (
        <Stack direction="row" sx={{ width: "100%" }}>
            <Stack
                direction="row"
                spacing={2}
                sx={{ width: "50%", ml: "auto" }}
            >
                <SelectComponent title="Status" fieldName="status" value={filter} setValue={setFilter} options={status} />
                <SelectComponent title="Año" fieldName="year" value={filter} setValue={setFilter} options={years} />
                <SelectComponent title="Mes" fieldName="month" value={filter} setValue={setFilter} options={months} />
            </Stack>
        </Stack>
    )
}

const tableHeaders = [
    {
        id: 'numero_semana',
        text: 'Semana',
        icon: <NumbersIcon fontSize="large" color="slateBlue" />
    },
    {
        id: 'fecha_inicio',
        text: 'Fecha de Inicio',
        icon: <CalendarMonthIcon fontSize="large" color="slateBlue" />
    },
    {
        id: 'diasemana_inicio',
        text: 'Día de Inicio',
        icon: <CalendarTodayIcon sx={{ color: 'slateBlue' }} />
    },
    {
        id: 'fecha_fin',
        text: 'Fecha Fin',
        icon: <CalendarMonthIcon fontSize="large" color="slateBlue" />
    },
    {
        id: 'diasemana_fin',
        text: 'Día Fin',
        icon: <CalendarTodayIcon sx={{ color: 'slateBlue' }} />
    }
];

export default CatchWeek;