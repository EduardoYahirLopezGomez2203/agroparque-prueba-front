import Form, { CheckboxDialogForm, InputForm, SectionForm, SelectForm, SelectMultipleForm } from "../admin/Form";
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import useProfileCreate from "./useProfileCreate";
import useCompanyList from "../formcompany/useCompanyList";
import useFarmList from "../formfarm/useFarmList";
import useModuleList from "../formprofile/useModuleList";
import usePermissionList from "../formprofile/usePermissionList";
import { useEffect, useState } from "react";

const FormProfile = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate, responseUpdate }) => {
    const { handleCreate, datos } = useProfileCreate();

    const data = {
        id_finca: [],
        permisos: [{
            id_modulo: null,
            id_permiso: null
        }],
        nombre: '',
        id_empresa: null,
        descripcion: ''
    }

    const [dataValue, setDataValue] = useState(data);

    const { handleList: handleListCompany, processedData: processedDataCompany } = useCompanyList();
    const { handleList: handleListFarm, processedData: processedDataFarm } = useFarmList();
    const { handleList: handleListModule, processedData: processedDataModule } = useModuleList();
    const { handleList: handleListPermission, processedData: processedDataPermission } = usePermissionList();

    useEffect(() => {
        handleListCompany('');
        handleListFarm('');
        handleListModule('');
        handleListPermission('');
    }, [handleListCompany, handleListFarm, handleListModule, handleListPermission]);

    // Ayuda a limpiar las fincas seleccionadas
    useEffect(() => {
        if (!isUpdate) {
            dataValue.id_finca = []
        }
    }, [dataValue.id_empresa])

    const resetForm = () => {
        setDataValue(data);
        setIsUpdate(false);
    }

    useEffect(() => {
        if (isUpdate) {
            setDataValue((prevState) => ({
                ...prevState,
                id_finca: updateData.id_fincas,
                permisos: updateData.permisosModulo.map(permisoModulo => ({
                    id_modulo: permisoModulo.id_modulo,
                    id_permiso: permisoModulo.id_permiso
                })),
                nombre: updateData.nombre,
                id_empresa: updateData.empresa.id,
                descripcion: updateData.descripcion
            }));
            console.log("Datos del dataValue:", dataValue);
        }
    }, [isUpdate]);

    const handleFormUpdate = () => {
        console.log("Datos a guardar desde FormFarm:", dataValue);
        console.log("Entro a el updateData cuando se esta creando");
        setUpdateData((prevState) => ({
            ...prevState,
            id_finca: dataValue.id_finca,
            permisos: dataValue.permisos,
            nombre: dataValue.nombre,
            id_empresa: dataValue.id_empresa,
            descripcion: dataValue.descripcion
        }));
        setUpdate(true);
        resetForm();
    };

    const formApi = {
        handleCreate,
        dataValue,
        response: datos,
        resetForm,
        responseUpdate,
        isUpdate,
        handleFormUpdate,
    };

    const dataCompany = processedDataCompany.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre }
    });

    // Filtramos por finca según el id de la empresa
    const filterFincaById = (id_empresa) => {
        const data = processedDataFarm.body.filter(body => {
            if (id_empresa === body.empresa.id) {
                return body
            }
            return false;
        });

        return data;
    }

    const dataModule = processedDataModule.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre }
    });

    const dataPermission = processedDataPermission.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre }
    });

    // Comprobamos en cada renderizado si existen valores en el campo id_empresa
    const disabledFinca = dataValue.id_empresa === null ? true : false;

    // Mapeamos la respuesta a la solicitada dentro del selector
    const dataFarm = filterFincaById(dataValue.id_empresa).map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre }
    });
    
    return (
        <Form useFormApi={() => ({ ...formApi })}>
            <SectionForm title="Perfil"
                icon={<PersonRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <InputForm title="Nombre" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="nombre" />
                <InputForm title="Descripción" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="descripcion" />
            </SectionForm>
            <SectionForm title="Empresa"
                icon={<ApartmentIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <SelectForm title="Empresa (Seleccione una opción)" isRequired setDataValue={setDataValue} dataValue={dataValue} options={dataCompany} fieldName="id_empresa" />
                <SelectMultipleForm title="Fincas (Seleccione una o varias opciones)" disabled={disabledFinca} isRequired setDataValue={setDataValue} dataValue={dataValue} options={dataFarm} fieldName="id_finca" />
            </SectionForm>
            <SectionForm title="Modulos"
                icon={<DashboardOutlinedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
            >
                <CheckboxDialogForm
                    title="Permisos (Seleccione las opciones)"
                    isRequired
                    setDataValue={setDataValue}
                    dataValue={dataValue}
                    options={dataModule}
                    optionsDialog={dataPermission}
                    fieldName="permisos"
                />
            </SectionForm>
        </Form>
    );
}

export default FormProfile;