import { Box, Typography } from "@mui/material";

const ConfirmClosure = ({title,warning}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                textAlign: "center",
            }}
        >
            <Typography sx={{ fontSize: "26px", fontWeight: 600, color: "#495361" }}>
                {title}
            </Typography>
            <Typography sx={{ fontSize: "17px", fontWeight: 600, color: "#E94C4C" }}>
                {warning}
            </Typography>
        </Box>
    );
};

export default ConfirmClosure;
