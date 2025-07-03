import { Typography, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import { useState } from 'react';
import ActivityCapture from './ActivityCapture';
import PreviousWeeks from './PreviousWeeks';

const ActivitiesSection = ({ BigButton, onClose }) => {
    const [activeComponent, setActiveComponent] = useState('default');

    return (<>
        {activeComponent === 'default' && <Stack direction="column" sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="fontFamily" sx={{ fontWeight: 550, fontSize: '1.0rem', color: '#495361', paddingTop: 2 }}>
                Seleccione una opción
            </Typography>
            <Stack direction="row" sx={{ justifyContent: "center", gap: 7, paddingTop: "3px" }}>
                <BigButton
                    label="Captura de Actividades"
                    onClick={() => setActiveComponent('activityCapture')} // Cambia el estado al hacer clic
                    icon={<AddIcon sx={{ color: 'white', fontSize: 100 }} />}
                />
                <BigButton
                    label="Semanas Anteriores"
                    onClick={() => setActiveComponent('previousWeeks')} // Cambia el estado al hacer clic
                    icon={<EventIcon sx={{ color: 'white', fontSize: 90 }} />}
                />
            </Stack>
        </Stack>}

        {activeComponent === 'activityCapture' && (
            <ActivityCapture setActiveComponent={setActiveComponent} onClose={onClose}/>
        )}

        {activeComponent === 'previousWeeks' && (
            <PreviousWeeks setActiveComponent={setActiveComponent} onClose={onClose} />
        )}
    </>
    );
};

export default ActivitiesSection;



