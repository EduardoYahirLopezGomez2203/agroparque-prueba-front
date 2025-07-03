import { FormControl, Input, InputLabel } from "@mui/material";

const InputComponent = ({
    title,
    isRequired,
    dataValue,
    setDataValue,
    fieldName,
    disabled,
    error = false,
    type = "text",
    height = "24px",
    fontSize = "13px",
    onChangeCustom
}) => {
    const handleChange = (event) => {
        
        const { name, value } = event.target;
        onChangeCustom?.();

        const regex = /^[^\s].*$/; // No permite espacio al principio

        if (!setDataValue) { // ADICIÓN: En caso de no mandar la referencia
            return;
        }

        if (typeof dataValue == "object") { // ADICIÓN: En caso de que se reciban los datos como objeto
            setDataValue({
                ...dataValue,
                [name]: value
            })
        } else {
            setDataValue(value) // ADICIÓN: En caso de que no se envíe como objeto pero se envíe algo
        }        

        if (!regex.test(value)) {
            setDataValue({
                ...dataValue,
                [name]: value.trim()
            })
        } 
    }

    const value = typeof dataValue == "object" ? dataValue[fieldName] : dataValue; // ADICIÓN: En caso de que se reciban los datos como objeto

    return (
        <FormControl
            error={error}
            fullWidth
            disabled={disabled}
            required={isRequired}
            variant="standard" // Estilo visual
        >
            <InputLabel
                htmlFor={`${title}-${type}`}
                shrink // Label en la parte superior
                color="dark"
                sx={{
                    fontWeight: 500,
                    color: "#495361",
                    '& .MuiInputLabel-asterisk': { // Modificar el asterisco
                        color: "#AC4C4C"
                    }
                }}
            >
                {title}
            </InputLabel>
            <Input
                id={`${title}-${type}`}
                name={fieldName}
                disableUnderline
                onChange={handleChange}
                type={type}
                value={value}
                sx={{
                    borderRadius: "5px", border: 1,
                    borderColor: "#8D8D8D",
                    paddingX: 1,
                    height: height,
                    fontSize: fontSize,
                }}
            />
        </FormControl>
    );
};

export default InputComponent;