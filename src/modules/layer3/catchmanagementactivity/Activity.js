import {Box, Alert, Snackbar} from '@mui/material';
import BasicAdminContent from '../../layer2/basicadmincontent/BasicAdminContent';
import BasicTableComponent from '../../../components/table/BasicTableComponent';
import FormNewActivity from '../../layer1/formactivitymanager/FormNewActivity';
import GrassIcon from '@mui/icons-material/Grass';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import BalanceIcon from '@mui/icons-material/Balance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useSnackbarAlert from '../../layer1/formactivitymanager/useSnackbarAlert';
import {useState} from 'react';

const Activity = ({
                      dataValue,
                      setDataValue,
                      initialData,
                      dataTable,
                      setDataTable
                  }) => {

    // Estados de edición
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Estado de Alertas
    const {
        alertInfo,
        showAlert,
        closeAlert
    } = useSnackbarAlert();

    // Agregar o actualizar fila en frontend
    const handleAddActivity = newRecord => {
        console.log('onAdd recibe:', newRecord, {
            isEditing,
            editId
        });

        const precioRaw = newRecord.precio;
        const precio2 = Math.round(precioRaw * 100) / 100;  // redondea a 2 decimales

        // Revisa si hay actividades duplicadas
        const isDuplicate = !isEditing

            // En caso de agregar
            ? dataTable.some(r => r.id_actividad === newRecord.id_actividad)
            // En caso de editar (Solo al cambiar un id que ya existe en otro registro)
            : dataTable.some(r =>
                r.id_actividad === newRecord.id_actividad &&
                r.id_actividad !== editId
            );

        // Si es duplicado, se muestra la alerta y se sale
        if (isDuplicate) {
            showAlert('Esa actividad ya está en la tabla. No se permiten duplicados.', 'warning');
            return;
        }

        const lookupId = isEditing ? editId : newRecord.id_actividad;
        const idx = dataTable.findIndex(r => r.id_actividad === lookupId);
        console.log(`lookupId=${lookupId} idx=${idx}`);
        const row = {
            id: newRecord.id_actividad,   // clave para React
            id_actividad: newRecord.id_actividad,
            nombre_actividad: newRecord.nombre,
            unidad_avance: newRecord.cantidad_avance,
            precio: precio2
        };

        if (idx !== -1) {
            const copy = [...dataTable];
            copy[idx] = row;
            setDataTable(copy);
        } else {
            setDataTable(prev => [...prev, row]);
        }

    // SOLUCIÓN: Resetear solo los campos de actividad, no todo el estado
    setIsEditing(false);
    setEditId(null);
    setDataValue(({
      id_actividad: null,
      cantidad_avance: "",
      precio: "",
      nombre: ""
    }));
  };

  // Maneja la edición de la columna
  const handleEditRow = row => {
    console.log("Editar fila:", row);
    setDataValue(({
      id_actividad: row.id_actividad,
      cantidad_avance: row.unidad_avance,
      precio: row.precio,
      nombre: row.nombre_actividad
    }));
    setEditId(row.id_actividad);
    setIsEditing(true);
  };


    const handleDeleteRow = row => {
        setDataTable(prev => prev.filter(r => r.id_actividad !== row.id_actividad));
    };

    const tableHeaders = [
        {
            id: 'nombre_actividad',
            text: 'Actividad',
            icon: <ViewComfyIcon/>
        },
        {
            id: 'unidad_avance',
            text: 'Unidad',
            icon: <BalanceIcon/>
        },
        {
            id: 'precio',
            text: 'Precio',
            icon: <MonetizationOnIcon/>
        }
    ];

    // Botón de tres puntos de edición
    const rowActions = [
        {
            icon: <EditIcon fontSize="small"/>,
            text: 'Editar',
            onClick: handleEditRow
        },
        {
            icon: <DeleteIcon fontSize="small"/>,
            text: 'Eliminar',
            onClick: handleDeleteRow
        }
    ];

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <BasicAdminContent
        showAccordion={false}
        formTitle="Captura de Actividades"
        formComponent={
      <FormNewActivity
        key={dataValue.id_actividad ?? 'new'}
        dataValue={dataValue}
        setDataValue={setDataValue}
        onAdd={handleAddActivity}
        isEditing={isEditing}
        editId={editId}
        onCancelEditing={() => {
          setIsEditing(false);
          setEditId(null);
          setDataValue(({
            id_actividad: null,
            cantidad_avance: "",
            precio: "",
            nombre: ""
          }));
        }}
      />
        }
        queryTitle="Actividades Capturadas"
        queryIcon={<GrassIcon />}
        formIcon={<GrassIcon />}
        tableComponent={
          <BasicTableComponent
            information={{ header: tableHeaders, body: dataTable }}
            showMenuColumn={true}
            items={rowActions}
          />
        }
      />
        <Snackbar
          open={alertInfo.open}
          autoHideDuration={3000}
          onClose={closeAlert}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={closeAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
            {alertInfo.message}
          </Alert>
        </Snackbar>
    </Box>
  );
};

export default Activity;
