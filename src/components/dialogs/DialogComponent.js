import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material"
import IconTextComponent from "../icontexts/IconTextComponent";
import ButtonComponent from "../buttons/ButtonComponent";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const DialogComponent = ({ title, icon, children, openDialog, setOpenDialog, onClickAccept, onClickCancel }) => {

    const handleClickAccept = () => {
        if (onClickAccept) {
            onClickAccept()
        }
    }

    const handleClickCancel = () => {
        if(onClickAccept) {
            onClickCancel()
        }
    }

    return (
        <Dialog open={ openDialog }>
            <DialogTitle>
                <IconTextComponent text={title} icon={icon} justifyContent="start" />
                <Divider sx={{ backgroundColor: "#9AA0A8", height: "2px" }} />
            </DialogTitle>
            <DialogContent>
               { children || "Sin contenido" }
            </DialogContent>
            <DialogActions>
                <ButtonComponent 
                    label="Aceptar" 
                    icon={ <CheckIcon /> } 
                    onClick={handleClickAccept}
                />
                <ButtonComponent 
                    label="Cancelar" 
                    icon={ <CloseIcon /> } 
                    styleButton="outlined" 
                    color="brightRed" 
                    onClick={handleClickCancel}
                />
            </DialogActions>
        </Dialog>
    );
}

export default DialogComponent;