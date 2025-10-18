import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import React from "react";

const EnhancedTableHead = ({
                               order,
                               orderBy,
                               rowsMetadata,
                               onRequestSort,
                               numSelected,
                               rowCount,
                               onSelectAllClick
                           }) => {
    const handleRequestSort = orderBy => event => {
        onRequestSort(event, orderBy);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {rowsMetadata.map(row => {
                    return (
                        <TableCell
                            key={row.id}
                            align={row.numeric ? "right" : "left"}
                            padding={row.disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === row.id ? order : false}
                        >
                            <Tooltip
                                title="Sort"
                                placement={row.numeric ? "bottom-end" : "bottom-start"}
                                enterDelay={300}
                            >
                                <TableSortLabel
                                    active={orderBy === row.id}
                                    direction={order}
                                    onClick={handleRequestSort(row.id)}
                                >
                                    {row.label}
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};

EnhancedTableHead.propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowsMetadata: PropTypes.array.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired
};

export default EnhancedTableHead;
