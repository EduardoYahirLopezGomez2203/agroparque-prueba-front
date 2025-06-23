import BasicForm from "../admin/BasicForm";
import { SectionForm, SelectForm, InputForm } from "../admin/Form";
import { useEffect, useState} from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ButtonComponent from "../../../components/buttons/ButtonComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import useActivitiesByFincaAreaList from "../formactivities/useActivitiesByFincaAreaList";

const FormBudget = ({ dataValue, setDataValue, dataTable, setDataTable, isUpdate, setUpdate, setBudgetActivities, setUpdatePastBudget, showAlert}) => {
    const {handleList: handleListActivitiesByFincaArea, processedData: processedDataActivitiesByFincaArea } = useActivitiesByFincaAreaList();
    
    useEffect(() => {
        handleListActivitiesByFincaArea(dataValue.id_finca, dataValue.id_area);
    },[dataValue.id_finca, dataValue.id_area, handleListActivitiesByFincaArea])

    //Efecto para calcular el total por el precio y cantidad de la actividad
    useEffect(() => {
        // Solo realiza la operación si ambos valores existen y son números válidos
        const precio = parseFloat(dataValue.precio);
        const cantidad = parseFloat(dataValue.cantidad);

        if (!isNaN(precio) && !isNaN(cantidad)) {
            const total = String(Number((precio * cantidad).toFixed(2))); // <-- aquí el cambio
            if (dataValue.total !== total) {
                setDataValue(prev => ({
                    ...prev,
                    total: total
                }));
            }
        } else if (dataValue.total !== "") {
            // Si alguno no es válido, limpia el total
            setDataValue(prev => ({
                ...prev,
                total: ""
            }));
        }
    }, [dataValue.isPastBudget, dataValue.precio, dataValue.cantidad, setDataValue, dataValue.total]);

    //Efecto para setear los campos unidad y precio
    useEffect(() => {
        if (dataValue.id_actividad && !dataValue.isPastBudget) {
            const selected = processedDataActivitiesByFincaArea.body.find(
                item => item.id_actividad === dataValue.id_actividad
            );

            if (selected) {
                setDataValue(prev => ({
                    ...prev,
                    cns_detalle_actividad: String(selected.cns_detalle_actividad),
                    cns_detalle_finca: String(selected.cns_detalle_finca),
                    unidad: String(selected.unidad),
                    precio: String(selected.precio),
                    nombre_actividad: String(selected.nombre_actividad)
                }));
            } 
        }
    }, [dataValue.id_actividad, dataValue.isPastBudget,processedDataActivitiesByFincaArea.body, setDataValue, dataValue.unidad, dataValue.precio, dataValue.nombre_actividad]);
           //Funcion para crear o actualizar un presupuesto pasado o previamente agregado
    const handleSubmit = (event) => {
        event.preventDefault();
        if(dataValue.status_presupuesto === "10"){
            const alreadyExists = dataTable.some(
                item => String(item.id_actividad) === String(dataValue.id_actividad)
            );
            console.log("Actividades en dataTable:", dataTable.map(item => item.id_actividad));
            console.log("Actividad seleccionada en dataValue:", dataValue.id_actividad);
            console.log("Estado de filtro:",alreadyExists)
            if (!alreadyExists || isUpdate){
                if(!isUpdate && !dataValue.isPastBudget){
                    handleAddBudgetActivity();
                } else if(isUpdate && !dataValue.isPastBudget){
                    handleUpdateBudgetActivity();
                } else if(isUpdate && dataValue.isPastBudget){
                    handleUpdatePastBudgetActivity();
                }
            }  else {
                showAlert("No es posible agregar una actividad duplicada.", "warning");
            }
            handleReset();
        } else {
            showAlert("No es posible presupuestar esta actividad, ya que el presupuesto ha sido finalizado.", "warning");
        }
    };

   // Generador de id único
    const generateUniqueId = () => String(crypto.randomUUID());

        // Función para agregar a ambos arrays con el mismo id
    const handleAddBudgetActivity = () => {
    const newId = generateUniqueId();
        setDataTable(prev => [
            ...prev,
            {
                id: newId,
                id_actividad: dataValue.id_actividad,
                cns_detalle_actividad: dataValue.cns_detalle_actividad,
                nombre_actividad: dataValue.nombre_actividad,
                unidad: dataValue.unidad,
                precio: dataValue.precio,
                cantidad: dataValue.cantidad,
                total: dataValue.total,
                isPastBudget: dataValue.isPastBudget,
            }
        ]);
        setBudgetActivities(prev => [
                ...prev,
                {
                    id: newId,
                    id_actividad: dataValue.id_actividad,
                    cns_detalle_actividad: dataValue.cns_detalle_actividad,
                    precio: dataValue.precio,
                    status: "20",
                    cantidad: dataValue.cantidad
                }
            ]);
    };

    const handleUpdateBudgetActivity = () => {
        setDataTable(prev => prev.map(item =>
                    item.id === dataValue.id
                    ? {
                    ...item,
                    id_actividad: dataValue.id_actividad,
                    cns_detalle_actividad: dataValue.cns_detalle_actividad,
                    nombre_actividad: dataValue.nombre_actividad,
                    unidad: dataValue.unidad,
                    precio: dataValue.precio,
                    cantidad: dataValue.cantidad,
                    total: dataValue.total,
                    isPastBudget: dataValue.isPastBudget,
                }
                : item
            )
        );
        setBudgetActivities(prev => prev.map(item =>
                item.id === dataValue.id
                    ? {
                        ...item,
                        id_actividad: dataValue.id_actividad,
                        cns_detalle_actividad: dataValue.cns_detalle_actividad,
                        precio: dataValue.precio,
                        status: "20",
                        cantidad: dataValue.cantidad
                    }
                    : item
            )
        );
    }

    const handleUpdatePastBudgetActivity = () => {
        setDataTable(prev => prev.map(item =>
                    item.id === dataValue.id
                    ? {
                    ...item,
                    id_actividad: dataValue.id_actividad,
                    cns_detalle_actividad: dataValue.cns_detalle_actividad,
                    cns_detalle_presupuesto: dataValue.cns_detalle_presupuesto,
                    nombre_actividad: dataValue.nombre_actividad,
                    unidad: dataValue.unidad,
                    precio: dataValue.precio,
                    cantidad: dataValue.cantidad,
                    total: dataValue.total,
                    isPastBudget: dataValue.isPastBudget,
                }
                : item
            )
        );
        setUpdatePastBudget(prev => {
            const exists = prev.some(item => item.id === dataValue.id);
            const newObj = {
                id: dataValue.id,
                id_actividad: dataValue.id_actividad,
                cns_detalle_actividad: dataValue.cns_detalle_actividad,
                cns_detalle_presupuesto: dataValue.cns_detalle_presupuesto,
                precio: dataValue.precio,
                status: 20,
                cantidad: dataValue.cantidad
            };
            return exists
                ? prev.map(item => item.id === dataValue.id ? newObj : item)
                : [...prev, newObj];
        });
    }

    const handleReset = () => {
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
        setUpdate(false);
    };

    const dataActivityByFincaArea = processedDataActivitiesByFincaArea.body.map(activity => ({
        id: activity.id_actividad,
        nombre: activity.nombre_actividad
    }));

    return (
    <>
            <BasicForm
                handleSubmit={handleSubmit}
                handleReset={handleReset}
                buttons={<ButtonFormBudget isUpdate={isUpdate} />}
            >
                <SectionForm title="Registro de Presupuesto" direction="row"
                    icon={<AttachMoneyIcon fontSize='large'  color='slateBlue' />}
                >
                    <SelectForm sx={{width:"200px"}}  title="Actividad" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataActivityByFincaArea} fieldName="id_actividad" />
                    <InputForm  title="Unidad" setDataValue={setDataValue} dataValue={dataValue} fieldName="unidad" disabled={true}/>
                    <InputForm type="number" title="Precio" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="precio" disabled={true}/>
                    <InputForm type="number" title="Cantidad" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="cantidad" />
                    <InputForm type="number" title="Total" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="total" disabled={true}/>
                </SectionForm>
            </BasicForm> 
    </>
    );
};

const ButtonFormBudget = ({ isUpdate = false}) => {
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



export default FormBudget;


