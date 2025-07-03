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
    Badge,
} from "@mui/material";
import IconTextComponent from "../icontexts/IconTextComponent";
import { useEffect, useState } from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { styled } from '@mui/material/styles';

const RedBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#E94C4C',
        color: '#E94C4C',
        fontSize: 18,
        top: 8,
        right: -8,
        minWidth: 5,
        height: 5,
        borderRadius: '50%',
    },
}));

const GreenBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#28a745', // verdecito
        color: '#28a745',
        fontSize: 18,
        top: 8,
        right: -8,
        minWidth: 5,
        height: 5,
        borderRadius: '50%',
    },
}));

const GrayBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#6c757d', // grisecito
        color: '#6c757d',
        fontSize: 18,
        top: 8,
        right: -8,
        minWidth: 5,
        height: 5,
        borderRadius: '50%',
    },
}));


const BasicTableComponent = ({
    information = { header: [], body: [{ hiddenMenuRow: false }] }, showMenuColumn = true,
    items = [{ icon: <></>, text: "", onClick: (element) => { } }], isPastBudget = false
}) => {
    const [tableData, setTableData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        setTableData(information.body);
    }, [information.body]);

    // Filtrado solo si isPastBudget y filtro en "adicionales"
    const filteredTableData = isPastBudget && filter === "adicionales"
        ? tableData.filter(row => String(row.status_actividad) === "25" || String(row.status_actividad) === "23" || String(row.status_actividad) === "24")
        : tableData;

    const numberPages = Math.max(Math.ceil(filteredTableData.length / rowsPerPage), 1);
    const informationPerPage = filteredTableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
                            {showMenuColumn &&
                                <TableCell></TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {informationPerPage.map((row) => (
                            <TableRow key={row.id}>
                                {information.header.map((column) => (
                                    <TableCell key={column.id} sx={{ color: "#495361", fontWeight: 400 }}>
                                        {isPastBudget && column.id === "nombre_actividad" ? (() => {
                                            const status = String(row.status_actividad);
                                            const content = <span>{row[column.id] ?? "N/A"}</span>;

                                            if (status === "25") {
                                                return (
                                                    <RedBadge
                                                        variant="dot"
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                        badgeContent="*"
                                                    >
                                                        {content}
                                                    </RedBadge>
                                                );
                                            } else if (status === "24") {
                                                return (
                                                    <GreenBadge
                                                        variant="dot"
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                        badgeContent="*"
                                                    >
                                                        {content}
                                                    </GreenBadge>
                                                );
                                            } else if (status === "23") {
                                                return (
                                                    <GrayBadge
                                                        variant="dot"
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                        badgeContent="*"
                                                    >
                                                        {content}
                                                    </GrayBadge>
                                                );
                                            } else {
                                                return content;
                                            }
                                        })() : (
                                            row[column.id] ?? "N/A"
                                        )}

                                    </TableCell>
                                ))}

                                {/* Se mostrará siempre y cuando quiera ver la columna y no quiera ocultar la fila */}
                                {showMenuColumn &&
                                    <TableCell align="right">
                                        <MenuComponent data={row} items={items} hiddenMenu={row.hiddenMenuRow} />
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Paginación y Selectores */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mt={2}>
                     {/* Selector de filtro solo si isPastBudget */}
                    {isPastBudget ? (
                        <FormControl sx={{ minWidth: 180 }}>
                            <Select
                                value={filter}
                                onChange={e => {
                                    setFilter(e.target.value);
                                    setPage(1);
                                }}
                                displayEmpty
                                sx={{
                                    height: "32px",
                                    color: "#495361",
                                    fontWeight: 600,
                                    fontSize: "0.8125rem",
                                }}
                            >
                                <MenuItem value="all">Todo</MenuItem>
                                <MenuItem value="adicionales">Actividades Adicionales</MenuItem>
                            </Select>
                        </FormControl>
                    ) : <div />}
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
}

const MenuComponent = ({ data, items = [], hiddenMenu }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    return (
        <>
            <IconButton sx={{ visibility: hiddenMenu === true ? "hidden" : "visible" }} onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertRoundedIcon />
            </IconButton>
            <Menu open={openMenu} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                <MenuList disablePadding>
                    {items.map((item, index) => (
                        <MenuItem key={index} onClick={() => { item.onClick(data); setAnchorEl(null) }}>
                            {item.icon}
                            {item.text}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    );
};

export  default BasicTableComponent;