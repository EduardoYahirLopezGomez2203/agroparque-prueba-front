import { Accordion, AccordionDetails, AccordionSummary, IconButton } from "@mui/material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import IconTextComponent from "../icontexts/IconTextComponent";
import { useEffect, useState } from "react";

const AccordionComponent = ({ icon, title, children, disableHiddenTitle = false, isUpdate = false, close }) => {

    const [expanded, setExpanded] = useState(false);

    const handleChange = (_, isExpanded) => {
        setExpanded(isExpanded); 
    };

    useEffect(() => {
        if (close && expanded) {
            setExpanded(false);
        }
    }, [close])

    useEffect(() => {
        if (isUpdate) {
            setExpanded(true);
        }
    }, [isUpdate])

    return (
        <Accordion 
            slotProps={{ transition: { unmountOnExit: true } }}
            disableGutters 
            sx={{ boxShadow: "none" }} 
            expanded={ expanded } 
            onChange={ handleChange }
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

export default AccordionComponent;