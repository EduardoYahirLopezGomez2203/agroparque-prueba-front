import { SectionForm, SelectForm } from "../admin/Form";
import { useEffect } from "react";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import useFarmsByCompanyList from "../formfarm/useFarmsByCompanyList";
import useAreasByFarmList from "../formarea/useAreasByFarmList";
import useFilterCompanyByWeekOfBudget from "./useFilterCompanyByWeekOfBudget";
import useWeekCurrenYearLogList from "../formweeklog/useWeekCurrenYearLogList";
import useSnackbarOption from "../../../hooks/useSnackbarOption";
import SnackbarComponent from "../../../components/snackbar/SnackbarComponent";

const FormActivityCaptureFilter = ({ dataValue, setDataValue }) => {

    const { handleList: handleListFarmsByComany, processedData: processedDataFarmsByCompany, error: errorFarm } = useFarmsByCompanyList();
    const { handleList: handleListAreasByFarm, processedData: processedDataAreasByFarm, error: errorArea } = useAreasByFarmList();
    const { handleList: handleListCompanyByWeek, processedData: processedDataCompanyByWeek, error: errorCompany } = useFilterCompanyByWeekOfBudget();
    const { handleList: handleListWeek, processedData: processedDataWeek, error: errorWeek } = useWeekCurrenYearLogList();

    const { snackbarOptions, setSnackbarOptions, showMessage } = useSnackbarOption();

    useEffect(() => { handleListWeek() }, []);

    useEffect(() => { if (errorCompany) showMessage("Ocurrio un error al obtener las empresas", "error") }, [errorCompany])
    
    useEffect(() => { if (errorFarm) showMessage("Ocurrio un error al obtener las fincas", "error") }, [errorFarm])

    useEffect(() => { if (errorArea) showMessage("Ocurrio un error al obtener las areas", "error") }, [errorArea])
    
    useEffect(() => { if (errorWeek) showMessage("Ocurrio un error al obtener las semanas", "error") }, [errorWeek])

    useEffect(() => {
        if (dataValue.id_semana)
            handleListCompanyByWeek(dataValue.id_semana);
    }, [dataValue.id_semana]);

    useEffect(() => {
        if (dataValue.id_empresa)
            handleListFarmsByComany(dataValue.id_empresa);
    }, [dataValue.id_empresa]);

    useEffect(() => {
        if (dataValue.id_finca)
            handleListAreasByFarm(dataValue.id_finca);
    }, [dataValue.id_finca]);

    const dataWeek = processedDataWeek.body.map(body => ({
        id: body.id,
        nombre: body.numero_semana
    }));

    const dataCompany = processedDataCompanyByWeek.body.map(body => ({
        id: body.id,
        nombre: body.nombre
    }));

    const dataFarmsByCompany = processedDataFarmsByCompany.body.map(body => ({
        id: body.id,
        nombre: body.nombre
    }));

    const dataAreasByFarm = processedDataAreasByFarm.body.map(body => ({
        id: body.id,
        nombre: body.nombre
    }));

    return (
        <>
            <SectionForm title="Filtros" direction="row" icon={<BubbleChartIcon fontSize="large" color="slateBlue" />} >
                <SelectForm title="Semana" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataWeek} fieldName="id_semana" />
                <SelectForm title="Empresa" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataCompany} fieldName="id_empresa" />
                <SelectForm title="Finca" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataFarmsByCompany} fieldName="id_finca" />
                <SelectForm title="Área" setDataValue={setDataValue} dataValue={dataValue} isRequired options={dataAreasByFarm} fieldName="id_area" />
            </SectionForm>
            <SnackbarComponent snackbarOptions={snackbarOptions} setSnackbarOptions={setSnackbarOptions} />
        </>
    );
};

export default FormActivityCaptureFilter;
