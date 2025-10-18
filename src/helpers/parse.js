import moment from "moment-timezone";

export const null2String = (value, defaultValue = "") => value || defaultValue;
export const nullJSON2String = (value, attribute, defaultValue = "") =>
    (value && value[attribute]) || defaultValue;
export const null2Num = (value, defaultValue = undefined) =>
    value || defaultValue;

export const undefined2Num = (value, defaultValue = 0) => value || defaultValue;
export const null2Date = (
    value,
    defaultValue = undefined,
    formatIn = "MM/DD/YYYY",
    formatOut = "MM/DD/YYYY"
) => {
    let date = value || defaultValue;
    date = date ? moment(value, formatIn).format(formatOut) : undefined;
    return date;
};
export const null2DateTime = (value, defaultValue = undefined) => {
    let date = value || defaultValue;
    date = date ? moment(value, "MM/DD/YYYY hh:mm:ss A") : undefined;
    return date;
};
export const null2Array = (value, defaultValue = []) => value || defaultValue;
export const stringToBoolean = value => {
    if (typeof value !== "string") {
        return false;
    }
    value = value.toLowerCase();
    return value === "true" || value === "1";
};
export const hexToRGBA = (inputHex, opacity) => {
    const hex = inputHex.replace("#", "");
    if (inputHex.indexOf("#") > -1 && (hex.length === 3 || hex.length === 6)) {

        const multiplier = (hex.length === 3) ? 1 : 2;

        const r = parseInt(hex.substring(0, 1 * multiplier), 16);
        const g = parseInt(hex.substring(1 * multiplier, 2 * multiplier), 16);
        const b = parseInt(hex.substring(2 * multiplier, 3 * multiplier), 16);

        const result = `rgba(${r}, ${g}, ${b}, ${opacity})`;

        return result;
    }
    return inputHex;
}