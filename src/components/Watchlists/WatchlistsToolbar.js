import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";

const WatchlistsToolbar = ({ search, onSearchChange }) => (
    <Box sx={{ mb: 1.5 }}>
        <TextField
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search ticker or instrument..."
            size="small"
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                ),
            }}
            sx={{
                maxWidth: 420,

                "& .MuiInputBase-root": {
                    height: 34,
                    fontSize: 13,
                },
            }}
        />
    </Box>
);

export default WatchlistsToolbar;
