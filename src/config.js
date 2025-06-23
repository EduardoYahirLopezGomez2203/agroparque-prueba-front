const domainLocal = "https://agroparque.proxy.beeceptor.com";
const domainDevelopment = "http://localhost:9090";
const domainProduction = "http://192.168.1.134:8080";
const domainMalicius = "https://27dd-2806-10ae-6-390b-24f8-3144-6bf9-740f.ngrok-free.app"

const putEnviroment = (domain, ...moreEnviroments) => {

    // Aqui se pueden controlar los demas entornos
    const [local = domain, b = domain] = moreEnviroments

    return {
        API_URL_login: domain + '/login',

        API_URL_user_create: domain + '/v1/usuario/create',
        API_URL_profile_create: domain + '/v1/perfil/create',
        API_URL_employee_create: domain + '/v1/trabajador/create',
        API_URL_employee_document_create: domain + '/v1/trabajador/?/documento-trabajador/create',
        API_URL_document_create: domain + '/v1/documento/create',
        API_URL_farm_create: domain + '/v1/finca/create',
        API_URL_company_create: domain + '/v1/empresa/create',
        API_URL_type_of_employee_create: domain + '/v1/tipo-trabajador/create',
        API_URL_document_employee_create: domain + '/v1/trabajador',
        API_URL_employment_create: domain + '/v1/puesto/create',
        API_URL_area_create: domain + '/v1/area/create',
        API_URL_advance_unit_create: domain + '/v1/unidad-avance/create',
        API_URL_activity_create: domain + '/v1/actividad/create',
        API_URL_catch_week_create: domain + '/v1/semana/create',
        API_URL_catch_week_create_batch: domain + '/v1/semana/create/batch',
        API_URL_details_activity_create: domain + '/v1/finca/?/actividad/?/create',
        API_URL_budget_create: domain + '/v1/presupuesto/create/detalle?',
        API_URL_update_budget_create_new_activity: domain + '/v1/presupuesto',
        API_URL_capture_activity_create: domain + '/v1/captura-actividad/semana/?/finca/?/area/?/create',

        API_URL_filter_management_activity: domain + '/v1/finca/?/area/?',
        API_URL_find_area_by_farm: domain + '/v1/area/list/finca/?',

        API_URL_catch_week_generate: domain + '/v1/semana/generate',

        API_URL_user_list: domain + '/v1/usuario/list',
        API_URL_module_list: domain + '/v1/modulo/list',
        API_URL_profile_list: domain + '/v1/perfil/list',
        API_URL_company_list: domain + '/v1/empresa/list',
        API_URL_document_list: domain + '/v1/documento/list',
        API_URL_employee_list: domain + '/v1/trabajador/list',
        API_URL_employee_document_list: domain + '/v1/trabajador/?/documento-trabajador/list',
        API_URL_type_of_employee_list: domain + '/v1/tipo-trabajador/list',
        API_URL_farm_list: domain + '/v1/finca/list',
        API_URL_permissions_list: domain + '/v1/permiso/list',
        API_URL_employment_list: domain + '/v1/puesto/list',
        API_URL_labour_list: domain + '/v1/labor-trabajador/list',
        API_URL_area_list: domain + '/v1/area/list',
        API_URL_advance_unit_list: domain + '/v1/unidad-avance/list',
        API_URL_activity_list: domain + '/v1/actividad/list',
        API_URL_type_activity_list: domain + '/v1/tipo-actividad/list',
        API_URL_details_activity_list: domain + '/v1/actividad/?/detalle/list',
        API_URL_catch_week_list: domain + '/v1/semana/list',
        API_URL_farm_detail_list: domain + '/v1/finca/?/detalle/list',
        API_URL_farm_list_by_company: domain + '/v1/finca/list/empresa',
        API_URL_area_list_by_farm: domain + '/v1/area/list/finca',
        API_URL_activity_list_by_finca_area: domain + '/v1/finca/?/actividad/area/?/list',
        API_URL_catch_week_current_year_list: domain + '/v1/semana/current-year/list',
        API_URL_past_budget_by_month_area_finca: domain + '/v1/presupuesto/semana/list?',
        API_URL_company_by_week_of_budget_list: domain + '/v1/empresa/presupuesto/semana/?',
        API_URL_employee_by_farm_list: domain + '/v1/trabajador/finca/?',
        API_URL_budget_detail_by_week_farm_area: domain + '/v1/presupuesto/semana/?/finca/?/area/?/list',
        API_URL_budget_list: domain + '/v1/presupuesto/list',
        API_URL_activity_by_week_farm_area: domain + '/v1/actividad/presupuesto/semana/?/finca/?/area/?/list',
        API_URL_current_year_budget_list: domain + '/v1/presupuesto/semana/list',
        API_URL_employee_by_company_list: domain + '/v1/trabajador/empresa/?',
        API_URL_activities_by_budget: domain + '/v1/presupuesto', //para obtener las actividades por presupuesto
        API_URL_archive_by_activity: domain + '/v1/documento-actividad/presupuesto',
        API_URL_archive_by_url_archive: domain,

        API_URL_user_update: domain + '/v1/usuario/update',
        API_URL_profile_update: domain + '/v1/perfil/update',
        API_URL_employee_update: domain + '/v1/trabajador/update',
        API_URL_employee_document_update: domain + '/v1/trabajador/?/documento-trabajador/update',
        API_URL_document_update: domain + '/v1/documento/update',
        API_URL_type_of_employee_update: domain + '/v1/tipo-trabajador/update',
        API_URL_company_update: domain + '/v1/empresa/update',
        API_URL_farm_update: domain + '/v1/finca/update',
        API_URL_employment_update: domain + '/v1/puesto/update',
        API_URL_area_update: domain + '/v1/area/update',
        API_URL_advance_unit_update: domain + '/v1/unidad-avance/update',
        API_URL_activity_update: domain + '/v1/actividad/update',
        API_URL_catch_week_update: domain + '/v1/semana/update',

        API_URL_budget_update: domain + '/v1/presupuesto/update/?',
        API_URL_budget_update_status: domain + '/v1/presupuesto/update',

        API_URL_user_delete: domain + '/v1/usuario/delete',
        API_URL_profile_delete: domain + '/v1/perfil/delete',
        API_URL_employee_delete: domain + '/v1/trabajador/delete',
        API_URL_employee_document_delete: domain + '/v1/trabajador/?/documento-trabajador/delete',
        API_URL_document_delete: domain + '/v1/documento/delete',
        API_URL_type_of_employee_delete: domain + '/v1/tipo-trabajador/delete',
        API_URL_company_delete: domain + '/v1/empresa/delete',
        API_URL_farm_delete: domain + '/v1/finca/delete',
        API_URL_employment_delete: domain + '/v1/puesto/delete',
        API_URL_area_delete: domain + '/v1/area/delete',
        API_URL_advance_unit_delete: domain + '/v1/unidad-avance/delete',
        API_URL_activity_delete: domain + '/v1/actividad/delete',
        API_URL_catch_week_delete: domain + '/v1/semana/delete',
        
        API_URL_budget_delete: domain + '/v1/presupuesto',
    }
}

const config = {
    local: putEnviroment(domainLocal),

    development: putEnviroment(domainDevelopment),

    production: putEnviroment(domainProduction),
};

export default config;