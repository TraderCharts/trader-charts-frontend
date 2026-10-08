import { Avatar, Box, Card, Chip, Divider, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { connect } from "react-redux";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const InfoItem = ({ icon, label, value }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            minWidth: 0,
        }}
    >
        <Box
            sx={{
                width: 36,
                height: 36,
                flexShrink: 0,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "action.hover",
                color: "text.secondary",
            }}
        >
            {icon}
        </Box>

        <Box sx={{ minWidth: 0 }}>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    display: "block",
                    fontWeight: 650,
                    mb: 0.35,
                }}
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    fontWeight: 600,
                    wordBreak: "break-word",
                }}
            >
                {value || "—"}
            </Typography>
        </Box>
    </Box>
);

const SectionHeader = ({ title, subtitle }) => (
    <Box>
        <Typography
            variant="subtitle1"
            sx={{
                fontWeight: 750,
                letterSpacing: "-0.01em",
            }}
        >
            {title}
        </Typography>

        {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {subtitle}
            </Typography>
        )}
    </Box>
);
const ProfileIdentity = ({ picture, displayName, initials, email, nickname }) => (
    <Card
        elevation={0}
        sx={{
            mt: 2,
            position: "relative",
            overflow: "hidden",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 2.5,
        }}
    >
        <Box
            sx={{
                height: 5,
                bgcolor: "primary.main",
            }}
        />

        <Box
            sx={{
                px: { xs: 2.5, md: 4 },
                py: { xs: 3, md: 4 },
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: 2.5,
            }}
        >
            <Avatar
                src={picture || undefined}
                alt={displayName}
                sx={{
                    width: 84,
                    height: 84,
                    flexShrink: 0,
                    fontSize: 28,
                    fontWeight: 750,
                    border: (theme) => `3px solid ${theme.palette.background.paper}`,
                    boxShadow: (theme) => `0 0 0 1px ${theme.palette.divider}`,
                }}
            >
                {!picture && initials}
            </Avatar>

            <Box
                sx={{
                    minWidth: 0,
                    flex: 1,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                        letterSpacing: "-0.025em",
                        wordBreak: "break-word",
                    }}
                >
                    {displayName}
                </Typography>

                {email && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            mt: 0.75,
                            color: "text.secondary",
                        }}
                    >
                        <EmailOutlinedIcon sx={{ fontSize: 17 }} />

                        <Typography
                            variant="body2"
                            sx={{
                                wordBreak: "break-word",
                            }}
                        >
                            {email}
                        </Typography>
                    </Box>
                )}

                {nickname && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        @{nickname}
                    </Typography>
                )}
            </Box>
        </Box>
    </Card>
);

const ProPlanCard = () => (
    <Card
        elevation={0}
        sx={{
            mt: 2,
            position: "relative",
            overflow: "hidden",
            borderRadius: 2.5,
            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
            background: (theme) =>
                `linear-gradient(
                    135deg,
                    ${alpha(theme.palette.primary.main, 0.12)} 0%,
                    ${alpha(theme.palette.primary.main, 0.04)} 55%,
                    ${theme.palette.background.paper} 100%
                )`,
        }}
    >
        <Box
            sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 180,
                height: 180,
                borderRadius: "50%",
                transform: "translate(35%, -45%)",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            }}
        />

        <Box
            sx={{
                position: "relative",
                px: { xs: 2.5, md: 3.5 },
                py: { xs: 2.5, md: 3 },
                display: "flex",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Box
                sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                    color: "primary.main",
                }}
            >
                <AutoAwesomeOutlinedIcon />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Professional
                    </Typography>

                    <Chip
                        label="PRO"
                        size="small"
                        color="primary"
                        sx={{
                            height: 23,
                            borderRadius: 1.25,
                            fontWeight: 800,
                            letterSpacing: "0.04em",
                        }}
                    />
                </Stack>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                        maxWidth: 650,
                    }}
                >
                    Your account has access to the professional trading experience and advanced
                    market tools.
                </Typography>
            </Box>
        </Box>
    </Card>
);

const PersonalInformation = ({ firstName, middleName, lastName, nickname, email }) => (
    <Card
        elevation={0}
        sx={{
            mt: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 2.5,
            overflow: "hidden",
        }}
    >
        <Box
            sx={{
                px: { xs: 2.5, md: 3 },
                py: 2.25,
            }}
        >
            <SectionHeader
                title="Personal information"
                subtitle="Basic information associated with your account"
            />
        </Box>

        <Divider />

        <Box
            sx={{
                px: { xs: 2.5, md: 3 },
                py: { xs: 2.5, md: 3 },
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                },
                columnGap: { sm: 6 },
                rowGap: 3,
            }}
        >
            <InfoItem
                icon={<PersonOutlineOutlinedIcon fontSize="small" />}
                label="First name"
                value={firstName}
            />

            <InfoItem
                icon={<PersonOutlineOutlinedIcon fontSize="small" />}
                label="Last name"
                value={lastName}
            />

            {middleName && (
                <InfoItem
                    icon={<PersonOutlineOutlinedIcon fontSize="small" />}
                    label="Middle name"
                    value={middleName}
                />
            )}

            <InfoItem
                icon={<AccountCircleOutlinedIcon fontSize="small" />}
                label="Username"
                value={nickname}
            />

            <InfoItem icon={<EmailOutlinedIcon fontSize="small" />} label="Email" value={email} />
        </Box>
    </Card>
);

const getUserData = (auth) => {
    const user = auth?.idTokenPayload || {};

    const firstName = user.given_name;
    const middleName = user.middle_name;
    const lastName = user.family_name;
    const nickname = user.nickname;
    const email = user.email || user.name;

    const displayName =
        [firstName, middleName, lastName].filter(Boolean).join(" ") ||
        user.name ||
        nickname ||
        email ||
        "User";

    const initials = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");

    return {
        user,
        firstName,
        middleName,
        lastName,
        nickname,
        email,
        displayName,
        initials,
    };
};

const ProfileSection = ({ auth }) => {
    const { user, firstName, middleName, lastName, nickname, email, displayName, initials } =
        getUserData(auth);

    return (
        <Box
            sx={{
                width: "100%",
                px: { xs: 2, sm: 2.5, md: 3, lg: 4 },
                py: { xs: 2.5, md: 4 },
                boxSizing: "border-box",
            }}
        >
            <ProPlanCard />

            <ProfileIdentity
                picture={user.picture}
                displayName={displayName}
                initials={initials}
                email={email}
                nickname={nickname}
            />

            <PersonalInformation
                firstName={firstName}
                middleName={middleName}
                lastName={lastName}
                nickname={nickname}
                email={email}
            />
        </Box>
    );
};

const mapStateToProps = (state) => ({
    auth: state.authentication.auth,
});

export default connect(mapStateToProps)(ProfileSection);
