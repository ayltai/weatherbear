export const remote = {};

remote.getGlobal = key => {
    if (key === 'IS_DARK_MODE') return true;
};
