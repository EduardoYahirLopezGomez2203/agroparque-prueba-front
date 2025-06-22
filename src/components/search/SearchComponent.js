import { TextField, IconButton } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const SearchComponent = ({ value, onChange, width = "100%" }) => {

    const handleChange = (event) => {
        onChange(event.target.value)
    }

    return (
        <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={value}
            onChange={handleChange}
            placeholder="Buscar..."
            InputProps={{
                startAdornment: <SearchRoundedIcon sx={{ color: 'action.active', mr: 1 }} />,
                endAdornment: value && (
                    <IconButton onClick={() => { onChange('')}} size="small">
                        <CancelRoundedIcon fontSize="small" />
                    </IconButton>
                ),
                style: {
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }
            }}
            sx={{ width: width }}
        />
    );
};

export default SearchComponent;