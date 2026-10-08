import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import ReactECharts from "echarts-for-react";

const PrincipalSection = ({ paidAmortization, remainingAmortization, progress }) => {
    const principalOption = {
        animation: true,

        tooltip: {
            trigger: "item",
            formatter: (params) =>
                `${params.name}<br/><strong>${Number(params.value).toFixed(0)}%</strong>`,
        },

        series: [
            {
                type: "pie",
                radius: ["58%", "78%"],
                center: ["50%", "50%"],
                avoidLabelOverlap: true,

                itemStyle: {
                    borderRadius: 6,
                    borderColor: "#fff",
                    borderWidth: 3,
                },

                label: {
                    show: false,
                },

                emphasis: {
                    scale: true,
                    scaleSize: 5,
                },

                data: [
                    {
                        value: paidAmortization,
                        name: "Paid",
                        itemStyle: {
                            color: "#90A4AE",
                        },
                    },
                    {
                        value: remainingAmortization,
                        name: "Pending",
                        itemStyle: {
                            color: "#1976D2",
                        },
                    },
                ],
            },
        ],

        graphic: [
            {
                type: "text",
                left: "center",
                top: "39%",
                style: {
                    text: `${remainingAmortization.toFixed(0)}%`,
                    fontSize: 28,
                    fontWeight: 800,
                    fill: "#222",
                },
            },
            {
                type: "text",
                left: "center",
                top: "54%",
                style: {
                    text: "pending",
                    fontSize: 14,
                    fontWeight: 500,
                    fill: "#777",
                },
            },
        ],
    };

    return (
        <Card
            elevation={0}
            sx={{
                mb: 2,
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                backgroundColor: "background.paper",
            }}
        >
            <Box
                sx={{
                    px: { xs: 2, md: 2.5 },
                    py: 1.75,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    flexWrap: "wrap",
                }}
            >
                <Box>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 750,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Principal
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 0.25 }}
                    >
                        Bond principal amortization status
                    </Typography>
                </Box>

                <Chip
                    label={`${progress.toFixed(0)}% paid`}
                    color="primary"
                    size="small"
                    sx={{
                        borderRadius: 1.5,
                        fontWeight: 750,
                    }}
                />
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
                            position: "relative",
                            width: "100%",
                            height: 235,
                        }}
                    >
                        <ReactECharts
                            option={principalOption}
                            style={{
                                width: "100%",
                                height: "235px",
                            }}
                            opts={{
                                renderer: "svg",
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 3,
                            mt: 0.5,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.75,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 9,
                                    height: 9,
                                    borderRadius: "50%",
                                    bgcolor: "#90A4AE",
                                }}
                            />

                            <Typography variant="caption" color="text.secondary">
                                Paid {paidAmortization.toFixed(0)}%
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.75,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 9,
                                    height: 9,
                                    borderRadius: "50%",
                                    bgcolor: "#1976D2",
                                }}
                            />

                            <Typography variant="caption" color="text.secondary">
                                Pending {remainingAmortization.toFixed(0)}%
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default PrincipalSection;
