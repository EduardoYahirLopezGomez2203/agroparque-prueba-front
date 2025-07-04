import ButtonComponent from "../../../components/buttons/ButtonComponent";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchComponent from "../../../components/search/SearchComponent";
import { SectionForm } from "../../layer1/admin/Form";
import DinamicTableComponent from "../../../components/table/DinamicTableComponent";
import Visibility from '@mui/icons-material/Visibility';
import { useEffect, useState } from "react";
import useBudgetCurrentYearList from "../../layer1/formbudgetsection/useBudgetCurrentYearList";

const PreviousWeeks = ({ setActiveComponent }) => {

    const { handleList, processedData, error } = useBudgetCurrentYearList()

    useEffect(() => {
        handleList()
    }, [])

    const [information, setInformation] = useState([]);

    useEffect(() => {
        if (error) {
            return
        }

        setInformation(processedData.body.map(element => ({
            ...element,
            area: element.detalle_finca.area.nombre,
            empresa: element.detalle_finca.finca.empresa.nombre,
            finca: element.detalle_finca.finca.nombre,
            presupuesto: element.presupuesto,
            semana: `Semana ${element.semana.numero_semana}`,
            status: element.status.nombre
        })))
        
    }, [processedData, error])

    const Back = () => {
        setActiveComponent('default'); // Regresa al componente inicial
    };

    const menuOptions = [
        { text: "Ver", icon: <Visibility />, onClick: () => { } }
    ];

    const [searchData, setSearchData] = useState('');
    //const [searchType] = React.useState(defaultSearchType);
    const [searchInformation, setSearchInformation] = useState(information)

    useEffect(() => {
        setSearchInformation(information)
    }, [information])

    const handleChange = (value) => {
        setSearchData(value)
        handleSearch(value)
    }

    // Busqueda temporal en frontend
    const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
            setSearchInformation(information)
            return
        }

        const normalizeString = (str) => {
            return str
                .normalize("NFD") // Normalizar caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "") // Eliminar diacríticos
                .toLowerCase();
        };

        const searchTerms = normalizeString(searchTerm)
            .split(/\s+/) // Dividir por espacios
            .filter(term => term.length > 0); // Eliminar términos vacíos

        if (searchTerms.length === 0) {
            setSearchInformation(null);
            return;
        }

        const filteredBody = information.filter(row => {
            const rowValues = Object.values(row)
                .map(value =>
                    typeof value === 'string'
                        ? normalizeString(value)
                        : String(value).toLowerCase()
                )
                .join(' '); // Concatenar todos los valores del registro

            return searchTerms.every(term =>
                rowValues.includes(term)
            );
        });

        setSearchInformation(filteredBody);
    };

    return (
        <>
            <SectionForm icon={<AttachMoneyIcon fontSize='large' color='slateBlue' />} title={"Consulta de Semanas Anterirores"} />
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: "20px", marginTop: '20px' }}>
                <SearchComponent
                    value={searchData}
                    onChange={handleChange}
                    width="50%"
                />
            </div>
            <DinamicTableComponent
                information={{
                    header: tableHeaders,
                    body: searchInformation
                }}
                menuOptions={menuOptions}
            />
            <ButtonComponent
                icon={<ArrowBackIcon />}
                label='Regresar'
                color="error"
                styleButton="contained"
                onClick={Back}
            />
        </>
    );
}

const tableHeaders = [
    {
        id: "empresa",
        text: "Empresa",
        icon: <BusinessOutlinedIcon fontSize="large" color="slateBlue" />
    },
    {
        id: "finca",
        text: "Finca",
        icon: <GrassOutlinedIcon fontSize="large" color="slateBlue" />
    },
    {
        id: "area",
        text: "Área",
        icon: <ViewModuleIcon fontSize="large" color="slateBlue" />
    },
    {
        id: "semana",
        text: "Semana",
        icon: <EventIcon fontSize="large" color="slateBlue" />
    },
    {
        id: "presupuesto",
        text: "Total Presupuesto",
        icon: <AttachMoneyIcon fontSize='large' color='slateBlue' />
    },
    {
        id: "status",
        text: "Status",
        icon: <CheckCircleIcon fontSize="large" color="slateBlue" />
    }
]

export default PreviousWeeks;