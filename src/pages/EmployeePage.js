import React from "react";
import AdminTemplate from "../modules/layer2/admintemplate/AdminTemplate";
import FormEmployee from "../modules/layer1/formemployee/FormEmployee";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import CategoryIcon from '@mui/icons-material/Category';
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useEffect, useState, useRef } from "react";
import useEmployeeList from "../modules/layer1/formemployee/useEmployeeList";
import useEmployeeUpdate from "../modules/layer1/formemployee/useEmployeeUpdate";
import useEmployeeDelete from "../modules/layer1/formemployee/useEmployeeDelete";

const EmployeePage = () => {
    const { handleList, processedData, cargando, error } = useEmployeeList();
    console.log("datos recibidos",processedData)
    const { handleUpdate, datos: updateResponse } = useEmployeeUpdate();
    const { handleDelete, datos: dataDelete } = useEmployeeDelete();

    const [id, setId] = useState(0);
    const [updateData, setUpdateData] = useState({});
    const [idDelete, setIdDelete] = useState(0);
    const [isEditableMode, setIsEditableMode] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const isFirstRender = useRef(true);
    const [update, setUpdate] = useState(false);

    // ADICIÓN: Carga inicial al montar el componente
    useEffect(() => {
        handleList("");
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

    const tableHeaders = [
        {
            id: "nombre",
            text: "Nombre Completo",
            icon: <PersonRoundedIcon sx={{ color: "slateBlue" }} />,
        },
        {
            id: "ap_paterno",
            text: "Apellido Paterno",
            icon: <PersonRoundedIcon sx={{ color: "slateBlue" }} />,
        },
        {
            id: "ap_materno",
            text: "Apellido Materno",
            icon: <PersonRoundedIcon sx={{ color: "slateBlue" }} />,
        },
        {
            id: "direccion",
            text: "Dirección",
            icon: <PersonPinCircleRoundedIcon sx={{ color: "slateBlue" }} />,
        },
        {
            id: "celular",
            text: "Teléfono",
            icon: <SmartphoneRoundedIcon sx={{ color: "slateBlue" }} />,
        },
        {
            id: "puesto",
            text: "Puesto",
            icon: <AccountBoxIcon sx={{ color: "slateBlue" }} />,
        },
        {
            id: "tipo_trabajador",
            text: "Tipo de Trabajador",
            icon: <LoginRoundedIcon sx={{ color: "slateBlue" }} />,
        },
        {
            id: "labor_trabajador",
            text: "Labor",
            icon: <CategoryIcon sx={{ color: "slateBlue" }} />,
        },
        {
            id: "finca",
            text: "Finca",
            icon: <GrassOutlinedIcon sx={{ color: "slateBlue" }} />,
        },
    ];

    return (
        <AdminTemplate
            title="Empleados"
            formTitle="Registro de Empleado"
            queryTitle="Consulta de Empleados"
            formComponent={<FormEmployee updateData={updateData} setUpdateData={setUpdateData} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdate={setUpdate} responseUpdate={updateResponse} />}
            information={{
                header: tableHeaders,
                body: processedData.body
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
    );
};

export default EmployeePage;
