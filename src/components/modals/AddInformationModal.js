import React, { useState, useEffect } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Dialog, DialogActions, TableContainer, Typography
} from "@mui/material";
import ButtonComponent from "../buttons/ButtonComponent";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextFieldsIcon from "@mui/icons-material/TextFields";
import IconTextComponent from "../icontexts/IconTextComponent";
import StorageIcon from "@mui/icons-material/Storage";
import InputComponent from "../inputs/InputComponent";

const AddInformationModal = ({ open, setIsOpenModal, SectionForm, data = [] }) => {
  // Estado para almacenar los datos editables
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Se actualiza el estado cuando `data` cambia
    setRows(data.map(item => ({ id: item.id, nombre: item.nombre, valor: "" })));
  }, [data]);

  // Función para manejar cambios en los TextFields
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <div style={{ padding: "15px" }}>
        <div style={{ padding: "0px 30% 0px 0px" }}>
          <SectionForm title="Añadir Información" icon={<AddCircleIcon sx={{ fontSize: "45px" }} color="slateBlue" />} />
        </div>

        <div style={{ padding: "15px" }}>
          {/* Tabla con bordes */}
          <TableContainer sx={{ border: 1, borderRadius: 2.5, borderColor: "#9DA0A5" }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#F7F9FA" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "#495361" }}>
                    <IconTextComponent icon={<TextFieldsIcon />} text={"Dato"} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#495361" }}>
                    <IconTextComponent icon={<StorageIcon />} text={"Valor"} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                  <TableCell sx={{ color: "#495361", fontWeight: 200, width: "50%" }}>
                    <Typography variant="body1" sx={{ color: "#495361", fontWeight: 500, pl: 2 }}>
                      {row.nombre}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#495361", fontWeight: 200, width: "50%" }}>
                    <div style={{margin:"8px 10px 8px 0px"}}>
                    <InputComponent
                      title=""
                      fieldName="valor"
                      dataValue={row.valor}
                      setDataValue={(value) => handleChange(index, "valor", value)}
                      type="text"
                    />
                    </div>
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* Botones de acción */}
      <DialogActions>
        <ButtonComponent
          label="Aceptar"
          icon={<CheckIcon />}
          color="vividBlue"
        />
        <ButtonComponent
          label="Cancelar"
          styleButton="outlined"
          color="brightRed"
          typeButton="reset"
          icon={<CloseIcon />}
          onClick={closeModal}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddInformationModal;
