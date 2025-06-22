import React from 'react';
import { Button, Typography } from '@mui/material';

const ButtonComponent = ({ 
    onClick, 
    icon, 
    rightIcon,
    label = "Click me", 
    color = "vividBlue", 
    styleButton = "contained", 
    typeButton = "button", 
    title = "", // Prop para el título
    sx = {} // Prop para estilos adicionales
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Mostrar título si no está vacío */}
            {title && (
                <Typography
                    variant="body1"
                    color='slateBlue'
                    sx={{
                        fontWeight: 500,
                        marginTop:'8px',
                        marginBottom: '0px',
                        fontSize: "13px",
                        textTransform: 'none', // Evita que el texto se transforme a mayúsculas
                    }}
                >
                    {title}
                </Typography>
            )}

            <Button 
                variant={styleButton} // contained, outlined, text
                startIcon={icon} 
                endIcon={rightIcon}
                onClick={onClick}
                type={typeButton} // button, reset, submit
                sx={{ 
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: "5px",
                    boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.25)",
                    padding: "0px 10px",
                    minWidth: "110px",
                    height: "26px",
                    justifyContent: "start",
                    ...sx
                }} 
                color={color}
            >
                {label}
            </Button>
        </div>
    );
};

export default ButtonComponent;
