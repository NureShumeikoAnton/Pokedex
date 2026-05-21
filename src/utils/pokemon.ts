const getIdFromUrl = (url: string): number => {
    return Number(url.split('/').filter(Boolean).pop());
};

export { getIdFromUrl };