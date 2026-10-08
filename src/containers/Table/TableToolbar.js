import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { lighten, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const EnhancedTableToolbar = ({ onClickAdd, onClickDelete, numSelected }) => {
    const theme = useTheme();
    const highlightSx =
        theme.palette.mode === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              };

    return (
        <Toolbar
            sx={{
                pr: 1,
                pl: "20px",
                ...(numSelected > 0 ? highlightSx : {}),
            }}
        >
            <div style={{ flex: "0 0 auto" }}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="subtitle1" id="tableTitle">
                        Alerts
                    </Typography>
                )}
            </div>
            <div style={{ flex: "1 1 100%" }} />
            <div style={{ color: theme.palette.text.secondary }}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete" onClick={onClickDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
                {numSelected === 0 && onClickAdd ? (
                    <Tooltip title="Add">
                        <IconButton aria-label="Add" onClick={(event) => onClickAdd(event)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    onClickAdd: PropTypes.func,
    onClickDelete: PropTypes.func,
    numSelected: PropTypes.number,
};

export default EnhancedTableToolbar;
