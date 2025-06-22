import { Typography, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useState} from 'react';
import BudgetCapture from './BudgetCapture';
import PreviousQuotes from './PreviousQuotes';

const BudgetSection = ({BigButton, onClose}) => {
    onClose(false);
    const [activeComponent, setActiveComponent] = useState('default');
    const [activeStep, setActiveStep] = useState(0);
    const [dataTable, setDataTable] = useState([]);
    const [isPastBudget, setIsPastBudget] = useState(false);

    const initialData = {
        //datos que nunca cambian
        id_semana: "",
        id_empresa: "",
        id_finca: "",
        id_area: "",
        id_presupuesto: "",
        cns_detalle_presupuesto: "",
        cns_detalle_finca:"",
        status_presupuesto: "10",
        
        //datos que cambian
        id:"",
        id_actividad: "",
        cns_detalle_actividad: "",
        nombre_actividad:"",
        unidad: "",
        precio: "",
        cantidad: "",
        total: "",
        isPastBudget: false,
    };

    const [dataValue, setDataValue] = useState(initialData);

    return ( <>
        {activeComponent === 'default' && <Stack direction="column" sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="fontFamily" sx={{ fontWeight: 550, fontSize: '1.0rem', color: '#495361', paddingTop: 2 }}>
                Seleccione una opción
            </Typography>
            <Stack direction="row" sx={{ justifyContent: "center", gap: 7, paddingTop: "3px" }}>
            <BigButton
                            label="Captura de Presupuesto"
                            onClick={() => setActiveComponent('captureBudget')} // Cambia el estado al hacer clic
                            icon={<AddIcon sx={{ color: 'white', fontSize: 100 }} />}
                        />
                        <BigButton
                            label="Presupuestos Anteriores"
                            onClick={() => setActiveComponent('previousBudgets')} // Cambia el estado al hacer clic
                            icon={<AttachMoneyIcon sx={{ color: 'white', fontSize: 90 }} />}
                        />
            </Stack>
        </Stack>}

        {activeComponent === 'captureBudget' && (
                <BudgetCapture setActiveComponent={setActiveComponent} dataTable={dataTable} setDataTable={setDataTable} initialData={initialData} dataValue={dataValue} setDataValue={setDataValue} activeStep={activeStep} setActiveStep={setActiveStep} isPastBudget={isPastBudget} onClose={onClose}/> // Renderiza el componente de captura de presupuesto
        )}

        {activeComponent === 'previousBudgets' && (
                <PreviousQuotes setActiveComponent={setActiveComponent} dataTable={dataTable} setDataTable={setDataTable} setDataValue={setDataValue} setActiveStep={setActiveStep} setIsPastBudget={setIsPastBudget}/>
        )}
    </>
    );
};

export default BudgetSection;



