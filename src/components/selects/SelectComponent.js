import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectComponent = ({
    title,
    isRequired,
    setValue,
    options,
    disabled,
    fieldName,
    value, // <- Recibe el valor actual desde el padre
    error = false,
    height = "24px", 
    fontSize = "13px",
    sx = {},
}) => {

    const handleChange = (event) => {
        const selectedValue = event.target.value;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            setValue(prev => ({
                ...prev,
                [fieldName]: selectedValue // Actualiza el campo específico
            }));
            return;
        }

        if (setValue) {
            setValue(selectedValue); // Envía solo el valor (no el objeto completo)
        }
    };

    return (
        <FormControl
            error={error}
            fullWidth
            required={isRequired}
            variant="standard"
            sx={{ ...sx }}
        >
            <InputLabel
                htmlFor={`${title}-select`}
                shrink
                color="dark"
                sx={{
                    fontWeight: 500,
                    color: "#495361",
                    '& .MuiInputLabel-asterisk': {
                        color: "#AC4C4C"
                    }
                }}
            >
                {title}
            </InputLabel>
            <Select
                id={`${title}-select`}
                onChange={handleChange}
                value={value[fieldName] ?? ''}
                disabled={disabled}
                disableUnderline
                sx={{
                    borderRadius: "5px",
                    border: 1,
                    borderColor: "#8D8D8D",
                    paddingX: 1,
                    height: height, 
                    fontSize: fontSize,
                    ...sx
                }}
            >
                {(options || []).map((element) => (
                    <MenuItem
                        key={element.id}
                        value={element.id}
                    >
                        {element.nombre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectComponent;