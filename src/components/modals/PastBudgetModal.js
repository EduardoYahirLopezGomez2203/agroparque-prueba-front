import React from 'react';
import { Modal, Box, Typography, Divider } from '@mui/material';
import DinamicTableComponent from '../table/DinamicTableComponent';
import ButtonComponent from '../buttons/ButtonComponent';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import IconTextComponent from '../icontexts/IconTextComponent';
import PaidIcon from '@mui/icons-material/Paid';
import SelectComponent from '../selects/SelectComponent';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import DescriptionIcon from '@mui/icons-material/Description';

const PastBudgetModal = ({ isOpen, setIsPastBudgetModalOpen, dataSecondary, setDataSecondary, dataPastBudgetPerMonth, dataActivityByBudgetToPut, setDataTable, setBudgetActivities, setDataValue, dataTable, showAlert}) => {

  const tableInformation = {
    header: [
        { id: 'numero_semana', 
          text: 'Semana', 
          icon: <DescriptionIcon fontSize="large" color="slateBlue" /> },
        { id: 'presupuesto',
          text: 'Presupuesto', 
          icon: <ArtTrackIcon fontSize='large' 
          color='slateBlue'/> 
        },
    ],
    body: dataPastBudgetPerMonth
  };

  const tableInformation2 = {
    header: [
        { id: 'nombre_actividad', 
          text: 'Actividad' , 
          icon: <DescriptionIcon fontSize="large" color="slateBlue"/>
        },
        { id: 'precio', 
          text: 'Precio', 
          icon: <ArtTrackIcon fontSize='large' color='slateBlue'/> 
        },
        { id: 'cantidad', 
          text: 'Cantidad', 
          icon: <ArtTrackIcon fontSize='large' color='slateBlue'/> 
        },
        { id: 'presupuesto', 
          text: 'Presupuesto', 
          icon: <ArtTrackIcon fontSize='large' color='slateBlue'/> 
        },
    ],
    body: dataActivityByBudgetToPut
  };

  const activitiesToPut = () =>{
    if(dataActivityByBudgetToPut.length !== 0){
      const alreadyExists = dataActivityByBudgetToPut.some(activity =>
        dataTable.some(item => item.id_actividad === activity.id_actividad)
      );
      if (!alreadyExists) {
        const firstItem = dataActivityByBudgetToPut[0]
        setDataTable(prev => [...prev, ...dataActivityByBudgetToPut]);
        setBudgetActivities(prev => [...prev, ...dataActivityByBudgetToPut]);
        setDataValue(prev => ({
          ...prev,
          cns_detalle_finca: firstItem.cns_detalle_finca
        }));
        onClose();
      } else {
        showAlert("No se pudo cargar, ya que existe una o más actividades en la tabla.", "warning");
      }
    }
  }
  const onClose = () => {
    dataActivityByBudgetToPut = [];
    dataPastBudgetPerMonth = [];
    setDataSecondary({
        id_mes: "",
        id_presupuesto: "",
    });
    setIsPastBudgetModalOpen(false);
  }

  const menuOptions =[
    {text: "Ver", icon: <CheckIcon />, onClick: (row) => {
      setDataSecondary(prev => ({
        ...prev,
        id_presupuesto: row.id_presupuesto
      }));
    }},
  ];

  return (
    <Modal
      open={isOpen}
    >
      <Box 
        sx={{
            position: 'absolute',
            top: '0.5%', // Posiciona el modal cerca de la parte superior
            left: '21.2%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            overflowY: 'auto',
            borderRadius: 2,
            width: '50%',
            paddingBottom: 1,
            paddingTop: 1,
            maxHeight: '99vh',
        }}
      >
        <Box sx={{ padding:'0px 0px 0px 34%',display: 'flex', alignItems: 'center', alignContent: 'center' ,mb: 1 }}>
        <IconTextComponent text={"Presupuestos Anteriores"} icon={<PaidIcon  fontSize="large" color="slateBlue"/>} />
        </Box>
        <Divider sx={{ backgroundColor: "#9AA0A8", height: "2px" }} />
      
        <PreviousBudgets
          tableInformation={tableInformation}
          menuOptions={menuOptions}
          setDataSecondary={setDataSecondary}
          dataSecondary={dataSecondary}
        />
      
        <Box sx={{ padding:'5px 0px 0px 34%',display: 'flex', alignItems: 'center', alignContent: 'center' ,mb: 1 }}>
        <IconTextComponent text={"Visualización por Actividades"} icon={<PaidIcon  fontSize="large" color="slateBlue" />} />
        </Box>
        <Divider sx={{ backgroundColor: "#9AA0A8", height: "2px" }} />

      <ConsultationByActivity
          tableInformation2={tableInformation2}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 4, mr:4, mb:1}}>
            <ButtonComponent 
                label="Cargar Presupuesto" 
                icon={<CheckIcon />}
                color="primary" 
                onClick={activitiesToPut} 
            />
            <ButtonComponent 
                label="Cancelar" 
                icon={<CloseIcon />}
                color="brightRed" 
                styleButton="outlined"
                onClick={onClose} 
            />
        </Box>
      </Box>
    </Modal>
  );
};

const PreviousBudgets = ({tableInformation, menuOptions, setDataSecondary, dataSecondary}) => {
  return (
    <>
    <Box sx={{ padding:'0px 30px 0px 30px' }}>
      <Box sx={{display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between'}}>
          <Typography 
                  variant = "body1"
                  fontWeight = "600"
                  color = "slateBlue"
                  marginTop={2}
                  marginBottom={2}
          > 
                  Consulta por Semana
          </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography 
                    variant = "body1"
                    fontWeight = "600"
                    color = "slateBlue"
                    marginTop={2}
                    marginBottom={2}
            > 
                    Elija un mes:
            </Typography>

            <SelectComponent
                setValue={setDataSecondary}
                value={dataSecondary}
                isRequired
                options={[
                    { id: 1, nombre: 'Enero' },
                    { id: 2, nombre: 'Febrero' },
                    { id: 3, nombre: 'Marzo' },
                    { id: 4, nombre: 'Abril' },
                    { id: 5, nombre: 'Mayo' },
                    { id: 6, nombre: 'Junio' },
                    { id: 7, nombre: 'Julio' },
                    { id: 8, nombre: 'Agosto' },
                    { id: 9, nombre: 'Septiembre' },
                    { id: 10, nombre: 'Octubre' },
                    { id: 11, nombre: 'Noviembre' },
                    { id: 12, nombre: 'Diciembre' }
                ]}
                fieldName="id_mes"
                sx={{ width: '180px'}}
            />

            </Box>
          </Box>

          <DinamicTableComponent 
            information={tableInformation} 
            isLoading={false} 
            error={null} 
            menuOptions={menuOptions}
          />
      </Box>
    </>
  );
}

const ConsultationByActivity = ({tableInformation2}) => {
  return (
        <>
        <Box sx={{ padding:'0px 30px 0px 30px' }}>
          <Typography 
                  variant = "body1"
                  fontWeight = "600"
                  color = "slateBlue"
                  marginTop={2}
                  marginBottom={2}
          > 
                  Consulta por Actividad
          </Typography>

          <DinamicTableComponent 
            information={tableInformation2} 
            isLoading={false} 
            error={null} 
          />
        </Box>
        </>
  );
}

export default PastBudgetModal;
