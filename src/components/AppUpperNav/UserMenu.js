import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Box, Divider, Menu, MenuItem, Typography, IconButton } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserButton = styled(IconButton)(({ theme }) => ({
    padding: 4,
    marginLeft: 8,

    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
}));

const StyledAvatar = styled(Avatar)({
    width: 44,
    height: 44,
});

const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 4,
        minWidth: 200,
        marginTop: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        border: `1px solid ${theme.palette.divider}`,
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    fontSize: "14px",
    padding: "10px 20px",
    gap: 8,

    "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
}));

const UserMenu = ({ auth, onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const picture = auth?.idTokenPayload?.picture;
    const userName = auth?.idTokenPayload?.name || auth?.idTokenPayload?.email;

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <UserButton onClick={handleMenu}>
                {picture ? <StyledAvatar src={picture} /> : <AccountCircle sx={{ fontSize: 44 }} />}
            </UserButton>

            <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {userName && (
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="caption" color="text.secondary">
                            Signed in as
                        </Typography>

                        <Typography variant="body2" fontWeight={500} noWrap sx={{ mt: 0.5 }}>
                            {userName}
                        </Typography>
                    </Box>
                )}

                <Divider />

                <StyledMenuItem
                    onClick={() => {
                        handleClose();
                        navigate("profile");
                    }}
                >
                    Profile
                </StyledMenuItem>

                <StyledMenuItem onClick={handleClose}>Show Message</StyledMenuItem>

                <Divider />

                <StyledMenuItem
                    onClick={() => {
                        handleClose();
                        onLogout();
                    }}
                >
                    Log Out
                </StyledMenuItem>
            </StyledMenu>
        </>
    );
};

export default UserMenu;
