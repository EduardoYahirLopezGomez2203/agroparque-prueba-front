import { Box, Typography } from "@mui/material";

const IconTextComponent = ({ 
    text, 
    icon, 
    variant = "body1", // h1-h6, body, etc...
    fontWeight = 600, 
    color = "slateBlue"
}) => {
    return (
        <Box 
            sx={{ 
                display: "flex", 
                gap: 0.8,
                alignItems: "center"
            }} 
        >
            { icon }
            <Typography 
                variant={ variant }
                color={ color }
                fontWeight={ fontWeight } 
            > 
                { text } 
            </Typography>
        </Box>
    );
}

export default IconTextComponent;