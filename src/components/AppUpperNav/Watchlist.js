import { Tooltip, IconButton } from "@mui/material";
import FormatListBulletedOutlined from "@mui/icons-material/FormatListBulletedOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const Watchlist = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isWatchlistsPage = location.pathname === "/watchlists";

    return (
        <Tooltip title="Watchlists" arrow placement="bottom">
            <IconButton
                onClick={() => {
                    if (!isWatchlistsPage) {
                        navigate("/watchlists");
                    }
                }}
                sx={{
                    color: "rgba(255,255,255,0.75)",
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    ...(isWatchlistsPage && {
                        color: "#fff",
                        backgroundColor: "rgba(255,255,255,0.1)",
                    }),
                    "&:hover": {
                        color: "#fff",
                        backgroundColor: "rgba(255,255,255,0.1)",
                    },
                    "& .MuiSvgIcon-root": {
                        fontSize: 27,
                    },
                }}
            >
                <FormatListBulletedOutlined />
            </IconButton>
        </Tooltip>
    );
};

export default Watchlist;
