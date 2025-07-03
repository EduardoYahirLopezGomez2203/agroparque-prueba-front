// SelectFormWithOnChange.js
import { Box } from "@mui/material";
import SelectWithOnChange from "./SelectWithOnChange";

export const SelectFormWithOnChange = ({
  title,
  isRequired = false,
  options,
  value,
  onChange,
  fieldName,
  onJefeClick, 
  disabled,
  sx = {},
}) => {
  return (
    <Box sx={{ paddingTop: 2, flexGrow: 1 }}>
      <SelectWithOnChange
        title={title}
        isRequired={isRequired}
        options={options}
        fieldName={fieldName}
        value={value}
        onChange={onChange}
        onJefeClick={onJefeClick} 
        disabled={disabled}
        sx={sx}
      />
    </Box>
  );
};
