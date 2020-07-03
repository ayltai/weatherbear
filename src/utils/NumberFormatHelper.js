export const NumberFormatHelper = {};

NumberFormatHelper.toFixed = (value, digits = 1) => {
    const factor = Math.pow(10, digits);
    return (Math.round(value * factor) / factor).toFixed(digits);
};
