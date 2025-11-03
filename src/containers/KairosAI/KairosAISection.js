import { Box } from "@mui/material";

const KairosAISection = () => {
    return (
        <>
            <Box
                component="iframe"
                src="http://localhost:5173/"
                sx={{ width: "100%", height: "100%", border: "none" }}
                title="Chat Hugging Face"
            />
        </>
    );
};

export default KairosAISection;
