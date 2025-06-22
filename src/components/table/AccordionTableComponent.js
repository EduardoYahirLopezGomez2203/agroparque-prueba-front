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
    Collapse,
    Box,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconTextComponent from "../icontexts/IconTextComponent";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// La estructura del header = {id, text, icon}
const AccordionTableComponent = ({
    information = { header: [], body: [] }, isLoading = false, error = null, setId, setUpdateData, setIdDelete,
    showAccordion = true
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

    const RowAccordion = ({ row, column }) => {

        const [open, setOpen] = useState(false);

        return (
            <>
                <TableRow key={row.id}>
                    {showAccordion &&
                        <TableCell>
                            <IconButton
                                sx={{ bgcolor: "#D9D9D9", borderRadius: "5px" }}
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon fontSize="small" color="slateBlue" /> : <KeyboardArrowDownIcon fontSize="small" color="slateBlue" />}
                            </IconButton>
                        </TableCell>
                    }

                    {column.map((column) => (
                        <TableCell key={column.id} sx={{ color: "#495361", fontWeight: 400 }}>
                            <span>{row[column.id] || "N/A"}</span>
                        </TableCell>
                    ))}

                    <TableCell align="right">
                        <MenuComponent onEdit={() => handleEditRow(row.id)} onDelete={() => handleDeleteRow(row.id)} />
                    </TableCell>
                </TableRow>

                {showAccordion &&
                    <TableRow >
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={column.length + 2} >
                            <Collapse in={open} unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Detalle
                                    </Typography>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                }
            </>
        );
    }

    return (
        <>
            <TableContainer sx={{ border: 1, borderRadius: 2.5, borderColor: "#9DA0A5" }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: "#F7F9FA" }}>
                        <TableRow>
                            {showAccordion && <TableCell></TableCell>}
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
                            <RowAccordion row={row} column={information.header} />
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

export default AccordionTableComponent;
