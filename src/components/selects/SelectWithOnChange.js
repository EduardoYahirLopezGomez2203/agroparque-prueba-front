// SelectWithOnChange.js
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectWithOnChange = ({
  title,
  isRequired,
  options,
  disabled,
  fieldName,
  value,
  onChange,
  error = false,
  height = "24px",
  fontSize = "13px",
  sx = {},
  onJefeClick // <-- Pasamos esta prop extra
}) => {
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
          "& .MuiInputLabel-asterisk": {
            color: "#AC4C4C",
          },
        }}
      >
        {title}
      </InputLabel>
      <Select
        id={`${title}-select`}
        onChange={onChange}
        value={value ?? ""}
        disabled={disabled}
        disableUnderline
        sx={{
          borderRadius: "5px",
          border: 1,
          borderColor: "#8D8D8D",
          paddingX: 1,
          height: height,
          fontSize: fontSize,
          ...sx,
        }}
      >
        {(options || []).map((element) => (
          <MenuItem
            key={element.id}
            value={element.id}
            onClick={() => {
              if (element.nombre === "Jefe de Área") {
                onJefeClick?.(); // 👈 Llama a tu lógica si es Jefe de Área
              }
            }}
          >
            {element.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectWithOnChange;
