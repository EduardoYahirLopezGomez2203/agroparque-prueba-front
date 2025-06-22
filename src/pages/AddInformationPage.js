import { useEffect, useRef, useState } from 'react';
import AdminTemplate from '../modules/layer2/admintemplate/AdminTemplate';
import NotesIcon from '@mui/icons-material/Notes';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import FormAddInformation from '../modules/layer1/formaddinformation/formAddInformation';

// Falta funcionalidad
const AddInformationPage = () => {
    //const { handleList, processedData, cargando, error } = useUserList();
    //const { handleUpdate, datos: updateResponse } = useUserUpdate();
    //const { handleDelete } = useUserDelete();

    const [id, setId] = useState(0);
    const [updateData, setUpdateData] = useState({});
    const [idDelete, setIdDelete] = useState(0);

    const [isEditableMode, setIsEditableMode] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const isFirstRender = useRef(true);
    const [update, setUpdate] = useState(false);

    /*
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
        if (isFirstRender.current) {
            // Evita que se ejecute en el primer render
            isFirstRender.current = false;
            return;
        }
        if (id !== 0 && Object.keys(updateData).length > 0 && isEditableMode) {
            console.log("Se obtuvieron los datos a editar de la tabla: ", updateData);
            handleUpdate(id, updateData);

        } else {
            console.log("Se puso en modo edicion el formulario");
            setIsUpdate(true);
        }
    }, [id, updateData]);

    useEffect(() => {
        if (id !== 0 && Object.keys(updateData).length > 0 && update) {
            console.log("Se obtuvieron los datos a editar del formulario: ", updateData);
            handleUpdate(id, updateData);
            setUpdate(false);
            setIsUpdate(false);
        }
    }, [update]);
    */

    const tableHeaders = [
        {
            id: 'nombre',
            text: 'Nombre',
            icon: <NotesIcon sx={{ color: 'slateBlue' }} />
        }
    ];

    return (
        <AdminTemplate
            title="Añadir Información"
            formTitle="Registro de Información Adicional"
            queryTitle="Consulta de Información"
            queryIcon={<ViewCarouselIcon fontSize="large" color="slateBlue"/>}
            formComponent={ <FormAddInformation /*updateData={updateData} setUpdateData={setUpdateData} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdate={setUpdate} responseUpdate={updateResponse}*//> }
            information={{
                header: tableHeaders,
                body: []
            }}
            /*useTableApi={{
                handleSearch: handleList,
                isLoading: cargando,
                error: error?.message
            }}*/
            defaultSearchType="text" // Cambiar a "text" para backend real
            setId={setId}
            setUpdateData={setUpdateData}
            setIdDelete={setIdDelete}
            isEditableMode={isEditableMode}
            isUpdate={isUpdate}
        />
    );
}

export default AddInformationPage;
