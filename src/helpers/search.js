export const fuzzySearch = (needle, haystack) => {
    needle = needle.replace(/\s/g, "").toLowerCase();
    haystack = haystack.toLowerCase();
    const haystackLen = haystack.length;
    const needleLen = needle.length;
    let matchResults;
    if (needleLen > haystackLen) {
        return [];
    }
    if (needleLen === haystackLen) {
        matchResults = [];
        if (needle === haystack) {
            for (let i = 0; i < needleLen; i++) matchResults.push(i);
        }
        return matchResults;
    }
    matchResults = [];
    outer: for (
        let needlePos = 0, haystackPos = 0;
        needlePos < needleLen;
        needlePos++
    ) {
        const needleChar = needle.charCodeAt(needlePos);
        while (haystackPos < haystackLen) {
            const haystackChar = haystack.charCodeAt(haystackPos);
            if (haystackChar === needleChar) {
                matchResults.push(haystackPos);
                haystackPos++;
                continue outer;
            }
            haystackPos++;
        }
        return [];
    }
    return matchResults;
};
