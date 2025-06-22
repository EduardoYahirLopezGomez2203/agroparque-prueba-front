import { useEffect, useState } from 'react';
import AccordionComponent from '../components/accordions/AccordionComponent';
import { Typography, Box, Button, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import Header from '../modules/layer1/admin/Header'
import CatchWeek from '../modules/layer3/catchweek/CatchWeek';
import BudgetSection from '../modules/layer3/budgetsection/BudgetSection';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ActivitiesSection from '../modules/layer3/activitiessection/ActivitiesSection';

const AdminBudgetPage = () => {

    const [closeWeek, setCloseWeek] = useState(false);
    const [closeBudget, setCloseBudget] = useState(false);
    const [closeAcivityCapture, setCloseAcivityCapture] = useState(false);

    useEffect(() => {
        if (closeWeek) {
            setCloseWeek(false);
        } else if (closeAcivityCapture) {
            setCloseAcivityCapture(false)
        }
    }, [closeWeek, closeAcivityCapture]);

    return (
        <>
            <Header text="Gestión de Presupuestos" />

            <AccordionComponent
                disableHiddenTitle
                close={closeWeek}
                title="Captura de Semanas"
                icon={<EventIcon fontSize='large' color='slateBlue' />}
            >
                <CatchWeek onClose={setCloseWeek} />
            </AccordionComponent>

            <Divider />

            <AccordionComponent
                disableHiddenTitle
                close={closeBudget}
                title="Apartado de Presupuesto"
                icon={<AttachMoneyIcon fontSize='large' color='slateBlue' />}
            >
                <BudgetSection BigButton={BigButton} onClose={setCloseBudget} />
            </AccordionComponent>

            <Divider />

            <AccordionComponent
                disableHiddenTitle
                close={closeAcivityCapture}
                title="Apartado de Actividades"
                icon={<ViewComfyIcon fontSize='large' color='slateBlue' />}
            >
                <ActivitiesSection BigButton={BigButton} onClose={setCloseAcivityCapture}/>
            </AccordionComponent>

            <Divider />
        </>
    )
};

export default AdminBudgetPage;

const BigButton = ({ label, onClick, icon }) => {
    const [activeComponent, setActiveComponent] = useState('default');
    return (
        <Box textAlign="center" sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', padding: 2 }}>
            <Button
                onClick={onClick}
                sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#2e2e2e', // color oscuro
                    borderRadius: 2, // bordes redondeados
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    boxShadow: '0px 3px 9px rgba(0, 0, 0, 0.3)', // <- SOMBRA
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.6)', // sombra al pasar el cursor
                    },
                }}
            >
                {icon}
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#495361', paddingTop: 2 }}>
                {label}
            </Typography>
        </Box>
    );
};

