import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

const DocumentationSection = ({ instrument }) => {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                backgroundColor: "background.paper",
                overflow: "hidden",
            }}
        >
            <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.75 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 750,
                        letterSpacing: "-0.01em",
                    }}
                >
                    Documentation
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 0.25 }}
                >
                    Official instrument documentation
                </Typography>
            </Box>

            <Box
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                }}
            >
                <CardContent
                    sx={{
                        p: { xs: 2, md: 2.5 },
                        "&:last-child": {
                            pb: { xs: 2, md: 2.5 },
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: {
                                xs: "flex-start",
                                sm: "center",
                            },
                            justifyContent: "space-between",
                            gap: 2,
                            flexWrap: "wrap",
                            p: 2,
                            borderRadius: 2.5,
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.025),
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                minWidth: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                                    color: "error.main",
                                }}
                            >
                                <PictureAsPdfOutlinedIcon />
                            </Box>

                            <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body1" sx={{ fontWeight: 750 }}>
                                    Terms & Conditions
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.25 }}
                                >
                                    Official documentation for {instrument?.symbol || "this bond"}.
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            variant="outlined"
                            startIcon={<PictureAsPdfOutlinedIcon />}
                            href={`/${instrument.termsDocumentUrl}` ?? undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            disabled={!instrument?.termsDocumentUrl}
                            sx={{
                                borderRadius: 2,
                                fontWeight: 750,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                            }}
                        >
                            Download PDF
                        </Button>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default DocumentationSection;
