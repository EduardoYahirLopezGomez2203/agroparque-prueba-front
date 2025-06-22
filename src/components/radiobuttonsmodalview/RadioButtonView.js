import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import ButtonComponent from "../buttons/ButtonComponent";

const RadioButtonComponent = ({ label, value, selectedValue, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Radio 
          checked={selectedValue === value}  // Comparar el valor seleccionado con el valor del Radio
          onChange={() => onChange(value)}  // Al seleccionar, actualiza el valor
          value={value}
        />
      }
      label={<span style={{ fontSize: "12px" }}>{label}</span>}
    />
  );
};

const RadioButtonView = ({ title, isOpen, onClose, items = [], selectedItem, onSelect }) => {
  const handleSelect = (value) => {
    onSelect(value);  // Actualiza el valor seleccionado
    onClose();        // Cierra el diálogo después de seleccionar
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ style: { zIndex: 2000 } }}
    >
      <DialogTitle style={{ fontSize: "16px" }}>{title}</DialogTitle>
      <DialogContent>
        <RadioGroup value={selectedItem} onChange={(e) => onSelect(e.target.value)}>
          {/* Mapeamos la lista de elementos recibidos como prop */}
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {items.map((item) => (
              <li key={item.id}>
                <RadioButtonComponent
                  label={item.nombre}
                  value={item.id}  // Asegurarse de que el valor es el id
                  selectedValue={selectedItem}  // Comparar el id seleccionado con el valor del RadioButton
                  onChange={handleSelect}  // Actualizar el valor cuando se seleccione
                />
              </li>
            ))}
          </ul>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <ButtonComponent
          onClick={() => onClose("Cancelar")}
          label="Cancelar"
          color="error"
          styleButton="contained"
        />
      </DialogActions>
    </Dialog>
  );
};
export default RadioButtonView;
