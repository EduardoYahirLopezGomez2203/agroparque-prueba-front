import BasicForm from "../admin/BasicForm";
import { SectionForm, SelectForm, InputForm } from "../admin/Form";
import { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ButtonComponent from "../../../components/buttons/ButtonComponent";
import BasicButtonComponent from "../../../components/buttons/BasicButtonComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from "@mui/material";
import AditionalEmployeeModal from "../../../components/modals/AditionalEmployeeModal";
import AditionalActivityModal from "../../../components/modals/AditionalActivityModal";
import useFilterEmployeeByFarm from "../formemployee/useFilterEmployeeByFarm"
import useCompanyList from "../formcompany/useCompanyList";
import useWeekLogList from '../../layer1/formweeklog/useWeekLogList';
import useFilterActivityByWeekFarmArea from "./useFilterActivityByWeekFarmArea";
import { toLocalDate } from "../../../utils/dateUtil";
import SnackbarComponent from "../../../components/snackbar/SnackbarComponent";
import useSnackbarOption from "../../../hooks/useSnackbarOption";

const FormEmployeeDeployment = ({
    dataValue, setDataValue, filterData,
    setActivityCaptureData, modeUpdate, setModeUpdate
}) => {

    const { handleList: handleListEmployee, processedData: processedDataEmployee } = useFilterEmployeeByFarm();
    const { handleList: handleListActivity, processedData: processedDataActivity } = useFilterActivityByWeekFarmArea();
    const { handleList: handleListWeek, processedData: processedDataWeek, error: errorWeek } = useWeekLogList();

    const [isAditionalEmployeeModalOpen, setIsAditionalEmployeeModalOpen] = useState(false);
    const [isAditionalActivityModalOpen, setIsAditionalActivityModalOpen] = useState(false);

    const { snackbarOptions, setSnackbarOptions, showMessage } = useSnackbarOption();

    useEffect(() => {
        handleListActivity(filterData.id_semana, filterData.id_finca, filterData.id_area); // Obteniendo las actividades presupuestadas
        handleListEmployee(filterData.id_finca); // Obteniendo los empleados de la finca
        handleListWeek(filterData.id_semana) // Obteniendo los datos de la semana seleccionada
    }, []);

    useEffect(() => { if (errorWeek) showMessage("Ocurrio un error al obtener las fechas", "error")}, [errorWeek])

    const selectedWeek = processedDataWeek.body

    let dateOptions = [];

    if (selectedWeek) {
        const start = toLocalDate(selectedWeek.fecha_inicio);
        const end = toLocalDate(selectedWeek.fecha_fin);
        let current = toLocalDate(start);
        while (current <= end) {
            // Formato yyyy-MM-dd para el value y dd/MM/yyyy para mostrar
            const yyyy = current.getFullYear();
            const mm = String(current.getMonth() + 1).padStart(2, '0');
            const dd = String(current.getDate()).padStart(2, '0');
            dateOptions.push({
                id: `${yyyy}-${mm}-${dd}`,
                nombre: `${dd}/${mm}/${yyyy}`
            });
            current.setDate(current.getDate() + 1);
        }
    }

    const handleReset = () => {
        setDataValue({
            id_trabajador: null,
            id_actividad: null,
            cantidad_avance: "",
            fecha: null
        })
    }

    const openModalAditionalEmployee = () => {
        setIsAditionalEmployeeModalOpen(true);
    };

    const openModalAditionalActivity = () => {
        setIsAditionalActivityModalOpen(true);
    };

    const dataEmployee = processedDataEmployee.body.map(emp => ({
        id: emp.id,
        nombre: `${emp.nombre} ${emp.ap_paterno} ${emp.ap_materno}`
    }));

    const dataActivity = processedDataActivity.body.map((item) => ({
        id: item.actividad.id,
        nombre: item.actividad.nombre,
    }));

    const handleSubmit = (event) => {
        event.preventDefault();

        // Buscar el empleado y la actividad seleccionados
        const trabajador = dataEmployee.find(emp => emp.id === dataValue.id_trabajador);
        const actividad = dataActivity.find(act => act.id === dataValue.id_actividad);

        setActivityCaptureData(prev => [
            ...prev,
            {
                trabajador: {
                    id: dataValue.id_trabajador,
                    nombre: trabajador.nombre
                },
                actividad: {
                    id: dataValue.id_actividad,
                    nombre: actividad.nombre
                },
                cantidad_avance: dataValue.cantidad_avance,
                fecha: dataValue.fecha,
            }
        ]);

        handleReset()
    };

    const handleCancel = () => {
        handleReset()
        setModeUpdate(!modeUpdate)
    }

    const handleUpdate = (event) => {
        event.preventDefault();

        setActivityCaptureData(data => {
            if (data.id === dataValue.id) {
                const trabajador = dataEmployee.find(emp => emp.id === dataValue.id_trabajador);
                const actividad = dataActivity.find(act => act.id === dataValue.id_actividad);

                return [{
                    trabajador: {
                        id: dataValue.id_trabajador,
                        nombre: trabajador.nombre,
                    },
                    actividad: {
                        id: dataValue.id_actividad,
                        nombre: actividad.nombre,
                    },
                    cantidad_avance: dataValue.cantidad_avance,
                    fecha: dataValue.fecha,
                }]
            }

            return [data]
        })

        handleReset()
        setModeUpdate(false)
    }

    return (
        <>
            <BasicForm
                handleSubmit={modeUpdate ? handleUpdate : handleSubmit}
                handleReset={modeUpdate ? handleCancel : handleReset}
                buttons={<ButtonFormEmployeeDeployment isUpdate={modeUpdate} />}
            >
                <Stack width="100%" gap={2}>
                    <SectionForm title="Despliegue de Empleado" direction="row"
                        icon={<PersonIcon fontSize='large' color='slateBlue' />}
                    >
                        <BasicButtonComponent onClick={openModalAditionalEmployee} styleButton="contained" icon={<PersonAddAlt1Icon fontSize="medium" />} color="vividBlue" width="40px" height="40px" />
                        <SelectForm title="Empleado" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataEmployee} fieldName="id_trabajador" />
                        <SelectForm title="Actividad" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataActivity} fieldName="id_actividad" />
                        <InputForm title="Cantidad de Avance" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="cantidad_avance" type="number" />
                        <SelectForm title="Fecha" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dateOptions} fieldName="fecha" />
                    </SectionForm>

                    <ButtonComponent
                        icon={<AddIcon />}
                        styleButton="contained"
                        color="strongGreen"
                        onClick={openModalAditionalActivity}
                        label='Actividades Adicionales'
                    />
                </Stack>
            </BasicForm>
            <AditionalEmployeeModal 
                openDialog={isAditionalEmployeeModalOpen}
                setIsAditionalEmployeeModalOpen={setIsAditionalEmployeeModalOpen} 
                setActivityCaptureData={setActivityCaptureData} 
                dataActivity={dataActivity}
                showMessage={showMessage}
                dateOptions={dateOptions}
            />
            <AditionalActivityModal 
                openDialog={isAditionalActivityModalOpen}
                setIsAditionalEmployeeModalOpen={setIsAditionalActivityModalOpen} 
                setActivityCaptureData={setActivityCaptureData} 
                dataActivity={dataActivity}
                showMessage={showMessage}
                dateOptions={dateOptions} 
            />
            <SnackbarComponent snackbarOptions={snackbarOptions} setSnackbarOptions={setSnackbarOptions} />
        </>
    );
};

const ButtonFormEmployeeDeployment = ({ isUpdate = false }) => {
    return (
        <>
            <ButtonComponent
                label={isUpdate ? "Actualizar" : "Agregar"}
                typeButton="submit"
                icon={<CheckIcon />}
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

export default FormEmployeeDeployment