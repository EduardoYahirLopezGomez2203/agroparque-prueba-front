import BasicForm from "../admin/BasicForm";
import { SectionForm, SelectForm, InputForm } from "../admin/Form";
import { useEffect, useState} from "react";
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
import useEmployeeList from "../formemployee/useEmployeeList";
import useActivityList from "../formactivities/useActivityList";
import useCompanyList from "../formcompany/useCompanyList";


const FormEmployeeDeployment = ({dataValue, setDataValue, processedDataWeek, setActivityCaptureData}) => {

    const { handleList: handleListEmployee, processedData: processedDataEmployee } = useEmployeeList();
    const { handleList: handleListActivity, processedData: processedDataActivity } = useActivityList();
    const { handleList: handleListCompany, processedData: processedDataCompany } = useCompanyList();

    const [isAditionalEmployeeModalOpen, setIsAditionalEmployeeModalOpen] = useState(false);
    const [isAditionalActivityModalOpen, setIsAditionalActivityModalOpen] = useState(false);
    
    
    useEffect(() => {
        handleListActivity();
    }, [handleListActivity]);

    useEffect(() => {
        handleListEmployee();
    }, [handleListEmployee]);

    useEffect (() => {
        handleListCompany();
    }, [handleListCompany]);

    const selectedWeek = processedDataWeek.body.find(
        week => week.id === dataValue.id_semana
    );

    let dateOptions = [];
    if (selectedWeek) {
        const start = new Date(selectedWeek.fecha_inicio);
        const end = new Date(selectedWeek.fecha_fin);
        let current = new Date(start);
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

    const handleSubmit = (event) => {
        event.preventDefault();

        // Buscar el empleado y la actividad seleccionados
        const empleado = processedDataEmployee.body.find(emp => emp.id === dataValue.id_empleado);
        const actividad = processedDataActivity.body.find(act => act.id === dataValue.id_actividad);

        setActivityCaptureData(prev => [
            ...prev,
            {
                id_empleado: dataValue.id_empleado,
                nombre_empleado: empleado ? `${empleado.nombre} ${empleado.ap_paterno} ${empleado.ap_materno}` : "",
                id_actividad: dataValue.id_actividad,
                nombre_actividad: actividad ? actividad.nombre : "",
                cantidad_avance: dataValue.cantidad_avance,
                fecha: dataValue.fecha,
                id: Date.now()
            }
        ]);

        // Limpia solo los campos de empleado, actividad, cantidad y fecha
        setDataValue(prev => ({
            ...prev,
            id_empleado: null,
            id_actividad: "",
            cantidad_avance: "",
            fecha: null
        }));
    };
    
    

    const openModalAditionalEmployee  = () => {
        setIsAditionalEmployeeModalOpen(true);
    };

    const openModalAditionalActivity  = () => {
        setIsAditionalActivityModalOpen(true);
    };

    const dataEmployee = processedDataEmployee.body
    .filter(emp => emp.id_finca === dataValue.id_finca)
    .map(emp => ({
        id: emp.id,
        nombre: `${emp.nombre} ${emp.ap_paterno} ${emp.ap_materno}`
    }));

    const dataActivity = processedDataActivity.body.map((item) => ({
        id: item.id,
        nombre: item.nombre,
    }));

    const dataCompany = processedDataCompany.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre };
    });
    

    return (
    <>
        <BasicForm
                handleSubmit={handleSubmit}
                buttons={<ButtonFormEmployeeDeployment />}
            >
                <Stack width="100%" gap={2}>
                    <SectionForm title="Despliegue de Empleado" direction="row"
                        icon={<PersonIcon fontSize='large'  color='slateBlue' />}
                    >
                        <BasicButtonComponent onClick={openModalAditionalEmployee} styleButton="contained" icon = {<PersonAddAlt1Icon fontSize="medium" />} color="vividBlue" width="40px" height="40px"/>
                        <SelectForm title="Empleado" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataEmployee} fieldName="id_empleado" />
                        <SelectForm title="Actividad" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataActivity} fieldName="id_actividad" />
                        <InputForm  title="Cantidad de Avance" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="cantidad_avance" type="number"/>
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
            <AditionalEmployeeModal openDialog={isAditionalEmployeeModalOpen} setIsAditionalEmployeeModalOpen={setIsAditionalEmployeeModalOpen} dataValue={dataValue} setDataValue={setDataValue} dataCompany={dataCompany}/> 
            <AditionalActivityModal openDialog={isAditionalActivityModalOpen} setIsAditionalEmployeeModalOpen={setIsAditionalActivityModalOpen} dataValue={dataValue} setDataValue={setDataValue} dataCompany={dataCompany}/> 
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



export default FormEmployeeDeployment;


