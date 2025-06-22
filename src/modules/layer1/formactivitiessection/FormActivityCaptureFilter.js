import {BasicFilterForm} from "../admin/BasicForm";
import { SectionForm, SelectForm } from "../admin/Form";
import { useState, useEffect } from "react";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import useCompanyList from "../formcompany/useCompanyList";
import useFarmsByCompanyList from "../formfarm/useFarmsByCompanyList";
import useAreasByFarmList from "../formarea/useAreasByFarmList";
import useWeekCurrenYearLogList from '../../layer1/formweeklog/useWeekCurrenYearLogList';


const FormActivityCaptureFilter = ({dataValue, setDataValue, processedDataWeek}) => {

    const { handleList: handleListCompany, processedData: processedDataCompany } = useCompanyList();
    const { handleList: handleListFarmsByComany, processedData: processedDataFarmsByCompany } = useFarmsByCompanyList();
    const { handleList: handleListAreasByFarm, processedData: processedDataAreasByFarm } = useAreasByFarmList();
    
    useEffect(() => {
        handleListCompany();
    }, [handleListCompany]);

    useEffect(() => {
        handleListFarmsByComany(dataValue.id_empresa);
    },[dataValue.id_empresa, handleListFarmsByComany]);

    useEffect(() => {
        handleListAreasByFarm(dataValue.id_finca);
    }, [dataValue.id_finca, handleListAreasByFarm]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulario enviado");
    };

    const dataWeek = processedDataWeek.body.map(body => {
        const id = body.id;
        const nombre = body.numero_semana;
        return { id, nombre};
    });

    const dataCompany = processedDataCompany.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre };
    });

    const dataFarmsByCompany = processedDataFarmsByCompany.body.map(finca => ({
            id: String(finca.id),
            nombre: String(finca.nombre)
    }));

    const dataAreasByFarm = processedDataAreasByFarm.body.map(area =>({
        id: String(area.id),
        nombre: String(area.nombre)
    }));
    


    return (
    <>
        <BasicFilterForm
            handleSubmit={handleSubmit}
        >
            <SectionForm title="Filtros" direction="row" icon={<BubbleChartIcon fontSize="large" color="slateBlue" />} >
                <SelectForm title="Semana" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataWeek} fieldName="id_semana" />
                <SelectForm title="Empresa" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataCompany} fieldName="id_empresa" />
                <SelectForm title="Finca" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataFarmsByCompany} fieldName="id_finca" />
                <SelectForm title="Área" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataAreasByFarm} fieldName="id_area" />
            </SectionForm>
        </BasicFilterForm> 
    </>
    );
};

export default FormActivityCaptureFilter;
