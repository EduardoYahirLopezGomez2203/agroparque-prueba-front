import React, { use } from 'react';
import AdminTemplate from '../modules/layer2/admintemplate/AdminTemplate';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import useActivityList from '../modules/layer1/formactivities/useActivityList';
import useTypeActivityList from '../modules/layer1/formactivities/useTypeActivityList';
import useAdvanceUnitList from '../modules/layer1/formadvanceunit/useAdvanceUnitList';
import { useEffect, useState, useRef } from 'react';
import useActivityUpdate from '../modules/layer1/formactivities/useActivityUpdate';
import useActivityDelete from '../modules/layer1/formactivities/useActivityDelete';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import StraightenIcon from '@mui/icons-material/Straighten';
import PersonIcon from '@mui/icons-material/Person';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import FormActivity from '../modules/layer1/formactivities/FormActivity';

const ActivityPage = () => {
    const { handleList, processedData, cargando, error } = useActivityList();
    const { handleList:handleListTypeActivity, processedData:processedDataTypeActivity, cargando:cargandoTypeActivity, error:errorTypeActivity } = useTypeActivityList();
    const { handleList:handleListAdvanceUnit, processedData:processedDataAdvanceUnit, cargando:cargandoAdvanceUnit, error:errorAdvanceUnit } = useAdvanceUnitList();
    const { handleUpdate, datos: updateResponse } = useActivityUpdate();
    const { handleDelete } = useActivityDelete();

    const [id, setId] = useState(0);
    const [updateData, setUpdateData] = useState({});
    const [idDelete, setIdDelete] = useState(0);

    //Indica si la tabla editara con texfields o mandara los datos a el formulario para editarlos ahi
    const [isEditableMode, setIsEditableMode] = useState(false);
    // esta variable pone en un modo de edicion a el formulario,
    const [isUpdate, setIsUpdate] = useState(false);
    // Estado para evitar la ejecución en el primer renderizado
    const isFirstRender = useRef(true);
    //Esta variable es para indicar que se tienen que mandar los datos a actulizar
    const [update, setUpdate] = useState(false);

    // ADICIÓN: Carga inicial al montar el componente
    useEffect(() => {
        handleList('');
        // NOTA: Esto ahora llama a handleList para obtener los datos cuando el componente se monta
    }, [handleList]);

    useEffect(() => {
        handleListTypeActivity('');
        // NOTA: Esto ahora llama a handleList para obtener los datos cuando el componente se monta
    }, [handleListTypeActivity]);

    useEffect(() => {
        handleListAdvanceUnit('');
        // NOTA: Esto ahora llama a handleList para obtener los datos cuando el componente se monta
    }, [handleListAdvanceUnit]);

    useEffect(() => {
        if (idDelete !== 0) {
            handleDelete(idDelete);
        }
    }, [idDelete]);

    // ADICIÓN: Actualiza el documento cuando id y updateData cambian
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

    const tableHeaders = [
        {
            id: 'nombre',
            text: 'Nombre',
            icon: <DescriptionIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'medicion',
            text: 'Unidad de Avance',
            icon: <StraightenIcon  sx={{ color: 'slateBlue', transform: 'rotate(180deg)' }} />
        },
        {
            id: 'nombre_tipo_actividad',
            text: 'Tipo de actividad',
            icon: <PersonIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'descripcion',
            text: 'Descripción',
            icon: <PhotoLibraryIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'clave_presupuestal',
            text: 'Clave Presupuestal',
            icon: <RequestQuoteIcon sx={{ color: 'slateBlue' }} />
        }
    ];

    return (
        <AdminTemplate
            title="Actividades"
            formTitle="Registro de Actividad"
            queryTitle="Consulta de Actividades"
            formIcon={<FolderOutlinedIcon fontSize="large" color="slateBlue" />}
            queryIcon={<BubbleChartIcon fontSize="large" color="slateBlue" />}
            formComponent={<FormActivity updateData={updateData} setUpdateData={setUpdateData} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdate={setUpdate} responseUpdate={updateResponse} />}
            information={{
                header: tableHeaders,
                body: processedData.body
            }}            
            useTableApi={{
                handleSearch: handleList,
                isLoading: cargando,
                error: error?.message
            }}
            setId={setId}
            setUpdateData={setUpdateData}
            setIdDelete={setIdDelete}
            isUpdate={isUpdate}
        />
    );
};

export default ActivityPage;