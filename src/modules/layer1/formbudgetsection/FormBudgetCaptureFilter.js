import {BasicFilterForm} from "../admin/BasicForm";
import { SectionForm, SelectForm } from "../admin/Form";
import { useEffect} from "react";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import useCompanyList from "../formcompany/useCompanyList";
import useFarmsByCompanyList from "../formfarm/useFarmsByCompanyList";
import useAreasByFarmList from "../formarea/useAreasByFarmList";
import useWeekCurrenYearLogList from '../../layer1/formweeklog/useWeekCurrenYearLogList';

const FormBudgetCaptureFilter = ({dataValue, setDataValue}) => {

    const { handleList: handleListWeek, processedData: processedDataWeek} = useWeekCurrenYearLogList();
    const { handleList: handleListCompany, processedData: processedDataCompany } = useCompanyList();
    const { handleList: handleListFarmsByComany, processedData: processedDataFarmsByCompany } = useFarmsByCompanyList();
    const { handleList: handleListAreasByFarm, processedData: processedDataAreasByFarm } = useAreasByFarmList();

    useEffect(() => {
        handleListWeek();
    }, [handleListWeek]);


    useEffect(() => {
        handleListCompany();
    }, [handleListCompany]);

    useEffect(() => {
        if(dataValue.id_empresa !== ""){
            handleListFarmsByComany(dataValue.id_empresa);
        }
    },[dataValue.id_empresa, handleListFarmsByComany]);

    useEffect(() => {
        if(dataValue.id_finca !== ""){
            handleListAreasByFarm(dataValue.id_finca);
        }
    }, [dataValue.id_finca, handleListAreasByFarm]);

    const dataWeek = processedDataWeek.body.map(body => {
        const id = String(body.id);
        const nombre = `${body.numero_semana} - ${body.fecha_inicio} - ${body.fecha_fin}`
        return { id, nombre};
    });

    const dataCompany = processedDataCompany.body.map(body => {
        const id = String(body.id);
        const nombre = String(body.nombre);

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
            >
                <SectionForm title="Filtros" direction="row"
                    icon={<BubbleChartIcon fontSize="large" color="slateBlue" />}
                >
                    <SelectForm title="Semana" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataWeek} fieldName="id_semana" />
                    <SelectForm title="Empresa" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataCompany} fieldName="id_empresa" />
                    <SelectForm title="Finca" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataFarmsByCompany} fieldName="id_finca" />
                    <SelectForm title="Area" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataAreasByFarm} fieldName="id_area" />
            </SectionForm>
        </BasicFilterForm> 
    </>
    );
};

export default FormBudgetCaptureFilter;

