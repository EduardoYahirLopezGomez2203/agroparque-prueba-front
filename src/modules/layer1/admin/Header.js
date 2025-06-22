import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = ({ text }) => {
    return (
        <AppBar 
            position="static"
            sx={{
                boxShadow: "none",
                bgcolor: "transparent",
            }}
        >
            <Toolbar disableGutters> 
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        color: "black",
                    }}
                > 
                    { text } 
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;