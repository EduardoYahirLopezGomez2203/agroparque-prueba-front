import AdminTemplate from '../modules/layer2/admintemplate/AdminTemplate';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import FormCompany from '../modules/layer1/formcompany/FormCompany';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import useCompanyList from '../modules/layer1/formcompany/useCompanyList';
import useCompanyUpdate from '../modules/layer1/formcompany/useCompanyUpdate';
import { useEffect, useState, useRef } from 'react';
import useCompanyDelete from '../modules/layer1/formcompany/useCompanyDelete';

const CompanyPage = () => {
    const { handleList, processedData, cargando, error } = useCompanyList();
    const { handleDelete } = useCompanyDelete();
    const { handleUpdate, datos: updateResponse } = useCompanyUpdate();

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
            text: 'Nombre',
            icon: <BusinessOutlinedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'razon_social',
            text: 'Razón Social',
            icon: <CorporateFareIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'rfc',
            text: 'RFC',
            icon: <FingerprintRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'celular',
            text: 'Teléfono',
            icon: <SmartphoneRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'email',
            text: 'Correo',
            icon: <EmailRoundedIcon sx={{ color: 'slateBlue' }} />
        },
        {
            id: 'direccion',
            text: 'Dirección',
            icon: <LocationOnRoundedIcon sx={{ color: 'slateBlue' }} />
        }
    ];

    return (
        <AdminTemplate
            title="Empresas"
            formTitle="Registro de Empresa"
            queryTitle="Consulta de Empresas"
            formIcon={<BusinessOutlinedIcon fontSize="large" color="slateBlue" />}
            queryIcon={<BusinessOutlinedIcon fontSize="large" color="slateBlue" />}
            formComponent={<FormCompany updateData={updateData} setUpdateData={setUpdateData} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdate={setUpdate} responseUpdate={updateResponse} />}
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

export default CompanyPage;
