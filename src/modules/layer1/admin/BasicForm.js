import { Box, Stack } from "@mui/material";

const BasicForm = ({ children, direction = "row", spacing = 10, buttons, handleSubmit, handleReset }) => {
    return (
        <Box component="form"
            sx={{
                display: "grid",
                marginRight: 10,
                gap: 2
            }}
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            <Stack
                direction={direction}  // row, column
                sx={{ gap: spacing }}
            >
                {children} 
            </Stack>

            {/* Botones del formulario */}
            <Stack direction="row" sx={{ justifyContent: "end", gap: 2 }}>
                { buttons }
            </Stack>
        </Box>
    );
};

export const BasicFilterForm = ({ children, direction = "row", spacing = 5, handleSubmit}) => {
    return (
        <Box component="form"
            sx={{
                display: "grid",
                marginRight: 10,
                gap: 2
            }}
            onSubmit={handleSubmit}
        >
            <Stack
                direction={direction}  // row, column
                sx={{ gap: spacing }}
            >
                {children} {/* Aqui va SectionForm */}
            </Stack>
        </Box>
    );
}

export default BasicForm;

