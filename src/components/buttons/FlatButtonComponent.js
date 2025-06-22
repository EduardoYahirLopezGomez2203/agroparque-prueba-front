import React from 'react';
import { Button } from '@mui/material';

const FlatButtonComponent = ({ 
    onClick, 
    label = "Click me", 
    color, 
    styleButton = "contained", 
    typeButton = "button"
}) => {
    return (
        <Button 
            variant={ styleButton } // contained, outlined, text
            onClick={ onClick }
            type={ typeButton } // button, reset, submit
            sx={{ 
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "5px",
                boxShadow: 0,
                padding: "10px 10px",
                minWidth: "150px",
                height: "35px"
            }}
            color={ color }
        >
            { label }
        </Button>
    );
};

export default FlatButtonComponent;