import React, { useEffect  } from 'react';
import { TextField, FormControl,FormHelperText } from '@mui/material';
//Borrar este y cambiar por input en la parte  del Login
const TextFieldComponent = ({label, name, value, onChange, error, helperText, type = "text", margin="normal",onEnterPress}) => {
  useEffect(() => {
    //console.log('Valor de error:', error);
  }, [error]);

  return (
    <FormControl fullWidth error={error}>
      <TextField
        label={label}
        name={name}        
        value={value}
        onChange={onChange}
        onKeyDown={onEnterPress}
        variant="outlined"
        margin= {margin}
        type={type}
        fullWidth
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default TextFieldComponent;