import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Menu,
    MenuItem,
    MenuList,
    Stack,
    Pagination,
    Typography,
    FormControl,
    Select,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconTextComponent from "../icontexts/IconTextComponent";

// La estructura del header = {id, text, icon}
const TableComponent = ({
    information = { header: [], body: [] }, isLoading = false, error = null, setId, setUpdateData, setIdDelete
}) => {
    const [tableData, setTableData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setTableData(Array.isArray(information.body) ? information.body : []);
    }, [information.body]);

    if (isLoading) return <Typography>Cargando datos...</Typography>;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    const handleDeleteRow = (rowId) => {
        setTableData(prevData => prevData.filter(row => row.id !== rowId));
        setIdDelete(rowId);
    };

    const handleEditRow = (rowId) => {
        const selectedRow = tableData.find((row) => row.id === rowId);
        setId(rowId);
        setUpdateData(selectedRow);
    };

    const numberPages = Math.max(Math.ceil(tableData.length / rowsPerPage), 1);
    const informationPerPage = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
                                        <span>{row[column.id] || "N/A"}</span>
                                    </TableCell>
                                ))}
                                <TableCell align="right">
                                    <MenuComponent onEdit={() => handleEditRow(row.id)} onDelete={() => handleDeleteRow(row.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Paginación y Selector de filas en una misma fila */}
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
                            height: "32px",  // Ajusta la altura del selector
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

const MenuComponent = ({ onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    return (
        <>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertRoundedIcon />
            </IconButton>
            <Menu open={openMenu} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                <MenuList disablePadding>
                    <MenuItem onClick={() => { setAnchorEl(null); onEdit(); }}>
                        <EditIcon /> Editar
                    </MenuItem>
                    <MenuItem onClick={() => { setAnchorEl(null); onDelete(); }}>
                        <DeleteIcon /> Eliminar
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default TableComponent;
