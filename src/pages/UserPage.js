import React from 'react';
import AdminTemplate from '../modules/layer2/admintemplate/AdminTemplate';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FormUser from '../modules/layer1/formuser/FormUser';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import useUserList from '../modules/layer1/formuser/useUserList';
import { useEffect, useState, useRef } from 'react';
import useUserUpdate from '../modules/layer1/formuser/useUserUpdate';
import useUserDelete from '../modules/layer1/formuser/useUserDelete';

const UserPage = () => {
    const { handleList, processedData, cargando, error } = useUserList();
    const { handleUpdate, datos: updateResponse } = useUserUpdate();
    // ADICIÓN: Importa y usa useDocumentDelete para eliminar los datos
    const { handleDelete } = useUserDelete();

    const [id, setId] = useState(0);
    const [updateData, setUpdateData] = useState({});
    const [idDelete, setIdDelete] = useState(0);

    const [isEditableMode, setIsEditableMode] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const isFirstRender = useRef(true);
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
            id: 'perfil',
            text: 'Perfil',
            icon: <BadgeRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'nombre',
            text: 'Nombre Completo',
            icon: <PersonRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'ap_paterno',
            text: 'Apellido Paterno',
            icon: <PersonRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'ap_materno',
            text: 'Apellido Materno',
            icon: <PersonRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'email',
            text: 'Correo Electrónico',
            icon: <EmailRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'celular',
            text: 'Teléfono',
            icon: <SmartphoneRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'login',
            text: 'Login de Usuario',
            icon: <LoginRoundedIcon sx={{ color: 'slateBlue' }} />
        },
    ];

    return (
        <AdminTemplate
            title="Usuarios"
            formTitle="Registro de Usuario"
            queryTitle="Consulta de Usuarios"
            formComponent={<FormUser updateData={updateData} setUpdateData={setUpdateData} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdate={setUpdate} responseUpdate={updateResponse} />}
            information={{
                header: tableHeaders,
                body: processedData.body.map(body => ({
                    ...body,
                    perfil: Object.assign(body.perfil.nombre, { id: body.perfil.id })
                }))
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

export default UserPage;