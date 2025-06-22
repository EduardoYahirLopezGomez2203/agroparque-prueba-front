import Drawer, { ElementDrawer, SectionDrawer } from "../../layer2/layout/Drawer";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import InfoIcon from '@mui/icons-material/Info';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import StraightenIcon from '@mui/icons-material/Straighten';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const DrawerAdmin = () => {

    const { logout } = useContext(AuthContext); // Salir de la sesion
    const navigate = useNavigate();

    const goToUser = () => navigate("/admin/users");
    const goToProfile = () => navigate("/admin/profiles");
    const goToEmployee = () => navigate("/admin/employees");
    const goToDocument = () => navigate("/admin/documents");
    const goToTypeOfEmployee = () => navigate("/admin/type-employees");
    const goToCompany = () => navigate("/admin/companies");
    const goToFarm = () => navigate("/admin/farms");
    const goToEmployment = () => navigate("/admin/employments");
    const goToArea = () => navigate("/admin/area");
    const goToAddInformation = () => navigate("/admin/add-information");
    const goToActivity = () => navigate("/admin/activity");
    const goToAdvanceUnit = () => navigate("/admin/advance-unit");
    const goToBudget = () => navigate("/admin/budget");

    return (
        <Drawer>
            <SectionDrawer title="Módulos" divider>
                <ElementDrawer
                    text="Gestión de Usuarios" 
                    icon={ <PeopleAltOutlinedIcon fontSize="large"/> } 
                > 
                    <ElementDrawer 
                        text="Usuarios" 
                        onClick={ goToUser } 
                        fontSize={13} 
                        icon={ <PersonOutlineOutlinedIcon /> }  
                    />
                    <ElementDrawer 
                        text="Perfiles" 
                        onClick={ goToProfile } 
                        fontSize={13} 
                        icon={ <ManageAccountsOutlinedIcon /> }  
                    />
                </ElementDrawer>

                <ElementDrawer 
                    text="Gestión de Empleados" 
                    icon={ <AssignmentIndOutlinedIcon fontSize="large"/> }
                > 
                    <ElementDrawer 
                        text="Empleados" 
                        onClick={ goToEmployee } 
                        fontSize={13} 
                        icon={ <GroupsOutlinedIcon /> }  
                    />
                    <ElementDrawer 
                        text="Tipos de Empleados" 
                        onClick={ goToTypeOfEmployee } 
                        fontSize={13} 
                        icon={ <BadgeOutlinedIcon /> }  
                    />
                    <ElementDrawer 
                        text="Puesto" 
                        onClick={ goToEmployment } 
                        fontSize={13} 
                        icon={ <GroupOutlinedIcon /> }  
                    />
                    <ElementDrawer 
                        text="Documentos" 
                        onClick={ goToDocument } 
                        fontSize={13} 
                        icon={ <InsertDriveFileOutlinedIcon /> } 
                    />
                    {/*
                        Activarse hasta el 3er Released
                    <ElementDrawer 
                        text="Añadir Información" 
                        onClick={ goToAddInformation } 
                        fontSize={13} 
                        icon={ <InfoIcon /> }  
                    />
                    */}
                </ElementDrawer>

                <ElementDrawer 
                    text="Gestión de Empresa" 
                    icon={ <AccountCircleOutlinedIcon fontSize="large"/> }
                >
                    <ElementDrawer 
                        text="Empresas" 
                        onClick={ goToCompany } 
                        fontSize={13} 
                        icon={ <BusinessOutlinedIcon /> } 
                    />
                    <ElementDrawer 
                        text="Fincas" 
                        onClick={ goToFarm } 
                        fontSize={13}   
                        icon={ <GrassOutlinedIcon /> }  
                    />

                    <ElementDrawer 
                        text="Áreas" 
                        onClick={ goToArea } 
                        fontSize={13}   
                        icon={ <ViewModuleIcon /> }  
                    />

                    <ElementDrawer 
                        text="Actividades" 
                        onClick={ goToActivity } 
                        fontSize={13}   
                        icon={ <FolderOutlinedIcon /> }  
                    />

                    <ElementDrawer 
                        text="Unidad de avance" 
                        onClick={ goToAdvanceUnit } 
                        fontSize={13}   
                        icon={ <StraightenIcon sx={{ transform: 'rotate(-45deg)'}}/> }  
                    />
                </ElementDrawer>

                <ElementDrawer 
                    text="Gestión de Presupuestos" 
                    icon={ <CurrencyExchangeIcon fontSize="large"/> }
                    onClick={ goToBudget}
                />
            </SectionDrawer>

            <SectionDrawer title="General">
                <ElementDrawer text="Configuración" icon={ <SettingsOutlinedIcon fontSize="large"/> } />
                <ElementDrawer 
                    text="Cerrar Sesión" 
                    icon={ <LogoutOutlinedIcon fontSize="large"/> }
                    onClick={ logout }
                />
            </SectionDrawer>
        </Drawer>
    );
};

export default DrawerAdmin;