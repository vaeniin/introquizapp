export const getRandom = (n) => {
    return Math.round(Math.random() * n);
};

export const getRandomMinMax = (min, max, coeff) => {
    return Math.floor(Math.random() * (max - min + 1*coeff) + min);
};

export const getRandomFloor = (n) => {
    return Math.floor(Math.random() * n);
};