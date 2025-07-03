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
import useBudgetDetailList from "../../layer1/formbudgetsection/usePastBudgetList";

const PreviousQuotes = ({setActiveComponent, setDataValue, setActiveStep, setIsPastBudget}) => {

  const [searchValue, setSearchValue] = useState('');
  const { handleList, processedData } = useBudgetDetailList();

  useEffect(() => {
    handleList();
  }, [handleList]);

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
    body: processedData.body.map(item => ({
      id: String(crypto.randomUUID()),
      id_semana: item.semana.id_semana,
      id_empresa: item.empresa.id_empresa,
      id_finca: item.finca.id_finca,
      id_area: item.area.id_area,
      id_presupuesto: item.presupuesto.id_presupuesto,
      empresa: item.empresa.nombre_empresa,
      finca: item.finca.nombre_finca,
      area: item.area.nombre_area,
      semana: item.semana.numero_semana,
      total_presupuesto: item.presupuesto.presupuesto,
      status_presupuesto: String(item.status.id_status),
      status: item.status.nombre_status,
      cns_detalle_presupuesto: item.presupuesto.cns_detalle_presupuesto,
      cns_detalle_finca: item.finca.cns_detalle_finca
    }))
  };

  const handleClick = (row) => {
    setDataValue({
      id_semana: String(row.id_semana),
      id_empresa: String(row.id_empresa),
      id_finca: String(row.id_finca),
      id_area: String(row.id_area),
      id_presupuesto: String(row.id_presupuesto),
      status_presupuesto: row.status_presupuesto,
      cns_detalle_finca: row.cns_detalle_finca
    });
      setIsPastBudget(true);
      setActiveComponent('captureBudget');
      setActiveStep(0);
      setActiveStep(1);
    };

  const menuOptions = [
    { text: "Ver", icon: <Visibility />, onClick: handleClick },
  ];

  const handleSearch = () => {
    console.log('Buscando:', searchValue);
  };

  return (
    <>
      <SectionForm icon={<AttachMoneyIcon fontSize='large' color='slateBlue' />} title={"Consulta de Presupuestos Anteriores"}/>
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
        onClick={Back}
      />
    </>
  );
}

export default PreviousQuotes;