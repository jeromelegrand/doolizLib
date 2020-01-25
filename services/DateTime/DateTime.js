export const appendZero = n => (n <= 9) ? `0${n}` : n;

export const formatDate = date => {
    return `${appendZero(date.getDate())}/${appendZero(date.getMonth() + 1)}/${date.getFullYear()}`;
};