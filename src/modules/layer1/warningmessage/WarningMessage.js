import { Stack, Typography } from "@mui/material";
import ButtonComponent from "../../../components/buttons/ButtonComponent";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from '@mui/icons-material/Close';
import WestIcon from '@mui/icons-material/West';

const WarningMessage = ({ title, handleBack, handleFinish, handleSave, handleCancel }) => {
    return (
        <div style={{
            textAlign: 'center',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column', // Cambiado de 'direction' a 'flexDirection'
            alignItems: 'center'
        }}>
            <Typography
                variant="fontFamily"
                sx={{
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    color: '#495361',
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="fontFamily"
                sx={{
                    fontWeight: 520,
                    fontSize: '1.0rem',
                    color: '#E94C4C',
                }}
            >
                No podrá volver a modificarlo
            </Typography>
            <Stack direction="row" sx={{ justifyContent: "center", gap: 2, paddingTop: "35px" }}>
                <ButtonComponent
                    label={"Anterior"}
                    typeButton="reset"
                    icon={<WestIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={handleBack}
                />
                <ButtonComponent
                    label={"Finalizar"}
                    typeButton="button"
                    icon={<CheckIcon />}
                    onClick={handleFinish}
                />
                <ButtonComponent
                    label={"Guardar"}
                    typeButton="submit"
                    icon={<SaveIcon />}
                    styleButton="outlined"
                    color="vividGreen"
                    onClick={handleSave}
                />
                <ButtonComponent
                    label={"Cancelar"}
                    typeButton="reset"
                    icon={<CloseIcon />}
                    styleButton="outlined"
                    color="brightRed"
                    onClick={handleCancel}
                />
            </Stack>
        </div>
    );
};

export default WarningMessage