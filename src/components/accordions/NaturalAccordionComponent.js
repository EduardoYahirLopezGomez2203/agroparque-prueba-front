import { Accordion, AccordionDetails, AccordionSummary, IconButton } from "@mui/material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import IconTextComponent from "../icontexts/IconTextComponent";
import { useEffect, useState } from "react";

const NaturalAccordionComponent = ({
    icon, title, children, disableHiddenTitle = false, expanded,
    onChange = (expanded) => {}
}) => {

    return (
        <Accordion 
            slotProps={{ transition: { unmountOnExit: true } }}
            disableGutters 
            sx={{ boxShadow: "none" }} 
            expanded={ expanded } 
            onChange={ (_, expanded) => onChange(expanded) }
        >
            <AccordionSummary 
                expandIcon={ // Icono situado a la derecha
                    <IconButton sx={{ bgcolor: "#D9D9D9", borderRadius: "5px" }}>
                        <ArrowForwardIosRoundedIcon color="slateBlue"/> 
                    </IconButton>
                }
                sx={{
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        transition: 'transform 0.3s ease', // Agrega una transición suave
                        '&.Mui-expanded': {
                            transform: 'rotate(90deg)', // Rotación al expandir
                        },
                    }
                }}
            >
                { (!expanded || disableHiddenTitle) && <IconTextComponent icon={ icon } text={ title } /> }
            </AccordionSummary>
            
            <AccordionDetails sx={{ paddingBottom: 1}}>
                { children }
            </AccordionDetails>
        </Accordion>
    );
};

export default NaturalAccordionComponent;