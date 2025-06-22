import React from 'react';
import AdminTemplate from '../modules/layer2/admintemplate/AdminTemplate';
import FormDocument from '../modules/layer1/formdocument/FormDocument';
import DescriptionIcon from '@mui/icons-material/Description';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import useDocumentList from '../modules/layer1/formdocument/useDocumentList';
import { useEffect, useState, useRef } from 'react';
import useDocumentUpdate from '../modules/layer1/formdocument/useDocumentUpdate';
import useDocumentDelete from '../modules/layer1/formdocument/useDocumentDelete';

const DocumentPage = () => {
    // ADICIÓN: Importa y usa useDocumentList para obtener los datos
    const { handleList, processedData, cargando, error } = useDocumentList();
    // adición: Importa y usa useDocumentUpdate para actualizar los datos
    const { handleUpdate, datos: updateResponse } = useDocumentUpdate();

    // ADICIÓN: Importa y usa useDocumentDelete para eliminar los datos
    const { handleDelete } = useDocumentDelete();

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
        handleList(''); // NOTA: Esto ahora llama a handleList para obtener los datos cuando el componente se monta
    }, [handleList]);

    // ADICIÓN: Elimina el documento cuando idDelete cambia
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
            text: 'Nombre de Archivo',
            icon: <DescriptionRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'descripcion',
            text: 'Descripción',
            icon: <LibraryBooksRoundedIcon sx={{ color: 'slateBlue' }} />
        }
    ];

    return (
        <AdminTemplate
            title="Documentos"
            formTitle="Registro de Documento"
            queryTitle="Consulta de Documentos"
            formIcon={<DescriptionIcon fontSize="large" color="slateBlue" />}
            queryIcon={<DescriptionIcon fontSize="large" color="slateBlue" />}
            formComponent={<FormDocument updateData={updateData} setUpdateData={setUpdateData} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdate={setUpdate} responseUpdate={updateResponse} />}
            information={{
                header: tableHeaders,
                body: processedData.body
            }}
            useTableApi={{
                handleSearch: handleList, //NOTA: Usa handleList para búsquedas
                isLoading: cargando,
                error: error?.message
            }}
            setId={setId}
            setUpdateData={setUpdateData}
            setIdDelete={setIdDelete}
            isEditableMode={isEditableMode}
            isUpdate={isUpdate}
        />
    );
};

export default DocumentPage;