export const DateHelper = {};

DateHelper.isDay = () => {
    const hourOfDay = new Date().getHours();
    return hourOfDay >= 6 && hourOfDay < 18;
};

DateHelper.getPartOfDay = () => {
    const hourOfDay = new Date().getHours();
    if (hourOfDay >= 5 && hourOfDay < 7) return 'dawn';
    if (hourOfDay >= 7 && hourOfDay < 12) return 'morning';
    if (hourOfDay >= 12 && hourOfDay < 17) return 'afternoon';
    if (hourOfDay >= 17 && hourOfDay < 19) return 'dusk';
    if (hourOfDay >= 19 && hourOfDay < 23) return 'evening';
    return 'night';
};
