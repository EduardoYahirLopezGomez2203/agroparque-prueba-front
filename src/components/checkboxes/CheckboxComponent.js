import { FormControlLabel, Checkbox } from "@mui/material";

const CheckboxComponent = ({ label, setSelected, selected, onClick, size, name }) => {

    const handleChange = (e) => {
        if(setSelected) {
            setSelected(e.target.checked)
        }
    }

    return (
        <FormControlLabel
            control={ <Checkbox size={ size } onClick={ onClick }/> } // large, medium, small
            label={ label }
            slotProps={{
                typography: {
                    variant: "body2"
                }
            }}
            name={ name }
            onChange={ handleChange }
            checked={ selected }
        />
    );
};

export default CheckboxComponent;