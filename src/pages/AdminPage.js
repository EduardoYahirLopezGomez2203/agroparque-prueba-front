import {createContext, useState} from 'react';
import DrawerAdmin from '../modules/layer1/admin/DrawerAdmin';
import {Box, Container} from '@mui/material';
import {Outlet} from 'react-router-dom';
import Footer from '../modules/layer1/footer/Footer';

export const DrawerWidthContext = createContext(); // Creamos un contexto

const AdminPage = () => {

    const [drawerWidth, setDrawerWidth] = useState(0);

    const responsiveWidth = `calc(100% - ${drawerWidth}px)`

    return (
        <DrawerWidthContext.Provider value={{
            drawerWidth,
            setDrawerWidth
        }}>
            <DrawerAdmin/>
            <Container maxWidth={false}
                       sx={{
                           marginRight: 0,
                           width: responsiveWidth
                       }}
            >
                <Outlet/> {/* Renderiza la ruta anidada */}
                <Footer width={responsiveWidth}/>
            </Container>
        </DrawerWidthContext.Provider>
    );
};

export default AdminPage;
