import Footer from "../modules/layer1/footer/Footer";
import Login from "../modules/layer1/login/Login";
import { Box } from '@mui/material'

const LoginPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            <Box
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    textAlign: 'center',
                    p: 2,
                    pt: 20,
                    width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
                    mx: 'auto',
                }}
            >
                <Login/>
            </Box>
            <Footer/>
        </Box>
    );
};

export default LoginPage;
