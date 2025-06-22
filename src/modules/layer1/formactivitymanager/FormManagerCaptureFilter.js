import { BasicFilterForm } from "../admin/BasicForm";
import { SectionForm, SelectForm } from "../admin/Form";
import useCompanyList from "../formcompany/useCompanyList";
import useFarmList from "../formfarm/useFarmList";
import useAreaFarmList from "./useAreaFarmList";
import { useState, useEffect } from "react";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

const FormManagerCaptureFilter = ({ dataValue, setDataValue }) => {
    const { handleList: handleListCompany, processedData: processedDataCompany } = useCompanyList();
    const { handleList: handleListFarm, processedData: processedDataFarm } = useFarmList();
    const { handleList: handleListArea, processedData: processedDataArea, areas } = useAreaFarmList();

    // Empresas
    useEffect(() => {
        handleListCompany();
    }, [handleListCompany]);

    // Fincas
    useEffect(() => {
        handleListFarm();
    }, [handleListFarm]);

    // Cada vez que 'id_finca' cambie, se recargan las áreas de esa finca
    useEffect(() => {
        if (dataValue.id_finca) {
            handleListArea({ id_finca: dataValue.id_finca });
        }
    }, [handleListArea, dataValue.id_finca]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulario enviado");
    };

    // Opciones de Empresa
    const dataCompany = processedDataCompany.body.map((body) => ({
        id: body.id,
        nombre: body.nombre
    }));

    // Opciones de Finca filtradas por empresa seleccionada
    const dataFarm = processedDataFarm.body
        .filter((finca) => finca.empresa.id === dataValue.id_empresa)
        .map((finca) => ({
            id: finca.id,
            nombre: finca.nombre
        }));

    return (
        <>
            <BasicFilterForm handleSubmit={handleSubmit}>
                <SectionForm
                    title="Filtros"
                    direction="row"
                    icon={<BubbleChartIcon fontSize="large" color="slateBlue" />}
                >
                <SelectForm
                    title="Empresa"
                    setDataValue={setDataValue}
                    dataValue={dataValue}
                    isRequired
                    options={dataCompany}
                    fieldName="id_empresa"
                />
                <SelectForm
                    title="Finca"
                    setDataValue={setDataValue}
                    dataValue={dataValue}
                    isRequired
                    options={dataFarm}
                    fieldName="id_finca"
                />
                <SelectForm
                    title="Área"
                    setDataValue={setDataValue}
                    dataValue={dataValue}
                    isRequired
                    options={areas}
                    fieldName="id_area"
                />
                </SectionForm>
            </BasicFilterForm>
        </>
    );
};

export default FormManagerCaptureFilter;
