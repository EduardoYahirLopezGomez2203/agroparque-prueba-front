import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import ButtonComponent from "../buttons/ButtonComponent";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const FileModal = ({ isOpen, onCloseWithAnyChanges, onClose, onSelectFile, selectedFileType, selectType, archivos, removeFile, selectedItemName, fileDetails , SectionForm}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <div style={{ padding: "15px" }}>
      <div style={{ padding: "0px 30% 0px 0px" }}>
        <SectionForm title="Añadir Archivos" icon={<NoteAddRoundedIcon fontSize="large" color="slateBlue"/>} />
        </div>
      <DialogContent>
        <List>
          {fileDetails.map((fileDetail, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => removeFile(fileDetail.name)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={`${fileDetail.tipo_documento} - ${fileDetail.name}`} />
            </ListItem>
          ))}
        </List>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="outlined" style={{ flex: 1 }} onClick={selectedFileType}>
            {selectedItemName ? selectedItemName : "Seleccionar Tipo de Archivo"}
          </Button>
          <Button 
            variant="outlined" 
            style={{ flex: 1 }} 
            onClick={onSelectFile} 
            disabled={!selectType} // Deshabilitado si selectType es false
          >
            Seleccionar Archivos
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
      <ButtonComponent
          label="Guardar"
          onClick={onCloseWithAnyChanges}
          icon={<CheckIcon />}
        />
        <ButtonComponent
          styleButton="outlined"
          label="Cancelar"
          onClick={onClose}
          color="brightRed"
          icon={<CloseIcon />}
        />
      </DialogActions>
      </div>
    </Dialog>
  );
};

export default FileModal;