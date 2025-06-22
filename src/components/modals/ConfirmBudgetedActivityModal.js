import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Divider
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconTextComponent from '../icontexts/IconTextComponent';
import WarningIcon from '@mui/icons-material/Warning';
import ButtonComponent from '../buttons/ButtonComponent';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import TaskIcon from '@mui/icons-material/Task';


const ConfirmBudgetedActivityModal = ({ open, setIsConfirmBudgetedActivityModalOpen, onAccept, onReject, onViewFile }) => {
  const onClose = () => {
    setIsConfirmBudgetedActivityModalOpen(false);
  }
  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 1 , pt:1}}>
        <IconTextComponent text={"Confirmación"} icon={<WarningIcon  fontSize="large" color="slateBlue"/>} />
      </Box>
      <Divider sx={{ backgroundColor: "#9AA0A8", height: "2px" }} />

      <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#495361" }}>
          ¿Desea marcar la actividad como verificada?
        </Typography>
        <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#E94C4C" }}>
          No podrá volver a modificarlo.
        </Typography>

        <Box sx={{mt:1}}>
          <ButtonComponent 
            label="Ver archivo" 
            icon={<TaskIcon />}
            color="strongGreen" 
            styleButton="contained"
            onClick={onViewFile} 
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'end', px: 3, pb: 2 }}>
        <ButtonComponent 
          label="Aceptar" 
          icon={<CheckIcon />}
          color="primary" 
          onClick={onAccept} 
        />
        <ButtonComponent 
          label="Rechazar" 
          icon={<CloseIcon />}
          color="error" 
          styleButton="contained"
          onClick={onReject} 
        />
        <ButtonComponent 
          label="cancelar" 
          icon={<CloseIcon />}
          color="brightRed" 
          styleButton="outlined"
          onClick={onClose} 
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmBudgetedActivityModal;
