// Checks for empty string. Takes the string as input and returns boolean value.
export const isEmpty = (str) => {
    return !str.replace(/\s+/, '').length;
};
