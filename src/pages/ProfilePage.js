import React from 'react';
import AdminTemplate from '../modules/layer2/admintemplate/AdminTemplate';
import FormProfile from '../modules/layer1/formprofile/FormProfile';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ApartmentIcon from '@mui/icons-material/Apartment';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import useProfilelist from '../modules/layer1/formprofile/useProfileList';
import { useEffect, useState, useRef } from 'react';
import useProfileUpdate from '../modules/layer1/formprofile/useProfileUpdate';
import useProfileDelete from '../modules/layer1/formprofile/useProfileDelete';
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";

const ProfilePage = () => {
    const { handleList, processedData, cargando, error } = useProfilelist();
    const { handleUpdate, datos: updateResponse } = useProfileUpdate();
    const { handleDelete } = useProfileDelete();

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
            id: 'nombre',
            text: 'Nombre del Perfil',
            icon: <PersonRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'empresa',
            text: 'Empresa',
            icon: <ApartmentIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'fincas',
            text: 'Fincas',
            icon: <GrassOutlinedIcon sx={{ color: "slateBlue" }} />
        },
        {
            id: 'permisos',
            text: 'Modulo - Permisos',
            icon: <KeyRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'descripcion',
            text: 'Descripción',
            icon: <DescriptionRoundedIcon sx={{ color: 'slateBlue' }} />
        },
    ];

    return (
        <AdminTemplate
            title="Perfiles"
            formTitle="Registro de Perfil"
            queryTitle="Consulta de Perfiles"
            formComponent={<FormProfile updateData={updateData} setUpdateData={setUpdateData} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdate={setUpdate} responseUpdate={updateResponse} />}
            information={{
                header: tableHeaders,
                body: processedData.body.map(body => ({
                    ...body,
                    empresa: Object.assign(body.empresa.nombre, { id: body.empresa.id }),
                    fincas: body.fincas.map(finca => (
                        finca.nombre
                    )).join(', '),
                    id_fincas: body.fincas.map(finca => finca.id),
                    permisosModulo: body.permisos.map(permisoModulo => ({
                        id_modulo: permisoModulo.modulo.id,
                        id_permiso: permisoModulo.permiso.id
                    })),
                    permisos: (() => {
                        const permisosPorModulo = body.permisos.reduce((acc, permiso) => {
                            const moduloNombre = permiso.modulo.nombre;
                            const permisoNombre = permiso.permiso.nombre;

                            if (!acc[moduloNombre]) {
                                acc[moduloNombre] = [];
                            }

                            acc[moduloNombre].push(permisoNombre);
                            return acc;
                        }, {});

                        return Object.entries(permisosPorModulo)
                            .map(([modulo, permisos]) => {
                                return `${modulo}: ${permisos.join(', ')}`;
                            })
                            .join(' | ');
                    })()
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
            isEditableMode={isEditableMode}
            isUpdate={isUpdate}
        />
    );
};

export default ProfilePage;