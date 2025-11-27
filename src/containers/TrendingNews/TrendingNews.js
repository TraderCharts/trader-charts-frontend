import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Skeleton,
    Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import getRandomSoftColor from "../../helpers/randomColors";
import { trendingNewsSelector } from "../../selectors/byma.selector";

const mapStateToProps = (state) => ({
    trendingNews: trendingNewsSelector(state),
});

const TrendingNewsDashboard = ({ trendingNews }) => {
    const [trendingNewsSources, setTrendingNewsSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSource, setActiveSource] = useState(0);
    const [mainImageIsError, setMainImageIsError] = useState(false);

    const items = trendingNews[trendingNewsSources[activeSource]?.sourceName] || [];
    const mainItem = items[0];
    const secondaryItems = items.slice(1, 10);

    useEffect(() => {
        setLoading(true);
        const trendingNewsDataKeys = Object.keys(trendingNews);
        setTrendingNewsSources(
            trendingNewsDataKeys.map((sourceName) => ({
                sourceName,
                bgColor: getRandomSoftColor(),
            }))
        );
        if (trendingNewsDataKeys.length > 0) {
            setLoading(false);
        }
    }, [trendingNews]);

    const renderSentimentChip = (item) => {
        const sentimentInfo = item?.sentiment_info?.[0];
        const sentimentLabel = sentimentInfo?.sentiment_label;
        const sentimentConfidence = sentimentInfo?.sentiment_confidence;
        const sentimentMap = {
            positive: { label: "Positiva", color: "#4caf50" },
            neutral: { label: "Neutra", color: "#9e9e9e" },
            negative: { label: "Negativa", color: "#f44336" },
        };

        const finalSentiment = sentimentConfidence < 0.995 ? "neutral" : sentimentLabel;

        const info = sentimentMap[finalSentiment];
        if (!info || finalSentiment === "neutral") return null;

        return (
            <Chip
                label={info.label}
                sx={{
                    bgcolor: info.color,
                    color: "#fff",
                    fontWeight: "bold",
                }}
            />
        );
    };

    const renderTopicChip = (item, maxQuantity = 2) => {
        const topicInfo = item?.topic_info?.[0];
        const topicKeyphrases = topicInfo?.keyphrases.slice(0, maxQuantity);
        if (!topicKeyphrases) return null;

        return (
            <>
                {topicKeyphrases.map((topicKeyphrase, topicKeyphraseIndex) => (
                    <Chip
                        key={topicKeyphraseIndex}
                        label={topicKeyphrase.phrase}
                        size="small"
                        sx={{
                            bgcolor: "#90A4AE",
                            color: "#fff",
                            fontWeight: "bold",
                            marginLeft: "1em",
                        }}
                    />
                ))}
            </>
        );
    };

    return (
        <Box
            sx={{
                width: "100%", // ocupa todo el espacio disponible
                py: 4, // padding vertical
                px: 8, // padding horizontal (ajustable)
                boxSizing: "border-box", // para que padding no sobresalga
            }}
        >
            {/* 
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Noticias Destacadas
      </Typography> */}
            <Box mb={4} display="flex" justifyContent="center" gap={6} flexWrap="wrap">
                {trendingNewsSources.map((trendingNewsSource, trendingNewsSourceIndex) => {
                    const feedInfo = trendingNews[trendingNewsSource.sourceName] || {};
                    return (
                        <motion.div
                            key={trendingNewsSourceIndex}
                            whileHover={{
                                scale: 1.2, // agranda más
                                boxShadow: "0px 12px 30px rgba(0,0,0,0.3)",
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500, // más rebote
                                damping: 15,
                            }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                                borderRadius: 6,
                            }}
                            onClick={() => {
                                setMainImageIsError(false);
                                setActiveSource(trendingNewsSourceIndex);
                            }}
                        >
                            <Card
                                elevation={6} // valores de 0 a 24, cuanto más alto, más sombra
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    p: 1,
                                    bgcolor: trendingNewsSource.bgColor,
                                    minWidth: 120,
                                    borderRadius: 2,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontFamily: "'Pacifico', cursive", // curvas modernas
                                        fontWeight: 900, // más grueso para encabezado
                                        textAlign: "center",
                                        fontSize: { xs: "1rem", sm: "1.2rem" }, // responsive
                                        WebkitBackgroundClip: "text",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    {trendingNewsSource.sourceName}
                                </Typography>
                                {feedInfo.lastUpdate && (
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(feedInfo.lastUpdate).toLocaleString()}
                                    </Typography>
                                )}
                            </Card>
                        </motion.div>
                    );
                })}
            </Box>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSource}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: trendingNewsSources[activeSource]?.bgColor,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                mb: 3,
                                borderBottom: "3px solid #1976d2",
                                pb: 1,
                            }}
                        >
                            {trendingNewsSources[activeSource]?.sourceName}
                        </Typography>

                        {loading || !mainItem ? (
                            <Skeleton variant="rectangular" height={300} sx={{ mb: 3 }} />
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                transition={{
                                    type: "tween",
                                    ease: "easeOut",
                                    duration: 0.15,
                                }}
                            >
                                <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 4 }}>
                                    <CardActionArea href={mainItem.link} target="_blank">
                                        <Box
                                            sx={{
                                                position: "relative",
                                                height: "20em",
                                                width: "100%",
                                                overflow: "hidden",
                                                borderRadius: 2,
                                                display: mainImageIsError ? "none" : "block",
                                            }}
                                        >
                                            {/* Fondo difuminado */}
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundImage: `url(${mainItem?.image_url})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    filter: "blur(20px) brightness(0.7)", // difumina y oscurece
                                                    transform: "scale(1.2)", // agranda un poco para que no se vean bordes
                                                    zIndex: 1,
                                                }}
                                            />

                                            {/* Imagen principal encima */}
                                            <CardMedia
                                                component="img"
                                                image={mainItem?.image_url}
                                                alt={mainItem.title}
                                                sx={{
                                                    position: "relative",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                    objectPosition: "top",
                                                    zIndex: 2,
                                                }}
                                                onError={() => setMainImageIsError(true)}
                                            />
                                        </Box>
                                        <CardContent>
                                            <Typography
                                                variant="h5"
                                                color="primary"
                                                sx={{ fontWeight: "bold", mb: 1 }}
                                            >
                                                {renderSentimentChip(mainItem)} {mainItem.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {mainItem.description.replace(/<[^>]+>/g, "")}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(mainItem.pubDate).toLocaleString()} —{" "}
                                                {mainItem.author}
                                            </Typography>
                                            <Box
                                                component="span"
                                                sx={{ marginLeft: "0.5em", lineHeight: "1.8" }}
                                            >
                                                {renderTopicChip(mainItem, 4)}
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </motion.div>
                        )}

                        <Grid container spacing={3}>
                            {loading
                                ? Array.from({ length: 6 }).map((_, index) => (
                                      <Grid item xs={12} sm={6} md={4} key={index}>
                                          <Skeleton variant="rectangular" height={200} />
                                      </Grid>
                                  ))
                                : secondaryItems.map((item, itemIndex) => (
                                      <Grid item xs={12} sm={6} md={4} key={itemIndex}>
                                          <motion.div
                                              whileHover={{ scale: 1.08 }}
                                              transition={{
                                                  type: "tween",
                                                  ease: "easeOut",
                                                  duration: 0.15,
                                              }}
                                          >
                                              <Card
                                                  sx={{
                                                      height: "100%",
                                                      borderRadius: 3,
                                                      boxShadow: 3,
                                                  }}
                                              >
                                                  <CardActionArea href={item.link} target="_blank">
                                                      {item?.image_url && (
                                                          <CardMedia
                                                              component="img"
                                                              height="140"
                                                              image={item?.image_url}
                                                              alt={item.title}
                                                              onError={(e) => {
                                                                  e.target.style.display = "none";
                                                              }}
                                                          />
                                                      )}
                                                      <CardContent>
                                                          <Typography
                                                              variant="subtitle1"
                                                              color="primary"
                                                              sx={{
                                                                  fontWeight: "bold",
                                                                  display: "-webkit-box",
                                                                  WebkitLineClamp: 2,
                                                                  WebkitBoxOrient: "vertical",
                                                                  overflow: "hidden",
                                                              }}
                                                          >
                                                              {renderSentimentChip(item)}{" "}
                                                              {item.title}
                                                          </Typography>
                                                          <Typography
                                                              variant="body2"
                                                              color="text.secondary"
                                                              sx={{
                                                                  display: "-webkit-box",
                                                                  WebkitLineClamp: 3,
                                                                  WebkitBoxOrient: "vertical",
                                                                  overflow: "hidden",
                                                              }}
                                                          >
                                                              {item.description.replace(
                                                                  /<[^>]+>/g,
                                                                  ""
                                                              )}
                                                          </Typography>
                                                          <Typography variant="caption">
                                                              {new Date(
                                                                  item.pubDate
                                                              ).toLocaleString()}{" "}
                                                              — {item.author}
                                                          </Typography>
                                                          <Box
                                                              component="span"
                                                              sx={{
                                                                  marginLeft: "0.5em",
                                                                  lineHeight: "1.8",
                                                              }}
                                                          >
                                                              {renderTopicChip(item)}
                                                          </Box>
                                                      </CardContent>
                                                  </CardActionArea>
                                              </Card>
                                          </motion.div>
                                      </Grid>
                                  ))}
                        </Grid>
                    </Box>
                </motion.div>
            </AnimatePresence>{" "}
        </Box>
    );
};

export default connect(mapStateToProps, undefined)(TrendingNewsDashboard);
