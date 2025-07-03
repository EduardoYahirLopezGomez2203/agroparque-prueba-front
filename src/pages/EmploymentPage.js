import React from 'react';
import AdminTemplate from '../modules/layer2/admintemplate/AdminTemplate';
import FormEmployment from '../modules/layer1/formemployment/FormEmployment';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import RecentActorsRoundedIcon from '@mui/icons-material/RecentActorsRounded';
import useEmploymentList from '../modules/layer1/formemployment/useEmploymentList';
import { useEffect, useState, useRef } from 'react';
import useEmploymentUpdate from '../modules/layer1/formemployment/useEmploymentUpdate';
import useEmploymentDelete from '../modules/layer1/formemployment/useEmploymentDelete';
import SnackbarComponent from '../components/snackbar/SnackbarComponent';
import useSnackbarOption from '../hooks/useSnackbarOption';

const EmploymentPage = () => {
    const { handleList, processedData, cargando, error } = useEmploymentList();
    const { handleUpdate, datos: updateResponse } = useEmploymentUpdate();
    const { handleDelete } = useEmploymentDelete();
    const { snackbarOptions, setSnackbarOptions, showMessage } = useSnackbarOption()

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
        if (idDelete === 1) {
            showMessage("No se puede eliminar Jefe de Área")
            return
        }
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

        if (id === 1) {
            showMessage("No se puede editar Jefe de Área")
            setId(null)
            return
        }

        if (id !== 0 && Object.keys(updateData).length > 0 && isEditableMode) {
            handleUpdate(id, updateData);

        } else {
            setIsUpdate(true);
        }
    }, [id, updateData]);

    const tableHeaders = [
        {
            id: 'nombre',
            text: 'Nombre',
            icon: <PersonRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'descripcion',
            text: 'Descripción',
            icon: <RecentActorsRoundedIcon sx={{ color: 'slateBlue' }} />
        }
    ];

    return (
        <>
            <AdminTemplate
                title="Puestos"
                formTitle="Registro de Puesto"
                queryTitle="Consulta de Puesto"
                formComponent={<FormEmployment updateData={updateData} setUpdateData={setUpdateData} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdate={setUpdate} responseUpdate={updateResponse} />}
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
            <SnackbarComponent setSnackbarOptions={setSnackbarOptions} snackbarOptions={snackbarOptions}/>
        </>
    );
};

export default EmploymentPage;