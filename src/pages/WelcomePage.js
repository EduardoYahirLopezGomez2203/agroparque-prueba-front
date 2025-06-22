import { Box, Typography } from "@mui/material";
import { ReactComponent as CustomIcon} from "../../src/assets/WelcomeImage.svg";
import { useEffect, useState } from "react";

const WelcomePage = () => {

    const [name, setName] = useState(sessionStorage.getItem("name"))

    useEffect(() => {
        if (!name) {
            if (!sessionStorage.getItem("name")) {
                setName("")
            } else {
                setName(sessionStorage.getItem("name"))
            }
        }
    }, [name])

    return (
        <Box 
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography fontWeight={800} variant="h3" paddingBottom={3}>
                {`Bienvenido ${name}`}
            </Typography>
            
            <CustomIcon width={600} height={600} />

            <Typography fontWeight={700} variant="h4" paddingTop={3}>
                ¡Todo comienza aquí!
            </Typography>

            <Typography fontWeight={700} variant="h5" color="#808080">
                Tu prenomina a un click
            </Typography>
        </Box>
    );
};

export default WelcomePage;