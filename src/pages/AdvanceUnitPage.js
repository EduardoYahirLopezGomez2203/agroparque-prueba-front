import React from 'react';
import AdminTemplate from '../modules/layer2/admintemplate/AdminTemplate';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import useAdvanceUnitList from '../modules/layer1/formadvanceunit/useAdvanceUnitList';
import { useEffect, useState, useRef } from 'react';
import useAdvanceUnitUpdate from '../modules/layer1/formadvanceunit/useAdvanceUnitUpdate';
import useAdvanceUnitDelete from '../modules/layer1/formadvanceunit/useAdvanceUnitDelete';
import DescriptionIcon from '@mui/icons-material/Description';
import StraightenIcon from '@mui/icons-material/Straighten';
import TableChartIcon from '@mui/icons-material/TableChart';
import FormAdvanceUnit from '../modules/layer1/formadvanceunit/FormAdvanceUnit';

const AdvanceUnitPage = () => {
    const { handleList, processedData, cargando, error } = useAdvanceUnitList();
    const { handleUpdate, datos: updateResponse } = useAdvanceUnitUpdate();
    const { handleDelete } = useAdvanceUnitDelete();

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
            text: 'Nombre Corto',
            icon: <TableChartIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'descripcion',
            text: 'Descripción',
            icon: <PhotoLibraryIcon sx={{ color: 'slateBlue' }} />
        }
    ];

    return (
        <AdminTemplate
            title="Unidades de Avance"
            formTitle="Registro de Unidad de Avance"
            queryTitle="Consulta de Unidades de Avance"
            formIcon={<StraightenIcon fontSize="large" color="slateBlue" />}
            queryIcon={<DescriptionIcon fontSize="large" color="slateBlue" />}
            formComponent={<FormAdvanceUnit updateData={updateData} setUpdateData={setUpdateData} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdate={setUpdate} responseUpdate={updateResponse} />}
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

export default AdvanceUnitPage;