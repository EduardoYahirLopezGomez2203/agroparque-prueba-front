import { useState, useEffect } from "react";
import { Dialog, DialogActions, Box, Snackbar, Alert, Divider, Typography } from "@mui/material";
import BasicTableComponent from "../table/BasicTableComponent";
import useSnackbarAlert from "../../modules/layer1/formactivitymanager/useSnackbarAlert";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconTextComponent from '../icontexts/IconTextComponent';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonComponent from '../buttons/ButtonComponent';
import {SelectForm} from '../../modules/layer1/admin/Form';
import {DialogContent} from '@mui/material';

const AddAreaModal = ({open, setIsOpenModal, dataArea, saveAreas, isEditing, initialSelectedIds = []}) => {
  const initialData = { id_area: null, nombre_area: "" };
  const [dataValue, setDataValue] = useState(initialData);
  const [tableData, setTableData] = useState([]);
  const [formValue, setFormValue] = useState({ id_area: null });
  const [editId, setEditId] = useState(null);
  const { alertInfo, showAlert, closeAlert } = useSnackbarAlert();

  const closeModal = () => {
    setIsOpenModal(false);
    setDataValue(initialData);
    setTableData([]);
    setEditId(null);
  };

  useEffect(() =>{
    if (open && isEditing){
      console.log("Las áreas seleccionadas previamente son: ", initialSelectedIds);
    }

    const rows = initialSelectedIds.map(id => ({
      id_area: id,
      nombre_area: dataArea.find(area => area.id === id)?.nombre || "Hola"
    }));
    setTableData(rows);
  }, [open, isEditing, initialSelectedIds, dataArea])

  const handleAddArea = () => {
    if (!dataValue.id_area) {
      showAlert("Selecciona un área antes de añadir", "warning");
      return;
    }
    
    const isEditing = editId !== null;
    const dup = tableData.some(r =>
      r.id_area === dataValue.id_area &&
      (!isEditing || r.id_area !== editId)
    );
    if (dup) {
      showAlert("Esa área ya está en la tabla. No se permiten duplicados.", "warning");
      return;
    }

        const areaObj = dataArea.find(a => a.id === dataValue.id_area);
        const record = {
            id_area: dataValue.id_area,
            nombre_area: areaObj?.nombre || ''
        };

        if (isEditing) {
            // Actualiza
            const idx = tableData.findIndex(r => r.id_area === editId);
            if (idx !== -1) {
                const copy = [...tableData];
                copy[idx] = record;
                setTableData(copy);
                showAlert('Área actualizada', 'success');
            }
        } else {
            // agrega
            setTableData(prev => [...prev, record]);
            showAlert('Área agregada', 'success');
        }

        // limpiar estado de formulario
        setDataValue(initialData);
        setEditId(null);
    };


    const handleEditRow = row => {
        setDataValue({
            id_area: row.id_area,
            nombre_area: row.nombre_area
        });
        setEditId(row.id_area);
    };

    const handleDeleteRow = row => {
        setTableData(prev => prev.filter(r => r.id_area !== row.id_area));
        showAlert('Área eliminada', 'info');
    };

    const handleSaveAll = () => {
        if (tableData.length === 0) {
            showAlert('Agrega al menos una área', 'warning');
            return;
        }
        const ids = tableData.map(r => r.id_area);
        saveAreas(ids);
        showAlert('Áreas guardadas', 'success');
        closeModal();
    };

    const tableHeaders = [{
        id: 'nombre_area',
        text: 'Área',
        icon: <AddCircleIcon/>,
        align: 'center'
    }];
    const rowActions = [{
        icon: <EditIcon fontSize="small"/>,
        text: 'Editar',
        onClick: handleEditRow
    }, {
        icon: <DeleteIcon fontSize="small"/>,
        text: 'Eliminar',
        onClick: handleDeleteRow
    }];

    return (<>
            <Dialog open={open} maxWidth="xs" fullWidth>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '15px'
                }}
                >
                    <IconTextComponent
                        text={'Añadir Detalle de Áreas'}
                        icon={<AddCircleIcon fontSize="large" color="slateBlue"/>}
                    />
                </Box>
                <Divider sx={{
                    backgroundColor: '#9AA0A8',
                    height: '2px'
                }}/>
                <DialogContent sx={{
                    width: '100%',
                    pt: 2
                }}>
                    <Typography
                        variant="body1"
                        fontWeight="400"
                        color="slateBlue"
                        align="center"
                    >
                        Seleccione detalle de área
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Box sx={{width: 200}}>
                            <SelectForm
                                title="Área"
                                fieldName="id_area"
                                options={dataArea}
                                dataValue={dataValue}
                                setDataValue={setDataValue}
                                isRequired
                                fullWidth
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogContent sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 1.5
                }}>
                    <ButtonComponent
                        typeButton="button"
                        label={editId ? 'Actualizar' : 'Guardar'}
                        color="strongGreen"
                        onClick={handleAddArea}
                        icon={<SaveIcon/>}
                    />
                </DialogContent>
                <Typography
                    variant="body1"
                    fontWeight="400"
                    color="slateBlue"
                    align="center"
                >
                    Detalles de áreas guardado
                </Typography>
                <Box
                    p={2}
                    sx={{
                        '& .MuiTableCell-head': {
                            textAlign: 'center'
                        }
                    }}
                >
                    <BasicTableComponent
                        information={{
                            header: tableHeaders,
                            body: tableData
                        }}
                        showMenuColumn
                        items={rowActions}
                    />
                </Box>
                <DialogActions>
                    <ButtonComponent
                        label="Aceptar"
                        color="primary"
                        onClick={handleSaveAll}
                        icon={<CheckIcon/>}
                    />
                    <ButtonComponent
                        label="Cancelar"
                        styleButton="outlined"
                        color="brightRed"
                        onClick={closeModal}
                        icon={<CloseIcon/>}
                    />
                </DialogActions>
            </Dialog>
            <Snackbar
                open={alertInfo.open}
                autoHideDuration={3000}
                onClose={closeAlert}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Alert onClose={closeAlert} severity={alertInfo.severity} sx={{width: '100%'}}>
                    {alertInfo.message}
                </Alert>
            </Snackbar>
        </>);
};

export default AddAreaModal;
