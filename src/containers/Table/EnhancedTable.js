import {
    Checkbox,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
    Box,
} from "@mui/material";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {null2String} from "../../helpers/parse";
import EnhancedTableHead from "./EnhancedTableHead";
import TableActions from "./TableActions";
import TableToolbar from "./TableToolbar";

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const EnhancedTable = ({rows, rowsMetadata, onClickAdd, onClickDelete, cellActions}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("id");
    const [selectedItems, setSelectedItems] = useState([]);

    const onPageChange = (event, newPage) => setPage(newPage);
    const onChangeRowsPerPage = event => setRowsPerPage(event.target.value);

    const onRequestSort = (event, property) => {
        if (!property) return;
        if (orderBy === property) setOrder(order === "desc" ? "asc" : "desc");
        setOrderBy(property);
    };

    const onSelectAllClick = event => {
        setSelectedItems(event.target.checked ? rows.map(row => row.id) : []);
    };

    const rowIsSelected = id => selectedItems.includes(id);

    const onClickRow = (event, id) => {
        const selectedIndex = selectedItems.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) newSelected = [...selectedItems, id];
        else newSelected = selectedItems.filter((_, i) => i !== selectedIndex);
        setSelectedItems(newSelected);
    };

    const onClickCellAction = ({cellAction, event, row}) => {
        event.stopPropagation();
        cellAction(event, row);
    };

    const numSelected = selectedItems.length;

    return (
        <Paper sx={{width: "100%"}}>
            <TableToolbar
                onClickAdd={onClickAdd}
                onClickDelete={event => {
                    setSelectedItems([]);
                    selectedItems.forEach(item => onClickDelete(item));
                }}
                selectedItems={selectedItems}
                numSelected={numSelected}
            />
            <Box sx={{overflowX: "auto"}}>
                <Table sx={{minWidth: 500}}>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={onRequestSort}
                        rowsMetadata={rowsMetadata}
                        onSelectAllClick={onSelectAllClick}
                        numSelected={numSelected}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {rows
                            .sort(getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => {
                                const isSelected = rowIsSelected(row.id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => onClickRow(event, row.id)}
                                        tabIndex={-1}
                                        key={row.id}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        selected={isSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected}/>
                                        </TableCell>
                                        {rowsMetadata.map(rowMetadata => {
                                            const label = rowMetadata.componentLabel ?? row[rowMetadata.id];
                                            const hasOnClick = cellActions?.[rowMetadata.id];
                                            let componentProps = {};
                                            if (hasOnClick) {
                                                componentProps.onClick = event => {
                                                    onClickCellAction({
                                                        cellAction: cellActions[rowMetadata.id],
                                                        event,
                                                        row,
                                                    });
                                                };
                                            }
                                            const Component = rowMetadata.component
                                                ? rowMetadata.component(row[rowMetadata.id])
                                                : undefined;
                                            if (Component === Switch) {
                                                componentProps.checked = row[rowMetadata.id];
                                                componentProps.color = "primary";
                                            }
                                            return (
                                                <TableCell key={rowMetadata.id}
                                                           align={rowMetadata.numeric ? "right" : "left"}>
                                                    {Component ? (
                                                        <Component {...componentProps}>{null2String(label)}</Component>
                                                    ) : (
                                                        row[rowMetadata.id]
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={5}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={onPageChange}
                                onRowsPerPageChange={onChangeRowsPerPage}
                                ActionsComponent={TableActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Box>
        </Paper>
    );
};

EnhancedTable.propTypes = {
    rows: PropTypes.array.isRequired,
    rowsMetadata: PropTypes.array.isRequired,
    onClickAdd: PropTypes.func,
    onClickDelete: PropTypes.func,
    cellActions: PropTypes.object,
};

export default EnhancedTable;
