import { InputForm, SectionForm, SelectForm } from "../admin/Form";
import { useState, useEffect, useContext } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BasicForm from "../admin/BasicForm";
import ButtonComponent from "../../../components/buttons/ButtonComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from "@mui/material";
import IconTextComponent from "../../../components/icontexts/IconTextComponent";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { DataCatchWeek } from "../../layer3/catchweek/CatchWeek";
import EditableTableComponent from "../../../components/table/EditableTableComponent";
import useWeekLogGenerate from "./useWeekLogGenerate";
import useFormWeekLogCreateBatch from "./useWeekLogCreateBatch";
import useWeekLogUpdate from "./useWeekLogUpdate";
import { searchDayforName, searchDayforNumber, weekDays, toLocalDate } from "../../../utils/dateUtil";

// Refactorizar con customhooks para un mejor desacoplamiento de codigo
const FormWeekLog = () => {

    const { handleUpdate, error, datos } = useWeekLogUpdate()

    const { data, setData } = useContext(DataCatchWeek);

    // Verifica si entramos a actualizar
    const [modeUpdate, setModeUpdate] = useState(false)

    const [openDialog, setOpenDialog] = useState(false);

    const initialData = {
        fecha_inicio: "",
        fecha_fin: "",
        diasemana_inicio: null,
        diasemana_fin: null
    };

    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        if (error) {
            data.alert("Ocurrió un error al actualizar", "error")

            return
        }

        if (datos) {

            data.alert("¡Registro actualizado correctamente!", "success")

            data.refreshTable()
        }
    }, [error, datos])

    useEffect(() => {
        if (!formData.fecha_fin || !formData.fecha_inicio)
            return

        if (toLocalDate(formData.fecha_fin) < toLocalDate(formData.fecha_inicio)) {
            setFormData(element => ({
                ...element,
                fecha_fin: ""
            }))

            data.alert("La fecha de fin no puede ser menor que la fecha de inicio", "warning")
            return
        }

        // Ayuda a mantener una relacion con las fechas
        if (modeUpdate) {
            const startDate = toLocalDate(formData.fecha_inicio)
            const lastDate = toLocalDate(formData.fecha_fin)
            
            // Convirtiendo las fechas en milisegundos para obtener el rango de dias
            const rangeDay = (lastDate - startDate) / (24 * 3600000)

            if (rangeDay < 0 || rangeDay > 6 ) {
                data.alert("La semana solo acepta un rango de 7 días", "warning")

                setFormData(element => ({
                    ...element,
                    diasemana_inicio: searchDayforName(data.updateData.diasemana_inicio).id,
                    diasemana_fin: searchDayforName(data.updateData.diasemana_fin).id,
                    fecha_fin: data.updateData.fecha_fin,
                    fecha_inicio: data.updateData.fecha_inicio,
                }))

                return
            }

            setFormData(element => ({
                ...element,
                diasemana_fin: searchDayforNumber(lastDate.getDay()).id,
                diasemana_inicio: searchDayforNumber(startDate.getDay()).id
            }))
        }
    }, [formData.fecha_fin, formData.fecha_inicio])

    // Ayuda a mantener una relacion con las fechas
    useEffect(() => {
        if (modeUpdate) {
            const firstDateOrganizate = organizateDate(formData.diasemana_inicio, toLocalDate(formData.fecha_inicio).getDay(), formData.fecha_inicio)

            const lastDateOrganizate = organizateDate(formData.diasemana_fin, toLocalDate(formData.fecha_fin).getDay(), formData.fecha_fin)

            setFormData(element => ({
                ...element,
                fecha_fin: lastDateOrganizate,
                fecha_inicio: firstDateOrganizate
            }))
        }
    }, [formData.diasemana_fin, formData.diasemana_inicio])

    const organizateDate = (newDay, oldDay, date) => {
        const rangeDays = newDay - oldDay

        try {
            const fecha = toLocalDate(date);

            fecha.setDate(fecha.getDate() + rangeDays);

            return fecha.toISOString().split("T")[0]
        } catch (error) {
            return ""
        }
    }

    // Actualiza el modo
    useEffect(() => {
        if (data.updateData) {
            setFormData({
                ...formData,
                fecha_inicio: data.updateData.fecha_inicio,
                fecha_fin: data.updateData.fecha_fin,
                diasemana_inicio: searchDayforName(data.updateData.diasemana_inicio).id,
                diasemana_fin: searchDayforName(data.updateData.diasemana_fin).id
            })
            setModeUpdate(true)
        } else {
            setModeUpdate(false)
        }
    }, [data.updateData])

    const resetForm = () => {
        setFormData(initialData);
    };

    /**
     * Valida que la información proxima a actualizarse
     * se encuentre dentro del rango de fechas disponibles
     */
    const validateUpdate = (dataToUpdate) => {
        let indexElement

        const isFindData = data.dataTable.find((element, i) => {
            if (element.id === data.updateData.id) {
                indexElement = i
                return true
            }
            return false
        })

        if (!isFindData) 
            return

        let dates = []

        if (data.dataTable[indexElement - 1]) {
            dates.push(data.dataTable[indexElement - 1])
        }

        dates.push(dataToUpdate)

        if (data.dataTable[indexElement + 1]) {
            dates.push(data.dataTable[indexElement + 1])
        }

        return validateDateRanges(dates)
    }

    const handleFormUpdate = (event) => {
        event.preventDefault()

        // Transformacion de la data para enviar
        const updateData = {
            ...formData,
            diasemana_inicio: searchDayforNumber(formData.diasemana_inicio).nombre,
            diasemana_fin: searchDayforNumber(formData.diasemana_fin).nombre
        }

        if (!validateUpdate(updateData)) {
            data.alert("No se pudo actualizar, Verifica las fechas", "warning")
            return
        }

        handleUpdate(data.updateData.id, updateData)

        resetForm();

        setData({
            ...data,
            updateData: null
        })
    };

    const handleCancelUpdate = () => {
        resetForm();
        setData({
            ...data,
            updateData: null
        })
    }

    const handleGenerate = (event) => {
        event.preventDefault();
        setOpenDialog(true);
    }

    return (
        <>
            <AlertDialog
                open={openDialog}
                handleForm={resetForm}
                onClose={() => setOpenDialog(false)}
                data={{
                    ...formData,
                    diasemana_inicio: searchDayforNumber(formData.diasemana_inicio)?.nombre.toLowerCase(),
                    diasemana_fin: searchDayforNumber(formData.diasemana_fin)?.nombre.toLowerCase()
                }}
            />
            <BasicForm
                buttons={<ButtonFormWeekLog isUpdate={modeUpdate} />}
                handleSubmit={modeUpdate ? handleFormUpdate : handleGenerate}
                handleReset={modeUpdate ? handleCancelUpdate : resetForm}
            >
                <SectionForm title="Configuración" direction="column"
                    icon={<SettingsIcon fontSize="large" color="slateBlue" />}
                >
                    <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
                        <InputForm type="date" title="Fecha de Inicio" isRequired setDataValue={setFormData} dataValue={formData} fieldName="fecha_inicio" />
                        <InputForm type="date" title="Fecha Fin" isRequired setDataValue={setFormData} dataValue={formData} fieldName="fecha_fin" />
                    </Stack>
                    <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
                        <SelectForm
                            title="Día de Inicio"
                            setDataValue={setFormData}
                            dataValue={formData}
                            isRequired
                            options={weekDays}
                            fieldName="diasemana_inicio"
                        />
                        <SelectForm
                            title="Día Fin"
                            setDataValue={setFormData}
                            dataValue={formData}
                            isRequired
                            options={weekDays}
                            fieldName="diasemana_fin"
                        />
                    </Stack>
                </SectionForm>
                <SectionForm title="Resultado" direction="row"
                    icon={<CheckBoxIcon fontSize="large" color="slateBlue" />}
                >
                    <InputForm title="Días totales del periodo" fieldName="total_weekDays" disabled dataValue={calculateTotalDays(formData.fecha_inicio, formData.fecha_fin, formData.diasemana_inicio, formData.diasemana_fin)} />
                </SectionForm>
            </BasicForm>
        </>
    );
};

const calculateTotalDays = (startDate, endDate, startDay, endDay) => {
    if (!startDate || !endDate || !startDay || !endDay) return 0;

    const start = toLocalDate(startDate);
    const end = toLocalDate(endDate);
    let totalDays = 0;

    const startDayIndex = parseInt(startDay);
    const endDayIndex = parseInt(endDay);

    for (let date = toLocalDate(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();

        if (dayOfWeek >= startDayIndex && dayOfWeek <= endDayIndex) {
            totalDays++;
        }
    }

    return totalDays;
};

const ButtonFormWeekLog = ({ isUpdate = false }) => {
    return (
        <>
            <ButtonComponent
                label={isUpdate ? "Actualizar" : "Generar"}
                typeButton="submit"
                icon={<SaveIcon />}
            />

            <ButtonComponent
                label={isUpdate ? "Cancelar" : "Limpiar"}
                styleButton="outlined"
                color="brightRed"
                typeButton="reset"
                icon={<DeleteIcon />}
            />
        </>
    );
}

// dates = [{fecha_inicio = "", fecha_fin = ""}]
const validateDateRanges = (dates) => {
    // Validar cada bloque y la relación con el siguiente
    for (let i = 0; i < dates.length; i++) {
        const current = dates[i];
        const currentInicio = toLocalDate(current.fecha_inicio);
        const currentFin = toLocalDate(current.fecha_fin);

        if (currentFin - currentInicio) 

        // 1. Validar que fecha_fin no sea menor que fecha_inicio
        if (currentFin < currentInicio) {
            return false;
        }

        // 2. Validar que no haya cruce con el siguiente bloque
        if (i < dates.length - 1) {
            const next = dates[i + 1];
            const nextInicio = toLocalDate(next.fecha_inicio);

            if (currentFin >= nextInicio) {
                return false;
            }
        }
    }

    return true
}

const AlertDialog = ({
    open = false, onClose, data, handleForm
}) => {

    const { handleCreate, datos, error } = useFormWeekLogCreateBatch();
    const { handleGenerate, datos: generateData, cargado, error: generateError } = useWeekLogGenerate()

    // Data persistente
    const { data: contextData } = useContext(DataCatchWeek);

    const [information, setInformation] = useState({ header: tableHeaders, body: [] })
    const [originalInformation, setOriginalInformation] = useState({ header: tableHeaders, body: [] })

    const generate = () => {
        handleGenerate(data)
    }

    useEffect(() => {
        if (generateError) {
            contextData.alert("Hubo un problema al procesar la solicitud", "error")

            handleClose()
        }

        setInformation((data) => ({
            ...data,
            body: cargado ? generateData?.data?.map((element) => (
                {
                    ...element,
                    id: element.numero_semana
                }
            )) : []
        }))
    }, [generateError, generateData])

    useEffect(() => {
        if (open) {
            generate()
        }
    }, [open])

    const validateInformation = (info, initial) => {
        if (!Array.isArray(info) || info.length === 0) return false;

        const first = info[0];
        const last = info[info.length - 1];

        // Verificar extremos de fechas
        if (
            toLocalDate(first.fecha_inicio) < toLocalDate(initial.fecha_inicio) ||
            toLocalDate(last.fecha_fin) > toLocalDate(initial.fecha_fin)
        ) {
            return false;
        }

        return validateDateRanges(info)
    };

    useEffect(() => {
        if (information.body.length === 0) {
            handleClose()
            return
        }

        if (validateInformation(information.body, data) && information.body) {
            setOriginalInformation(information);
        } else {
            contextData.alert("Hubo un error al validar las fechas, Revise las fechas", "error")

            setInformation(originalInformation)
        }
    }, [information]);

    useEffect(() => {
        if (error) {
            contextData.alert("Ocurrio un error al crear las semanas", "error")
        } else if (datos) {
            contextData.alert("¡Registro creado con éxito!", "success",)

            contextData.refreshTable()

            handleForm()
        }
    }, [datos, error])

    const handleSubmit = () => {
        const data = originalInformation.body.map((item) => ({
            fecha_inicio: item.fecha_inicio,
            fecha_fin: item.fecha_fin,
            diasemana_inicio: item.diasemana_inicio,
            diasemana_fin: item.diasemana_fin
        }))

        handleCreate(data)

        handleClose()
    }

    const handleClose = () => {
        onClose()
    }

    return (

        <Dialog
            open={open}
            sx={{
                '& .MuiPaper-root': {
                    maxWidth: '900px',
                },
            }}
        >
            <DialogTitle sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ alignSelf: "center" }}>
                    <IconTextComponent text={"Visualizacion de Semanas"} icon={<CalendarMonthIcon fontSize="large" color="slateBlue" />} variant="body" />
                </Box>

                <Divider sx={{ backgroundColor: "#9AA0A8", height: "2px" }} />
            </DialogTitle>

            <DialogContent>
                <EditableTableComponent
                    information={information}
                    setInformation={setInformation}
                />
            </DialogContent>

            <DialogActions sx={{ gap: 1, marginRight: 2 }}>
                <ButtonComponent
                    label="Confirmar"
                    typeButton="button"
                    icon={<SaveIcon />}
                    onClick={handleSubmit}
                />
                <ButtonComponent
                    label="Cancelar"
                    icon={<CloseIcon />}
                    typeButton="button"
                    color="brightRed"
                    styleButton="outlined"
                    onClick={handleClose}
                />
            </DialogActions>
        </Dialog>

    );
}

const tableHeaders = [
    {
        id: 'numero_semana',
        text: 'ID Semana',
        icon: <CalendarMonthIcon fontSize="large" color="slateBlue" />
    },
    {
        id: 'fecha_inicio',
        text: 'Fecha de Inicio',
        icon: <CalendarMonthIcon fontSize="large" color="slateBlue" />,
        editType: "date"
    },
    {
        id: 'diasemana_inicio',
        text: 'Día de Inicio',
        icon: <CalendarTodayIcon sx={{ color: 'slateBlue' }} />,
        editType: "select-unique",
        options: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    },
    {
        id: 'fecha_fin',
        text: 'Fecha Fin',
        icon: <CalendarMonthIcon fontSize="large" color="slateBlue" />,
        editType: "date"
    },
    {
        id: 'diasemana_fin',
        text: 'Día Fin',
        icon: <CalendarTodayIcon sx={{ color: 'slateBlue' }} />,
        editType: "select-unique",
        options: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    }
];

export default FormWeekLog;