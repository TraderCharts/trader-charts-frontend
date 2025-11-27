import { Box } from "@mui/material";

const KairosAISection = () => {
    return (
        <>
            <Box
                component="iframe"
                src={process.env.REACT_APP_CHAT_UI_URL || ""}
                sx={{ width: "100%", height: "100%", border: "none" }}
                title="Chat Hugging Face"
            />
        </>
    );
};

export default KairosAISection;
