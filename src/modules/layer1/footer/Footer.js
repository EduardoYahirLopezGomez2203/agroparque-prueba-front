import { AppBar, Box, Divider, Typography, Slide, useScrollTrigger } from '@mui/material';

const Footer = ({width}) => (
    <>
        <Box sx={{ marginTop: 5 }} />
        <HideOnScroll>
            <AppBar
                position="fixed"
                color="transparent"
                sx={{
                    top: 'auto', bottom: 0,
                    backgroundColor: "white",
                    marginRight: 0,
                    width: width,
                }}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        fontSize: { xs: '0.8rem', sm: '1rem' }, // Texto más pequeño en pantallas pequeñas
                    }}
                >
                    <Divider />
                    <Typography
                        variant="body2" color="slateBlue"
                        sx={{
                            marginBottom: "auto",
                            fontWeight: 600
                        }}
                    >
                        Copyright© {new Date().getFullYear()} Agroparque Web App
                    </Typography>
                </Box>
            </AppBar>
        </HideOnScroll>
    </>
)

function HideOnScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="up" in={!trigger}>
            {children ?? <div />}
        </Slide>
    );
}

export default Footer