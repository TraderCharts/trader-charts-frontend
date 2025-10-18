export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (err) {
        //fail to save state
        console.error("Failed to save state");
    }
};

export const updateExpiresAt = () => {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    const timeNow = Date.now();
    if (expiresAt) {
        if (expiresAt <= timeNow) {
            localStorage.clear();
        } else {
            const newExpiresAt = JSON.stringify(
                process.env.REACT_APP_TIMEOUT_MINS * 60 * 1000 + new Date().getTime()
            );
            localStorage.setItem("expires_at", newExpiresAt);
        }
    }
};
