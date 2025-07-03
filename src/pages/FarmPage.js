import FormFarm from '../modules/layer1/formfarm/FormFarm';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import useFarmList from '../modules/layer1/formfarm/useFarmList';
import { Divider } from '@mui/material';
import ActivityManager from '../modules/layer3/catchmanagementactivity/ActivityManager';
import { useEffect, useState, useRef } from 'react';
import useFarmUpdate from '../modules/layer1/formfarm/useFarmUpdate';
import useFarmDelete from '../modules/layer1/formfarm/useFarmDelete';
import Header from '../modules/layer1/admin/Header';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ButtonComponent from '../components/buttons/ButtonComponent';
import AdminTemplateCustom from '../modules/layer2/admintemplate/AdminTemplateCustom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DescriptionIcon from '@mui/icons-material/Description';
import ParkIcon from '@mui/icons-material/Park';
import NaturalAccordionComponent from '../components/accordions/NaturalAccordionComponent';

const FarmPage = () => {
    const { handleList, processedData, cargando, error } = useFarmList();
    const { handleDelete, datos: dataDelete } = useFarmDelete();
    
    const { handleUpdate, datos: updateResponse } = useFarmUpdate();
    const [id, setId] = useState(0);
    const [updateData, setUpdateData] = useState({});
    const [idDelete, setIdDelete] = useState(0);

    //Abrir y cerrar configuraciones de actividades
    const [closeActivity, setCloseActivity] = useState(false);

    useEffect(() => {
        if (closeActivity) {
            setCloseActivity(false);
        }
    }, [closeActivity]);

    //Indica si la tabla editara con texfields o mandara los datos a el formulario para editarlos ahi
    const [isEditableMode, setIsEditableMode] = useState(false);
    // esta variable pone en un modo de edicion a el formulario,
    const [isUpdate, setIsUpdate] = useState(false);
    // Estado para evitar la ejecución en el primer renderizado
    const isFirstRender = useRef(true);
    //Esta variable es para indicar que se tienen que mandar los datos a actulizar
    const [update, setUpdate] = useState(false);

    const [showAccordionTable, setShowAccordionTable] = useState(false)

    // ADICIÓN: Carga inicial al montar el componente
    useEffect(() => {
        handleList('');
        // NOTA: Esto ahora llama a handleList para obtener los datos cuando el componente se monta
    }, [handleList]);

    useEffect(() => {
        if (idDelete !== 0) {
            handleDelete(idDelete);
        }
    }, [idDelete]);

    useEffect(() => {
        if (dataDelete) {
            handleList()
        }
    }, [dataDelete])

    useEffect(() => {
        if (isFirstRender.current) {
            // Evita que se ejecute en el primer render
            isFirstRender.current = false;
            return;
        }
        if (id !== 0 && Object.keys(updateData).length > 0 && isEditableMode) {
            handleUpdate(id, updateData);
        } else {
            setIsUpdate(true);
        }
    }, [id, updateData]);

    useEffect(() => {
        if (id !== 0 && Object.keys(updateData).length > 0 && update) {
            handleUpdate(id, updateData);
            setUpdate(false);
            setIsUpdate(false);
        }
    }, [update]);

    const [expandedFarm, setExpandedFarm] = useState(false)
    const [expandedActivity, setExpandedActivity] = useState(false)

    useEffect(() => {
        if (closeActivity) {
            setCloseActivity(false)
            setExpandedActivity(false)
        }
    }, [closeActivity])

    useEffect(() => {
        if (expandedActivity) {
            setExpandedFarm(false)
        } else if (expandedFarm) {
            setExpandedActivity(false)
        }
     }, [expandedActivity])

     useEffect(() => {
        if (expandedFarm) {
            setExpandedActivity(false)
        }
     }, [expandedFarm])

    const handleChangeFarm = (expanded) => {
        setExpandedFarm(expanded)
    }

    const handleChangeActivity = (expanded) => {
        setExpandedActivity(expanded)
    }

    const tableHeaders = [
        {
            id: 'nombre',
            text: 'Nombre',
            icon: <GrassOutlinedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'empresa',
            text: 'Empresa',
            icon: <BusinessOutlinedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'celular',
            text: 'Teléfono',
            icon: <SmartphoneRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'email',
            text: 'Correo Electrónico',
            icon: <EmailRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'descripcion',
            text: 'Descripción',
            icon: <DescriptionIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'direccion',
            text: 'Dirección',
            icon: <LocationOnRoundedIcon sx={{ color: 'slateBlue' }} />
        },
    ];

    return (
        <>
            <Header text="Fincas" />

            <NaturalAccordionComponent
                title="Registro de Finca"
                expanded={expandedFarm}
                onChange={handleChangeFarm}
                icon={<GrassOutlinedIcon fontSize="large" color="slateBlue" />}
                disableHiddenTitle
            >
                <AdminTemplateCustom
                    showAccordionTable={showAccordionTable}
                    showHeader={false}
                    formTitle="Alta"
                    queryTitle="Consulta de Fincas"
                    formIcon={<GrassOutlinedIcon fontSize="large" color="slateBlue" />}
                    formComponent={
                        <FormFarm
                            updateData={updateData}
                            setUpdateData={setUpdateData}
                            isUpdate={isUpdate}
                            setIsUpdate={setIsUpdate}
                            setUpdate={setUpdate}
                            responseUpdate={updateResponse}
                        />
                    }
                    specialSectionTable={
                        <ButtonComponent
                            icon={showAccordionTable ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            label="Ver Areas"
                            color={showAccordionTable ? "grayDark" : "strongGreen"}
                            onClick={() => setShowAccordionTable(!showAccordionTable)} // Agrega este onClick
                        />
                    }
                    information={{
                        header: tableHeaders,
                        body: processedData.body.map(body => ({
                            ...body,
                            empresa: Object.assign(body.empresa.nombre, { id: body.empresa.id }),
                        })),
                    }}
                    useTableApi={{
                        handleSearch: handleList,
                        isLoading: cargando,
                        error: error?.message,
                    }}
                    setId={setId}
                    setUpdateData={setUpdateData}
                    setIdDelete={setIdDelete}
                    isEditableMode={isEditableMode}
                    isUpdate={isUpdate}
                />
            </NaturalAccordionComponent>

            <Divider />

            <NaturalAccordionComponent
                disableHiddenTitle
                expanded={expandedActivity}
                onChange={handleChangeActivity}
                title="Gestión de Actividades"
                icon={<ParkIcon fontSize='large' color='slateBlue' />}
            >
                <ActivityManager onClose={setCloseActivity} />
            </NaturalAccordionComponent>

            <Divider />
        </>
    );
};

export default FarmPage;