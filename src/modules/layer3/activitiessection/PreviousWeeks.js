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
import EditIcon from "@mui/icons-material/Edit";
import Visibility from '@mui/icons-material/Visibility';
import VpnKey from '@mui/icons-material/VpnKey';
import { useState } from "react";



const PreviousWeeks = ({setActiveComponent}) => {

    const [searchValue, setSearchValue] = useState('');

  const Back = () => {
    setActiveComponent('default'); // Regresa al componente inicial
  };

  const information = {
    header: [
      { id: "empresa", 
        text: "Empresa", 
        icon: <BusinessOutlinedIcon fontSize="large" color="slateBlue"/>
      },
      { id: "finca",
        text: "Finca",
        icon: <GrassOutlinedIcon fontSize="large" color="slateBlue"/>
      },
      { id: "area",
        text: "Área",
        icon: <ViewModuleIcon fontSize="large" color="slateBlue"/>
      },
      { id: "semana",
        text: "Semana",
        icon: <EventIcon fontSize="large" color="slateBlue"/>
      },
      { id: "total_presupuesto",
        text: "Total Presupuesto",
        icon: <AttachMoneyIcon fontSize='large'  color='slateBlue' />
      },
      { id: "status",
        text: "Status",
        icon: <CheckCircleIcon fontSize="large" color="slateBlue"/>
      },
    ],
    body: [
      {
        id: 1,
        empresa: "Empresa A",
        finca: "Finca A",
        area: "Área A",
        semana: "Semana 1",
        total_presupuesto: "$1000",
        status: "Aprobado",
      },
      {
        id: 2,
        empresa: "Empresa B",
        finca: "Finca B",
        area: "Área B",
        semana: "Semana 2",
        total_presupuesto: "$2000",
        status: "Pendiente",
      },
      {
        id: 3,
        empresa: "Empresa C",
        finca: "Finca C",
        area: "Área C",
        semana: "Semana 3",
        total_presupuesto: "$3000",
        status: "Rechazado",
      },
      {
        id: 4,
        empresa: "Empresa D",
        finca: "Finca D",
        area: "Área D",
        semana: "Semana 4",
        total_presupuesto: "$4000",
        status: "Aprobado",
      },
    ],
  };

  const menuOptions =[
     {text: "Ver", icon: <Visibility />, onClick: () => {} },
     { text: "Editar", icon: <EditIcon />, onClick: () => {} },
     { text: "Modificar Autorizado", icon: <VpnKey />, onClick: () => {} }
  ];


    const handleSearch = () => {
        console.log('Buscando:', searchValue);
    };


  return (
    <>
    <SectionForm icon = {<AttachMoneyIcon fontSize='large'  color='slateBlue' />} title={"Consulta de Semanas Anterirores"}/>
    <div style={{ display: 'flex', justifyContent: 'end', marginBottom: "20px", marginTop: '20px' }}>
      <SearchComponent
        value={searchValue}
        onChange={setSearchValue}
        onSearch={handleSearch}
        width="50%"
      />
    </div>
    <DinamicTableComponent
      information={information} 
      menuOptions={menuOptions}
    />
    <ButtonComponent
      icon={<ArrowBackIcon />}
      label='Regresar'
      color="error"
      styleButton="contained"
      onClick= {Back}
    />
    </>
  );
}

export default PreviousWeeks;