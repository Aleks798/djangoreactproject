import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import RefService from '../RefService';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ProductDialog from "./productedit";


// function createData(name, calories, fat, carbs, protein) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein
//     };
// }



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

//getRefs

//id,name,first_name,middle_name,last_name,email,phone,address
const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "#"
    },

    {
        id: "name",
        numeric: true,
        disablePadding: false,
        label: "Name of product"
    },

];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        setMountState,
        reloadData,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const addProduct = (event) => {
        setEditDialogOpen(true);
        ////console.log('(event) = > setEditDialogOpen(true);');
    }



    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts"
                        }}
                    />
                </TableCell>
                <TableCell padding="checkbox">
                    <Tooltip title="Add">
                        <IconButton onClick={addProduct}>
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>

                    {editDialogOpen && (<ProductDialog
                        id={0} open={editDialogOpen}
                        setOpen={setEditDialogOpen}
                        elementData={{id:0, name:''}}
                        setMountState={setMountState}
                        onClose={reloadData}
                    />)
                    }

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    isMount: PropTypes.bool.isRequired,
    setMountState: PropTypes.func.isRequired
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        )
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%",
                        fontWeight: 'Bold',
                        textTransform: 'uppercase'
                    }}
                    variant="h7"
                    id="tableTitle"
                    component="div"

                >
                    Products list
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}


        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

export default function ProductTable() {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [isMount, setMountState] = React.useState(false);

    const  refService  =  new  RefService();

    const  [rows, setRows] = React.useState([]);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    //const  [nextlink, setNextLink] = React.useState("");

    //const rows

    React.useEffect(() => {
            if (!isMount) {
                refService.getRefs('products').then(function (result) {
                    setRows(result.data);
                    setMountState(true);

                    //setNextLink(result.nextlink);
                    //console.log('refService.getRefs');
                })
            };
        }
    ,
        []
    );

    const reloadData = () => {
        //console.log('reloadData()');
        refService.getRefs('products').then(function (result) {
            setRows(result.data);
            setMountState(true);

            //setNextLink(result.nextlink);
            //console.log('refService.getRefs');
        });

    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {

        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const [activeRow, setActiveRow] = React.useState(-1);

    const editProduct = (event, id) => {

        setSelected([]);
        setEditDialogOpen(true);
        setActiveRow(id);
       //setMountState(false);

        //handleClick(event, id);

        //console.log('(event) = > editProduct('+id+');');
    }

    return (
        <Box sx={{ width: "60%", boxShadow: 1, ml: "30%" } } alignItems="right">
            <Paper sx={{ width: "100%", height: "100%", mb: 2, alignItems: "right" }} >

                <EnhancedTableToolbar numSelected={selected.length}  >

                </EnhancedTableToolbar>
                <TableContainer  >
                    <Table
                        sx={{ minWidth: 400 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            isMount={isMount}
                            setMountState={setMountState}
                            reloadData={reloadData}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            //onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId
                                                    }}
                                                    onClick={(event) => handleClick(event, row.name)}
                                                />
                                            </TableCell>

                                            <TableCell padding="checkbox">
                                                <Tooltip title="edit">
                                                    <IconButton onClick={(e) => { editProduct(e, row.id)}} >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>

                                                {(editDialogOpen && activeRow === row.id) && (
                                                    <ProductDialog
                                                        id={row.id}
                                                        open={editDialogOpen}
                                                        setOpen={setEditDialogOpen}
                                                        elementData={row}
                                                        setMountState={setMountState}
                                                        onClose={reloadData}

                                                    />)}
                                            </TableCell>

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.id}
                                                {
                                                    //id,name,
                                                }
                                            </TableCell>
                                            <TableCell align="right">{row.name}</TableCell>

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
                sx={{ mb: 1 }}
            />
        </Box>
    );
}
