import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectMultipleComponent = ({
    title, 
    isRequired, 
    setValue,
    options,
    disabled,
    value = [], // <- Recibe el valor actual desde el padre
    error = false,
    height = "24px",
    fontSize = "13px"
}) => {

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setValue(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl
            error={error}
            fullWidth 
            disabled={disabled}
            required={isRequired}
            variant="standard"
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
                value={value || []}
                multiple
                disableUnderline
                sx={{
                    borderRadius: "5px", 
                    border: 1, 
                    borderColor: "#8D8D8D", 
                    paddingX: 1,
                    height: height, 
                    fontSize: fontSize
                }}
            > 
                {options.map((element) => (
                    <MenuItem 
                        key={element.id} // Clave única
                        value={element.id} // Guarda solo el valor
                    >
                        {element.nombre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectMultipleComponent;