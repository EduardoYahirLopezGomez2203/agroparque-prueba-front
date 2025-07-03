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

const Activity = ({ dataValue, setDataValue, initialData, dataTable, setDataTable, originalData }) => {

  // Estados de edición
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Estado de Alertas
  const { alertInfo, showAlert, closeAlert } = useSnackbarAlert();

  // Agregar o actualizar fila en frontend
  const handleAddActivity = newRecord => {
    const precioRaw = newRecord.precio;
    const precio2 = Math.round(precioRaw * 100) / 100;

    const existing = dataTable.find(r => r.id_actividad === newRecord.id_actividad);

    // Caso 1: Ya existe y NO está eliminado
    if (isEditing) {
      if ( existing && existing.id_actividad !== editId && existing.operacion !== 3 ) {
        showAlert("Esta actividad ya ha sido agregada, no se permiten duplicados.", "warning");
        return;
      }
    } else {
      // Si está editando, validación normal
      if (existing && existing.operacion !== 3) {
        showAlert("Esta actividad ya ha sido agregada, no se permiten duplicados.", "warning");
        return;
      }
    }

    // Caso 2: Si estaba eliminada, se marca como actualizada
    if (existing && existing.operacion === 3 && !isEditing) {
      const updated = {
        ...existing,
        precio: precio2,
        operacion: 2 
      };
      setDataTable(prev => prev.map(r =>
        r.id_actividad === newRecord.id_actividad ? updated : r
      ));
      setIsEditing(false);
      setEditId(null);
      setDataValue({
        id_actividad: null,
        cantidad_avance: "",
        precio: "",
        nombre: ""
      });
      return;
    }

  // Buscar si esta actividad ya existía originalmente
  const original = originalData.find(o => o.id_actividad === newRecord.id_actividad);
  const isOriginal = !!original;

  let operacion = 1; // Por defecto es nueva

  if (isOriginal) {
    const cambioPrecio = Number(original.precio) !== Number(precio2);
    const cambioActividad = original.id_actividad !== newRecord.id_actividad;

    if (cambioPrecio || cambioActividad) {
      operacion = 2;
    } else {
      operacion = 0; // Sin cambios
    }
  }

  const row = {
    id: newRecord.id_actividad,
    id_actividad: newRecord.id_actividad,
    nombre_actividad: newRecord.nombre,
    unidad_avance: newRecord.cantidad_avance,
    precio: precio2,
    operacion,
    ...(original && { cns_detalle_actividad: original.cns_detalle_actividad })
  };

  const idx = dataTable.findIndex(r => r.id_actividad === editId);

  if (idx !== -1) {
      const copy = [...dataTable];
      copy[idx] = row;
      setDataTable(copy);
  } else {
    setDataTable(prev => [...prev, row]);
  }

  setIsEditing(false);
  setEditId(null);
  setDataValue({
    id_actividad: null,
    cantidad_avance: "",
    precio: "",
    nombre: ""
    });
  };

  const handleEditRow = row => {
    console.log("Editar fila:", row);
    setDataValue({
      id_actividad: row.id_actividad,
      cantidad_avance: row.unidad_avance,
      precio: row.precio,
      nombre: row.nombre_actividad
    });
    setEditId(Number(row.id_actividad)); 
    setIsEditing(true);
  };



  const handleDeleteRow = row => {
    const esOriginal = originalData.some(o => o.id_actividad === row.id_actividad);

    if (esOriginal) {
      // Solo actualiza su operación a 3 en el estado
      setDataTable(prev =>
        prev.map(r =>
          r.id_actividad === row.id_actividad
          ? { ...r, operacion: 3 }
          : r
        )
      );
    } else {
        // Si es nuevo, se elimina directamente
        setDataTable(prev => prev.filter(r => r.id_actividad !== row.id_actividad));
      }
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
        originalData={originalData} // Datos originales para comparar
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
            information={{
              header: tableHeaders,
              body: dataTable.filter(r => r.operacion !== 3) // Oculta visualmente los eliminados
            }}
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
