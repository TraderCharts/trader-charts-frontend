import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import React from "react";
import {useTheme} from "@mui/material/styles";

const TablePaginationActions = ({
                                    count,
                                    page,
                                    rowsPerPage,
                                    onPageChange
                                }) => {
    const theme = useTheme();

    const onFirstPageButtonClick = event => {
        onPageChange(event, 0);
    };
    const onBackButtonClick = event => {
        onPageChange(event, page - 1);
    };
    const onNextButtonClick = event => {
        onPageChange(event, page + 1);
    };
    const onLastPageButtonClick = event => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div
            style={{
                display: "flex",
                flexShrink: 0,
                color: theme.palette.text.secondary,
                marginLeft: theme.spacing(2.5)
            }}
        >
            <IconButton
                onClick={onFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                {theme.direction === "rtl" ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={onBackButtonClick}
                disabled={page === 0}
                aria-label="Previous Page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={onNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={onLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
};

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};

export default TablePaginationActions;
