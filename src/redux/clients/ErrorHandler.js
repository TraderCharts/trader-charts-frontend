export function logError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response data: ", error.response.data);
        console.error("Error response status: ", error.response.status);
        console.error("Error response headers: ", error.response.headers);
    }
    if (error.request) {
        // The request was made but no response was received
        console.error("Error request: ", error.request);
    }
    console.error("Error message: ", error.message);
    console.error("Error config", error.config);
}
