import { useEffect, useState } from 'react';
import { Typography, Box, Button, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import Header from '../modules/layer1/admin/Header'
import CatchWeek from '../modules/layer3/catchweek/CatchWeek';
import BudgetSection from '../modules/layer3/budgetsection/BudgetSection';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ActivitiesSection from '../modules/layer3/activitiessection/ActivitiesSection';
import NaturalAccordionComponent from '../components/accordions/NaturalAccordionComponent';

const AdminBudgetPage = () => {

    const [closeWeek, setCloseWeek] = useState(false);
    const [closeBudget, setCloseBudget] = useState(false);
    const [closeActivityCapture, setCloseActivityCapture] = useState(false);

    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        if (closeWeek || closeActivityCapture || closeBudget) {
            setExpandedId(null); // Cierra todos
            setCloseWeek(false);
            setCloseBudget(false);
            setCloseActivityCapture(false);
        }
    }, [closeWeek, closeBudget, closeActivityCapture]);

    const accordionsBudget = [
        {
            id: 'week',
            title: 'Captura de Semanas',
            icon: <EventIcon fontSize="large" color="slateBlue" />,
            component: <CatchWeek onClose={setCloseWeek} />,
        },
        {
            id: 'budget',
            title: 'Apartado de Presupuesto',
            icon: <AttachMoneyIcon fontSize="large" color="slateBlue" />,
            component: <BudgetSection BigButton={BigButton} onClose={setCloseBudget} />,
        },
        {
            id: 'activity',
            title: 'Apartado de Actividades',
            icon: <ViewComfyIcon fontSize="large" color="slateBlue" />,
            component: <ActivitiesSection BigButton={BigButton} onClose={setCloseActivityCapture} />,
        },
    ];

    return (
        <>
            <Header text="Gestión de Presupuestos" />

            {accordionsBudget.map((element) => {
                const isExpanded = expandedId === element.id;

                const handleChange = () => {
                    setExpandedId((prev) => (prev === element.id ? null : element.id));
                };

                return (
                    <Box key={element.id}>
                        <NaturalAccordionComponent
                            disableHiddenTitle
                            expanded={isExpanded}
                            onChange={handleChange}
                            title={element.title}
                            icon={element.icon}
                        >
                            {element.component}
                        </NaturalAccordionComponent>
                        <Divider />
                    </Box>
                );
            })}
        </>
    );
};

export default AdminBudgetPage;

const BigButton = ({ label, onClick, icon }) => {
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

