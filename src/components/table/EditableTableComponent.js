import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem,
    Stack,
    Pagination,
    FormControl,
    Select,
    IconButton,
    Menu,
    MenuList,
    Button,
} from "@mui/material";
import IconTextComponent from "../icontexts/IconTextComponent";
import { weekDays } from "../../utils/dateUtil";
import { useContext, useEffect, useState } from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import InputComponent from "../inputs/InputComponent";
import { toLocalDate } from "../../utils/dateUtil";
import { DataCatchWeek } from "../../modules/layer3/catchweek/CatchWeek";

/*
  (No usar) 
  Ajustado unicamente para catchweek
  REFACTORIZACION PENDIENTE
*/
const EditableTableComponent = ({ information = { header: [], body: [] }, setInformation }) => {
    const [tableData, setTableData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedRow, setEditedRow] = useState({});

    const { data } = useContext(DataCatchWeek);

    const numberPages = Math.max(Math.ceil(tableData.length / rowsPerPage), 1);
    const informationPerPage = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    useEffect(() => {
        setTableData(information.body);
    }, [information.body]);

    const renderEditComponent = (column, value) => {
        switch (column.editType) {
            case "text":
                return (
                    <InputComponent
                        fieldName={column.id}
                        setDataValue={setEditedRow}
                        dataValue={editedRow} // <- Maneja valores undefined
                    />
                );
            case "date":
                const startDate = toLocalDate(editedRow["fecha_inicio"])
                const lastDate = toLocalDate(editedRow["fecha_fin"])

                /*
                const rangeDay = lastDate - startDate;

                
                if (rangeDay < 0 || rangeDay > 6) {
                    //data.alert("La semana solo acepta un rango de 7 días", "warning")

                    setEditedRow(prev => ({
                        ...prev, 
                        ["fecha_inicio"]: null,
                        ["fecha_fin"]: null
                    }));

                    break
                }
                */

                if (column.id.includes("fin")) {
                    const dayIndex = lastDate.getDay(); // 0 (Domingo) - 6 (Sábado)
                    const days = weekDays[dayIndex].nombre;

                    if (days.toLowerCase() !== editedRow["diasemana_fin"].toLowerCase()) {
                        if (setEditedRow) {
                            setEditedRow(prev => ({
                                ...prev,
                                ["diasemana_fin"]: capitalizeString(days)// Actualiza el campo específico
                            }));
                        }
                    }
                }

                if (column.id.includes("inicio")) {
                    const dayIndex = startDate.getDay(); // 0 (Domingo) - 6 (Sábado)
                    const days = weekDays[dayIndex].nombre;

                    if (days !== editedRow["diasemana_inicio"]) {
                        if (setEditedRow) {
                            setEditedRow(prev => ({
                                ...prev,
                                ["diasemana_inicio"]: capitalizeString(days)// Actualiza el campo específico
                            }));
                        }
                    }
                }
                return (
                    <InputComponent
                        fieldName={column.id}
                        type="date"
                        setDataValue={setEditedRow}
                        dataValue={editedRow} // <- Maneja valores undefined
                    />
                );
            case "select-unique":

                const handleChange = (event) => {
                    let selectedValue = event.target.value;

                    const selectedDay = weekDays.find(day => day.nombre.toLowerCase() === selectedValue.toLowerCase());
                    const currentDay = weekDays.find(day => day.nombre.toLowerCase() === editedRow[column.id]?.toLowerCase());

                    // Verifica el dia seleccionado con el anterior para ver la diferencia de dias
                    const rangeDay = selectedDay.id - currentDay.id;

                    if (column.id.includes("fin")) {
                        const fecha = toLocalDate(editedRow["fecha_fin"]);
                        fecha.setDate(fecha.getDate() + rangeDay);
                        if (setEditedRow) {
                            setEditedRow(prev => ({
                                ...prev,
                                ["fecha_fin"]: fecha.toISOString().split("T")[0] // Actualiza el campo específico
                            }));
                        }
                    }

                    if (column.id.includes("inicio")) {
                        const fecha = toLocalDate(editedRow["fecha_inicio"]);
                        fecha.setDate(fecha.getDate() + rangeDay);
                        if (setEditedRow) {
                            setEditedRow(prev => ({
                                ...prev,
                                ["fecha_inicio"]: fecha.toISOString().split("T")[0] // Actualiza el campo específico
                            }));
                        }
                    }

                    if (setEditedRow) {
                        setEditedRow(prev => ({
                            ...prev,
                            [column.id]: selectedValue // Actualiza el campo específico
                        }));
                    }
                };

                return (
                    <Select
                        onChange={handleChange}
                        value={capitalizeString(editedRow[column.id]) || value}
                        variant="standard"
                        disableUnderline
                        sx={{
                            borderRadius: "5px",
                            border: 1,
                            borderColor: "#8D8D8D",
                            paddingX: 1,
                            height: "24px",
                            fontSize: "13px"
                        }}
                    >
                        {column?.options.map((element, index) => (
                            <MenuItem
                                key={index} // Clave única
                                value={element} // Guarda solo el valor
                            >
                                {element}
                            </MenuItem>
                        ))}
                    </Select>
                );
            default:
                return value;
        }
    };

    const saveChanges = (rowId) => {
        setInformation((prevData) => ({
            ...prevData,
            body: prevData.body.map((row) =>
                row.id === rowId ? {
                    ...row,
                    ...editedRow
                } : row
            )
        }));
        setEditingRowId(null);
        setEditedRow({});
    };

    return (
        <>
            <TableContainer sx={{ border: 1, borderRadius: 2.5, borderColor: "#9DA0A5" }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: "#F7F9FA" }}>
                        <TableRow>
                            {information.header.map((element, index) => (
                                <TableCell key={index} sx={{ fontWeight: 600, color: "#495361" }}>
                                    <IconTextComponent icon={element.icon} text={element.text} />
                                </TableCell>
                            ))}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {informationPerPage.map((row) => (
                            <TableRow key={row.id}>
                                {information.header.map((column) => (
                                    <TableCell key={column.id} sx={{ color: "#495361", fontWeight: 400 }}>
                                        {editingRowId === row.id
                                            ? renderEditComponent(column, editedRow[column.id] ?? row[column.id])
                                            : row[column.id] || "N/A"}
                                    </TableCell>
                                ))}
                                <TableCell align="right">
                                    {editingRowId === row.id ? (
                                        <Button
                                            size="small"
                                            startIcon={<SaveIcon />}
                                            onClick={() => saveChanges(row.id)}
                                        >
                                            Guardar
                                        </Button>
                                    ) : (
                                        <MenuComponent
                                            data={row}
                                            onEdit={() => {
                                                setEditingRowId(row.id);
                                                setEditedRow(row);
                                            }}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Paginación y Selector de filas */}
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mt={2}>
                <Pagination count={numberPages} page={page} onChange={(e, newPage) => setPage(newPage)} />
                <FormControl sx={{ minWidth: 30 }}>
                    <Select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(e.target.value);
                            setPage(1);
                        }}
                        autoWidth
                        sx={{
                            height: "32px",
                            color: "#495361",
                            fontWeight: 600,
                            fontSize: "0.8125rem",
                            paddingRight: 1
                        }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </>
    );
};

const MenuComponent = ({ onEdit }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    return (
        <>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertRoundedIcon />
            </IconButton>
            <Menu open={openMenu} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                <MenuList disablePadding>
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            onEdit();
                        }}
                    >
                        <EditIcon sx={{ mr: 1 }} />
                        Editar
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

const capitalizeString = (str) => {
    if (typeof str !== 'string') return str; // Si no es string, retorna el valor original
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default EditableTableComponent;