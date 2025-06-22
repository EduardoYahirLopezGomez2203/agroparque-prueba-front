import { Box, Button } from '@mui/material';

const BasicButtonComponent = ({ styleButton, icon, color = "vividBlue", onClick, width = "40px", height = "40px" }) => {
    return (
        <Box textAlign="center" sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', paddingTop: 2 }}>
            <Button
                variant={styleButton}
                onClick={onClick}
                sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.25)",
                    width: width,
                    height: height,
                    minWidth: width,
                    minHeight: height,
                    padding: 0, // Elimina el padding interno
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex"
                }}
                color={color}
            >
                {icon}
            </Button>
        </Box>
    );
};

export default BasicButtonComponent;